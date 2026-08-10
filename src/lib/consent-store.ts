const CONSENT_KEY = "nhims:pdf-consent";

export type ConsentRecord = {
  id: string;
  patientId: string;
  ts: string;
  scope: string;
  action?: string;
  channel?: string;
  revokedAt?: string;
  revokeReason?: string;
};

type StoredEntry = Omit<ConsentRecord, "id"> & { id?: string };

function safeParse(): StoredEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(entries: StoredEntry[]) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function listConsents(patientId?: string): ConsentRecord[] {
  const entries = safeParse().map((e, i): ConsentRecord => ({
    id: e.id ?? `${e.ts}-${i}`,
    patientId: e.patientId,
    ts: e.ts,
    scope: e.scope,
    action: e.action ?? "PDF export",
    channel: e.channel ?? "Web portal",
    revokedAt: e.revokedAt,
    revokeReason: e.revokeReason,
  }));
  const filtered = patientId ? entries.filter((e) => e.patientId === patientId) : entries;
  return filtered.sort((a, b) => (a.ts < b.ts ? 1 : -1));
}

export function recordConsent(entry: Omit<ConsentRecord, "id">) {
  const entries = safeParse();
  entries.push({ ...entry, id: `${entry.ts}-${entries.length}` });
  persist(entries);
}

export function revokeConsent(id: string, reason: string) {
  const entries = safeParse().map((e, i) => {
    const eid = e.id ?? `${e.ts}-${i}`;
    if (eid === id) return {
      ...e,
      id: eid,
      revokedAt: new Date().toISOString(),
      revokeReason: reason.trim(),
    };
    return { ...e, id: eid };
  });
  persist(entries);
}

export const SCOPE_LABELS: Record<string, string> = {
  "medical_history+lab_summary": "Medical history & lab summary",
};

export function describeScope(scope: string) {
  return SCOPE_LABELS[scope] ?? scope;
}
