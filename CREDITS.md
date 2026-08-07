# Credits

Every file vendored from an external source is recorded here with its origin and license. Sourcing policy (per [.wayfinder/research/sourcing-and-licenses.md](.wayfinder/research/sourcing-and-licenses.md)): only MIT-licensed sources are vendored — shadcn/ui, Magic UI, Tailark, and HextaUI (license verified 2026-08). Aceternity UI and unverified 21st.dev components are **not** vendored; anything inspired by them is re-implemented from scratch.

| File(s) | Source | License |
|---|---|---|
| `/primitives/button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `card.tsx`, `badge.tsx`, `dialog.tsx`, `tabs.tsx`, `accordion.tsx`, `avatar.tsx`, `select.tsx`, `separator.tsx` | shadcn/ui registry (`new-york-v4` style) | MIT © 2023 shadcn |
| `/effects/marquee.tsx`, `animated-shiny-text.tsx`, `text-animate.tsx`, `bento-grid.tsx`, `animated-beam.tsx`, `magic-card.tsx` | Magic UI registry (`magicui.design/r/`), lightly adapted (icon + import paths, next-themes removed) | MIT © Magic UI |
| `/patterns/auth/login-centered-card.tsx` | HextaUI `SignIn1`, heavily adapted (re-tokened to CSS variables, rebuilt on kit primitives, external images replaced) | MIT © 2026 Preet Suthar |
| `/industries/immersive/sections/webgl-hero-gradient.tsx` (inline `SIMPLEX_NOISE_GLSL` shader string only) | stegu/webgl-noise — 3D simplex noise GLSL by Ian McEwan, Ashima Arts (maintained by Stefan Gustavson) | MIT © 2011 Ashima Arts |

- **shadcn/ui** — https://ui.shadcn.com — MIT © 2023 shadcn — https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
- **Magic UI** — https://magicui.design — MIT © Magic UI — https://github.com/magicuidesign/magicui/blob/main/LICENSE.md
- **Tailark** — https://tailark.com — MIT © 2025 Irung — https://github.com/tailark/blocks/blob/main/LICENCE.md
- **HextaUI** — https://hextaui.com — MIT © 2026 Preet Suthar — https://github.com/preetsuthar17/HextaUI/blob/master/LICENSE
- **webgl-noise** — https://github.com/stegu/webgl-noise (orig. https://github.com/ashima/webgl-noise) — MIT © 2011 Ashima Arts — attribution header retained in the shader string
