import Link from "next/link";
import type { ClaimReason } from "@/types/member";

const REASONS: { key: ClaimReason; label: string; emoji: string }[] = [
  { key: "medical", label: "Medical emergency", emoji: "🏥" },
  { key: "house", label: "Buying / building a house", emoji: "🏠" },
  { key: "education", label: "Education", emoji: "🎓" },
  { key: "leaving_job", label: "Leaving my job", emoji: "💼" },
  { key: "retirement", label: "Retirement", emoji: "🧓" },
];

// The user never sees form numbers (19 / 31 / 10C) — that mapping happens
// silently server-side in a real build. See docs/EPFO_Hackathon_Build_Plan.md
// Screen 3.
export default function ReasonPage({
  searchParams,
}: {
  searchParams: { uan?: string };
}) {
  const uan = searchParams.uan ?? "";

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="font-display text-2xl font-bold tracking-tight mb-1">Why do you need money?</h1>
      <p className="text-sm text-slate-500 mb-6">
        We&apos;ll work out the right form and eligible amount for you.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {REASONS.map((r) => (
          <Link
            key={r.key}
            href={`/claim/preflight?uan=${uan}&reason=${r.key}`}
            className="flex flex-col items-center justify-center gap-2 border border-slate-200 rounded-lg p-5 text-center hover:border-brand-500 hover:bg-brand-50 transition-colors"
          >
            <span className="text-2xl" aria-hidden="true">{r.emoji}</span>
            <span className="text-sm font-medium">{r.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
