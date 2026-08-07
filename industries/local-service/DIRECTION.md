# Local Service Design Direction

The aesthetic commitment for plumbers, dentists, gyms, salons, contractors, and clinics. Follow it exactly; do not blend with other industries.

## Personality

**Dependable, plainspoken, easy to call.** The site is a firm handshake: clear promises, a phone number you can find with your thumb, proof you're licensed and local. Think the best contractor in town finally got a decent website — never a startup, never a brochure of stock handshakes.

## Typography

- **Display:** Plus Jakarta Sans (600, 700). **Body:** Source Sans 3 (400, 600).
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=Source+Sans+3:wght@400;600&display=swap');
  ```
- Scale: 1.25 ratio, 17px base → 17 / 21 / 27 / 33 / 42 / 52.
- Hero headline: 42–52px, weight 700, line-height 1.1 — a plain promise ("Burst pipe? We're there in an hour."), not a slogan.
- Section headings: 27–33px, weight 700. Eyebrows: 14px, weight 600, uppercase, `tracking-wide`, navy — informational, not decorative.
- Body: 17–18px, line-height 1.6. Phone numbers big and `tabular-nums` everywhere they appear.

## Color

Light, high-trust navy + one warm action color:

```css
:root {
  --background: oklch(0.985 0.003 240);      /* cool white */
  --foreground: oklch(0.25 0.03 255);        /* deep navy ink */
  --card: oklch(0.96 0.006 240);
  --card-foreground: oklch(0.25 0.03 255);
  --primary: oklch(0.62 0.15 55);            /* warm amber — call/quote actions */
  --primary-foreground: oklch(0.2 0.03 60);
  --secondary: oklch(0.93 0.01 240);
  --secondary-foreground: oklch(0.25 0.03 255);
  --muted: oklch(0.95 0.006 240);
  --muted-foreground: oklch(0.5 0.02 250);
  --accent: oklch(0.9 0.03 240);             /* pale navy — info chips */
  --accent-foreground: oklch(0.25 0.03 255);
  --border: oklch(0.25 0.03 255 / 12%);
  --input: oklch(0.25 0.03 255 / 16%);
  --ring: oklch(0.62 0.15 55);
  --radius: 0.5rem;
}
```

Rules: amber only on "Call now" / "Get a quote" actions — the two things a visitor came to do. Navy carries headings and trust marks. NO dark sections, NO gradients, NO tech-mint or terracotta.

## Spacing rhythm

- Sections: `py-16 md:py-24` — practical density, people are skimming for a number.
- Container: `max-w-6xl mx-auto px-6`. Forms cap at `max-w-lg`.
- Cards with visible borders are fine here (this industry earns them): `rounded-lg border bg-card`.
- The phone number appears in the navbar, the hero, and the footer. Minimum.

## Motion budget

None. Zero effects from /effects/. Hover states: color shifts at 150ms. This is the one industry where nothing moves, ever — motion reads as marketing, and this site is a utility.

## Imagery

Real-work photography: trucks, teams in uniform, finished jobs, the actual storefront. Before/after pairs are the highest-value asset. Headshots for team sections are fine — this is the industry where faces build trust. Empty slots render `bg-accent` blocks. No stock handshakes, no hard-hat clip art.

## Anti-patterns

Never: dark heroes, countdown urgency, "24/7 EMERGENCY" in flashing red (a calm amber bar suffices), fake review counts, tech-startup furniture (bento grids, beams, stat bands with abstract numbers), serif elegance, full-bleed type heroes, chat widgets mocked into screenshots.

## Section order

navbar (with phone) → hero (promise + call/quote CTAs) → trust band (licensed · insured · years · rating) → services grid → how-we-work steps → service area → reviews → quote form → FAQ → footer (with phone, hours, license #). A page needs at least: hero with phone, services, a way to request a quote, footer.
