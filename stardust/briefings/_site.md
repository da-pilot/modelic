<!-- stardust:provenance
  generated_by: briefings
  date: 2026-04-26
  synthesized_inputs:
    - content reuse map — composed by the assistant from the agreed page set; user approved at section-list level, individual fragment names are assistant-derived.
  note: 6-page refresh scope. Two of the six are templates (service, case-study) that cover repeated pages on the live site (~6 service pages, 8 case studies).
-->
---
site: Modelic
pages: [home, work, service-template, case-study-template, team, contact]
---

# Purpose

Modelic.io is the marketing site for a Salt Lake City design + engineering agency. The refresh repositions Modelic — quietly — as a tastemaker shop that delivers measurable outcomes with a modern toolkit (including AI applied where it earns its place), in deliberate contrast to the retainer-mill agency model. Voice register is unchanged: plain-spoken, partner-minded, slightly self-effacing.

Primary audience across the site: decision-makers at brands evaluating an agency for a real project (VPs of Marketing, e-comm leads, brand directors, founders). The site exists to convert evaluation into a project conversation.

# Navigation

Primary nav (left → right):
- Work
- Services *(parent — drops to Development, Design, Commerce, Accessibility, App Dev)*
- Approach *(or "How we work" — links to a distilled approach page; current site routes this through service pages and tenets — refresh consolidates)*
- Team
- Contact

Secondary nav / footer:
- Careers
- Blog *(out of refresh scope; link preserved, page itself not rebriefed in this pass)*
- Privacy

The wordmark in the top-left always returns to `/`. The kinetic wave mark may animate on first load only.

# Shared Messaging

**Tagline (working draft, [TBD] for final):** "Design and engineering for brands that want measurable outcomes — built with a modern toolkit, used like grown-ups."

**Positioning sentence (working draft, [TBD] for final):** "Modelic is not a vending machine. We're a tastemaker design and engineering shop that uses modern CMS, modern commerce, and AI where it earns its place — to drive measurable value, not perpetual retainers."

**Forbidden phrases across the site:** AI-powered · world-class · best-in-class · industry-leading · transformative · synergy · leverage · unlock · explosive · cutting-edge.

**Allowed once:** the "vending machine" line — lives on the Approach/Service page, not the homepage.

# Content Hierarchy

1. **Home** — entry point and conversion engine. Pulls excerpts from every major content page. Primary CTA: start a project conversation.
2. **Work** — the proof page. Index of case studies; what every decision-maker reads first if they came for evidence.
3. **Case Study (template)** — the deepest single artifact. Each named project (Utah Food Bank, Badgley Mischka, SiriusXM, Hugger Mugger, CNP, Schumacher Homes, Olympic Eyewear, Cinelli USA) renders from this template.
4. **Service (template)** — capability detail. Renders for /development, /design, /bigcommerceshopify, /app-development, /web-accessibility-wcag, /ecommerce-partners.
5. **Team** — warmth + craft proof. Faces, roles, philosophy. Reinforces the "real people, not a vendor" positioning.
6. **Contact** — close. Form, phone (801-363-0101), hours, location.

# Content Reuse Map

| Fragment | Source Page | Reused On | Purpose |
|----------|-------------|-----------|---------|
| `case-study-tile` (image + client + 1-line outcome) | `/work` | `/`, `/services/*`, `/team` | Lead with proof. Home pulls 3–4 selected; service pages pull 2–3 relevant to the discipline; team page pulls 2 to ground the people in real work. |
| `tenet-card` (numbered, 1–2 sentences) | `/approach` *(distilled section in service-template, full version on the longest service page)* | `/`, every `/services/*` | The "partnership / measurable / modern toolkit" frame. Reused as a 2–3-card excerpt with "How we work →" CTA. |
| `team-portrait` (face + name + role + 1-line) | `/team` | `/`, `/case-studies/*` | Home shows a single editorial moment (1–2 portraits). Case studies show the lead designer/engineer who shipped the project. |
| `service-card` (title + 2-line capability) | `/services/*` | `/`, `/work`, `/case-studies/*` | Home references services obliquely (in the approach block, not as a menu). Work index lets visitors filter by service. Case studies tag the disciplines that shipped them. |
| `client-logo` | curated set | `/`, `/work` | Editorial treatment (mismatched scale, in-line, not a grid). Legitimacy proof. |
| `closing-cta` (headline + phone + email) | `/contact` | every page | "Let's talk about your project." The phone number always lives in this fragment so it's only authored once. |
| `outcome-stat` (metric + caption) | `/case-studies/*` | `/`, `/work`, `/services/*` | Numbers cash the "measurable value" claim. Pulled into the home Selected Work block, Work index sort/filter, and service pages where the outcome relates to the discipline. |

**Reuse rules for this site:**
- Reused sections show **3–4 items** with a "see more" CTA to the source page (e.g., home shows 3 case-study tiles, then "See all work →").
- The closing CTA fragment is **the only place** the phone number lives on a page. Authored in `/contact`, reused everywhere.
- The outcome stat fragment carries the metric source (case study link). Stats never appear divorced from the work that produced them.
