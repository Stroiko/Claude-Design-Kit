# Agency Design Direction

The aesthetic commitment for marketing agencies, design studios, and consultancies. Follow it exactly; do not blend with other industries.

## Personality

**Expressive, confident, a little loud.** The site is the portfolio piece: bold display type, electric cobalt, work shown big, opinions stated plainly. Think studio that wins pitches with taste — never corporate consulting, never a template, and not the quiet monochrome of `/industries/portfolio/` (that's an individual; this is a crew with a swagger).

## Typography

- **Display:** Syne (700, 800 — wide, opinionated). **Body:** Manrope (400, 500, 600).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');
  ```
- Scale: 1.333 ratio, 16px base → 16 / 21 / 28 / 38 / 50 / 67.
- Hero headline: 50–67px, Syne 800, tracking-tight, line-height 1.0 — a point of view ("Brands that pick fights win them."), not a service list.
- Section headings: 28–38px Syne 700. Eyebrows: 13px Manrope 600, uppercase, `tracking-widest`, cobalt.
- Body: 16–18px Manrope, line-height 1.6.

## Color

Light bone with black ink and electric cobalt:

```css
:root {
  --background: oklch(0.97 0.005 80);        /* bone */
  --foreground: oklch(0.18 0.01 270);        /* near-black ink */
  --card: oklch(0.94 0.007 80);
  --card-foreground: oklch(0.18 0.01 270);
  --primary: oklch(0.5 0.24 265);            /* electric cobalt */
  --primary-foreground: oklch(0.97 0.005 80);
  --secondary: oklch(0.91 0.008 80);
  --secondary-foreground: oklch(0.18 0.01 270);
  --muted: oklch(0.93 0.007 80);
  --muted-foreground: oklch(0.48 0.01 270);
  --accent: oklch(0.9 0.05 265);             /* pale cobalt wash */
  --accent-foreground: oklch(0.18 0.01 270);
  --border: oklch(0.18 0.01 270 / 14%);
  --input: oklch(0.18 0.01 270 / 18%);
  --ring: oklch(0.5 0.24 265);
  --radius: 0.125rem;
}
```

Rules: cobalt on CTAs, eyebrows, and one expressive moment per page (an underline, a pull-quote, a hover fill). Ink-on-bone carries everything else. NO purple-blue gradients, NO dark mode, NO mint/terracotta/amber.

## Spacing rhythm

- Sections: `py-24 md:py-32` — big statements need air.
- Container: `max-w-6xl mx-auto px-6`; case-study images may run full-bleed.
- Oversized numbers (01/02/03) and thin rules structure lists; near-zero radius keeps edges sharp.
- Deliberate asymmetry: headings may sit two-thirds wide with copy offset right.

## Motion budget

Allowed, at most **two per page**: `marquee` (client names as a text ticker — text, not logos), `text-animate` on the hero statement only. Hover: cobalt fills/underlines at 150–200ms. **Never:** beams, bento hovers, spotlight cards, parallax, cursor followers.

## Imagery

Work shown honestly and large: campaign shots, identity applications, full-bleed case images with factual captions. Team photos candid, not headshot-grid-corporate. Empty slots render `bg-accent` pale-cobalt blocks. No mood-board stock, no MacBook mockups on desks.

## Anti-patterns

Never: "we blend strategy and creativity" copy, service acronym soup, logo walls as image grids (use the text ticker), dark hero + gradient (that's SaaS), monochrome restraint (that's portfolio), carousel case studies, awards badges as trust spam.

## Section order

navbar → hero manifesto → client ticker → work showcase → capabilities → process → case study feature → team → journal teaser → contact CTA → footer. A page needs at least: manifesto hero, work, contact.
