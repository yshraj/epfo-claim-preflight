import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

// buttonVariants is exported separately so it can be applied to a Next
// <Link> directly (most CTAs in this app are navigational, not native
// buttons) without pulling in a Slot/asChild dependency.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700",
        secondary: "border border-slate-300 text-slate-700 hover:bg-slate-50",
        ghost: "text-slate-700 hover:bg-slate-100",
        amber: "bg-amber-600 text-white hover:bg-amber-700",
      },
      size: {
        default: "px-6 py-3 text-sm",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
