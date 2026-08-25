"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function MatchScoreMeter({ score }: { score: number }) {
  const reduceMotion = useReducedMotion();
  const color = score >= 85 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden shrink-0">
        <motion.div
          initial={{ width: reduceMotion ? `${score}%` : 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-mono font-medium text-slate-500">
        {score}% Match
      </span>
    </div>
  );
}
