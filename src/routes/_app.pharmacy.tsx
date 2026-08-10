import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prescriptions } from "@/lib/mock-data";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/pharmacy")({
  head: () => ({ meta: [{ title: "Pharmacy Verification · NHIMS" }] }),
  component: Pharmacy,
});

function Pharmacy() {
  const [q, setQ] = useState("");
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(prescriptions.map((p) => [p.id, p.status])),
  );
  const filtered = prescriptions.filter(
    (p) => !q || p.id.toLowerCase().includes(q.toLowerCase()) || p.patient.toLowerCase().includes(q.toLowerCase()),
  );

  function dispense(id: string) {
    setStatuses((s) => ({ ...s, [id]: "Dispensed" }));
    toast.success(`Prescription ${id} dispensed and logged`);
  }

  return (
    <div>
      <PageHeader title="Prescription verification" description="Verify authenticity and update medication dispensing records." />
      <div className="mb-5 relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Scan or search prescription ID / patient" className="pl-9" value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((p) => {
          const st = statuses[p.id];
          return (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{p.id}</div>
                  <div className="text-lg font-semibold">{p.patient}</div>
                  <div className="text-xs text-muted-foreground">By {p.doctor} · {p.date}</div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                  <ShieldCheck className="h-3.5 w-3.5" /> Signature verified
                </div>
              </div>
              <div className="mt-4 divide-y rounded-lg border">
                {p.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between p-3">
                    <div>
                      <div className="font-medium">{it.drug}</div>
                      <div className="text-xs text-muted-foreground">{it.dose} · {it.freq} · {it.duration}</div>
                    </div>
                    <Badge variant="outline">In stock</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant={st === "Dispensed" ? "secondary" : "default"}>{st}</Badge>
                <Button
                  size="sm"
                  disabled={st === "Dispensed"}
                  onClick={() => dispense(p.id)}
                  className="gradient-brand text-white disabled:opacity-60"
                >
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  {st === "Dispensed" ? "Dispensed" : "Mark dispensed"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
