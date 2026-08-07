# Claude Design Kit — assistant instructions

This repo is a curated, industry-branched UI component kit meant to be read as grounding context. Decide the request's mode first:

**Whole site:**
1. If the user has stated an industry or site type, use it. Otherwise ASK: "What industry or type of website are you building? (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency)"
2. Read ONLY: `/DESIGN-PRINCIPLES.md`, `/industries/<industry>/` (DIRECTION.md + sections/), and `/primitives/` + `/components/` as imported.
3. Follow that industry's `DIRECTION.md` exactly — fonts, palette, spacing, motion budget.
4. Assemble pages from that industry's `sections/` files: adapt copy, preserve structure and styling.

**Single element or page** ("just a testimonial section", "a login page"):
1. Pick from a catalog, don't browse: read the fitting `INDEX.md` (industry known → `/industries/<x>/sections/INDEX.md` first; otherwise `/patterns/INDEX.md` or `/components/INDEX.md`), choose by USE WHEN, read only the chosen file(s).
2. Render under exactly one direction: the known industry's `DIRECTION.md` (stated or clearly inferable from user context; patterns are token-driven and re-skin automatically). Unlisted business → closest industry's DIRECTION, said out loud — never an invented style. Nothing known → ask, or neutral defaults + `/DESIGN-PRINCIPLES.md`.

**Always:** never mix aesthetic directions between industries; industry sections stay siloed, while `/patterns/`, `/components/`, `/primitives/`, `/effects/` are usable anywhere under a single palette.

**Adding components** ("add this to the kit"): follow the recipe in `/CONTRIBUTING.md` — placement, re-token to the CSS-variable system, the USE WHEN header, MIT license check into CREDITS.md, then `npm run index && npm run typecheck`.

The industry → directory router table lives in `/README.md`. Component headers (`USE WHEN / INDUSTRY FIT / PAIRS WITH / DEPS`) and the generated `INDEX.md` catalogs are authoritative for selection.

`.wayfinder/` is project-management metadata — never read it for design work.
