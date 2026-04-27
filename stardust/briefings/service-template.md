<!-- stardust:provenance
  generated_by: briefings
  date: 2026-04-26
  synthesized_inputs:
    - per-service capability lists, value props, and modern-toolkit angles — composed from the public service-page slugs and the brand profile content pillars; Modelic must confirm or rewrite per service before ship.
    - section eyebrows and intro headline drafts — assistant-drafted to match agreed Tone.
  note: One template; renders six service pages on the live site (/development, /design, /bigcommerceshopify, /app-development, /web-accessibility-wcag, /ecommerce-partners). Per-service variants captured at the bottom; instances may diverge after a real authoring pass.
-->
---
page: Service (Template)
path: /services/{slug}
type: custom
template: service
instances:
  - slug: development
    name: Development
  - slug: design
    name: Design
  - slug: commerce
    name: Commerce
    legacy_path: /bigcommerceshopify
  - slug: app-development
    name: App Development
  - slug: accessibility
    name: Accessibility
    legacy_path: /web-accessibility-wcag
  - slug: ecommerce-partners
    name: Ecommerce Partners
---

# Intent

A service page exists to **educate a visitor who is still figuring out what they need**, not to pitch a visitor who's already decided. By the end of the page they should understand (a) how Modelic thinks about this discipline, (b) what shipping looks like — what Modelic actually does — and (c) where this discipline has shipped recently. The page is a capability explainer with proof attached, not a sales argument.

If a visitor leaves the service page convinced they need this discipline, the natural next move is `/work` (more proof) or `/contact` (start a conversation). The page does not push toward `/contact` — it earns the click by being useful.

# Audience

Decision-makers earlier in evaluation than the homepage audience. They've narrowed to "we probably need help with [commerce / accessibility / brand / app]" but haven't decided what success looks like or what scope to commit. Some have an internal team and want to know how Modelic works alongside one; some don't, and want to know what shipping looks like end-to-end.

The page is written for someone who is reading carefully — not skimming. A skimmer would have started on `/work`.

# Key Messages

1. **Here is how we think about this discipline.** A short, opinionated paragraph that tells the visitor what good looks like in this area — not a definition of the category. The opinion is the differentiator.
2. **Here is what shipping looks like.** A specific capability breakdown (what Modelic does, in what order, what the visitor's team is responsible for). Tells the visitor what to expect on a real engagement, not a list of buzzwords.
3. **Here is where modern tooling earns its keep — for *this* discipline.** One short paragraph or callout naming where modern CMS, modern commerce, or AI changes how Modelic ships work in this discipline. Concrete, never categorical. Different on every service page.
4. **Here is recent work in this discipline.** 2–3 case-study tiles filtered to the service. Proof comes after capability, not before.
5. **Here is where partnership shows up.** A line or two on how Modelic works alongside a client team — internal designers, internal devs, internal stakeholders. Cashes the "partner, not vendor" line for this discipline specifically.

# Calls to Action

- **Primary:** "See work in this discipline" → `/work?filter={slug}` (or `/work` if filters aren't built yet). The page earns the click toward proof; that proof page itself routes toward `/contact`.
- **Secondary:** "Start a project conversation" → `/contact`. Anchored in the closing CTA fragment at the bottom of the page.
- **Optional in-page:** "How we work" → `/approach` if the service page references the tenets section without rendering them in full.

# Tone

Educational, opinionated, plain-spoken. The service page is the most **content-rich** page on the site — body copy is allowed to be substantive (3–5 sentence paragraphs, not 1–2). The reader has shown intent by drilling in; reward it with material.

Tonal rules layered on the site-wide tone:

- Lead the explainer paragraphs with **a perspective**, not a definition. *"Most commerce work fails before it ships because the product team and the engineering team are sold on different success metrics — we close that loop in week one"* lands. *"Commerce is the practice of selling online"* does not.
- Capability breakdowns are **specific**. *"Stencil theme work, headless BigCommerce, custom Apps API integration"* — not *"end-to-end commerce solutions."*
- Modern-toolkit / AI mentions are concrete and **per-service**, never page-level claims. Different on every service page.
- "We" voice is allowed here more than on `/`. The page is Modelic explaining itself in a low-pressure room — the first-person register fits.
- Forbidden, layered on site-wide list: "end-to-end", "full-service", "comprehensive solutions", "best practices", "leverage best-in-class". Anything that could appear on every agency's service page verbatim is off the table.

# Copy

> Working drafts. Section structure is shared across all instances; per-service strings are captured in the **Per-service variants** block at the bottom. Top-level copy below uses `{ServiceName}` and `{discipline-noun}` placeholders that the per-service block fills in.

## Hero

- Eyebrow: **"Services / {ServiceName}"**
- Headline (working draft): **"{ServiceName} at Modelic."** *(Quiet, declarative. Variant per service in the variants block; some services may want a sharper hook — see variants.)*
- Subhead (working draft): one sentence stating Modelic's perspective on the discipline. **Per-service variant required** — see variants block.
- Primary CTA: **"See {discipline-noun} work →"** → `/work?filter={slug}`
- Secondary CTA: **"Start a project conversation"** → `/contact`

## Perspective ("How we think about this")

- Section eyebrow: **"Perspective"**
- Headline (working draft): **"What we hold to in {discipline-noun}."**
- Body: 2–3 paragraphs, 3–5 sentences each. **Per-service variant required.** Each service page rewrites this from scratch — this is the page's reason to exist. The shared tonal frame: opinion-first, specifics-rich, no agency jargon.

## What We Ship

- Section eyebrow: **"What we ship"**
- Headline (working draft): **"What shipping {discipline-noun} with Modelic looks like."**
- Body: short intro paragraph (2 sentences max) framing the breakdown.
- Capability list: 4–7 specific deliverables/activities, each with a 1-line description. Not bullets in the abstract sense — a real breakdown. **Per-service variant required.**
- Process callout (optional): 1–2 lines on the cadence (kickoff → discovery → build → handoff), if the service has a meaningfully different cadence from the others.

## Modern Toolkit ("Where AI and modern stack show up here")

- Section eyebrow: **"Modern toolkit"**
- Headline (working draft): one sharp line stating where modern tooling changes the work in this discipline. **Per-service variant required.**
- Body: one paragraph (3–4 sentences). Concrete, scoped to this discipline only. Examples in the variants block.
- Treatment note: this is the *quiet drop* mentioned in the brand voice rules. Not a banner. Not a callout box with an "AI" pill. Reads as a continuation of the perspective, not as a separate section about technology.

## Partnership ("How we work with your team")

- Section eyebrow: **"Partnership"**
- Headline (working draft): **"Inside your team, not across from it."** *(Echoes the homepage approach tenet.)*
- Body: 1 paragraph. **Per-service variant** if the discipline has a specific partnership pattern (e.g., accessibility often pairs with an internal QA team; brand often pairs with an internal marketing lead).

## Selected Work in {ServiceName}

- Section eyebrow: **"Selected work"**
- Headline: `[TBD]` *(default: omit)*
- Treatment: 2–3 `case-study-tile` fragments filtered to the discipline. Same tile pattern as `/work` (image + client + 1-line outcome).
- Block CTA: **"See all {discipline-noun} work →"** → `/work?filter={slug}`

## Closing CTA (fragment from `/contact`)

- Headline: **"Have a {discipline-noun} project in mind?"** *(Per-service variant of the standard closing CTA — softer entry than the page-default "Tell us about your project.")*
- Body: **"Send us an email or call us at 801-363-0101. We're here weekdays, 8:30 am – 5:30 pm Mountain Time."**
- Primary CTA: **"Start a project conversation"** → `/contact`

# Imagery

> Service pages are copy-led. Imagery is restrained — type and capability detail carry the page.

## Hero

- Subject: a single editorial moment — a craftsperson at work in a context that fits the discipline, OR a process artifact (a wireframe, a code editor, a brand sketch). NOT a stocky team photo.
- Style: cool, neutral light. Editorial. The Foam wash is **off** by default — used only on the Accessibility page where the soft palette earns its place tonally.
- Source hint: commission new per service, or use a process artifact pulled from a real project.
- Alt text: per-variant.

## Selected Work tiles

- As `/work`: pull from each `case-studies/{slug}` page's hero asset. Same rules.

## Section breaks

- Optional: a small kinetic wave detail between major sections. Used sparingly — twice per page max.

# Per-service variants

> Each instance gets a copy of the template with these slots filled in. Slots marked `[TBD]` need Modelic to commit; slots with working drafts are placeholders.

## Development

- `{ServiceName}`: Development
- `{discipline-noun}`: development *(used in CTAs and headlines: "See development work")*
- Hero subhead (working draft): **"Engineering for marketing sites and commerce — built for measurable outcomes, not perpetual maintenance."**
- Modern toolkit angle: AI-assisted code review and migration tooling; modern frameworks chosen for the project's actual lifespan, not the agency's preferred stack.
- Capability breakdown: `[TBD — Modelic to commit. Suggested: theme + template engineering, headless integrations, performance work, accessibility implementation, CMS integration, ongoing engineering support.]`

## Design

- `{ServiceName}`: Design
- `{discipline-noun}`: design
- Hero subhead (working draft): **"Brand, UX, and visual design that respects the work it has to ship into."**
- Modern toolkit angle: AI as a research and ideation tool; not as a generation shortcut. Real type, real photography, real craft — supported by faster discovery.
- Capability breakdown: `[TBD — suggested: brand systems, UX research, interaction and visual design, design systems, design QA through ship.]`

## Commerce *(replaces /bigcommerceshopify)*

- `{ServiceName}`: Commerce
- `{discipline-noun}`: commerce
- Slug: `commerce` (preferred). Legacy `/bigcommerceshopify` should 301 to `/services/commerce`.
- Hero subhead (working draft): **"BigCommerce, Shopify, and headless commerce, scoped to the metric you're trying to move."**
- Modern toolkit angle: AI for catalog operations (description normalisation, attribute extraction), modern composable commerce where the buyer experience demands it, conventional Stencil/Shopify themes where it doesn't.
- Capability breakdown: `[TBD — suggested: theme work, custom apps, B2B and wholesale flows, catalog and PIM integration, checkout and conversion optimization.]`

## App Development

- `{ServiceName}`: App Development
- `{discipline-noun}`: app *(plural where natural: "apps")*
- Hero subhead (working draft): **"Native and web apps for brands that need a real product, not a campaign microsite."**
- Modern toolkit angle: AI-assisted code generation for repetitive integration work; LLM features integrated into the product surface where the use case is real, not as a checkbox.
- Capability breakdown: `[TBD — suggested: native iOS/Android, cross-platform, web app, integrations and APIs, ongoing app maintenance.]`

## Accessibility *(replaces /web-accessibility-wcag and /ada-wcag-comformance)*

- `{ServiceName}`: Accessibility
- `{discipline-noun}`: accessibility *(use "WCAG-conformant" once in the perspective copy, never in the headline)*
- Slug: `accessibility` (preferred). Both legacy paths should 301 here.
- Hero subhead (working draft): **"Accessibility done as a craft, not a checklist. WCAG conformance is the floor, not the goal."**
- Modern toolkit angle: AI-assisted audit tooling that flags real issues, paired with manual testing by humans who use assistive tech daily — automation isn't the audit, it's the warm-up.
- Capability breakdown: `[TBD — suggested: audits, remediation, ongoing compliance, design-stage accessibility review, training for client teams.]`
- **Tonal note:** this is the page where the Foam wash earns its place — the soft register fits accessibility's calmer tone.

## Ecommerce Partners

- `{ServiceName}`: Ecommerce Partners
- `{discipline-noun}`: partnership *(careful: not "partnership work" — this is about Modelic's tech partnerships, not the partnership tenet)*
- Hero subhead (working draft): **"The platforms, tools, and people we work with — and what each one is good for."**
- Modern toolkit angle: this page IS the modern-toolkit page. Lists ecosystem partners (BigCommerce, Shopify, Magento legacy support, Klaviyo, AI tooling vendors) with Modelic's perspective on each.
- Capability breakdown: a partner list, not a service list. Format diverges from other service pages — this page is closer to a reference table than a capability explainer. May not need every section above.
- **Open question:** does this page belong in the service set at all, or should it move to footer/about? `[TBD — defer to wireframes phase.]`
