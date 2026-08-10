import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { diseaseTrends, vaccinationPrograms, stats } from "@/lib/mock-data";
import { Users, HeartPulse, TrendingUp, Syringe } from "lucide-react";

export const Route = createFileRoute("/_app/statistics")({
  head: () => ({ meta: [{ title: "Health Statistics · NHIMS" }] }),
  component: Statistics,
});

function Statistics() {
  const max = Math.max(...diseaseTrends.flatMap((d) => [d.dengue, d.covid, d.flu]));
  return (
    <div>
      <PageHeader title="Healthcare statistics" description="Nationwide surveillance, outbreak monitoring, and vaccination coverage." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Population covered" value="168.4M" tone="primary" />
        <StatCard icon={HeartPulse} label="Active cases" value="34,210" tone="destructive" />
        <StatCard icon={TrendingUp} label="Weekly growth" value="+4.2%" tone="warning" />
        <StatCard icon={Syringe} label="Vaccinations MTD" value="2.4M" hint={`${stats.hospitals} facilities`} tone="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Disease trends — last 7 months</h3>
          <div className="flex h-64 items-end gap-4">
            {diseaseTrends.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center gap-1" style={{ height: "220px" }}>
                  <div className="w-3 rounded-t bg-destructive/80" style={{ height: `${(d.dengue / max) * 100}%` }} title={`Dengue ${d.dengue}`} />
                  <div className="w-3 rounded-t bg-secondary/80" style={{ height: `${(d.covid / max) * 100}%` }} title={`COVID ${d.covid}`} />
                  <div className="w-3 rounded-t bg-primary/80" style={{ height: `${(d.flu / max) * 100}%` }} title={`Flu ${d.flu}`} />
                </div>
                <div className="text-xs text-muted-foreground">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-destructive/80" />Dengue</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-secondary/80" />COVID-19</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary/80" />Flu</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Vaccination coverage</h3>
          <div className="space-y-5">
            {vaccinationPrograms.map((v) => (
              <div key={v.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{v.name}</span>
                  <span className="text-muted-foreground">{v.coverage}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${v.coverage}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{v.target}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="mb-4 font-semibold">Divisional health snapshot</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur", "Mymensingh"].map((div, i) => (
            <div key={div} className="rounded-lg border p-4">
              <div className="text-sm font-semibold">{div}</div>
              <div className="mt-1 text-2xl font-bold">{(1200 + i * 340).toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active cases</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
