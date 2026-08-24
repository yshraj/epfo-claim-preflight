// Shape of a mock member record. All data behind this type is synthetic —
// see docs/EPFO_Hackathon_Build_Plan.md section 3.
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
}

export type ClaimReason =
  | "medical"
  | "house"
  | "education"
  | "leaving_job"
  | "retirement";

export interface CheckResult {
  key: "name_match" | "date_of_exit" | "bank_account";
  status: "pass" | "warn" | "fail";
  title: string;
  detail: string;
  fixHint: string;
  score?: number; // 0-100, only for name_match
}
