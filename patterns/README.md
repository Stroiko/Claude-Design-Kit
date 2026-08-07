# /patterns/

À-la-carte, industry-agnostic elements and pages — the pickable library for requests like "just a login page" or "a testimonials section." One neutral, token-driven copy per pattern; **the industry DIRECTION.md palette re-skins it**, so a login pattern under `/industries/restaurant/`'s variables comes out cream-and-terracotta with zero extra code.

**The direction-application rule:** a pattern renders under exactly ONE direction's palette. If the user's industry is known, apply that industry's DIRECTION.md (fonts, CSS variables, motion budget). If not, use the neutral defaults in `/styles/globals.css` plus `/DESIGN-PRINCIPLES.md`.

Categories:

- `auth/` — login, signup, password reset, and account pages
- `app/` — dashboard shells, settings pages, data views (the app behind the marketing site)
- `pages/` — utility pages: 404, coming soon, waitlist, legal, blog layouts
- `marketing/` — neutral takes on marketing sections (heroes, testimonials, pricing) for when no industry variant fits

Pick via [INDEX.md](INDEX.md) (generated — one line per pattern). To add a pattern, follow [/CONTRIBUTING.md](../CONTRIBUTING.md).
