import { test, expect } from "./fixtures";
import { MOCK_ACCOUNTS } from "@/data/mockAccounts";
import members from "@/data/mockMembers.json";
import { ALL_EXPLAIN_INPUTS } from "@/lib/llm/prompts";
import { cacheKey } from "@/lib/llm/localFallback";
import { localFallback } from "@/lib/llm/localFallback";
import cache from "@/data/explanationCache.json";

// These are pure data assertions — no browser needed. They exist because
// mockAccounts.ts is hand-maintained and its uniqueness constraints are
// implicit: SessionContext.login() resolves an account with a .find() over
// Object.values(), so a duplicated email or phone silently shadows whichever
// account sorts later, and the shadowed account becomes unreachable.

test.describe("mock data integrity", () => {
  test("every account has a unique email, phone and UAN", () => {
    const accounts = Object.values(MOCK_ACCOUNTS);

    for (const field of ["email", "phone", "uan"] as const) {
      const seen = new Map<string, string>();
      for (const acc of accounts) {
        const value = acc[field];
        const clash = seen.get(value);
        expect(
          clash,
          `${field} "${value}" is shared by accounts "${clash}" and "${acc.id}" — ` +
            `login() would resolve only one of them`,
        ).toBeUndefined();
        seen.set(value, acc.id);
      }
    }
  });

  test("every member profile has a unique id and UAN", () => {
    const ids = members.map((m) => m.id);
    const uans = members.map((m) => m.uan);
    expect(new Set(ids).size, `duplicate id in mockMembers.json: ${ids}`).toBe(ids.length);
    expect(new Set(uans).size, `duplicate uan in mockMembers.json: ${uans}`).toBe(uans.length);
  });

  test("every explanation variant is present in the precomputed cache", () => {
    // The deployed demo never makes a live LLM call — it reads this cache.
    // A new check variant with no cache entry degrades to generic fallback
    // text without any visible error, so assert the coverage explicitly.
    const staticCache = cache as Record<string, string>;
    for (const input of ALL_EXPLAIN_INPUTS) {
      const key = cacheKey(input);
      expect(staticCache[key], `missing explanationCache.json entry: ${key}`).toBeTruthy();
      expect(localFallback[key], `missing localFallback entry: ${key}`).toBeTruthy();
    }
  });
});
