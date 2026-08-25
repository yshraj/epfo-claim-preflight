import Link from "next/link";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

const typedMembers = members as MemberProfile[];

// Mocked login: real build would use Aadhaar/mobile OTP (simulated —
// see docs/EPFO_Hackathon_Build_Plan.md section 3.2). For the demo,
// each mock profile stands in for "an OTP-verified member".
export default function LoginPage() {
  return (
    <Container size="narrow" className="py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
        Member login
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Mocked OTP login. Pick a demo profile to continue.
      </p>

      <div className="flex flex-col gap-3">
        {typedMembers.map((m) => (
          <Link
            key={m.id}
            href={`/dashboard?uan=${m.uan}`}
            className="group flex items-center justify-between gap-4 border border-slate-200 rounded-xl p-4 hover:border-brand-500 hover:bg-brand-50/60 hover:shadow-soft transition-all"
          >
            <div>
              <div className="font-medium text-slate-900">{m.aadhaarName}</div>
              <div className="text-xs text-slate-500 mt-1 font-mono">UAN {m.uan}</div>
              <div className="text-xs text-slate-400 mt-1">{m.scenarioLabel}</div>
            </div>
            <ArrowRight
              className="h-4 w-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </Container>
  );
}
