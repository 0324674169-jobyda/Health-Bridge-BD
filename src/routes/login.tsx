import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSession } from "@/lib/session";
import { demoAccounts, roleLabels, type UserRole } from "@/lib/mock-data";
import { HeartPulse, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · NHIMS Bangladesh" },
      { name: "description", content: "Sign in to the National Health Information Management System." },
    ],
  }),
  component: Login,
});

const roles: UserRole[] = ["patient", "doctor", "hospital", "diagnostic", "pharmacist", "admin", "authority"];

function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState<UserRole>("patient");
  const [nid, setNid] = useState(demoAccounts.patient.nid);
  const [password, setPassword] = useState("demo1234");

  function handleRole(r: UserRole) {
    setRole(r);
    setNid(demoAccounts[r].nid);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!nid || !password) {
      toast.error("Please enter both credentials");
      return;
    }
    setSession({ role, name: demoAccounts[role].name, nid: demoAccounts[role].nid });
    toast.success(`Welcome, ${demoAccounts[role].name}`);
    nav({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="relative hidden overflow-hidden gradient-brand p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15 backdrop-blur">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold">NHIMS</div>
              <div className="text-[10px] uppercase tracking-wider text-white/70">Bangladesh</div>
            </div>
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Secure access to Bangladesh's national health network.
            </h1>
            <p className="mt-4 max-w-md text-white/80">
              Sign in with your National ID. All record access is logged and requires patient consent.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
              <ShieldCheck className="h-5 w-5" />
              Two-factor authentication enforced for healthcare professionals
            </div>
          </div>
          <div className="text-xs text-white/60">© 2026 Directorate General of Health Services</div>
        </div>

        {/* Right form */}
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:hidden">
              <HeartPulse className="h-4 w-4 text-primary" /> NHIMS Bangladesh
            </Link>
            <h2 className="text-2xl font-bold">Sign in to your dashboard</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select your role and continue with demo credentials.
            </p>

            <div className="mt-6">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                I am signing in as
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRole(r)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                      (role === r
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50")
                    }
                  >
                    {roleLabels[r]}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="nid">National ID / User ID</Label>
                <Input id="nid" value={nid} onChange={(e) => setNid(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
                <p className="mt-1.5 text-xs text-muted-foreground">Demo password prefilled — click Sign in.</p>
              </div>
              <Button type="submit" size="lg" className="w-full gradient-brand text-white">
                Sign in <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 rounded-lg border bg-muted/40 p-4 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground">Demo account · {roleLabels[role]}</div>
              <div className="mt-1">Name: {demoAccounts[role].name}</div>
              <div>ID: {demoAccounts[role].nid}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
