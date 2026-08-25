import Link from "next/link";
import IdentityGraph from "@/components/IdentityGraph";
import { IDLE_GRAPH_DATA } from "@/lib/identityGraph";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-xs font-mono font-semibold tracking-wider text-brand-700 uppercase mb-4">
            Independent hackathon prototype
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-950">
            Your PF claim was probably going to get rejected.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-md">
            Now you&apos;ll know before you submit it — not three weeks later,
            from a code nobody can decode.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Check my claim
            </Link>
            <a
              href="#how-it-works"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-soft p-8">
            <IdentityGraph data={IDLE_GRAPH_DATA} idle />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
