"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { Activity, Bell, FileText, Shield, User, Landmark, Filter, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";

import { useT } from "@/i18n/client";
export default function ActivityPage() {
  const t = useT();
  const { user, dispatch } = useSession();
  const [filter, setFilter] = useState<string>("all");

  if (!user) return null;

  const ActivityIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "claim": return <Activity className="h-4 w-4 text-brand-600" />;
      case "document": return <FileText className="h-4 w-4 text-blue-600" />;
      case "security": return <Shield className="h-4 w-4 text-indigo-600" />;
      case "profile": return <User className="h-4 w-4 text-slate-600" />;
      case "bank": return <Landmark className="h-4 w-4 text-emerald-600" />;
      case "kyc": return <Shield className="h-4 w-4 text-amber-600" />;
      default: return <Activity className="h-4 w-4 text-slate-600" />;
    }
  };

  const filteredActivities = user.recentActivities.filter(a => filter === "all" || a.type === filter);

  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">{t("activity.title")}</h1>
        <p className="text-slate-500">{t("activity.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Notifications Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="border-b border-slate-100 p-4 flex items-center gap-2 bg-slate-50">
              <Bell className="h-4 w-4 text-slate-600" />
              <h2 className="font-display font-semibold text-slate-900">{t("activity.notifications")}</h2>
              {user.notifications.filter(n => !n.read).length > 0 && (
                <Badge tone="error" className="ml-auto">{user.notifications.filter(n => !n.read).length} New</Badge>
              )}
            </div>
            <div className="p-0 divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {user.notifications.length > 0 ? user.notifications.map(n => (
                <div key={n.id} className={`p-4 transition-colors ${!n.read ? 'bg-brand-50/50' : 'hover:bg-slate-50'}`}>
                  <div className="flex gap-3 items-start">
                    {!n.read && <div className="mt-1.5 h-2 w-2 rounded-full bg-brand-600 shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm ${!n.read ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>{n.title}</p>
                      {n.message && <p className="text-xs text-slate-500 mt-1">{n.message}</p>}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">{n.date}</span>
                        {!n.read && (
                          <button 
                            onClick={() => dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id })}
                            className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Mark read
                          </button>
                        )}
                      </div>
                      {n.link && (
                        <div className="mt-3">
                          <Link href={n.link} className="text-xs inline-block px-3 py-1.5 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-700 font-medium">
                            Take Action
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-sm text-slate-500">{t("activity.noNotifications")}</div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[600px]">
            <div className="border-b border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-display font-semibold text-lg text-slate-900">{t("activity.history")}</h2>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
                <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All</button>
                <button onClick={() => setFilter("claim")} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === "claim" ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t("activity.claims")}</button>
                <button onClick={() => setFilter("document")} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === "document" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t("dash.documents")}</button>
                <button onClick={() => setFilter("profile")} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === "profile" ? "bg-slate-200 text-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t("activity.profile")}</button>
              </div>
            </div>

            <div className="p-6">
              <div className="relative border-l border-slate-200 ml-3 space-y-8 pb-4">
                <AnimatePresence initial={false}>
                  {filteredActivities.length > 0 ? filteredActivities.map((activity, index) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="relative pl-8"
                    >
                      <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <ActivityIcon type={activity.type} />
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                          <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                          <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">{activity.date}</span>
                        </div>
                        {activity.description && <p className="text-sm text-slate-500">{activity.description}</p>}
                        
                        {/* Add extra context based on type if needed */}
                        {activity.type === "claim" && (
                          <div className="mt-2 text-xs text-brand-600 font-medium">{t("activity.service")}</div>
                        )}
                      </div>
                    </motion.div>
                  )) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="pl-8 text-sm text-slate-500 py-8"
                    >
                      No activity found for this filter.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
