# EPFO Claim Pre-Flight

Hackathon prototype for **Build What Moves India**. Independent build — not affiliated with or endorsed by EPFO. All member data is synthetic.

**One sentence:** Before a member submits a PF withdrawal, we check their Aadhaar / UAN / bank / employer records against each other, show them exactly what will get their claim rejected, and let them fix it on the spot — instead of finding out three weeks later with a code nobody can decode.

## Build plan

**We are following [docs/EPFO_Hackathon_Build_Plan.md](docs/EPFO_Hackathon_Build_Plan.md) as the authoritative plan for this build.** It defines the six screens, the mock data shape, what's real vs. mocked, the day-by-day schedule, and the two-minute video outline. Read that file before changing scope.

Supporting research that informed the plan:

- [docs/EPFO_Portal_Functionality_Map.md](docs/EPFO_Portal_Functionality_Map.md) — live audit of EPFO's actual service catalog and portal fragmentation
- [docs/EPFO_Redesign_Blueprint.md](docs/EPFO_Redesign_Blueprint.md) — full redesign architecture and error-remediation matrix (future-roadmap scope; only a slice of this is in the hackathon build)
- [docs/EPFO_Redesign_Layman_Guide.pdf](docs/EPFO_Redesign_Layman_Guide.pdf) — plain-English version for non-technical reviewers
- [docs/MCA_Portal_Functionality_Map.md](docs/MCA_Portal_Functionality_Map.md) / [docs/MCA_Reimagined_Project_Brainstorming.md](docs/MCA_Reimagined_Project_Brainstorming.md) — earlier MCA-focused research, kept for reference; the project pivoted to EPFO (see comparison rationale in prior conversation — EPFO is explicitly named by the hackathon organizers, MCA is not)

## The six screens

1. **Login** — mocked OTP, pick a demo member profile
2. **Dashboard** — balance + claim readiness indicator
3. **"Why do you need money?"** — reason tiles, form auto-selected silently
4. **Pre-flight check** — name match, Date of Exit, bank account — the core feature
5. **Fix it inline** — interactive fix for the name-mismatch case
6. **Submit & status** — a visible timeline instead of a black box

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Chosen for fast scaffolding and easy deployment to a public URL (Vercel) ahead of the submission deadline.

## What's real vs. mocked

See the table in [docs/EPFO_Hackathon_Build_Plan.md](docs/EPFO_Hackathon_Build_Plan.md#6-whats-real-vs-mocked-put-this-table-in-your-submission-too). In short: the name-matching algorithm, Date-of-Exit eligibility logic, and readiness rules in `src/lib/matchEngine.ts` are real. Member records, Aadhaar OTP, bank penny-drop verification, and claim settlement are simulated.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
docs/                   Planning and research documents (see above)
src/
  app/                  Next.js routes — one folder per screen
  components/           Shared UI (e.g. the mock-data disclosure banner)
  data/mockMembers.json Synthetic member profiles, one per failure mode
  lib/matchEngine.ts    Real pre-flight check logic
  types/member.ts       Shared TypeScript types
```

## Guardrails

- No real Aadhaar numbers, PAN, OTPs, bank details, or payment flows.
- No EPFO logo used in a way that implies endorsement.
- Persistent "independent hackathon prototype, simulated data" banner on every page.
- No connection to any real EPFO/UMANG system, at any point.
