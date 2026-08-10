// Mock data for NHIMS Bangladesh prototype

export type UserRole =
  | "patient"
  | "doctor"
  | "hospital"
  | "diagnostic"
  | "pharmacist"
  | "admin"
  | "authority";

export const roleLabels: Record<UserRole, string> = {
  patient: "Patient",
  doctor: "Doctor",
  hospital: "Hospital / Clinic Staff",
  diagnostic: "Diagnostic Center",
  pharmacist: "Pharmacist",
  admin: "System Administrator",
  authority: "Govt. Health Authority",
};

export const demoAccounts: Record<UserRole, { name: string; nid: string; email: string }> = {
  patient: { name: "Rahim Uddin", nid: "1990-4567-8912", email: "rahim@nhims.bd" },
  doctor: { name: "Dr. Ayesha Karim", nid: "DOC-2145", email: "ayesha@nhims.bd" },
  hospital: { name: "Dhaka Medical Staff", nid: "HSP-901", email: "staff@dmch.bd" },
  diagnostic: { name: "Popular Diagnostic", nid: "DIAG-334", email: "lab@popular.bd" },
  pharmacist: { name: "Lazz Pharma", nid: "PHR-778", email: "pharma@lazz.bd" },
  admin: { name: "System Admin", nid: "ADM-001", email: "admin@nhims.bd" },
  authority: { name: "DGHS Officer", nid: "GOV-101", email: "dghs@nhims.bd" },
};

export const patients = [
  { id: "P-10001", nid: "1990-4567-8912", name: "Rahim Uddin", age: 34, gender: "Male", blood: "B+", phone: "+8801711223344", division: "Dhaka", conditions: ["Hypertension"] },
  { id: "P-10002", nid: "1988-1122-3344", name: "Fatima Begum", age: 36, gender: "Female", blood: "O+", phone: "+8801811556677", division: "Chattogram", conditions: ["Diabetes Type 2"] },
  { id: "P-10003", nid: "2001-9988-7766", name: "Sadia Islam", age: 23, gender: "Female", blood: "A-", phone: "+8801912334455", division: "Sylhet", conditions: [] },
  { id: "P-10004", nid: "1975-3344-2211", name: "Md. Karim Sheikh", age: 49, gender: "Male", blood: "AB+", phone: "+8801611445566", division: "Khulna", conditions: ["Asthma", "Hypertension"] },
  { id: "P-10005", nid: "1995-7766-5544", name: "Nusrat Jahan", age: 29, gender: "Female", blood: "B-", phone: "+8801311998877", division: "Rajshahi", conditions: [] },
];

export const doctors = [
  { id: "D-2145", name: "Dr. Ayesha Karim", specialty: "Cardiology", hospital: "Dhaka Medical College", rating: 4.9 },
  { id: "D-2146", name: "Dr. Tanvir Hasan", specialty: "General Medicine", hospital: "Square Hospital", rating: 4.7 },
  { id: "D-2147", name: "Dr. Shirin Akter", specialty: "Endocrinology", hospital: "United Hospital", rating: 4.8 },
  { id: "D-2148", name: "Dr. Mahmud Rahman", specialty: "Pediatrics", hospital: "Apollo Hospitals", rating: 4.6 },
];

export const appointments = [
  { id: "A-501", patient: "Rahim Uddin", patientId: "P-10001", doctor: "Dr. Ayesha Karim", specialty: "Cardiology", date: "2026-07-16", time: "10:30", status: "Confirmed", hospital: "Dhaka Medical College" },
  { id: "A-502", patient: "Fatima Begum", patientId: "P-10002", doctor: "Dr. Shirin Akter", specialty: "Endocrinology", date: "2026-07-17", time: "14:00", status: "Pending", hospital: "United Hospital" },
  { id: "A-503", patient: "Sadia Islam", patientId: "P-10003", doctor: "Dr. Tanvir Hasan", specialty: "General Medicine", date: "2026-07-15", time: "09:00", status: "Completed", hospital: "Square Hospital" },
  { id: "A-504", patient: "Md. Karim Sheikh", patientId: "P-10004", doctor: "Dr. Ayesha Karim", specialty: "Cardiology", date: "2026-07-20", time: "11:15", status: "Confirmed", hospital: "Dhaka Medical College" },
];

export const medicalHistory = [
  { id: "M-901", patientId: "P-10001", date: "2026-05-12", doctor: "Dr. Ayesha Karim", diagnosis: "Stage 1 Hypertension", notes: "BP 145/95. Advised lifestyle changes, low sodium diet.", type: "Consultation" },
  { id: "M-902", patientId: "P-10001", date: "2026-02-08", doctor: "Dr. Tanvir Hasan", diagnosis: "Seasonal flu", notes: "Fever, cough. Prescribed paracetamol.", type: "Consultation" },
  { id: "M-903", patientId: "P-10001", date: "2025-11-20", doctor: "Dr. Ayesha Karim", diagnosis: "Routine cardiac screening", notes: "ECG normal. Follow up in 6 months.", type: "Screening" },
  { id: "M-904", patientId: "P-10002", date: "2026-06-01", doctor: "Dr. Shirin Akter", diagnosis: "Diabetes Type 2 follow-up", notes: "HbA1c 7.8%. Adjusted metformin dosage.", type: "Follow-up" },
];

export const prescriptions = [
  {
    id: "RX-3301", patientId: "P-10001", patient: "Rahim Uddin", doctor: "Dr. Ayesha Karim", date: "2026-05-12", status: "Active",
    items: [
      { drug: "Amlodipine 5mg", dose: "1 tab", freq: "Once daily", duration: "30 days" },
      { drug: "Losartan 50mg", dose: "1 tab", freq: "Morning", duration: "30 days" },
    ],
  },
  {
    id: "RX-3302", patientId: "P-10002", patient: "Fatima Begum", doctor: "Dr. Shirin Akter", date: "2026-06-01", status: "Active",
    items: [
      { drug: "Metformin 850mg", dose: "1 tab", freq: "Twice daily", duration: "60 days" },
      { drug: "Glimepiride 2mg", dose: "1 tab", freq: "Morning", duration: "60 days" },
    ],
  },
  {
    id: "RX-3303", patientId: "P-10003", patient: "Sadia Islam", doctor: "Dr. Tanvir Hasan", date: "2026-07-15", status: "Dispensed",
    items: [{ drug: "Paracetamol 500mg", dose: "1 tab", freq: "Every 6 hours", duration: "5 days" }],
  },
];

export const labReports = [
  { id: "LAB-7701", patientId: "P-10001", patient: "Rahim Uddin", test: "Lipid Profile", requestedBy: "Dr. Ayesha Karim", center: "Popular Diagnostic", date: "2026-05-14", status: "Completed", result: "Cholesterol: 220 mg/dL (High), HDL: 42, LDL: 148, Triglycerides: 180" },
  { id: "LAB-7702", patientId: "P-10001", patient: "Rahim Uddin", test: "ECG", requestedBy: "Dr. Ayesha Karim", center: "Dhaka Medical College", date: "2026-05-13", status: "Completed", result: "Normal sinus rhythm. No ischemic changes." },
  { id: "LAB-7703", patientId: "P-10002", patient: "Fatima Begum", test: "HbA1c", requestedBy: "Dr. Shirin Akter", center: "Popular Diagnostic", date: "2026-06-02", status: "Completed", result: "HbA1c: 7.8% (Elevated)" },
  { id: "LAB-7704", patientId: "P-10004", patient: "Md. Karim Sheikh", test: "Chest X-Ray", requestedBy: "Dr. Ayesha Karim", center: "Popular Diagnostic", date: "2026-07-14", status: "Pending", result: "" },
];

export const stats = {
  totalPatients: 168420321,
  activeDoctors: 89422,
  hospitals: 6134,
  todayAppointments: 21430,
  prescriptionsToday: 48211,
  labReportsToday: 12980,
};

export const diseaseTrends = [
  { month: "Jan", dengue: 320, covid: 210, flu: 890 },
  { month: "Feb", dengue: 280, covid: 180, flu: 950 },
  { month: "Mar", dengue: 410, covid: 160, flu: 720 },
  { month: "Apr", dengue: 620, covid: 140, flu: 540 },
  { month: "May", dengue: 980, covid: 210, flu: 430 },
  { month: "Jun", dengue: 1540, covid: 260, flu: 380 },
  { month: "Jul", dengue: 2210, covid: 320, flu: 340 },
];

export const vaccinationPrograms = [
  { name: "COVID-19 Booster", coverage: 78, target: "Adults 18+" },
  { name: "MMR", coverage: 92, target: "Children under 5" },
  { name: "HPV", coverage: 64, target: "Girls 9-14" },
  { name: "Hepatitis B", coverage: 88, target: "Newborns" },
];

export const auditLogs = [
  { id: 1, actor: "Dr. Ayesha Karim", action: "Viewed patient record", target: "P-10001", ts: "2026-07-14 09:41" },
  { id: 2, actor: "Popular Diagnostic", action: "Uploaded lab report", target: "LAB-7701", ts: "2026-07-14 09:18" },
  { id: 3, actor: "Lazz Pharma", action: "Dispensed prescription", target: "RX-3303", ts: "2026-07-14 08:50" },
  { id: 4, actor: "System Admin", action: "Approved diagnostic center", target: "DIAG-334", ts: "2026-07-13 21:02" },
];
