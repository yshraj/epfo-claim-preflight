import { DEFAULT_LOCALE, type Locale } from "./config";
import { dictionaries, type TranslationKey } from "./locales";

export type { TranslationKey };
export type TranslateParams = Record<string, string | number>;
export type Translator = (key: TranslationKey, params?: TranslateParams) => string;

// Placeholders are written {likeThis} in the dictionaries. Interpolation is
// done here rather than by template literals at the call site so that a
// translator can reorder them — Hindi's verb-final word order frequently
// needs a different sequence from the English source.
function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function createTranslator(locale: Locale): Translator {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  const fallback = dictionaries[DEFAULT_LOCALE];

  return (key, params) => {
    // Falling back to English beats rendering a raw key at a citizen: a
    // missing translation should degrade to a readable sentence, not to
    // "claim.preflight.title".
    const template = dict[key] ?? fallback[key] ?? key;
    return interpolate(template, params);
  };
}

/** English translator, for engine defaults and tests. */
export const enT: Translator = createTranslator("en");
