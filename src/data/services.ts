// Real EPFO service names and structure, sourced from
// docs/EPFO_Portal_Functionality_Map.md (a live audit of epfo.gov.in
// and the Member e-Sewa portal). Every entry here is a real EPFO
// service — nothing invented. Exactly one (isLiveJourney: true) links
// into this prototype's actual interactive flow; every other entry is
// pure informational content, never a form or fake submit button, so
// it can't be mistaken for a working feature.
import type { TranslationKey } from "@/i18n";

export type ServiceAudience = "Employee" | "Employer" | "Pensioner" | "Cross-cutting";

// Prose lives in the dictionaries, not here, so the catalogue renders in the
// member's language. `whereItLives` stays a literal: "Member e-Sewa", "UMANG"
// and the bare domains are the names printed on the real portal, and
// translating them would make the destination harder to find.
export interface Service {
  slug: string;
  nameKey: TranslationKey;
  audience: ServiceAudience;
  whereItLives: string;
  summaryKey: TranslationKey;
  whyItMattersKey: TranslationKey;
  honestNoteKey?: TranslationKey;
  isLiveJourney?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "withdraw-pf",
    nameKey: "service.withdraw-pf.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa (unifiedportal-mem.epfindia.gov.in)",
    summaryKey: "service.withdraw-pf.summary",
    whyItMattersKey: "service.withdraw-pf.why",
    isLiveJourney: true,
  },
  {
    slug: "view-passbook",
    nameKey: "service.view-passbook.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summaryKey: "service.view-passbook.summary",
    whyItMattersKey: "service.view-passbook.why",
  },
  {
    slug: "update-kyc",
    nameKey: "service.update-kyc.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summaryKey: "service.update-kyc.summary",
    whyItMattersKey: "service.update-kyc.why",
  },
  {
    slug: "know-your-uan",
    nameKey: "service.know-your-uan.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summaryKey: "service.know-your-uan.summary",
    whyItMattersKey: "service.know-your-uan.why",
  },
  {
    slug: "online-claims-transfer",
    nameKey: "service.online-claims-transfer.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summaryKey: "service.online-claims-transfer.summary",
    whyItMattersKey: "service.online-claims-transfer.why",
  },
  {
    slug: "activate-uan",
    nameKey: "service.activate-uan.name",
    audience: "Employee",
    whereItLives: "UMANG app (Aadhaar Face Auth)",
    summaryKey: "service.activate-uan.summary",
    whyItMattersKey: "service.activate-uan.why",
    honestNoteKey: "service.activate-uan.note",
  },
  {
    slug: "file-death-claim",
    nameKey: "service.file-death-claim.name",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summaryKey: "service.file-death-claim.summary",
    whyItMattersKey: "service.file-death-claim.why",
  },
  {
    slug: "submit-ecr",
    nameKey: "service.submit-ecr.name",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summaryKey: "service.submit-ecr.summary",
    whyItMattersKey: "service.submit-ecr.why",
  },
  {
    slug: "uan-management",
    nameKey: "service.uan-management.name",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summaryKey: "service.uan-management.summary",
    whyItMattersKey: "service.uan-management.why",
  },
  {
    slug: "employee-exit-management",
    nameKey: "service.employee-exit-management.name",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summaryKey: "service.employee-exit-management.summary",
    whyItMattersKey: "service.employee-exit-management.why",
  },
  {
    slug: "employer-registration",
    nameKey: "service.employer-registration.name",
    audience: "Employer",
    whereItLives: "Shram Suvidha Portal (shramsuvidha.gov.in)",
    summaryKey: "service.employer-registration.summary",
    whyItMattersKey: "service.employer-registration.why",
  },
  {
    slug: "download-forms",
    nameKey: "service.download-forms.name",
    audience: "Employer",
    whereItLives: "epfo.gov.in",
    summaryKey: "service.download-forms.summary",
    whyItMattersKey: "service.download-forms.why",
  },
  {
    slug: "jeevan-pramaan",
    nameKey: "service.jeevan-pramaan.name",
    audience: "Pensioner",
    whereItLives: "jeevanpramaan.gov.in (cross-ministry, not EPFO-specific)",
    summaryKey: "service.jeevan-pramaan.summary",
    whyItMattersKey: "service.jeevan-pramaan.why",
    honestNoteKey: "service.jeevan-pramaan.note",
  },
  {
    slug: "view-ppo-details",
    nameKey: "service.view-ppo-details.name",
    audience: "Pensioner",
    whereItLives: "Member e-Sewa / pension portal",
    summaryKey: "service.view-ppo-details.summary",
    whyItMattersKey: "service.view-ppo-details.why",
  },
  {
    slug: "pensioner-forms",
    nameKey: "service.pensioner-forms.name",
    audience: "Pensioner",
    whereItLives: "epfo.gov.in",
    summaryKey: "service.pensioner-forms.summary",
    whyItMattersKey: "service.pensioner-forms.why",
  },
  {
    slug: "grievance-redressal",
    nameKey: "service.grievance-redressal.name",
    audience: "Cross-cutting",
    whereItLives: "epfigms.gov.in (a separate NIC-built system, own OTP login)",
    summaryKey: "service.grievance-redressal.summary",
    whyItMattersKey: "service.grievance-redressal.why",
    honestNoteKey: "service.grievance-redressal.note",
  },
  {
    slug: "rti",
    nameKey: "service.rti.name",
    audience: "Cross-cutting",
    whereItLives: "epfo.gov.in",
    summaryKey: "service.rti.summary",
    whyItMattersKey: "service.rti.why",
  },
  {
    slug: "locate-office",
    nameKey: "service.locate-office.name",
    audience: "Cross-cutting",
    whereItLives: "epfo.gov.in directory",
    summaryKey: "service.locate-office.summary",
    whyItMattersKey: "service.locate-office.why",
  },
];
