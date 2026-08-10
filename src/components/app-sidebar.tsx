import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  CalendarClock,
  FileHeart,
  Pill,
  FlaskConical,
  ShieldCheck,
  BarChart3,
  Users,
  Hospital,
  ClipboardList,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSession } from "@/lib/session";
import type { UserRole } from "@/lib/mock-data";
import { roleLabels } from "@/lib/mock-data";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const menuByRole: Record<UserRole, NavItem[]> = {
  patient: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "My Profile", icon: User },
    { to: "/appointments", label: "Appointments", icon: CalendarDays },
    { to: "/my-appointments", label: "My Bookings", icon: CalendarClock },
    { to: "/medical-history", label: "Medical History", icon: FileHeart },
    { to: "/prescriptions", label: "Prescriptions", icon: Pill },
    { to: "/lab-reports", label: "Lab Reports", icon: FlaskConical },
    { to: "/consents", label: "Consents", icon: ShieldCheck },
  ],
  doctor: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/patients", label: "Patients", icon: Users },
    { to: "/appointments", label: "Appointments", icon: CalendarDays },
    { to: "/prescriptions", label: "Prescriptions", icon: Pill },
    { to: "/lab-reports", label: "Lab Reports", icon: FlaskConical },
  ],
  hospital: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/patients", label: "Patients", icon: Users },
    { to: "/appointments", label: "Appointments", icon: CalendarDays },
    { to: "/medical-history", label: "Records", icon: FileHeart },
  ],
  diagnostic: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/lab-reports", label: "Lab Reports", icon: FlaskConical },
  ],
  pharmacist: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/pharmacy", label: "Verify & Dispense", icon: Pill },
  ],
  admin: [
    { to: "/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
    { to: "/admin", label: "Users & Facilities", icon: Hospital },
    { to: "/statistics", label: "System Analytics", icon: BarChart3 },
    { to: "/audit", label: "Audit Logs", icon: ClipboardList },
  ],
  authority: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/statistics", label: "Health Statistics", icon: BarChart3 },
    { to: "/audit", label: "Audit Logs", icon: ClipboardList },
  ],
};

export function AppSidebar({ role, name }: { role: UserRole; name: string }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const nav = useNavigate();
  const items = menuByRole[role];

  function handleLogout() {
    clearSession();
    nav({ to: "/login" });
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand text-white">
            <HeartPulse className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-bold text-sidebar-foreground">NHIMS</div>
              <div className="truncate text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
                Bangladesh
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.to;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Security">
                  <Link to="/dashboard">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Security</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-md bg-sidebar-accent/50 p-2">
          {!collapsed && (
            <div className="mb-2 min-w-0 px-1">
              <div className="truncate text-xs font-semibold text-sidebar-foreground">{name}</div>
              <div className="truncate text-[10px] text-sidebar-foreground/60">{roleLabels[role]}</div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
