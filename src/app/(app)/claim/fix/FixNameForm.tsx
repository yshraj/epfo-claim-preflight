"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildClaimHref } from "@/lib/claimState";
import { useT } from "@/i18n/client";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  aadhaarName: string;
  uanName: string;
  uan: string;
  reason: string;
}

// The one fully interactive fix flow in the demo. Applying the correction
// navigates back to /claim/preflight with a real nameOverride param —
// runPreflightChecks genuinely re-runs against the corrected record there.
// This component itself holds no authoritative state; the URL does.
export default function FixNameForm({ aadhaarName, uanName, uan, reason }: Props) {
  const router = useRouter();
  const t = useT();
  const [applying, setApplying] = useState(false);

  function applyCorrection() {
    setApplying(true);
    const href = buildClaimHref("/claim/preflight", {
      uan,
      reason,
      overrides: { nameOverride: aadhaarName },
    });
    // Brief, honest UI pacing — no network call is being simulated, this
    // just gives the "applying correction" state a moment to be seen.
    setTimeout(() => router.push(href), 450);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-left border border-slate-200 bg-slate-50 rounded-xl p-5">
        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">{t("claim.fix.current")}</div>
        <div className="font-mono text-slate-900 line-through opacity-70">{uanName}</div>
      </div>

      <div className="text-left border-2 border-brand-500 bg-brand-50 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 px-3 py-1 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
          {t("claim.fix.recommended")}
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-brand-600 shrink-0 mt-1" aria-hidden="true" />
          <div>
            <div className="text-xs text-brand-700 mb-1 font-medium">{t("claim.fix.matchesAadhaar")}</div>
            <div className="font-mono font-bold text-lg text-slate-950">{aadhaarName}</div>
          </div>
        </div>
      </div>

      <button
        onClick={applyCorrection}
        disabled={applying}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {applying ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {t("claim.fix.applying")}</>
        ) : (
          t("claim.fix.apply")
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        {t("claim.fix.note")}
      </p>
    </div>
  );
}
