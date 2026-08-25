import { AlertCircle } from "lucide-react";

export default function PrototypeDisclaimer() {
  return (
    <div className="bg-slate-900 text-slate-100 py-3 px-6 text-sm flex justify-center border-b border-slate-800">
      <div className="max-w-6xl w-full flex items-start sm:items-center gap-3">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="leading-snug">
          <span className="font-semibold text-amber-400">Hackathon Prototype:</span> This is a conceptual build for demonstrating the <strong>Claim Pre-Flight</strong> capability. Identity validation uses deterministic logic, but all user profiles, UAN activation, and grievance flows are <strong>mocked</strong> using synthetic data.
        </p>
      </div>
    </div>
  );
}
