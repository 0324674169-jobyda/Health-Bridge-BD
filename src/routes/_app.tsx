import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useSession } from "@/hooks/use-session";
import { roleLabels } from "@/lib/mock-data";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { session, hydrated } = useSession();
  const nav = useNavigate();

  useEffect(() => {
    if (hydrated && !session) nav({ to: "/login" });
  }, [hydrated, session, nav]);

  if (!hydrated || !session) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar role={session.role} name={session.name} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur sm:px-6">
            <SidebarTrigger />
            <div className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search patients, prescriptions, reports…" className="pl-9" />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative grid h-9 w-9 place-items-center rounded-full border bg-background hover:bg-accent"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
              </button>
              <div className="hidden text-right sm:block">
                <div className="text-xs font-semibold">{session.name}</div>
                <div className="text-[10px] text-muted-foreground">{roleLabels[session.role]}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                {session.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
