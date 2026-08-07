## Destination

A seventh direction, **Immersive** (`/industries/immersive/`), for artistic/experience-first sites: a DIRECTION.md committing to a cinematic aesthetic with an inverted motion budget (motion is the medium), ~12–15 sections covering the "awwwards tier" moves — WebGL atmosphere layers, scroll-driven storytelling, typographic theater, interaction garnish — plus a reference page, all verified rendering in Claude Design. Explicitly OUT: Bruno-Simon-tier bespoke games (one-of-one experiences can't and shouldn't be templates).

## Notes

- Successor to maps [#1](https://github.com/Stroiko/Claude-Design-Kit/issues/1) and [#24](https://github.com/Stroiko/Claude-Design-Kit/issues/24) (both closed). Same conventions: execution in the map, `tsc --noEmit` + `npm run index` before every push, resolution = comment + close + decision line here.
- **Technical approach (decided from the user's Claude Design capability test):** plain three.js in thin React mounts (`useRef` + `useEffect`, cleanup on unmount) — NOT react-three-fiber. Claude Design renders vanilla three via CDN import maps reliably; R3F is fragile there (no bundler, ESM-CDN drei is hit-or-miss). Textures procedural/shader-only — no binary assets, which also suits the repo.
- Performance/a11y are first-class in this direction: `prefers-reduced-motion` → static fallback frame; pause rendering offscreen (IntersectionObserver); one WebGL canvas per page; mobile degradation strategy in DIRECTION.md.
- Map body source of truth: `.wayfinder/map-body-v3.md`.

## Decisions so far

- [Immersive DIRECTION.md + scaffold + router update](https://github.com/Stroiko/Claude-Design-Kit/issues/31) — cinematic stage-black + hot magenta, Unbounded/Sora, inverted motion budget under strict physics; router gains the seventh option + motion-modifier rule; three added (commit 4596687).

## Not yet specified

- Audio-reactive elements — revisit only if a user brings a concrete need via intake.
- Whether any immersive moves should ALSO land as `/effects/` usable by other directions (e.g. a subtle shader gradient for agency heroes) — decide after the gate.

## Out of scope

- Bespoke game/experience sites (Bruno Simon tier) — one-of-one by nature; not templatizable without destroying their value.
- react-three-fiber and binary assets (textures, HDRIs, GLB models) in the kit.
- Video-rendered output (Claude Design outputs live HTML, not video).
