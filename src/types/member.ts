// Shape of a mock member record. All data behind this type is synthetic —
// see docs/EPFO_Hackathon_Build_Plan.md section 3.
export interface Activity {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: "claim" | "kyc" | "profile" | "bank" | "uan";
}

export interface EmploymentDetail {
  id: string;
  employer: string;
  startDate: string;
  endDate: string | "Present";
  status: "active" | "previous";
  pfBalance: number;
  isConsolidated?: boolean;
}

export interface MemberProfile {
  id: string;
  uan: string;
  aadhaarName: string;
  uanName: string;
  bankName: string;
  dobAadhaar: string;
  dobUan: string;
  bankAccountStatus: "active" | "mismatched" | "inactive";
  employer: string;
  dateOfExit: string | null;
  exitDeclaredBy: "employer" | "self" | null;
  daysSinceLastContribution: number;
  balance: {
    employee: number;
    employer: number;
    pension: number;
  };
  previousUans: string[];
  kycStatus: {
    aadhaar: "verified" | "pending";
    pan: "verified" | "pending";
    bank: "verified" | "pending";
  };
  scenarioLabel: string;
  recentActivities?: Activity[];
  employmentHistory?: EmploymentDetail[];
}

export type ClaimReason =
  | "medical"
  | "house"
  | "education"
  | "leaving_job"
  | "retirement";

// ─── Eligibility (src/lib/eligibilityEngine.ts) ───────────────────────────
// Categories follow the EPF Scheme, 2026 consolidation of the older
// 13-reason list. "final_settlement" is not one of the three partial
// categories — it's the separate full-withdrawal route (Form 19).
export type WithdrawalCategory =
  | "essential_needs"
  | "housing_needs"
  | "special_circumstances"
  | "final_settlement";

export interface EligibilityLine {
  label: string;
  /** Negative for amounts withheld, so the column sums to the payable total. */
  amount: number;
  note?: string;
}

export interface EligibilityResult {
  reason: ClaimReason;
  category: WithdrawalCategory;
  categoryLabel: string;
  /** Form numbers are resolved here so the member never has to pick one. */
  forms: string[];
  status: "eligible" | "partially_eligible" | "not_yet_eligible";
  withdrawableAmount: number;
  totalCorpus: number;
  /** The 25% held back; 0 at final settlement, when it is released. */
  minimumBalance: number;
  serviceMonths: number;
  serviceLabel: string;
  breakdown: EligibilityLine[];
  pension: {
    amount: number;
    withdrawable: boolean;
    note: string;
  };
  notes: string[];
  blockedReason?: string;
}

export interface CheckResult {
  key: "name_match" | "date_of_birth" | "date_of_exit" | "bank_account";
  status: "pass" | "warn" | "fail";
  title: string;
  detail: string;
  fixHint: string;
  score?: number; // 0-100, only for name_match
  // Coarse tag used to look up a cached plain-language explanation —
  // see src/lib/llm. Undefined for "pass" results, which never need one.
  variant?: import("@/lib/llm/types").ExplainVariant;
}
