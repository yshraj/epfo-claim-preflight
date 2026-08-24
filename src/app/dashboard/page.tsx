import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import { applyOverrides, parseOverrides } from "@/lib/claimState";

const typedMembers = members as MemberProfile[];

function readinessBadge(status: "ready" | "fixable" | "blocked") {
  if (status === "ready")
    return { label: "100% Ready to Claim", className: "bg-green-100 text-green-800" };
  if (status === "fixable")
    return { label: "Almost Ready — 1 thing to fix", className: "bg-amber-100 text-amber-800" };
  return { label: "Not Ready — action needed", className: "bg-red-100 text-red-800" };
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { uan?: string; nameOverride?: string; doeOverride?: string };
}) {
  const rawMember = typedMembers.find((m) => m.uan === searchParams.uan) ?? typedMembers[0];
  const member = applyOverrides(rawMember, parseOverrides(searchParams));
  const results = runPreflightChecks(member);
  const readiness = overallReadiness(results);
  const badge = readinessBadge(readiness);
  const total = member.balance.employee + member.balance.employer + member.balance.pension;

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-slate-500">Welcome back</div>
          <div className="font-semibold">{member.aadhaarName}</div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="text-xs text-slate-500 mb-1">Total PF balance</div>
        <div className="font-display font-bold text-4xl tracking-tight text-slate-900">
          ₹{total.toLocaleString("en-IN")}
        </div>
        <div className="text-xs text-slate-500 mt-2 flex gap-4 font-mono">
          <span>Employee: ₹{member.balance.employee.toLocaleString("en-IN")}</span>
          <span>Employer: ₹{member.balance.employer.toLocaleString("en-IN")}</span>
          <span>Pension: ₹{member.balance.pension.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <Link
        href={`/claim/reason?uan=${member.uan}`}
        className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Withdraw funds
      </Link>
    </div>
  );
}
