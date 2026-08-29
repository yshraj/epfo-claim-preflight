// English is the source of truth: every other dictionary is typed as
// Record<keyof typeof en, string>, so `tsc` fails if a translation is missing.
// Placeholders are {braced} and are interpolated by src/i18n/index.ts.

export const en = {
  // ─── Durations & plurals ────────────────────────────────────────────────
  // Kept as separate keys rather than built with string concatenation,
  // because plural rules and word order differ between languages.
  "duration.day.one": "1 day",
  "duration.day.other": "{count} days",
  "duration.month.one": "1 month",
  "duration.month.other": "{count} months",
  "duration.year.one": "1 year",
  "duration.year.other": "{count} years",
  "duration.yearMonth": "{years}, {months}",

  // ─── Check: name match ──────────────────────────────────────────────────
  "check.name.pass.title": "Identity verified",
  "check.name.pass.detail":
    "Your name matches exactly across Aadhaar, EPFO, and bank records.",
  "check.name.warn.title": "Minor name variation detected",
  "check.name.fail.title": "Significant name difference detected",
  "check.name.detail": "Aadhaar: {aadhaarName} | {source}: {otherName}",
  "check.name.warn.fix":
    "Recommended: Fixing this before submission may help avoid a preventable rejection.",
  "check.name.fail.fix":
    "Action required: This difference requires correction before your claim can be processed.",
  "source.epfo": "EPFO",
  "source.bank": "Bank",

  // ─── Check: date of birth ───────────────────────────────────────────────
  "check.dob.pass.title": "Date of birth matches",
  "check.dob.pass.detail":
    "Your date of birth is identical on Aadhaar and EPFO records ({date}).",
  "check.dob.diff.title": "Date of birth differs by {gap}",
  "check.dob.detail": "Aadhaar: {aadhaarDob} | EPFO: {uanDob}",
  "check.dob.minor.fix":
    "Recommended: This is inside the 3-year limit, so your Aadhaar date can be accepted as proof — no extra documents needed.",
  "check.dob.major.fix":
    "Action required: A gap this large is beyond the 3-year limit, so Aadhaar alone won't settle it — you'll need a birth or school certificate attested by your employer.",
  "check.dob.unreadable.title": "Date of birth could not be read",
  "check.dob.unreadable.detail":
    "One of the records holds an unreadable date (Aadhaar: {aadhaarDob}, EPFO: {uanDob}).",
  "check.dob.unreadable.fix":
    "Action required: Contact your EPFO field office to have this record corrected.",

  // ─── Check: date of exit ────────────────────────────────────────────────
  "check.doe.pass.title": "Date of Exit is on record",
  "check.doe.pass.detail": "Exit recorded on {date}, declared by {declaredBy}.",
  "check.doe.warn.title": "Date of Exit missing, but you're eligible to self-declare",
  "check.doe.warn.detail":
    "Your employer hasn't marked an exit date, but it's been {days} days since your last contribution — past the 60-day threshold.",
  "check.doe.warn.fix":
    "You can self-declare your exit date now instead of waiting on your employer.",
  "check.doe.fail.title": "Date of Exit missing",
  "check.doe.fail.detail":
    "Your employer hasn't marked an exit date yet, and only {days} days have passed since your last contribution (60 required to self-declare).",
  "check.doe.fail.fix":
    "We'll notify your employer with a 7-day reminder. Self-declaration unlocks after day 60.",
  "declaredBy.employer": "your employer",
  "declaredBy.self": "you",

  // ─── Check: bank account ────────────────────────────────────────────────
  "check.bank.pass.title": "Bank account verified",
  "check.bank.pass.detail":
    "Instant check confirmed “{bankName}” is active and matches your KYC name.",
  "check.bank.mismatch.title": "Bank account name mismatch",
  "check.bank.mismatch.detail":
    "The name on the bank account (“{bankName}”) doesn't match your Aadhaar name (“{aadhaarName}”).",
  "check.bank.mismatch.fix":
    "Update your bank KYC, or add a joint declaration linking the two names.",
  "check.bank.inactive.title": "Bank account inactive",
  "check.bank.inactive.detail": "The instant check could not verify an active account.",
  "check.bank.inactive.fix":
    "Add or update your bank account details in KYC before continuing.",

  // ─── Eligibility: categories & reasons ──────────────────────────────────
  "category.essential_needs": "Essential Needs",
  "category.housing_needs": "Housing Needs",
  "category.special_circumstances": "Special Circumstances",
  "category.final_settlement": "Final Settlement",
  "reason.medical": "a medical emergency",
  "reason.house": "buying or building a house",
  "reason.education": "education",
  "reason.leaving_job": "leaving your job",
  "reason.retirement": "retirement",

  // ─── Eligibility: breakdown lines ───────────────────────────────────────
  "eligibility.line.employee": "Your contribution",
  "eligibility.line.employer": "Employer contribution",
  "eligibility.line.released": "Locked 25% released",
  "eligibility.line.released.note":
    "At final settlement the retained balance is released too.",
  "eligibility.line.retained": "Retained in your account",
  "eligibility.line.retained.note":
    "25% stays put and keeps earning interest — it's released in full when you finally settle.",
  "eligibility.line.retainedUntil": "Retained until final settlement",
  "eligibility.line.retainedUntil.note":
    "25% stays in your account and keeps earning interest.",

  // ─── Eligibility: pension (EPS) ─────────────────────────────────────────
  "eligibility.pension.tooShort":
    "Pension contributions need at least 6 months of membership before they can be withdrawn.",
  "eligibility.pension.certificate":
    "You've crossed {years} years of service, so your pension can't be withdrawn as cash. You get a scheme certificate instead, which carries this service to your next job and pays a monthly pension later.",
  "eligibility.pension.withdrawable":
    "Under {years} years of service, so your pension amount can be withdrawn along with your PF.",

  // ─── Eligibility: notes & blocks ────────────────────────────────────────
  "eligibility.note.finalSettlementOpen":
    "You've been out of work {days} days — past the {threshold}-day mark, so you can claim the full amount rather than an advance.",
  "eligibility.note.advanceOpen":
    "After {advanceDays} days you can take up to 75% as an advance. The rest unlocks at {finalDays} days — that's {remaining} days away.",
  "eligibility.note.fullUnlocksAt": "The full amount unlocks at {days} days.",
  "eligibility.note.serviceWaived":
    "You have under {months} months of membership, but since you've left employment you can still claim your eligible balance.",
  "eligibility.blocked.waiting":
    "You can withdraw after {advanceDays} days without a contribution. It's been {days} — about {remaining} more days.",
  "eligibility.blocked.service":
    "Partial withdrawals need {months} months of PF membership. You have {actual}.",
  "eligibility.blocked.retirementAge":
    "Retirement settlement starts at age {minAge}. Your records put you at {age}.",
  "eligibility.note.useLeavingJob":
    "If you've left this job, choose “Leaving my job” instead — that route is open to you now.",
  "eligibility.note.otherReasons":
    "If you need money before then, one of the other reasons will likely fit.",
  // ─── Claim journey: shared ──────────────────────────────────────────────
  "claim.reason.title": "Why do you need money?",
  "claim.reason.subtitle": "We'll work out the right form and eligible amount for you.",
  "claim.reason.medical": "Medical emergency",
  "claim.reason.house": "Buying / building a house",
  "claim.reason.education": "Education",
  "claim.reason.leaving_job": "Leaving my job",
  "claim.reason.retirement": "Retirement",

  "claim.preflight.title": "Before you submit",
  "claim.preflight.subtitle": "We'll check the information most likely to delay your claim.",
  "claim.preflight.rechecking": "Re-checking your information...",
  "claim.preflight.whyLabel": "Why are you seeing this?",
  "claim.preflight.selfDeclare": "Self-declare exit date now",
  "claim.preflight.useAadhaarDob": "Use my Aadhaar date of birth",
  "claim.preflight.ready.title": "You're ready to submit.",
  "claim.preflight.ready.body": "All pre-flight checks passed successfully.",
  "claim.preflight.fixCta": "Fix the issue and continue",
  "claim.preflight.blocked.generic":
    "This claim can't be submitted yet — resolve the issue(s) above first. In a full build, each remaining fail state routes to its own guided fix (e.g. bank KYC update).",
  "claim.preflight.blocked.doe":
    "This claim can't be submitted yet — your employer needs to confirm your exit date, or check back once 60 days have passed to self-declare it.",
  "claim.preflight.ineligible.title": "Your records are in order.",
  "claim.preflight.ineligible.body":
    "This claim just isn't open to you yet — see the reason above. Nothing to fix, and nothing lost by coming back later.",

  "claim.fix.title": "Fix name mismatch",
  "claim.fix.subtitle":
    "We noticed a small difference in your name. This may prevent your claim from being processed.",
  "claim.fix.nothing": "Nothing to fix here — you're good to go.",
  "claim.fix.back": "Back to pre-flight check",
  "claim.fix.current": "Current",
  "claim.fix.recommended": "Recommended",
  "claim.fix.matchesAadhaar": "Matches your verified Aadhaar",
  "claim.fix.apply": "Apply correction",
  "claim.fix.applying": "Applying correction…",
  "claim.fix.note":
    "This updates your UAN and bank records to match your Aadhaar name, then re-runs the checks.",

  // ─── Eligibility panel ──────────────────────────────────────────────────
  "eligibility.panel.aria": "Eligibility for {reason}",
  "eligibility.panel.canWithdraw": "You can withdraw",
  "eligibility.panel.notYet": "Not available yet",
  "eligibility.panel.category": "Category",
  "eligibility.panel.service": "{service} of service",
  "eligibility.panel.payable": "Payable to you",
  "eligibility.panel.retained":
    "{amount} stays in your account — it's released in full when you make a final settlement.",
  "eligibility.panel.pension": "Pension ({amount}):",
  "eligibility.panel.forms": "Filed for you as {forms} — you don't need to pick a form.",

  // ─── Language ───────────────────────────────────────────────────────────
  "language.label": "Language",
  // ─── Global chrome ──────────────────────────────────────────────────────
  "brand.name": "Claim Pre-Flight",
  "brand.badge": "Prototype · Demo Data",
  "banner.disclaimer":
    "Independent hackathon prototype — not affiliated with or endorsed by EPFO. All data on this site is simulated.",
  "footer.blurb":
    "Independent hackathon prototype. Not affiliated with or endorsed by EPFO. All data is simulated.",
  "footer.officialSite": "Official EPFO site ↗",

  "nav.howItWorks": "How it works",
  "nav.services": "Services",
  "nav.dashboard": "Dashboard",
  "nav.checkMyClaim": "Check my claim",
  "nav.login": "Log in",
  "nav.menu": "Menu",

  "user.profileSettings": "Profile Settings",
  "user.documentCenter": "Document Center",
  "user.myClaims": "My Claims",
  "user.security": "Security",
  "user.demoScenarios": "Demo scenarios",
  "user.logout": "Log out",
  "user.logout.title": "Log out of EPF Account?",
  "user.logout.body":
    "Are you sure you want to log out? You will need to authenticate again to access your claims and documents.",
  "common.cancel": "Cancel",
  "common.uan": "UAN",

  // ─── Claim type ─────────────────────────────────────────────────────────
  "claim.type.title": "What would you like to do?",
  "claim.type.subtitle": "Select a service to continue.",
  "claim.type.withdraw.title": "Withdraw PF",
  "claim.type.withdraw.desc": "Apply for full or partial withdrawal (Forms 19, 31, 10C)",
  "claim.type.transfer.title": "Transfer PF",
  "claim.type.transfer.desc":
    "Move your PF balance from a previous employer to your current one",
  "claim.type.status.title": "Check claim status",
  "claim.type.status.desc": "Track an existing application",
  "claim.type.notInPrototype": "Not in prototype",

  "claim.submit": "Submit claim",
  "claim.submitting": "Submitting...",
  // ─── Claim status ───────────────────────────────────────────────────────
  "status.title": "Claim submitted",
  "status.reference": "Reference",
  "status.submitted": "Submitted",
  "status.status": "Status",
  "status.processing": "Processing",
  "status.syntheticRef":
    "Synthetic reference number for this prototype — no real claim was filed.",
  "status.timeline.title": "Status timeline",
  "status.stage.submitted": "Claim submitted",
  "status.stage.verified": "Documents verified",
  "status.stage.regional": "Regional processing",
  "status.stage.approved": "Settlement approved",
  "status.stage.credited": "Amount credited",
  "status.stage.rejected": "Claim rejected",
  "status.stage.awaitingYou": "Awaiting your response",
  "status.stage.inProgress": "In progress",
  "status.next.title": "What happens next?",
  "status.next.rejected":
    "Your claim was rejected. Review the reason and resubmit once corrected.",
  "status.next.clarification":
    "EPFO needs more information before this claim can proceed.",
  "status.next.processing":
    "Your claim is currently with the regional processing team. No action is required from you right now. We will notify you once the settlement is approved.",

  // ─── Grievance escalation ───────────────────────────────────────────────
  "grievance.delayed.title": "This claim is taking longer than expected.",
  "grievance.delayed.body":
    "If your claim has been pending longer than 20 days, you can escalate it. We'll require a short explanation and any supporting documents.",
  "grievance.request": "Request assistance",
  "grievance.willInclude": "We'll automatically include:",
  "grievance.include.number": "Claim number ({reference})",
  "grievance.include.type": "Claim type",
  "grievance.include.date": "Submission date",
  "grievance.include.status": "Current status",
  "grievance.cantWait": "Can't wait? File a grievance",
  "grievance.reason.delay": "Claim processing delay",
  "grievance.message.label": "Additional message (optional)",
  "grievance.message.placeholder": "Provide any additional context...",
  "grievance.review": "Review request",
  "grievance.edit": "Edit",
  "grievance.submit": "Submit escalation",
  "grievance.submitting": "Submitting...",
  "grievance.field.claim": "Claim:",
  "grievance.field.reason": "Reason:",
  "grievance.field.message": "Message:",
  "grievance.reason.processingDelay": "Processing delay",
  "grievance.success.title": "Request recorded",
  "grievance.success.body":
    "We've attached your claim details to this request and routed it to the regional office.",
  "grievance.success.reference": "Reference: {reference}",
  "grievance.success.simulated": "This is a simulated prototype submission.",
  // ─── Marketing ──────────────────────────────────────────────────────────
  "marketing.disclaimer.label": "Hackathon Prototype:",
  "marketing.disclaimer.body":
    "This is a conceptual build for demonstrating the Claim Pre-Flight capability. Identity validation uses deterministic logic, but all user profiles, UAN activation, and grievance flows are mocked using synthetic data.",

  "hero.title": "Claim Pre-Flight.",
  "hero.subtitle": "A guided EPFO experience that catches problems before submission.",
  "hero.body":
    "Government benefits shouldn't require citizens to decode rejection messages three weeks later. Fix issues interactively and submit with confidence.",
  "hero.seeHow": "See how it works",
  "hero.card.title": "Claim Readiness",
  "hero.card.identity": "Identity",
  "hero.card.kyc": "KYC",
  "hero.card.nameConsistency": "Name consistency",
  "hero.card.bank": "Bank",
  "hero.card.employment": "Employment",
  "hero.card.verified": "Verified",
  "hero.card.active": "Active",
  "hero.card.mismatch": "Mismatch",

  "howItWorks.title": "How it works",
  "howItWorks.step1.title": "Log in & tell us why",
  "howItWorks.step1.detail":
    "Pick a reason — medical, house, education — and we work out the right form and the exact amount you're eligible for.",
  "howItWorks.step2.title": "We run 4 real checks",
  "howItWorks.step2.detail":
    "Name, date of birth, exit date and bank account — cross-referenced before you submit anything.",
  "howItWorks.step3.title": "Fix, then submit with confidence",
  "howItWorks.step3.detail":
    "Correct what's wrong in place, watch the check re-run for real, and submit knowing it'll go through.",

  "proof.quote":
    "On EPFO's own homepage, the answer to “what if my claim isn't settled in 20 days” is:",
  "proof.quote.highlight": "file a grievance.",
  "proof.body":
    "Not a status update. Not an explanation. A separate complaint, on a separate system, about a claim that already went silent.",
  "proof.stat.members": "EPF members in India",
  "proof.stat.rejected": "of claims historically rejected",
  "proof.stat.rejected.note": "secondary sources, not EPFO-verified",
  "proof.stat.records": "records cross-checked here",
  "proof.stat.logins": "separate EPFO logins today",

  "marketing.scopeNote":
    "EPFO isn't just withdrawals. This prototype goes deep on one flow, but handles the full scope.",
  "marketing.exploreServices": "Explore all 20+ EPFO services",

  "closing.title": "You knew about the problem before EPFO did.",
  "closing.body": "That's the whole idea. Check your claim before you submit it.",
  // ─── Services ───────────────────────────────────────────────────────────
  // whereItLives is deliberately NOT translated — "Member e-Sewa", "UMANG",
  // "Shram Suvidha Portal" and the bare domains are the literal names a
  // member sees on the real site, so translating them would make the
  // destination harder to find, not easier.
  "audience.Employee": "Employee",
  "audience.Employer": "Employer",
  "audience.Pensioner": "Pensioner",
  "audience.Cross-cutting": "Cross-cutting",
  "services.title": "EPFO services",
  "services.intro":
    "This is a real directory of what EPFO actually offers — sourced from a live audit of the real portal, not invented categories. Only “Withdraw PF” is a working journey in this prototype; everything else here is honest, informational content, not a hidden feature.",
  "services.liveInPrototype": "Live in this prototype",
  "services.goToDashboard": "Go to dashboard",
  "services.learnMore": "Learn more",
  "services.all": "All services",
  "services.backToAll": "Back to all services",
  "services.whereItLives": "Where this lives on the real EPFO site: ",
  "services.whyItMatters": "Why it matters: ",
  "services.informationalOnly":
    "Informational only — no real EPFO system is connected in this prototype. This page can't submit anything.",
  "service.withdraw-pf.name": "Withdraw PF",
  "service.withdraw-pf.summary": "Apply for partial or full withdrawal of your Provident Fund balance.",
  "service.withdraw-pf.why": "This is the one flow in this prototype that's fully real — a pre-flight check that catches the mismatches that cause EPFO to reject claims weeks later.",
  "service.view-passbook.name": "View Passbook",
  "service.view-passbook.summary": "Real-time EPF account balance and full transaction history.",
  "service.view-passbook.why": "The passbook is often the first place a member notices something's wrong — a missing employer contribution, a gap in the timeline.",
  "service.update-kyc.name": "Update KYC",
  "service.update-kyc.summary": "Update Aadhaar, PAN and bank account details linked to your UAN.",
  "service.update-kyc.why": "Name mismatches between these three records are the single most common reason PF claims get rejected — exactly what this prototype's pre-flight check catches.",
  "service.know-your-uan.name": "Know Your UAN",
  "service.know-your-uan.summary": "Retrieve your Universal Account Number using basic personal details.",
  "service.know-your-uan.why": "Without your UAN, none of the other member services are reachable.",
  "service.online-claims-transfer.name": "Online Claims & Transfer",
  "service.online-claims-transfer.summary": "Submit claim requests or transfer your EPF balance between accounts.",
  "service.online-claims-transfer.why": "Covers job changes where a member's PF needs to move to a new employer's account.",
  "service.activate-uan.name": "Activate UAN",
  "service.activate-uan.summary": "Activate a newly issued UAN so you can access EPF services online.",
  "service.activate-uan.why": "This determines whether a member can use any EPFO web service at all.",
  "service.activate-uan.note": "As of this research, EPFO discontinued this on the web portal entirely — it now redirects to the UMANG mobile app. Members without a smartphone have no stated web alternative.",
  "service.file-death-claim.name": "File Death Claim",
  "service.file-death-claim.summary": "Filed by an eligible nominee to claim a deceased member's PF, pension and insurance dues.",
  "service.file-death-claim.why": "Often the most time-pressured, highest-stakes interaction a family has with EPFO.",
  "service.submit-ecr.name": "Submit ECR",
  "service.submit-ecr.summary": "File the monthly Electronic Challan cum Return — contributions for every employee.",
  "service.submit-ecr.why": "A late or incorrect ECR is one of the most common causes of a stuck employee claim.",
  "service.uan-management.name": "UAN Management",
  "service.uan-management.summary": "Centrally manage UANs for every employee at your organisation.",
  "service.uan-management.why": "Keeps employee records synced so individual claims don't stall on missing data.",
  "service.employee-exit-management.name": "Employee Exit Management",
  "service.employee-exit-management.summary": "Mark an employee's Date of Exit when they leave the organisation.",
  "service.employee-exit-management.why": "A missing exit date is exactly what this prototype's pre-flight check flags — real EPFO members can wait months for their former employer to file this.",
  "service.employer-registration.name": "Employer Registration",
  "service.employer-registration.summary": "Register a new organisation under the EPF & MP Act, 1952.",
  "service.employer-registration.why": "The starting point for every employee's PF coverage at that organisation.",
  "service.download-forms.name": "Download Forms & Circulars",
  "service.download-forms.summary": "Centralised access to official EPFO forms, notices and circulars.",
  "service.download-forms.why": "Reference material for compliance teams handling multiple employee cases at once.",
  "service.jeevan-pramaan.name": "Jeevan Pramaan (Life Certificate)",
  "service.jeevan-pramaan.summary": "Submit a digital life certificate to keep pension payments active.",
  "service.jeevan-pramaan.why": "Missing this annually can pause a pensioner's payments entirely.",
  "service.jeevan-pramaan.note": "This isn't even an EPFO system — it's a separate, cross-ministry portal EPFO pensioners are routed to.",
  "service.view-ppo-details.name": "View PPO Details",
  "service.view-ppo-details.summary": "View your Pension Payment Order — the record governing your monthly pension.",
  "service.view-ppo-details.why": "The reference document for any pension dispute or discrepancy.",
  "service.pensioner-forms.name": "Pensioner Forms & Circulars",
  "service.pensioner-forms.summary": "Forms and circulars specific to pension scheme members.",
  "service.pensioner-forms.why": "Reference material for pension-specific processes not covered by general EPF forms.",
  "service.grievance-redressal.name": "Grievance Redressal (EPFiGMS)",
  "service.grievance-redressal.summary": "File a complaint about any EPFO service — for members, pensioners, employers, or others.",
  "service.grievance-redressal.why": "EPFO's own FAQ names this as the only escalation path when a claim isn't settled within 20 days.",
  "service.grievance-redressal.note": "This is a genuinely separate system from the main member portal — a fourth login, not a tab inside the one you already have.",
  "service.rti.name": "RTI",
  "service.rti.summary": "File a Right to Information request with EPFO.",
  "service.rti.why": "A formal route to information EPFO doesn't otherwise publish or explain.",
  "service.locate-office.name": "Locate EPFO Office",
  "service.locate-office.summary": "Find the regional EPFO office responsible for your account.",
  "service.locate-office.why": "Some processes still require an in-person visit or a physically mailed form.",
  // ─── FAQ ────────────────────────────────────────────────────────────────
  "faq.title": "Questions",
  "faq.q1": "Is this connected to real EPFO systems?",
  "faq.a1":
    "No. This is an independent hackathon prototype, not affiliated with or endorsed by EPFO. It never connects to any real government or financial system.",
  "faq.q2": "Is my data real?",
  "faq.a2":
    "No. Every member record, balance, and claim on this site is synthetic — generated for this demo, not pulled from any real person or account.",
  "faq.q3": "What's actually real here vs. mocked?",
  "faq.a3":
    "The name and date-of-birth matching, the exit-date and eligibility rules, and the amount calculations are real code that genuinely runs. Login, bank verification, and claim settlement are simulated.",
  "faq.q4": "Why does this look different from EPFO's actual site?",
  "faq.a4":
    "Deliberately. This explores what a pre-flight check for a PF claim could look like — it's not a redesign of EPFO's website, just one flow built around one real problem.",

  // ─── Comparison ─────────────────────────────────────────────────────────
  "comparison.title": "They built a form. We built a check.",
  "comparison.subtitle": "Based on EPFO's own published FAQ and portal structure.",
  "comparison.today": "Today",
  "comparison.prototype": "This prototype",
  "comparison.today.1": "Cryptic rejection, weeks later",
  "comparison.today.2": "5 separate logins, no unified view",
  "comparison.today.3": "“File a grievance” is the only escalation",
  "comparison.today.4": "Cheque photo rejected for being blurry",
  "comparison.proto.1": "Plain-language check before you submit",
  "comparison.proto.2": "One flow, start to finish",
  "comparison.proto.3": "Fix a mismatch and watch it re-verify live",
  "comparison.proto.4": "A visible status timeline, not silence",

  // ─── Check preview gallery ──────────────────────────────────────────────
  "preview.eyebrow": "Real logic, not a mock",
  "preview.title": "The check runs before you submit — not after you're rejected.",
  "preview.1.title": "Name matches across Aadhaar, UAN and bank records",
  "preview.1.detail": "“RAJESH KUMAR SINGH” matches on all three records.",
  "preview.2.title": "Name mismatch found",
  "preview.2.detail": "Aadhaar name doesn't fully match your bank account. Match score: 50%.",
  "preview.3.title": "Bank account verified",
  "preview.3.detail":
    "Instant check confirmed the account is active and matches your KYC name.",
  // ─── Login ──────────────────────────────────────────────────────────────
  "login.title": "Member Login",
  "login.subtitle": "Sign in to access your EPF account, claim status, and documents.",
  "login.identifier": "Email or Mobile Number",
  "login.identifier.placeholder": "e.g. priya.demo@example.test",
  "login.password": "Password",
  "login.forgot": "Forgot password?",
  "login.continue": "Continue",
  "login.authenticating": "Authenticating...",
  "login.error.credentials": "Invalid email/phone or password.",
  "login.credentials.title": "Prototype Credentials:",
  "login.credentials.clean": "Clean",
  "login.credentials.mismatch": "Mismatch",
  "login.credentials.rejected": "Claim rejected",
  "login.credentials.clarification": "Needs clarification",
  "login.credentials.password": "Password:",
  "login.otp.label": "One-Time Password (OTP)",
  "login.otp.sent": "An OTP has been sent to your registered mobile number and email.",
  "login.otp.placeholder": "Enter 6-digit OTP",
  "login.otp.error": "Invalid OTP. Please try again.",
  "login.otp.verify": "Verify & Login",
  "login.otp.verifying": "Verifying...",
  "login.otp.resend": "Resend OTP",
  "login.otp.resendIn": "Resend in {seconds}s",
  "login.otp.mockNotice": "Mock OTP is",
  "login.back": "Back",
  "login.backToLogin": "Back to login",
  "login.forgot.prompt": "Enter your details to receive a password reset link.",
  "login.forgot.send": "Send Reset Link",
  "login.forgot.sending": "Sending...",
  "login.forgot.sent": "Password reset instructions sent. (Mocked)",
  // ─── UAN activation ─────────────────────────────────────────────────────
  "uan.title": "Activate your UAN",
  "uan.prototypeTag": "Prototype",
  "uan.simNote": "This demonstration simulates Aadhaar authentication.",
  "uan.needs.title": "You'll need:",
  "uan.needs.uan": "Your UAN (Universal Account Number)",
  "uan.needs.mobile": "Aadhaar-linked mobile number",
  "uan.needs.phone": "Access to your phone",
  "uan.start": "Start activation",
  "uan.step1": "Step 1: Verify your details",
  "uan.step1.label": "Enter your UAN",
  "uan.step1.placeholder": "12-digit UAN",
  "uan.checking": "Checking...",
  "uan.step2": "Step 2: Verify mobile number",
  "uan.step2.label": "Aadhaar-linked Mobile Number",
  "uan.step2.placeholder": "10-digit mobile number",
  "uan.connecting": "Connecting...",
  "uan.sendOtp": "Send OTP",
  "uan.step3": "Step 3: Aadhaar verification",
  "uan.consent":
    "By continuing, you consent to EPFO using your Aadhaar details to verify your identity.",
  "uan.processing": "Processing...",
  "uan.consentCta": "I consent, send Aadhaar OTP",
  "uan.step4": "Step 4: OTP confirmation",
  "uan.step4.label": "Enter Aadhaar OTP",
  "uan.step4.sent": "An OTP has been sent to your mobile number ending in {last4}.",
  "uan.step4.placeholder": "6-digit OTP",
  "uan.verifying": "Verifying...",
  "uan.activate": "Verify & Activate",
  "uan.step5": "Step 5: Activation complete",
  "uan.step5.body": "Your UAN is now active and linked to your Aadhaar.",
  "uan.proceed": "Proceed to Login",
  // ─── Dashboard ──────────────────────────────────────────────────────────
  "dash.greeting.morning": "Good morning,",
  "dash.greeting.afternoon": "Good afternoon,",
  "dash.greeting.evening": "Good evening,",
  "dash.claimReadiness": "Claim Readiness",
  "dash.allSet": "You're all set.",
  "dash.needsAttention":
    "Some account details need attention before you can submit a claim.",
  "dash.reviewReadiness": "Review claim readiness",
  "dash.nextSteps": "Your Next Steps",
  "dash.noPending": "No pending actions required for your account.",
  "dash.recentActivity": "Recent Activity",
  "dash.noRecentActivity": "No recent activity.",
  "dash.viewAll": "View all",
  "dash.documents": "Documents",
  "dash.employment": "Employment",
  "dash.exploreServices": "Explore other services",
  "dash.exploreServices.sub": "Passbook, KYC, grievances, pension & more",

  "health.aadhaarVerified": "Aadhaar verified",
  "health.aadhaarPending": "Aadhaar pending",
  "health.allKycVerified": "All KYC verified",
  "health.panUnverified": "PAN unverified",
  "health.bankUnverified": "Bank unverified",
  "health.currentEmployer": "Current employer",

  "nextSteps.title": "Your next steps",
  "nextSteps.subtitle": "Complete these to prepare your account",
  "nextSteps.allSet": "You're all set!",
  "nextSteps.noAction": "No action required. Your account is ready for claims.",
  "nextSteps.reviewName": "Review name difference",
  "nextSteps.verifyBank": "Verify bank account",
  "nextSteps.reviewPrevious": "Review previous PF account",

  "activity.recent": "Recent activity",
  "activity.none": "No recent activity",
  "activity.title": "Activity & Notifications",
  "activity.subtitle": "Track your recent account activity and important alerts.",
  "activity.history": "Activity History",
  "activity.notifications": "Notifications",
  "activity.noNotifications": "No notifications.",
  "activity.service": "EPFO Claim Service",
  "activity.claims": "Claims",
  "activity.profile": "Profile",

  "consolidation.review": "Review Accounts to Consolidate",
  "consolidation.verifiedMatch": "Verified match",
  "consolidation.confirm": "Confirm Transfer",
  "consolidation.success": "Transfer Initiated Successfully",

  "employment.current": "Current employment",
  "employment.previous": "Previous employment",
  "employment.present": "Present",
  "employment.pfBalance": "PF Balance",
  "employment.status": "Status",
  "employment.active": "PF account active",
  "employment.activeDetail": "Account is active and receiving contributions",
  "employment.consolidated": "Funds have been consolidated",
  "employment.recommended": "Consolidation recommended",
  "employment.title": "My Employment",
  "employment.subtitle": "Your employment history and associated Provident Fund accounts.",
  "employment.currentEmployer": "Current Employer",
  "employment.previousEmployer": "Previous Employer",
  "employment.accountNo": "PF Account No.",
  "employment.accumulated": "Accumulated Balance",
  "employment.consolidationStatus": "Consolidation Status",
  "employment.activeAccount": "Active account",
  "employment.notMerged":
    "This previous account balance has not been merged into your current account. You should transfer it to ensure continuous interest.",
  "common.close": "Close",

  "claims.title": "My Claims",
  "claims.subtitle":
    "Track every claim you've submitted, including ones that need action from you.",
  "claims.status.processing": "Processing",
  "claims.status.approved": "Approved",
  "claims.status.rejected": "Rejected",
  "claims.status.clarification": "Needs your response",

  "docs.title": "Document Center",
  "docs.subtitle": "Manage documents used for KYC, claim verification, and identity proof.",
  "docs.digilockerConnected": "DigiLocker Connected",
  "docs.connectPrompt":
    "Connect DigiLocker to securely fetch your Aadhaar, PAN, and other official documents.",
  "docs.connect": "Connect DigiLocker",
  "docs.none": "No documents found in DigiLocker.",
  "docs.employerDocs": "Employer Documents",
  "docs.yourUploads": "Your Uploads",
  "docs.uploaded": "Document uploaded successfully. It is now available for claims.",
  "docs.status.connected": "Connected",
  "docs.status.needsAttention": "Needs Attention",
  "docs.status.processing": "Processing",
  "docs.prototypeNote": "Prototype Note:",

  "connected.title": "Connected Services",
  "connected.subtitle":
    "Link external government services to simplify claims and verification.",
  "connected.authenticating": "Authenticating...",
  "connected.connecting": "Securely connecting to DigiLocker services.",
  "connected.success": "Successfully Connected",
  "connected.synced": "Your documents are now synced. Redirecting...",
  "connected.linked":
    "Your account is successfully linked. Documents are synced automatically.",
  "connected.simulated": "Simulated prototype connection",
  "connected.noRealData": "This will not actually connect to DigiLocker or access real data.",
  "connected.backToDocs": "Back to Document Center",

  "profile.title": "Profile Settings",
  "profile.subtitle":
    "Manage your personal information, KYC details, and security preferences.",
  "profile.personal": "Personal Details",
  "profile.nameAadhaar": "Name (as per Aadhaar)",
  "profile.dob": "Date of Birth",
  "profile.contact": "Contact Details",
  "profile.mobile": "Mobile Number",
  "profile.email": "Email Address",
  "profile.identityKyc": "Identity & KYC",
  "profile.aadhaarCard": "Aadhaar Card",
  "profile.panCard": "PAN Card",
  "profile.bankAccount": "Bank Account",
  "profile.accountDetails": "Account details",
  "profile.bankNeedsVerification":
    "Your bank details need to be verified by your employer before you can submit a withdrawal claim.",

  "pf.title": "PF Account Details",
  "pf.accountInfo": "Account Information",
  "pf.employer": "Employer",
  "pf.establishmentId": "Establishment ID",
  "pf.period": "Employment Period",
  "pf.lastContribution": "Last Contribution",
  "pf.totalBalance": "Total Balance",
  "pf.contributionSummary": "Contribution Summary (Simulated)",
  "pf.employeeShare": "Employee Share",
  "pf.employerShare": "Employer Share",
  "pf.pensionShare": "Pension Share",
  "pf.activeAccount": "Active Account",
  "pf.activeContributions": "Active Contributions",
  "pf.consolidated": "Consolidated",
  "pf.unconsolidated": "Unconsolidated",
  "pf.transferRecommended": "Transfer Recommended",
  "common.unknown": "Unknown",
  "docs.prototypeNote.body":
    "Document upload and DigiLocker sync are simulated. No actual files are stored or transmitted.",
  // ─── Contextual help ────────────────────────────────────────────────────
  "help.aria": "Need help?",
  "help.title": "Service Assistant",
  "help.intro": "Hi! I can help you understand the information on this page.",
  "help.suggested": "Suggested Questions",
  "help.didThisHelp": "Did this help?",
  "help.yes": "Yes, thanks",
  "help.needMore": "I need more help",
  "help.status.q1": "Why is my claim still processing?",
  "help.status.a1":
    "Claims typically take up to 20 days. If it exceeds this period, you can request assistance.",
  "help.status.q2": "What does regional processing mean?",
  "help.status.a2":
    "Your claim has been assigned to a local field office near your employer for final verification.",
  "help.preflight.q1": "What can I do about a name mismatch?",
  "help.preflight.a1":
    "You can apply for a joint declaration correction. This prototype includes a flow to demonstrate that fix.",
  "help.preflight.q2": "Why is my bank account pending?",
  "help.preflight.a2":
    "Bank accounts must be digitally signed by your employer. Contact your HR department.",
  "help.documents.q1": "Which documents do I need?",
  "help.documents.a1":
    "For most withdrawals, a cancelled cheque or passbook copy is required. Name corrections may require Aadhaar or Passport.",
  "help.documents.q2": "Can I use a DigiLocker document?",
  "help.documents.a2":
    "Yes, connecting DigiLocker automatically fetches your verified Aadhaar and PAN.",
  "help.default.q1": "How do I update my KYC?",
  "help.default.a1": "Go to your Profile settings to initiate KYC updates.",
  "help.default.q2": "Where can I find my UAN?",
  "help.default.a2":
    "Your UAN is printed on your salary slip, or you can retrieve it via “Know Your UAN” on the main portal.",
  "login.credentials.moreScenarios":
    "More scenarios (unmerged UAN, delayed claim, multiple issues) are one click away from the profile menu → “Demo scenarios” once you're logged in.",
} as const;
