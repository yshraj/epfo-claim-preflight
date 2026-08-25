import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

// size="narrow" preserves the existing max-w-md single-column claim
// screens; size="wide" is for the marketing/shell chrome.
export default function Container({
  className,
  size = "wide",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: React.ReactNode, size?: "narrow" | "default" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 md:px-12",
        {
          "max-w-3xl": size === "narrow",
          "max-w-5xl": size === "default",
          "max-w-7xl": size === "wide",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
