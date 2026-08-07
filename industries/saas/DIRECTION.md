# SaaS Design Direction

The aesthetic commitment for every SaaS/software/developer-tool site built from this kit. Follow it exactly; do not blend with other industries.

## Personality

**Precise, technical, spacious.** The site should feel like a sharp engineering team built it: confident restraint, generous darkness, one electric accent used sparingly. Think modern dev-tool marketing (Linear, Vercel, Resend energy) — never a corporate brochure, never a gradient carnival.

## Typography

- **Display:** Space Grotesk (600, 700). **Body:** Inter (400, 500, 600).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  ```
- Scale: 1.25 ratio, 16px base → 16 / 20 / 25 / 31 / 39 / 49 / 61.
- Hero headline: 49–61px desktop, weight 700, `tracking-tight` (-0.02em), line-height 1.05.
- Section headings: 31–39px, weight 600. Eyebrow labels above headings: 13px, uppercase, `tracking-widest`, accent color.
- Body copy: 16–18px, `text-muted-foreground` for supporting text. Code/metrics may use `font-mono tabular-nums`.

## Color

Dark by default — apply `.dark` semantics; pages set these on `:root`:

```css
:root {
  --background: oklch(0.13 0.01 260);        /* near-black, blue-cold */
  --foreground: oklch(0.97 0.005 260);
  --card: oklch(0.17 0.012 260);
  --card-foreground: oklch(0.97 0.005 260);
  --primary: oklch(0.78 0.15 165);           /* electric mint — THE accent */
  --primary-foreground: oklch(0.15 0.02 165);
  --secondary: oklch(0.22 0.015 260);
  --secondary-foreground: oklch(0.97 0.005 260);
  --muted: oklch(0.20 0.012 260);
  --muted-foreground: oklch(0.65 0.01 260);
  --accent: oklch(0.22 0.015 260);
  --accent-foreground: oklch(0.97 0.005 260);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.78 0.15 165);
  --radius: 0.625rem;
}
```

Rules: the mint accent appears in exactly three places per page — primary CTA, eyebrow labels, and one highlight (a metric, a "popular" badge, or a beam). Everything else is monochrome. Hairline borders (`border-border`) do the separating, not boxes-on-boxes. NO purple, NO blue-to-purple gradients.

## Spacing rhythm

- Sections: `py-24 md:py-32`. Hero: `pt-32 md:pt-40 pb-24`.
- Container: `max-w-6xl mx-auto px-6`. Text blocks cap at `max-w-2xl`.
- Grid gaps: `gap-6` cards, `gap-16` between a section's heading block and its content.
- Left-aligned by default; centered only for the hero and final CTA.

## Motion budget

Allowed effects, at most **two per page**: `marquee` (logos strip), `animated-shiny-text` (announcement pill only), `bento-grid` hover states, `animated-beam` (one integrations diagram), `magic-card` (one pricing highlight). Micro-interactions: 150–250ms color/opacity on hover. **Never animates:** headlines flying in, scroll-jacking, parallax, background particle fields.

## Imagery

Product UI screenshots in dark browser-chrome frames with hairline borders and subtle `shadow-2xl`; abstract geometry (grids of dots, thin connecting lines) as decoration. No stock photos of people at laptops, no 3D blob illustrations.

## Anti-patterns

Never: purple/violet gradient washes, glassmorphism cards, emoji in headings, three-identical-icon-cards as the only features answer, centered walls of text, badge-soup heros ("AI-powered ✨ blazing fast 🚀"), fake dashboard screenshots with lorem numbers.

## Section order

navbar → hero (announcement pill optional) → logos-marquee → features-bento → how-it-works → integrations-beam → stats-band → testimonials → pricing → faq → cta → footer. A page needs at least: hero, one features section, pricing or CTA, footer.
