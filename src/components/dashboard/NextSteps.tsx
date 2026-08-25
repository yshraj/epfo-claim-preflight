import { MemberProfile } from "@/types/member";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function NextSteps({ member }: { member: MemberProfile }) {
  const steps = [];

  // Check name match basic assumption (if uanName !== aadhaarName we flag it)
  if (member.uanName !== member.aadhaarName) {
    steps.push({
      title: "Review name difference",
      time: "1 min",
      href: `/claim/preflight?uan=${member.uan}`,
    });
  }

  // Check previous UANs
  if (member.previousUans.length > 0) {
    steps.push({
      title: "Review previous PF account",
      time: "2 mins",
      href: "#",
    });
  }

  // Check missing KYC
  if (member.kycStatus.bank !== "verified") {
    steps.push({
      title: "Verify bank account",
      time: "5 mins",
      href: "#",
    });
  }

  if (steps.length === 0) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-900 mb-1">You&apos;re all set!</h3>
        <p className="text-sm text-brand-700">No action required. Your account is ready for claims.</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Your next steps</h3>
        <p className="text-xs text-slate-500 mt-1">Complete these to prepare your account</p>
      </div>
      <div className="divide-y divide-slate-100">
        {steps.map((step, idx) => (
          <Link key={idx} href={step.href} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                {idx + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{step.title}</div>
                <div className="text-xs text-slate-500">Estimated time: {step.time}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
          </Link>
        ))}
      </div>
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Everything else is ready.
      </div>
    </div>
  );
}
