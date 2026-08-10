import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { doctors, stats } from "@/lib/mock-data";
import { Users, Hospital, Stethoscope, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Admin · NHIMS" }] }),
  component: Admin,
});

function Admin() {
  return (
    <div>
      <PageHeader title="Users & facilities" description="Manage healthcare professionals, hospitals, and access." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total users" value="12,834" tone="primary" />
        <StatCard icon={Stethoscope} label="Verified doctors" value={stats.activeDoctors.toLocaleString()} tone="secondary" />
        <StatCard icon={Hospital} label="Facilities" value={stats.hospitals.toLocaleString()} tone="success" />
        <StatCard icon={ShieldCheck} label="Pending approval" value={23} tone="warning" />
      </div>
      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b p-4 font-semibold">Registered doctors</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Specialty</th>
                <th className="px-4 py-3">Hospital</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{d.id}</td>
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.specialty}</td>
                  <td className="px-4 py-3">{d.hospital}</td>
                  <td className="px-4 py-3"><Badge>Verified</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
