// Real, non-cosmetic state for the fix -> recheck loop, carried entirely in
// URL searchParams (no cookies, no server-side store). Every route already
// threads state through searchParams into server components that call
// matchEngine.ts synchronously — this keeps that same shape rather than
// fighting it, and makes the whole loop directly Playwright-testable
// (navigate to a URL, assert on real rendered DOM).
import type { MemberProfile } from "@/types/member";

export interface ClaimOverrides {
  nameOverride?: string;
  dobOverride?: string;
  doeOverride?: string;
}

export function parseOverrides(
  searchParams: Record<string, string | undefined>,
): ClaimOverrides {
  const overrides: ClaimOverrides = {};
  if (searchParams.nameOverride) overrides.nameOverride = searchParams.nameOverride;
  if (searchParams.dobOverride) overrides.dobOverride = searchParams.dobOverride;
  if (searchParams.doeOverride) overrides.doeOverride = searchParams.doeOverride;
  return overrides;
}

// Confirming the Aadhaar date of birth writes it onto the EPFO (UAN) record;
// the Aadhaar value is the authority, so it is never overwritten.
//
// Confirming the Aadhaar name updates BOTH the UAN and bank records to
// match it — matchEngine's checkNameMatch compares Aadhaar against each
// independently, so a fix that only touched one would leave the check
// silently still failing. Returns a new object; matchEngine.ts and the
// underlying mock data are never mutated.
export function applyOverrides(
  member: MemberProfile,
  overrides: ClaimOverrides,
): MemberProfile {
  if (!overrides.nameOverride && !overrides.dobOverride && !overrides.doeOverride) {
    return member;
  }
  return {
    ...member,
    ...(overrides.nameOverride
      ? { uanName: overrides.nameOverride, bankName: overrides.nameOverride }
      : {}),
    ...(overrides.dobOverride ? { dobUan: overrides.dobOverride } : {}),
    ...(overrides.doeOverride
      ? { dateOfExit: overrides.doeOverride, exitDeclaredBy: "self" as const }
      : {}),
  };
}

export function buildClaimHref(
  path: string,
  params: { uan: string; reason?: string; overrides?: ClaimOverrides },
): string {
  const search = new URLSearchParams();
  search.set("uan", params.uan);
  if (params.reason) search.set("reason", params.reason);
  if (params.overrides?.nameOverride) search.set("nameOverride", params.overrides.nameOverride);
  if (params.overrides?.dobOverride) search.set("dobOverride", params.overrides.dobOverride);
  if (params.overrides?.doeOverride) search.set("doeOverride", params.overrides.doeOverride);
  return `${path}?${search.toString()}`;
}
