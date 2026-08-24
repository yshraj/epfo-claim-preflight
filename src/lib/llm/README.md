# LLM explanation layer

**Purpose:** one short "why this matters" sentence attached to a failed/warned
pre-flight check. Nothing else in the app calls an LLM — the name-match,
Date-of-Exit, and bank-account logic in `../matchEngine.ts` is deterministic
and always local.

## Why this is safe to leave configured in a public repo

- The deployed app reads only `src/data/explanationCache.json`. There are
  exactly **7 possible entries** (see `prompts.ts` → `ALL_EXPLAIN_INPUTS`),
  because the cache key is `checkKey:status:variant` — never the member's
  name or any other per-user data. All 7 are already in the committed
  cache file.
- `getExplanation()` only reaches a live provider if a key is missing from
  that static cache — which shouldn't happen in normal operation.
- If `LLM_PROVIDER=none` (the default) or no API key is set, it falls
  straight to the local fallback text. The app never breaks, and never
  silently spends money, from a missing or invalid key.
- The only code path that makes live calls is `scripts/generate-explanations.mjs`,
  and it only runs when a human runs it manually.

## Provider choice

**Groq (`llama-3.1-8b-instant`) is the recommended default** — free tier is
14,400 requests/day, no credit card. OpenRouter's free tier is capped at
50 requests/day, which is fine as a backup but too tight for iterative dev.
OpenAI is wired in as a paid last resort, off by default.

Switch providers by editing `.env.local` only — no code changes:

```
LLM_PROVIDER=groq        # or: openrouter | openai | none
GROQ_API_KEY=...
```

## Regenerating the cache

```
npm run generate:explanations:dry-run   # preview the 7 prompts, no calls
npm run generate:explanations           # actually call the provider, 7 requests
```
