import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { patients } from "@/lib/mock-data";
import { useState } from "react";
import { Search, FileHeart } from "lucide-react";

export const Route = createFileRoute("/_app/patients")({
  head: () => ({ meta: [{ title: "Patients · NHIMS" }] }),
  component: PatientsPage,
});

function PatientsPage() {
  const [q, setQ] = useState("");
  const filtered = patients.filter(
    (p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.nid.includes(q) || p.id.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <PageHeader title="Patients" description="Search by National ID or Health ID to access records with consent." />
      <div className="mb-5 relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by name, NID or Health ID…" className="pl-9" value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">Health ID {p.id} · NID {p.nid}</div>
              </div>
              <Badge variant="outline">{p.blood}</Badge>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div><dt className="text-muted-foreground">Age</dt><dd className="font-medium">{p.age}</dd></div>
              <div><dt className="text-muted-foreground">Gender</dt><dd className="font-medium">{p.gender}</dd></div>
              <div><dt className="text-muted-foreground">Division</dt><dd className="font-medium">{p.division}</dd></div>
              <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{p.phone}</dd></div>
            </dl>
            {p.conditions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.conditions.map((c) => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}
              </div>
            )}
            <Button size="sm" variant="outline" className="mt-4 w-full">
              <FileHeart className="mr-1 h-3.5 w-3.5" />View record
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
