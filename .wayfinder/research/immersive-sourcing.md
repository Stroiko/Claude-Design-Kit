# Immersive Direction — Sourcing Research

Research date: 2026-08-06. Context: adding an "Immersive" (awwwards-tier) direction to a React/Tailwind
component kit consumed as AI grounding context. Hard constraints: **vanilla three.js in thin React
wrappers (useRef + useEffect), no react-three-fiber, no binary assets (procedural/shader textures only),
self-contained single-file components.**

Legend: **[VERIFIED]** = checked against the primary source at the given URL this session.
**[INFERENCE]** = widely-documented convention or reasoned conclusion, not directly quoted from a fetched source.

---

## 1. Vendorable material (license-checked)

| Source | Repo / URL | License (evidence) | Verdict for vendoring into an MIT repo |
|---|---|---|---|
| **three.js core + examples/jsm** | https://github.com/mrdoob/three.js | **MIT** — [VERIFIED] LICENSE at https://github.com/mrdoob/three.js/blob/dev/LICENSE ("The MIT License"). Single repo-wide license; examples/jsm code is in-repo. | **Safe.** Retain the MIT copyright notice. [INFERENCE] caveat: some example *assets* (models, textures) carry separate licenses — irrelevant here since we're asset-free, but don't copy example media. |
| **Codrops demos** (github.com/codrops) | Licensing page: https://tympanus.net/codrops/licensing/ | **MIT for downloadable code demos** — [VERIFIED]: "Code Demos (MIT License)… permitting commercial and open-source reuse." [VERIFIED] via GitHub API: many codrops org repos declare MIT (SlideshowAnimations, OnScrollTypographyAnimations, ScrollBlurTypography, ElasticGridScroll, PixelTransition, Staggered3DGridAnimations, RotatingOnScrollAnimations…); some older repos have **no declared license** file. | **Safe with attribution** (include MIT notice + credit Codrops/author). For repos without a LICENSE file, the licensing page still states demos are MIT, but prefer repos with an explicit MIT file. Note: Codrops *design freebies* (assets) are NOT redistributable — code only. |
| **akella/webgl-mouseover-effects** (Codrops author demo — hover distortion, vanilla three.js) | https://github.com/akella/webgl-mouseover-effects | **MIT** — [VERIFIED] via GitHub license API (spdx_id: `mit`). Tutorial: https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/ | **Safe with attribution.** Good direct basis for hover-distortion image planes. |
| **lygia** (multi-language shader function library) | https://github.com/patriciogonzalezvivo/lygia | **NOT MIT.** [VERIFIED] README: "dual-licensed under the Prosperity License and the Patron License for sponsors and contributors" — non-commercial by default; commercial rights require sponsoring/contributing or purchasing a license. | **NOT safe to vendor.** Do not copy lygia snippets into an MIT repo. |
| **shadergradient** | https://github.com/ruucm/shadergradient | **MIT** — [VERIFIED] README footer: "MIT © ruucm, stone-skipper". | **License-safe but architecture-incompatible**: it is built on `@react-three/fiber` (peer dep). Don't take the components; you *may* port its GLSL shader source into a vanilla ShaderMaterial with attribution. |
| **stegu/webgl-noise** (Ashima simplex/Perlin GLSL noise) | https://github.com/stegu/webgl-noise | **MIT** — [VERIFIED] README: "MIT license… OSI-approved and very permissive." Simplex 2D/3D/4D, classic Perlin (+ periodic), cellular/Worley. "Completely self contained with no dependency on external data" — no texture lookups. | **Safe.** The canonical choice for procedural noise in shaders (gradient backgrounds, grain, distortion fields) with zero binary assets. Keep the header comment/notice. |
| **vanta.js** (animated three.js backgrounds: WAVES, FOG, BIRDS, CLOUDS, TOPOLOGY…) | https://github.com/tengbao/vanta | **MIT** — [VERIFIED] README. Vanilla three.js (not R3F), procedural — "no binary assets or texture files… ~120kb min+gzip". | **Safe with attribution.** Good reference/vendor source for particle-field and fog-type backgrounds; effects are self-contained classes. |
| **pmndrs/postprocessing** (EffectComposer alternative; has built-in NoiseEffect/grain) | https://github.com/pmndrs/postprocessing | **Zlib** — [VERIFIED] via GitHub license API (spdx_id: `Zlib`). Permits use/modification/redistribution with origin + notice preserved. | **Safe-with-attribution** (Zlib is MIT-compatible in practice; keep its license header on any vendored file). For a noise/grain overlay, though, a 10-line fragment shader is simpler than vendoring this. |
| **Shadertoy shaders** | https://www.shadertoy.com/terms | **Default CC BY-NC-SA 3.0** — [VERIFIED via terms page + search]: default license unless the shader declares otherwise; NonCommercial. | **NOT safe** by default. Only usable if the individual shader declares MIT/CC0 in its header. |
| **GSAP (incl. ScrollTrigger/SplitText)** | https://gsap.com/community/standard-license/ | Free incl. commercial, but proprietary — see §4. | **NOT safe to vendor.** Fine as a *user-installed* dependency; never copy source into the kit. |

**Practical mapping to the four needs** [INFERENCE from the above]:
- **Animated shader-gradient backgrounds** → write from scratch: fullscreen plane + ShaderMaterial mixing 3–4 uniform colors with `stegu/webgl-noise` simplex (MIT). Port ideas (not code structure) from shadergradient if desired.
- **Particle fields** → three.js `Points` + `BufferGeometry` + custom PointsMaterial/ShaderMaterial — official examples (MIT) are directly vendorable; vanta BIRDS/WAVES as reference.
- **Image/texture distortion on hover/scroll** → adapt akella/webgl-mouseover-effects (MIT) — but replace loaded images with procedurally generated `CanvasTexture`/`DataTexture` to honor the no-binary-assets rule.
- **Noise/grain overlays** → 15-line fragment shader (hash-based film grain) on a fullscreen quad, or pure-CSS SVG `feTurbulence` data-URI overlay (no WebGL context cost). Write from scratch; trivially original.

---

## 2. Technique patterns

### (a) Scroll-scrubbed WebGL scenes
- **Proven approach**: never mutate the scene inside the `scroll` event. Store a target progress (`scrollY / (docHeight - viewportHeight)` or a per-section value), then in the single `requestAnimationFrame` loop **lerp current → target** (`current += (target - current) * 0.1`) and drive uniforms/camera from `current`. With Lenis, read progress from `lenis.on('scroll', ...)` or `lenis.progress` — Lenis's raf already smooths it. [VERIFIED that Lenis exposes a raf-driven scroll with lerp: https://github.com/darkroomengineering/lenis]
- To sync WebGL planes with DOM elements, measure `getBoundingClientRect()` once (and on resize), then offset by scroll — the pattern used across Codrops WebGL/DOM demos, e.g. https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/ [VERIFIED article exists; pattern detail INFERENCE].
- **Pitfalls** [INFERENCE]: layout reads (`getBoundingClientRect`) inside the rAF cause thrash — cache them; unthrottled `scroll` listeners cause jank on Safari; use passive listeners.

### (b) Pinned / sticky storytelling sections
- **Prefer CSS `position: sticky`** inside a tall wrapper (`height: 300vh` wrapper, `sticky top-0 h-screen` child), computing section progress from `wrapper.getBoundingClientRect()` in the rAF. Zero scroll-hijacking, works with native scroll and Lenis (see (c)). [INFERENCE — standard pattern; sticky compat confirmed by Lenis README, below.]
- **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`) can replace JS for pure-CSS pinned progress, but as of mid-2026 support is: Chrome/Edge 115+, Safari 26 (Sept 2025), **Firefox still behind the `layout.css.scroll-driven-animations.enabled` flag** (Interop 2026 item). Use behind `@supports (animation-timeline: scroll())` with a JS fallback. [VERIFIED via search: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations, https://caniuse.com/mdn-css_properties_animation-timeline_scroll]
- Scroll-jacking libraries (fullPage-style) conflict with the kit's constraints and accessibility — avoid. [INFERENCE]

### (c) Smooth scroll — Lenis
- [VERIFIED] https://github.com/darkroomengineering/lenis — **MIT**, npm package **`lenis`**, current version **1.3.26**.
- API: `new Lenis({ autoRaf: true })`, or manual `lenis.raf(time)` inside your own rAF (preferred here so one loop drives both Lenis and three). Options: `duration` (1.2 default), `lerp` (0.1), `easing`, `orientation`.
- **`position: sticky` works**: README Features — "Runs on native scroll — wraps the browser's own scroll, so `position: sticky`, anchor links, and accessibility keep working." Known limitation: "position fixed seems to lag on MacOS Safari pre-M1." [VERIFIED, quoted from README]

### (d) Split-text reveals without GSAP SplitText
- Note: GSAP SplitText itself is now free (see §4) — usable as a dependency, but not vendorable.
- **SplitType** — https://github.com/lukePeavey/SplitType, npm **`split-type`@0.3.4**, license **ISC** [VERIFIED via npm registry; the repo has no LICENSE file detected by GitHub's API]. ISC is functionally MIT-equivalent — safe as a dep; vendoring is acceptable with notice, but the missing repo LICENSE file makes "dep, not vendor" the cleaner call. Splits into lines/words/chars, preserves nested HTML.
- **Motion (motion.dev)**: core `motion` package is MIT and its free `stagger()` utility animates arrays of elements (https://motion.dev/docs/stagger) — but **`splitText` is a paid Motion+ exclusive** (https://motion.dev/docs/split-text) [VERIFIED via search]. Don't rely on it for a redistributable kit.
- **Recommended for the kit** [INFERENCE]: write a ~30-line splitter from scratch (wrap `textContent` words/chars in spans, `aria-label` on the parent + `aria-hidden` on spans for a11y), animate with CSS keyframes + `animation-delay: calc(var(--i) * 40ms)` or Motion's stagger. Line-splitting needs measurement (that's SplitType's value); word/char splitting doesn't.

### (e) Custom cursors
- Gate on capability, not UA: only enable when `matchMedia('(pointer: fine)')` (and optionally `(hover: hover)`) matches — touch devices report `pointer: coarse`. Respect `matchMedia('(prefers-reduced-motion: reduce)')` by disabling the trailing/lerped follower (or the whole cursor). Sources: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer, https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. [Standard platform behavior; MDN links — not fetched this session, so treat as INFERENCE with authoritative pointers.]
- Implementation [INFERENCE]: fixed-position div, `transform: translate3d` updated in rAF with lerp; never `cursor: none` on the document unless the custom cursor is actually active; also listen to the media queries' `change` events (hybrid laptops).

### (f) Page transitions in multi-page HTML — View Transitions API (mid-2026)
- **Same-document** transitions: Baseline Newly Available — Chrome/Edge 111+, Safari 18+, **Firefox 144+** (Oct 2025). [VERIFIED via https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available and MDN]
- **Cross-document (MPA)** transitions (`@view-transition { navigation: auto }`): Chrome/Edge 126+, Safari 18.2+, **Firefox: not yet shipped (behind a flag; named Interop 2026 priority)**. [VERIFIED via search: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API, https://events-3bg.pages.dev/jotter/in-all-major-browsers/]
- **Recommendation** [INFERENCE]: ship cross-document view transitions as pure-CSS progressive enhancement (no JS needed, no-op in Firefox). Avoid JS "barba-style" transition libraries in this kit — they fight the self-contained single-file constraint.

---

## 3. Performance guardrails (verified against three.js docs)

### Teardown on React unmount
[VERIFIED] Official doc: https://threejs.org/manual/en/how-to-dispose-of-objects.html
- Removing a mesh from the scene does **not** free GPU memory: "you have to explicitly dispose the geometry and material via `dispose()`."
- `geometry.dispose()`, `material.dispose()`, and — separately — `texture.dispose()`: "The disposal of a material has no effect on textures. They are handled separately since a single texture can be used by multiple materials."
- `WebGLRenderTarget.dispose()` frees its texture/framebuffer/renderbuffer.
- Shader programs are shared: "a shader program is only deleted if all related materials are disposed."
- Monitor leaks with `renderer.info`.
- [INFERENCE + forum-verified] In the unmount cleanup also call `renderer.setAnimationLoop(null)` (or cancel your rAF), `renderer.dispose()`, and `renderer.forceContextLoss()` to release the WebGL context immediately rather than waiting for GC — this is the accepted fix for "Too many active WebGL contexts" in SPA remounts (https://discourse.threejs.org/t/i-have-a-problem-in-warning-too-many-active-webgl-contexts-oldest-context-will-be-lost/41300). Also remove the canvas from the DOM and drop refs.

### Pause rendering when offscreen
[INFERENCE — standard pattern, aligned with three.js manual's on-demand-rendering guidance]: wrap the component's canvas in an `IntersectionObserver`; when not intersecting, stop the rAF loop (`setAnimationLoop(null)`); restart on re-entry. Also listen for `document.visibilitychange`. This is essential when several immersive components coexist on one page.

### devicePixelRatio
[VERIFIED] https://threejs.org/manual/en/responsive.html — the manual explicitly says `renderer.setPixelRatio()` "is strongly NOT RECOMMENDED"; instead compute buffer size yourself: `renderer.setSize(Math.floor(clientWidth * pixelRatio), Math.floor(clientHeight * pixelRatio), false)` so "the size being used is the size we requested."
- [INFERENCE — community convention] Cap the ratio: `const pr = Math.min(window.devicePixelRatio, 2)` — 3x+ phone DPRs quadruple fragment cost for invisible gains in shader-heavy scenes.

### WebGL context limit
[VERIFIED] https://threejs.org/manual/en/multiple-scenes.html — "The browser limits how many WebGL contexts you can have. Typically that limit is around 8 of them. As soon as you create the 9th context the oldest one will be lost." Chrome's observed per-tab limit is ~16 (https://discourse.threejs.org/t/i-have-a-problem-in-warning-too-many-active-webgl-contexts-oldest-context-will-be-lost/41300); Safari is stricter. Contexts can't share resources.
- **Guardrail for the kit** [INFERENCE]: document a budget of **1–2 WebGL contexts per page**. For pages needing many "canvases," use the official pattern from the same manual page: one fullscreen canvas + one scene per virtual element, rendered with `setScissorTest(true)` + `setScissor`/`setViewport` per element rect.

---

## 4. GSAP status check (2026, post-Webflow)

[VERIFIED] https://gsap.com/community/standard-license/
- **Yes — GSAP and all plugins (ScrollTrigger, SplitText, MorphSVG, etc.) are 100% free, including commercial use**: "All of GSAP including the plugins that were formerly 'members-only'… can be used in commercial projects at no charge." (This has been true since GSAP 3.13, April 2025, after the Webflow acquisition.)
- **But it is NOT open source and NOT vendorable into an MIT repo**: the Standard License keeps all IP with Webflow ("All intellectual property rights in GSAP Products… remain the exclusive property of Webflow"), grants a non-exclusive use license with **no sublicensing or redistribution-under-other-terms provision**, and prohibits reverse engineering to create competitive products. Copying GSAP source into an MIT-licensed kit would be unlicensed redistribution.
- **Verdict**: components may *reference* GSAP as an optional peer/user dependency (`npm i gsap`) and that's fully free — but the kit itself should not bundle or vendor GSAP code, and given the kit's goals (self-contained, MIT, AI-groundable), preferring Lenis + rAF + CSS keeps everything license-clean.

---

## Recommended sourcing plan

### Vendor (copy into the kit, with license headers/attribution)
1. **stegu/webgl-noise** GLSL functions (MIT) — the procedural backbone: simplex 2D/3D for gradient backgrounds, distortion fields, grain. Keep the MIT header comment in each shader string.
2. **Selected Codrops demo logic** from MIT-declared repos + **akella/webgl-mouseover-effects** (MIT) — adapt the hover-distortion plane and scroll-typography patterns; add an attribution comment (author + Codrops article URL + MIT notice).
3. **three.js example snippets** (MIT) where useful (Points setups, fullscreen-quad pass) — code only, never example assets.

### Write from scratch (original, trivially so once noise is vendored)
- Shader-gradient background component (fullscreen plane + simplex color mixing).
- Particle field (`THREE.Points` + custom shader, procedural point sprites via `gl_PointCoord`).
- Grain/noise overlay (hash-grain fragment shader, or zero-WebGL SVG `feTurbulence` CSS variant).
- Word/char split-text reveal (span splitter + CSS stagger or Motion stagger; aria-safe).
- Custom cursor (pointer:fine + prefers-reduced-motion gated).
- Sticky storytelling scaffold (300vh wrapper + sticky viewport + rAF progress; CSS scroll-driven-animation variant behind `@supports`).
- Cross-document View Transition CSS (progressive enhancement).
- Shared React wrapper pattern: `useRef` + `useEffect` with full teardown (cancel loop → dispose geometries/materials/textures/targets → `renderer.dispose()` → `forceContextLoss()`), IntersectionObserver pause, DPR cap, ResizeObserver sizing.

### Do NOT use
- **lygia** (Prosperity/Patron — non-commercial default), **Shadertoy default-licensed shaders** (CC BY-NC-SA), **GSAP source vendoring** (proprietary Standard License), **shadergradient components** (R3F architecture; port GLSL only), Codrops repos with no LICENSE file (prefer explicit-MIT ones), any Codrops *design assets*.

### npm dependencies (exact names/versions verified 2026-08-06 via registry.npmjs.org)
| Package | Version (latest) | License | Role |
|---|---|---|---|
| `three` | 0.185.1 | MIT | core renderer (peer/CDN import-map in consuming env) |
| `@types/three` | 0.185.4 | MIT | dev types |
| `lenis` | 1.3.26 | MIT | smooth scroll |
| `split-type` | 0.3.4 | ISC | optional — only if line-splitting needed; otherwise scratch splitter |
| `motion` | (MIT; version not pinned this session) | MIT | optional — stagger/spring for non-WebGL motion |

[INFERENCE] Since Claude Design consumes three via CDN import maps, keep `three` as a **peer** concept — components should import bare `three` specifiers and never bundle it.
