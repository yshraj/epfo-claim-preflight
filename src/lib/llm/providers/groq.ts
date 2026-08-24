import type { LlmProvider } from "../types";
import { callChatCompletion } from "./openaiCompatible";

// Recommended default — free tier is 14,400 requests/day, no card
// required. See docs/EPFO_Hackathon_Build_Plan.md for the comparison
// against OpenRouter's 50/day free cap.
export const groqProvider: LlmProvider = {
  name: "groq",
  isConfigured: () => Boolean(process.env.GROQ_API_KEY),
  complete: (prompt: string) =>
    callChatCompletion(prompt, {
      baseUrl: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY ?? "",
      model: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
    }),
};
