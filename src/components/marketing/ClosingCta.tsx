import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { getT } from "@/i18n/server";

export default function ClosingCta() {
  const t = getT();

  return (
    <section className="py-24 bg-slate-950 text-white text-center">
      <Reveal>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4">
            {t("closing.title")}
          </h2>
          <p className="text-slate-400 mb-8">
            {t("closing.body")}
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg" }), "bg-white text-slate-950 hover:bg-slate-100")}
          >
            {t("nav.checkMyClaim")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
