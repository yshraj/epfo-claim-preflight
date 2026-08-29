import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { createTranslator, type Translator } from ".";

/**
 * Locale for a server component. Reading a cookie opts the route out of
 * static rendering — an accepted trade for keeping all 17 routes where they
 * are instead of restructuring them under app/[locale]/.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getT(): Translator {
  return createTranslator(getLocale());
}
