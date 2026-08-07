# E-commerce Design Direction

The aesthetic commitment for online stores, product catalogs, and brand shops. Follow it exactly; do not blend with other industries.

## Personality

**Clean, tactile, product-first.** The store gets out of the product's way: neutral studio surfaces, disciplined grids, one deep green that means "buy." Think considered direct-to-consumer brand — never a marketplace clone, never a tech landing page.

## Typography

- **One family: Instrument Sans** (400, 500 body · 600, 700 display).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');
  ```
- Scale: 1.25 ratio, 16px base → 16 / 20 / 25 / 31 / 39 / 49.
- Hero headline: 39–49px, weight 600, normal tracking, line-height 1.1 — quieter than other industries; the product photo is the hero.
- Product names: 16–18px weight 500. Prices: same size as names, weight 400, `tabular-nums` — never bold, never colored red.
- Eyebrows/labels: 13px, weight 500, uppercase, `tracking-wide`, muted.

## Color

Light, warm-neutral, one commerce accent:

```css
:root {
  --background: oklch(0.985 0.004 90);       /* warm off-white */
  --foreground: oklch(0.22 0.01 60);         /* soft black */
  --card: oklch(0.965 0.005 90);             /* studio gray — product tiles */
  --card-foreground: oklch(0.22 0.01 60);
  --primary: oklch(0.42 0.08 160);           /* deep forest green — buy actions */
  --primary-foreground: oklch(0.985 0.004 90);
  --secondary: oklch(0.93 0.006 90);
  --secondary-foreground: oklch(0.22 0.01 60);
  --muted: oklch(0.95 0.005 90);
  --muted-foreground: oklch(0.5 0.01 70);
  --accent: oklch(0.9 0.02 90);
  --accent-foreground: oklch(0.22 0.01 60);
  --border: oklch(0.22 0.01 60 / 10%);
  --input: oklch(0.22 0.01 60 / 14%);
  --ring: oklch(0.42 0.08 160);
  --radius: 0.375rem;
}
```

Rules: green only on add-to-cart/shop CTAs and in-stock notes. Product tiles sit on `bg-card` studio gray. Sale prices are ink with a struck-through original — never red. NO neon, NO dark sections, NO gradient buttons.

## Spacing rhythm

- Sections: `py-16 md:py-24` — denser than other industries; shopping is scanning.
- Container: `max-w-7xl mx-auto px-6` — the widest in the kit; product grids want room.
- Product grids: 2-col mobile → 3–4-col desktop, `gap-4 md:gap-6`, consistent aspect ratios (4/5 for products, 3/2 for editorial).
- Generous padding inside tiles; tight, information-dense product meta.

## Motion budget

Allowed: `marquee` ONCE as a thin announcement bar (free shipping line) at the very top, and hover states: product image swap or gentle scale-[1.02] at 200ms, underlines on links. **Never:** bento hovers, beams, spotlight cards, text animations, autoplaying carousels.

## Imagery

Product photography carries everything: consistent studio backgrounds matching `--card`, identical aspect ratios within a grid, honest color. Lifestyle shots only in editorial/lookbook sections (3/2). Empty slots render `bg-card` blocks with the product name. No 3D renders pretending to be photos, no watermarked stock.

## Anti-patterns

Never: red sale badges everywhere, countdown timers, fake "3 people are viewing this", dark hero sections, marketplace clutter (star ratings on every tile), SaaS furniture (stats bands, integration beams), serif romance (that's restaurant), full-bleed type heroes (that's portfolio).

## Section order

announcement bar (optional) → navbar → hero (product-led) → category tiles → featured products → product story/split → values band → reviews → newsletter → footer. A page needs at least: hero, one product grid, footer.
