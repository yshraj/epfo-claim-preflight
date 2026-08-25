import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

// size="narrow" preserves the existing max-w-md single-column claim
// screens; size="wide" is for the marketing/shell chrome.
export default function Container({
  className,
  size = "wide",
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: "narrow" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto px-6",
        size === "narrow" ? "max-w-md" : "max-w-6xl",
        className,
      )}
      {...props}
    />
  );
}
