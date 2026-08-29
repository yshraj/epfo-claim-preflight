"use client";

import { createContext, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { createTranslator, type Translator } from ".";

/**
 * ─── The one rule this file exists to enforce ──────────────────────────────
 *
 * The locale is IMMUTABLE for the lifetime of a document. It is resolved once
 * on the server from the cookie, handed down as a prop, and never changes
 * afterwards. Switching language performs a real page load (see
 * LanguageSwitcher), so a new document simply starts with the new value.
 *
 * That is the whole design, and it is deliberate. The previous attempt kept
 * the locale in React state and tried to keep it in step with the server
 * across router.refresh(), Next's Router Cache and prefetched RSC payloads.
 * Every bug came out of that synchronisation: the first click appearing to do
 * nothing, navigation showing the old language, and a stale render silently
 * reverting the user's choice. There is no state here to fall out of step, so
 * none of those failures are expressible.
 */
interface LocaleContextValue {
  locale: Locale;
  t: Translator;
}

/**
 * A real default rather than `undefined`, so a missing provider degrades to
 * English instead of throwing. A language preference must never be able to
 * take a page down — the same reasoning the translator already applies to a
 * missing key.
 */
const FALLBACK: LocaleContextValue = {
  locale: DEFAULT_LOCALE,
  t: createTranslator(DEFAULT_LOCALE),
};

const LocaleContext = createContext<LocaleContextValue>(FALLBACK);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // No useState, no useEffect. The prop is the single source of truth, and it
  // matches what the server rendered, so there is no hydration mismatch and no
  // flash of English.
  const value = useMemo(() => ({ locale, t: createTranslator(locale) }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

/** Convenience for the common case of only needing the translator. */
export function useT(): Translator {
  return useLocale().t;
}
