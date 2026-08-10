import { jsPDF } from "jspdf";
import { medicalHistory, labReports, prescriptions, patients } from "./mock-data";

export function downloadPatientHealthPdf(patientId: string) {
  const patient = patients.find((p) => p.id === patientId) ?? patients[0];
  const history = medicalHistory.filter((m) => m.patientId === patient.id);
  const labs = labReports.filter((l) => l.patientId === patient.id);
  const rx = prescriptions.filter((p) => p.patientId === patient.id);

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;
  let y = margin;

  const ensure = (space = 60) => {
    if (y + space > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const wrap = (text: string, size = 10, maxW = pageW - margin * 2) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    ensure(lines.length * (size + 2));
    doc.text(lines, margin, y);
    y += lines.length * (size + 2);
  };

  // Header band
  doc.setFillColor(16, 122, 87);
  doc.rect(0, 0, pageW, 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("NHIMS Bangladesh", margin, 30);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Patient Health Summary", margin, 50);
  doc.text(
    `Generated ${new Date().toLocaleString()}`,
    pageW - margin,
    50,
    { align: "right" },
  );
  y = 100;
  doc.setTextColor(20, 20, 20);

  // Patient card
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(patient.name, margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const info = [
    `Health ID: ${patient.id}`,
    `NID: ${patient.nid}`,
    `Age / Gender: ${patient.age} · ${patient.gender}`,
    `Blood Group: ${patient.blood}`,
    `Phone: ${patient.phone}`,
    `Division: ${patient.division}`,
    `Chronic conditions: ${patient.conditions.join(", ") || "None recorded"}`,
  ];
  info.forEach((line) => {
    doc.text(line, margin, y);
    y += 14;
  });
  y += 8;

  const section = (title: string) => {
    ensure(40);
    doc.setDrawColor(16, 122, 87);
    doc.setLineWidth(1);
    doc.line(margin, y, pageW - margin, y);
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  section("Medical History");
  if (!history.length) wrap("No records available.");
  history.forEach((r) => {
    ensure(60);
    doc.setFont("helvetica", "bold");
    doc.text(`${r.date} — ${r.diagnosis}`, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    doc.text(`${r.doctor} · ${r.type}`, margin, y);
    y += 12;
    doc.setTextColor(20, 20, 20);
    wrap(r.notes);
    y += 6;
  });

  section("Lab Reports");
  if (!labs.length) wrap("No lab reports available.");
  labs.forEach((l) => {
    ensure(60);
    doc.setFont("helvetica", "bold");
    doc.text(`${l.date} — ${l.test} [${l.status}]`, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    doc.text(`Requested by ${l.requestedBy} · ${l.center}`, margin, y);
    y += 12;
    doc.setTextColor(20, 20, 20);
    wrap(l.result || "Result pending.");
    y += 6;
  });

  section("Active Prescriptions");
  if (!rx.length) wrap("No prescriptions on file.");
  rx.forEach((p) => {
    ensure(70);
    doc.setFont("helvetica", "bold");
    doc.text(`${p.id} · ${p.date} — ${p.status}`, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    doc.text(`Prescribed by ${p.doctor}`, margin, y);
    y += 12;
    doc.setTextColor(20, 20, 20);
    p.items.forEach((it) => {
      wrap(`• ${it.drug} — ${it.dose}, ${it.freq} for ${it.duration}`);
    });
    y += 6;
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `NHIMS confidential health record · Page ${i} of ${pageCount}`,
      pageW / 2,
      pageH - 20,
      { align: "center" },
    );
  }

  doc.save(`NHIMS_${patient.id}_health_summary.pdf`);
}
