import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import { checkNameMatch } from "@/lib/matchEngine";
import { applyOverrides, buildClaimHref, parseOverrides } from "@/lib/claimState";
import FixNameForm from "./FixNameForm";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const typedMembers = members as MemberProfile[];

// Screen 5 — inline fix. Only the name-mismatch path gets a full interactive
// fix for the hackathon demo; other fail states show informational guidance
// only. Overrides are parsed and applied here too, so this page reflects a
// correction already made even if a user navigates back to it directly.
export default function FixPage({
  searchParams,
}: {
  searchParams: { uan?: string; reason?: string; nameOverride?: string; doeOverride?: string };
}) {
  const rawMember = typedMembers.find((m) => m.uan === searchParams.uan) ?? typedMembers[0];
  const overrides = parseOverrides(searchParams);
  const member = applyOverrides(rawMember, overrides);
  const reason = searchParams.reason ?? "medical";
  const nameCheck = checkNameMatch(member);

  if (nameCheck.status === "pass") {
    return (
      <Container size="narrow" className="py-16 text-center">
        <p className="text-slate-600 mb-6">Nothing to fix here — you&apos;re good to go.</p>
        <Link
          href={buildClaimHref("/claim/preflight", { uan: member.uan, reason })}
          className={cn(buttonVariants())}
        >
          Back to pre-flight check
        </Link>
      </Container>
    );
  }

  return (
    <Container size="narrow" className="py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
        Fix name mismatch
      </h1>
      <p className="text-sm text-slate-500 mb-8">{nameCheck.detail}</p>

      <FixNameForm
        aadhaarName={member.aadhaarName}
        uanName={member.uanName}
        uan={member.uan}
        reason={reason}
      />
    </Container>
  );
}
