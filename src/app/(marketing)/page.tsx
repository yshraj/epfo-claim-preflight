import Hero from "@/components/marketing/Hero";
import StatRow from "@/components/marketing/StatRow";
import TensionSection from "@/components/marketing/TensionSection";
import CheckPreviewGallery from "@/components/marketing/CheckPreviewGallery";
import HowItWorks from "@/components/marketing/HowItWorks";
import ComparisonSection from "@/components/marketing/ComparisonSection";
import ServiceBreadthTeaser from "@/components/marketing/ServiceBreadthTeaser";
import Faq from "@/components/marketing/Faq";
import ClosingCta from "@/components/marketing/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatRow />
      <TensionSection />
      <CheckPreviewGallery />
      <HowItWorks />
      <ComparisonSection />
      <ServiceBreadthTeaser />
      <Faq />
      <ClosingCta />
    </>
  );
}
