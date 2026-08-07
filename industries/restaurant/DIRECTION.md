# Restaurant Design Direction

The aesthetic commitment for restaurants, cafes, bars, and bakeries. Follow it exactly; do not blend with other industries. This direction is the deliberate opposite of `/industries/saas/`: **light where SaaS is dark, serif where it is sans, photographic where it is geometric, still where it moves.**

## Personality

**Warm, editorial, appetite-first.** The site should feel like a beautifully set table: generous photography, ink-on-paper typography, unhurried whitespace. Think food magazine spread — never a tech landing page, never a delivery-app clone.

## Typography

- **Display:** Fraunces (500, 600 — soft editorial serif). **Body:** Lora (400, 500).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Lora:wght@400;500&display=swap');
  ```
- Scale: 1.333 ratio, 17px base → 17 / 23 / 30 / 40 / 54 / 71.
- Hero headline: 54–71px, weight 500 (Fraunces gets heavy fast — never 700), normal tracking, line-height 1.1. Italic Fraunces is welcome for single accent words.
- Section headings: 30–40px, weight 500. Eyebrow labels: 14px Lora italic, terracotta, lowercase ("from the kitchen") — never uppercase tracking-widest (that's SaaS).
- Body: 17–18px Lora, line-height 1.7. Menus may use Fraunces for dish names, Lora for descriptions, `tabular-nums` for prices.

## Color

Light by default. Pages set:

```css
:root {
  --background: oklch(0.975 0.008 85);       /* warm cream */
  --foreground: oklch(0.28 0.02 50);         /* espresso ink */
  --card: oklch(0.955 0.01 85);
  --card-foreground: oklch(0.28 0.02 50);
  --primary: oklch(0.52 0.13 40);            /* terracotta */
  --primary-foreground: oklch(0.975 0.008 85);
  --secondary: oklch(0.90 0.02 85);
  --secondary-foreground: oklch(0.28 0.02 50);
  --muted: oklch(0.93 0.012 85);
  --muted-foreground: oklch(0.48 0.02 55);
  --accent: oklch(0.88 0.03 120);            /* soft olive */
  --accent-foreground: oklch(0.28 0.02 50);
  --border: oklch(0.28 0.02 50 / 14%);
  --input: oklch(0.28 0.02 50 / 18%);
  --ring: oklch(0.52 0.13 40);
  --radius: 0.25rem;
}
```

Rules: terracotta for reservation CTAs and italic eyebrows only. Olive appears in small doses (dietary tags, dividers). Photography carries the color; the UI stays quiet cream-and-ink. NO dark mode, NO mint, NO neon anything.

## Spacing rhythm

- Sections: `py-20 md:py-28`. Hero may be full-viewport with the image doing the work.
- Container: `max-w-5xl mx-auto px-6` — narrower and more book-like than SaaS. Menus cap at `max-w-3xl`.
- Asymmetry is encouraged: offset image/text splits (`grid-cols-[3fr_2fr]`), overlapping images, captions in margins.
- Thin rules (`border-t border-border`) and generous gaps; small caps or italic captions under photos.

## Motion budget

Almost none. Allowed: `text-animate` ONCE, on the hero headline only, and only the gentle `blurInUp` per-word variant. Hover states: opacity/underline shifts, 200ms. **Never:** marquees, beams, bento hover lifts, spotlight cards, parallax. Stillness is the luxury.

## Imagery

Photography is the site. Full-bleed hero images, tight food close-ups, warm natural light, real plates and hands. Every section should hold at least one photo slot. Treatment: slight warm tone, never desaturated-gray, never HDR. Empty slots render a warm-toned placeholder block — never a gray rectangle with an icon.

## Anti-patterns

Never: dark backgrounds, tech-startup layouts (bento grids, stats bands, logo marquees), uppercase tracking-widest labels, sans-serif display headlines, gradient buttons, stock photos of "chef plating with tweezers under studio light", PDF-only menus, autoplay video with sound, Uber-Eats-style category chips.

## Section order

navbar → hero (full image) → story intro → menu highlights → gallery → press/quotes → reservations → hours & location → footer. A page needs at least: hero, some menu presence, reservations or hours, footer.
