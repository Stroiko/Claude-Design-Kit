# Immersive Design Direction

The direction for artistic, experience-first sites — album launches, game reveals, festivals, creative campaigns, statement pieces. **This direction works differently from every other industry.** The six business industries each commit to ONE fixed look, because a restaurant wants the proven restaurant look. Immersive users want the opposite: singularity. So this direction has no house style. Instead it has a **protocol for inventing one** — and unbreakable **physics** underneath.

Two immersive sites should never look alike. If your commitment for a game site could be pasted onto an album site unchanged, you have failed before writing a line of code.

## PART 1 — THE COMMITMENT PROTOCOL

Before designing anything, invent a bespoke aesthetic commitment **from the user's subject** — its world, era, material, temperature. The protocol has three mandatory steps; skipping any of them produces the convergent sameness this direction exists to prevent.

### Step 1 — Name and reject the obvious

State your FIRST instinct for this subject in one line — then discard it. The first idea is almost always a model default (dark void + one neon; ink-on-paper + vermilion; synthwave grid), and defaults are what make two different projects look alike. Your commitment must beat your first idea, not be it.

### Step 2 — Decide every axis explicitly

Choose a pole on EACH axis — no axis may be left to habit, and the full set must fit the subject:

```
FIRST INSTINCT (rejected): <one line — what you're deliberately not doing>
MOOD: <three adjectives drawn from the subject>
VALUE: <light stage | dark stage | mid/tinted stage — voids are one option, not the default>
TEMPERATURE: <warm | cold | clashing — and where the heat sits>
STAGE + SIGNAL: <exact colors pulled from the subject's world. A scorched-earth RPG might be
  ash charcoal + ember orange; a reef film abyss blue + bioluminescent green.>
TYPE CLASS: <serif | sans | slab | mono | mixed — then the actual Google Fonts pairing +
  import, declared as --font-display / --font-body in the token block>
DENSITY: <sparse and monumental | layered and busy | editorial columns>
HERO COMPOSITION: <bottom-left | centered | right-rail | top-editorial — the heroes take
  this as a prop; the same composition twice in a row is a tell that you're on autopilot>
ATMOSPHERE: <ONE of: gradient, particles, terrain, key-art, wireframe — matched to the subject>
MOTIF: <ONE recurring signature: custom cursor OR magnetic buttons OR a scroll-progress line...>
```

### Step 3 — Diverge from anything already in context

If ANY prior aesthetic is visible to you — an earlier project in this workspace, a previous version of this site, the SIGNAL BLOOM reference example, a design system attachment — your commitment must differ from it on at least three axes (value, temperature, type class, hero composition, atmosphere). Continuity is for revisions the user asked for; a NEW subject never inherits an old commitment. Two briefs producing the same stage color, type class, and composition is a failed protocol run, even if both pages are individually handsome.

Then declare the palette as the page's CSS variables (the same token block every industry uses — `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--font-display`, `--font-body`, …) so every kit component, including the WebGL atmospheres, re-skins to it automatically. **State the full commitment to the user, then obey it for the whole page exactly as strictly as other industries obey their fixed DIRECTION.** Coherence is the discipline; the choices are yours.

## PART 2 — THE PHYSICS (non-negotiable, identical for every commitment)

### Motion grammar

- Scroll-driven animation is **scrubbed** (tied to scroll position), not triggered; eased motion 400–900ms; nothing loops except the atmosphere layer.
- At most one attention-demanding animation per viewport at a time.
- **Never:** scroll-jacking (native scroll position is sacred; smooth-scroll only if anchor navigation still works), autoplaying audio, cursor trails, fake loading screens longer than real loading.

### WebGL limits

- **ONE WebGL canvas per page.** `devicePixelRatio` capped at 2 via manual buffer sizing. Render loop pauses when the canvas is offscreen (IntersectionObserver). Every scene disposes fully on unmount (geometries, materials, textures, `renderer.dispose()`, `forceContextLoss()`).
- Atmosphere colors come from the page's CSS variables (the commitment's token block) — components read them at mount; never hard-code a palette into a scene.

### Accessibility & degradation

- **`prefers-reduced-motion` is absolute:** every animated component ships a designed static fallback (a styled frame, the final text state) — never a blank hole. The site must be fully usable and beautiful with zero motion.
- Type is HTML over the canvas, never rendered inside WebGL — selectable, accessible, indexable.
- Text stays readable over atmospheres: scrim or contrast-check anything that sits on a live layer.
- Global `/DESIGN-PRINCIPLES.md` applies in full (contrast, focus states, labels, alt text).

### Imagery

- The kit ships no binary assets: atmospheres are procedural. User-provided art (key art, photography) is welcome and treated cinematically — full-bleed, one image per scene, via the key-art atmosphere or `image-scene`.

## Anti-patterns (quality floor, not taste rules)

Never: a template-with-confetti (a normal landing page plus floating shapes), three competing animations in one viewport, tiny body text over busy shaders, WebGL on content sections (the one canvas is the atmosphere), identical commitments for different subjects, or landing on a model default because no one decided otherwise — dark-void-plus-neon, ink-paper-vermilion, and synthwave-grid are the three great attractors, and arriving at any of them without having rejected a first instinct is *the absence of a commitment, not a commitment.*

## Section order

preloader (optional, honest) → atmosphere hero (scene title over the chosen atmosphere) → scroll story (2–4 pinned scenes) → horizontal gallery or type wall → manifesto/big-type statement → credits/contact → minimal footer. A page needs at least: hero, one scrolling scene, contact.

## Engineering rules

Three.js scenes live in thin React mounts: `useRef` for the container, `useEffect` for scene lifecycle with full disposal on cleanup — vanilla three.js code, NOT react-three-fiber (the consuming environment renders vanilla three reliably; R3F fragilely). All shader code inline in the component file (self-contained for retrieval). See any `webgl-hero-*.tsx` for the canonical mount/dispose/fallback pattern.
