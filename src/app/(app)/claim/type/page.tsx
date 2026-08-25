"use client";

import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { Wallet, ArrowRightLeft, ActivitySquare, ChevronRight } from "lucide-react";

export default function ClaimTypePage() {
  const { user } = useSession();

  if (!user) return null;
  const uan = user.uan;

  const options = [
    {
      title: "Withdraw PF",
      description: "Apply for full or partial withdrawal (Forms 19, 31, 10C)",
      icon: Wallet,
      href: `/claim/reason?uan=${uan}`,
      isDemo: false
    },
    {
      title: "Transfer PF",
      description: "Move your PF balance from a previous employer to your current one",
      icon: ArrowRightLeft,
      href: "#",
      isDemo: true
    },
    {
      title: "Check claim status",
      description: "Track an existing application",
      icon: ActivitySquare,
      href: `/claim/status?uan=${uan}`,
      isDemo: false
    }
  ];

  return (
    <Container size="narrow" className="py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
        What would you like to do?
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Select a service to continue.
      </p>

      <div className="flex flex-col gap-4">
        {options.map((opt) => (
          <Link
            key={opt.title}
            href={opt.href}
            className={`flex items-center p-5 rounded-xl border transition-all group ${
              opt.isDemo 
                ? "border-slate-200 bg-slate-50 opacity-70 pointer-events-none" 
                : "border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50/50 hover:shadow-sm"
            }`}
          >
            <div className={`p-3 rounded-lg mr-4 ${opt.isDemo ? "bg-slate-200 text-slate-400" : "bg-brand-100 text-brand-600"}`}>
              <opt.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">{opt.title}</span>
                {opt.isDemo && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-slate-200 text-slate-500 px-2 py-0.5 rounded">
                    Not in prototype
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-1">{opt.description}</p>
            </div>
            {!opt.isDemo && (
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
            )}
          </Link>
        ))}
      </div>
    </Container>
  );
}
