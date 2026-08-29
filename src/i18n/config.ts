// Locale registry. Adding a language is a two-line change here plus one new
// file in ./locales — no component ever has to be touched, because every
// dictionary is type-checked against the English one (see ./locales/index.ts).

export const LOCALES = ["en", "hi"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Read on the server via cookies() and on the client via document.cookie, so
 * server and client components resolve the same language on the same request.
 * Not httpOnly — the client half has to read it, and a language preference is
 * not a secret.
 */
export const LOCALE_COOKIE = "epfo_locale";

export const LOCALE_LABELS: Record<Locale, { name: string; englishName: string }> = {
  en: { name: "English", englishName: "English" },
  hi: { name: "हिन्दी", englishName: "Hindi" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
