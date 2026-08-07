# Contributing — the intake recipe

How components get added to this kit, whether by a human, an AI session, or the two together. The kit grows one file at a time; this recipe is what keeps every file pickable, license-clean, and on-style. It applies equally to code you paste in, a component you link, or an element you describe and have the AI write.

## The recipe

1. **Decide placement.**
   - Styled for one industry → `industries/<x>/sections/` (must follow that `DIRECTION.md` exactly).
   - Industry-agnostic element or page → `/patterns/<auth|app|pages|marketing>/`.
   - Industry-agnostic *functional* building block (form, nav, table) → `/components/<subfolder>/`.
   - Motion/visual effect → `/effects/`.

2. **Re-token.** The kit's whole re-skin mechanism depends on this:
   - Replace every hex/named color with token classes (`bg-background`, `text-muted-foreground`, `border-border`, `bg-primary`, …).
   - Remove hard-coded font families; use `font-sans`/`font-serif` and note in the header that the DIRECTION.md import decides the face.
   - Snap arbitrary sizes to the type scale and spacing rhythm (see `/DESIGN-PRINCIPLES.md`).
   - Strip motion that DESIGN-PRINCIPLES or the target DIRECTION's motion budget disallows; everything must respect `prefers-reduced-motion`.

3. **Write the header** (mandatory — `npm run index` fails without it) and name the file descriptively (`login-split-image.tsx`, never `Login2.tsx`):
   ```tsx
   /**
    * <filename>.tsx
    * USE WHEN: <one sentence: the situation this is for>
    * INDUSTRY FIT: <industries, or "all">. AVOID FOR: <industry + why, or "-">
    * PAIRS WITH: <sibling components>
    * DEPS: <imports from /primitives, /components, /effects>
    */
   ```

4. **License check (external code only).** Only MIT-licensed sources may be vendored (shadcn/ui, Magic UI, Tailark verified; Aceternity and unverified 21st.dev are NOT vendorable — re-implement instead). Add a row to [CREDITS.md](CREDITS.md) with source and license.

5. **Verify and ship.**
   ```
   npm run index      # regenerates catalogs; fails if the header is missing
   npm run typecheck  # must pass clean
   ```
   Commit both the component and the regenerated `INDEX.md` files.

## For AI sessions: "add this to the kit"

When a user pastes code or links a component and asks for it to be added, follow the five steps above literally. Ask only one question if placement is ambiguous ("industry-specific or à la carte?"). Preserve the source's structure and behavior; re-style everything else. Never commit a component whose colors, fonts, or motion bypass the token system — that breaks re-skinning for every industry at once.

## House rules

- One component per file; files self-contained enough to be read (or RAG-retrieved) in isolation.
- 20–30 sections per industry maximum; prefer replacing a weak variant over accumulating near-duplicates.
- Accessibility per `/DESIGN-PRINCIPLES.md` is non-negotiable: real elements, labels, focus states, alt text.
- Realistic default copy in the component's fictional voice — never lorem ipsum.
