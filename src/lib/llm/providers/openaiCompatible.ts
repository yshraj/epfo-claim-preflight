// Shared client for any OpenAI-compatible chat completions endpoint
// (Groq, OpenRouter, and OpenAI itself all speak this format). Plain
// fetch, no SDK dependency — keeps the bundle and the dependency
// surface small.

interface CallOptions {
  baseUrl: string;
  apiKey: string;
  model: string;
  extraHeaders?: Record<string, string>;
}

export async function callChatCompletion(
  prompt: string,
  { baseUrl, apiKey, model, extraHeaders }: CallOptions,
): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You explain EPFO (Indian PF) claim-rejection reasons in one short, calm, plain-English sentence for a non-technical citizen. No jargon, no form numbers, no legal language. Maximum 25 words.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 60,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`LLM call failed: ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("LLM call returned no content");
  return text;
}
