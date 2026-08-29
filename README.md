# EPFO Claim Pre-Flight

Hackathon prototype for **Build What Moves India**. Independent build — not affiliated with or endorsed by EPFO. All member data is synthetic.

**One sentence:** Before a member submits a PF withdrawal, we check their Aadhaar / UAN / bank / employer records against each other, show them exactly what will get their claim rejected, and let them fix it on the spot — instead of finding out three weeks later with a code nobody can decode.

## The Problem

Approximately 20–26% of PF claims are rejected historically, with the primary cause being record mismatch (Name, DOB, Bank details) across Aadhaar, UAN, and bank records. Current processes result in silent rejections and cryptic error codes (e.g., "Annexure-K Mismatch") that leave citizens confused and frustrated.

## The Solution

This prototype reimagines the claim withdrawal journey. It introduces a **Pre-flight check** that runs *before* a claim is submitted. By catching data mismatches and missing records upfront, we provide plain-language explanations and inline fixes to guarantee claim success.

## Core Features

- **6-Step Reimagined Journey**:
  1. **Login** — mocked OTP, pick a demo member profile
  2. **Dashboard** — balance + claim readiness indicator
  3. **"Why do you need money?"** — reason tiles, form auto-selected silently
  4. **Pre-flight check** — name match, DOB match, Date of Exit, bank account — the core feature
  5. **Fix it inline** — interactive fix for the name-mismatch case
  6. **Submit & status** — a visible timeline instead of a black box
- **Eligibility Engine & Match Rules**: Real fuzzy-matching logic for Name and DOB, combined with Date-of-Exit logic to accurately predict claim rejections.
- **Demo Scenario Switcher**: An interactive floating panel allowing evaluators to instantly swap between different synthetic member profiles (e.g., "Clean Profile", "Name Mismatch", "DOB Mismatch") to experience different edge cases.
- **Bilingual Support (i18n)**: Full English and Hindi localization to demonstrate accessibility for the diverse Indian demographic.
- **Richer Mock States**: Context-aware mock data representing various combinations of KYC failures and missing employer inputs.

## Build plan & Research

**We are following [docs/EPFO_Hackathon_Build_Plan.md](docs/EPFO_Hackathon_Build_Plan.md) as the authoritative plan for this build.** It defines the screens, the mock data shape, what's real vs. mocked, the day-by-day schedule, and the two-minute video outline. Read that file before changing scope.

Supporting research that informed the plan:
- [docs/EPFO_Portal_Functionality_Map.md](docs/EPFO_Portal_Functionality_Map.md) — live audit of EPFO's actual service catalog and portal fragmentation
- [docs/EPFO_Redesign_Blueprint.md](docs/EPFO_Redesign_Blueprint.md) — full redesign architecture and error-remediation matrix
- [docs/EPFO_Redesign_Layman_Guide.pdf](docs/EPFO_Redesign_Layman_Guide.pdf) — plain-English version for non-technical reviewers

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Playwright (E2E)
- **Deployment**: Vercel

## What's real vs. mocked

See the table in [docs/EPFO_Hackathon_Build_Plan.md](docs/EPFO_Hackathon_Build_Plan.md#6-whats-real-vs-mocked-put-this-table-in-your-submission-too). In short: the name-matching and DOB-matching algorithm, Date-of-Exit eligibility logic, and readiness rules in `src/lib/matchEngine.ts` and `src/lib/eligibilityEngine.ts` are real. Member records, Aadhaar OTP, bank verification, and claim settlement are simulated.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Running Tests

We use Playwright for end-to-end testing of the critical user journeys.

```bash
npx playwright test
```

## Project structure

```
docs/                   Planning and research documents (see above)
src/
  app/                  Next.js App Router (split into `(app)` and `(marketing)`)
  components/           Shared UI, Interactive Layouts, Mock Demo Switcher
  data/                 Synthetic member profiles (mockMembers.json)
  i18n/                 English and Hindi localization dictionaries
  lib/                  Real pre-flight check logic (matchEngine, eligibilityEngine)
  types/                Shared TypeScript types
tests/e2e/              Playwright End-to-End tests
```

## Guardrails

- No real Aadhaar numbers, PAN, OTPs, bank details, or payment flows.
- No EPFO logo used in a way that implies endorsement.
- Persistent "independent hackathon prototype, simulated data" banner on every page.
- No connection to any real EPFO/UMANG system, at any point.
