"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/client";
import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import Button, { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import UanActivation from "./UanActivation";

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const { login } = useSession();

  const [step, setStep] = useState<"credentials" | "otp" | "forgot">("credentials");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Validate credentials via context
      const isValid = login(identifier, password, false);
      if (isValid) {
        // Proceed to OTP step
        setStep("otp");
      } else {
        setError(t("login.error.credentials"));
      }
    }, 800);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isValid = login(identifier, otp, true);
      if (isValid) {
        router.push("/dashboard");
      } else {
        setError(t("login.otp.error"));
      }
    }, 800);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("credentials");
      setError(t("login.forgot.sent"));
    }, 800);
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Container size="narrow" className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
          {t("login.title")}
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          {t("login.subtitle")}
        </p>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === "credentials" && (
              <motion.form
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleCredentialsSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t("login.identifier")}
                  </label>
                  <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t("login.identifier.placeholder")}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">
                      {t("login.password")}
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep("forgot")}
                      className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                    >
                      {t("login.forgot")}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full justify-center">
                  {loading ? t("login.authenticating") : t("login.continue")}
                </Button>
                
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500">
                  <p className="font-medium text-slate-700 mb-1">{t("login.credentials.title")}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>priya.demo@example.test ({t("login.credentials.clean")})</li>
                    <li>rajesh.demo@example.test ({t("login.credentials.mismatch")})</li>
                    <li>meera.demo@example.test ({t("login.credentials.rejected")})</li>
                    <li>arjun.demo@example.test ({t("login.credentials.clarification")})</li>
                    <li>{t("login.credentials.password")} <code>demo1234</code></li>
                  </ul>
                  <p className="mt-2 text-slate-400">
                    {t("login.credentials.moreScenarios")}
                  </p>
                </div>
              </motion.form>
            )}

            {step === "otp" && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleOtpSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t("login.otp.label")}
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    {t("login.otp.sent")}
                  </p>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder={t("login.otp.placeholder")}
                    maxLength={6}
                    required
                    className="w-full font-mono tracking-widest text-lg"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full justify-center">
                  {loading ? t("login.otp.verifying") : t("login.otp.verify")}
                </Button>

                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("credentials");
                      setOtp("");
                      setError("");
                    }}
                    className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                  >
                    {t("login.back")}
                  </button>
                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={() => {
                      startResendTimer();
                      setOtp("123456");
                    }}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendTimer > 0 ? t("login.otp.resendIn", { seconds: resendTimer }) : t("login.otp.resend")}
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500 text-center">
                  <p>{t("login.otp.mockNotice")} <strong>123456</strong></p>
                </div>
              </motion.form>
            )}

            {step === "forgot" && (
              <motion.form
                key="forgot"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleForgotPassword}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t("login.identifier")}
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    {t("login.forgot.prompt")}
                  </p>
                  <Input
                    type="text"
                    required
                    className="w-full"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full justify-center">
                  {loading ? t("login.forgot.sending") : t("login.forgot.send")}
                </Button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setStep("credentials")}
                    className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                  >
                    {t("login.backToLogin")}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <UanActivation />
      </div>
    </Container>
  );
}
