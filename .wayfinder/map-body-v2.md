## Destination

The kit serves à-la-carte requests as well as whole sites: generated INDEX.md catalogs across the whole repo (lint-gated `npm run index`), a `/patterns/` scaffold for industry-agnostic elements with a documented intake workflow (CONTRIBUTING.md) as the growth path, and router v2 (single-element mode + mixing rules) verified in Claude Design — with the original whole-site flow unregressed.

## Notes

- Successor effort to [map #1](https://github.com/Stroiko/Claude-Design-Kit/issues/1) (closed, destination reached). Same conventions: execution carried into the map, `tsc --noEmit` before every push, resolution = comment + close + decision line here.
- **Styling model decided:** neutral + re-skin — one token-driven copy per pattern; DIRECTION.md palettes re-skin it. No per-industry copies.
- **No AI-authored seed content:** the user supplies elements over time; each is integrated via the CONTRIBUTING.md intake recipe (re-token → header → place → `npm run index` → CREDITS if external).
- Map body source of truth: `.wayfinder/map-body-v2.md` in the repo (edit file → PATCH this issue).

## Decisions so far

- [Catalog generator + repo-wide indexes](https://github.com/Stroiko/Claude-Design-Kit/issues/25) — `npm run index` harvests USE WHEN headers into generated INDEX.md catalogs (lint-gated, idempotent, dependency-free); all 121 components pass (commit c6874df).
- [Router v2 + patterns scaffold + intake doc](https://github.com/Stroiko/Claude-Design-Kit/issues/26) — single-element mode via catalogs, one-palette-per-page mixing rule, /patterns/ tree, CONTRIBUTING.md intake recipe (commit 71c441a).

## Not yet specified

- Which patterns actually get added first — depends entirely on what elements the user brings to intake.
- Whether /patterns/ categories need per-category DIRECTION-like guidance once populated.

## Out of scope

- AI-authored seed patterns (explicitly declined — intake is the growth path).
- Per-industry styled copies of patterns.
- Publishing/tooling beyond the index script.
