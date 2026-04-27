<!-- stardust:provenance
  generated_by: briefings
  date: 2026-04-26
  synthesized_inputs:
    - working-draft outcome lines per case study — synthesized from the public client list and discipline cues; the user has not committed final outcomes per project. Real metrics need to be supplied by Modelic before the page ships.
    - section eyebrow / intro headline drafts — assistant-drafted to match the agreed Tone; user approved tile pattern and rhythm, copy strings are placeholders.
  note: Brainstormed inline with stardust:briefings (loop tight, three questions). Index pattern locked: 2-1-2-1 measured editorial rhythm, image + client + 1-line outcome per tile.
-->
---
page: Work
path: /work
type: landing
---

# Intent

The Work page is the proof. A decision-maker arriving here should be able to scroll through eight named projects, recognise a few clients, and feel — without reading any sentence twice — that Modelic ships across commerce, brand, accessibility, and app work at a level worth a conversation. The page is image-first and outcome-light: the photography does the persuading; copy stays out of its way. By the bottom of the page the only natural next steps are (a) opening a specific case study, or (b) starting a project conversation.

# Audience

Same primary audience as `/`: decision-makers at brands evaluating an agency. They've come to `/work` either directly (from search or a referral that named the page) or one click in from the home Selected Work block. Their question is "do they ship work like ours?", not "what services do they offer?" — services live elsewhere.

Secondary: industry peers and design talent reviewing the body of work. The page accommodates them but isn't tuned for them.

# Key Messages

1. **Eight named clients across four disciplines.** The breadth is the point — commerce, brand, accessibility, app — but the depth (specific named clients, not generic logos) is what earns trust.
2. **The work is curated, not catalogued.** The visual rhythm signals that someone chose what to show and how to show it. This is not a portfolio dump.
3. **Outcomes belong to the client, not to us.** Each tile names what shipped and what changed for the client — never "we delivered" framing.
4. **Modern toolkit shows up where it shipped.** A case study that involved AI / modern commerce tooling can carry that signal as a quiet tag — never as a headline claim across the page.

# Calls to Action

- **Primary:** open a case study → `/case-studies/{slug}`. Each tile is its own CTA; the whole tile is clickable.
- **Secondary:** "Start a project conversation" → `/contact`. Anchored in the closing CTA fragment at the bottom of the page.
- **Optional eyebrow control:** filter chips (Commerce · Brand · Accessibility · App) above the index. Quiet treatment; not the headline. May be deferred to v2 if the prototype phase finds the index works fine without them.

# Tone

The Work page is the **least chatty** page on the site. Image-first means image-led — the copy on a tile is one client name and one outcome line, full stop. No section preambles, no "selected work spans many disciplines" filler. The page intro is one short sentence, optional.

Tonal rules layered on top of the site-wide tone:

- Outcome lines are written in the **client's voice**, not Modelic's. *"Donations portal that meets WCAG 2.1 AA"* — not *"We built an accessibility-conformant donations portal."*
- Numbers when they exist; no numbers when they don't. Empty metric slots are worse than no metric.
- One AI / modern-toolkit tag *per relevant project*, never as a page-level claim.
- Forbidden, layered on the site-wide list: "showcase", "portfolio", "case study collection", "delivered", "executed", "transformed".

# Copy

> Working drafts. Outcome lines per project are placeholders pending real metrics or commit-able phrasing from Modelic.

## Page Intro

- Eyebrow: **"Work"** *(may be omitted if the wordmark in the nav already establishes context)*
- Headline (working draft): **"Eight projects. Four disciplines. Real outcomes."**
  *(Optional alt: omit the headline entirely and let the first feature tile carry the page open.)*
- Body: `[TBD]` *(default: omit. The page reads better without an intro paragraph. If one is added, keep it under 18 words.)*
- Filter chips (optional): **All · Commerce · Brand · Accessibility · App**

## Index Rhythm

- Pattern: **2 small tiles + 1 feature tile**, repeating. With 8 projects and a 2-1-2-1-2 pattern, that's: small, small, FEATURE, small, small, FEATURE, small, small. *(Adjust at prototype time if Modelic prefers a 3-feature variant.)*
- Tile pattern (every tile): image + client name + 1-line outcome.
- Feature tile pattern: same content, larger crop, optionally a single metric tag.
- Tile is fully clickable → `/case-studies/{slug}`.

## Tiles (working drafts — outcomes pending real metrics)

### 1. Utah Food Bank · feature
- Image: Utah Food Bank donations portal hero
- Client: **Utah Food Bank**
- Outcome (working draft): **"An accessibility-conformant donations portal that keeps data safe and stable."** *(Existing site language; retain.)*
- Optional metric tag: `[TBD — donor conversion uplift?]`
- Discipline tag: Accessibility · Commerce
- Slug: `/case-studies/utah-food-bank`

### 2. Badgley Mischka · standard
- Image: Badgley Mischka site hero
- Client: **Badgley Mischka**
- Outcome (working draft): **"A commerce site that fits the cadence of a fashion house."**
- Discipline tag: Brand · Commerce
- Slug: `/case-studies/badgley-mischka`

### 3. SiriusXM · standard
- Image: SiriusXM project hero
- Client: **SiriusXM**
- Outcome (working draft): `[TBD — needs Modelic to supply the framing for this engagement]`
- Discipline tag: `[TBD]`
- Slug: `/case-studies/siriusxm`

### 4. Hugger Mugger · feature
- Image: Hugger Mugger site hero
- Client: **Hugger Mugger**
- Outcome (working draft): **"BigCommerce build for a yoga and wellness retailer that ships heavy goods nationally."**
- Optional metric tag: `[TBD]`
- Discipline tag: Commerce
- Slug: `/case-studies/hugger-mugger`

### 5. CNP · standard
- Image: CNP project hero
- Client: **CNP**
- Outcome (working draft): `[TBD — needs Modelic framing]`
- Discipline tag: `[TBD]`
- Slug: `/case-studies/cnp`

### 6. Schumacher Homes · standard
- Image: Schumacher Homes site hero
- Client: **Schumacher Homes**
- Outcome (working draft): **"A configurator-style site for the country's largest custom homebuilder."**
- Discipline tag: Brand · App
- Slug: `/case-studies/schumacher-homes`

### 7. Olympic Eyewear · feature
- Image: Olympic Eyewear site hero
- Client: **Olympic Eyewear**
- Outcome (working draft): **"Wholesale commerce for an eyewear distributor — built to handle large account volumes."**
- Optional metric tag: `[TBD]`
- Discipline tag: Commerce
- Slug: `/case-studies/olympic-eyewear`

### 8. Cinelli USA · standard
- Image: Cinelli USA site hero
- Client: **Cinelli USA**
- Outcome (working draft): **"Brand and commerce for a heritage cycling marque, US edition."**
- Discipline tag: Brand · Commerce
- Slug: `/case-studies/cinelli-usa`

## Closing CTA (fragment from `/contact`)

- Headline: **"Tell us about your project."**
- Body: **"Send us an email or call us at 801-363-0101. We're here weekdays, 8:30 am – 5:30 pm Mountain Time."**
- Primary CTA: **"Start a project conversation"** → `/contact`

# Imagery

> Per the brand profile photography rules: cool, neutral light, mid-action, editorial. Per `.impeccable.md`: avoid the dated teal photo wash on every hero — use it deliberately, not by default. The Work page is where photography earns its keep.

## Tile Images

- Subject: a single signature image per case study — typically the case study's hero crop. Real client photography or product photography from the case study itself.
- Style: edges and crop ratio consistent across tiles within a row, but the *content* of each image is the case study's own register. The Foam wash is **off** by default for tile imagery — restore the original color of each project's photography. Apply the Foam wash only to a feature tile if the source image is too neutral to anchor the row.
- Source hint: pull from each `case-studies/{slug}` page's hero asset (single source of truth — see `_site.md` Content Reuse Map).
- Alt text: **"[Client] — [discipline]: [short outcome]."** e.g. *"Utah Food Bank — accessibility-conformant donations portal."*

## Page Open

- No separate hero photograph. The first feature tile is the page open. This is the editorial choice — the work is the page.

## Closing CTA

- No imagery; type-led, possibly with a quiet kinetic wave anchor at smaller scale than the homepage version.
