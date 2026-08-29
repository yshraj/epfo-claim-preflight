"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CopyPlus, CheckCircle2, ChevronRight, RefreshCcw } from "lucide-react";

import { useT } from "@/i18n/client";
export default function UanConsolidationBanner({ previousUans }: { previousUans: string[] }) {
  const t = useT();
  const [step, setStep] = useState<"idle" | "review" | "loading" | "success">("idle");

  if (!previousUans || previousUans.length === 0) return null;

  if (step === "success") {
    return (
      <div className="mb-6 p-5 rounded-lg border border-green-200 bg-green-50">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-slate-900">{t("consolidation.success")}</div>
            <div className="text-sm text-slate-600 mt-1">
              Your previous PF accounts will be merged into your current UAN. You will receive an SMS confirmation within 24 hours. This usually takes 3-5 working days to reflect.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "review" || step === "loading") {
    return (
      <div className="mb-6 p-5 rounded-lg border border-brand-200 bg-white shadow-sm">
        <div className="font-medium text-slate-900 mb-4">{t("consolidation.review")}</div>
        
        <div className="border border-slate-200 rounded-md p-4 bg-slate-50 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-slate-900">ABC Technologies Ltd</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">UAN {previousUans[0]}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">₹72,450</div>
              <div className="text-xs text-brand-600 mt-0.5">{t("consolidation.verifiedMatch")}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-end border-t border-slate-100 pt-4">
          <button 
            onClick={() => setStep("idle")}
            disabled={step === "loading"}
            className={cn(buttonVariants({ variant: "ghost" }), "w-full sm:w-auto")}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setStep("loading");
              setTimeout(() => setStep("success"), 2000);
            }}
            disabled={step === "loading"}
            className={cn(buttonVariants({ variant: "primary" }), "w-full sm:w-auto")}
          >
            {step === "loading" ? (
              <><RefreshCcw className="h-4 w-4 animate-spin" /> Processing Transfer...</>
            ) : (
              t("consolidation.confirm")
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-5 rounded-lg border border-brand-200 bg-brand-50/50 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
          <CopyPlus className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <div className="font-medium text-slate-900 flex items-center gap-2">
            We found {previousUans.length === 1 ? "an older PF account" : `${previousUans.length} older PF accounts`}
            {previousUans.length === 1 && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-brand-200 text-xs font-semibold text-slate-700">
                ABC Technologies 
                <span className="text-slate-400 font-normal">|</span>
                <span className="font-mono">₹72,450</span>
              </span>
            )}
          </div>
          <div className="text-sm text-slate-600 mt-1 max-w-lg">
            Keeping your employment history together can simplify future claims.
          </div>
        </div>
      </div>
      <button
        onClick={() => setStep("review")}
        className={cn(buttonVariants({ variant: "primary" }), "shrink-0 w-full sm:w-auto")}
      >
        Review account
      </button>
    </div>
  );
}
