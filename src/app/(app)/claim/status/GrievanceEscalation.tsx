"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CheckCircle2, Clock, FileText, Send } from "lucide-react";

export default function GrievanceEscalation() {
  const [step, setStep] = useState<"idle" | "draft" | "review" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");

  if (step === "success") {
    return (
      <div className="mt-8 border border-green-200 bg-green-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-green-900 text-lg">Request recorded</div>
            <div className="text-sm text-green-800 mt-1 mb-3">
              We&apos;ve attached your claim details to this request and routed it to the regional office.
            </div>
            <div className="bg-white border border-green-200 rounded p-3 text-sm font-mono text-green-800 inline-block">
              Reference: GRV-2026-00482
            </div>
            <p className="text-xs text-green-600/70 mt-4">
              This is a simulated prototype submission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "draft" || step === "review" || step === "loading") {
    return (
      <div className="mt-8 border border-slate-200 bg-white rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-500" />
          <h3 className="font-semibold text-slate-900">Request assistance</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
            <span className="font-medium text-slate-900 block mb-2">We&apos;ll automatically include:</span>
            <ul className="space-y-1 text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-500" /> Claim number (CLM-2026-8492X)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-500" /> Claim type</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-500" /> Submission date</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-500" /> Current status</li>
            </ul>
          </div>

          {step === "draft" && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Can&apos;t wait? File a grievance</p>
                <div className="text-sm text-slate-600 p-2.5 bg-slate-50 border border-slate-200 rounded-md">
                  Claim processing delay
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-1">Additional message (optional)</label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any additional context..."
                  className="w-full text-sm p-3 border border-slate-200 rounded-md focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button onClick={() => setStep("idle")} className={cn(buttonVariants({ variant: "secondary" }))}>
                  Cancel
                </button>
                <button onClick={() => setStep("review")} className={cn(buttonVariants())}>
                  Review request
                </button>
              </div>
            </div>
          )}

          {(step === "review" || step === "loading") && (
            <div className="space-y-6">
              <div className="bg-brand-50 border border-brand-100 rounded-lg p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-700">Claim:</span>
                  <span className="font-medium text-brand-900">CLM-2026-8492X</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-700">Reason:</span>
                  <span className="font-medium text-brand-900">Processing delay</span>
                </div>
                {message && (
                  <div className="border-t border-brand-200/50 pt-3 mt-3">
                    <span className="text-brand-700 text-xs block mb-1">Message:</span>
                    <p className="text-sm text-brand-900 whitespace-pre-wrap">{message}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setStep("draft")} 
                  disabled={step === "loading"}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    setStep("loading");
                    setTimeout(() => setStep("success"), 1500);
                  }}
                  disabled={step === "loading"}
                  className={cn(buttonVariants(), "min-w-[160px]")}
                >
                  {step === "loading" ? "Submitting..." : <><Send className="h-4 w-4 mr-2" /> Submit escalation</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 border border-amber-200 bg-amber-50/50 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 bg-white border border-amber-200 rounded-full flex items-center justify-center shrink-0">
          <Clock className="h-5 w-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">This claim is taking longer than expected.</h3>
          <p className="text-slate-500 mb-6">If your claim has been pending longer than 20 days, you can escalate it. We&apos;ll require a short explanation and any supporting documents.</p>
          <button
            onClick={() => setStep("draft")}
            className={cn(buttonVariants({ variant: "amber" }))}
          >
            Request assistance
          </button>
        </div>
      </div>
    </div>
  );
}
