"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { marketingNav, appNav } from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/client";

import { useSearchParams } from "next/navigation";

function UanDisplay() {
  const t = useT();
  const searchParams = useSearchParams();
  const uan = searchParams.get("uan") || "1009 1111 2222";
  const formattedUan = `${uan.slice(0, 4)} ${uan.slice(4, 8)} ${uan.slice(8, 12)}`;
  
  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-brand-100 border border-brand-200 rounded-md font-mono text-xs text-slate-600">
      {t("common.uan")}: <span className="font-semibold text-slate-900">{formattedUan}</span>
    </div>
  );
}

export default function Header({ variant }: { variant: "marketing" | "app" }) {
  const t = useT();
  const links = variant === "marketing" ? marketingNav : appNav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent to solid threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isApp = variant === "app";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300 motion-reduce:transform-none",
        isHidden ? "-translate-y-full" : "translate-y-0",
        isScrolled 
          ? "border-b border-brand-200 bg-brand-50/90 backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className={cn(
        "max-w-6xl mx-auto px-6 flex items-center justify-between",
        isApp ? "h-14" : "h-16"
      )}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <ShieldCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
            <span className="text-slate-950 hidden sm:inline-block">{t("brand.name")}</span>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded hidden md:inline-block">
            {t("brand.badge")}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          {variant === "marketing" ? (
            <Link href="/login" className={cn(buttonVariants({ size: "sm" }), "rounded-lg font-medium")}>
              {t("nav.checkMyClaim")}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Suspense fallback={<div className="w-32 h-8 rounded-md bg-brand-100 animate-pulse" />}>
                <UanDisplay />
              </Suspense>
              <Suspense fallback={<span className="h-7 w-7 rounded-full bg-slate-100" />}>
                <UserMenu />
              </Suspense>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </div>
    </header>
  );
}
