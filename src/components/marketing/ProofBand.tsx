import Reveal from "@/components/motion/Reveal";

const STATS = [
  { value: "~70M", label: "EPF members in India" },
  { value: "20–26%", label: "of claims historically rejected", note: "secondary sources, not EPFO-verified" },
  { value: "3", label: "records cross-checked here" },
  { value: "5", label: "separate EPFO logins today" },
];

export default function ProofBand() {
  return (
    <section className="bg-brand-900 text-white border-y border-brand-900/10">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl sm:text-3xl leading-snug tracking-tight text-white">
              On EPFO&apos;s own homepage, the answer to &quot;what if my claim
              isn&apos;t settled in 20 days&quot; is:{" "}
              <span className="text-brand-300">file a grievance.</span>
            </p>
            <p className="mt-4 text-brand-300 text-sm max-w-xl mx-auto md:mx-0">
              Not a status update. Not an explanation. A separate complaint, on a
              separate system, about a claim that already went silent.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-mono font-semibold text-3xl sm:text-4xl text-white">
                  {s.value}
                </div>
                <div className="text-xs text-brand-300 mt-1">{s.label}</div>
                {s.note && <div className="text-[10px] text-brand-300/60 mt-0.5">{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
