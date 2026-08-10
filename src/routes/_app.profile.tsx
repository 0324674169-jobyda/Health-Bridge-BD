import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExportHealthPdfButton } from "@/components/export-health-pdf-button";
import { patients } from "@/lib/mock-data";
import { User } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "My Profile · NHIMS" }] }),
  component: Profile,
});

function Profile() {
  const me = patients[0];
  return (
    <div>
      <PageHeader
        title="My health profile"
        description="Your unified patient record."
        actions={<ExportHealthPdfButton patientId={me.id} />}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full gradient-brand text-white">
              <User className="h-8 w-8" />
            </div>
            <div className="mt-3 text-lg font-bold">{me.name}</div>
            <div className="text-xs text-muted-foreground">Health ID {me.id}</div>
            <Badge className="mt-2" variant="outline">NID {me.nid}</Badge>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            {[
              ["Age", `${me.age} years`],
              ["Gender", me.gender],
              ["Blood group", me.blood],
              ["Phone", me.phone],
              ["Division", me.division],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold">Chronic conditions & allergies</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {me.conditions.length ? me.conditions.map((c) => <Badge key={c} variant="secondary">{c}</Badge>) : <span className="text-sm text-muted-foreground">None recorded</span>}
          </div>
          <h3 className="mt-8 font-semibold">Consent & sharing</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You have granted access to your medical history for the following providers:
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-lg border p-3">
              <span>Dr. Ayesha Karim — Cardiology</span>
              <Badge>Active</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border p-3">
              <span>Popular Diagnostic Center</span>
              <Badge>Active</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border p-3">
              <span>Lazz Pharma — Dhanmondi</span>
              <Badge variant="outline">30 days</Badge>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
