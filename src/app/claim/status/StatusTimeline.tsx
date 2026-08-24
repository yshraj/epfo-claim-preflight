"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Submitted",
  "Pre-checks passed",
  "Sent for processing",
  "Credited (simulated)",
];

// Simulated, timed progression through claim states — the visible
// "flow" that replaces EPFO's current silence-for-20-days pattern.
// This is a mocked timeline; no real settlement occurs.
export default function StatusTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (activeStage >= STAGES.length - 1) return;
    const timer = setTimeout(() => setActiveStage((s) => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [activeStage]);

  return (
    <ol className="flex flex-col gap-0">
      {STAGES.map((stage, i) => {
        const done = i <= activeStage;
        const isLast = i === STAGES.length - 1;
        return (
          <li key={stage} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`h-4 w-4 rounded-full border-2 shrink-0 transition-colors duration-500 ${
                  done ? "bg-brand-600 border-brand-600" : "bg-white border-slate-300"
                }`}
              />
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-8 transition-colors duration-500 ${
                    i < activeStage ? "bg-brand-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
            <div className={`pb-8 text-sm ${done ? "text-slate-900" : "text-slate-400"}`}>
              {stage}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
