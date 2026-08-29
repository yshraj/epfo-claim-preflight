import Link from "next/link";
import IdentityGraph from "@/components/IdentityGraph";
import { IDLE_GRAPH_DATA } from "@/lib/identityGraph";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import Reveal from "@/components/motion/Reveal";
import { getT } from "@/i18n/server";

export default function Hero() {
  const t = getT();

  return (
    <section className="pt-20 pb-24 sm:pt-32 sm:pb-36 overflow-hidden bg-brand-50/50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative">
        <Reveal>
          <div className="relative z-10">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-slate-950">
              {t("hero.title")}
            </h1>
            <h2 className="mt-4 font-display font-medium text-2xl sm:text-3xl text-slate-800">
              {t("hero.subtitle")}
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-md">
              {t("hero.body")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "rounded-lg text-base h-12 px-8")}>
                {t("nav.checkMyClaim")}
              </Link>
              <a
                href="#how-it-works"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-lg text-base h-12 px-8 bg-white border-slate-200")}
              >
                {t("hero.seeHow")}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative max-w-sm mx-auto md:mx-0 md:ml-auto w-full">
            <div className="bg-white border border-slate-200/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200/60 px-6 py-5 flex items-center justify-between">
                <div className="font-medium text-slate-700">{t("hero.card.title")}</div>
                <div className="text-2xl font-bold font-display text-amber-600">86%</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-700"><div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-600"><path d="M20 6L9 17l-5-5"/></svg></div> {t("hero.card.identity")}</div>
                  <span className="text-slate-400 font-mono text-xs">{t("hero.card.verified")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-700"><div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-600"><path d="M20 6L9 17l-5-5"/></svg></div> {t("hero.card.kyc")}</div>
                  <span className="text-slate-400 font-mono text-xs">{t("hero.card.verified")}</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-amber-50 -mx-6 px-6 py-2 border-y border-amber-100/50">
                  <div className="flex items-center gap-3 text-amber-900 font-medium"><div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-700"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div> {t("hero.card.nameConsistency")}</div>
                  <span className="text-amber-600 font-mono text-xs font-medium">{t("hero.card.mismatch")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-700"><div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-600"><path d="M20 6L9 17l-5-5"/></svg></div> {t("hero.card.bank")}</div>
                  <span className="text-slate-400 font-mono text-xs">{t("hero.card.active")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-700"><div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-600"><path d="M20 6L9 17l-5-5"/></svg></div> {t("hero.card.employment")}</div>
                  <span className="text-slate-400 font-mono text-xs">{t("hero.card.verified")}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
