import Reveal from "@/components/motion/Reveal";

export default function TensionSection() {
  return (
    <section className="bg-slate-950 text-white">
      <Reveal>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-display text-2xl sm:text-3xl leading-snug tracking-tight">
            On EPFO&apos;s own homepage, the answer to &quot;what if my claim
            isn&apos;t settled in 20 days&quot; is:{" "}
            <span className="text-brand-300">file a grievance.</span>
          </p>
          <p className="mt-6 text-slate-400 text-sm max-w-xl mx-auto">
            Not a status update. Not an explanation. A separate complaint, on a
            separate system, about a claim that already went silent.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
