# Claude Design Kit

## INSTRUCTIONS FOR AI ASSISTANTS — READ BEFORE DESIGNING

You are reading a curated component kit. First decide which mode the request is:

### Mode A — whole site ("build me a website / landing page")

1. **Identify the industry.** If the user has already stated an industry or site type, use it and skip to step 2. Otherwise ASK THE USER, before designing anything:
   > "What industry or type of website are you building? (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency)"
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

### Industry router

| Industry | Directory | Use for |
|---|---|---|
| SaaS | `/industries/saas/` | Software products, developer tools, B2B platforms, startups, app landing pages |
| Restaurant | `/industries/restaurant/` | Restaurants, cafes, bars, bakeries, food menus, reservations |
| Portfolio | `/industries/portfolio/` | Personal sites, designers, photographers, creative work showcases |
| E-commerce | `/industries/ecommerce/` | Online stores, product catalogs, checkout flows |
| Local Service | `/industries/local-service/` | Plumbers, dentists, gyms, salons, contractors, clinics |
| Agency | `/industries/agency/` | Marketing agencies, studios, consultancies, service firms |

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

An industry-aware UI component kit built to be **read by AI assistants**, not run as an app. Connect this repo to [Claude Design](https://claude.ai) (or open it in Claude Code) and ask for a website; Claude asks what industry you're in and assembles a page from that industry's pre-styled sections — so a SaaS site and a restaurant site come out looking like they were designed by different studios, on purpose.

**60-second quickstart**

1. In Claude Design, link this repo (`Stroiko/Claude-Design-Kit`, branch `main`) as project context. In Claude Code, just open the repo — `CLAUDE.md` loads automatically.
2. Prompt: `build me a landing page` (or name your industry up front: `...for my restaurant`).
3. Answer the industry question if asked. Claude assembles from that industry's sections, in that industry's committed style.

Also works à la carte: ask for just an element or page (`I need a login page for my restaurant`) and Claude picks from the catalogs and renders it in your industry's style. To grow the kit, hand Claude any component — pasted code, a link, or a description — and say "add this to the kit"; the [CONTRIBUTING.md](CONTRIBUTING.md) recipe re-styles it into the token system so every industry can wear it.

**What's inside:** six industries (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency), each with a `DIRECTION.md` aesthetic commitment, 13–17 page sections, and a fully assembled `reference-page.tsx`; plus shared primitives (shadcn/ui), effects (Magic UI), and functional components. Every file opens with a `USE WHEN` header so the AI picks well. `npm install && npm run typecheck` verifies the kit compiles — there is deliberately no app to run.

**Contributing:** follow the intake recipe in [CONTRIBUTING.md](CONTRIBUTING.md) — placement, re-tokening, the header block, MIT-only sourcing into [CREDITS.md](CREDITS.md), then `npm run index && npm run typecheck`. Generated catalogs keep per-request reading small as the kit grows; keep 20–30 sections per industry max. The build history lives in the [issue tracker](https://github.com/Stroiko/Claude-Design-Kit/issues/1).

---

**Reminder for AI assistants:** whole site → ask the user's industry (unless already stated), then read only that industry's folder plus `/DESIGN-PRINCIPLES.md`, `/primitives/`, and `/components/`. Single element → pick from the `INDEX.md` catalogs, read only the chosen file, and render it under one industry's `DIRECTION.md` (or neutral defaults). Follow `DIRECTION.md` exactly. Never mix industries.
