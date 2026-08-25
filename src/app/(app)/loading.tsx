import { ShieldCheck, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <ShieldCheck className="h-16 w-16 text-brand-600 animate-pulse" />
        <Loader2 className="absolute inset-0 h-16 w-16 text-slate-300 animate-spin" />
      </div>
      <div className="font-display font-bold text-lg text-slate-900 tracking-tight">
        EPFO Digital Claim Services
      </div>
      <div className="text-sm text-slate-500 mt-2 font-mono">
        Establishing secure session...
      </div>
    </div>
  );
}
