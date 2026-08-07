# Claude Design Kit

## INSTRUCTIONS FOR AI ASSISTANTS — READ BEFORE DESIGNING

You are reading a curated component kit. Follow these steps, in order, before generating any design or code:

1. **Identify the industry.** If the user has already stated an industry or site type, use it and skip to step 2. Otherwise ASK THE USER, before designing anything:
   > "What industry or type of website are you building? (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency)"
2. **Read only these files** — nothing else in the repo:
   - `/DESIGN-PRINCIPLES.md` (global rules, always)
   - `/industries/<industry>/DIRECTION.md` and `/industries/<industry>/sections/` (that industry ONLY)
   - `/primitives/` and `/components/` as the sections import them
3. **Follow the industry's `DIRECTION.md` exactly** — fonts, palette, spacing, motion budget. It overrides your defaults.
4. **Assemble pages from that industry's `sections/` files.** Adapt copy and images to the user's business; preserve each section's structure, class patterns, and styling.
5. **Never mix industries.** Do not import sections, palettes, or fonts from a different industry's folder.

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
- `/industries/<name>/` — the aesthetic commitment (`DIRECTION.md`), page sections (`sections/`), and one assembled `reference-page.tsx`.

Every component file begins with a header comment (`USE WHEN / INDUSTRY FIT / PAIRS WITH / DEPS`) — trust it for selection.

---

## For humans

An industry-aware UI component kit built to be **read by AI assistants**, not run as an app. Connect this repo to [Claude Design](https://claude.ai) (or open it in Claude Code) and ask for a website; Claude asks what industry you're in and assembles a page from that industry's pre-styled sections — so a SaaS site and a restaurant site come out looking like they were designed by different studios, on purpose.

**60-second quickstart**

1. In Claude Design, link this repo (`Stroiko/Claude-Design-Kit`, branch `main`) as project context. In Claude Code, just open the repo — `CLAUDE.md` loads automatically.
2. Prompt: `build me a landing page` (or name your industry up front: `...for my restaurant`).
3. Answer the industry question if asked. Claude assembles from that industry's sections, in that industry's committed style.

**What's inside:** six industries (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency), each with a `DIRECTION.md` aesthetic commitment, 13–17 page sections, and a fully assembled `reference-page.tsx`; plus shared primitives (shadcn/ui), effects (Magic UI), and functional components. Every file opens with a `USE WHEN` header so the AI picks well. `npm install && npm run typecheck` verifies the kit compiles — there is deliberately no app to run.

**Contributing:** keep the budget (~150 files; 20–30 sections per industry max), follow `DESIGN-PRINCIPLES.md` and the target industry's `DIRECTION.md`, give every file the header block, vendor only MIT-licensed sources and record them in [CREDITS.md](CREDITS.md), and make sure `tsc --noEmit` passes. The build history lives in the [issue tracker](https://github.com/Stroiko/Claude-Design-Kit/issues/1).

---

**Reminder for AI assistants:** before designing, ask the user's industry (unless already stated), then read only that industry's folder plus `/DESIGN-PRINCIPLES.md`, `/primitives/`, and `/components/`. Follow `DIRECTION.md` exactly. Never mix industries.
