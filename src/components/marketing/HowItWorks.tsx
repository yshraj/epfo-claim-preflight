import Reveal from "@/components/motion/Reveal";
import { LogIn, ShieldCheck, Send } from "lucide-react";
import { getT } from "@/i18n/server";

// Step 2's count tracks runPreflightChecks() — it went from 3 to 4 when the
// date-of-birth check was added, and the copy has to move with it.
const STEPS = [
  { icon: LogIn, key: "step1" },
  { icon: ShieldCheck, key: "step2" },
  { icon: Send, key: "step3" },
] as const;

export default function HowItWorks() {
  const t = getT();

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-200 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-10">
            {t("howItWorks.title")}
          </h2>
        </Reveal>
        
        <div className="relative border border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-10">
          <div
            className="hidden sm:block absolute top-1/2 left-10 right-10 h-px bg-slate-200 -translate-y-1/2"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row gap-8 justify-between relative z-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.1} className="flex-1">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
                    <s.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-950">
                    {t(`howItWorks.${s.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-xs">
                    {t(`howItWorks.${s.key}.detail`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
