import { SERVICES, type ServiceAudience } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";

const AUDIENCES: ServiceAudience[] = ["Employee", "Employer", "Pensioner", "Cross-cutting"];

export default function ServicesPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-3">
        EPFO services
      </h1>
      <p className="text-slate-600 max-w-2xl mb-10">
        This is a real directory of what EPFO actually offers — sourced from a
        live audit of the real portal, not invented categories. <strong>Only
        &quot;Withdraw PF&quot; is a working journey in this prototype</strong>;
        everything else here is honest, informational content, not a hidden
        feature.
      </p>

      {AUDIENCES.map((audience) => {
        const items = SERVICES.filter((s) => s.audience === audience);
        if (items.length === 0) return null;
        return (
          <div key={audience} className="mb-12">
            <h2 className="font-display font-bold text-xl text-slate-950 mb-4">{audience}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  );
}
