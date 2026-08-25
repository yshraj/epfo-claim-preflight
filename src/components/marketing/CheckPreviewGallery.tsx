import Reveal from "@/components/motion/Reveal";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const PREVIEWS = [
  {
    title: "Name matches across Aadhaar, UAN and bank records",
    detail: '"RAJESH KUMAR SINGH" matches on all three records.',
    status: "pass" as const,
  },
  {
    title: "Name mismatch found",
    detail: 'Aadhaar name doesn’t fully match your bank account. Match score: 50%.',
    status: "fail" as const,
  },
  {
    title: "Bank account verified",
    detail: 'Instant check confirmed the account is active and matches your KYC name.',
    status: "pass" as const,
  },
];

const STYLES = {
  pass: { card: "hover:border-brand-300 hover:bg-brand-50/50", icon: "text-slate-300 group-hover:text-brand-600" },
  fail: { card: "hover:border-red-300 hover:bg-red-50/50", icon: "text-slate-300 group-hover:text-red-600" },
};

export default function CheckPreviewGallery() {
  return (
    <section className="py-20 bg-brand-50/30">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-xs font-mono font-semibold tracking-wider text-brand-700 uppercase mb-2">
            Real logic, not a mock
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-10">
            The check runs before you submit — not after you&apos;re rejected.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {PREVIEWS.map((p, i) => {
            const style = STYLES[p.status];
            const Icon = p.status === "pass" ? CheckCircle2 : AlertTriangle;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className={`group border border-slate-200 bg-white rounded-xl p-5 h-full transition-all duration-300 ${style.card}`}>
                  <Icon className={`h-5 w-5 mb-3 transition-colors duration-300 ${style.icon}`} aria-hidden="true" />
                  <div className="font-medium text-sm text-slate-900">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-2 transition-colors duration-300 group-hover:text-slate-700">{p.detail}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
