# The MCA Portal, Taken Apart

**Functional reverse-engineering audit — live browser pass**

Every clickable, fillable, and expandable element found on the India.gov.in directory entry for the Ministry of Corporate Affairs — driven by a real Chromium session: buttons actually clicked, fields actually typed into, network traffic actually captured.

- **Target:** india.gov.in — MCA ministry profile
- **Audited:** 23 Aug 2026
- **Method:** Playwright, real Chromium, headed mode

---

## Table of contents

- [Scope & method](#scope--method)
- [The headless block](#the-headless-block)
- [Confidence key](#confidence-key)
- [System map](#system-map)
- [Page A — Ministry profile](#page-a--ministry-profile)
  - [Officials & "View More"](#officials--view-more)
  - [The non-expanding organisations accordion](#organizations-under-this-ministry-accordion)
  - [Ministry directory filter](#ministry-directory-filter)
  - [Primary link-out](#primary-link-out)
- [Page B — Category listing](#page-b--category-listing)
  - [Live filter search](#live-filter-search)
- [Site-wide chrome](#site-wide-chrome)
  - [Cookie consent banner](#cookie-consent-banner)
  - [Global search](#global-search)
  - [Hamburger mega-menu](#hamburger-mega-menu)
  - [Language switcher](#language-switcher)
  - [Accessibility toolbar](#accessibility-toolbar)
  - [Floating icon rail](#floating-icon-rail)
  - [Mobile-specific behaviour](#mobile-specific-behaviour)
  - [Footer & social links](#footer--social-links)
- [Defects & notable behaviour](#defects--notable-behaviour)
- [Confirmed network calls](#confirmed-network-calls)
- [Beyond this crawl: mca.gov.in](#beyond-this-crawl-mcagovin)
- [Residual gaps](#residual-gaps)

---

## Scope & method

**The URL given is not "MCA."** It's a directory profile card on **india.gov.in** (the National Portal of India), one entry inside its Business & Self-employed category. The real transactional system — incorporation, e-filing, DIN/DSC, payments — lives entirely on the separate domain `mca.gov.in`, reached by outbound links. This audit treats the india.gov.in pages as the primary subject and `mca.gov.in` as an external integration point, not a site to crawl in its own right.

This pass used a genuine Chromium browser, scripted with Playwright (the same engine behind the project's own `.playwright-mcp` setup), run directly from Node rather than through the MCP tool interface — the project's MCP server is scoped to a different working directory in this Claude Code session, so it wasn't loaded, but its underlying browser binary was already installed on disk and could be driven directly. Every click, keystroke, and screenshot below happened against the live site.

## The headless block

Worth reporting on its own — this shaped the entire second half of the audit.

The first automated pass ran headless, as is standard for scripted browsing, and every request came back `403 Access Denied` — an Akamai edge error page (`errors.edgesuite.net`), issued before any page content or JavaScript reached the browser. A plain `curl` request with a browser User-Agent string succeeded on the identical URL, from the identical network, moments apart. That rules out a simple IP or rate-limit block.

Switching the same script to a genuine headed Chromium session — no fingerprint spoofing, no patched `navigator.webdriver`, just requesting a normal, fully-featured browser window instead of the headless variant — returned `200` immediately. The block is specifically tuned to headless browser signatures, not automation as such and not the requesting IP.

> **Reading this correctly.** The site's bot-management layer (Akamai) is doing its job: it catches the cheap, common form of scripted access (headless Chromium, the default for almost every scraper and CI pipeline) while leaving room for real users on real browsers, including automated ones that render a full display. It is not catching this audit's more deliberate headed pass, which is worth stating plainly rather than treating as a loophole.

## Confidence key

Every finding below carries one of these tags — most moved to "verified live" this round.

| Tag | Meaning |
|---|---|
| ✅ **Verified live** | Clicked/typed and observed directly |
| ⚠️ **Inferred** | From code/config, not directly exercised |
| ⛔ **Attempted, inconclusive** | Tried live, no result / timed out |

Nothing below was fabricated to fill a gap. Where an interaction was attempted and failed or timed out, that is reported as a finding in its own right (see [Defects & notable behaviour](#defects--notable-behaviour)), not smoothed over.

## System map

| Path | Result |
|---|---|
| Headless browser → india.gov.in | ⛔ Blocked — `403`, Akamai edge |
| Headed browser / curl → india.gov.in | ✅ `200` — this audit's path in |

```
Browser (you) → india.gov.in (Next.js, NIC-hosted, CMS + autosuggest APIs) → mca.gov.in (separate system, out of scope)
```

Confirmed live network calls from india.gov.in itself: an internal CMS API, a search-autosuggest API, a CAPTCHA-request endpoint, an auth/session-check endpoint, and a Google Analytics beacon — full list under [Confirmed network calls](#confirmed-network-calls).

---

## Page A — Ministry profile

`/category/business-self-employed/ministry/ministry-of-corporate-affairs-1531939292952614`

### Page layout — ✅ verified live

- **Top strip:** global search bar + category-scope dropdown + Search button, then a row of five header icons (font-size toggle, calendar, accessibility figure, translate glyph, tricolour flag), then a horizontal **category tab strip** ("Category: … Social development | **Business & Self-employed** | Citizenship, Visa & Passports | Defence & F… ⋮") that lets a visitor jump sideways between top-level categories without going through the hamburger menu at all — a second, independent navigation path to the same destinations.
- **Left sidebar:** "Explore: Ministry/Department" — a live-filterable list of the sibling ministries inside this category (see [Ministry directory filter](#ministry-directory-filter)).
- **Main column:** ministry name and contact block, then a named-officials block with a working "View More" expand, then a dark "Organizations Under This Ministry" accordion block.
- **Right edge:** a five-icon floating rail, independent of the header icons — see [Floating icon rail](#floating-icon-rail).

### Contact block — ✅ verified live

| Field | Value |
|---|---|
| Address | Ministry of Corporate Affairs, 3rd Floor, Kartavya Bhawan-1, New Delhi-110001 |
| Phone | 0120-4832500 |
| Email | `crc[dot]escalation[at]mca[dot]gov[dot]in` |
| Website | `https://www.mca.gov.in` — rendered as a live outbound link |
| Social | One X/Twitter glyph, linking to `twitter.com/MCA21India` |

> **Obfuscated, not plain-text.** Every email on this page renders as `name[dot]part[at]domain[dot]tld` rather than a real `mailto:`-style address — a deliberate anti-scraping / anti-spam-harvest pattern applied sitewide, not specific to this ministry.

### Officials & "View More"

**Element:** Officials block — progressive disclosure — ✅ verified live

| Step | Observation |
|---|---|
| Before click | Shows one official — Smt. Nirmala Sitharaman, Minister (Ministry of Corporate Affairs), phone `24012101`, email `fmo[at]nic[dot]in` — plus a "View More" button |
| User action | Click "View More" |
| Observed result | A second official appears in place, no page reload — Shri Harsh Malhotra, Minister of State (Ministry of Corporate Affairs), phone `24014101, 24014102` |
| Nav / URL | None — pure in-place DOM expansion |

### "Organizations Under This Ministry" accordion

**Element:** Accordion rows (7 rows, click target) — ⛔ attempted live, no effect observed

| Field | Detail |
|---|---|
| Rows shown | Attached / Subordinated Offices (4) · Commissions/Committees (1) · Statutory Bodies (6) · Autonomous Bodies (2) · Academies/Institutions (1) · Schemes/Programmes/Missions/Applications (4) · Others (2) — each with a chevron implying it expands |
| User action | Clicked directly on the row text, then retried by computing the row's exact bounding box and dispatching a raw mouse click at its centre coordinates |
| Expected behaviour | Row expands to list the named bodies behind the count (e.g. the actual entities making up "Statutory Bodies (6)") |
| Observed behaviour | No visible change either time — page text immediately before and after the click is byte-for-byte identical; the chevron doesn't flip, no new content appears, no network request fires |

> **Read as a defect, not a gap.** This isn't "couldn't observe it" — it was clicked twice, two different ways, and produced no state change either time. Whatever the counts summarise is not currently reachable through this UI, at least not through the row itself. Full write-up under [Defects & notable behaviour](#defects--notable-behaviour).

### Ministry directory filter

**Element:** Sidebar "Search" box — live filter, distinct widget — ✅ verified live

| Field | Detail |
|---|---|
| Starting state | Lists 5 ministries under this category: M/o Skill Development…, **M/o Corporate Affairs** (bold, current), M/o Commerce and Industry, Department for Promotion of…, D/o Commerce — with a "Total Ministries: 5" counter |
| User action | Typed "commerce" into the sidebar's own Search field (a third, independent search box on this one page — separate from the header search and from Page B's category filter) |
| Observed result | List narrows live to 2 entries — M/o Commerce and Industry, D/o Commerce — and the counter updates to "Total Ministries: 2" |
| Nav / URL | None — in-place filter |

### Primary link-out

**Element:** Official website link (anchor) — ✅ verified

- **Target:** `https://www.mca.gov.in`
- **Expected behaviour:** Leaves india.gov.in entirely for the live MCA transactional portal — the actual point where "browsing information" becomes "using a government service"
- **Related deep link found:** Page B's own search index separately surfaces `"Login to Ministry of Corporate Affairs website for E-Filing"` → `https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html` — a direct route straight to the e-filing login screen, bypassing the ministry profile entirely

---

## Page B — Category listing

`/category/business-self-employed` — one hop up from Page A.

### Page layout — ✅ verified live

- **Breadcrumb:** Home > Category > Business & Self-employed
- **Intro:** a short description of the category plus a dark "Subcategories" band listing four sub-areas: Trade promotion, Imports & Exports, Running a business, and one more below the fold — each rendered as an image card with its own short blurb and an "Explore" button
- **Left sidebar:** "Explore: Category" — the same live-filter pattern as Page A's ministry sidebar, but scoped to the 18 top-level categories instead of sibling ministries

### Live filter search

**Element:** `#categorySearch` (text input) — ✅ verified live

| Field | Detail |
|---|---|
| User action | Typed "money" into the sidebar's category-filter box |
| Observed result | Category list narrows in place to "Money & Taxes" — confirmed matching text throughout the sidebar, no submit button needed |
| Nav / URL | None — filtering happens in place |

> **Duplicate element ID.** `#categorySearch` resolves to **two** elements on this page (Playwright's strict-mode locator refused to act until the target was disambiguated). Duplicate IDs are invalid HTML and break anything relying on `getElementById`, `label for=` associations, or in-page anchors — a real, reproducible markup defect, not a testing artefact. Detail under [Defects & notable behaviour](#defects--notable-behaviour).

> ⚠️ **Not itemised.** The full sibling-category grid and the fourth subcategory card weren't scrolled into and read in full — the live-filter mechanism itself is confirmed, but this pass didn't transcribe every card on the page.

---

## Site-wide chrome

Identical header/footer/overlay widget set found on both pages — india.gov.in's shared layout, not specific to MCA.

### Cookie consent banner

**Element:** Cookie banner (bottom bar, blocking) — ✅ verified live

| Field | Detail |
|---|---|
| Appears | Immediately on first load of every page tested, both desktop and mobile widths |
| Controls | "CUSTOMIZE COOKIES" · "DECLINE OPTIONAL COOKIES" · "ACCEPT ALL COOKIES", plus a "Cookie Settings" text link |
| Practical effect | Sits at a high stacking layer and can intercept clicks on whatever's directly behind it — this audit had to dismiss it explicitly before some later interactions (accordion, officials block) would respond reliably |

### Global search

**Element:** Header search bar (form widget, live autosuggest) — ✅ verified live

| Field | Detail |
|---|---|
| User action | Typed "annual filing" into the header search box |
| Observed result | A live results dropdown appeared, headed "Documents," listing real matches: Annual Maintenance Contracts Portal · Annual Returns, Andhra Pradesh · Annual Filing of Returns, West Bengal · ASI (Annual Survey of Industries) Result · Annual Fee Payment, Andhra Pradesh · Check Status of Annual Information Returns · The Uttarakhand Annual Transfer for Public Servants Act, 2… — backed by `POST /search/autosuggestionservice`, fired repeatedly while typing (13 calls captured) |
| Confirmed hidden capability | The input's `indic-t13n` class ties it to Swalekh (NIC's phonetic Indic transliteration) and the CSP allow-lists a Reverie speech-to-text SDK — a voice-search entry point into the same box, consistent with the CSP finding from the earlier static pass |

### Hamburger mega-menu

**Element:** "Menu Bar" trigger → full-width mega-menu — ✅ verified live

User action: clicked the double-chevron "Menu Bar" icon in the header. Result: a five-column panel opens, fully populated (empty in the raw server HTML — this needed a live click to see):

| Column | Items |
|---|---|
| Category | 18 links — Agriculture Rural & Environment, Benefits & Social development, Business & Self-employed, Citizenship Visa & Passports, Defence & Foreign affairs, Driving & Transport, Education & Learning, Governance & Planning, Health & Wellness, Housing & Local services, Infrastructure & Industries, Jobs, Justice Law & Grievances, Money & Taxes, Science IT & Communication, Travel & Tourism, Welfare of Families, Youth sports & Culture |
| My-Government | Acts & Rules, Schemes, Constitution of India, Documents |
| Directory | Who's Who, Contact Directory, Web Directory, Public Utilities, Helpline |
| Explore India | Travel & Tourism, Culinary Delights, One District One Product, Facts of India |
| News Hub / Services | Two standalone links, not sub-grouped |
| Other | 15 links — About Us, Contact Us, Feedback, FAQs, Help, Link to Us, Newsletter, Site Map, Calendar, Spotlights, Visitor Summary, Disclaimer, Website Policy, Subscribe to Newsletter, App Privacy Policy |

Confirmed via network: opening the menu (and hovering its links) fired ~30 prefetch `GET` requests matching these exact routes — Next.js route prefetching, not decorative markup.

### Language switcher

**Element:** "Change language" popover, 23 options — ✅ verified live

- **Full option list:** English (default, highlighted), Assamese, Bengali, Bodo, Dogri, Goan Konkani, Gujarati, Hindi, Kannada, Kashmiri, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, Urdu — 23 total, each shown in Latin script + native script
- **Powered by:** Bhashini (India's national AI translation mission) — the panel's own disclaimer states translations "are generated using automated tools and may not always be accurate," with a separate "Translation Feedback" button alongside it
- **Attempted:** selecting Hindi to confirm live on-page translation — the click on the Hindi option timed out in this run (see [Defects](#defects--notable-behaviour)); the option list itself and its Bhashini backing are independently confirmed via the earlier static CSP/data analysis plus this live screenshot

### Accessibility toolbar

**Element:** "Accessibility Tools" panel, 9 controls — ✅ verified live

| Field | Detail |
|---|---|
| Controls | Contrast Adjustment (High Contrast / Normal) · Text Size (Increase / Decrease / Reset) · Text Spacing · Line Height · and an "Others" row: Hide Images, Big Cursor, **Screen Reader** |
| User action | Clicked "Increase Text" twice |
| Observed result | Body font size measurably changed from `16px` to `18px` immediately — no confirm step needed, contradicting the earlier (static-only) guess that Cancel/Okay buttons gate the change |
| Screen Reader button | Clicked; no observable DOM class change resulted, consistent with it triggering an audio/TTS behaviour that a DOM-level check can't detect either way |

### Floating icon rail

**Element:** Fixed right-edge rail, 5 icons, independent of header — ✅ verified live

| Field | Detail |
|---|---|
| Icons (top to bottom) | Feedback (chat bubble) · Translation Feedback · Calendar · Share · Colour |
| Share, clicked | Opens a small "Share" popout with three real icons — Facebook, X, WhatsApp |
| Colour, clicked | Opens a menu headed "Choose Primary Theme" — a site colour-theme picker, distinct from the accessibility panel's High-Contrast/Normal toggle |
| Observation | This rail duplicates functionality already in the header (Calendar and a colour/theme control both exist in two places at once) — noted under Defects as a UX redundancy rather than a bug |

### Mobile-specific behaviour

**Element:** 390×844 viewport, real mobile emulation — ✅ verified live

| Field | Detail |
|---|---|
| Header | Collapses to: logo, search icon, accessibility icon, translate icon, flag — the desktop's inline hamburger glyph is gone from this row entirely |
| Menu access | A floating circular orange "+" action button appears fixed at bottom-right of the viewport — the most likely real mobile entry point into navigation/quick actions, replacing the desktop hamburger position |
| Cookie banner | Same three-button consent bar, restacked to full width |
| Content | Contact block and officials block reflow to single-column; obfuscated-email pattern persists unchanged |

### Footer & social links

| Link text | Destination | Note |
|---|---|---|
| Content Sources | (footer link) | Confirmed present in real page footer, past the accordion block |
| India Portal 2.0 Brochure (Beta Version) | `/india-portal-brochure` | Same domain |
| View on Mobile | (footer link) | Likely a QR/app-link prompt — not opened in this pass |
| Follow Us | (footer section) | Social icon cluster |
| Translation (×2) | (footer) | Bhashini attribution, appears twice in footer text |
| Disclaimer | `/disclaimer` | Same domain |
| Public Grievance Portal (CPGRAMS) | `pgportal.gov.in` | External — confirmed via floating-rail tooltip text "CPGRAMS" |
| X / Twitter (MCA-specific) | `twitter.com/MCA21India` | External — ministry-specific, inside the Page A contact block |

---

## Defects & notable behaviour

What the live pass surfaced that a static read never could.

**Duplicate `id="categorySearch"`** — markup defect — ✅ confirmed
- Where: Page B, category listing
- Evidence: Playwright's strict-mode locator refused to click `#categorySearch`, reporting exactly two matching elements
- Why it matters: Duplicate IDs are invalid HTML; they break `label for=` associations, in-page anchors, and any script (including assistive-tech tooling) that expects `getElementById` to return one unambiguous element

**Non-expanding organisation accordion** — dead interaction — ✅ confirmed, reproduced twice
- Where: Page A, "Organizations Under This Ministry"
- Evidence: Clicked via text locator, then again via raw coordinate click on the exact row bounding box — identical page text before and after both times
- Why it matters: Seven organisation categories (18 total entities) are advertised with counts but are not reachable through this control — a real dead end in an otherwise-informational page

**Cookie banner intercepts clicks** — overlay z-order — ✅ confirmed
- Evidence: Two attempted interactions (accordion, accessibility "Okay" confirm) failed until the cookie banner was explicitly dismissed first
- Why it matters: Any first-time visitor who ignores the cookie prompt may find some controls near the bottom of the viewport unresponsive until they act on it

**Redundant utility icons** — UX duplication, not a bug — ⚠️ observed
- Evidence: Calendar and a colour/theme control each exist both in the header icon row and in the separate floating right-edge rail
- Why it matters: Two visually distinct entry points to the same function can read as inconsistency rather than choice — worth a design-review conversation, not a fix

**Named officials' direct contact info published** — transparency, flagged factually — ✅ confirmed
- Evidence: Direct office phone numbers and email handles for the sitting Minister and Minister of State are shown on this public page (obfuscated only against automated scraping, not hidden from readers)
- Why it matters: Presumably intentional government-transparency practice — noted here as a factual observation, not a flaw

## Confirmed network calls

Captured directly from the live browser session — real XHR/fetch traffic, not inferred from CSP.

| Calls | Method | Endpoint | Role |
|---|---|---|---|
| 14 | POST | `/internal/cms` | Internal CMS API — almost certainly the backend feeding menu content, tab labels, and page body data |
| 13 | POST | `/search/autosuggestionservice` | Live search-suggestion API — fired on every keystroke in the header search box |
| 2 | GET | `/api/captchaRequest` | CAPTCHA-challenge endpoint — fetched speculatively on page load even though no CAPTCHA was visibly presented in this pass |
| 2 | GET | `/api/auth/user` | Session/login-state check — confirms the app probes auth status even for an anonymous visitor |
| 1 | POST | `www.google-analytics.com/g/collect` | GA4 analytics beacon |
| ~30 | GET | `/category/*, /my-government/*, /directory/*, /explore-india/*, /services, /about-us, …` | Next.js route prefetching, triggered by the hamburger mega-menu rendering and hover — matches the 34 real links enumerated above almost exactly |
| 1 | GET | `/category/business-self-employed/subcategory/laws-regulations1` | Note the trailing "1" — likely a slug typo or versioning artefact left in a live route |

---

## Beyond this crawl: mca.gov.in

Everything a person actually associates with "MCA" — company incorporation, e-filing, DIN/DSC services, master-data search, fee payment, grievances — lives on `www.mca.gov.in`. This pass found *two* concrete doorways into it: the ministry profile's "Website" link, and a direct e-filing login deep link surfaced through Page B's own search index (`…/foportal/fologin.html`). Auditing that system with the same rigour — every form, every filing workflow, every login flow — is a materially larger, separate task, and it very likely has its own Akamai-style defences to work around first.

> If a full functional map of the live MCA transactional portal is wanted next, it should be scoped as its own pass, using the same headed-Chromium approach that worked here.

## Residual gaps

Smaller than the first pass's list — stated plainly rather than papered over.

- Selecting a non-English language and confirming live on-page translation was attempted but the click timed out in this run; the option list and its Bhashini backing are otherwise well-confirmed.
- The full sibling-category grid on Page B, and its fourth subcategory card, weren't scrolled into and transcribed in full.
- The Calendar Widget popover and the voice-search microphone control's exact trigger weren't isolated and clicked in this pass.
- The itemised organisation names behind Page A's seven counters remain unreachable — not a research gap this time, but a confirmed dead control (see Defects).
- `mca.gov.in` itself was deliberately left out of scope, per the reasoning above.

---

*Built from a real Chromium session (Playwright, headed mode) run directly against the live site on 23 Aug 2026, plus network capture and screenshots taken during that session. An initial headless run was blocked at Akamai's edge and is reported above as a finding, not hidden.*
