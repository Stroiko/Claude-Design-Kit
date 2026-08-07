# Immersive Design Direction

The direction for artistic, experience-first sites — album launches, game reveals, festivals, creative campaigns, statement pieces. **This direction works differently from every other industry.** The six business industries each commit to ONE fixed look, because a restaurant wants the proven restaurant look. Immersive users want the opposite: singularity. So this direction has no house style. Instead it has a **protocol for inventing one** — and unbreakable **physics** underneath.

Two immersive sites should never look alike. If your commitment for a game site could be pasted onto an album site unchanged, you have failed before writing a line of code.

## PART 1 — THE COMMITMENT PROTOCOL

Before designing anything, invent a bespoke aesthetic commitment **from the user's subject** — its world, era, material, temperature — and STATE it to the user in this shape:

```
MOOD: <three adjectives drawn from the subject — not "cinematic, singular, unhurried" every time>
STAGE + SIGNAL: <the dominant field color and the ONE accent — pulled from the subject's world.
  A scorched-earth RPG might be ash charcoal + ember orange. A reef documentary might be
  abyss blue + bioluminescent green. Light stages are allowed; voids are not mandatory.>
TYPE: <display + body — any Google Fonts pairing that serves the mood; state the import.
  A brutal condensed face, an elegant serif, a mono — choose like a title designer would.>
ATMOSPHERE: <ONE of: gradient, particles, terrain, key-art, wireframe — matched to the subject>
MOTIF: <ONE recurring signature: custom cursor OR magnetic buttons OR a scroll-progress line...>
```

Then declare the palette as the page's CSS variables (the same token block every industry uses — `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, …) so every kit component, including the WebGL atmospheres, re-skins to it automatically. **Obey your commitment for the whole page exactly as strictly as other industries obey their fixed DIRECTION.** Coherence is the discipline; the choices are yours.

What the protocol does NOT constrain: palette family, light vs dark, font personality, mood. What it does require: ONE stage + ONE signal (not five accents), ONE atmosphere, ONE motif, and a commitment stated before the first component is placed.

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

Never: a template-with-confetti (a normal landing page plus floating shapes), three competing animations in one viewport, tiny body text over busy shaders, WebGL on content sections (the one canvas is the atmosphere), identical commitments for different subjects, defaulting to dark-void-plus-purple because no one decided otherwise — *that is the absence of a commitment, not a commitment.*

## Section order

preloader (optional, honest) → atmosphere hero (scene title over the chosen atmosphere) → scroll story (2–4 pinned scenes) → horizontal gallery or type wall → manifesto/big-type statement → credits/contact → minimal footer. A page needs at least: hero, one scrolling scene, contact.

## Engineering rules

Three.js scenes live in thin React mounts: `useRef` for the container, `useEffect` for scene lifecycle with full disposal on cleanup — vanilla three.js code, NOT react-three-fiber (the consuming environment renders vanilla three reliably; R3F fragilely). All shader code inline in the component file (self-contained for retrieval). See any `webgl-hero-*.tsx` for the canonical mount/dispose/fallback pattern.
