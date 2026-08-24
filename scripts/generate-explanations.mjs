#!/usr/bin/env node
// Populates src/data/explanationCache.json with LLM-generated text.
//
// This is the ONLY place in the project that makes live LLM API calls.
// The running app (dev or deployed) never calls a live provider — it
// only reads the cache this script writes. Run it manually, once, with
// your own key:
//
//   node --env-file=.env.local scripts/generate-explanations.mjs
//   node --env-file=.env.local scripts/generate-explanations.mjs --dry-run   (preview prompts, no calls)
//
// There are only 7 entries total — see PROMPTS below — so a full run
// is 7 requests, well inside Groq's free tier (14,400/day).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = path.join(__dirname, "..", "src", "data", "explanationCache.json");

// Kept in sync with src/lib/llm/prompts.ts by hand — duplicated here
// deliberately so this script has zero build step / TS dependency.
const PROMPTS = {
  "name_match:warn:close":
    "In one sentence, explain to a PF (EPFO) claimant why even a small name difference between Aadhaar and their PF record (like a missing middle name) can flag their claim, and reassure them it's usually a quick fix.",
  "name_match:fail:moderate":
    "In one sentence, explain to a PF (EPFO) claimant why a partial name mismatch between their Aadhaar and PF/bank records blocks their claim.",
  "name_match:fail:severe":
    "In one sentence, explain to a PF (EPFO) claimant why a large name mismatch between their Aadhaar and PF/bank records is treated seriously and must be corrected before continuing.",
  "date_of_exit:warn:self_declare_eligible":
    "In one sentence, explain to a PF (EPFO) claimant why they can now confirm their own job-leaving date themselves, since their employer hasn't done it within 60 days.",
  "date_of_exit:fail:waiting_period":
    "In one sentence, explain to a PF (EPFO) claimant why a missing exit date currently blocks their final settlement claim.",
  "bank_account:fail:name_mismatch":
    "In one sentence, explain to a PF (EPFO) claimant why their bank account name not matching their claim name will cause the transfer to fail.",
  "bank_account:fail:inactive":
    "In one sentence, explain to a PF (EPFO) claimant why their bank account couldn't be verified as active for receiving the claim amount.",
};

const SYSTEM_PROMPT =
  "You explain EPFO (Indian PF) claim-rejection reasons in one short, calm, plain-English sentence for a non-technical citizen. No jargon, no form numbers, no legal language. Maximum 25 words.";

const PROVIDER_CONFIG = {
  groq: {
    baseUrl: "https://api.groq.com/openai/v1",
    apiKeyEnv: "GROQ_API_KEY",
    model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
  },
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKeyEnv: "OPENROUTER_API_KEY",
    model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free",
    extraHeaders: {
      "HTTP-Referer": "https://github.com/yshraj/epfo-claim-preflight",
      "X-Title": "EPFO Claim Pre-Flight (hackathon prototype)",
    },
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    apiKeyEnv: "OPENAI_API_KEY",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  },
};

async function callProvider(providerName, prompt) {
  const config = PROVIDER_CONFIG[providerName];
  if (!config) throw new Error(`Unknown provider: ${providerName}`);

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    throw new Error(
      `${config.apiKeyEnv} is not set. Add it to .env.local, or run with --env-file=.env.local`,
    );
  }

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(config.extraHeaders ?? {}),
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 60,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${res.status} ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from provider");
  return text;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const providerName = process.env.LLM_PROVIDER;

  if (!providerName || providerName === "none") {
    console.error(
      "LLM_PROVIDER is not set (or set to 'none'). Set it to groq, openrouter, or openai in .env.local first.",
    );
    process.exit(1);
  }

  const entries = Object.entries(PROMPTS);
  console.log(
    `Provider: ${providerName} · model: ${PROVIDER_CONFIG[providerName]?.model}\n` +
      `This will make ${entries.length} request(s) total.${dryRun ? " (dry run — no calls will be made)" : ""}\n`,
  );

  let existing = {};
  try {
    existing = JSON.parse(await readFile(CACHE_PATH, "utf-8"));
  } catch {
    // fine if it doesn't exist yet
  }

  const result = { ...existing };

  for (const [key, prompt] of entries) {
    if (dryRun) {
      console.log(`[dry-run] ${key}\n  prompt: ${prompt}\n`);
      continue;
    }
    process.stdout.write(`${key} ... `);
    try {
      const text = await callProvider(providerName, prompt);
      result[key] = text;
      console.log(`OK\n  "${text}"`);
    } catch (err) {
      console.log(`FAILED (${err.message}) — keeping existing/local value`);
    }
  }

  if (!dryRun) {
    await writeFile(CACHE_PATH, JSON.stringify(result, null, 2) + "\n", "utf-8");
    console.log(`\nWrote ${Object.keys(result).length} entries to ${CACHE_PATH}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
