import Hero from "@/components/marketing/Hero";
import ProofBand from "@/components/marketing/ProofBand";
import CheckPreviewGallery from "@/components/marketing/CheckPreviewGallery";
import HowItWorks from "@/components/marketing/HowItWorks";
import ComparisonSection from "@/components/marketing/ComparisonSection";
import Faq from "@/components/marketing/Faq";
import ClosingCta from "@/components/marketing/ClosingCta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PrototypeDisclaimer from "@/components/marketing/PrototypeDisclaimer";

export default function Home() {
  return (
    <>
      <PrototypeDisclaimer />
      <Hero />
      <ProofBand />
      <CheckPreviewGallery />
      <HowItWorks />
      <ComparisonSection />
      
      <div className="bg-white py-8 border-y border-brand-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>EPFO isn&apos;t just withdrawals. This prototype goes deep on one flow, but handles the full scope.</p>
          <Link href="/services" className="font-medium text-brand-600 hover:text-brand-900 flex items-center gap-1 group transition-colors">
            Explore all 20+ EPFO services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      
      <Faq />
      <ClosingCta />
    </>
  );
}
