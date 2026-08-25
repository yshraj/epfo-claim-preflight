"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export default function PreflightSequence({
  children,
  wasJustCorrected,
  readiness,
  numFails
}: {
  children: React.ReactNode;
  wasJustCorrected: boolean;
  readiness: string;
  numFails: number;
}) {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsChecking(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600 mb-6" />
        <h2 className="font-display text-2xl font-semibold text-slate-900">
          {wasJustCorrected ? "Re-checking your claim..." : "Checking your claim..."}
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-sm text-center">
          Cross-referencing Aadhaar, UAN, and bank records to ensure instant processing.
        </p>
      </div>
    );
  }

  return (
    <Reveal variant="fade">
      {readiness !== "ready" && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6 font-medium text-sm flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          {numFails} issue{numFails > 1 ? 's' : ''} found before submission
        </div>
      )}
      {children}
    </Reveal>
  );
}
