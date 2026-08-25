import Link from "next/link";
import type { Service } from "@/data/services";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.isLiveJourney ? "/dashboard" : `/services/${service.slug}`}
      className="group flex flex-col justify-between gap-4 border border-slate-200 rounded-xl p-5 hover:border-brand-500 hover:bg-brand-50/60 hover:shadow-soft transition-all h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400">{service.audience}</span>
          {service.isLiveJourney && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 bg-brand-100 rounded-full px-2 py-0.5">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Live in this prototype
            </span>
          )}
        </div>
        <div className="font-medium text-slate-900">{service.name}</div>
        <p className="text-xs text-slate-500 mt-1.5">{service.summary}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-brand-700">
        {service.isLiveJourney ? "Go to dashboard" : "Learn more"}
        <ArrowRight
          className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
