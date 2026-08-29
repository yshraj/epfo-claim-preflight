"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { Building2, IndianRupee, ArrowLeft, CheckCircle2, ShieldAlert, CalendarClock } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { notFound } from "next/navigation";

import { useT } from "@/i18n/client";
export default function PFAccountDetailsPage({ params }: { params: { id: string } }) {
  const t = useT();
  const { user } = useSession();

  if (!user) return null;

  const job = user.employmentHistory.find(j => j.id === params.id);
  
  if (!job) {
    notFound();
  }

  // Simulated detailed breakdown based on the mock balance
  const employeeShare = Math.floor(job.pfBalance * 0.45);
  const employerShare = Math.floor(job.pfBalance * 0.45);
  const pensionShare = job.pfBalance - employeeShare - employerShare;

  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-6">
        <Link href="/dashboard/employment" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Employment History
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">{t("pf.title")}</h1>
            <p className="text-slate-500 font-mono tracking-wider">{job.id}</p>
          </div>
          <div className="flex gap-2">
             {job.status === "active" ? (
                <Badge tone="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">{t("pf.activeAccount")}</Badge>
              ) : job.isConsolidated ? (
                <Badge tone="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">{t("pf.consolidated")}</Badge>
              ) : (
                <Badge tone="warning" className="bg-amber-50 text-amber-700 border-amber-200">{t("pf.unconsolidated")}</Badge>
              )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">{t("pf.accountInfo")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{t("pf.employer")}</p>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-medium text-slate-900">{job.employer}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{t("pf.period")}</p>
              <p className="text-sm text-slate-900">
                {new Date(job.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} 
                {' — '} 
                {job.endDate === "Present" ? "Present" : new Date(job.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{t("pf.lastContribution")}</p>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-slate-400" />
                <p className="text-sm text-slate-900">
                  {job.status === "active" ? "12 Aug 2026" : job.endDate === "Present" ? t("common.unknown") : new Date(job.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{t("pf.establishmentId")}</p>
              <p className="text-sm text-slate-900 font-mono">MH/BAN/12345/000</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 bg-gradient-to-br from-slate-50 to-slate-100/50">
          <h2 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">{t("pf.totalBalance")}</h2>
          <div className="text-3xl font-display font-bold text-slate-900 flex items-center mb-6">
            <IndianRupee className="h-6 w-6 mr-1 text-slate-400" />
            {job.pfBalance.toLocaleString("en-IN")}
          </div>
          
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{t("pf.employeeShare")}</span>
              <span className="font-medium text-slate-900">₹{employeeShare.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{t("pf.employerShare")}</span>
              <span className="font-medium text-slate-900">₹{employerShare.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{t("pf.pensionShare")}</span>
              <span className="font-medium text-slate-900">₹{pensionShare.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {!job.isConsolidated && job.status === "previous" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">{t("pf.transferRecommended")}</h3>
            </div>
            <p className="text-sm text-amber-800">
              This account balance is not currently earning interest because it has not been merged into your active PF account.
            </p>
          </div>
          <Link href="/services/online-claims-transfer" className="shrink-0">
            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 shadow-sm">
              Start Transfer
            </span>
          </Link>
        </div>
      )}
      
      {job.status === "active" && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-brand-600" />
              <h3 className="font-semibold text-brand-900">{t("pf.activeContributions")}</h3>
            </div>
            <p className="text-sm text-brand-800">
              Your employer is actively depositing into this account. You can apply for partial advances against this balance.
            </p>
          </div>
          <Link href="/claim/type" className="shrink-0">
            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-brand-600 text-white hover:bg-brand-700 shadow-sm">
              Apply for Advance
            </span>
          </Link>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-display font-semibold text-lg text-slate-900">{t("pf.contributionSummary")}</h2>
        </div>
        <div className="p-8 text-center text-slate-500 text-sm bg-slate-50">
          A real integration would display the month-by-month passbook ledger here, showing exact dates of deposit and interest credited.
        </div>
      </div>
    </Container>
  );
}
