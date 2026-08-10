import { jsPDF } from "jspdf";
import { patients } from "./mock-data";
import { describeScope, type ConsentRecord } from "./consent-store";

export function downloadConsentReceipt(consent: ConsentRecord) {
  const patient = patients.find((p) => p.id === consent.patientId);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;

  // Header
  doc.setFillColor(16, 122, 87);
  doc.rect(0, 0, pageW, 80, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("NHIMS Bangladesh", margin, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Consent Receipt", margin, 54);
  doc.text(
    `Issued ${new Date().toLocaleString()}`,
    pageW - margin,
    54,
    { align: "right" },
  );

  doc.setTextColor(20, 20, 20);
  let y = 120;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Proof of consent", margin, y);
  y += 8;
  doc.setDrawColor(16, 122, 87);
  doc.setLineWidth(1);
  doc.line(margin, y, pageW - margin, y);
  y += 24;

  const rows: [string, string][] = [
    ["Receipt ID", consent.id],
    ["Patient", patient ? `${patient.name} (Health ID ${patient.id})` : consent.patientId],
    ["NID", patient?.nid ?? "—"],
    ["Action authorized", consent.action ?? "PDF export"],
    ["Data scope", describeScope(consent.scope)],
    ["Channel", consent.channel ?? "Web portal"],
    ["Granted at", new Date(consent.ts).toLocaleString()],
    ["Status", consent.revokedAt ? `Revoked ${new Date(consent.revokedAt).toLocaleString()}` : "Active"],
    ...(consent.revokeReason ? ([["Revocation reason", consent.revokeReason]] as [string, string][]) : []),
  ];

  doc.setFontSize(10);
  rows.forEach(([k, v]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(90, 90, 90);
    doc.text(k, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(v, pageW - margin * 2 - 140);
    doc.text(lines, margin + 140, y);
    y += Math.max(16, lines.length * 14);
  });

  y += 20;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Patient acknowledgement", margin, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const ack = doc.splitTextToSize(
    "The patient identified above explicitly authorized the action described in this receipt under the NHIMS Data Protection & Patient Rights policy. This receipt serves as portable proof of consent and may be presented to healthcare providers or regulators. Revoking the consent in the NHIMS portal does not invalidate previously downloaded copies of exported data.",
    pageW - margin * 2,
  );
  doc.text(ack, margin, y);
  y += ack.length * 14 + 30;

  doc.setDrawColor(120, 120, 120);
  doc.line(margin, y, margin + 200, y);
  doc.line(pageW - margin - 200, y, pageW - margin, y);
  y += 14;
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("Patient signature", margin, y);
  doc.text("NHIMS authorized officer", pageW - margin - 200, y);

  doc.setFontSize(8);
  doc.text(
    `NHIMS confidential · Receipt ${consent.id}`,
    pageW / 2,
    pageH - 20,
    { align: "center" },
  );

  doc.save(`NHIMS_consent_${consent.id}.pdf`);
}
