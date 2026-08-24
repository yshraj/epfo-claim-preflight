import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";

const typedMembers = members as MemberProfile[];

// Mocked login: real build would use Aadhaar/mobile OTP (simulated —
// see docs/EPFO_Hackathon_Build_Plan.md section 3.2). For the demo,
// each mock profile stands in for "an OTP-verified member".
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-xl font-semibold mb-1">Member login</h1>
      <p className="text-sm text-slate-500 mb-6">
        Mocked OTP login. Pick a demo profile to continue.
      </p>

      <div className="flex flex-col gap-3">
        {typedMembers.map((m) => (
          <Link
            key={m.id}
            href={`/dashboard?uan=${m.uan}`}
            className="border border-slate-200 rounded-lg p-4 hover:border-brand-500 hover:bg-brand-50 transition-colors"
          >
            <div className="font-medium">{m.aadhaarName}</div>
            <div className="text-xs text-slate-500 mt-1">UAN: {m.uan}</div>
            <div className="text-xs text-slate-400 mt-1">{m.scenarioLabel}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
