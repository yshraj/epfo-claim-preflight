export type CheckKey = "name_match" | "date_of_exit" | "bank_account";
export type CheckStatus = "warn" | "fail"; // "pass" never needs an explanation

// A small, deliberately coarse variant tag — NOT the member's name or any
// per-user data. This is what keeps the whole explanation space to ~7-9
// entries total, so it can be fully precomputed once and cached forever.
export type ExplainVariant =
  | "close" // name_match warn: small typo-level difference
  | "moderate" // name_match fail: partial match
  | "severe" // name_match fail: very different names
  | "self_declare_eligible" // date_of_exit warn
  | "waiting_period" // date_of_exit fail
  | "name_mismatch" // bank_account fail
  | "inactive"; // bank_account fail

export interface ExplainInput {
  checkKey: CheckKey;
  status: CheckStatus;
  variant: ExplainVariant;
}

export interface LlmProvider {
  name: "groq" | "openrouter" | "openai";
  isConfigured(): boolean;
  complete(prompt: string): Promise<string>;
}
