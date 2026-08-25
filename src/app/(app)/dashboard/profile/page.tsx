"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { CheckCircle2, AlertCircle, ChevronRight, User, Phone, MapPin, Shield, Building2, CreditCard } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function ProfilePage() {
  const { user } = useSession();

  if (!user) return null;

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "verified" || status === "active") {
      return (
        <Badge tone="success" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3" />
          Verified
        </Badge>
      );
    }
    if (status === "pending") {
      return (
        <Badge tone="warning" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
          Pending
        </Badge>
      );
    }
    return (
      <Badge tone="error" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
        <AlertCircle className="h-3 w-3" />
        Needs Attention
      </Badge>
    );
  };

  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">Profile Settings</h1>
        <p className="text-slate-500">Manage your personal information, KYC details, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="flex flex-col gap-2">
          <nav className="flex flex-col gap-1 sticky top-24">
            <Link href="#personal" className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 text-slate-900 transition-colors">
              Personal Details
            </Link>
            <Link href="#kyc" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
              KYC & Bank
            </Link>
            <Link href="/dashboard/employment" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors flex justify-between items-center group">
              Employment History
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/dashboard/security" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors flex justify-between items-center group">
              Security & Login
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          {/* Section: Personal */}
          <section id="personal" className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden scroll-mt-24">
            <div className="border-b border-slate-100 p-5 flex items-center gap-3">
              <div className="bg-brand-50 p-2 rounded-lg text-brand-600">
                <User className="h-5 w-5" />
              </div>
              <h2 className="font-display font-semibold text-lg text-slate-900">Personal Details</h2>
            </div>
            <div className="p-0">
              <dl className="divide-y divide-slate-100">
                <div className="px-5 py-4 grid grid-cols-3 gap-4 hover:bg-slate-50/50 transition-colors">
                  <dt className="text-sm font-medium text-slate-500">Name (as per Aadhaar)</dt>
                  <dd className="text-sm text-slate-900 col-span-2 font-medium">{user.aadhaarName}</dd>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 hover:bg-slate-50/50 transition-colors">
                  <dt className="text-sm font-medium text-slate-500">UAN</dt>
                  <dd className="text-sm text-slate-900 col-span-2 flex items-center justify-between">
                    <span className="font-mono tracking-wider">{user.uan.replace(/(\d{4})(?=\d)/g, "$1 ")}</span>
                  </dd>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 hover:bg-slate-50/50 transition-colors">
                  <dt className="text-sm font-medium text-slate-500">Date of Birth</dt>
                  <dd className="text-sm text-slate-900 col-span-2">{new Date(user.dobAadhaar).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Section: Contact */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 p-5 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="font-display font-semibold text-lg text-slate-900">Contact Details</h2>
            </div>
            <div className="p-0">
              <dl className="divide-y divide-slate-100">
                <div className="px-5 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Mobile Number</dt>
                    <dd className="text-sm text-slate-900 font-medium tracking-wide">
                      {user.phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1 •••• $3")}
                    </dd>
                  </div>
                  <StatusBadge status="verified" />
                </div>
                <div className="px-5 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Email Address</dt>
                    <dd className="text-sm text-slate-900">{user.email}</dd>
                  </div>
                  <StatusBadge status="verified" />
                </div>
              </dl>
            </div>
          </section>

          {/* Section: KYC & Bank */}
          <section id="kyc" className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden scroll-mt-24">
            <div className="border-b border-slate-100 p-5 flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="font-display font-semibold text-lg text-slate-900">Identity & KYC</h2>
            </div>
            <div className="p-0">
              <dl className="divide-y divide-slate-100">
                <div className="px-5 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Aadhaar Card</dt>
                    <dd className="text-sm text-slate-900 font-mono tracking-wider">•••• •••• 4821</dd>
                  </div>
                  <StatusBadge status={user.kycStatus.aadhaar} />
                </div>
                <div className="px-5 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">PAN Card</dt>
                    <dd className="text-sm text-slate-900 font-mono tracking-wider">•••••4821</dd>
                  </div>
                  <StatusBadge status={user.kycStatus.pan} />
                </div>
              </dl>
            </div>
          </section>

          {/* Section: Bank */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 p-5 flex items-center gap-3">
              <div className="bg-sky-50 p-2 rounded-lg text-sky-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="font-display font-semibold text-lg text-slate-900">Bank Account</h2>
            </div>
            <div className="p-0">
              <dl className="divide-y divide-slate-100">
                <div className="px-5 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Account details</dt>
                    <dd className="text-sm text-slate-900">
                      <div className="font-medium">{user.bankName}</div>
                      <div className="text-slate-500 mt-0.5 text-xs">State Bank of India •••• 9821</div>
                    </dd>
                  </div>
                  <StatusBadge status={user.kycStatus.bank} />
                </div>
              </dl>
              {user.kycStatus.bank !== "verified" && (
                <div className="bg-amber-50 px-5 py-4 border-t border-amber-100">
                  <div className="flex gap-2 text-sm text-amber-800">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>Your bank details need to be verified by your employer before you can submit a withdrawal claim.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </Container>
  );
}
