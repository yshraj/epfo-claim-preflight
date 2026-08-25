import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import { applyOverrides, parseOverrides } from "@/lib/claimState";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Wallet } from "lucide-react";

const typedMembers = members as MemberProfile[];

function readinessBadge(status: "ready" | "fixable" | "blocked") {
  if (status === "ready") return { label: "100% Ready to Claim", tone: "success" as const };
  if (status === "fixable")
    return { label: "Almost Ready — 1 thing to fix", tone: "warning" as const };
  return { label: "Not Ready — action needed", tone: "error" as const };
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
    <Container size="narrow" className="py-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-slate-500">Welcome back</div>
          <div className="font-display font-bold text-xl text-slate-950">
            {member.aadhaarName}
          </div>
        </div>
        <Badge tone={badge.tone}>{badge.label}</Badge>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
          Total PF balance
        </div>
        <div className="font-display font-bold text-4xl tracking-tight text-slate-950">
          ₹{total.toLocaleString("en-IN")}
        </div>
        <div className="text-xs text-slate-500 mt-3 flex gap-4 font-mono">
          <span>Employee ₹{member.balance.employee.toLocaleString("en-IN")}</span>
          <span>Employer ₹{member.balance.employer.toLocaleString("en-IN")}</span>
          <span>Pension ₹{member.balance.pension.toLocaleString("en-IN")}</span>
        </div>
      </Card>

      <Link
        href={`/claim/reason?uan=${member.uan}`}
        className={cn(buttonVariants({ size: "lg" }), "w-full")}
      >
        Withdraw funds
      </Link>
    </Container>
  );
}
