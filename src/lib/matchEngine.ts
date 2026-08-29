// Real logic — not mocked. See docs/EPFO_Hackathon_Build_Plan.md section 6
// ("what's real vs mocked"). Aadhaar/UAN/bank record contents are synthetic;
// the comparison logic below runs for real against whatever record it's given.

import type { CheckResult, MemberProfile } from "@/types/member";
import { enT, type Translator } from "@/i18n";

// Every function takes a Translator, defaulting to English. The engine stays
// a pure function of (record, language) -> result: it holds no locale state
// and reads no cookie, so it remains directly unit-testable and callable from
// both server and client components.

/**
 * Normalized Levenshtein similarity, 0-100. Simple and dependency-free —
 * good enough to demonstrate real fuzzy matching without pulling in a library.
 */
function similarity(a: string, b: string): number {
  const s1 = a.trim().toUpperCase();
  const s2 = b.trim().toUpperCase();
  if (s1 === s2) return 100;

  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  const distance = costs[s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 100;
  return Math.round((1 - distance / maxLen) * 100);
}

export function checkNameMatch(member: MemberProfile, t: Translator = enT): CheckResult {
  const scoreUanVsAadhaar = similarity(member.aadhaarName, member.uanName);
  const scoreBankVsAadhaar = similarity(member.aadhaarName, member.bankName);
  const worstScore = Math.min(scoreUanVsAadhaar, scoreBankVsAadhaar);

  if (worstScore === 100) {
    return {
      key: "name_match",
      status: "pass",
      title: t("check.name.pass.title"),
      detail: t("check.name.pass.detail"),
      fixHint: "",
      score: worstScore,
    };
  }

  const isMinor = worstScore >= 80;
  const status = isMinor ? "warn" : "fail";
  const source =
    scoreUanVsAadhaar < scoreBankVsAadhaar ? t("source.epfo") : t("source.bank");
  const mismatchedName = scoreUanVsAadhaar < scoreBankVsAadhaar ? member.uanName : member.bankName;

  return {
    key: "name_match",
    status,
    title: isMinor ? t("check.name.warn.title") : t("check.name.fail.title"),
    detail: t("check.name.detail", {
      aadhaarName: member.aadhaarName,
      source,
      otherName: mismatchedName,
    }),
    fixHint: isMinor ? t("check.name.warn.fix") : t("check.name.fail.fix"),
    score: worstScore,
    variant: status === "warn" ? "close" : worstScore >= 60 ? "moderate" : "severe",
  };
}

// EPFO treats a date-of-birth difference differently from a name difference:
// it isn't a similarity score, it's a tolerance band. A DOB within 3 years of
// the Aadhaar record can be corrected online via a joint declaration with
// Aadhaar itself as the proof; beyond 3 years the member has to produce a
// separate documentary proof (birth/school certificate) and get it attested.
// That threshold is the whole reason this check is worth having — the fix
// path changes completely on either side of it.
const DOB_TOLERANCE_YEARS = 3;

function daysBetween(a: string, b: string): number | null {
  const t1 = Date.parse(a);
  const t2 = Date.parse(b);
  if (Number.isNaN(t1) || Number.isNaN(t2)) return null;
  return Math.round(Math.abs(t1 - t2) / 86_400_000);
}

// Calendar arithmetic, not days / 365 — a 3-year span always contains at
// least one leap day, so a day-count threshold would cut off roughly a day
// early and could label two identically-worded gaps differently.
function withinYears(a: string, b: string, years: number): boolean {
  const d1 = new Date(Date.parse(a));
  const d2 = new Date(Date.parse(b));
  const [earlier, later] = d1 <= d2 ? [d1, d2] : [d2, d1];
  const limit = new Date(earlier);
  limit.setFullYear(limit.getFullYear() + years);
  return later <= limit;
}

// Month names come from the Intl data for the active locale, so a Hindi
// reader sees "14 जून 1987" without any month names living in the dictionary.
function formatDob(iso: string, locale: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  return new Date(t).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Singular/plural are separate dictionary keys rather than an appended "s",
// which does not generalise past English.
function describeGap(days: number, t: Translator): string {
  if (days === 1) return t("duration.day.one");
  if (days < 45) return t("duration.day.other", { count: days });
  const years = Math.floor(days / 365);
  const months = Math.round((days % 365) / 30);
  const yearText = years === 1 ? t("duration.year.one") : t("duration.year.other", { count: years });
  const monthCount = Math.max(months, 1);
  const monthText =
    monthCount === 1 ? t("duration.month.one") : t("duration.month.other", { count: monthCount });
  if (years === 0) return monthText;
  if (months === 0) return yearText;
  return t("duration.yearMonth", { years: yearText, months: monthText });
}

export function checkDateOfBirth(
  member: MemberProfile,
  t: Translator = enT,
  locale = "en-IN",
): CheckResult {
  const gapDays = daysBetween(member.dobAadhaar, member.dobUan);

  // Unparseable dates are a data problem, not a member problem — say so
  // plainly rather than silently passing the check.
  if (gapDays === null) {
    return {
      key: "date_of_birth",
      status: "fail",
      title: t("check.dob.unreadable.title"),
      detail: t("check.dob.unreadable.detail", {
        aadhaarDob: member.dobAadhaar,
        uanDob: member.dobUan,
      }),
      fixHint: t("check.dob.unreadable.fix"),
      variant: "dob_major_drift",
    };
  }

  if (gapDays === 0) {
    return {
      key: "date_of_birth",
      status: "pass",
      title: t("check.dob.pass.title"),
      detail: t("check.dob.pass.detail", { date: formatDob(member.dobAadhaar, locale) }),
      fixHint: "",
    };
  }

  const detail = t("check.dob.detail", {
    aadhaarDob: formatDob(member.dobAadhaar, locale),
    uanDob: formatDob(member.dobUan, locale),
  });
  const withinTolerance = withinYears(
    member.dobAadhaar,
    member.dobUan,
    DOB_TOLERANCE_YEARS,
  );

  if (withinTolerance) {
    return {
      key: "date_of_birth",
      status: "warn",
      title: t("check.dob.diff.title", { gap: describeGap(gapDays, t) }),
      detail,
      fixHint: t("check.dob.minor.fix"),
      variant: "dob_minor_drift",
    };
  }

  return {
    key: "date_of_birth",
    status: "fail",
    title: t("check.dob.diff.title", { gap: describeGap(gapDays, t) }),
    detail,
    fixHint: t("check.dob.major.fix"),
    variant: "dob_major_drift",
  };
}

export function checkDateOfExit(
  member: MemberProfile,
  t: Translator = enT,
  locale = "en-IN",
): CheckResult {
  if (member.dateOfExit) {
    return {
      key: "date_of_exit",
      status: "pass",
      title: t("check.doe.pass.title"),
      detail: t("check.doe.pass.detail", {
        date: formatDob(member.dateOfExit, locale),
        declaredBy:
          member.exitDeclaredBy === "self" ? t("declaredBy.self") : t("declaredBy.employer"),
      }),
      fixHint: "",
    };
  }

  if (member.daysSinceLastContribution >= 60) {
    return {
      key: "date_of_exit",
      status: "warn",
      title: t("check.doe.warn.title"),
      detail: t("check.doe.warn.detail", { days: member.daysSinceLastContribution }),
      fixHint: t("check.doe.warn.fix"),
      variant: "self_declare_eligible",
    };
  }

  return {
    key: "date_of_exit",
    status: "fail",
    title: t("check.doe.fail.title"),
    detail: t("check.doe.fail.detail", { days: member.daysSinceLastContribution }),
    fixHint: t("check.doe.fail.fix"),
    variant: "waiting_period",
  };
}

export function checkBankAccount(member: MemberProfile, t: Translator = enT): CheckResult {
  if (member.bankAccountStatus === "active") {
    return {
      key: "bank_account",
      status: "pass",
      title: t("check.bank.pass.title"),
      detail: t("check.bank.pass.detail", { bankName: member.bankName }),
      fixHint: "",
    };
  }

  if (member.bankAccountStatus === "mismatched") {
    return {
      key: "bank_account",
      status: "fail",
      title: t("check.bank.mismatch.title"),
      detail: t("check.bank.mismatch.detail", {
        bankName: member.bankName,
        aadhaarName: member.aadhaarName,
      }),
      fixHint: t("check.bank.mismatch.fix"),
      variant: "name_mismatch",
    };
  }

  return {
    key: "bank_account",
    status: "fail",
    title: t("check.bank.inactive.title"),
    detail: t("check.bank.inactive.detail"),
    fixHint: t("check.bank.inactive.fix"),
    variant: "inactive",
  };
}

export function runPreflightChecks(
  member: MemberProfile,
  t: Translator = enT,
  locale = "en-IN",
): CheckResult[] {
  // Identity checks first (name, DOB), then the two record-state checks.
  return [
    checkNameMatch(member, t),
    checkDateOfBirth(member, t, locale),
    checkDateOfExit(member, t, locale),
    checkBankAccount(member, t),
  ];
}

export function overallReadiness(results: CheckResult[]): "ready" | "fixable" | "blocked" {
  if (results.every((r) => r.status === "pass")) return "ready";
  if (results.some((r) => r.status === "fail")) return "blocked";
  return "fixable";
}
