import type { LlmProvider } from "../types";
import { callChatCompletion } from "./openaiCompatible";

// Secondary/fallback provider. Free tier is capped at 50 requests/day
// (or 1,000/day after a one-time $10 top-up) — fine as a backup, too
// tight to rely on during iterative development. Check
// https://openrouter.ai/models?max_price=0 for current :free model IDs;
// the free roster changes month to month.
export const openrouterProvider: LlmProvider = {
  name: "openrouter",
  isConfigured: () => Boolean(process.env.OPENROUTER_API_KEY),
  complete: (prompt: string) =>
    callChatCompletion(prompt, {
      baseUrl: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY ?? "",
      model: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b-instruct:free",
      extraHeaders: {
        "HTTP-Referer": "https://github.com/yshraj/epfo-claim-preflight",
        "X-Title": "EPFO Claim Pre-Flight (hackathon prototype)",
      },
    }),
};
