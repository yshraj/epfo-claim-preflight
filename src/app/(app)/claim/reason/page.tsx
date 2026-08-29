"use client";

import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { useT } from "@/i18n/client";
import type { ClaimReason } from "@/types/member";
import Container from "@/components/ui/Container";
import { HeartPulse, Home, GraduationCap, Briefcase, Landmark, type LucideIcon } from "lucide-react";

const REASONS: { key: ClaimReason; icon: LucideIcon }[] = [
  { key: "medical", icon: HeartPulse },
  { key: "house", icon: Home },
  { key: "education", icon: GraduationCap },
  { key: "leaving_job", icon: Briefcase },
  { key: "retirement", icon: Landmark },
];

export default function ReasonPage() {
  const { user } = useSession();
  const t = useT();

  if (!user) return null;
  const uan = user.uan;

  return (
    <Container size="narrow" className="py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-slate-950">
        {t("claim.reason.title")}
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        {t("claim.reason.subtitle")}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {REASONS.map((r) => (
          <Link
            key={r.key}
            href={`/claim/preflight?uan=${uan}&reason=${r.key}`}
            className="flex flex-col items-center justify-center gap-3 border border-slate-200 rounded-xl p-6 text-center hover:border-brand-500 hover:bg-brand-50/60 hover:shadow-soft transition-all group"
          >
            <r.icon className="h-6 w-6 text-brand-600 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-900">{t(`claim.reason.${r.key}`)}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
