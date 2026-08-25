// Real EPFO service names and structure, sourced from
// docs/EPFO_Portal_Functionality_Map.md (a live audit of epfo.gov.in
// and the Member e-Sewa portal). Every entry here is a real EPFO
// service — nothing invented. Exactly one (isLiveJourney: true) links
// into this prototype's actual interactive flow; every other entry is
// pure informational content, never a form or fake submit button, so
// it can't be mistaken for a working feature.
export type ServiceAudience = "Employee" | "Employer" | "Pensioner" | "Cross-cutting";

export interface Service {
  slug: string;
  name: string;
  audience: ServiceAudience;
  whereItLives: string;
  summary: string;
  whyItMatters: string;
  honestNote?: string;
  isLiveJourney?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "withdraw-pf",
    name: "Withdraw PF",
    audience: "Employee",
    whereItLives: "Member e-Sewa (unifiedportal-mem.epfindia.gov.in)",
    summary: "Apply for partial or full withdrawal of your Provident Fund balance.",
    whyItMatters:
      "This is the one flow in this prototype that's fully real — a pre-flight check that catches the mismatches that cause EPFO to reject claims weeks later.",
    isLiveJourney: true,
  },
  {
    slug: "view-passbook",
    name: "View Passbook",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summary: "Real-time EPF account balance and full transaction history.",
    whyItMatters:
      "The passbook is often the first place a member notices something's wrong — a missing employer contribution, a gap in the timeline.",
  },
  {
    slug: "update-kyc",
    name: "Update KYC",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summary: "Update Aadhaar, PAN and bank account details linked to your UAN.",
    whyItMatters:
      "Name mismatches between these three records are the single most common reason PF claims get rejected — exactly what this prototype's pre-flight check catches.",
  },
  {
    slug: "know-your-uan",
    name: "Know Your UAN",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summary: "Retrieve your Universal Account Number using basic personal details.",
    whyItMatters: "Without your UAN, none of the other member services are reachable.",
  },
  {
    slug: "online-claims-transfer",
    name: "Online Claims & Transfer",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summary: "Submit claim requests or transfer your EPF balance between accounts.",
    whyItMatters: "Covers job changes where a member's PF needs to move to a new employer's account.",
  },
  {
    slug: "activate-uan",
    name: "Activate UAN",
    audience: "Employee",
    whereItLives: "UMANG app (Aadhaar Face Auth)",
    summary: "Activate a newly issued UAN so you can access EPF services online.",
    whyItMatters: "This determines whether a member can use any EPFO web service at all.",
    honestNote:
      "As of this research, EPFO discontinued this on the web portal entirely — it now redirects to the UMANG mobile app. Members without a smartphone have no stated web alternative.",
  },
  {
    slug: "file-death-claim",
    name: "File Death Claim",
    audience: "Employee",
    whereItLives: "Member e-Sewa",
    summary: "Filed by an eligible nominee to claim a deceased member's PF, pension and insurance dues.",
    whyItMatters: "Often the most time-pressured, highest-stakes interaction a family has with EPFO.",
  },
  {
    slug: "submit-ecr",
    name: "Submit ECR",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summary: "File the monthly Electronic Challan cum Return — contributions for every employee.",
    whyItMatters: "A late or incorrect ECR is one of the most common causes of a stuck employee claim.",
  },
  {
    slug: "uan-management",
    name: "UAN Management",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summary: "Centrally manage UANs for every employee at your organisation.",
    whyItMatters: "Keeps employee records synced so individual claims don't stall on missing data.",
  },
  {
    slug: "employee-exit-management",
    name: "Employee Exit Management",
    audience: "Employer",
    whereItLives: "Member e-Sewa (employer login)",
    summary: "Mark an employee's Date of Exit when they leave the organisation.",
    whyItMatters:
      "A missing exit date is exactly what this prototype's pre-flight check flags — real EPFO members can wait months for their former employer to file this.",
  },
  {
    slug: "employer-registration",
    name: "Employer Registration",
    audience: "Employer",
    whereItLives: "Shram Suvidha Portal (shramsuvidha.gov.in)",
    summary: "Register a new organisation under the EPF & MP Act, 1952.",
    whyItMatters: "The starting point for every employee's PF coverage at that organisation.",
  },
  {
    slug: "download-forms",
    name: "Download Forms & Circulars",
    audience: "Employer",
    whereItLives: "epfo.gov.in",
    summary: "Centralised access to official EPFO forms, notices and circulars.",
    whyItMatters: "Reference material for compliance teams handling multiple employee cases at once.",
  },
  {
    slug: "jeevan-pramaan",
    name: "Jeevan Pramaan (Life Certificate)",
    audience: "Pensioner",
    whereItLives: "jeevanpramaan.gov.in (cross-ministry, not EPFO-specific)",
    summary: "Submit a digital life certificate to keep pension payments active.",
    whyItMatters: "Missing this annually can pause a pensioner's payments entirely.",
    honestNote: "This isn't even an EPFO system — it's a separate, cross-ministry portal EPFO pensioners are routed to.",
  },
  {
    slug: "view-ppo-details",
    name: "View PPO Details",
    audience: "Pensioner",
    whereItLives: "Member e-Sewa / pension portal",
    summary: "View your Pension Payment Order — the record governing your monthly pension.",
    whyItMatters: "The reference document for any pension dispute or discrepancy.",
  },
  {
    slug: "pensioner-forms",
    name: "Pensioner Forms & Circulars",
    audience: "Pensioner",
    whereItLives: "epfo.gov.in",
    summary: "Forms and circulars specific to pension scheme members.",
    whyItMatters: "Reference material for pension-specific processes not covered by general EPF forms.",
  },
  {
    slug: "grievance-redressal",
    name: "Grievance Redressal (EPFiGMS)",
    audience: "Cross-cutting",
    whereItLives: "epfigms.gov.in (a separate NIC-built system, own OTP login)",
    summary: "File a complaint about any EPFO service — for members, pensioners, employers, or others.",
    whyItMatters: "EPFO's own FAQ names this as the only escalation path when a claim isn't settled within 20 days.",
    honestNote:
      "This is a genuinely separate system from the main member portal — a fourth login, not a tab inside the one you already have.",
  },
  {
    slug: "rti",
    name: "RTI",
    audience: "Cross-cutting",
    whereItLives: "epfo.gov.in",
    summary: "File a Right to Information request with EPFO.",
    whyItMatters: "A formal route to information EPFO doesn't otherwise publish or explain.",
  },
  {
    slug: "locate-office",
    name: "Locate EPFO Office",
    audience: "Cross-cutting",
    whereItLives: "epfo.gov.in directory",
    summary: "Find the regional EPFO office responsible for your account.",
    whyItMatters: "Some processes still require an in-person visit or a physically mailed form.",
  },
];
