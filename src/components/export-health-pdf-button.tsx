import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { downloadPatientHealthPdf } from "@/lib/pdf-export";
import { recordConsent } from "@/lib/consent-store";

export function ExportHealthPdfButton({ patientId }: { patientId: string }) {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [ack, setAck] = useState(false);

  const handleConfirm = () => {
    if (!agreed || !ack) return;
    recordConsent({
      patientId,
      ts: new Date().toISOString(),
      scope: "medical_history+lab_summary",
      action: "PDF export",
      channel: "Web portal",
    });
    downloadPatientHealthPdf(patientId);
    setOpen(false);
    setAgreed(false);
    setAck(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Download PDF summary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Patient consent required</DialogTitle>
          <DialogDescription>
            Exporting your medical history and lab summary creates an unencrypted PDF
            containing protected health information. Please review and provide explicit
            consent before continuing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="rounded-md border bg-muted/40 p-3 text-muted-foreground">
            <p className="font-medium text-foreground">The PDF will include:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Demographics, NID and Health ID</li>
              <li>Chronic conditions and diagnoses</li>
              <li>Lab reports and results</li>
              <li>Active prescriptions</li>
            </ul>
          </div>
          <label className="flex items-start gap-3">
            <Checkbox
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              className="mt-0.5"
            />
            <span>
              I consent to exporting my personal health information under the
              NHIMS Data Protection & Patient Rights policy.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <Checkbox
              checked={ack}
              onCheckedChange={(v) => setAck(v === true)}
              className="mt-0.5"
            />
            <span>
              I understand the downloaded file is my responsibility to store securely
              and this action will be recorded in the audit log.
            </span>
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!agreed || !ack} className="gap-2">
            <Download className="h-4 w-4" /> Confirm & download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
