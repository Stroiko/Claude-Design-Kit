# Immersive Design Direction

The aesthetic commitment for artistic, experience-first sites — album launches, festivals, creative campaigns, studios that want a *moment* instead of a page. Follow it exactly; do not blend with other industries. **This is the one direction where motion is the medium** — but choreographed motion, not decoration. It is still a website: it must load fast, degrade gracefully, and respect reduced-motion absolutely.

## Personality

**Cinematic, singular, unhurried.** The site is a title sequence: one continuous mood, revealed in scenes as you scroll. Think interactive film credits — never a dashboard, never a template with confetti on top. When in doubt: fewer elements, bigger, slower.

## Typography

- **Display:** Unbounded (600, 800 — wide, spectacular). **Body:** Sora (400, 600).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Sora:wght@400;600&display=swap');
  ```
- Scale: 1.5 ratio, 16px base → 16 / 24 / 36 / 54 / 81 / 121. Yes, 121px — display type may fill the viewport; type IS imagery here.
- Hero/scene titles: 81–121px desktop, Unbounded 800, tracking-tight, line-height 0.95, often broken deliberately across lines.
- Body: 16–18px Sora, used sparingly — this direction speaks in headlines and images, max-w-prose when prose appears.
- Labels: 12–13px Sora 600, uppercase, `tracking-[0.2em]`, muted — like film-credit captions.

## Color

Near-black stage, bone light, one hot signal:

```css
:root {
  --background: oklch(0.11 0.005 300);       /* stage black, warm-violet cast */
  --foreground: oklch(0.96 0.005 90);        /* bone */
  --card: oklch(0.15 0.008 300);
  --card-foreground: oklch(0.96 0.005 90);
  --primary: oklch(0.62 0.26 350);           /* hot magenta — the signal */
  --primary-foreground: oklch(0.11 0.005 300);
  --secondary: oklch(0.2 0.01 300);
  --secondary-foreground: oklch(0.96 0.005 90);
  --muted: oklch(0.18 0.008 300);
  --muted-foreground: oklch(0.62 0.01 300);
  --accent: oklch(0.25 0.03 300);
  --accent-foreground: oklch(0.96 0.005 90);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.62 0.26 350);
  --radius: 0rem;
}
```

Rules: the magenta signal appears in exactly two roles — the primary CTA and ONE recurring motif (a cursor glow, a scene accent, a scroll progress line; pick one per site). Shader/WebGL layers may run their own gradients but must stay in the violet-magenta-black family. NO rainbow palettes, NO neon-everything.

## Motion budget (inverted — motion is the point, so the rules are stricter)

- **Allowed and encouraged:** one WebGL atmosphere layer per page (shader gradient OR particle field — never both), scroll-scrubbed scene changes, pinned storytelling sections, split-text reveals on scene titles, a custom cursor OR magnetic buttons (not both), one page-load sequence under 2.5s.
- **The physics:** scroll-driven animation is scrubbed (tied to scroll position), not triggered; eased motion 400–900ms; nothing loops except the atmosphere layer.
- **Hard limits:** ONE WebGL canvas per page, `devicePixelRatio` capped at 2, render loop pauses when the canvas is offscreen, every three.js scene disposes fully on unmount.
- **`prefers-reduced-motion` is absolute:** every animated component ships a designed static fallback (a styled gradient frame, the final text state) — not a blank hole. The site must be fully usable and beautiful with zero motion.
- **Never:** scroll-jacking (native scroll position is sacred; smooth-scroll libraries only if section-anchor navigation still works), autoplaying audio, cursor trails, more than one simultaneous attention-demanding animation.

## Imagery

Procedural first: shader gradients, particle fields, generative grain — the kit ships no binary assets. Photography, when the user provides it, is treated cinematically: full-bleed, darkened, one image per scene. No stock anything.

## Anti-patterns

Never: template-with-confetti (a normal landing page plus floating shapes), rainbow gradient meshes, three competing animations in one viewport, WebGL for its own sake on content sections, tiny body text over busy shaders, infinite tunnel scrolling with no destination, fake loading screens longer than real loading.

## Section order

preloader (optional, honest) → webgl hero (scene title over atmosphere) → scroll story (2–4 pinned scenes) → horizontal gallery or type wall → manifesto/big-type statement → credits/contact (film-credit style) → minimal footer. A page needs at least: hero, one scrolling scene, contact.

## Engineering rules (specific to this direction)

Three.js scenes live in thin React mounts: `useRef` for the container, `useEffect` for scene lifecycle with full disposal on cleanup — vanilla three.js code, NOT react-three-fiber (the consuming environment renders vanilla three reliably; R3F fragilely). All shader code inline in the component file (self-contained for RAG retrieval). IntersectionObserver pauses rendering offscreen. Type is HTML over the canvas, never rendered inside WebGL — it must stay selectable and accessible.
