import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  BarChart3,
  HeartPulse,
  Hospital,
  ArrowRight,
  CheckCircle2,
  Ambulance,
  Phone,
  Syringe,
  Thermometer,
  Bandage,
  Tablets,
  Glasses,
  Wind,
} from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";
import { DoctorDirectory } from "@/components/doctor-directory";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold">NHIMS</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Bangladesh
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#roles" className="hover:text-foreground">For Users</a>
            <a href="#workflow" className="hover:text-foreground">Workflow</a>
            <a href="#security" className="hover:text-foreground">Security</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-brand text-white">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-brand-soft opacity-60" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Government of Bangladesh · DGHS Initiative
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                One health record.
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Every citizen. Every hospital.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                The National Health Information Management System securely connects
                168 million citizens with doctors, hospitals, diagnostic centers, and
                pharmacies across all 8 divisions of Bangladesh.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/login">
                  <Button size="lg" className="gradient-brand text-white">
                    Launch dashboard <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline">Explore features</Button>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> National ID linked</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> End-to-end encrypted</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Consent-based sharing</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-border/60 p-0 shadow-2xl">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  <span className="ml-2 text-xs text-muted-foreground">nhims.gov.bd/dashboard</span>
                </div>
                <div className="space-y-4 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Patients", value: "168M", icon: HeartPulse },
                      { label: "Doctors", value: "89K", icon: Stethoscope },
                      { label: "Hospitals", value: "6.1K", icon: Hospital },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg bg-muted/60 p-3">
                        <s.icon className="h-4 w-4 text-primary" />
                        <div className="mt-2 text-lg font-bold">{s.value}</div>
                        <div className="text-[11px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">Disease surveillance</span>
                      <span className="text-xs text-muted-foreground">Last 7 months</span>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {[30, 25, 40, 55, 80, 120, 170].map((v, i) => (
                        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-secondary" style={{ height: `${v / 2}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-success/10 p-3 text-sm">
                    <span className="flex items-center gap-2 font-medium text-success">
                      <CheckCircle2 className="h-4 w-4" /> System operational
                    </span>
                    <span className="text-xs text-muted-foreground">99.98% uptime</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency 999 banner */}
      <section className="border-y bg-destructive/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-destructive text-white shadow-lg">
              <Ambulance className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-destructive">
                National Emergency Service
              </div>
              <div className="text-lg font-bold">
                Ambulance & medical emergency — dial{" "}
                <span className="text-destructive">999</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Free 24/7 service across Bangladesh. Fire, police & ambulance dispatch.
              </div>
            </div>
          </div>
          <a href="tel:999" className="w-full md:w-auto">
            <Button size="lg" className="w-full gap-2 bg-destructive text-white hover:bg-destructive/90 md:w-auto">
              <Phone className="h-5 w-5" /> Call 999 now
            </Button>
          </a>
        </div>
      </section>

      {/* Meet our doctors */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl gradient-brand-soft opacity-60 blur-2xl" />
            <img
              src={doctorImg}
              alt="Dr. Ayesha Karim, senior consultant registered on NHIMS Bangladesh"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full rounded-3xl object-cover shadow-xl"
            />
            <Card className="absolute -bottom-6 left-6 flex items-center gap-3 border-border/60 p-3 shadow-lg">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="pr-3">
                <div className="text-sm font-bold">89,000+ verified doctors</div>
                <div className="text-xs text-muted-foreground">across 64 districts</div>
              </div>
            </Card>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">
              Trusted physicians
            </div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Meet the doctors on NHIMS
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every physician on NHIMS is verified against the Bangladesh Medical &
              Dental Council registry. Patients can search by specialty, division and
              language, then book directly and share their record with one tap.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "BMDC-verified profile with license number",
                "Chamber address, visit hours and consultation fee",
                "Patient-rated care quality and response time",
                "In-person and telemedicine appointments",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/login">
                <Button size="lg" className="gradient-brand text-white">
                  Find a doctor <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DoctorDirectory />

      {/* Medical accessories */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">
              Medical accessories & supplies
            </div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Everything you need for daily care
            </h2>
            <p className="mt-3 text-muted-foreground">
              Order verified medical accessories from partnered pharmacies across
              Bangladesh, with home delivery and NHIMS prescription linking.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Stethoscope, title: "Stethoscopes", desc: "For clinics & students" },
              { icon: Thermometer, title: "Thermometers", desc: "Digital & infrared" },
              { icon: Activity, title: "BP monitors", desc: "Home blood-pressure kits" },
              { icon: HeartPulse, title: "Pulse oximeters", desc: "SpO₂ & heart rate" },
              { icon: Syringe, title: "Syringes & needles", desc: "Sterile, single-use" },
              { icon: Bandage, title: "First-aid supplies", desc: "Bandages, gauze, antiseptic" },
              { icon: Tablets, title: "OTC medicines", desc: "Common pain & fever relief" },
              { icon: Wind, title: "Nebulizers & masks", desc: "Respiratory care at home" },
              { icon: Glasses, title: "Diabetes care", desc: "Glucometers & test strips" },
              { icon: Pill, title: "Vitamins & supplements", desc: "DGDA-approved brands" },
              { icon: Hospital, title: "Mobility aids", desc: "Crutches, walkers, wheelchairs" },
              { icon: ShieldCheck, title: "PPE & masks", desc: "Gloves, N95, face shields" },
            ].map((a) => (
              <Card key={a.title} className="group border-border/60 p-5 transition hover:border-primary/40 hover:shadow-md">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-semibold">{a.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{a.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Core capabilities</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Built for nationwide healthcare delivery</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: HeartPulse, title: "Unified patient records", desc: "Lifetime medical history accessible with National ID across all facilities." },
            { icon: Stethoscope, title: "E-prescriptions", desc: "Doctors create tamper-proof digital prescriptions instantly shared with pharmacies." },
            { icon: FlaskConical, title: "Lab integration", desc: "Diagnostic centers upload results directly to patient records in real time." },
            { icon: Pill, title: "Pharmacy verification", desc: "Pharmacists verify prescription authenticity and update dispensing logs." },
            { icon: BarChart3, title: "Health analytics", desc: "DGHS monitors disease trends, outbreaks, and vaccination coverage nationally." },
            { icon: ShieldCheck, title: "Consent & audit", desc: "Every record access is logged. Patients control who sees their data." },
          ].map((f) => (
            <Card key={f.title} className="border-border/60 p-6 transition hover:border-primary/40 hover:shadow-md">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">For every stakeholder</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Seven role-based experiences</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Patients", "Doctors", "Hospital staff", "Diagnostic centers",
              "Pharmacists", "System admins", "Govt. health authority", "and more…"
            ].map((r) => (
              <div key={r} className="rounded-xl border bg-card p-5">
                <div className="text-sm font-semibold">{r}</div>
                <div className="mt-1 text-xs text-muted-foreground">Role-specific dashboard</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">End-to-end workflow</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">From appointment to prescription in one system</h2>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            "Patient books appointment",
            "Doctor reviews history",
            "E-prescription created",
            "Lab tests requested",
            "Results uploaded",
            "Pharmacy dispenses",
          ].map((step, i) => (
            <li key={step} className="rounded-xl border bg-card p-5">
              <div className="text-xs font-semibold text-primary">Step {i + 1}</div>
              <div className="mt-2 text-sm font-medium">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Security */}
      <section id="security" className="border-t bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">Security first</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your health data, protected</h2>
            <p className="mt-4 text-muted-foreground">
              NHIMS follows HIPAA-equivalent and ISO 27001 standards to protect
              records for every Bangladeshi citizen.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "AES-256 encryption at rest and in transit",
                "Two-factor authentication for all healthcare professionals",
                "Fine-grained role-based access control",
                "Immutable audit trail on every record access",
                "Patient consent required for cross-institution sharing",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-border/60 p-8">
            <Activity className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Ready to explore?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in as any of the 7 user roles to explore the full prototype
              with sample patients, prescriptions, lab reports, and analytics.
            </p>
            <Link to="/login">
              <Button className="mt-6 gradient-brand text-white">
                Try the demo <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <footer className="border-t bg-muted/40 py-8 text-center text-sm text-muted-foreground">
        © 2026 NHIMS Bangladesh · Directorate General of Health Services · Prototype
      </footer>
    </div>
  );
}
