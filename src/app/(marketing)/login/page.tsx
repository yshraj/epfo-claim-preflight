"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import Button, { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import UanActivation from "./UanActivation";

export default function LoginPage() {
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
        setError("Invalid email/phone or password.");
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
        setError("Invalid OTP. Please try again.");
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
      setError("Password reset instructions sent. (Mocked)");
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
          Member Login
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Sign in to access your EPF account, claim status, and documents.
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
                    Email or Mobile Number
                  </label>
                  <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. priya.demo@example.test"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep("forgot")}
                      className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Forgot password?
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
                  {loading ? "Authenticating..." : "Continue"}
                </Button>
                
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500">
                  <p className="font-medium text-slate-700 mb-1">Prototype Credentials:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>priya.demo@example.test (Clean)</li>
                    <li>rajesh.demo@example.test (Mismatch)</li>
                    <li>meera.demo@example.test (Claim rejected)</li>
                    <li>arjun.demo@example.test (Needs clarification)</li>
                    <li>Password: <code>demo1234</code></li>
                  </ul>
                  <p className="mt-2 text-slate-400">
                    More scenarios (unmerged UAN, delayed claim, multiple issues) are one click away from the profile
                    menu &rarr; &ldquo;Demo scenarios&rdquo; once you&apos;re logged in.
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
                    One-Time Password (OTP)
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    An OTP has been sent to your registered mobile number and email.
                  </p>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
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
                  {loading ? "Verifying..." : "Verify & Login"}
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
                    Back
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
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500 text-center">
                  <p>Mock OTP is <strong>123456</strong></p>
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
                    Email or Mobile Number
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Enter your details to receive a password reset link.
                  </p>
                  <Input
                    type="text"
                    required
                    className="w-full"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full justify-center">
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setStep("credentials")}
                    className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                  >
                    Back to login
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
