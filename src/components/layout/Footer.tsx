import Link from "next/link";
import { getT } from "@/i18n/server";

export default function Footer() {
  const t = getT();

  return (
    <footer className="border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-slate-500">
        <div>
          <div className="font-display font-bold text-slate-900 mb-1">{t("brand.name")}</div>
          <p className="max-w-xs">
            {t("footer.blurb")}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/services" className="hover:text-slate-900 transition-colors">
            {t("nav.services")}
          </Link>
          <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">
            {t("nav.howItWorks")}
          </Link>
          <a
            href="https://www.epfindia.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            {t("footer.officialSite")}
          </a>
        </div>
      </div>
    </footer>
  );
}
