import Reveal from "@/components/motion/Reveal";
import { X, Check } from "lucide-react";

const TODAY = [
  "Cryptic rejection, weeks later",
  "5 separate logins, no unified view",
  '"File a grievance" is the only escalation',
  "Cheque photo rejected for being blurry",
];

const PROTOTYPE = [
  "Plain-language check before you submit",
  "One flow, start to finish",
  "Fix a mismatch and watch it re-verify live",
  "A visible status timeline, not silence",
];

export default function ComparisonSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-2">
            They built a form. We built a check.
          </h2>
          <p className="text-slate-600 mb-10">Based on EPFO&apos;s own published FAQ and portal structure.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          <Reveal>
            <div className="border border-slate-200 rounded-xl p-6 h-full">
              <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-4">
                Today
              </div>
              <ul className="flex flex-col gap-3">
                {TODAY.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-slate-600">
                    <X className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-brand-200 bg-brand-50/40 rounded-xl p-6 h-full">
              <div className="text-xs font-mono font-semibold tracking-wider text-brand-700 uppercase mb-4">
                This prototype
              </div>
              <ul className="flex flex-col gap-3">
                {PROTOTYPE.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-slate-900">
                    <Check className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
