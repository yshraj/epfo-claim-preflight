import Link from "next/link";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { marketingNav, appNav } from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function Header({ variant }: { variant: "marketing" | "app" }) {
  const links = variant === "marketing" ? marketingNav : appNav;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <ShieldCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
          Claim Pre-Flight
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {variant === "marketing" ? (
            <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
              Check my claim
            </Link>
          ) : (
            <Suspense fallback={<span className="h-7 w-7 rounded-full bg-slate-100" />}>
              <UserMenu />
            </Suspense>
          )}
        </div>

        <MobileNav links={links} />
      </div>
    </header>
  );
}
