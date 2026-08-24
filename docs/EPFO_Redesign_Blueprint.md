# EPFO Functional & UX Redesign Blueprint

## Executive Summary
EPFO's current architecture suffers from an estimated 20% to 33% claim rejection rate, primarily caused by fragmented databases, unassisted KYC mismatches, and opaque error handling. This blueprint outlines the complete system modernization, user journey redesign, pre-validation architecture, and concrete error remediation framework.

---

## 1. System Architecture: Unified Monolith vs. New Modular Architecture

```
[CURRENT ARCHITECTURE: FRAGMENTED & ASYNCHRONOUS]
  Member Portal ───(Siloed Auth)───> Member Profile / Claims (No Passbook access)
  Passbook Portal ──(Separate Auth)──> Ledger Read-Only (Cannot file claims)
  EPFiGMS ──────────(Siloed Portal)──> Grievances (No context from claim state)

[PROPOSED ARCHITECTURE: EVENT-DRIVEN & PRE-VALIDATED]
  ┌─────────────────────────────────────────────────────────────┐
  │         Single Unified Web & Mobile Client (SPA/PWA)        │
  │     (Aadhaar OTP / Passkey / Biometric Auth via DigiYatra/UIDAI) │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                       API Gateway                           │
  │   - Pre-validation Engine (Penny-drop, UIDAI, NSDL check)   │
  │   - Automated Eligibility Router (Calculates Form 19/31/10C)│
  └──────┬───────────────────────┬───────────────────────┬──────┘
         ▼                       ▼                       ▼
  [Claim State Engine]    [Real-time Ledger]    [Smart Grievance Triage]
  (State machine tracking) (Instant balances)   (Context-aware escalation)
```

---

## 2. Core User Flows (Before vs. After)

### Flow A: Filing a Withdrawal / Advance Claim

#### Current Flow
1. User logs into Member Portal with UAN + Password + Captcha.
2. Manually guesses the appropriate form (Form 19, 31, or 10C).
3. Manually enters bank account number and uploads a scanned cheque (often rejected if blurry).
4. Submits form → weeks-long wait → Claim rejected with a short technical remark under Track Claim Status, e.g. *"KYC mismatch"* — reactive, buried, and only visible after the fact.
   > **Corrected 25 Aug 2026:** earlier drafts used "Annexure K" as an example of a cryptic name-mismatch error. That's inaccurate — Annexure K is a real EPFO term, but it's specific to service-history verification during exempted-to-unexempted fund transfers, not name mismatches. Don't use "Annexure K" in the video or submission. Source: [EPFO circular, 18 Sep 2025](https://www.epfindia.gov.in/site_docs/PDFs/Circulars/Y2025-2026/EPFOCircular_18092025_AnnexureK.pdf).

#### Redesigned Flow
1. **Unified Dashboard:** User logs in with biometric or Aadhaar OTP.
2. **Intent-driven Action:** User clicks **"Withdraw Funds"** → Portal asks: *"Why do you need money?"* (e.g., Medical, House Construction, Job Exit).
3. **Automated Form Selection & Eligibility Preview:** The system automatically determines the correct form and displays exact transferable/withdrawable balances.
4. **Active KYC Pre-Check (Zero Rejection Gate):**
   * *Aadhaar Name Match:* Real-time string similarity check between UIDAI and EPFO records.
   * *Bank Verification:* Instant ₹1 penny-drop API call to verify if the account is active and matches the member's legal name.
   * *Employer Exit Date:* Checks if the Date of Exit (DoE) is missing; if so, offers one-click self-declaration (if eligible after 60 days).
5. **Instant e-Sign & Submission:** Digital signature via Aadhaar e-Sign; status moves straight to **"Auto-Settlement Pipeline"**.
   > **Corrected 25 Aug 2026:** EPFO's own current policy (effective 3 July 2026) targets **3 days for eligible claims** with complete KYC, auto-settlement up to ₹5 lakh, and a 20-day outer limit with 12% penal interest on delayed officials. "Under 48 hours" was an earlier, unverified estimate — do not use it in the video or submission. Source: [Business Today, 3 Jul 2026](https://www.businesstoday.in/personal-finance/news/story/epfos-new-3-day-pf-claim-settlement-faster-withdrawals-higher-auto-settlement-limit-new-epf-rules-explained-for-subscribers-540796-2026-07-03).

---

## 3. Concrete Error Handling & Remediation Matrix

Instead of displaying post-facto cryptic rejection codes, the redesigned interface implements preventive blocking and one-click in-line fixes:

| Failure Scenario | Current Behavior | Redesigned Functional & UI Fix |
| :--- | :--- | :--- |
| **Name Discrepancy** *(e.g., "Rajesh Kumar" vs "Rajesh K")* | Claim status shows a short technical remark under Track Claim Status — e.g. mismatched KYC — only after the fact, not before submission. | **Pre-submission Blocker:** Highlight mismatch immediately with fuzzy-match score. If ≥ 85% match, prompt instant Aadhaar demographic override without employer approval. |
| **Pending Date of Exit (DoE)** | User applies for Form 19; portal rejects it because employer didn't update DoE. | **Smart Flow Rerouting:** System detects active status → blocks Full Settlement → activates "Employee Self-Declaration DoE" flow or alerts HR automatically with a 7-day SLA countdown. |
| **Unmerged Multiple UANs** | Claim stalls due to disjointed service history across past employers. | **UAN Discovery Modal:** System queries Income Tax / PAN records on login, surfaces old Member IDs, and initiates a 1-click consolidation request prior to claim submission. |
| **Illegible Cheque Upload** | Field officer rejects claim due to "Cancelled cheque not clear". | **Eliminate File Uploads:** Replace cheque uploads entirely with real-time NPCI/Account Aggregator verification. If manual upload is unavoidable, use client-side OCR to validate name and IFSC legibility before upload. |

---

## 4. Wireframe & Information Hierarchy

```
+-----------------------------------------------------------------------------------+
|  EPFO UNIFIED PORTAL                      🔔 Alerts (0)   👤 Rajesh Kumar (UAN: 1009...)  |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  TOTAL PF BALANCE                                       CLAIM READINESS SCORE     |
|  ₹ 4,82,450                                             🟢 100% Ready to Claim    |
|  Employee: ₹ 2.1L | Employer: ₹ 2.2L | Pension: ₹ 52K   (Aadhaar, PAN, Bank Active)  |
|                                                                                   |
|  [ 📥 View Full Passbook ]     [ 💸 Withdraw Funds ]     [ 🔁 Transfer Old PF ]   |
|                                                                                   |
|-----------------------------------------------------------------------------------|
|  ACTIVE SERVICES & CLAIMS                                                         |
|  • Advance Claim #492819 (Medical)                                                |
|    [● Sent to Bank for Disbursal] ──────────────── Estimated Credit: Today, 6 PM  |
|                                                                                   |
|-----------------------------------------------------------------------------------|
|  SERVICE HISTORY TIMELINE                                                         |
|  • Infosys Ltd (2022 - Present) ──── Active (Regular Monthly Credits)             |
|  • Wipro Ltd (2018 - 2022)      ──── Service Consolidated into Current UAN ✓      |
+-----------------------------------------------------------------------------------+
```

---

## 5. Implementation & Rollout Strategy

1. **Phase 1 (Microservices Proxy & Unification):** Retain legacy databases while deploying a modern frontend layer that authenticates users across both the Member and Passbook portals seamlessly.
2. **Phase 2 (Pre-Validation Gateway):** Intercept the claim submission route with Aadhaar e-KYC and NPCI penny-drop checks to catch data mismatches before claims enter the processing queue.
3. **Phase 3 (Rules Engine & Auto-Settlement):** Enable automated settlement for all pre-validated standard advances under ₹5,00,000 without manual field officer intervention.
