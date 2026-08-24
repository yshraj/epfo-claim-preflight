import StatusTimeline from "./StatusTimeline";

// Screen 6 — replaces "silence for 20 days" with a visible state machine.
// Timeline progression is simulated client-side; see StatusTimeline.tsx.
export default function StatusPage({
  searchParams,
}: {
  searchParams: { uan?: string; reason?: string };
}) {
  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-1">Claim submitted</h1>
      <p className="text-sm text-slate-500 mb-8">
        UAN {searchParams.uan} · Reason: {searchParams.reason ?? "medical"}
      </p>

      <StatusTimeline />
    </div>
  );
}
