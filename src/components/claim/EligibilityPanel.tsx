import type { EligibilityResult } from "@/types/member";
import { formatRupees } from "@/lib/eligibilityEngine";
import { getT } from "@/i18n/server";
import { Info, Lock, Wallet } from "lucide-react";

// Server component. Renders the output of eligibilityEngine.ts — the arithmetic
// is shown in full rather than summarised, because "why is it this number and
// not my whole balance?" is exactly the question the current portal leaves
// unanswered until after a claim is filed.
export default function EligibilityPanel({ result }: { result: EligibilityResult }) {
  const t = getT();
  const blocked = result.status === "not_yet_eligible";

  return (
    <section
      aria-label={t("eligibility.panel.aria", { reason: t(`reason.${result.reason}`) })}
      className={`mb-8 rounded-lg border p-6 ${
        blocked ? "border-amber-200 bg-amber-50/60" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            {blocked ? t("eligibility.panel.notYet") : t("eligibility.panel.canWithdraw")}
          </div>
          {blocked ? (
            <div className="font-display text-xl font-bold text-amber-900">
              {result.blockedReason}
            </div>
          ) : (
            <div className="font-display text-3xl font-bold tracking-tight text-slate-950">
              {formatRupees(result.withdrawableAmount)}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            {t("eligibility.panel.category")}
          </div>
          <div className="text-sm font-medium text-slate-700">{result.categoryLabel}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {t("eligibility.panel.service", { service: result.serviceLabel })}
          </div>
        </div>
      </div>

      {result.breakdown.length > 0 && (
        <dl className="border-t border-slate-200 pt-4 flex flex-col gap-2">
          {result.breakdown.map((line) => (
            <div key={line.label} className="flex items-baseline justify-between gap-4 text-sm">
              <dt className="text-slate-600">
                {line.label}
                {line.note && (
                  <span className="block text-xs text-slate-400 mt-0.5">{line.note}</span>
                )}
              </dt>
              <dd
                className={`font-mono shrink-0 ${
                  line.amount < 0 ? "text-amber-700" : "text-slate-900"
                }`}
              >
                {line.amount < 0 ? "−" : ""}
                {formatRupees(Math.abs(line.amount))}
              </dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 text-sm border-t border-slate-200 pt-2 mt-1">
            <dt className="font-medium text-slate-900">{t("eligibility.panel.payable")}</dt>
            <dd className="font-mono font-bold text-slate-950">
              {formatRupees(result.withdrawableAmount)}
            </dd>
          </div>
        </dl>
      )}

      {result.minimumBalance > 0 && (
        <div className="flex items-start gap-2 mt-4 text-xs text-slate-500">
          <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {t("eligibility.panel.retained", {
              amount: formatRupees(result.minimumBalance),
            })}
          </span>
        </div>
      )}

      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-slate-200/70 text-xs text-slate-600">
        <Wallet className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <span className="font-medium text-slate-800">
            {t("eligibility.panel.pension", { amount: formatRupees(result.pension.amount) })}
          </span>{" "}
          {result.pension.note}
        </span>
      </div>

      {result.notes.filter((n) => n !== result.pension.note).map((note) => (
        <div key={note} className="flex items-start gap-2 mt-2 text-xs text-slate-600">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{note}</span>
        </div>
      ))}

      {result.forms.length > 0 && (
        // Deliberately understated: the member should never have to choose a
        // form. It's shown only so the number can be checked against EPFO.
        <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] text-slate-400">
          {t("eligibility.panel.forms", { forms: result.forms.join(" + ") })}
        </div>
      )}
    </section>
  );
}
