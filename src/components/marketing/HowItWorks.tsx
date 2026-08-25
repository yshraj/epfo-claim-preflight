import Reveal from "@/components/motion/Reveal";
import { LogIn, ShieldCheck, Send } from "lucide-react";

const STEPS = [
  {
    icon: LogIn,
    title: "Log in & tell us why",
    detail: "Pick a reason — medical, house, education — and we work out the right form for you.",
  },
  {
    icon: ShieldCheck,
    title: "We run 3 real checks",
    detail: "Identity, exit date, and bank account — cross-referenced before you submit anything.",
  },
  {
    icon: Send,
    title: "Fix, then submit with confidence",
    detail: "Correct what's wrong in place, watch the check re-run for real, and submit knowing it'll go through.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-200 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-12">
            How it works
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-8 relative">
          <div
            className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-slate-200"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center relative z-10">
                  <s.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-lg mt-4 text-slate-950">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
