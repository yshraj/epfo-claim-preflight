import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ArrowLeft, MapPin, Info } from "lucide-react";
import { getT } from "@/i18n/server";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const t = getT();
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <Container size="narrow" className="py-16">
      <Link
        href="/services"
        className="flex w-fit items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("services.all")}
      </Link>

      <span className="block text-xs font-mono text-slate-400">{t(`audience.${service.audience}`)}</span>
      <h1 className="font-display font-bold text-3xl tracking-tight text-slate-950 mt-1 mb-4">
        {t(service.nameKey)}
      </h1>

      <p className="text-slate-700 mb-6">{t(service.summaryKey)}</p>

      <div className="flex items-start gap-2 text-sm text-slate-600 border border-slate-200 rounded-xl p-4 mb-4">
        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
        <div>
          <span className="font-medium text-slate-900">{t("services.whereItLives")}</span>
          {service.whereItLives}
        </div>
      </div>

      <div className="text-sm text-slate-600 mb-4">
        <span className="font-medium text-slate-900">{t("services.whyItMatters")}</span>
        {t(service.whyItMattersKey)}
      </div>

      {service.honestNoteKey && (
        <div className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          {t(service.honestNoteKey)}
        </div>
      )}

      <div className="border-t border-slate-200 pt-6">
        <p className="text-xs text-slate-400 mb-4">
          {t("services.informationalOnly")}
        </p>
        <Link href="/services" className={cn(buttonVariants({ variant: "secondary" }))}>
          {t("services.backToAll")}
        </Link>
      </div>
    </Container>
  );
}
