"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildClaimHref } from "@/lib/claimState";
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
    <div className="flex flex-col gap-3">
      <button
        onClick={applyCorrection}
        disabled={applying}
        aria-label={`Use Aadhaar name: ${aadhaarName}`}
        className="flex items-start gap-3 text-left border border-brand-500 bg-brand-50 rounded-xl p-4 hover:bg-brand-100 disabled:opacity-70 transition-colors"
      >
        {applying ? (
          <Loader2 className="h-4 w-4 text-brand-700 mt-0.5 shrink-0 animate-spin" aria-hidden="true" />
        ) : (
          <Sparkles className="h-4 w-4 text-brand-700 mt-0.5 shrink-0" aria-hidden="true" />
        )}
        <div>
          <div className="text-xs text-slate-500 mb-1">Use this instead</div>
          <div className="font-medium text-slate-900">{aadhaarName}</div>
          <div className="text-xs text-brand-700 mt-1">
            {applying ? "Applying correction…" : "Matches your Aadhaar (recommended)"}
          </div>
        </div>
      </button>

      <div className="text-left border border-slate-200 rounded-xl p-4 opacity-60">
        <div className="text-xs text-slate-500 mb-1">Current UAN record</div>
        <div className="font-medium text-slate-900">{uanName}</div>
      </div>

      <p className="text-xs text-slate-400 mt-1">
        This updates your UAN and bank records to match your Aadhaar name, then
        re-runs the check.
      </p>
    </div>
  );
}
