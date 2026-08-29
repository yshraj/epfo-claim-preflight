"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/cn";

/**
 * Write the cookie, then load a fresh document. That is the entire mechanism.
 *
 * No server action, no router.refresh(), no revalidatePath, no optimistic
 * state. document.cookie is synchronous, so the navigation that follows on the
 * very next line already carries the new value, and the server renders the new
 * document from it. A real page load also discards Next's in-memory Router
 * Cache wholesale, which is what previously replayed pages in the old language
 * after a switch.
 *
 * The cost is one page load on a deliberate, rare action. The benefit is that
 * there is no window in which the client and the server disagree.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useLocale();
  const [switchingTo, setSwitchingTo] = useState<Locale | null>(null);

  function choose(next: Locale) {
    if (next === locale || switchingTo) return;
    setSwitchingTo(next);

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;

    // assign() rather than reload(): reload can re-submit state on some pages,
    // and this keeps the member exactly where they were, in the new language.
    window.location.assign(window.location.pathname + window.location.search);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white p-0.5",
        switchingTo && "opacity-70",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Languages className="h-3.5 w-3.5 text-slate-400 ml-1.5 shrink-0" aria-hidden="true" />
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => choose(code)}
          aria-pressed={code === locale}
          disabled={switchingTo !== null}
          lang={code}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded transition-colors disabled:cursor-wait",
            code === locale ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100",
          )}
        >
          {LOCALE_LABELS[code].name}
        </button>
      ))}
    </div>
  );
}
