import { redirect } from "next/navigation";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import { applyOverrides, buildClaimHref, parseOverrides } from "@/lib/claimState";
import StatusTimeline from "./StatusTimeline";
import GrievanceEscalation from "./GrievanceEscalation";
import Container from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";
import { getLocale, getT } from "@/i18n/server";

const typedMembers = members as MemberProfile[];

// Deterministic, not random — stable across refresh, and directly
// Playwright-testable without mocking Date/Math.random.
function referenceNumber(uan: string, reason: string): string {
  return `CLM-2026-${uan.slice(-4)}${(reason[0] ?? "X").toUpperCase()}`;
}

// Screen 6 — replaces "silence for 20 days" with a visible state machine.
// Guarded: this page is unreachable unless the underlying checks actually
// pass right now, so it can never show a false "claim ready" confirmation.
export default function StatusPage({
  searchParams,
}: {
  searchParams: {
    uan?: string;
    reason?: string;
    nameOverride?: string;
    dobOverride?: string;
    doeOverride?: string;
  };
}) {
  const rawMember = typedMembers.find((m) => m.uan === searchParams.uan) ?? typedMembers[0];
  const overrides = parseOverrides(searchParams);
  const member = applyOverrides(rawMember, overrides);
  const t = getT();
  const locale = getLocale();
  const reason = searchParams.reason ?? "medical";
  const readiness = overallReadiness(runPreflightChecks(member, t, `${locale}-IN`));

  if (readiness !== "ready") {
    redirect(buildClaimHref("/claim/preflight", { uan: member.uan, reason, overrides }));
  }

  const reference = referenceNumber(member.uan, reason);
  const submittedAt = new Date().toLocaleString(`${locale}-IN`, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Container size="narrow" className="py-16">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950">
          {t("status.title")}
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        {t(`claim.reason.${reason}` as never)} · {member.aadhaarName}
      </p>

      <dl className="grid grid-cols-2 gap-y-3 gap-x-4 rounded-lg border border-slate-200 bg-white shadow-sm p-5 mb-2 text-sm">
        <dt className="text-slate-500">{t("status.reference")}</dt>
        <dd className="font-mono font-semibold text-right">{reference}</dd>
        <dt className="text-slate-500">{t("status.submitted")}</dt>
        <dd className="font-medium text-right">{submittedAt}</dd>
        <dt className="text-slate-500">{t("status.status")}</dt>
        <dd className="font-medium text-right text-brand-700">{t("status.processing")}</dd>
      </dl>

      <p className="text-xs text-slate-400 mb-8">
        {t("status.syntheticRef")}
      </p>

      <StatusTimeline />
      <GrievanceEscalation reference={reference} />
    </Container>
  );
}
