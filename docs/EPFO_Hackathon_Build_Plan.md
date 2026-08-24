# Build Plan — EPFO Claim Pre-Flight

**One sentence:** Before a member submits a PF withdrawal, we check their Aadhaar / UAN / bank / employer records against each other, show them exactly what will get their claim rejected, and let them fix it on the spot — instead of finding out three weeks later with a code nobody can decode.

- **Deadline:** August 28, 2026, 8:00 PM IST. No grace period.
- **Today:** August 25. You have roughly 3.5 working days.
- **This plan covers one journey only.** Everything from the Blueprint that isn't this journey is future roadmap, stated in the video, not built.

---

## 1. The pain points we are actually solving

Ranked by how directly each one is demoable, not by how big it sounds.

| # | Pain point | Evidence | Are we building it? |
|---|---|---|---|
| 1 | **Name/DOB/bank mismatch across Aadhaar, UAN and bank records causes silent rejection** | EPFO's own FAQ + public rejection-code guidance sites; ~20–26% of claims rejected historically, primary cause is record mismatch | ✅ **Core — this is the demo** |
| 2 | **Missing Date-of-Exit blocks withdrawal with no explanation** | Confirmed common failure mode in public EPFO guidance | ✅ **Secondary screen, same journey** |
| 3 | **Rejection reasons are cryptic codes, not plain language** | e.g. "Annexure-K Mismatch" | ✅ **This is the UI fix for #1 and #2, not a separate feature** |
| 4 | **Three to five separate logins across the member's PF lifecycle** (main site, Member e-Sewa, EPFiGMS, UMANG, Jeevan Pramaan) | Confirmed live in `EPFO_Portal_Functionality_Map.md` | ⚠️ **Acknowledged in the demo narrative, not rebuilt** — out of scope, too big for 3.5 days |
| 5 | **Old PF accounts from previous employers never merged** | Confirmed common issue in public guidance | 🟡 **Nice-to-have if Day 3 has slack — do not let this block the core flow** |
| 6 | **Cheque-upload rejected for being blurry** | Confirmed common issue | 🟡 **One-line UI swap (photo upload → "instant bank check" mock), not a separate build item** |

**What we are explicitly not building:** a rewrite of EPFO's login system, real Aadhaar/UIDAI integration, real NPCI penny-drop, real UMANG replacement, employer-side tooling, pension calculation. Say this plainly in the video — it's an Honesty criterion, not a confession.

---

## 2. The one journey, screen by screen

```
Screen 1 — Login
  Mobile/UAN + OTP (mocked). No real Aadhaar auth.

Screen 2 — Balance & Claim Readiness
  Total balance (employee / employer / pension split).
  A single "Claim Readiness" indicator — not hidden until you try to file.

Screen 3 — "Why do you need money?"
  Tiles: Medical / House / Education / Leaving job / Retirement.
  System silently maps the answer to the correct form (19 / 31 / 10C) —
  the user never sees form numbers.

Screen 4 — Pre-Flight Check  ← THE CORE FEATURE, spend most of your time here
  Runs 3 checks against the mock member record:
    - Name match: Aadhaar name vs UAN name vs bank account name
        → fuzzy-match score shown, plain-language diff highlighted
    - Date of Exit: present / missing / self-declarable after 60 days
    - Bank account status: active / mismatched name (mocked "instant check",
      replaces cheque upload)
  Each failed check shows:
    - What's wrong, in one sentence
    - Exactly which document/action fixes it
    - A button that fixes it inline where believable (e.g. "Use Aadhaar name instead")

Screen 5 — Fix It Inline
  For the demo: pick ONE mismatch type (name mismatch) and make the fix
  flow fully interactive. The other two checks can show correctly but
  route to "contact employer" / "self-declare" without a deep fix flow.

Screen 6 — Submit & Status
  Submission confirmation + a real status timeline (not a spinner):
  Submitted → Pre-checks passed → Sent for processing → (mock) Credited.
  This replaces "silence for 20 days" with a visible state machine.
```

Six screens. That's the whole build. Resist adding a seventh.

---

## 3. Mock data — yes, you need it, and it's simple

You need exactly one thing: **a small set of fake member profiles where the fields disagree with each other on purpose.** That disagreement *is* the product.

### 3.1 Member profile schema (JSON, seed 4–6 of these)

```json
{
  "uan": "100912345678",
  "aadhaar_name": "RAJESH KUMAR SINGH",
  "uan_name": "RAJESH KUMAR",
  "bank_name": "R K SINGH",
  "dob_aadhaar": "1990-04-12",
  "dob_uan": "1990-04-12",
  "bank_account_status": "active",
  "employer": "Acme Textiles Pvt Ltd",
  "date_of_exit": null,
  "exit_declared_by": "employer",
  "days_since_last_contribution": 74,
  "balance": { "employee": 210000, "employer": 220000, "pension": 52000 },
  "previous_uans": ["100987654321"],
  "kyc_status": { "aadhaar": "verified", "pan": "verified", "bank": "pending" }
}
```

Build **4–6 of these**, each demonstrating one failure mode:
1. Clean profile — passes every check (control case, show this first)
2. Name mismatch (Aadhaar has middle name, UAN doesn't) — **your hero demo case**
3. Missing Date of Exit, >60 days since contribution — triggers self-declare path
4. Bank account name doesn't match — triggers "instant check failed"
5. Has an old, unmerged UAN — triggers the 1-click-merge nice-to-have if you build it
6. Fully broken (2+ issues at once) — good for a "before" screenshot in your video

### 3.2 What you do NOT need to mock

- Real Aadhaar/UIDAI API — a static JSON lookup by UAN is enough
- Real NPCI penny-drop — a 1.5-second fake "loading → verified/failed" is enough
- Real bank integration — same
- A real employer portal — the "employer hasn't marked exit" state is just a field on the member record above

### 3.3 Labeling rule (Honesty criterion)

Every mocked check gets a small visible tag in the UI — "Simulated check" or similar — the first time it appears on screen, plus the persistent banner from the FAQ requirement: *"Independent hackathon prototype — not affiliated with or endorsed by EPFO. All data is simulated."*

---

## 4. Chatbot, flows, maps, 3D — what's actually worth building

Answering this directly, not just listing options:

### Chatbot — **small role, not the centerpiece**
Don't build a generic chat box. The MCA brainstorming doc got this right: *"do not make the chatbot a generic ChatGPT clone."* The same applies here.
- **Use it for exactly one thing:** explaining a failed check in plain language when the user taps "why?" — e.g. "Your Aadhaar has a middle name your PF record doesn't. This is the #1 reason claims get rejected. Fixing it takes 30 seconds." That's it.
- Don't build a free-text "ask me anything about EPFO" box — it invites off-topic questions, hallucination risk, and judges specifically distrust generic wrappers per the brief's "Codex should be meaningfully involved... not something added only for the submission" language.
- This is your actual Codex/OpenAI-model usage point: the plain-language explanation of *why* a check failed is a genuinely good use of an LLM (turning a structured mismatch into a one-sentence, non-scary explanation), and it's small enough to ship reliably.

### Flow / state visualization — **yes, this is core, not decorative**
The claim status timeline (Screen 6) and the pre-flight check itself (Screen 4) *are* flow visualizations. This is where your design effort should concentrate — not a separate "flow diagram" feature, but making the existing screens read as a visible process instead of a black box. This single change is the entire pitch of the project.

### Maps — **skip it, or one small optional card at most**
EPFO's problem has no meaningful geographic dimension — unlike the MCA brainstorming doc's "where are companies registering" idea, there's no "where" question a PF claim needs answered. The only defensible map use is a "nearest EPFO office" locator, and that's solving a problem you're not scoping (Section 1, item 4). Skip it. If you have spare time on Day 3, a static "5 offices near you" list card is fine — do not build an interactive map for this.

### Three.js / 3D — **skip it for the core flow, honestly**
There's no part of "check my records, fix the mismatch, submit" that a 3D scene explains better than a clean 2D UI. Adding Three.js here is decoration hunting for a justification, and it actively works against you on two judged dimensions: **Usability** (*"designed for real Indian users, including people on mobile devices, slower connections"* — 3D scenes are exactly what breaks on a budget Android phone on 3G) and **time budget** (3.5 days, one journey). 

If you want *a* visual flourish, spend it on: the balance number animating up on load, the fuzzy-match score filling like a meter, the status timeline nodes lighting up in sequence. All CSS/SVG, all fast, all legible on a slow connection. That's more "wow" per hour of engineering than a 3D scene nobody asked for.

**Bottom line on tech choices:** chatbot (narrow), flow visualization (central), maps (skip), 3D (skip). Every hour you don't spend on maps/3D is an hour spent making the pre-flight check itself feel instant and obvious — that's what actually wins this.

---

## 5. Day-by-day plan (3.5 days left)

### Day 0 — today, remainder of Aug 25
- Lock the 6 screens above. No additions.
- Write the 4–6 mock member JSON records.
- Set up the Codex-driven scaffold (whatever stack you're fastest in — this doc is stack-agnostic on purpose).
- Build Screens 1–3 (login, balance, "why do you need money" tiles) — these are the easy, low-risk screens. Get them done first so any later time crunch protects Screen 4.

### Day 1 — Aug 26
- Build Screen 4, the pre-flight check engine, for real:
  - Name fuzzy-match (a real string-similarity function against the mock data — this is genuine logic, not fake)
  - DoE check (present / missing / self-declarable logic)
  - Bank check (mocked latency + pass/fail against the mock record)
- Build the plain-language explanation for each failure (this is your Codex/LLM integration point).

### Day 2 — Aug 27
- Build Screen 5 (inline fix for name mismatch) and Screen 6 (status timeline).
- Wire the whole journey end to end using at least 2 of your mock profiles (one clean pass, one with a caught mismatch).
- Add the mock/independent-prototype labeling throughout.
- Start recording rough demo footage as a backup in case Day 3 runs short.

### Day 3 — Aug 28 (submit by 8:00 PM IST)
- Morning: bug pass on the full journey with all 4–6 mock profiles. Fix anything that's on the demo path — **the brief's rule is "every feature you demo must work,"** so anything flaky gets cut from the demo, not left in and hoped-past.
- Midday: record the 2-minute video — minute 1 as a citizen walking the journey (use the name-mismatch profile, it's the clearest "before/after"), minute 2 explaining the Codex build process and what's mocked vs. real logic.
- Early afternoon: write the <250-word project summary.
- Deploy to a live public link, test it in an incognito window on mobile data before submitting.
- Submit well before 8:00 PM — there is no grace period.

---

## 6. What's real vs. mocked (put this table in your submission too)

| Component | Real | Mocked |
|---|---|---|
| Name fuzzy-match logic | ✅ Actual algorithm | |
| DoE / eligibility rules | ✅ Actual logic | |
| Plain-language explanations | ✅ Real LLM call | |
| Member records (Aadhaar/UAN/bank) | | ✅ Synthetic JSON |
| Aadhaar OTP login | | ✅ Simulated |
| Bank penny-drop check | | ✅ Simulated latency + result |
| Claim status/settlement | | ✅ Simulated timeline |
| UMANG/EPFiGMS/Jeevan Pramaan unification | | ❌ Not built — stated as future roadmap only |

---

## 7. Two-minute video outline

- **0:00–0:15** — Cold open on the problem: "1 in 5 PF claims get rejected. Here's why, and here's what nobody tells you until it's too late." Show the *current* EPFO cryptic-rejection pattern (screenshot/description, not a live site interaction).
- **0:15–1:00** — Citizen demo: log in → pick "medical emergency" → pre-flight catches the name mismatch → plain-language explanation → fix it inline → submit → status timeline. Use the hero mismatch profile.
- **1:00–1:30** — How it's built: Codex's role, the fuzzy-match/rules logic (real), what's mocked and why (Aadhaar/bank/NPCI — brief forbids live gov/financial integration).
- **1:30–2:00** — Why this matters at scale: reference the ~70M EPF members and the ~20–26% rejection rate, and name the one or two things (Section 1, items 4–5) you'd build next if selected.

---

## 8. Guardrails, restated

- No real Aadhaar numbers, PAN, OTPs, bank details, or payment flows — synthetic data only.
- No EPFO logo used in a way that implies endorsement.
- Persistent "independent hackathon prototype, simulated data" label.
- Do not attempt to log into or test the real EPFO/UMANG systems.
- Every screen you show in the video must actually work live — don't narrate a feature you didn't finish.
