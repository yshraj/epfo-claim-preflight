// The one entry point the rest of the app should call. Resolution order:
//
//   1. Static, precomputed cache (src/data/explanationCache.json) —
//      committed to the repo, zero cost, zero network calls. This is
//      what the deployed demo actually uses.
//   2. In-memory cache for this server process — catches anything that
//      isn't in the static cache yet during local dev.
//   3. A live provider call, IF LLM_PROVIDER is set to a configured
//      provider. Wrapped in try/catch so a network hiccup never breaks
//      the UI.
//   4. Local, zero-cost fallback text.
//
// In normal operation, every possible (checkKey, status, variant)
// combination is already in explanationCache.json, so step 3 is never
// reached at runtime. It only matters if you add a new check/variant
// and forget to regenerate the cache — see scripts/generate-explanations.mjs.

import cacheData from "@/data/explanationCache.json";
import { cacheKey, localFallbackFor } from "./localFallback";
import { buildPrompt } from "./prompts";
import { groqProvider } from "./providers/groq";
import { openrouterProvider } from "./providers/openrouter";
import { openaiProvider } from "./providers/openai";
import type { ExplainInput, LlmProvider } from "./types";

const staticCache = cacheData as Record<string, string>;
const memoryCache = new Map<string, string>();

const providers: Record<string, LlmProvider> = {
  groq: groqProvider,
  openrouter: openrouterProvider,
  openai: openaiProvider,
};

export async function getExplanation(input: ExplainInput): Promise<string> {
  const key = cacheKey(input);

  const fromStaticCache = staticCache[key];
  if (fromStaticCache) return fromStaticCache;

  const fromMemoryCache = memoryCache.get(key);
  if (fromMemoryCache) return fromMemoryCache;

  const providerName = process.env.LLM_PROVIDER ?? "none";
  const provider = providers[providerName];

  if (provider?.isConfigured()) {
    try {
      const text = await provider.complete(buildPrompt(input));
      memoryCache.set(key, text);
      return text;
    } catch (err) {
      console.warn(`[llm] ${providerName} call failed, using local fallback:`, err);
    }
  }

  return localFallbackFor(input);
}
