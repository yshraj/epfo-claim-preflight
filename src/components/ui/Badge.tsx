import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const badgeVariants = cva("inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-slate-100 text-slate-700",
      success: "bg-green-100 text-green-800",
      warning: "bg-amber-100 text-amber-800",
      error: "bg-red-100 text-red-800",
      info: "bg-brand-50 text-brand-700",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export default function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
