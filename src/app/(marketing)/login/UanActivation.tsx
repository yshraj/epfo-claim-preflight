"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CheckCircle2, ShieldAlert, Loader2, ArrowRight, UserCircle, Smartphone, Fingerprint, KeyRound } from "lucide-react";

export default function UanActivation() {
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
              <h3 className="font-semibold text-slate-900 mb-4">You&apos;ll need:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> Your UAN (Universal Account Number)
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> Aadhaar-linked mobile number
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> Access to your phone
                </li>
              </ul>
            </div>
            <button onClick={() => setStep(1)} className={cn(buttonVariants(), "w-full")}>
              Start activation
            </button>
          </div>
        );
      case 1:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(2); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <UserCircle className="h-4 w-4 text-brand-600" /> Step 1: Verify your details
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Enter your UAN</label>
              <input required type="text" value={uan} onChange={(e) => setUan(e.target.value)} placeholder="12-digit UAN" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Checking...</> : "Continue"}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(3); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <Smartphone className="h-4 w-4 text-brand-600" /> Step 2: Verify mobile number
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Aadhaar-linked Mobile Number</label>
              <input required type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile number" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Connecting...</> : "Send OTP"}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(4); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <Fingerprint className="h-4 w-4 text-brand-600" /> Step 3: Aadhaar verification
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded p-4 text-sm text-slate-600 mb-2">
              By continuing, you consent to EPFO using your Aadhaar details to verify your identity.
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...</> : "I consent, send Aadhaar OTP"}
            </button>
          </form>
        );
      case 4:
        return (
          <form onSubmit={(e) => { e.preventDefault(); simulateNetwork(5); }} className="space-y-4">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
              <KeyRound className="h-4 w-4 text-brand-600" /> Step 4: OTP confirmation
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Enter Aadhaar OTP</label>
              <div className="text-xs text-slate-500 mb-3">An OTP has been sent to your mobile number ending in {mobile.slice(-4) || "XXXX"}.</div>
              <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" className="w-full px-3 py-3 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-center tracking-[0.5em] font-mono" maxLength={6} />
            </div>
            <button disabled={isLoading} type="submit" className={cn(buttonVariants(), "w-full mt-2")}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Verifying...</> : "Verify & Activate"}
            </button>
          </form>
        );
      case 5:
        return (
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
            <div className="font-display font-bold text-xl text-slate-900">Step 5: Activation complete</div>
            <div className="text-sm text-slate-600 mt-2 max-w-sm">
              Your UAN is now active and linked to your Aadhaar.
            </div>
            <button onClick={() => window.location.href = "/login"} className={cn(buttonVariants(), "mt-8 w-full")}>
              Proceed to Login
            </button>
          </div>
        );
    }
  }

  return (
    <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-slate-900">Activate your UAN</div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-200 px-2 py-0.5 rounded">Prototype</span>
        </div>
        <div className="text-xs text-slate-500">
          This demonstration simulates Aadhaar authentication.
        </div>
      </div>
      
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
}
