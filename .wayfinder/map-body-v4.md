## Destination

The Immersive direction produces a *different* site for every project: DIRECTION.md rewritten as a per-project **Commitment Protocol** (AI invents palette/fonts/motif from the subject, states it, obeys it) over fixed **Physics** (motion grammar, canvas/disposal/reduced-motion rules); WebGL components re-colorable via CSS tokens instead of hard-coded GLSL; five atmosphere variants (gradient, particles, + new terrain, key-art, wireframe) — verified by re-running the album-launch and action-RPG prompts and getting unmistakably different outputs.

## Notes

- Successor to map v3 ([#29](https://github.com/Stroiko/Claude-Design-Kit/issues/29)). Triggered by a real failure: two different briefs produced nearly identical sites (same magenta void). Root causes: one committed look for a direction whose users want singularity; magenta hard-coded in GLSL; only two atmospheres.
- **User decision: full creative freedom** — no prescribed aesthetics; the AI invents the commitment per project. Discipline survives as process (state the commitment, stay coherent) + physics (unchanged, binding) + global DESIGN-PRINCIPLES.
- Same conventions as prior maps: execution in the map, `tsc --noEmit` + `npm run index` before every push, resolution = comment + close + decision line. Map body: `.wayfinder/map-body-v4.md`.

## Decisions so far

- [Rewrite Immersive DIRECTION](https://github.com/Stroiko/Claude-Design-Kit/issues/37) — Commitment Protocol (invent + state + obey, per subject) over unchanged binding physics; identical commitments for different briefs named as failure (commit 33cae85).
- [Parameterize WebGL and section colors](https://github.com/Stroiko/Claude-Design-Kit/issues/38) — shader palettes from commitment tokens (oklch-safe resolution), fonts tokenized as --font-display/--font-body, reference page recast as one example commitment with a real declared token block (commit 580f194).
- [Three new atmospheres](https://github.com/Stroiko/Claude-Design-Kit/issues/39) — terrain, key-art (user imagery, zero-context without an image), wireframe/starfield; five atmospheres total, all token-colored (commit 040df19).

- [Gate first run FAILED](https://github.com/Stroiko/Claude-Design-Kit/issues/40) — outputs escaped magenta but converged on ink-paper-vermilion with identical composition; causes: Claude Design context bleed (KJ FLUX/ASHFALL fictions recurred from prior sessions), protocol without forced choices, single hero composition.
- [Commitment protocol teeth](https://github.com/Stroiko/Claude-Design-Kit/issues/42) — reject-first-instinct step, forced axis choices, 3+-axis divergence from anything in context (commit 94e57fc).
- [Hero composition variants](https://github.com/Stroiko/Claude-Design-Kit/issues/43) — all five heroes take bottom-left/centered/right-rail/top-editorial with matched scrims (commit 94e57fc).

- [Commitment as embedded artifact](https://github.com/Stroiko/Claude-Design-Kit/issues/44) — advisor synthesis: two rejections with reasons required, whole block embedded above the page's token styles; protocol runs are output-verifiable and divergence is a mechanical diff (commit af381b7).

## Not yet specified

- Whether the Commitment Protocol pattern should extend to any other direction (it should NOT for the six business industries — their fixed looks are the product; revisit only if a user asks for a "brand-me-from-scratch" mode).

## Out of scope

- Changing the six business industries' fixed DIRECTIONs.
- Bespoke game/experience tier (still permanently out).
- Binary assets in the repo (key-art hero consumes user-provided images at runtime; ships none).
