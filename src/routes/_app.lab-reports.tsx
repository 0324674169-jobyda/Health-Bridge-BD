import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { labReports } from "@/lib/mock-data";
import { FlaskConical, Upload, Download } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/lab-reports")({
  head: () => ({ meta: [{ title: "Lab Reports · NHIMS" }] }),
  component: Labs,
});

function Labs() {
  const { session } = useSession();
  const isDiag = session?.role === "diagnostic";
  return (
    <div>
      <PageHeader
        title="Laboratory reports"
        description={isDiag ? "Manage incoming test requests and upload results." : "View and download your laboratory test results."}
      />
      <div className="space-y-4">
        {labReports.map((l) => (
          <Card key={l.id} className="p-5">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-secondary/10 text-secondary">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-semibold">{l.test}</h3>
                  <Badge variant={l.status === "Completed" ? "default" : "outline"}>{l.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {l.patient} · {l.center} · Requested by {l.requestedBy} · {l.date}
                </div>
                {l.result && (
                  <div className="mt-3 rounded-md bg-muted/60 p-3 text-sm">
                    <span className="font-semibold">Result: </span>{l.result}
                  </div>
                )}
              </div>
              <div className="flex gap-2 sm:flex-col">
                {isDiag && l.status === "Pending" ? (
                  <Button size="sm" className="gradient-brand text-white" onClick={() => toast.success("Report uploaded")}>
                    <Upload className="mr-1 h-3.5 w-3.5" />Upload
                  </Button>
                ) : (
                  <Button size="sm" variant="outline"><Download className="mr-1 h-3.5 w-3.5" />Download</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
