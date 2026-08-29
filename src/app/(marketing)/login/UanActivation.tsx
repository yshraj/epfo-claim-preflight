"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/client";
import { CheckCircle2, ShieldAlert, Loader2, ArrowRight, UserCircle, Smartphone, Fingerprint, KeyRound } from "lucide-react";

export default function UanActivation() {
  const t = useT();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [uan, setUan] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const simulateNetwork = (nextStep: 0 | 1 | 2 | 3 | 4 | 5) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 1200);
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-4">{t("uan.needs.title")}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> {t("uan.needs.uan")}
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> {t("uan.needs.mobile")}
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> {t("uan.needs.phone")}
                </li>
              </ul>
            </div>
            <button onClick={() => setStep(1)} className={cn(buttonVariants(), "w-full")}>
              {t("uan.start")}
            </button>
          </div>
        );
      case 1:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(2); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <UserCircle className="h-4 w-4 text-brand-600" /> {t("uan.step1")}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t("uan.step1.label")}</label>
              <input required type="text" value={uan} onChange={(e) => setUan(e.target.value)} placeholder={t("uan.step1.placeholder")} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("uan.checking")}</> : t("login.continue")}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(3); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <Smartphone className="h-4 w-4 text-brand-600" /> {t("uan.step2")}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t("uan.step2.label")}</label>
              <input required type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={t("uan.step2.placeholder")} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("uan.connecting")}</> : t("uan.sendOtp")}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(4); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <Fingerprint className="h-4 w-4 text-brand-600" /> {t("uan.step3")}
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded p-4 text-sm text-slate-600 mb-2">
              {t("uan.consent")}
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("uan.processing")}</> : t("uan.consentCta")}
            </button>
          </form>
        );
      case 4:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(5); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <KeyRound className="h-4 w-4 text-brand-600" /> {t("uan.step4")}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t("uan.step4.label")}</label>
              <div className="text-xs text-slate-500 mb-3">{t("uan.step4.sent", { last4: mobile.slice(-4) || "XXXX" })}</div>
              <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder={t("uan.step4.placeholder")} className="w-full px-3 py-3 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-center tracking-[0.5em] font-mono" maxLength={6} />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("uan.verifying")}</> : t("uan.activate")}
            </button>
          </form>
        );
      case 5:
        return (
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
            <div className="font-display font-bold text-xl text-slate-900">{t("uan.step5")}</div>
            <div className="text-sm text-slate-600 mt-2 max-w-sm">
              {t("uan.step5.body")}
            </div>
            <button onClick={() => window.location.href = "/login"} className={cn(buttonVariants(), "mt-8 w-full")}>
              {t("uan.proceed")}
            </button>
          </div>
        );
    }
  }

  return (
    <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-slate-900">{t("uan.title")}</div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-200 px-2 py-0.5 rounded">{t("uan.prototypeTag")}</span>
        </div>
        <div className="text-xs text-slate-500">
          {t("uan.simNote")}
        </div>
      </div>
      
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
}
