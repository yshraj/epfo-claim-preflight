"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Claim submitted",
  "Documents checked",
  "Processing",
  "Settlement",
  "Amount credited",
];

// Simulated, timed progression through claim states — the visible
// "flow" that replaces EPFO's current silence-for-20-days pattern.
// This is a mocked timeline; no real settlement occurs, and no network
// call is simulated — the delay is honest UI pacing over an already-
// known sequence, not a fake fetch.
export default function StatusTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (activeStage >= STAGES.length - 1) return;
    const timer = setTimeout(() => setActiveStage((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [activeStage]);

  const finished = activeStage >= STAGES.length - 1;

  return (
    <div>
      <ol className="flex flex-col gap-0">
        {STAGES.map((stage, i) => {
          const done = i < activeStage;
          const current = i === activeStage;
          const isLast = i === STAGES.length - 1;
          const stateLabel = done || (current && finished) ? "complete" : current ? "in progress" : "pending";
          const marker = done || (current && finished) ? "✓" : current ? "●" : "○";
          return (
            <li
              key={stage}
              aria-label={`${stage}, ${stateLabel}`}
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[8px] transition-colors duration-500 ${
                    done || (current && finished)
                      ? "bg-brand-600 border-brand-600 text-white"
                      : current
                        ? "bg-white border-brand-500 text-brand-600"
                        : "bg-white border-slate-300 text-transparent"
                  }`}
                >
                  {marker}
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-8 transition-colors duration-500 ${
                      i < activeStage ? "bg-brand-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
              <div
                className={`pb-8 text-sm ${
                  done || current ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {stage}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="text-sm text-slate-600 border-t border-slate-200 pt-4">
        You knew about the problem before EPFO did.
      </p>
    </div>
  );
}
