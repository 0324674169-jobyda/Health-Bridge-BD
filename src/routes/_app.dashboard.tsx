import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/hooks/use-session";
import { PageHeader, StatCard } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  appointments,
  labReports,
  medicalHistory,
  patients,
  prescriptions,
  stats,
  diseaseTrends,
  vaccinationPrograms,
  auditLogs,
} from "@/lib/mock-data";
import {
  CalendarDays,
  FileHeart,
  FlaskConical,
  Pill,
  Users,
  HeartPulse,
  Hospital,
  Activity,
  TrendingUp,
  Syringe,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · NHIMS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { session } = useSession();
  if (!session) return null;
  const { role, name } = session;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${name.split(" ")[0]}`}
        description="Here's what's happening across your NHIMS workspace today."
      />
      {role === "patient" && <PatientDash />}
      {role === "doctor" && <DoctorDash />}
      {role === "hospital" && <HospitalDash />}
      {role === "diagnostic" && <DiagnosticDash />}
      {role === "pharmacist" && <PharmacistDash />}
      {role === "admin" && <AdminDash />}
      {role === "authority" && <AuthorityDash />}
    </div>
  );
}

function PatientDash() {
  const me = patients[0];
  const myAppts = appointments.filter((a) => a.patientId === me.id);
  const myRx = prescriptions.filter((p) => p.patientId === me.id);
  const myLabs = labReports.filter((l) => l.patientId === me.id);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="Upcoming appointments" value={myAppts.filter(a=>a.status!=="Completed").length} tone="primary" />
        <StatCard icon={Pill} label="Active prescriptions" value={myRx.filter(p=>p.status==="Active").length} tone="secondary" />
        <StatCard icon={FlaskConical} label="Lab reports" value={myLabs.length} tone="success" />
        <StatCard icon={HeartPulse} label="Health ID" value={me.id} hint={`NID ${me.nid}`} tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Upcoming appointments</h3>
            <Button size="sm" variant="outline">Book new</Button>
          </div>
          <div className="space-y-3">
            {myAppts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">{a.doctor} · {a.specialty}</div>
                  <div className="text-xs text-muted-foreground">{a.hospital}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{a.date}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
                <Badge variant={a.status === "Confirmed" ? "default" : "secondary"} className="ml-4">{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Emergency card</h3>
          <div className="rounded-lg gradient-brand p-4 text-white">
            <div className="text-xs uppercase tracking-wider opacity-80">National Health ID</div>
            <div className="mt-1 text-lg font-bold">{me.id}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><div className="opacity-70">Blood</div><div className="font-semibold">{me.blood}</div></div>
              <div><div className="opacity-70">Age</div><div className="font-semibold">{me.age}</div></div>
              <div className="col-span-2"><div className="opacity-70">Conditions</div><div className="font-semibold">{me.conditions.join(", ") || "None recorded"}</div></div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full">Download PDF</Button>
        </Card>
      </div>
    </div>
  );
}

function DoctorDash() {
  const todays = appointments.slice(0, 4);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Patients today" value={12} tone="primary" />
        <StatCard icon={CalendarDays} label="Appointments" value={todays.length} tone="secondary" />
        <StatCard icon={Pill} label="Rx issued this week" value={38} tone="success" />
        <StatCard icon={FlaskConical} label="Pending lab reviews" value={5} tone="warning" />
      </div>
      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Today's schedule</h3>
        <div className="divide-y">
          {todays.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{a.patient}</div>
                <div className="text-xs text-muted-foreground">{a.specialty} · {a.hospital}</div>
              </div>
              <div className="hidden text-sm text-muted-foreground sm:block">{a.date} · {a.time}</div>
              <Badge>{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Recent patient records</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {medicalHistory.slice(0, 4).map((m) => (
            <div key={m.id} className="rounded-lg border p-3">
              <div className="text-sm font-semibold">{m.diagnosis}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.date} · {m.doctor}</div>
              <div className="mt-2 text-sm">{m.notes}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HospitalDash() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Registered today" value={47} tone="primary" />
        <StatCard icon={CalendarDays} label="Appointments" value={128} tone="secondary" />
        <StatCard icon={Activity} label="Admissions" value={19} tone="warning" />
        <StatCard icon={Hospital} label="Beds available" value={62} tone="success" />
      </div>
      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Today's queue</h3>
        <div className="divide-y">
          {appointments.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{a.patient}</div>
                <div className="text-xs text-muted-foreground">→ {a.doctor}</div>
              </div>
              <Badge variant="outline">{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DiagnosticDash() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FlaskConical} label="Pending tests" value={labReports.filter(l=>l.status==="Pending").length} tone="warning" />
        <StatCard icon={Activity} label="Completed today" value={14} tone="success" />
        <StatCard icon={FileHeart} label="Reports uploaded" value={31} tone="primary" />
        <StatCard icon={Users} label="Patients served" value={22} tone="secondary" />
      </div>
      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Incoming test requests</h3>
        <div className="divide-y">
          {labReports.map((l) => (
            <div key={l.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{l.test} — {l.patient}</div>
                <div className="text-xs text-muted-foreground">Requested by {l.requestedBy}</div>
              </div>
              <Badge variant={l.status === "Completed" ? "default" : "secondary"}>{l.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PharmacistDash() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Pill} label="Prescriptions today" value={prescriptions.length} tone="primary" />
        <StatCard icon={ShieldCheck} label="Verified" value={prescriptions.filter(p=>p.status==="Dispensed").length} tone="success" />
        <StatCard icon={Activity} label="Awaiting" value={prescriptions.filter(p=>p.status==="Active").length} tone="warning" />
        <StatCard icon={Users} label="Unique patients" value={new Set(prescriptions.map(p=>p.patientId)).size} tone="secondary" />
      </div>
      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Recent prescriptions</h3>
        <div className="divide-y">
          {prescriptions.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.id} · {p.patient}</div>
                <div className="text-xs text-muted-foreground">By {p.doctor} · {p.date}</div>
              </div>
              <Badge>{p.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminDash() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Registered patients" value={stats.totalPatients.toLocaleString()} tone="primary" />
        <StatCard icon={HeartPulse} label="Active doctors" value={stats.activeDoctors.toLocaleString()} tone="secondary" />
        <StatCard icon={Hospital} label="Facilities" value={stats.hospitals.toLocaleString()} tone="success" />
        <StatCard icon={Activity} label="Uptime" value="99.98%" tone="warning" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-3 font-semibold">Recent audit activity</h3>
          <div className="divide-y">
            {auditLogs.map((l) => (
              <div key={l.id} className="py-2.5 text-sm">
                <div className="font-medium">{l.actor}</div>
                <div className="text-xs text-muted-foreground">{l.action} · <span className="font-mono">{l.target}</span> · {l.ts}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-3 font-semibold">System load — last 7 months</h3>
          <TrendChart />
        </Card>
      </div>
    </div>
  );
}

function AuthorityDash() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Population covered" value="168.4M" tone="primary" />
        <StatCard icon={TrendingUp} label="Dengue cases (Jul)" value={diseaseTrends.at(-1)!.dengue.toLocaleString()} tone="destructive" />
        <StatCard icon={Syringe} label="Vaccinations MTD" value="2.4M" tone="success" />
        <StatCard icon={ClipboardList} label="Outbreak alerts" value={3} tone="warning" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-3 font-semibold">Disease surveillance trends</h3>
          <TrendChart />
        </Card>
        <Card className="p-5">
          <h3 className="mb-3 font-semibold">Vaccination coverage</h3>
          <div className="space-y-4">
            {vaccinationPrograms.map((v) => (
              <div key={v.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{v.name}</span>
                  <span className="text-muted-foreground">{v.coverage}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${v.coverage}%` }} />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">{v.target}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function TrendChart() {
  const max = Math.max(...diseaseTrends.flatMap((d) => [d.dengue, d.covid, d.flu]));
  return (
    <div>
      <div className="flex h-48 items-end gap-3">
        {diseaseTrends.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-end justify-center gap-0.5" style={{ height: "170px" }}>
              <div className="w-2 rounded-t bg-destructive/80" style={{ height: `${(d.dengue / max) * 100}%` }} title={`Dengue ${d.dengue}`} />
              <div className="w-2 rounded-t bg-secondary/80" style={{ height: `${(d.covid / max) * 100}%` }} title={`COVID ${d.covid}`} />
              <div className="w-2 rounded-t bg-primary/80" style={{ height: `${(d.flu / max) * 100}%` }} title={`Flu ${d.flu}`} />
            </div>
            <div className="text-[10px] text-muted-foreground">{d.month}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-destructive/80" />Dengue</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-secondary/80" />COVID-19</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary/80" />Flu</span>
      </div>
    </div>
  );
}
