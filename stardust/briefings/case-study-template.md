<!-- stardust:provenance
  generated_by: briefings
  date: 2026-04-26
  synthesized_inputs:
    - module library shape and naming — composed by the assistant from the agreed format (B+C: image-immersive design piece with process documentation, modular order). Modelic must rename or reshape modules during real authoring.
    - per-instance section orders — assistant-suggested defaults; Modelic re-composes for each project at authoring time.
    - all # Copy strings — placeholders. Real case-study copy is authored against this template per project; the template itself only commits structural and tonal contracts.
  note: One template; renders eight case-study pages (/utah-food-bank, /badgley-mischka, /siriusxm, /hugger-mugger, /cnp, /schumacher-homes, /olympic-eyewear, /cinelli-usa). Modular structure: Modelic picks 6–10 modules per project from the library and orders them per project.
-->
---
page: Case Study (Template)
path: /case-studies/{slug}
type: custom
template: case-study
instances:
  - slug: utah-food-bank
    legacy_path: /utah-food-bank
  - slug: badgley-mischka
    legacy_path: /badgley-mischka
  - slug: siriusxm
    legacy_path: /siriusxm
  - slug: hugger-mugger
    legacy_path: /hugger-mugger
  - slug: cnp
    legacy_path: /cnp
  - slug: schumacher-homes
    legacy_path: /schumacher-homes
  - slug: olympic-eyewear
    legacy_path: /olympic-eyewear
  - slug: cinelli-usa
    legacy_path: /cinelli-usa
---

# Intent

A case-study page is the **deepest single artifact** on the site. It is read by two audiences in parallel — a decision-maker who wants enough proof and process to feel confident commissioning similar work, and a design peer (or talent, or future collaborator) who wants to see the craft itself. Both should feel rewarded.

The page is **image-immersive** — photography of the work carries it — with process documentation woven through. It is not a sales narrative. By the bottom of the page the visitor should believe (a) Modelic understood the client's actual problem, (b) the decisions were considered, (c) the outcomes were real, and (d) the work itself looks good at full size.

# Audience

**Primary, in priority order:**

1. **Decision-makers at brands evaluating Modelic for similar work.** Arrived from `/work` or via a direct link from a referral. Looking for: "did they understand a problem like ours, and did the work ship at a level we'd recognise?"
2. **Design peers, future collaborators, talent.** Arrived from a portfolio link or from `/team`. Looking for: "is the craft real?"

The page accommodates both audiences with the same content — the decision-maker reads the process and outcomes, the peer reads the imagery and craft notes. Neither audience needs a separate version.

# Key Messages

1. **The client had a specific problem, not a category problem.** Frame the brief in the client's language, not in agency category-speak. "Donor checkout drop-off above the fold" beats "improve user experience."
2. **The decisions were considered.** The case study earns its length by showing the calls Modelic made, the alternatives weighed, the tradeoffs accepted. Not a play-by-play — the *load-bearing* decisions.
3. **The work itself can be seen.** Full-bleed photography, real screenshots, real artifacts. No mockup-on-MacBook mockups, no over-styled phone-on-marble.
4. **The outcomes are named in numbers when possible.** Conversion lift, performance gain, accessibility audit pass — the metric and its source. When numbers aren't available, qualitative outcomes (shipped on time, passed audit, retained for v2) are acceptable but should be specific.
5. **Modern toolkit shows up where it shipped.** A case study that involved AI tooling, modern composable commerce, or a particular framework choice may quietly note it. Per-project, per-decision — never as a page-wide claim.

# Calls to Action

- **Primary:** "Start a project conversation" → `/contact`. Anchored in the closing CTA fragment at the bottom of the page.
- **Secondary:** "More work" → `/work`. Lives in the **Related Work** module just before the closing CTA.
- **Tertiary:** "How we work" → `/approach` (or the relevant `/services/{discipline}` page). Optional, contextual — used when a process module references the approach explicitly.

# Tone

Editorial. The case study is the page where Modelic is allowed to be a writer, not just a marketer. Body paragraphs can be 4–6 sentences. Pull quotes (from the client or from Modelic) are encouraged. Process notes can be technical where the audience benefits — engineering decisions, accessibility tradeoffs, brand exploration cul-de-sacs.

Tonal rules layered on the site-wide tone:

- **Frame the brief in the client's voice.** The first content module should read as if the client wrote it. Modelic enters the page in the *decisions* and *approach* modules, not in the brief.
- **Specifics over adjectives.** *"Conversion lift was 34% over the prior six-month baseline, driven primarily by the new mobile checkout flow"* lands. *"Significant conversion improvement"* does not.
- **Show the work that didn't ship, when it sharpens the work that did.** A scrapped concept, a brand direction we left behind, an engineering approach we walked back from — these are credibility, not waste.
- **Real names where the client allows them.** A designer or engineer named in the page is more believable than "the Modelic team." Cross-link to `/team` profiles where they exist.
- **AI / modern-toolkit references are *per-decision*, not per-page.** *"The catalog migration used an LLM-driven attribute-extraction pipeline that cut manual mapping by ~70%"* — concrete, scoped, useful. Not a section about technology.
- Forbidden, layered on site-wide list: "challenge → solution → result" framing in those exact words; "the Modelic team"; "delivered"; "hand-in-hand"; "synergy"; "aligned"; "best-in-class".

# Modular Structure

Each case study composes its page from the **module library** below. Modelic picks 6–10 modules per project and orders them per project. **Always present:** Hero, At-a-Glance, Related Work, Closing CTA. Everything else is optional and re-orderable.

This is the template's central design choice. A commerce project might lead with engineering, a brand project with exploration, an accessibility project with audit findings — the template doesn't enforce a single narrative arc, it provides a library of beats.

## Module library

### M1. Hero *(always present, always first)*
- Full-bleed signature image of the work — typically the case study's marquee asset.
- Overlay or below-fold: client name, project title, single 1-line outcome.
- This is the same image used in the `/work` tile for this project.

### M2. At-a-Glance *(always present, second)*
- A small fact strip. Year · Services · Scope · Team · Stack (if relevant) · Status (live / archived).
- Optional metric pull-out — the headline outcome number, displayed once at the top.
- Treated quietly — not a hero block. A reference card the visitor scans without dwelling.

### M3. The Brief *(in the client's voice)*
- 1–2 paragraphs framing what the client came to Modelic with.
- Written as if the client wrote it. No Modelic perspective yet.

### M4. Discovery *(when there was meaningful research)*
- 1–3 paragraphs on what was learned in discovery — audit findings, user research, internal-team conversations.
- Pair with imagery: research artifacts, audit screenshots, before-state captures.

### M5. The Decisions
- The load-bearing calls Modelic made and why. 2–4 decisions max — not a full retrospective.
- This is the page's most editorial module. Allowed to use first-person perspective ("we chose to...").

### M6. Brand / Design Exploration *(when applicable)*
- Photography and artifacts from the visual exploration.
- Image-immersive — minimal copy. Captions only.
- Includes work that didn't ship when it sharpens what did.

### M7. Build / Engineering *(when applicable)*
- The technical story: stack choices, performance work, integrations, the parts that were hard.
- Allowed to be specific (named technologies, real metrics).

### M8. Accessibility / Compliance *(when applicable)*
- Audit findings, remediation work, conformance level achieved, ongoing process.
- Default for every project where Accessibility was a service tag.

### M9. Modern Toolkit *(when applicable, quiet)*
- One short module — 1 paragraph — naming where AI / modern composable commerce / modern CMS changed how the work shipped on this specific project.
- Skipped on most projects. Not every case study has this module.

### M10. The Work *(the gallery)*
- Full-bleed image gallery. Real screenshots, real photography, real artifacts.
- Captions per image, optional. Auto-advance OFF; visitor scrolls on their own.
- This is the **biggest module by page-real-estate**. Editorial pacing.

### M11. Outcomes
- The metrics module. Numbers where available, qualitative results where not.
- Always cite the source (date range, baseline) — "+34% conversion vs. prior six-month baseline."
- Pair with a client quote if one is available.

### M12. Client Quote *(when available)*
- One pull-quote, set large. Real attribution (name, role, company).
- Used at most once per case study.

### M13. What We'd Do Next *(optional, partnership-flavored)*
- 1 paragraph — what's the natural next move on this engagement, or what Modelic would explore in a v2.
- Cashes the "partner, not vendor" framing for this specific project.

### M14. Team *(optional)*
- Names + roles of the Modelic people who shipped this. Cross-links to `/team` profiles.
- Skipped if the client engagement was confidential or if Modelic prefers to keep team attribution in `/team` only.

### M15. Related Work *(always present, second-to-last)*
- 2 `case-study-tile` fragments from `/work`, curated for relevance.
- Block CTA: **"More work →"** → `/work`.

### M16. Closing CTA *(always present, last — fragment from `/contact`)*
- Headline (working draft, per-project variant suggested): **"Have a {discipline-noun} project in mind?"** — *e.g., for Utah Food Bank: "Have an accessibility project in mind?"*
- Body: **"Send us an email or call us at 801-363-0101. We're here weekdays, 8:30 am – 5:30 pm Mountain Time."**
- Primary CTA: **"Start a project conversation"** → `/contact`

# Copy

> The template owns structure and tone, not strings. Per-instance copy is authored at the case-study level. Working drafts for module headers and section eyebrows below — Modelic adjusts per project.

## Section eyebrows (working drafts)

- M3 The Brief: **"The brief"**
- M4 Discovery: **"What we learned"**
- M5 The Decisions: **"What we decided"**
- M6 Brand / Design Exploration: **"Exploration"** *(or "Design" or "Brand exploration" per project)*
- M7 Build / Engineering: **"How it was built"**
- M8 Accessibility: **"Accessibility"**
- M9 Modern Toolkit: omit eyebrow — module reads as a continuation.
- M10 The Work: **"The work"** *(or omit — let the imagery open)*
- M11 Outcomes: **"What changed"**
- M12 Client Quote: omit — quote is its own block.
- M13 What We'd Do Next: **"What's next"**
- M14 Team: **"The team"**
- M15 Related Work: **"More work"**

## Closing CTA copy

- See M16 in the module library above. Per-project headline variant per instance.

# Imagery

> The imagery contract is the **defining feature** of this template. Every case study is image-led; copy lives between the images.

## Imagery rules

- **Real, not mocked.** No phone-on-marble, no laptop-on-desk product mockup, no over-rendered "device frame" treatment of a website screenshot. Use the work's real screenshots at full fidelity, real photography of physical artifacts, real video stills.
- **Full-bleed by default in M10 (The Work).** The gallery module uses edge-to-edge images. Other modules can use contained images at consistent crop ratios.
- **Captions are part of the page.** A caption is allowed to do real work — name the deliverable, attribute the photographer, point at the detail that matters. Not decorative.
- **The Foam wash is OFF on case-study photography.** This is the page where photography needs to read true. Foam wash treatment is reserved for the Hero module *only* if a project's source photography is too neutral to anchor the page open — and only at lower opacity than on the legacy hero treatment.
- **Process artifacts welcome.** Sketches, wireframes, pre-launch screenshots, audit reports, brand-system pages — these are imagery, not afterthoughts. They earn full-bleed treatment in M4 (Discovery) and M6 (Brand / Design Exploration).
- **Alt text is the page's accessibility anchor.** Every image has alt text written for the case-study's actual subject — not "screenshot of website."

## Source

Per-instance — each case study supplies its own image library. Modelic's existing case-study pages have hero crops; the refresh likely needs additional imagery commissioned or pulled from each project's archive.

# Per-instance variants

> Each instance picks its module order and supplies its strings. Defaults below — Modelic re-composes per project at authoring time. Module orders are *suggestions*, not contracts.

## Utah Food Bank

- Slug: `utah-food-bank`
- Suggested module order: M1 → M2 → M3 → M4 (audit-led discovery) → **M8 (accessibility — primary)** → M5 → M11 → M12 (Utah Food Bank quote if available) → M15 → M16
- Lead discipline: Accessibility · Commerce
- Modern Toolkit module: skip (existing site language doesn't reference it; commit only if real)

## Badgley Mischka

- Slug: `badgley-mischka`
- Suggested module order: M1 → M2 → M3 → **M6 (brand exploration — primary)** → M7 → M10 → M11 → M15 → M16
- Lead discipline: Brand · Commerce

## SiriusXM

- Slug: `siriusxm`
- Suggested module order: `[TBD — needs Modelic to confirm engagement scope first; this case study's framing is uncertain]`
- Lead discipline: `[TBD]`

## Hugger Mugger

- Slug: `hugger-mugger`
- Suggested module order: M1 → M2 → M3 → M5 → **M7 (build — primary)** → M10 → M11 → M15 → M16
- Lead discipline: Commerce

## CNP

- Slug: `cnp`
- Suggested module order: `[TBD — like SiriusXM, needs Modelic framing first]`
- Lead discipline: `[TBD]`

## Schumacher Homes

- Slug: `schumacher-homes`
- Suggested module order: M1 → M2 → M3 → M5 → **M7 (build — primary, configurator)** → M10 → M11 → M13 → M15 → M16
- Lead discipline: Brand · App

## Olympic Eyewear

- Slug: `olympic-eyewear`
- Suggested module order: M1 → M2 → M3 → M5 → **M7 (build — primary)** → M10 → M11 → M15 → M16
- Lead discipline: Commerce
- Modern Toolkit module: candidate for M9 if the wholesale/B2B catalog work involved AI-driven catalog operations.

## Cinelli USA

- Slug: `cinelli-usa`
- Suggested module order: M1 → M2 → M3 → **M6 (brand — primary, heritage marque)** → M10 → M7 → M11 → M15 → M16
- Lead discipline: Brand · Commerce
