import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { patients } from "@/lib/mock-data";
import {
  describeScope,
  listConsents,
  revokeConsent,
  type ConsentRecord,
} from "@/lib/consent-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { Search, ShieldCheck, ShieldOff, FileDown, Info, Receipt } from "lucide-react";
import { downloadConsentReceipt } from "@/lib/consent-receipt";

export const Route = createFileRoute("/_app/consents")({
  head: () => ({
    meta: [
      { title: "Consent Management · NHIMS" },
      {
        name: "description",
        content:
          "Review, search and revoke every recorded consent that authorized an export of your health data.",
      },
    ],
  }),
  component: ConsentsPage,
});

function formatTs(ts: string) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return ts;
  }
}

function ConsentsPage() {
  const me = patients[0];
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);

  const all = useMemo<ConsentRecord[]>(
    () => (hydrated ? listConsents(me.id) : []),
    [hydrated, me.id, tick],
  );

  const filtered = all.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [c.action, c.channel, describeScope(c.scope), formatTs(c.ts)]
      .filter(Boolean)
      .some((v) => v!.toLowerCase().includes(q));
  });

  const active = all.filter((c) => !c.revokedAt).length;
  const revoked = all.length - active;

  return (
    <div>
      <PageHeader
        title="Consent management"
        description="Every export or share of your health record that you have authorized is listed here."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Total consents
          </div>
          <div className="mt-2 text-2xl font-bold">{all.length}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Active</div>
          <div className="mt-2 text-2xl font-bold text-success">{active}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Revoked</div>
          <div className="mt-2 text-2xl font-bold text-muted-foreground">{revoked}</div>
        </Card>
      </div>

      <Card className="mt-6 flex items-start gap-3 border-primary/30 bg-primary/5 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <div className="font-semibold">What "consent" means here</div>
          <p className="mt-1 text-muted-foreground">
            A consent is recorded whenever you explicitly authorize NHIMS to export,
            share or transmit part of your health record. Revoking a consent stops
            it from being reused for automated sharing; it does not delete files
            already downloaded to your device.
          </p>
        </div>
      </Card>

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Consent history</h2>
            <p className="text-xs text-muted-foreground">
              Search by action, channel, scope or date.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search consents…"
              className="pl-9"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {!hydrated ? (
            <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
              Loading consent records…
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              {all.length === 0
                ? "You have not authorized any exports yet. When you download a PDF summary or share a record, it will be logged here."
                : "No consents match your search."}
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <FileDown className="h-4 w-4 text-primary" />
                    <span className="font-medium">{c.action}</span>
                    {c.revokedAt ? (
                      <Badge variant="outline" className="gap-1">
                        <ShieldOff className="h-3 w-3" /> Revoked
                      </Badge>
                    ) : (
                      <Badge className="gap-1 bg-success text-success-foreground">
                        <ShieldCheck className="h-3 w-3" /> Active
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Scope: <span className="text-foreground">{describeScope(c.scope)}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {formatTs(c.ts)} · via {c.channel}
                    {c.revokedAt && ` · revoked ${formatTs(c.revokedAt)}`}
                  </div>
                  {c.revokeReason && (
                    <div className="mt-2 rounded-md border-l-2 border-muted-foreground/40 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Revocation reason:</span> {c.revokeReason}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => downloadConsentReceipt(c)}
                  >
                    <Receipt className="h-4 w-4" /> Download receipt
                  </Button>
                  {!c.revokedAt && (
                    <RevokeConsentDialog
                      consentId={c.id}
                      onRevoked={() => setTick((t) => t + 1)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function RevokeConsentDialog({
  consentId,
  onRevoked,
}: {
  consentId: string;
  onRevoked: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const trimmed = reason.trim();
  const tooShort = trimmed.length < 5;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setReason("");
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ShieldOff className="h-4 w-4" /> Revoke
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke this consent?</AlertDialogTitle>
          <AlertDialogDescription>
            Future automated exports using this authorization will be blocked.
            Files you have already downloaded remain on your device — please
            delete them separately if you no longer want them shared.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor="revoke-reason">
            Reason for revocation <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="revoke-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. No longer sharing with this provider, downloaded PDF stored securely, etc."
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Minimum 5 characters. This reason is stored in the consent audit trail.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep active</AlertDialogCancel>
          <AlertDialogAction
            disabled={tooShort}
            onClick={(e) => {
              if (tooShort) {
                e.preventDefault();
                return;
              }
              revokeConsent(consentId, trimmed);
              onRevoked();
              setOpen(false);
              setReason("");
            }}
          >
            Revoke consent
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
