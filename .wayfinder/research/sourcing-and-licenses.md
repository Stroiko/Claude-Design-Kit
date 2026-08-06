# Sourcing & Licensing Survey: MIT-Safe React/Tailwind UI Components to Vendor

**Researched:** 2026-08-06 · **Method:** primary sources only (GitHub LICENSE files, official docs, registry JSON endpoints, official terms pages). Every claim carries its source URL. Where a fact could not be verified against a primary source, that is stated explicitly.

**Context:** target is a *public, MIT-licensed* component repo that vendors (copies source into) components from external registries.

---

## Quick verdict table

| Source | License | Safe to vendor into public MIT repo? |
|---|---|---|
| shadcn/ui | MIT (© 2023 shadcn) | **Yes** — keep copyright notice |
| Magic UI | MIT (© Magic UI) | **Yes** — keep copyright notice |
| Tailark | MIT (© 2025 Irung) | **Yes** — keep copyright notice |
| Aceternity UI | Proprietary ("Aceternity License" + site T&C) | **No** — redistribution of source explicitly prohibited |
| 21st.dev | Per-author; no verifiable per-component license surface | **No, not by default** — verify at the author's original repo first |

---

## 1. shadcn/ui

### License
- **MIT License, "Copyright (c) 2023 shadcn".** Verified from the actual license file:
  - Raw text: https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md
  - Blob URL: https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
- The license grants rights to "use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies," conditioned on: *"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."* (same source)

### CLI usage (verified against https://ui.shadcn.com/docs/cli)
- Docs show the pnpm form; the CLI is package-manager-agnostic (the docs page offers npm/pnpm/yarn/bun tabs):
  ```
  npx shadcn@latest init
  npx shadcn@latest add button          # any built-in component
  npx shadcn@latest add @<registry>/<component>   # namespaced third-party registries
  ```
- The docs confirm namespaced registries (e.g. `@acme/auth`) and flags like `--overwrite` and `--dry-run`. Source: https://ui.shadcn.com/docs/cli
- Built-in third-party namespaces are defined in the official registry directory JSON: https://ui.shadcn.com/r/registries.json (see @magicui, @tailark, @aceternity entries below). Per https://ui.shadcn.com/docs/directory: "These registries are built into the CLI with no additional configuration required."

### Vendoring & attribution
- **Safe to vendor.** MIT permits copying, modifying, and redistributing, including in a public repo.
- Attribution is **required in the MIT sense**: vendored copies are "substantial portions," so the copyright + permission notice must accompany them (in CREDITS.md / a LICENSES folder — not necessarily in every file). shadcn/ui imposes no attribution requirement beyond MIT itself (no additional terms found in the repo license file: https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md).

### CREDITS.md line
```
Components derived from shadcn/ui (https://github.com/shadcn-ui/ui) — Copyright (c) 2023 shadcn — MIT License (https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
```

---

## 2. Magic UI (magicui.design)

### License
- **MIT License, "Copyright (c) Magic UI".** Verified from the actual license file:
  - Raw text: https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE.md
  - Blob URL: https://github.com/magicuidesign/magicui/blob/main/LICENSE.md
- Standard MIT grant and notice-preservation condition (same source).

### Registry install commands (both patterns verified 2026-08-06)
1. **Namespaced (current documented pattern).** The Marquee docs page shows exactly:
   ```
   pnpm dlx shadcn@latest add @magicui/marquee
   ```
   (npm equivalent: `npx shadcn@latest add @magicui/marquee`.) Source: https://magicui.design/docs/components/marquee
   The `@magicui` namespace is registered in shadcn's built-in registry directory with URL template `https://magicui.design/r/{name}` — no components.json config needed. Source: https://ui.shadcn.com/r/registries.json
2. **Direct-URL pattern still works.** `https://magicui.design/r/marquee.json` was fetched and confirmed to be a valid shadcn registry item (`"name": "marquee"`, `"type": "registry:ui"`, full `marquee.tsx` source in `files`, plus CSS keyframes). So this remains valid:
   ```
   npx shadcn@latest add "https://magicui.design/r/marquee.json"
   ```
   Source: https://magicui.design/r/marquee.json

### Components for the requested categories (exact `name` values from the registry manifest)
Verified against https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json (registry name `magic-ui`, homepage `https://magicui.design`):
- **Marquee:** `marquee` (demos: `marquee-demo`, `marquee-demo-vertical`, `marquee-logos`, `marquee-3d`)
- **Text shimmer / animated text:** `animated-shiny-text`, `text-animate`, `sparkles-text`, `spinning-text`; buttons: `shimmer-button`, `shiny-button`
- **Bento grid:** `bento-grid` (demos: `bento-demo`, `bento-demo-vertical`)
- **Animated beam:** `animated-beam` (demos: `animated-beam-demo`, `animated-beam-unidirectional`, `animated-beam-bidirectional`, `animated-beam-multiple-inputs`, `animated-beam-multiple-outputs`)
- **Spotlight-like:** `magic-card` (cursor-following spotlight/gradient hover card). **Note:** Magic UI has no component literally named "spotlight" in its registry manifest; `magic-card` is the closest effect. (The well-known "Spotlight" component is Aceternity's — see §4, not safe to vendor.)

### Vendoring & attribution
- **Safe to vendor.** MIT; same notice-preservation duty as shadcn/ui.

### CREDITS.md line
```
Components derived from Magic UI (https://magicui.design, https://github.com/magicuidesign/magicui) — Copyright (c) Magic UI — MIT License (https://github.com/magicuidesign/magicui/blob/main/LICENSE.md).
```

---

## 3. Tailark (tailark.com)

### Repo & license
- **Public repo:** https://github.com/tailark/blocks ("Shadcn marketing blocks"). Org page: https://github.com/tailark
- **MIT License, "Copyright (c) 2025 Irung".** Verified from the actual license file (note the British spelling of the filename, `LICENCE.md`):
  - Raw text: https://raw.githubusercontent.com/tailark/blocks/main/LICENCE.md
  - Blob URL: https://github.com/tailark/blocks/blob/main/LICENCE.md
- The README also states: "Tailark is released under the MIT License." Source: https://raw.githubusercontent.com/tailark/blocks/main/README.md

### Structure & how blocks are copied (verified from README + live registry)
- The repo is a **shadcn registry** with two bases: **Base UI** (default, served at `/r`) and **Radix UI** (served at `/r/radix`), each with its own registry index. Source: https://raw.githubusercontent.com/tailark/blocks/main/README.md
- Live index verified: https://tailark.com/r/registry.json → registry name `"Tailark Base UI"`, homepage `https://tailark.com`. Item names are category-numbered blocks, e.g. `bento-1`…`bento-14`, `contact-1`…`contact-10`, `features-8`, `expandable-features-1`…`-22`, `faqs-1`…`-5`, plus `core-utils`, primitives (`accordion`, `button`, `card`, `chart`), SVG logos, motion primitives, and illustrations.
- **Install commands:**
  - Built-in namespace (registered in shadcn's directory as `@tailark` → `https://tailark.com/r/{name}.json`; source: https://ui.shadcn.com/r/registries.json):
    ```
    npx shadcn@latest add @tailark/hero-section-1     # example; browse names at https://tailark.com/r/registry.json
    ```
  - The repo README additionally documents adding a `@tailark-oss` namespace in `components.json` pointing at the registry URL, then `npx shadcn@latest add @tailark-oss/[component-name]`. Source: https://raw.githubusercontent.com/tailark/blocks/main/README.md
  - Direct URL form also follows the standard pattern: `npx shadcn@latest add "https://tailark.com/r/<name>.json"` (URL template from https://ui.shadcn.com/r/registries.json).

### Vendoring & attribution
- **Safe to vendor.** MIT; preserve the copyright notice.

### CREDITS.md line
```
Marketing blocks derived from Tailark (https://tailark.com, https://github.com/tailark/blocks) — Copyright (c) 2025 Irung — MIT License (https://github.com/tailark/blocks/blob/main/LICENCE.md).
```

---

## 4. Aceternity UI (ui.aceternity.com) — NOT SAFE TO VENDOR

### Free vs pro
- **Free tier:** the main component library at https://ui.aceternity.com/components (the site advertises "200+ free, copy-paste components and blocks"; source: https://ui.aceternity.com/). Free components even have a shadcn registry namespace: `@aceternity` → `https://ui.aceternity.com/registry/{name}.json` (source: https://ui.shadcn.com/r/registries.json).
- **Pro tier:** paid templates/blocks at https://pro.aceternity.com and the All-Access pass at https://ui.aceternity.com/pricing.

### License terms (primary sources)
- **Terms & Conditions** (https://ui.aceternity.com/terms) state, verbatim:
  - "Unless otherwise stated, Aceternity Solutions Private Limited and/or its licensors own the intellectual property rights for all material on ui.aceternity.com."
  - Users must NOT: "Republish material from ui.aceternity.com", "Sell, rent or sub-license material", "Reproduce, duplicate or copy material", "Redistribute content from ui.aceternity.com."
  - Grant is limited: "You may access this from ui.aceternity.com for your own personal use subjected to restrictions set in these terms and conditions."
- **Licence page** (https://ui.aceternity.com/licence — the "Aceternity License", same text family as https://pro.aceternity.com/licence): grants "an ongoing, non-exclusive, worldwide license" to build unlimited end products (personal, client, commercial, sellable), **but**:
  - "You cannot re-distribute the Item as a stock image or its source files, regardless of modifications."
  - "You cannot sell, resell, or distribute the Item or derivative works on any marketplace."
- **No MIT or other open-source license was found** for Aceternity's components. No public GitHub repo with a LICENSE covering the component source was located. The homepage FAQ poses "Can I use Aceternity UI components in commercial projects?" but the answer content was not retrievable in this research; regardless, *use in end products* is a different right from *redistribution of source*, and redistribution is what vendoring requires.

### Verdict
- **NOT safe to vendor.** Copy-pasting Aceternity component source into a public MIT repo is redistribution of source files, which both the T&C ("Republish/Reproduce/Redistribute" prohibitions) and the Aceternity License ("cannot re-distribute … its source files, regardless of modifications") forbid. Re-licensing it as MIT is also impossible — the copyright belongs to Aceternity Solutions Private Limited.
- Safe alternative: use Aceternity components inside private/end-product apps per their license, and for the public repo **re-implement equivalent effects from scratch** or take the Magic UI MIT equivalents (e.g. `magic-card` instead of Spotlight).

### CREDITS.md line
- None — do not include Aceternity code in the repo. If a component is *inspired by* (independently re-implemented, no copied code) an Aceternity effect, an optional courtesy line: `Inspired by effects popularized by Aceternity UI (https://ui.aceternity.com) — no Aceternity code is included.`

---

## 5. 21st.dev — NOT SAFE BY DEFAULT; verify per component

### Install mechanism (verified from official sources)
- Classic registry-URL install, from the official repo README (https://github.com/serafimcloud/21st, https://raw.githubusercontent.com/serafimcloud/21st/main/README.md):
  ```
  npx shadcn@latest add "https://21st.dev/r/{user}/{component}"
  # e.g. npx shadcn@latest add "https://21st.dev/r/shadcn/accordion"
  ```
- Newer "Component Libraries" CLI (official 21st.dev blog post by founder Serafim Korablev, 2026-05-26, https://21st.dev/community/blog/component-libraries):
  ```
  npx @21st-dev/cli login
  npx @21st-dev/cli publish ./src/button.tsx --description "Primary button"
  npx @21st-dev/cli add @your-scope/<component-name>?api_key=$API_KEY_21ST
  ```
  Visibility levels: "public (show up in the 21st catalog after review), unlisted (installable by URL but hidden), or private (scoped to your team's API key)." (same source)
- The open-source registry CLI lives at https://github.com/21st-dev/registry.

### Licensing model — what is and is not verifiable
- **Platform code** (the 21st.dev website/marketplace itself) is MIT: https://github.com/serafimcloud/21st/blob/main/LICENSE (© 2024 21st.dev). **This does not license the components hosted on it.**
- **Terms of Service** (https://21st.dev/terms) contain **no per-component license grant to downloaders**. The only relevant clause: "All code, content, and materials published on the Marketplace…are the sole and exclusive property of their respective authors and 21st Labs Inc." That is an ownership statement, not a redistribution license.
- The component page inspected (https://21st.dev/r/shadcn/accordion) shows author attribution and dependencies but **no license field**. The official README and the Component Libraries blog post are likewise silent on component licensing.
- **Unverified:** any claim that "all 21st.dev components are MIT." Third-party sites assert this, but no primary source (ToS, README, docs, component page) confirms it. Treat as unconfirmed.

### How to check an individual component's license before taking it
1. Open the component page (`https://21st.dev/r/{user}/{component}` or via the author profile `https://21st.dev/@{user}`) and identify the author and any linked source repo.
2. Go to the author's **original GitHub repo** for that component/library and read its LICENSE file — that is the only primary license source. (Example: components mirrored from shadcn/ui trace back to the MIT license at https://github.com/shadcn-ui/ui/blob/main/LICENSE.md.)
3. If no upstream repo/license exists, contact the author or skip the component. Default legal position without a license: **all rights reserved by the author** — not vendorable.

### Verdict
- **Not safe to vendor by default.** Only take a 21st.dev component when its author's upstream repo carries MIT (or an equally permissive license), and credit that upstream, not 21st.dev.

### CREDITS.md line (only for components whose upstream license was verified MIT)
```
<component> by <author> (https://21st.dev/@<author>), original source: <upstream repo URL> — Copyright (c) <year> <author> — MIT License (<upstream LICENSE URL>).
```

---

## Recommended repo hygiene for the curated MIT repo

1. Root `LICENSE` = your own MIT license for the compilation.
2. `CREDITS.md` (or `THIRD_PARTY_LICENSES/`) with one entry per upstream (lines given above), each including the upstream copyright line and a link to the upstream license text — this satisfies MIT's "copyright notice and permission notice shall be included in all copies or substantial portions" condition (https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md and the identical clauses in Magic UI's and Tailark's licenses).
3. Optional but tidy: a header comment in each vendored file, e.g. `// Derived from Magic UI (MIT) — https://magicui.design/docs/components/marquee`.
4. Exclude Aceternity code entirely; gate any 21st.dev intake behind an upstream-license check recorded in CREDITS.md.

## Source URL index

- https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md · https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
- https://ui.shadcn.com/docs/cli · https://ui.shadcn.com/docs/directory · https://ui.shadcn.com/r/registries.json
- https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE.md · https://github.com/magicuidesign/magicui/blob/main/LICENSE.md · https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json · https://magicui.design/docs/components/marquee · https://magicui.design/r/marquee.json
- https://github.com/tailark/blocks · https://raw.githubusercontent.com/tailark/blocks/main/LICENCE.md · https://raw.githubusercontent.com/tailark/blocks/main/README.md · https://tailark.com/r/registry.json
- https://ui.aceternity.com/ · https://ui.aceternity.com/terms · https://ui.aceternity.com/licence · https://pro.aceternity.com/licence · https://ui.aceternity.com/pricing · https://ui.aceternity.com/components
- https://github.com/serafimcloud/21st · https://raw.githubusercontent.com/serafimcloud/21st/main/README.md · https://github.com/serafimcloud/21st/blob/main/LICENSE · https://21st.dev/terms · https://21st.dev/r/shadcn/accordion · https://21st.dev/community/blog/component-libraries · https://github.com/21st-dev/registry
