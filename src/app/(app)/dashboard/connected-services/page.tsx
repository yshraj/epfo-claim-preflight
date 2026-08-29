"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { FileText, CheckCircle2, ArrowRight, ShieldCheck, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { useT } from "@/i18n/client";
export default function ConnectedServicesPage() {
  const t = useT();
  const { user, dispatch } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "connecting" | "success">("intro");

  if (!user) return null;

  if (user.digiLockerConnected && step === "intro") {
    return (
      <Container className="py-16 max-w-2xl text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 mb-2">{t("docs.digilockerConnected")}</h1>
        <p className="text-slate-500 mb-8">{t("connected.linked")}</p>
        <Link href="/dashboard/documents">
          <Button variant="secondary">{t("connected.backToDocs")}</Button>
        </Link>
      </Container>
    );
  }

  const handleConnect = () => {
    setStep("connecting");
    setTimeout(() => {
      dispatch({ type: "CONNECT_DIGILOCKER" });
      setStep("success");
      setTimeout(() => {
        router.push("/dashboard/documents");
      }, 2000);
    }, 2500);
  };

  return (
    <Container className="py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">{t("connected.title")}</h1>
        <p className="text-slate-500">{t("connected.subtitle")}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-8 relative min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="flex justify-center items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center shadow-inner">
                  <ShieldCheck className="h-8 w-8 text-brand-600" />
                </div>
                <div className="text-slate-300">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-slate-900 mb-3">{t("docs.connect")}</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Securely link your DigiLocker account to instantly fetch your Aadhaar, PAN, and other verified documents for faster claim processing.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-200 mb-8 inline-block text-left">
                <strong>{t("connected.simulated")}</strong>
                <p className="mt-1">{t("connected.noRealData")}</p>
              </div>

              <div>
                <Button onClick={handleConnect} className="w-full sm:w-auto min-w-[200px]">
                  Connect via DigiLocker
                </Button>
              </div>
            </motion.div>
          )}

          {step === "connecting" && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Fingerprint className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
                <svg className="absolute -inset-4 w-28 h-28 text-blue-200 animate-spin" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="60 40" />
                </svg>
              </div>
              
              <h2 className="text-xl font-semibold text-slate-900 mb-2">{t("connected.authenticating")}</h2>
              <p className="text-slate-500">{t("connected.connecting")}</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              
              <h2 className="text-xl font-semibold text-slate-900 mb-2">{t("connected.success")}</h2>
              <p className="text-slate-500">{t("connected.synced")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
