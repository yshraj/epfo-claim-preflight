import Link from "next/link";
import IdentityGraph from "@/components/IdentityGraph";
import { resultsToGraphData } from "@/lib/identityGraph";

export default function Home() {
  // Idle state — no real member yet, just illustrating the concept.
  const idleData = resultsToGraphData([]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center gap-6 max-w-md mx-auto">
      <div className="w-full">
        <IdentityGraph data={idleData} idle />
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Check your PF claim before you submit it.
      </h1>
      <p className="text-slate-600">
        Catch identity and eligibility issues before they become rejection
        reasons — instead of finding out three weeks later.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
        <Link
          href="/login"
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Check my claim
        </Link>
        <Link
          href="/login"
          className="inline-block border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition-colors"
        >
          See how it works
        </Link>
      </div>
    </div>
  );
}
