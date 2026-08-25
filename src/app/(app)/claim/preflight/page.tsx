import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { CheckResult, MemberProfile } from "@/types/member";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import { getExplanation } from "@/lib/llm";
import { applyOverrides, buildClaimHref, parseOverrides } from "@/lib/claimState";
import { resultsToGraphData } from "@/lib/identityGraph";
import IdentityGraph from "@/components/IdentityGraph";
import Container from "@/components/ui/Container";
import MatchScoreMeter from "@/components/ui/MatchScoreMeter";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from "lucide-react";
import PreflightSequence from "./PreflightSequence";
import SubmitClaimButton from "@/components/claim/SubmitClaimButton";

const typedMembers = members as MemberProfile[];

const STATUS_STYLES: Record<CheckResult["status"], { icon: LucideIcon; iconColor: string; card: string }> = {
  pass: { icon: CheckCircle2, iconColor: "text-slate-300 group-hover:text-brand-600", card: "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50" },
  warn: { icon: AlertTriangle, iconColor: "text-slate-300 group-hover:text-amber-600", card: "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/50" },
  fail: { icon: XCircle, iconColor: "text-slate-300 group-hover:text-red-600", card: "border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/50" },
};

// "Why this matters" text is looked up from a static, precomputed cache
// (src/data/explanationCache.json) — no live LLM call happens here.
// See src/lib/llm/index.ts and docs/EPFO_Hackathon_Build_Plan.md.
async function withExplanations(results: CheckResult[]) {
  return Promise.all(
    results.map(async (r) => {
      if (r.status === "pass" || !r.variant) return { ...r, whyItMatters: undefined };
      const whyItMatters = await getExplanation({
        checkKey: r.key,
        status: r.status,
        variant: r.variant,
      });
      return { ...r, whyItMatters };
    }),
  );
}

export default async function PreflightPage({
  searchParams,
}: {
  searchParams: { uan?: string; reason?: string; nameOverride?: string; doeOverride?: string };
}) {
  const rawMember = typedMembers.find((m) => m.uan === searchParams.uan) ?? typedMembers[0];
  const overrides = parseOverrides(searchParams);
  const member = applyOverrides(rawMember, overrides);
  const reason = searchParams.reason ?? "medical";
  const checks = runPreflightChecks(member);
  const results = await withExplanations(checks);
  const readiness = overallReadiness(checks);
  const graphData = resultsToGraphData(checks);

  // Coarse ready/fixable/blocked isn't enough to route the "fix" CTA: the
  // interactive fix flow only exists for name_match. If name_match is the
  // sole non-passing check — warn OR fail — the fix flow can resolve it,
  // regardless of the coarser overall readiness label.
  const nameCheck = checks.find((c) => c.key === "name_match")!;
  const doeCheck = checks.find((c) => c.key === "date_of_exit")!;
  // For the hackathon demo, if there's a name issue, we allow fixing it even if
  // other checks fail. It will route back here sequentially to handle remaining issues.
  const canFixName = nameCheck.status !== "pass";
  const wasJustCorrected = Boolean(overrides.nameOverride || overrides.doeOverride);
  const numFails = checks.filter(c => c.status !== "pass").length;

  return (
    <Container size="narrow" className="py-16">
      <PreflightSequence wasJustCorrected={wasJustCorrected} readiness={readiness} numFails={numFails}>
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
          Before you submit
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          {wasJustCorrected
            ? "Re-checking your information..."
            : "We'll check the information most likely to delay your claim."}
        </p>

      <div className="mb-8 bg-white border border-slate-200 rounded-lg p-6">
        <IdentityGraph data={graphData} />
      </div>

      <div className="flex flex-col gap-3 mb-8" aria-live="polite">
        {results.map((r) => {
          const style = STATUS_STYLES[r.status];
          return (
            <div
              key={r.key}
              role="status"
              aria-label={`${r.title}: ${r.status}`}
              className={`group border rounded-lg p-4 transition-all duration-300 ${style.card}`}
            >
              <div className="flex items-start gap-3">
                <style.icon className={`h-5 w-5 shrink-0 mt-0.5 transition-colors duration-300 ${style.iconColor}`} aria-hidden="true" />
                <div>
                  <div className="font-medium text-sm text-slate-900">{r.title}</div>
                  <div className="text-sm text-slate-600 mt-1 font-mono">
                    {r.key === "name_match" && r.status !== "pass" ? (
                      <div className="flex flex-col gap-1 my-3 p-3 bg-slate-50 border border-slate-100 rounded-md">
                        {r.detail.split(' | ').map(line => (
                           <div key={line} className="flex justify-between">
                             <span className="text-slate-500">{line.split(': ')[0]}</span>
                             <span className="font-medium text-slate-900">{line.split(': ')[1]}</span>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <span>{r.detail}</span>
                    )}
                  </div>
                  {typeof r.score === "number" && r.status !== "pass" && <MatchScoreMeter score={r.score} />}
                  {r.fixHint && (
                    <div className="text-xs text-slate-500 mt-2 italic">{r.fixHint}</div>
                  )}
                  {r.whyItMatters && (
                    <details className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200/70 group/details cursor-pointer">
                      <summary className="font-medium text-slate-700 hover:text-brand-600 outline-none list-none flex items-center gap-1">
                        <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] group-hover/details:bg-brand-100 group-hover/details:text-brand-700">?</span>
                        Why are you seeing this?
                      </summary>
                      <div className="mt-2 pl-5 leading-relaxed">
                        {r.whyItMatters}
                      </div>
                    </details>
                  )}
                  {r.key === "date_of_exit" && r.status === "warn" && (
                    <Link
                      href={buildClaimHref("/claim/preflight", {
                        uan: member.uan,
                        reason,
                        overrides: {
                          nameOverride: overrides.nameOverride,
                          doeOverride: new Date().toISOString().slice(0, 10),
                        },
                      })}
                      className="inline-block text-xs font-medium text-brand-700 mt-2 underline"
                    >
                      Self-declare exit date now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {readiness === "ready" && (
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
          <h3 className="font-display font-bold text-xl text-brand-900 mb-2">You&apos;re ready to submit.</h3>
          <p className="text-sm text-brand-700 mb-6">All pre-flight checks passed successfully.</p>
          <SubmitClaimButton href={buildClaimHref("/claim/status", { uan: member.uan, reason })} reason={reason} />
        </div>
      )}

      {readiness !== "ready" && canFixName && (
        <Link
          href={buildClaimHref("/claim/fix", { uan: member.uan, reason, overrides })}
          className={cn(buttonVariants({ variant: "amber", size: "lg" }), "w-full")}
        >
          Fix the issue and continue
        </Link>
      )}

      {readiness !== "ready" && !canFixName && doeCheck.status !== "fail" && (
        <div className="text-center text-sm text-slate-600 border border-slate-200 rounded-lg p-4">
          This claim can&apos;t be submitted yet — resolve the issue(s) above first.
          In a full build, each remaining fail state routes to its own guided
          fix (e.g. bank KYC update).
        </div>
      )}

      {readiness !== "ready" && !canFixName && doeCheck.status === "fail" && (
        <div className="text-center text-sm text-slate-600 border border-slate-200 rounded-lg p-4">
          This claim can&apos;t be submitted yet — your employer needs to confirm
          your exit date, or check back once 60 days have passed to self-declare it.
        </div>
      )}
      </PreflightSequence>
    </Container>
  );
}
