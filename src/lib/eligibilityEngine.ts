// Real logic — not mocked. Answers a different question from matchEngine.ts:
// that one asks "are your records consistent?", this one asks "what are you
// actually entitled to, and under which rule?". Kept separate on purpose —
// a record mismatch and an eligibility ceiling fail for unrelated reasons and
// are fixed in unrelated ways.
//
// ─── RULE SOURCE ──────────────────────────────────────────────────────────
// Encoded against the EPF Scheme, 2026 framework (announced 13 Oct 2025),
// which replaced the older 13-reason / wage-multiple model:
//   - 13 withdrawal reasons consolidated into 3 categories
//   - a uniform 12-month minimum membership for partial withdrawals
//   - a percentage-of-corpus ceiling (75%) rather than multiples of monthly
//     wages, with 25% locked until final settlement
// The pre-2026 ceilings (6x wages for illness, 24x/36x for housing, 50% of
// employee share after 7 years for education) are deliberately NOT used here.
//
// Every threshold below is a named constant so it can be re-sourced in one
// place. Verify against an EPFO circular before this is used for anything
// other than a prototype — see docs/EPFO_Redesign_Blueprint.md, which already
// carries two corrections from figures that turned out to be unverified.
// ──────────────────────────────────────────────────────────────────────────

import type {
  ClaimReason,
  EligibilityLine,
  EligibilityResult,
  MemberProfile,
  WithdrawalCategory,
} from "@/types/member";
import { enT, type Translator } from "@/i18n";

/** Share of the corpus locked until final settlement. */
const MINIMUM_BALANCE_RATE = 0.25;
/** Corollary of the above — the "Eligible Member Balance". */
const ELIGIBLE_BALANCE_RATE = 1 - MINIMUM_BALANCE_RATE;
/** Uniform minimum membership for any partial withdrawal. */
const MIN_SERVICE_MONTHS = 12;
/** Below this, EPS is withdrawable; at or above it a scheme certificate is issued instead. */
const PENSION_SCHEME_CERTIFICATE_YEARS = 10;
/** EPS withdrawal requires at least this much membership. */
const PENSION_MIN_SERVICE_DAYS = 180;
/** Unemployment required before a full final settlement (Form 19). */
const FINAL_SETTLEMENT_DAYS = 60;
/** Unemployment required before the 75% advance (Form 31). */
const UNEMPLOYMENT_ADVANCE_DAYS = 30;
/** Age at which a member may settle on the grounds of retirement. */
const RETIREMENT_MIN_AGE = 55;

/**
 * Age from the Aadhaar date of birth — the record EPFO treats as
 * authoritative, and the one checkDateOfBirth() in matchEngine.ts reconciles
 * everything else against. A wrong DOB therefore moves real money here, which
 * is the concrete reason that check exists.
 */
export function ageOf(member: MemberProfile, today = new Date()): number | null {
  const dob = Date.parse(member.dobAadhaar);
  if (Number.isNaN(dob)) return null;
  const d = new Date(dob);
  let age = today.getFullYear() - d.getFullYear();
  const monthDelta = today.getMonth() - d.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < d.getDate())) age -= 1;
  return age;
}

const CATEGORY_KEY = {
  essential_needs: "category.essential_needs",
  housing_needs: "category.housing_needs",
  special_circumstances: "category.special_circumstances",
  final_settlement: "category.final_settlement",
} as const;

const REASON_CATEGORY: Record<ClaimReason, WithdrawalCategory> = {
  medical: "essential_needs",
  education: "essential_needs",
  house: "housing_needs",
  leaving_job: "special_circumstances",
  retirement: "final_settlement",
};

function monthsBetween(start: string, end: string): number {
  const s = Date.parse(start);
  const e = Date.parse(end);
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 0;
  return Math.floor((e - s) / (86_400_000 * 30.44));
}

/**
 * Total EPF membership across every employment on record. Summed per period
 * rather than measured end-to-end, so a career break doesn't silently count
 * as contributing service.
 */
export function serviceMonthsOf(member: MemberProfile, today = new Date()): number {
  const history = member.employmentHistory ?? [];
  if (history.length === 0) return 0;
  const todayIso = today.toISOString().slice(0, 10);
  return history.reduce((total, period) => {
    const end = period.endDate === "Present" ? todayIso : period.endDate;
    return total + monthsBetween(period.startDate, end);
  }, 0);
}

function formatMonths(months: number, t: Translator): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const monthText =
    months === 1 ? t("duration.month.one") : t("duration.month.other", { count: months });
  const yearText =
    years === 1 ? t("duration.year.one") : t("duration.year.other", { count: years });
  const remText = rem === 1 ? t("duration.month.one") : t("duration.month.other", { count: rem });
  if (years === 0) return monthText;
  if (rem === 0) return yearText;
  return t("duration.yearMonth", { years: yearText, months: remText });
}

/**
 * Employees' Pension Scheme (EPS) sits outside the EPF corpus and follows its
 * own rule, so it is reported separately rather than folded into the total.
 */
function pensionOutcome(member: MemberProfile, serviceMonths: number, t: Translator) {
  const years = serviceMonths / 12;

  if (serviceMonths * 30.44 < PENSION_MIN_SERVICE_DAYS) {
    return {
      amount: 0,
      withdrawable: false,
      note: t("eligibility.pension.tooShort"),
    };
  }

  if (years >= PENSION_SCHEME_CERTIFICATE_YEARS) {
    return {
      amount: member.balance.pension,
      withdrawable: false,
      // The cliff nobody explains until after submission.
      note: t("eligibility.pension.certificate", { years: PENSION_SCHEME_CERTIFICATE_YEARS }),
    };
  }

  return {
    amount: member.balance.pension,
    withdrawable: true,
    note: t("eligibility.pension.withdrawable", { years: PENSION_SCHEME_CERTIFICATE_YEARS }),
  };
}

export function computeEligibility(
  member: MemberProfile,
  reason: ClaimReason,
  today = new Date(),
  t: Translator = enT,
): EligibilityResult {
  const corpus = member.balance.employee + member.balance.employer;
  const minimumBalance = Math.round(corpus * MINIMUM_BALANCE_RATE);
  const eligibleBalance = corpus - minimumBalance;
  const serviceMonths = serviceMonthsOf(member, today);
  const category = REASON_CATEGORY[reason];
  const pension = pensionOutcome(member, serviceMonths, t);
  const serviceLabel = formatMonths(serviceMonths, t);
  const notes: string[] = [];

  // ─── Retirement below the qualifying age ───
  // Settling "on retirement" before 55 isn't a thing; the member almost
  // always wants the job-exit route instead, so say so rather than just
  // refusing.
  const age = ageOf(member, today);
  if (reason === "retirement" && age !== null && age < RETIREMENT_MIN_AGE) {
    return {
      reason,
      category: "final_settlement",
      categoryLabel: t(CATEGORY_KEY.final_settlement),
      forms: [],
      status: "not_yet_eligible",
      withdrawableAmount: 0,
      totalCorpus: corpus,
      minimumBalance,
      serviceMonths,
      serviceLabel,
      breakdown: [],
      pension,
      blockedReason: t("eligibility.blocked.retirementAge", {
        minAge: RETIREMENT_MIN_AGE,
        age,
      }),
      notes: [
        member.dateOfExit
          ? t("eligibility.note.useLeavingJob")
          : t("eligibility.note.otherReasons"),
        pension.note,
      ],
    };
  }

  // ─── Final settlement: retirement, or a job exit past the waiting period ───
  const isFinalSettlement =
    reason === "retirement" ||
    (reason === "leaving_job" && member.daysSinceLastContribution >= FINAL_SETTLEMENT_DAYS);

  if (isFinalSettlement) {
    const breakdown: EligibilityLine[] = [
      { label: t("eligibility.line.employee"), amount: member.balance.employee },
      { label: t("eligibility.line.employer"), amount: member.balance.employer },
      {
        label: t("eligibility.line.released"),
        amount: 0,
        note: t("eligibility.line.released.note"),
      },
    ];

    if (reason === "leaving_job") {
      notes.push(
        t("eligibility.note.finalSettlementOpen", {
          days: member.daysSinceLastContribution,
          threshold: FINAL_SETTLEMENT_DAYS,
        }),
      );
    }
    notes.push(pension.note);

    return {
      reason,
      category: "final_settlement",
      categoryLabel: t(CATEGORY_KEY.final_settlement),
      forms: pension.withdrawable ? ["Form 19", "Form 10C"] : ["Form 19"],
      status: "eligible",
      withdrawableAmount: corpus + (pension.withdrawable ? pension.amount : 0),
      totalCorpus: corpus,
      minimumBalance: 0,
      serviceMonths,
      serviceLabel,
      breakdown,
      pension,
      notes,
    };
  }

  // ─── Job exit, still inside the 60-day window ───
  if (reason === "leaving_job") {
    const canTakeAdvance = member.daysSinceLastContribution >= UNEMPLOYMENT_ADVANCE_DAYS;

    if (!canTakeAdvance) {
      return {
        reason,
        category,
        categoryLabel: t(CATEGORY_KEY[category]),
        forms: [],
        status: "not_yet_eligible",
        withdrawableAmount: 0,
        totalCorpus: corpus,
        minimumBalance,
        serviceMonths,
        serviceLabel,
        breakdown: [],
        pension,
        blockedReason: t("eligibility.blocked.waiting", {
          advanceDays: UNEMPLOYMENT_ADVANCE_DAYS,
          days: member.daysSinceLastContribution,
          remaining: UNEMPLOYMENT_ADVANCE_DAYS - member.daysSinceLastContribution,
        }),
        notes: [
          t("eligibility.note.fullUnlocksAt", { days: FINAL_SETTLEMENT_DAYS }),
          pension.note,
        ],
      };
    }

    notes.push(
      t("eligibility.note.advanceOpen", {
        advanceDays: UNEMPLOYMENT_ADVANCE_DAYS,
        finalDays: FINAL_SETTLEMENT_DAYS,
        remaining: FINAL_SETTLEMENT_DAYS - member.daysSinceLastContribution,
      }),
    );
    notes.push(pension.note);

    return {
      reason,
      category,
      categoryLabel: t(CATEGORY_KEY[category]),
      forms: ["Form 31"],
      status: "partially_eligible",
      withdrawableAmount: eligibleBalance,
      totalCorpus: corpus,
      minimumBalance,
      serviceMonths,
      serviceLabel,
      breakdown: [
        { label: t("eligibility.line.employee"), amount: member.balance.employee },
        { label: t("eligibility.line.employer"), amount: member.balance.employer },
        {
          label: t("eligibility.line.retainedUntil"),
          amount: -minimumBalance,
          note: t("eligibility.line.retainedUntil.note"),
        },
      ],
      pension,
      notes,
    };
  }

  // ─── Partial withdrawal: medical, education, housing ───
  // The 12-month gate is waived for a member who has already left employment —
  // they aren't building service any more, so the gate can never be met.
  const hasLeftEmployment = member.dateOfExit !== null;
  const meetsService = serviceMonths >= MIN_SERVICE_MONTHS || hasLeftEmployment;

  if (!meetsService) {
    return {
      reason,
      category,
      categoryLabel: t(CATEGORY_KEY[category]),
      forms: [],
      status: "not_yet_eligible",
      withdrawableAmount: 0,
      totalCorpus: corpus,
      minimumBalance,
      serviceMonths,
      serviceLabel,
      breakdown: [],
      pension,
      blockedReason: t("eligibility.blocked.service", {
        months: MIN_SERVICE_MONTHS,
        actual: serviceLabel,
      }),
      notes: [pension.note],
    };
  }

  if (serviceMonths < MIN_SERVICE_MONTHS && hasLeftEmployment) {
    notes.push(t("eligibility.note.serviceWaived", { months: MIN_SERVICE_MONTHS }));
  }

  return {
    reason,
    category,
    categoryLabel: t(CATEGORY_KEY[category]),
    forms: ["Form 31"],
    status: "eligible",
    withdrawableAmount: eligibleBalance,
    totalCorpus: corpus,
    minimumBalance,
    serviceMonths,
    serviceLabel,
    breakdown: [
      { label: t("eligibility.line.employee"), amount: member.balance.employee },
      { label: t("eligibility.line.employer"), amount: member.balance.employer },
      {
        label: t("eligibility.line.retained"),
        amount: -minimumBalance,
        note: t("eligibility.line.retained.note"),
      },
    ],
    pension,
    notes,
  };
}

// Indian digit grouping (lakh/crore) is what "en-IN" and "hi-IN" both give,
// and Latin digits are standard on Indian financial documents even in Hindi
// text, so the numeral system deliberately does not change with the locale.
export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
