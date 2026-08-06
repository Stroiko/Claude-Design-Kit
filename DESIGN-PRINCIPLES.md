# Design Principles

Global rules for every industry. An industry's `DIRECTION.md` chooses fonts, palette, and mood — these rules apply underneath all of them and are never overridden.

## Typography

- Exactly two font families per site: one display, one body, both declared in `DIRECTION.md`. Never introduce a third.
- Use a modular scale (each `DIRECTION.md` states its ratio and base). No arbitrary font sizes outside the scale.
- Body text: 16px minimum, line-height 1.5–1.7, max line length ~65–75ch.
- Headings are tight: line-height 1.0–1.2, letter-spacing slightly negative for large display sizes.
- One `h1` per page. Heading levels never skip.

## Spacing & layout

- Spacing comes from a single scale (Tailwind's default 4px scale). Section padding, gaps, and margins use scale steps — never one-off pixel values.
- Sections breathe: vertical padding `py-16` minimum on mobile, `py-24`–`py-32` on desktop, per the industry's rhythm.
- One container width per site (declared in `DIRECTION.md`), applied consistently.
- Align to a grid. Centered-everything is a smell; use the layout patterns the industry's sections already establish.

## Color

- All colors come from the CSS variables the industry's `DIRECTION.md` declares. No hex values inline in components.
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large text).
- One accent color does the accenting. If everything is colorful, nothing is.

## Motion

- Respect `prefers-reduced-motion` — the global stylesheet enforces it; never work around it.
- Each industry's `DIRECTION.md` sets a motion budget: which `/effects/` are allowed and what animates. Outside that budget, nothing moves.
- Animations are 150–400ms, ease-out, and happen once. No infinite loops except effects explicitly built for it (e.g. marquee).
- Never animate layout (width/height/top/left); animate transform and opacity.

## Accessibility

- Interactive elements are real elements: `button` for actions, `a` for navigation. Visible focus states always.
- Images get meaningful `alt` text; decorative images get `alt=""`.
- Forms: every input has a label; errors are text, not just color.
- Icon-only buttons get `aria-label`.

## Anti-slop (what this kit must never produce)

- No purple-to-blue gradient on dark backgrounds as a default aesthetic. Gradients only where a `DIRECTION.md` explicitly allows them.
- No emoji as icons. Use `lucide-react`.
- No walls of centered text. No three-identical-cards-with-icons as the reflexive "features" answer when the industry provides a better section.
- No fake specificity: placeholder copy should read like the user's business, not "Lorem ipsum" or "Unlock synergies with our cutting-edge platform."
- No glassmorphism, neumorphism, or drop-shadow-on-everything unless the industry direction calls for it.
- Never mix two industries' aesthetics. When in doubt, less: fewer effects, fewer colors, more whitespace.

## Component conventions

- One component per file, named descriptively (`hero-split-image.tsx`, never `Hero2.tsx`).
- Every file opens with the header block:
  ```tsx
  /**
   * <filename>.tsx
   * USE WHEN: <the situation this component is for>
   * INDUSTRY FIT: <industries>. AVOID FOR: <industries + why>
   * PAIRS WITH: <sibling components>
   * DEPS: <imports from /primitives, /effects>
   */
  ```
- Class merging via `cn()` from `/lib/utils`. Variants via `class-variance-authority`.
- Components are self-contained: a file read in isolation (or retrieved as a RAG chunk) must make sense on its own.
