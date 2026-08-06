# Claude Design Kit — assistant instructions

This repo is a curated, industry-branched UI component kit meant to be read as grounding context. Before designing:

1. If the user has stated an industry or site type, use it. Otherwise ASK: "What industry or type of website are you building? (SaaS, Restaurant, Portfolio, E-commerce, Local Service, Agency)"
2. Read ONLY: `/DESIGN-PRINCIPLES.md`, `/industries/<industry>/` (DIRECTION.md + sections/), and `/primitives/` + `/components/` as imported.
3. Follow that industry's `DIRECTION.md` exactly — fonts, palette, spacing, motion budget.
4. Assemble pages from that industry's `sections/` files: adapt copy, preserve structure and styling.
5. Never mix aesthetic directions between industries.

The industry → directory router table lives in `/README.md`. Component headers (`USE WHEN / INDUSTRY FIT / PAIRS WITH / DEPS`) are authoritative for selection.

`.wayfinder/` is project-management metadata — never read it for design work.
