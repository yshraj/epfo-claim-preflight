// Shared between the runtime (for reference/regeneration) and the
// offline generate-explanations script. One short, factual prompt per
// combo — deliberately generic (no member data), which is exactly what
// keeps this cacheable to ~7 entries for the entire app.
import type { ExplainInput } from "./types";
import { cacheKey } from "./localFallback";

const PROMPTS: Record<string, string> = {
  "name_match:warn:close":
    "In one sentence, explain to a PF (EPFO) claimant why even a small name difference between Aadhaar and their PF record (like a missing middle name) can flag their claim, and reassure them it's usually a quick fix.",
  "name_match:fail:moderate":
    "In one sentence, explain to a PF (EPFO) claimant why a partial name mismatch between their Aadhaar and PF/bank records blocks their claim.",
  "name_match:fail:severe":
    "In one sentence, explain to a PF (EPFO) claimant why a large name mismatch between their Aadhaar and PF/bank records is treated seriously and must be corrected before continuing.",
  "date_of_birth:warn:dob_minor_drift":
    "In one sentence, explain to a PF (EPFO) claimant why a small difference between their date of birth on Aadhaar and on their PF record still needs correcting, and reassure them their Aadhaar alone is enough to fix it.",
  "date_of_birth:fail:dob_major_drift":
    "In one sentence, explain to a PF (EPFO) claimant why a large difference between their date of birth on Aadhaar and on their PF record requires a separate documentary proof rather than just Aadhaar.",
  "date_of_exit:warn:self_declare_eligible":
    "In one sentence, explain to a PF (EPFO) claimant why they can now confirm their own job-leaving date themselves, since their employer hasn't done it within 60 days.",
  "date_of_exit:fail:waiting_period":
    "In one sentence, explain to a PF (EPFO) claimant why a missing exit date currently blocks their final settlement claim.",
  "bank_account:fail:name_mismatch":
    "In one sentence, explain to a PF (EPFO) claimant why their bank account name not matching their claim name will cause the transfer to fail.",
  "bank_account:fail:inactive":
    "In one sentence, explain to a PF (EPFO) claimant why their bank account couldn't be verified as active for receiving the claim amount.",
};

export function buildPrompt(input: ExplainInput): string {
  return (
    PROMPTS[cacheKey(input)] ??
    "In one sentence, explain to a PF (EPFO) claimant why this check needs their attention before submitting a claim."
  );
}

export const ALL_EXPLAIN_INPUTS: ExplainInput[] = [
  { checkKey: "name_match", status: "warn", variant: "close" },
  { checkKey: "name_match", status: "fail", variant: "moderate" },
  { checkKey: "name_match", status: "fail", variant: "severe" },
  { checkKey: "date_of_birth", status: "warn", variant: "dob_minor_drift" },
  { checkKey: "date_of_birth", status: "fail", variant: "dob_major_drift" },
  { checkKey: "date_of_exit", status: "warn", variant: "self_declare_eligible" },
  { checkKey: "date_of_exit", status: "fail", variant: "waiting_period" },
  { checkKey: "bank_account", status: "fail", variant: "name_mismatch" },
  { checkKey: "bank_account", status: "fail", variant: "inactive" },
];
