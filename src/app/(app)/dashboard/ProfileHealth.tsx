import { CheckCircle2, AlertTriangle, Fingerprint, Landmark, Briefcase } from "lucide-react";
import { useT } from "@/i18n/client";
import type { MemberProfile } from "@/types/member";

export default function ProfileHealth({ member }: { member: MemberProfile }) {
  const t = useT();
  const kycWarnings = Object.values(member.kycStatus).filter(status => status !== "verified").length;
  
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      <div className="border border-slate-200 rounded-lg p-4 bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Fingerprint className="h-4 w-4 text-slate-400" /> Identity
        </div>
        <div className="flex items-center gap-2 text-sm">
          {member.kycStatus.aadhaar === "verified" ? (
            <><CheckCircle2 className="h-4 w-4 text-brand-600" /> <span className="text-slate-900">{t("health.aadhaarVerified")}</span></>
          ) : (
            <><AlertTriangle className="h-4 w-4 text-amber-500" /> <span className="text-slate-900">{t("health.aadhaarPending")}</span></>
          )}
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Landmark className="h-4 w-4 text-slate-400" /> KYC Status
        </div>
        <div className="flex flex-col gap-1 text-sm">
          {kycWarnings === 0 ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-600" /> <span className="text-slate-900">{t("health.allKycVerified")}</span>
            </div>
          ) : (
            <>
              {member.kycStatus.bank !== "verified" && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" /> <span className="text-slate-900">{t("health.bankUnverified")}</span>
                </div>
              )}
              {member.kycStatus.pan !== "verified" && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" /> <span className="text-slate-900">{t("health.panUnverified")}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Briefcase className="h-4 w-4 text-slate-400" /> Employment
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600" /> <span className="text-slate-900">{t("health.currentEmployer")}</span>
          </div>
          {member.previousUans && member.previousUans.length > 0 && (
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> {member.previousUans.length} previous PF account{member.previousUans.length > 1 ? "s" : ""} found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
