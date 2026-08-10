import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prescriptions } from "@/lib/mock-data";
import { Pill, Download, Share2 } from "lucide-react";

export const Route = createFileRoute("/_app/prescriptions")({
  head: () => ({ meta: [{ title: "Prescriptions · NHIMS" }] }),
  component: Rx,
});

function Rx() {
  return (
    <div>
      <PageHeader title="Prescriptions" description="Electronic prescriptions issued and dispensed across the network." />
      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Pill className="h-4 w-4" /></div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{p.id}</div>
                    <div className="font-semibold">{p.patient}</div>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Prescribed by {p.doctor} · {p.date}</div>
              </div>
              <Badge variant={p.status === "Dispensed" ? "secondary" : "default"}>{p.status}</Badge>
            </div>
            <div className="mt-4 divide-y rounded-lg border">
              {p.items.map((it, i) => (
                <div key={i} className="p-3">
                  <div className="font-medium">{it.drug}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {it.dose} · {it.freq} · {it.duration}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm"><Download className="mr-1 h-3.5 w-3.5" />Download</Button>
              <Button variant="outline" size="sm"><Share2 className="mr-1 h-3.5 w-3.5" />Share to pharmacy</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
