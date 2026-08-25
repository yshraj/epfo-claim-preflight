"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Generic scroll-reveal wrapper for server-rendered marketing sections.
// Respects prefers-reduced-motion via framer-motion's own hook — content
// is always in the DOM either way, this only ever changes how it enters.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
