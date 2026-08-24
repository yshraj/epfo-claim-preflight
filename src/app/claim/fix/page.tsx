import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import { checkNameMatch } from "@/lib/matchEngine";
import { applyOverrides, buildClaimHref, parseOverrides } from "@/lib/claimState";
import FixNameForm from "./FixNameForm";

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
      <div className="max-w-md mx-auto px-6 py-10 text-center">
        <p className="text-slate-600 mb-6">Nothing to fix here — you&apos;re good to go.</p>
        <Link
          href={buildClaimHref("/claim/preflight", { uan: member.uan, reason })}
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Back to pre-flight check
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-1">Fix name mismatch</h1>
      <p className="text-sm text-slate-500 mb-6">{nameCheck.detail}</p>

      <FixNameForm
        aadhaarName={member.aadhaarName}
        uanName={member.uanName}
        uan={member.uan}
        reason={reason}
      />
    </div>
  );
}
