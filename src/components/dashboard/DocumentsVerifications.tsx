import { MemberProfile } from "@/types/member";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function DocumentsVerifications({ member }: { member: MemberProfile }) {
  const docs = [
    {
      name: "Aadhaar",
      status: member.kycStatus.aadhaar,
      lastChecked: "24 Aug 2026", // Mock date for realism
    },
    {
      name: "Bank account",
      status: member.kycStatus.bank,
      lastChecked: "24 Aug 2026",
    },
    {
      name: "PAN",
      status: member.kycStatus.pan,
    },
  ];

  const hasIssues = docs.some(d => d.status !== "verified");

  return (
    <div className="border border-slate-200 rounded-lg bg-white p-6 h-full flex flex-col">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-500" />
        Documents & verifications
      </h3>
      
      <div className="flex flex-col gap-4 flex-1">
        {docs.map((doc) => (
          <div key={doc.name} className="flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-slate-900">{doc.name}</span>
              {doc.status === "verified" ? (
                <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Needs attention
                </span>
              )}
            </div>
            {doc.lastChecked && doc.status === "verified" && (
              <span className="text-xs text-slate-500">Last checked: {doc.lastChecked}</span>
            )}
            
            {doc.status !== "verified" && (
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">
                The account details require verification before claims can be submitted.
                <div className="mt-2">
                  <Link href="#" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-7 text-xs bg-white")}>
                    Review
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
