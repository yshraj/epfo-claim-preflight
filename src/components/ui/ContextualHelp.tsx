"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HelpCircle, X, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useT } from "@/i18n/client";
type HelpItem = {
  q: string;
  a: string | React.ReactNode;
};

type HelpContext = Record<string, HelpItem[]>;

// Question/answer text is looked up per language at render; only the routing
// and the key stems live here.
const helpKnowledgeBase: Record<string, "status" | "preflight" | "documents" | "default"> = {
  "/claim/status": "status",
  "/claim/preflight": "preflight",
  "/dashboard/documents": "documents",
  default: "default",
};

export default function ContextualHelp() {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<HelpItem | null>(null);
  const pathname = usePathname();

  // Determine context, then resolve the two questions for it in the active
  // language. Each context has exactly two entries (q1/q2) in the dictionary.
  let stem = helpKnowledgeBase["default"];
  for (const key of Object.keys(helpKnowledgeBase)) {
    if (key !== "default" && pathname.startsWith(key)) {
      stem = helpKnowledgeBase[key];
      break;
    }
  }
  const contextQuestions: HelpItem[] = (["1", "2"] as const).map((n) => ({
    q: t(`help.${stem}.q${n}`),
    a: t(`help.${stem}.a${n}`),
  }));

  // Reset view when path changes
  useEffect(() => {
    setActiveQuestion(null);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-700 hover:scale-105 transition-all z-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        aria-label={t("help.aria")}
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            <div className="bg-brand-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-medium">{t("help.title")}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brand-100 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-100 text-sm text-slate-600">
              {activeQuestion ? (
                <button onClick={() => setActiveQuestion(null)} className="text-brand-600 font-medium hover:underline text-xs flex items-center gap-1">
                  &larr; Back to suggestions
                </button>
              ) : (
                <p>{t("help.intro")}</p>
              )}
            </div>

            <div className="p-2 overflow-y-auto grow">
              {activeQuestion ? (
                <div className="p-3">
                  <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 mb-4 text-brand-900 text-sm font-medium">
                    {activeQuestion.q}
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed px-1">
                    {activeQuestion.a}
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-4 px-1">
                    <p className="text-xs text-slate-500 mb-2">{t("help.didThisHelp")}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setActiveQuestion(null)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors">{t("help.yes")}</button>
                      <button onClick={() => setActiveQuestion(null)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors">{t("help.needMore")}</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("help.suggested")}</p>
                  {contextQuestions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQuestion(item)}
                      className="text-left flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                    >
                      <span className="text-sm text-slate-700 group-hover:text-brand-700 transition-colors pr-2">
                        {item.q}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500 shrink-0 transition-colors" />
                    </button>
                  ))}
                  
                  <div className="my-2 border-t border-slate-100" />
                  
                  <Link href="/services/grievance-redressal" className="text-left flex items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                      File a grievance
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
