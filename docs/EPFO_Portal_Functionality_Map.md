# EPFO, Taken Apart

**Functional map — what services EPFO actually exposes, and where each one lives**

Built the same way as [MCA_Portal_Functionality_Map.md](./MCA_Portal_Functionality_Map.md), but scoped differently on purpose: MCA's map documented UI interactions on a directory page. This one documents EPFO's **service catalog and where each service actually sits** — because for a hackathon build, that question ("which of these can I plausibly mock a journey for in four days") matters more than button-level UI behaviour.

- **Target:** epfo.gov.in (main), unifiedportal-mem.epfindia.gov.in (Member e-Sewa), epfigms.gov.in (grievance system)
- **Audited:** 24 Aug 2026
- **Method:** Direct HTTP fetch with a browser user-agent (not a headed browser session — no clicks were simulated, no forms submitted, no login attempted). Every fact below is either text pulled verbatim from the live page or an inference explicitly flagged as such.

> **Method note, stated plainly:** this pass is shallower than the MCA audit. That one drove a real Chromium session and clicked things. This one reads what the server renders without JavaScript execution — enough to build an accurate service map, not enough to confirm every interactive widget behaves as its label promises. Anything below marked ⚠️ **Inferred** should be re-verified in a real browser before being treated as fact in a build.

---

## Table of contents

- [Confidence key](#confidence-key)
- [System map](#system-map)
- [Full service catalog (from the homepage)](#full-service-catalog-from-the-homepage)
- [Page A — epfo.gov.in (public homepage)](#page-a--epfogovin-public-homepage)
- [Page B — Member e-Sewa (unifiedportal-mem)](#page-b--member-e-sewa-unifiedportal-mem)
- [Page C — EPFiGMS (grievance system)](#page-c--epfigms-grievance-system)
- [Page D — Jeevan Pramaan (digital life certificate)](#page-d--jeevan-pramaan-digital-life-certificate)
- [The UMANG dependency](#the-umang-dependency)
- [Where the actual pain is, per EPFO's own FAQ](#where-the-actual-pain-is-per-epfos-own-faq)
- [What this means for a build](#what-this-means-for-a-build)
- [Residual gaps](#residual-gaps)

---

## Confidence key

| Tag | Meaning |
|---|---|
| ✅ **Confirmed live** | Text/structure read directly off the live page response |
| ⚠️ **Inferred** | Reasonable conclusion from page content, not independently verified by interaction |
| ⛔ **Not reachable this pass** | Attempted, blocked or requires a real browser session (JS, login, CAPTCHA) |

---

## System map

```
Citizen
   │
   ├──► epfo.gov.in ─────────────── public info, "How to" links, FAQ, forms, press
   │        │
   │        ├──► unifiedportal-mem.epfindia.gov.in ── Member e-Sewa (login, claims, KYC, passbook)
   │        ├──► epfigms.gov.in ──────────────────── Grievance system (separate NIC-built portal, own login)
   │        ├──► jeevanpramaan.gov.in ─────────────── Pensioner life certificate (separate ministry-wide system)
   │        ├──► shramsuvidha.gov.in ──────────────── Employer-side compliance portal (separate, MoLE-wide)
   │        └──► UMANG app ────────────────────────── Now the ONLY path for UAN allotment + activation
   │
   └──► No single login. At least five separate systems, five separate credential sets,
        for one citizen's PF lifecycle (join → contribute → claim → pension → death benefit).
```

This fragmentation is the single most important structural fact for a hackathon build: **EPFO is not one portal, it's a federation of five**, each built and hosted separately (NIC-developed, different visual systems, different session models). A "human layer" build has to either pick one sub-system to fix, or explicitly frame itself as the missing connective layer across all five.

---

## Full service catalog (from the homepage)

✅ Confirmed live — read directly from epfo.gov.in's "EPFO and You" section, grouped by the site's own three audiences.

### For Employees

| Service | Where it lives | Notes |
|---|---|---|
| Activate UAN | ⛔ Redirects to UMANG | Discontinued on web portal as of this pass — see [UMANG dependency](#the-umang-dependency) |
| View Passbook | Member e-Sewa (login required) | Real-time balance + transaction history |
| Update KYC | Member e-Sewa (login required) | Aadhaar, PAN, bank details |
| Withdraw PF | Member e-Sewa (login required) | Partial or full withdrawal |
| Know Your UAN | Member e-Sewa | Retrieve UAN via basic details |
| Online Claims & Transfer | Member e-Sewa | Claim submission, inter-account transfer |
| File Death Claim | Member e-Sewa | Filed by eligible nominee |

### For Employers

| Service | Where it lives | Notes |
|---|---|---|
| UAN Management | Employer login (Member e-Sewa employer side) | Central management of employee UANs |
| Submit ECR (Electronic Challan cum Return) | Employer login | Monthly filing |
| View/Download Payment Receipts & Certificates | Employer login | |
| Employee Enrollment & Exit Management | Employer login | Real-time record updates — **the "exit date" step that gates final-settlement claims** |
| Employer Registration | Shram Suvidha Portal (separate domain) | Register org under EPF & MP Act |
| Download Forms & Circulars | epfo.gov.in | Centralized download page |
| Performance of Establishments | epfo.gov.in / data hub | Compliance/contribution check |

### For Pensioners

| Service | Where it lives | Notes |
|---|---|---|
| Jeevan Pramaan (Life Certificate) Submission | jeevanpramaan.gov.in (separate, cross-ministry system) | Digital life certificate, no physical visit |
| View PPO (Pension Payment Order) Details | Member e-Sewa / pension portal | |
| Download Pensioner Forms & Circulars | epfo.gov.in | |

### Cross-cutting

| Service | Where it lives | Notes |
|---|---|---|
| Grievance Redressal | epfigms.gov.in (separate portal, own login/OTP flow) | Also reachable inside UMANG |
| RTI | epfo.gov.in/RTI | |
| Locate EPFO office | epfo.gov.in directory | |
| International Workers services | epfo.gov.in | Separate sub-section, not explored this pass |

---

## Page A — epfo.gov.in (public homepage)

### Page layout — ✅ confirmed live

- **Top bar:** language/version toggle ("New"/"Old" — the site appears to be mid-migration between two front-end versions), Employee Login / Employer Login split at the very top.
- **Nav:** About · Employee · Employer · Pensioner · Legal Framework · Resources · For Office Use · Opportunities — organised by **audience**, not by task, which is the opposite of the "what do you want to do" framing the MCA brainstorming doc argued for.
- **Hero:** "EPFO and You" — three-column split (Employee / Employer / Pensioner), each a stack of task cards ("Activate UAN", "Withdraw PF", "Submit ECR"...). This is the closest the current site gets to task-first framing, and it's genuinely decent — but every card is a link out to a *different subdomain*, not an in-page flow.
- **FAQ block:** a long, real, un-styled FAQ list embedded directly in the homepage HTML (see [Where the actual pain is](#where-the-actual-pain-is-per-epfos-own-faq) below) — this is unusually rich, citizen-authored-sounding content sitting on the homepage rather than surfaced anywhere prominent.
- **Footer:** FAQs, Disclaimer, Copyright Policy, Sitemap, RTI, EPFiGMS, mGovernance, full accessibility toolbar (text-to-speech, dyslexia-friendly mode, cursor size, invert colours — more extensive than MCA's ministry-profile page).

### Notable content — ✅ confirmed live

> One FAQ answer, verbatim, is the clearest statement of the problem on the entire site:
> *"In case the PF amount is not settled within 20 days to whom the matter is to be reported? He can approach the Regional P.F. Commissioner in charge of grievances; file a complaint on the website using the EPFiGMS feature..."*

That's EPFO's own homepage acknowledging, unprompted, that claims routinely blow past their statutory settlement window and the only recourse is a *separate grievance portal* — not a status page, not an explanation, a complaint form.

> Fraud warning banner, repeated on **three separate sub-portals** (main site, Member e-Sewa, EPFiGMS) nearly verbatim: *"EPFO never requests personal information such as Aadhaar, PAN, or bank details over the phone... Do not respond to such calls or messages."*

The repetition across three independently-built systems is itself a signal — phishing impersonating EPFO is common enough that every team building a sub-portal felt the need to add the same warning independently.

---

## Page B — Member e-Sewa (unifiedportal-mem.epfindia.gov.in)

### Page layout — ✅ confirmed live

- Separate domain, separate visual system from the main epfo.gov.in site (older Bootstrap-era styling vs. the homepage's newer redesign) — a second visible sign of the federation, not a single product.
- Login panel: UAN + password, JS-gated ("Please enable JavaScript in your browser to login").
- Below login: five self-service links that don't require authentication — **Activate UAN, Track Application Status, Know Your UAN, Direct UAN Allotment, UAN for Existing PF** — plus Death Claim filing entry points.

### Critical finding — ✅ confirmed live

> **"The facility for Direct UAN Allotment through this portal has been discontinued... generate your UAN through Aadhaar-based Face Authentication (FAT) on the UMANG App."**
>
> **"The facility for UAN Activation through this portal has been discontinued... Activate your UAN through Aadhaar-based Face Authentication (FAT) on the UMANG App."**

Both banners present in English and Hindi, both pointing at the same instruction: download UMANG, go through Face Auth, come back. This is a **live, current (as of this pass) functionality removal from the web portal** — the two most basic onboarding actions (get a UAN, activate it) no longer work on the website at all. Anyone without a smartphone, or without comfort installing a government app and completing face-auth biometric capture, has no stated alternative path on this page.

> The brief for this hackathon explicitly says: *"Reviewers will not download a mobile app."* This is directly relevant: **a faithful "as-is" prototype of current EPFO onboarding cannot be demoed within the hackathon's own rules**, because the real onboarding step now lives inside an app. A build that reintroduces a working web-based UAN activation flow (mocked) is not just a UX improvement — it's restoring a *citizen-usable channel that the real portal itself just removed*.

### Session handling — ⚠️ inferred

- Page includes a modal string: *"Your session is currently active in another window/browser/system. Click Login Here to continue login or Cancel."* — implies single-session enforcement, a common friction point for shared-device or slow-connection users retrying a failed load.

---

## Page C — EPFiGMS (epfigms.gov.in)

### Page layout — ✅ confirmed live

Third distinct system, third distinct visual language, third login model.

- Nav: Register Grievance · Send Reminder · View Status · Upload Grievance Document · About.
- Explicitly states grievances can be lodged by **PF member, EPS Pensioner, Employer, or Others** — a broader intake than "member complaints only."
- OTP-based identity, UAN-integrated (system auto-routes the grievance to the correct regional office based on UAN → master data lookup) — ✅ this part is a genuinely well-designed piece of backend routing, worth crediting rather than only criticising.
- Explicitly notes: **"EPFiGMS is available in UMANG"** — a second UMANG dependency alongside UAN allotment.

### What it does NOT claim — ⚠️ inferred from absence

Nothing on this page promises a *resolution* SLA, only an acknowledgement SLA (auto-generated registration number + SMS/email ack). The FAQ on the main site independently confirms the pattern: a stuck claim's only escalation path is filing a grievance *about* the claim, which itself has no stated resolution deadline — a complaint about a complaint, structurally similar to the CPGRAMS pattern noted in the brainstorming research for MCA.

---

## Page D — Jeevan Pramaan (jeevanpramaan.gov.in)

Fourth distinct system. Not EPFO-specific — it's a **cross-ministry** digital life certificate platform (also used by other pension-paying bodies, not just EPFO), reached from EPFO's homepage as an outbound link. Out of scope for a deep pass here, flagged only because it's the fourth separate login/credential surface a single EPS pensioner may need to touch across their lifecycle (UAN password → EPFiGMS OTP → Jeevan Pramaan Aadhaar auth → potentially UMANG on top of all three).

---

## The UMANG dependency

Worth calling out as its own section because it recurs three separate times across the audit above (UAN allotment, UAN activation, EPFiGMS access) and has a direct rule conflict with the hackathon brief.

| EPFO web capability | Current status (this pass) | Only alternative offered |
|---|---|---|
| Direct UAN Allotment | ⛔ Discontinued on web | UMANG app, Aadhaar Face Auth |
| UAN Activation | ⛔ Discontinued on web | UMANG app, Aadhaar Face Auth |
| EPFiGMS grievance filing | ✅ Still works on web | Also duplicated in UMANG |

> **Brief conflict, stated plainly:** *"Reviewers will not download a mobile app."* Two of EPFO's core onboarding actions currently require exactly that. Any build claiming to "fix EPFO onboarding" needs an explicit design note acknowledging this — either scope around it (assume the citizen already has a UAN, focus downstream) or explicitly reintroduce a **mocked** web-based equivalent and say so.

---

## Where the actual pain is, per EPFO's own FAQ

Reading straight through the homepage FAQ block (✅ confirmed live, not paraphrased from third-party sources) surfaces a pattern: almost every question is really about **what happens when the system doesn't behave as expected**, not "how do I use a feature."

- What to do if PF isn't settled within 20 days → file a grievance (no automatic status, no proactive notice)
- What happens to interest after 36 months of inactivity → a hard, unannounced-at-point-of-filing cutoff that depends on the member's exact retirement age
- Whether an employer *can* deduct their own contribution share from wages → "No, it's a criminal offence" — implying this happens often enough to need an FAQ entry
- What recourse exists when an employer withholds a member's deducted contribution → police complaint under IPC 406/409, filed *by EPFO*, not by the member directly

None of these are UI problems. They're **information asymmetry problems** — the member has no way to know, at the moment of filing, whether any of these edge cases apply to them until something goes wrong weeks or months later.

---

## What this means for a build

This map changes the EPFO recommendation slightly from a pure "claim rejection" framing to something a bit more precise, based on what's actually confirmed live today:

1. **The claim/KYC mismatch pre-flight idea still holds** — nothing here contradicts it, and the "Update KYC" service card on the homepage confirms KYC correction is a first-class, separately-surfaced action, meaning member-side data (name/DOB/bank) genuinely is something the member can see and edit before submitting — the pre-flight check is buildable against a real information architecture, not an invented one.
2. **The federation-of-five problem is real and demoable on its own.** A citizen doing "join job → get PF deducted → check balance → eventually withdraw → maybe die and have a nominee claim → maybe retire and need a pension" touches epfo.gov.in, Member e-Sewa, possibly UMANG, possibly EPFiGMS, possibly Jeevan Pramaan — five surfaces, none of which share a login. A single unified "my EPF status" view stitching these (mocked) is itself a legitimate, honestly-scoped hackathon build.
3. **The web-based UAN onboarding gap is a gift for a demo.** "Here's a working, honest, mocked web flow for the two things EPFO's own portal just removed from the web" is a concrete, verifiable-today claim — not a vague usability improvement.
4. **The grievance-about-a-claim loop (EPFiGMS) is confirmed structurally identical to the CPGRAMS pattern** flagged in the MCA brainstorming doc — acknowledgement SLA but no resolution SLA. If the build touches the rejection/appeal side at all, this is the exact mechanism to fix: turn "file a grievance and wait" into "here's your claim's real state and who's holding it."

---

## Residual gaps

Stated plainly, same spirit as the MCA doc's own gaps section:

- No login was attempted (correctly, per the brief's "don't access live government systems" rule) — so the actual claim-submission form, its field-level validation, and its real rejection-code vocabulary were **not observed directly**. Everything about rejection reasons in prior discussion of this project came from public secondary sources (news coverage, EPFO-adjacent guidance sites), not from this audit. Treat those as directionally right, not verbatim-confirmed.
- The Shram Suvidha employer portal was fetched but not read in depth this pass (returned a very small page — likely a JS-shell requiring a real browser).
- No live interaction (clicks, form fills) was performed anywhere — everything here is a static-HTML read, unlike the MCA audit's headed-browser pass. Any claim about *button behaviour* specifically (does a toggle work, does an accordion expand) is out of scope for this document.
- International Workers services and the pension-calculation subsystem were named but not explored.

---

*Built from direct HTTPS fetches (curl, browser user-agent, no JS execution, no login, no forms submitted) against the live sites on 24 Aug 2026. No government system was probed, tested, or interfered with beyond reading publicly served homepage content — consistent with the hackathon brief's "do not access or test a live government system" rule.*
