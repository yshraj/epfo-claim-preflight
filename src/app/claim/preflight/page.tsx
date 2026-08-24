import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { CheckResult, MemberProfile } from "@/types/member";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import { getExplanation } from "@/lib/llm";

const typedMembers = members as MemberProfile[];

const STATUS_STYLES: Record<CheckResult["status"], { dot: string; card: string }> = {
  pass: { dot: "bg-green-500", card: "border-green-200 bg-green-50" },
  warn: { dot: "bg-amber-500", card: "border-amber-200 bg-amber-50" },
  fail: { dot: "bg-red-500", card: "border-red-200 bg-red-50" },
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
  searchParams: { uan?: string; reason?: string };
}) {
  const member = typedMembers.find((m) => m.uan === searchParams.uan) ?? typedMembers[0];
  const reason = searchParams.reason ?? "medical";
  const checks = runPreflightChecks(member);
  const results = await withExplanations(checks);
  const readiness = overallReadiness(checks);

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-1">Pre-flight check</h1>
      <p className="text-sm text-slate-500 mb-6">
        Running 3 checks against your records before you submit.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {results.map((r) => {
          const style = STATUS_STYLES[r.status];
          return (
            <div key={r.key} className={`border rounded-lg p-4 ${style.card}`}>
              <div className="flex items-start gap-2">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${style.dot}`} />
                <div>
                  <div className="font-medium text-sm">{r.title}</div>
                  <div className="text-xs text-slate-600 mt-1">{r.detail}</div>
                  {r.fixHint && (
                    <div className="text-xs text-slate-500 mt-2 italic">{r.fixHint}</div>
                  )}
                  {r.whyItMatters && (
                    <div className="text-xs text-slate-600 mt-2 border-t border-slate-200/70 pt-2">
                      <span className="font-medium">Why this matters: </span>
                      {r.whyItMatters}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {readiness === "ready" && (
        <Link
          href={`/claim/status?uan=${member.uan}&reason=${reason}`}
          className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Submit claim
        </Link>
      )}

      {readiness === "fixable" && (
        <Link
          href={`/claim/fix?uan=${member.uan}&reason=${reason}`}
          className="block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Fix the issue and continue
        </Link>
      )}

      {readiness === "blocked" && (
        <div className="text-center text-sm text-slate-600 border border-slate-200 rounded-lg p-4">
          This claim can&apos;t be submitted yet — resolve the issue(s) above first.
          In a full build, each fail state routes to its own guided fix (e.g.
          bank KYC update, employer exit-date reminder).
        </div>
      )}
    </div>
  );
}
