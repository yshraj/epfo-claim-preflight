// Real logic — not mocked. See docs/EPFO_Hackathon_Build_Plan.md section 6
// ("what's real vs mocked"). Aadhaar/UAN/bank record contents are synthetic;
// the comparison logic below runs for real against whatever record it's given.

import type { CheckResult, MemberProfile } from "@/types/member";

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

export function checkNameMatch(member: MemberProfile): CheckResult {
  const scoreUanVsAadhaar = similarity(member.aadhaarName, member.uanName);
  const scoreBankVsAadhaar = similarity(member.aadhaarName, member.bankName);
  const worstScore = Math.min(scoreUanVsAadhaar, scoreBankVsAadhaar);

  if (worstScore === 100) {
    return {
      key: "name_match",
      status: "pass",
      title: "Identity verified",
      detail: `Your name matches exactly across Aadhaar, EPFO, and bank records.`,
      fixHint: "",
      score: worstScore,
    };
  }

  const isMinor = worstScore >= 80;
  const status = isMinor ? "warn" : "fail";
  const source = scoreUanVsAadhaar < scoreBankVsAadhaar ? "EPFO" : "Bank";
  const mismatchedName = scoreUanVsAadhaar < scoreBankVsAadhaar ? member.uanName : member.bankName;

  return {
    key: "name_match",
    status,
    title: isMinor ? "Minor name variation detected" : "Significant name difference detected",
    detail: `Aadhaar: ${member.aadhaarName} | ${source}: ${mismatchedName}`,
    fixHint:
      isMinor
        ? "Recommended: Fixing this before submission may help avoid a preventable rejection."
        : "Action required: This difference requires correction before your claim can be processed.",
    score: worstScore,
    variant: status === "warn" ? "close" : worstScore >= 60 ? "moderate" : "severe",
  };
}

export function checkDateOfExit(member: MemberProfile): CheckResult {
  if (member.dateOfExit) {
    return {
      key: "date_of_exit",
      status: "pass",
      title: "Date of Exit is on record",
      detail: `Exit recorded on ${member.dateOfExit}, declared by ${member.exitDeclaredBy}.`,
      fixHint: "",
    };
  }

  if (member.daysSinceLastContribution >= 60) {
    return {
      key: "date_of_exit",
      status: "warn",
      title: "Date of Exit missing, but you're eligible to self-declare",
      detail: `Your employer hasn't marked an exit date, but it's been ${member.daysSinceLastContribution} days since your last contribution — past the 60-day threshold.`,
      fixHint: "You can self-declare your exit date now instead of waiting on your employer.",
      variant: "self_declare_eligible",
    };
  }

  return {
    key: "date_of_exit",
    status: "fail",
    title: "Date of Exit missing",
    detail: `Your employer hasn't marked an exit date yet, and only ${member.daysSinceLastContribution} days have passed since your last contribution (60 required to self-declare).`,
    fixHint: "We'll notify your employer with a 7-day reminder. Self-declaration unlocks after day 60.",
    variant: "waiting_period",
  };
}

export function checkBankAccount(member: MemberProfile): CheckResult {
  if (member.bankAccountStatus === "active") {
    return {
      key: "bank_account",
      status: "pass",
      title: "Bank account verified",
      detail: `Instant check confirmed "${member.bankName}" is active and matches your KYC name.`,
      fixHint: "",
    };
  }

  if (member.bankAccountStatus === "mismatched") {
    return {
      key: "bank_account",
      status: "fail",
      title: "Bank account name mismatch",
      detail: `The name on the bank account ("${member.bankName}") doesn't match your Aadhaar name ("${member.aadhaarName}").`,
      fixHint: "Update your bank KYC, or add a joint declaration linking the two names.",
      variant: "name_mismatch",
    };
  }

  return {
    key: "bank_account",
    status: "fail",
    title: "Bank account inactive",
    detail: "The instant check could not verify an active account.",
    fixHint: "Add or update your bank account details in KYC before continuing.",
    variant: "inactive",
  };
}

export function runPreflightChecks(member: MemberProfile): CheckResult[] {
  return [checkNameMatch(member), checkDateOfExit(member), checkBankAccount(member)];
}

export function overallReadiness(results: CheckResult[]): "ready" | "fixable" | "blocked" {
  if (results.every((r) => r.status === "pass")) return "ready";
  if (results.some((r) => r.status === "fail")) return "blocked";
  return "fixable";
}
