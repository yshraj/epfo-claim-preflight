import type { Locale } from "../config";
import { en } from "./en";
import { hi } from "./hi";

export type TranslationKey = keyof typeof en;

/**
 * Every dictionary is typed against the English one, so a missing or
 * misspelled key is a compile error rather than a string that silently
 * renders in the wrong language at runtime. `npx tsc --noEmit` is therefore
 * the translation-completeness check — there is no separate lint step.
 */
export type Dictionary = Record<TranslationKey, string>;

export const dictionaries: Record<Locale, Dictionary> = { en, hi };
