import Reveal from "@/components/motion/Reveal";

const STATS = [
  { value: "~70M", label: "EPF members in India" },
  { value: "20–26%", label: "of claims historically rejected", note: "secondary sources, not EPFO-verified" },
  { value: "3", label: "records cross-checked here" },
  { value: "5", label: "separate EPFO logins today" },
];

export default function StatRow() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 first:pl-0 last:pr-0 text-center md:text-left">
              <div className="font-mono font-semibold text-3xl sm:text-4xl text-slate-950">
                {s.value}
              </div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              {s.note && <div className="text-[10px] text-slate-400 mt-0.5">{s.note}</div>}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
