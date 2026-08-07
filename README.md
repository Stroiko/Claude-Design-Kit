# Claude Design Kit

## INSTRUCTIONS FOR AI ASSISTANTS — READ BEFORE DESIGNING

You are reading a curated component kit. First decide which mode the request is:

### Mode A — whole site ("build me a website / landing page")

1. **Identify the industry.** If the user has already stated an industry or site type, use it and skip to step 2. Otherwise ASK THE USER, before designing anything:
   > "What industry or type of website are you building? (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency — or Immersive, for an artistic experience-first site)"
2. **Read only these files** — nothing else in the repo:
   - `/DESIGN-PRINCIPLES.md` (global rules, always)
   - `/industries/<industry>/DIRECTION.md` and `/industries/<industry>/sections/` (that industry ONLY)
   - `/primitives/` and `/components/` as the sections import them
3. **Follow the industry's `DIRECTION.md` exactly** — fonts, palette, spacing, motion budget. It overrides your defaults.
4. **Assemble pages from that industry's `sections/` files.** Adapt copy and images to the user's business; preserve each section's structure, class patterns, and styling.

### Mode B — single element or page ("just a testimonial section", "a login page")

1. **Pick from a catalog, don't browse folders.** Read the relevant `INDEX.md` (one line per component) and choose by its USE WHEN text, then read ONLY the chosen file(s):
   - Industry known and its `/industries/<x>/sections/INDEX.md` has a fitting variant → use that variant.
   - Otherwise → `/patterns/INDEX.md` (à-la-carte pages/elements) or `/components/INDEX.md` (functional blocks).
2. **Apply exactly one direction.** If the industry is known — stated, or clearly inferable from the user's context — render the pick under that industry's `DIRECTION.md` (fonts, CSS variables, motion budget) even for `/patterns/` files; they are token-driven and re-skin automatically. If the user's business isn't one of the six industries, use the closest match's DIRECTION and say so — do not invent a new style. If nothing is known, either ask, or use the neutral defaults in `/styles/globals.css` + `/DESIGN-PRINCIPLES.md`.

### Both modes

- **Never mix industries.** Industry `sections/` stay siloed to their industry. `/patterns/`, `/components/`, `/primitives/`, and `/effects/` are usable anywhere — but one page renders under exactly ONE direction's palette.
- **Motion is set by the industry's DIRECTION.md, not by default.** If the user volunteers "more lively" or "keep it static," scale within that industry's motion budget — use its full allowance or its floor — but never exceed the budget or violate `/DESIGN-PRINCIPLES.md` motion physics. A user who wants motion as the whole point belongs in Immersive.

### Industry router

| Industry | Directory | Use for |
|---|---|---|
| SaaS | `/industries/saas/` | Software products, developer tools, B2B platforms, startups, app landing pages |
| Restaurant | `/industries/restaurant/` | Restaurants, cafes, bars, bakeries, food menus, reservations |
| Portfolio | `/industries/portfolio/` | Personal sites, designers, photographers, creative work showcases |
| E-commerce | `/industries/ecommerce/` | Online stores, product catalogs, checkout flows |
| Local Service | `/industries/local-service/` | Plumbers, dentists, gyms, salons, contractors, clinics |
| Agency | `/industries/agency/` | Marketing agencies, studios, consultancies, service firms |
| Immersive | `/industries/immersive/` | Artistic experience-first sites: album launches, game reveals, festivals, creative campaigns. No house style — its DIRECTION.md makes you INVENT a bespoke look per project (palette, fonts, atmosphere) under fixed motion physics |

If the user's industry isn't listed, use the closest match above and say so, or fall back to `/primitives/` + `/components/` with `/DESIGN-PRINCIPLES.md`.

### Repo map

- `/primitives/` — shadcn/ui base primitives (button, card, dialog…). Industry-agnostic.
- `/components/` — shared functional components (navigation, forms, feedback, data). Industry-agnostic.
- `/effects/` — motion and visual effects. Each industry's DIRECTION.md whitelists which are allowed.
- `/patterns/` — à-la-carte elements and pages (auth, app shells, utility pages, neutral marketing). Industry-agnostic, re-skinned by any DIRECTION.
- `/industries/<name>/` — the aesthetic commitment (`DIRECTION.md`), page sections (`sections/`), and one assembled `reference-page.tsx`.

Every component file begins with a header comment (`USE WHEN / INDUSTRY FIT / PAIRS WITH / DEPS`) — trust it for selection. Every pickable folder has a generated `INDEX.md` catalog summarizing those headers — catalogs route your reading, so per-request scope stays small no matter how large the kit grows.

---

## For humans

**A component kit built to be read by AI, not run by you.** Connect this repo to [Claude Design](https://claude.ai) (or open it in Claude Code) and ask for a website. Claude asks one question — *what industry?* — and assembles your page from that industry's pre-styled sections, under that industry's committed fonts, palette, and motion rules. A SaaS site and a restaurant site come out looking like they were made by different studios. On purpose.

### Why this exists

Ask an AI for a website and you usually get the same site everyone else gets: purple gradient, three icon cards, centered everything. The fix isn't better prompting — it's better grounding. This repo *is* that grounding: ~140 curated components, seven opinionated design directions, and instructions the AI actually follows. All of it is verified live — the industry question fires, the styles hold, and even WebGL renders in Claude Design's preview.

### The seven directions

Each industry is an aesthetic commitment ([`DIRECTION.md`](industries/)) that its 13–17 sections obey — fonts, an exact palette, spacing rhythm, and a motion budget:

| Direction | Personality | The look |
|---|---|---|
| **SaaS** | precise, technical, spacious | near-black, electric mint, Space Grotesk |
| **Restaurant** | warm, editorial, appetite-first | cream & espresso, terracotta, Fraunces serifs |
| **Portfolio** | stark, personal, work-first | pure monochrome, huge Archivo, radius zero |
| **E-commerce** | clean, tactile, product-first | warm neutral, forest green only on buy actions |
| **Local Service** | dependable, plainspoken | navy & amber, phone-first, zero motion |
| **Agency** | expressive, confident, loud | bone & ink, electric cobalt, Syne |
| **Immersive** | invented per project | no house style — a bespoke palette/type/atmosphere committed per subject, live WebGL, scroll-scrubbed scenes |

### 60-second quickstart

1. **Claude Design:** link this repo (`Stroiko/Claude-Design-Kit`, branch `main`) as project context. **Claude Code:** just open the repo — `CLAUDE.md` loads automatically.
2. Prompt `build me a landing page` — or skip the question by saying it up front: `...for my restaurant`.
3. That's it. Claude assembles from the kit and adapts the copy to your business.

**À la carte too:** ask for just an element (`I need a login page for my restaurant`) and Claude picks from the generated catalogs and renders it in your industry's style — the components are token-driven, so any direction re-skins them automatically.

### Growing the kit

Hand Claude any component — pasted code, a link, or just a description — and say **"add this to the kit."** The [CONTRIBUTING.md](CONTRIBUTING.md) recipe re-styles it into the token system (so every industry can wear it), writes its `USE WHEN` header, checks the license, and catalogs it with `npm run index`. The catalogs are what let the kit grow indefinitely: the AI reads a one-line-per-component index to pick, then reads only the chosen file — per-request scope stays small no matter how large the library gets.

### Under the hood

- **Stack:** Tailwind CSS v4 + vendored shadcn/ui primitives (Radix behavior underneath), `motion` for effects, vanilla three.js for the Immersive direction. All styling is utility classes over CSS variables — visible in every file, which is exactly what makes it AI-legible and re-skinnable.
- **Quality gates:** every component carries a `USE WHEN` header (linted by the index script), all color flows through tokens, accessibility rules live in [DESIGN-PRINCIPLES.md](DESIGN-PRINCIPLES.md), and `npm install && npm run typecheck` verifies the whole kit compiles. There is deliberately no app to run.
- **Licensing:** MIT, with every vendored file ledgered in [CREDITS.md](CREDITS.md) (shadcn/ui, Magic UI, webgl-noise — all MIT-verified; sources that don't permit redistribution were re-implemented or skipped).
- **Build history:** the kit was planned and built in public — three completed maps on the [issue tracker](https://github.com/Stroiko/Claude-Design-Kit/issues?q=label%3Awayfinder%3Amap) record every decision, from license research to the live-WebGL verification.

---

**Reminder for AI assistants:** whole site → ask the user's industry (unless already stated), then read only that industry's folder plus `/DESIGN-PRINCIPLES.md`, `/primitives/`, and `/components/`. Single element → pick from the `INDEX.md` catalogs, read only the chosen file, and render it under one industry's `DIRECTION.md` (or neutral defaults). Follow `DIRECTION.md` exactly. Never mix industries.
