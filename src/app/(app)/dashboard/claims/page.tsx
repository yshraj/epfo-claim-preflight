"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import StatusTimeline from "@/app/(app)/claim/status/StatusTimeline";
import { FileText } from "lucide-react";
import type { ClaimRecord } from "@/types/account";

import { useT } from "@/i18n/client";
import type { Translator } from "@/i18n";
const STATUS_TONE: Record<ClaimRecord["status"], "success" | "warning" | "error" | "info"> = {
  approved: "success",
  processing: "info",
  pending_clarification: "warning",
  rejected: "error",
};

// Built inside the component rather than at module scope: the labels depend
// on the active language, which isn't known until render.
const statusLabels = (t: Translator): Record<ClaimRecord["status"], string> => ({
  approved: t("claims.status.approved"),
  processing: t("claims.status.processing"),
  pending_clarification: t("claims.status.clarification"),
  rejected: t("claims.status.rejected"),
});

export default function MyClaimsPage() {
  const t = useT();
  const STATUS_LABEL = statusLabels(t);
  const { user } = useSession();

  if (!user) return null;

  return (
    <Container className="py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">{t("claims.title")}</h1>
        <p className="text-slate-500">{t("claims.subtitle")}</p>
      </div>

      {user.claims.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500">
          <FileText className="h-8 w-8 mx-auto mb-3 text-slate-300" />
          You haven&apos;t submitted any claims yet.
        </div>
      ) : (
        <div className="space-y-8">
          {user.claims.map((claim) => (
            <div key={claim.id}>
              <div className="flex items-start justify-between gap-4 mb-3 px-1">
                <div>
                  <div className="font-semibold text-slate-900">{claim.type}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    {claim.id} &middot; Submitted {claim.dateSubmitted}
                    {claim.amount ? ` · ₹${claim.amount.toLocaleString("en-IN")}` : ""}
                  </div>
                </div>
                <Badge tone={STATUS_TONE[claim.status]}>{STATUS_LABEL[claim.status]}</Badge>
              </div>
              <StatusTimeline claim={claim} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
