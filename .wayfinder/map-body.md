## Destination

Claude-Design-Kit fully built: router README, DESIGN-PRINCIPLES.md, /primitives/, /components/, /effects/, six /industries/ (saas, restaurant, portfolio, ecommerce, local-service, agency), CREDITS.md, MIT LICENSE — verified in Claude Design: it asks the industry question (or respects a stated one), assembles pages from repo sections per that industry's DIRECTION.md, SaaS vs Restaurant output is unmistakably different, and the repo stays ~150 files.

## Notes

- **Execution is carried into this map** (overrides wayfinder's plan-only default): tickets build and push the repo, not just decide.
- Skills to consult per ticket: `frontend-design`, `shadcn-ui`, `prototype`, `grilling`.
- Every component file opens with the header block: USE WHEN / INDUSTRY FIT / PAIRS WITH / DEPS.
- Every external file gets a CREDITS.md line (source + license); re-style all imports to the industry DIRECTION.md — no raw pastes. Only MIT sources (shadcn/ui, Magic UI, Tailark); never Aceternity or unverified 21st.dev.
- 20–30 section components per industry max. `tsc --noEmit` must pass before every push.
- Workspace: `n:\agentWorkspaces\personal\claudeDesignKit`; auth via fine-grained PAT in `.env` (Contents + Issues read/write).

## Decisions so far

- [Sourcing & licenses survey](https://github.com/Stroiko/Claude-Design-Kit/issues/2) — shadcn/ui, Magic UI, Tailark are MIT-safe to vendor; Aceternity and 21st.dev are not — re-implement instead.
- [How Claude Design reads connected repos](https://github.com/Stroiko/Claude-Design-Kit/issues/3) — mechanics undocumented; the router must be an instruction, not a mechanism: imperative README block mirrored in CLAUDE.md, keyword manifest, chunk-survivable files.
- [Scaffold repo + router README](https://github.com/Stroiko/Claude-Design-Kit/issues/4) — pushed: router README + CLAUDE.md, DESIGN-PRINCIPLES, MIT LICENSE, CREDITS policy, tsc-verifiable scaffold (commit 9e36c5e).
- [Primitives from shadcn/ui](https://github.com/Stroiko/Claude-Design-Kit/issues/5) — 12 new-york-v4 primitives vendored with USE WHEN headers; radix-ui is the single runtime dep (commit de0a283).
- [Effects library](https://github.com/Stroiko/Claude-Design-Kit/issues/6) — 6 Magic UI effects vendored, framework-agnostic (next-themes removed); use gated by DIRECTION.md motion budgets (commit 38deb13).
- [Shared components](https://github.com/Stroiko/Claude-Design-Kit/issues/7) — 13 agnostic components (nav/forms/feedback/data); globals.css now carries the full token set + @theme wiring (commit 31f0a01).
- [SaaS direction + core sections](https://github.com/Stroiko/Claude-Design-Kit/issues/8) — dark/technical/spacious with electric mint, Space Grotesk + Inter; 10 core sections shipped (commit 548b9a7).
- [SaaS remaining sections + reference page](https://github.com/Stroiko/Claude-Design-Kit/issues/9) — 17 total sections + Relay reference page; Phase 1 build complete (commit cbc395d).
- [Phase 1 gate: test in Claude Design](https://github.com/Stroiko/Claude-Design-Kit/issues/10) — PASSED: industry question fires first; stated industry skips it; brief echoed DIRECTION.md fonts/palette and the Relay story.
- [Iterate README grounding wording](https://github.com/Stroiko/Claude-Design-Kit/issues/11) — no iteration needed; router wording kept as-is, revisit only if Phase 2 shows drift.
- [Restaurant direction + core sections](https://github.com/Stroiko/Claude-Design-Kit/issues/12) — warm/editorial/photo-first, opposite of SaaS on every axis; 10 Casa Olea sections (commit 0a52496).
- [Restaurant remaining sections + reference page](https://github.com/Stroiko/Claude-Design-Kit/issues/13) — 15 total sections + Casa Olea reference page; Phase 2 build complete (commit 81b5f02).
- [Phase 2 gate: contrast test](https://github.com/Stroiko/Claude-Design-Kit/issues/14) — PASSED: SaaS and Restaurant outputs unmistakably different, sections rendered faithfully, content adapted not parroted. Four remaining industries + polish graduated from fog.

- [Portfolio direction + core sections](https://github.com/Stroiko/Claude-Design-Kit/issues/15) — stark monochrome, single Archivo family, radius zero, no accent color; 9 Anna Reyes sections (commit f882d84).

- [Ecommerce direction + core sections](https://github.com/Stroiko/Claude-Design-Kit/issues/17) — warm neutral retail, Instrument Sans, green only for buy actions; 9 Aldercrest sections (commit 22a7f15).

- [Portfolio remaining sections + reference page](https://github.com/Stroiko/Claude-Design-Kit/issues/16) — 13 total sections + Anna Reyes reference page with inline minimal header (commit 4fd6278).
- [Ecommerce remaining sections + reference page](https://github.com/Stroiko/Claude-Design-Kit/issues/18) — 13 total sections + Aldercrest storefront reference page, prices consistent kit-wide (commit pending push).

## Not yet specified

- (all graduated into tickets as of the Phase 2 gate; per-industry /effects/ additions fold into each industry's tickets)

## Out of scope

- Deploying/publishing the components (no npm package, no demo site).
- Industries beyond the six named.
- Paid component sources; visual regression tooling.
