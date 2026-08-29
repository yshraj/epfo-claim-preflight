"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { Building2, Calendar, IndianRupee, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { useT } from "@/i18n/client";
export default function EmploymentHistoryPage() {
  const t = useT();
  const { user } = useSession();

  if (!user) return null;

  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">{t("employment.title")}</h1>
        <p className="text-slate-500">{t("employment.subtitle")}</p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 pl-8 pb-8 space-y-12">
        {user.employmentHistory.map((job, index) => {
          const isLatest = index === 0;
          
          return (
            <div key={job.id} className="relative">
              {/* Timeline dot */}
              <div className={`absolute -left-[41px] top-4 h-4 w-4 rounded-full border-4 border-white ${isLatest ? 'bg-brand-500' : 'bg-slate-300'}`} />
              
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:border-slate-300 transition-colors">
                <div className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <Building2 className="h-5 w-5 text-slate-600" />
                      </div>
                      <h2 className="font-display font-semibold text-lg text-slate-900">{job.employer}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(job.startDate).getFullYear()} — {job.endDate === "Present" ? "Present" : new Date(job.endDate).getFullYear()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end gap-2">
                    {job.status === "active" ? (
                      <Badge tone="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">{t("employment.currentEmployer")}</Badge>
                    ) : (
                      <Badge tone="neutral" className="bg-slate-100 text-slate-600 border-slate-200">{t("employment.previousEmployer")}</Badge>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">{t("employment.accountNo")}</p>
                      <p className="text-sm font-mono text-slate-900">{job.id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">{t("employment.accumulated")}</p>
                      <p className="text-sm font-medium text-slate-900 flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {job.pfBalance.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">{t("employment.consolidationStatus")}</p>
                      {job.status === "active" ? (
                        <p className="text-sm text-slate-600">{t("employment.activeAccount")}</p>
                      ) : job.isConsolidated ? (
                        <div className="flex items-center gap-1.5 text-sm text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Transferred
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-sm text-amber-600 font-medium">
                          <ShieldAlert className="h-4 w-4" /> Not Transferred
                        </div>
                      )}
                    </div>
                  </div>

                  {!job.isConsolidated && job.status === "previous" && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex gap-3 text-amber-800 text-sm">
                        <ShieldAlert className="h-5 w-5 shrink-0" />
                        <p>{t("employment.notMerged")}</p>
                      </div>
                      <Link href={`/dashboard/pf-accounts/${job.id}`}>
                        <Button variant="secondary" size="sm" className="shrink-0 bg-white hover:bg-amber-100 border-amber-300">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Link href={`/dashboard/pf-accounts/${job.id}`} className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                      View full account details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
