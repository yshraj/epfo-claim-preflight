"use client";

import { CheckCircle2, CircleDashed } from "lucide-react";

export default function StatusTimeline({ isDelayed = false }: { isDelayed?: boolean }) {
  const STAGES = [
    { title: "Claim submitted", date: "18 Aug 2026", status: "complete" },
    { title: "Documents verified", date: "19 Aug 2026", status: "complete" },
    { title: "Regional processing", date: "In progress", status: "current" },
    { title: "Settlement approved", date: "", status: "pending" },
    { title: "Amount credited", date: "", status: "pending" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
      <div className="font-semibold text-slate-900 mb-6">Status timeline</div>
      
      <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
        {STAGES.map((stage, i) => {
          const isComplete = stage.status === "complete";
          const isCurrent = stage.status === "current";
          
          return (
            <div key={stage.title} className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-white">
                {isComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                ) : isCurrent ? (
                  <CircleDashed className="h-4 w-4 text-amber-500 animate-[spin_4s_linear_infinite]" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-200 bg-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${isCurrent ? 'text-brand-900' : isComplete ? 'text-slate-900' : 'text-slate-500'}`}>
                  {stage.title}
                </span>
                {stage.date && (
                  <span className="text-xs text-slate-500 mt-1">{stage.date}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <h4 className="font-medium text-slate-900 mb-2">What happens next?</h4>
        <p className="text-sm text-slate-600">
          Your claim is currently with the regional processing team. 
          No action is required from you right now. 
          {isDelayed ? "" : " We will notify you once the settlement is approved."}
        </p>
      </div>
    </div>
  );
}
