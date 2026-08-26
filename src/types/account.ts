export type KYCStatus = "verified" | "pending" | "mismatched" | "missing";
export type AccountStatus = "active" | "previous";

export interface PFBalance {
  employee: number;
  employer: number;
  pension: number;
}

export interface EmploymentRecord {
  id: string; // The PF Account number or UAN for that specific employment
  employer: string;
  startDate: string;
  endDate: string | "Present";
  status: AccountStatus;
  pfBalance: number;
  isConsolidated: boolean;
}

export interface ActivityRecord {
  id: string;
  date: string;
  title: string;
  type: "claim" | "bank" | "kyc" | "profile" | "document" | "security";
  description?: string;
}

export interface NotificationRecord {
  id: string;
  date: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  source: "digilocker" | "upload" | "employer";
  status: "available" | "needs_attention" | "processing";
  dateAdded: string;
}

export interface ClaimRecord {
  id: string;
  type: string;
  dateSubmitted: string;
  status: "processing" | "approved" | "rejected" | "pending_clarification";
  amount?: number;
  // Shown on the status timeline for "rejected" / "pending_clarification" —
  // explains what happened / what EPFO is waiting on, instead of a generic message.
  note?: string;
}

export interface MockAccount {
  id: string;
  email: string;
  phone: string;
  passwordHash: string; // We'll just mock this
  fixedOtp: string;

  uan: string;
  aadhaarName: string;
  uanName: string;
  bankName: string;
  dobAadhaar: string;
  dobUan: string;
  
  bankAccountStatus: KYCStatus | "active";
  employer: string;
  dateOfExit: string | null;
  exitDeclaredBy: "employer" | "employee" | null;
  daysSinceLastContribution: number;
  
  balance: PFBalance;
  previousUans: string[];
  
  kycStatus: {
    aadhaar: KYCStatus;
    pan: KYCStatus;
    bank: KYCStatus;
  };
  
  digiLockerConnected: boolean;
  digiLockerSyncDate?: string;

  scenarioLabel: string;
  
  recentActivities: ActivityRecord[];
  employmentHistory: EmploymentRecord[];
  notifications: NotificationRecord[];
  documents: DocumentRecord[];
  claims: ClaimRecord[];
}
