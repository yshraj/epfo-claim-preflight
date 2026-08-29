import Reveal from "@/components/motion/Reveal";
import { X, Check } from "lucide-react";
import { getT } from "@/i18n/server";

const ROWS = ["1", "2", "3", "4"] as const;

export default function ComparisonSection() {
  const t = getT();

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-2">
            {t("comparison.title")}
          </h2>
          <p className="text-slate-600 mb-10">{t("comparison.subtitle")}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          <Reveal>
            <div className="border border-slate-200 rounded-lg p-6 h-full">
              <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-4">
                {t("comparison.today")}
              </div>
              <ul className="flex flex-col gap-3">
                {ROWS.map((n) => (
                  <li key={n} className="flex gap-2 text-sm text-slate-600">
                    <X className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    {t(`comparison.today.${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-brand-200 bg-brand-50/40 rounded-lg p-6 h-full">
              <div className="text-xs font-mono font-semibold tracking-wider text-brand-700 uppercase mb-4">
                {t("comparison.prototype")}
              </div>
              <ul className="flex flex-col gap-3">
                {ROWS.map((n) => (
                  <li key={n} className="flex gap-2 text-sm text-slate-900">
                    <Check className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
                    {t(`comparison.proto.${n}`)}
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
