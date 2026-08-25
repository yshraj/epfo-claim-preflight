import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function ClosingCta() {
  return (
    <section className="py-24 bg-slate-950 text-white text-center">
      <Reveal>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4">
            You knew about the problem before EPFO did.
          </h2>
          <p className="text-slate-400 mb-8">
            That&apos;s the whole idea. Check your claim before you submit it.
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg" }), "bg-white text-slate-950 hover:bg-slate-100")}
          >
            Check my claim
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
