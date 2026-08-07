/**
 * webgl-hero-keyart.tsx
 * USE WHEN: The full-viewport opener built around user-supplied key art — album cover,
 *           film still, game splash — displayed full-bleed with a subtle pointer-reactive
 *           displacement (parallax lean + a soft wave ring trailing the cursor). Suits
 *           subjects that already OWN a hero image; prefer a procedural hero when they
 *           don't. When `src` is set this is the page's ONE WebGL canvas: never combine
 *           with any other webgl-hero-*.tsx on the same page (one-canvas rule in
 *           DIRECTION.md). Without `src` no WebGL context is created at all.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, image-scene.tsx, smooth-scroll-provider.tsx, preloader.tsx
 * DEPS: /primitives/button, /lib/utils, three
 * NOTE: The vignette/scrim colors are read at mount from the page's commitment tokens
 *       (--background as stage — see the Commitment Protocol in ../DIRECTION.md);
 *       nothing is hard-coded, so the frame re-skins with the page (stageColor prop
 *       overrides per-instance). Type inherits the page's commitment fonts. The kit
 *       ships no binary assets: `src` is always user-provided. A real <img> underlies
 *       the canvas, so reduced motion / no WebGL / slow loads show the undistorted art
 *       (with alt text) — never a blank hole. No `src`: a static token-gradient frame.
 *       The loaded texture is disposed in teardown.
 */
"use client"

import { useEffect, useRef, type ReactNode } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform sampler2D uMap;
uniform vec2 uPointer;    // -1..1, lerped toward the cursor in the rAF loop
uniform float uTime;
uniform vec2 uPlaneSize;  // CSS px of the mount
uniform vec2 uImageSize;  // natural px of the loaded art
uniform vec3 uStage;

varying vec2 vUv;

// CSS object-fit: cover, in UV space — matches the <img> beneath the canvas.
vec2 coverUv(vec2 uv) {
  float planeAspect = uPlaneSize.x / max(uPlaneSize.y, 1.0);
  float imageAspect = uImageSize.x / max(uImageSize.y, 1.0);
  vec2 scale = planeAspect > imageAspect
    ? vec2(1.0, imageAspect / planeAspect)
    : vec2(planeAspect / imageAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;

  // Parallax: the whole frame leans gently against the pointer.
  uv += uPointer * vec2(-0.014, -0.010);

  // A soft ring of wave distortion trails the pointer (original, akella-style spirit).
  vec2 pointerUv = uPointer * 0.5 + 0.5;
  vec2 away = uv - pointerUv;
  float d = length(away);
  float ring = sin(d * 22.0 - uTime * 2.0) * 0.0045 * smoothstep(0.5, 0.05, d);
  uv += (away / max(d, 0.001)) * ring;

  // Barely-there breathing so the art never reads as a frozen JPEG.
  uv.y += sin(uv.x * 4.0 + uTime * 0.35) * 0.0016;

  vec3 art = texture2D(uMap, coverUv(uv)).rgb;

  // Stage-token vignette: edges settle into the page color for text contrast.
  float vig = smoothstep(0.95, 0.4, distance(vUv, vec2(0.5, 0.46)));
  vec3 color = mix(uStage, art, clamp(vig + 0.35, 0.0, 1.0));

  // Fine grain keeps the frame filmic instead of flat.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.025;

  gl_FragColor = vec4(color, 1.0);
}
`

/**
 * Resolve any CSS color string (commitment tokens are oklch() strings) to a
 * THREE.Color: a hidden probe element lets the browser resolve the syntax,
 * read back via getComputedStyle as rgb(). Engines that serialize oklch()
 * verbatim fall through to a 1x1 canvas pixel readback. Components keep the
 * raw sRGB components (no color-management conversion) so shader uniforms
 * match what the page's CSS shows on screen.
 */
function resolveCssColor(value: string, fallback: THREE.Color): THREE.Color {
  const raw = value.trim()
  if (!raw) return fallback.clone()
  const probe = document.createElement("span")
  probe.style.color = raw
  probe.style.display = "none"
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  document.body.removeChild(probe)
  const rgb = resolved.match(/rgba?\(([^)]+)\)/)
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).map(Number)
    if (parts.length >= 3 && parts.slice(0, 3).every((c) => !Number.isNaN(c))) {
      return new THREE.Color(parts[0] / 255, parts[1] / 255, parts[2] / 255)
    }
  }
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return fallback.clone()
  ctx.fillStyle = raw
  ctx.fillRect(0, 0, 1, 1)
  const d = ctx.getImageData(0, 0, 1, 1).data
  return new THREE.Color(d[0] / 255, d[1] / 255, d[2] / 255)
}

/** Read a commitment token off the mounted subtree (inherits scoped overrides too). */
function readToken(
  el: HTMLElement,
  token: string,
  override: string | undefined,
  fallback: string
): THREE.Color {
  const fb = new THREE.Color(fallback)
  if (override) return resolveCssColor(override, fb)
  return resolveCssColor(getComputedStyle(el).getPropertyValue(token), fb)
}

export interface WebglHeroKeyartProps {
  /** User-provided key art URL. Omit to render the static token-gradient frame
   *  (and to skip creating a WebGL context entirely). */
  src?: string
  /** Meaningful alt text for the art. Required whenever `src` is set. */
  alt?: string
  /** Small film-credit caption above the title. */
  label?: string
  /** Scene title, one array entry per deliberate line break. */
  titleLines?: string[]
  /** One-liner under the title. Omit to hide. */
  subline?: string
  cta?: { label: string; href: string }
  /** CSS color string overriding the --background stage token for the vignette. */
  stageColor?: string
  className?: string
  /** Escape hatch: replaces the default label/title/subline/CTA overlay entirely. */
  children?: ReactNode
}

export function WebglHeroKeyart({
  src,
  alt = "",
  label = "A film by Mara Voss",
  titleLines = ["THE HOLLOW", "SUN"],
  subline = "Shot on 16mm across three winters in the Faroes. In theaters this February.",
  cta = { label: "Watch the trailer", href: "#trailer" },
  stageColor,
  className,
  children,
}: WebglHeroKeyartProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    // No art means no WebGL context at all — the canvas budget stays unspent
    // and the static token frame carries the hero.
    if (!mount || !src) return
    // Reduced motion is absolute: the undistorted <img> beneath stays, mount nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch {
      // WebGL unavailable — the plain <img> beneath stays visible.
      return
    }

    // Stage from the page's commitment tokens, read at mount — never hard-coded.
    const stage = readToken(mount, "--background", stageColor, "#101014")

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uMap: { value: null as THREE.Texture | null },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uPlaneSize: { value: new THREE.Vector2(1, 1) },
      uImageSize: { value: new THREE.Vector2(1, 1) },
      uStage: { value: stage },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Texture stays in its default (no) color space so sRGB pixel values pass
    // through the custom shader untouched and match the <img> beneath.
    let texture: THREE.Texture | null = null
    let ready = false
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = "anonymous"
    loader.load(
      src,
      (tex) => {
        if (cancelled) {
          tex.dispose()
          return
        }
        texture = tex
        const image = tex.image as { width: number; height: number }
        uniforms.uMap.value = tex
        uniforms.uImageSize.value.set(image.width, image.height)
        ready = true
      },
      undefined,
      () => {
        // Load failed (CORS, 404) — the plain <img> beneath remains the hero.
      }
    )

    const canvas = renderer.domElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    // Fade in over the plain <img> once the texture's first frame renders.
    canvas.style.opacity = "0"
    canvas.style.transition = "opacity 700ms ease-out"
    mount.appendChild(canvas)

    const setSize = () => {
      // Manual buffer sizing (three.js manual: prefer this over setPixelRatio), DPR capped at 2.
      const pixelRatio = Math.min(window.devicePixelRatio, 2)
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(Math.floor(width * pixelRatio), Math.floor(height * pixelRatio), false)
      uniforms.uPlaneSize.value.set(width, height)
    }
    setSize()
    window.addEventListener("resize", setSize)

    // Pointer target, lerped in the single rAF loop — no work in the event itself.
    const pointerTarget = new THREE.Vector2(0, 0)
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const startTime = performance.now()
    let rafId: number | null = null
    let firstFrame = true
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      if (!ready) return
      uniforms.uTime.value = (performance.now() - startTime) / 1000
      uniforms.uPointer.value.lerp(pointerTarget, 0.06)
      renderer.render(scene, camera)
      if (firstFrame) {
        firstFrame = false
        canvas.style.opacity = "1"
      }
    }
    const startLoop = () => {
      if (rafId === null) rafId = requestAnimationFrame(loop)
    }
    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    // Pause rendering whenever the hero is offscreen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) startLoop()
      else stopLoop()
    })
    observer.observe(mount)

    return () => {
      cancelled = true
      observer.disconnect()
      stopLoop()
      window.removeEventListener("resize", setSize)
      window.removeEventListener("pointermove", onPointerMove)
      texture?.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      mount.removeChild(canvas)
    }
  }, [src, stageColor])

  return (
    <section
      className={cn(
        "relative h-svh min-h-[560px] w-full overflow-hidden bg-background",
        className
      )}
    >
      {src ? (
        // Real <img> carries the semantics (alt) and serves as the pre-first-frame,
        // reduced-motion, and no-WebGL state — the canvas fades in over it.
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        // No art: designed static token-gradient frame — re-skins via CSS, no WebGL.
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 right-[-10%] h-[80%] w-[70%] rounded-full bg-accent blur-[140px]" />
          <div className="absolute bottom-[-20%] left-[-15%] h-[70%] w-[60%] rounded-full bg-primary/25 blur-[160px]" />
          <div className="absolute inset-6 border border-border/60 md:inset-10" />
        </div>
      )}

      {/* Distortion layer mounts here (only when src is set); decorative overlay of
          the <img>, so hidden from assistive tech. */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />

      {/* Bottom scrim so the HTML type always reads over the art. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent"
      />

      {/* Type is HTML over the canvas — selectable, accessible, never rendered in WebGL. */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        {children ?? (
          <>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {label}
            </p>
            <h1 className="mt-6 text-[54px] leading-[0.95] font-extrabold tracking-tight text-foreground md:text-[81px] lg:text-[121px]">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            {subline ? (
              <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
                {subline}
              </p>
            ) : null}
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-none px-8 uppercase tracking-[0.15em]">
                <a href={cta.href}>{cta.label}</a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
