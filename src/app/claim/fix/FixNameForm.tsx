"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  aadhaarName: string;
  uanName: string;
  uan: string;
  reason: string;
}

// Client component: the one fully interactive fix flow in the demo.
// Confirms the Aadhaar version of the name — mocked, no real UIDAI call.
export default function FixNameForm({ aadhaarName, uanName, uan, reason }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-4 mb-6">
        <div className="text-sm font-medium text-green-800 mb-3">
          ✓ Name updated to match Aadhaar: &quot;{aadhaarName}&quot;
        </div>
        <Link
          href={`/claim/status?uan=${uan}&reason=${reason}`}
          className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Continue to submit
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setConfirmed(true)}
        className="text-left border border-brand-500 bg-brand-50 rounded-lg p-4 hover:bg-brand-100 transition-colors"
      >
        <div className="text-xs text-slate-500 mb-1">Use this instead</div>
        <div className="font-medium">{aadhaarName}</div>
        <div className="text-xs text-brand-700 mt-1">Matches your Aadhaar (recommended)</div>
      </button>

      <div className="text-left border border-slate-200 rounded-lg p-4 opacity-60">
        <div className="text-xs text-slate-500 mb-1">Current UAN record</div>
        <div className="font-medium">{uanName}</div>
      </div>
    </div>
  );
}
