"use client";

import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { overallReadiness, runPreflightChecks } from "@/lib/matchEngine";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { LayoutGrid, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Briefcase, FileText, Activity } from "lucide-react";
import { MemberProfile } from "@/types/member";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function DashboardPage() {
  const { user } = useSession();

  if (!user) return null;

  // Adapter to convert MockAccount into the structure expected by matchEngine
  // (In a real refactor we'd update matchEngine, but for this phase we map it)
  const memberProfileAdapter = user as unknown as MemberProfile;

  const results = runPreflightChecks(memberProfileAdapter);
  const readiness = overallReadiness(results);
  const totalChecks = results.length;
  const passedChecks = results.filter(r => r.status === "pass").length;

  return (
    <Container size="wide" className="py-12 md:py-16">
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className="mb-10">
          <div className="text-sm text-slate-500 font-medium">Good evening,</div>
          <div className="font-display font-bold text-3xl tracking-tight text-slate-950 mt-1">
            {user.aadhaarName.split(" ")[0]}
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Here&apos;s what&apos;s happening with your EPFO account.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Action Center / Next Steps */}
            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Your Next Steps</h2>
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-1 overflow-hidden">
                {user.notifications.length === 0 && readiness === "ready" ? (
                  <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="font-medium text-slate-900 mb-1">You&apos;re all set.</p>
                    <p className="text-sm">No pending actions required for your account.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {user.notifications.filter(n => !n.read).map((notif, index) => (
                      <li key={notif.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{notif.title}</p>
                          <p className="text-sm text-slate-500 mb-2">{notif.message}</p>
                          {notif.link && (
                            <Link href={notif.link} className="text-xs font-medium text-brand-600 hover:text-brand-700">
                              Resolve now &rarr;
                            </Link>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">~2 min</div>
                      </li>
                    ))}
                    {readiness !== "ready" && user.notifications.length === 0 && (
                      <li className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">Review claim readiness</p>
                          <p className="text-sm text-slate-500 mb-2">Some account details need attention before you can submit a claim.</p>
                          <Link href="/claim/preflight?reason=medical" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                            Resolve now &rarr;
                          </Link>
                        </div>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Claim Readiness</h2>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-medium text-slate-900">{passedChecks} of {totalChecks} checks complete</div>
                  {readiness === "ready" && (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Ready to claim
                    </span>
                  )}
                  {readiness !== "ready" && (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Action required
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  {results.map(r => (
                    <div key={r.key} className="flex items-center gap-3 text-sm">
                      {r.status === "pass" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : r.status === "warn" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      )}
                      <span className={r.status === "pass" ? "text-slate-600" : "text-slate-900 font-medium"}>
                        {r.title}
                      </span>
                    </div>
                  ))}
                </div>
                {readiness !== "ready" && (
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <Link href="/claim/preflight?reason=medical" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                      Review issues in detail &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/claim/type"
                className={cn(buttonVariants({ size: "lg" }), "w-full shadow-sm text-lg py-6")}
              >
                Apply for Claim or Transfer
              </Link>
            </motion.div>

          </div>

          <div className="space-y-8">
            
            {/* Quick Links */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/documents" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-500 hover:bg-brand-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Documents</span>
              </Link>
              <Link href="/dashboard/employment" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-500 hover:bg-brand-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Employment</span>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-card transition-shadow">
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-semibold text-slate-900">Recent Activity</h3>
                 <Link href="/dashboard/activity" className="text-xs font-medium text-brand-600 hover:text-brand-700">View all</Link>
               </div>
               <div className="p-0">
                 <ul className="divide-y divide-slate-100">
                   {user.recentActivities.slice(0, 3).map(activity => (
                     <li key={activity.id} className="p-4 flex gap-3 items-start">
                       <div className="mt-0.5"><Activity className="h-4 w-4 text-slate-400" /></div>
                       <div>
                         <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                         <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                       </div>
                     </li>
                   ))}
                   {user.recentActivities.length === 0 && (
                     <li className="p-4 text-center text-sm text-slate-500">No recent activity.</li>
                   )}
                 </ul>
               </div>
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <Link
                href="/services"
                className="group flex flex-col gap-2 border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-brand-500 hover:bg-brand-50/60 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-1">
                  <LayoutGrid className="h-5 w-5 text-slate-400" />
                  <div className="font-medium text-slate-900">Explore other services</div>
                </div>
                <div className="text-xs text-slate-500 ml-8 mb-2">Passbook, KYC, grievances, pension &amp; more</div>
                <div className="flex items-center text-xs font-medium text-brand-600 ml-8">
                  View directory
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
