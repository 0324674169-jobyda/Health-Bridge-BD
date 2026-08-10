import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExportHealthPdfButton } from "@/components/export-health-pdf-button";
import { medicalHistory, patients } from "@/lib/mock-data";
import { FileHeart } from "lucide-react";

export const Route = createFileRoute("/_app/medical-history")({
  head: () => ({ meta: [{ title: "Medical History · NHIMS" }] }),
  component: History,
});

function History() {
  const me = patients[0];
  const records = medicalHistory.filter((m) => m.patientId === me.id);
  return (
    <div>
      <PageHeader
        title="Medical history"
        description={`Complete lifetime record for ${me.name} · NID ${me.nid}`}
        actions={<ExportHealthPdfButton patientId={me.id} />}
      />
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-6" />
        <div className="space-y-4">
          {records.map((r) => (
            <div key={r.id} className="relative pl-10 sm:pl-14">
              <div className="absolute left-2 top-4 grid h-6 w-6 place-items-center rounded-full gradient-brand text-white sm:left-4">
                <FileHeart className="h-3 w-3" />
              </div>
              <Card className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">{r.date} · {r.doctor}</div>
                    <div className="mt-1 text-lg font-semibold">{r.diagnosis}</div>
                  </div>
                  <Badge variant="outline">{r.type}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.notes}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
