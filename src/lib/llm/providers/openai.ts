import type { LlmProvider } from "../types";
import { callChatCompletion } from "./openaiCompatible";

// Last resort — paid, off by default. Only use if Groq and OpenRouter's
// free tiers are both unavailable or unreliable during the demo.
export const openaiProvider: LlmProvider = {
  name: "openai",
  isConfigured: () => Boolean(process.env.OPENAI_API_KEY),
  complete: (prompt: string) =>
    callChatCompletion(prompt, {
      baseUrl: "https://api.openai.com/v1",
      apiKey: process.env.OPENAI_API_KEY ?? "",
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    }),
};
