# Stardust → EDS conversion log

Project: modelic-via-skill
Started: 2026-04-26

## Locked decisions

1. **Canonical home**: `home-b-v1` ships at `/`. `home-a` and `home-b` are dropped (no content pages, no blocks built for their unique sections).
2. **Hero naming**: prefix per archetype.
   - `home-hero` (from `home-b-v1` hero — full-bleed-overlay)
   - `service-hero` (services hero)
   - `case-hero` (case-study hero)
   - `work-hero` (from `work.html`'s `page-open`)
   - `team-hero` (from `team.html`'s `intro`)
   - `approach-hero` (from `approach.html` hero)
   - `contact-hero` (from `contact.html`'s `open`)
3. **Case-study prose modules**: two separate blocks.
   - `case-prose` (the `module text-led` variant)
   - `case-prose-tinted` (the `module tinted` variant)
4. **Closing reuse**: one shared `closing` block, used by every page that ends with `<section class="closing">` (services, case studies, work, team, approach, home-b-v1).
5. **`contact.html`'s `closing-wave`**: NOT a block. Inline the decorative wave SVG inside the `studio` block's CSS/markup.

## Block inventory (locked)

### Chrome (already exist, will be wired to fragments)
- `header`
- `footer`
- `fragment`
- `section-metadata`

### Home (`home-b-v1`)
- `home-hero`, `wave-strip`, `work-bento`, `approach-dark`, `team-overlay`, `clients-marquee`, `closing`

### Services (`design`, `development`, `app-development`, `accessibility`, `service-template`)
- `service-hero`, `perspective`, `ship`, `toolkit`, `partnership`, `work-disc`, `closing`

### Case studies (`badgley-mischka`, `cinelli-usa`, `cnp`, `hugger-mugger`, `olympic-eyewear`, `schumacher-homes`, `siriusxm`, `case-study-template`)
- `case-hero`, `glance`, `case-prose`, `case-prose-tinted`, `gallery`, `outcomes`, `quote`, `related`, `closing`

### Work index (`work.html`)
- `work-hero` (from `page-open`), `work-index`, `closing`

### Team (`team.html`)
- `team-hero` (from `intro`), `team-roster` (from `team`), `work-style`, `recent`, `careers`, `closing`

### Approach (`approach.html`)
- `approach-hero`, `manifesto`, `tenets`, `cadence`, `closing`

### Contact (`contact.html`)
- `contact-hero` (from `open`), `contact-grid`, `studio` (decorative `closing-wave` inlined inside)

## Content pages to be authored

- `content/index.html` (from `home-b-v1`)
- `content/work.html`
- `content/team.html`
- `content/approach.html`
- `content/contact.html`
- `content/services/design.html`
- `content/services/development.html`
- `content/services/app-development.html`
- `content/services/accessibility.html`
- `content/case-studies/badgley-mischka.html`
- `content/case-studies/cinelli-usa.html`
- `content/case-studies/cnp.html`
- `content/case-studies/hugger-mugger.html`
- `content/case-studies/olympic-eyewear.html`
- `content/case-studies/schumacher-homes.html`
- `content/case-studies/siriusxm.html`
- `content/fragments/nav/header.html`
- `content/fragments/nav/footer.html`

## Anti-patterns avoided

- Did not build one polymorphic `hero` block. Each archetype gets its own.
- Did not build one polymorphic `closing` block with variants — `home-a`'s alt closing is dropped with the variant.
- Did not extract a "module" parent block with cell-driven variants — case-study prose split into two distinct blocks per user direction.
- Did not invent shared utility modules (waves, motion). Per-block ownership.
- Did not touch `head.html`. All `@font-face` declarations live in `styles/styles.css`.
- Self-hosted Inter + JetBrains Mono with metric-matched Arial fallback (`@font-face "Arial"` overriding metrics) — zero CLS on font swap via `body.session` pattern.

## Final inventory

**35 blocks total** under `blocks/`:
- 4 pre-existing chrome: `header`, `footer`, `fragment`, `section-metadata`.
- 7 home: `home-hero`, `wave-strip`, `work-bento`, `approach-dark`, `team-overlay`, `clients-marquee`, `closing`.
- 6 services: `service-hero`, `perspective`, `ship`, `toolkit`, `partnership`, `work-disc`.
- 8 case-study: `case-hero`, `glance`, `case-prose`, `case-prose-tinted`, `gallery`, `outcomes`, `quote`, `related`.
- 14 utilities: `work-hero`, `work-index`, `team-hero`, `team-roster`, `work-style`, `recent`, `careers`, `approach-hero`, `manifesto`, `tenets`, `cadence`, `contact-hero`, `contact-grid`, `studio`.

**18 HTML files** under `content/`:
- 16 content pages (1 home + 4 services + 7 case studies + 4 utility).
- 2 fragments (`content/fragments/nav/header.html`, `footer.html`).

**Foundation**:
- `styles/styles.css` — tokens lifted from `home-b-v1.html`, document reset, EDS section scaffold, global button system, self-hosted Inter + JetBrains Mono with metric-matched Arial fallback.
- `styles/fonts/inter-variable.woff2` (~48 KB), `inter-italic-variable.woff2` (~51 KB), `jetbrains-mono-variable.woff2` (~40 KB).
- `head.html` — UNTOUCHED.

## Open follow-ups (flagged by agents)

1. **Stale `<h2>` in case-study M3 brief blocks**: every case-study prototype shipped with literal "What the Utah Food Bank came to us with" copy in the third prose module. Case-study agent rewrote per-client when authoring. Worth fixing in the prototypes themselves at the briefings/prototype tier.
2. **`/case-studies/utah-food-bank` references**: `cnp`, `siriusxm`, `schumacher-homes` Related tiles link to a Utah Food Bank case study that has no published content page. Either add the page or sweep those hrefs.
3. **EDS host derivation**: image URLs and chrome logo were derived from `git remote` (`da-pilot/modelic`) → `https://main--modelic--da-pilot.aem.page/...`. Confirm with the user before deploy if the actual EDS site lives elsewhere (custom domain, `aem.live`, different fork, etc.).

## Behavioral additions to the skill

- Updated SKILL.md to explicitly forbid emitting a `<head>` element in content pages or fragments. EDS injects the project `head.html` at delivery; a per-page `<head>` is dead weight at best, a duplication conflict at worst.
