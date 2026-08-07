# Portfolio Design Direction

The aesthetic commitment for personal sites, designers, photographers, and creative showcases. Follow it exactly; do not blend with other industries.

## Personality

**Stark, personal, work-first.** The site is a gallery wall: the work is loud, the chrome is silent. One voice, first person, zero corporate padding. Think printed monograph, not agency site — and absolutely not a SaaS landing page.

## Typography

- **One family for everything: Archivo** (400, 500 body · 700, 800 display).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&display=swap');
  ```
- Scale: 1.414 ratio, 16px base → 16 / 23 / 32 / 45 / 64 / 90.
- Hero name/statement: 64–90px desktop, weight 800, tracking-tight, line-height 0.95. It may break mid-word or run edge-to-edge — scale is the decoration.
- Section labels: 14px, weight 500, uppercase allowed here (index-style: "SELECTED WORK 2019–2026").
- Body: 16–18px, weight 400, max-w-prose. Project metadata in 14px with tabular figures.

## Color

Monochrome. No accent color — emphasis comes from scale, weight, and inversion:

```css
:root {
  --background: oklch(0.99 0 0);             /* paper */
  --foreground: oklch(0.17 0 0);             /* ink */
  --card: oklch(0.97 0 0);
  --card-foreground: oklch(0.17 0 0);
  --primary: oklch(0.17 0 0);                /* ink — CTAs are ink blocks */
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.94 0 0);
  --secondary-foreground: oklch(0.17 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.5 0 0);
  --accent: oklch(0.94 0 0);
  --accent-foreground: oklch(0.17 0 0);
  --border: oklch(0.17 0 0 / 12%);
  --input: oklch(0.17 0 0 / 16%);
  --ring: oklch(0.17 0 0);
  --radius: 0rem;
}
```

Rules: hover states invert (ink block ↔ paper) or underline — never tint. The only color on the page comes from the work itself. NO gradients, NO accent hues, radius zero everywhere.

## Spacing rhythm

- Sections: `py-20 md:py-28`, but the hero may be a full viewport of type.
- Container: `max-w-6xl mx-auto px-6`; work images may go full-bleed (`w-screen`) deliberately.
- Index lists use thin rules between rows (`divide-y`), generous `py-6` rows.
- Asymmetry over symmetry: two-thirds/one-third splits, big left margins on text blocks.

## Motion budget

Allowed: `text-animate` ONCE on the hero statement (per-word, subtle), and hover inversions/underlines at 150ms. **Never:** marquees, bento hovers, beams, spotlight cards, scroll-triggered reveals, page transitions. The stillness is the confidence.

## Imagery

The work at maximum size: full-bleed project images, consistent aspect ratios inside a project, honest screenshots without device mockups unless the work is mobile. Captions small and factual ("Identity system, 2025 — with Studio X"). Empty slots render `bg-secondary` blocks. No decorative photography, no headshot-hero.

## Anti-patterns

Never: accent colors, rounded cards, three-column icon features, testimonials walls, stats bands, "I'm a passionate creative" copy, skill percentage bars, service tier pricing, dark mode toggles, animated skill clouds, SaaS furniture of any kind.

## Section order

navbar (minimal: name + 2–3 links) → hero statement → work index or grid → featured project(s) → about → services/capabilities (short) → contact → footer (one line). A page needs at least: hero statement, work, contact.
