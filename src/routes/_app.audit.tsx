import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auditLogs } from "@/lib/mock-data";
import { ClipboardList } from "lucide-react";

export const Route = createFileRoute("/_app/audit")({
  head: () => ({ meta: [{ title: "Audit Logs · NHIMS" }] }),
  component: Audit,
});

const extended = [
  ...auditLogs,
  { id: 5, actor: "Dr. Tanvir Hasan", action: "Created prescription", target: "RX-3304", ts: "2026-07-13 18:12" },
  { id: 6, actor: "Fatima Begum", action: "Granted consent", target: "Dr. Shirin Akter", ts: "2026-07-13 16:45" },
  { id: 7, actor: "System", action: "Backup completed", target: "db-primary", ts: "2026-07-13 03:00" },
];

function Audit() {
  return (
    <div>
      <PageHeader title="Audit logs" description="Immutable trail of every record access across the system." />
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Category</th>
              </tr>
            </thead>
            <tbody>
              {extended.map((l) => (
                <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{l.ts}</td>
                  <td className="px-4 py-3 font-medium">{l.actor}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2"><ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />{l.action}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{l.target}</td>
                  <td className="px-4 py-3"><Badge variant="outline">Info</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
