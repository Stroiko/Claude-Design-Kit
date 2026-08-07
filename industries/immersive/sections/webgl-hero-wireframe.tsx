/**
 * webgl-hero-wireframe.tsx
 * USE WHEN: The full-viewport opener as a retro-futurist horizon — a glowing perspective
 *           grid scrolling toward a horizon line (default), or `variant="starfield"` for
 *           points streaming past the camera. Suits synth/electronic music, arcade or
 *           racing games, demoscene/retro-tech subjects, anything that wants velocity.
 *           This is the page's ONE WebGL canvas: never combine with any other
 *           webgl-hero-*.tsx on the same page (one-canvas rule in DIRECTION.md).
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, type-wall.tsx, smooth-scroll-provider.tsx, preloader.tsx
 * DEPS: /primitives/button, /lib/utils, three
 * NOTE: All atmosphere colors are read at mount from the page's commitment tokens
 *       (--background as stage, --foreground for lines/stars, --primary as signal /
 *       horizon glow — see the Commitment Protocol in ../DIRECTION.md). Nothing is
 *       hard-coded, so the scene re-skins with the page; stageColor/signalColor props
 *       override per-instance. Type inherits the page's commitment fonts. Drift is
 *       time-based — the atmosphere exception to the no-loop rule. Reduced motion /
 *       no WebGL renders the designed static horizon frame built from the same token
 *       classes — never a blank hole.
 *       composition prop: bottom-left | centered | right-rail | top-editorial per the commitment.
 */
"use client"

import { useEffect, useRef, type ReactNode } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

const QUAD_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const GRID_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uStage;
uniform vec3 uLine;
uniform vec3 uSignal;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float horizon = 0.62;
  vec3 color;

  if (vUv.y > horizon) {
    // Sky: the stage field, brightest just above the horizon.
    float up = (vUv.y - horizon) / (1.0 - horizon);
    color = mix(uStage * 1.18, uStage * 0.72, smoothstep(0.0, 1.0, up));
    // Sparse static stars in the line (foreground) token.
    vec2 cell = floor(vUv * vec2(aspect, 1.0) * 110.0);
    float star = step(0.9965, hash(cell));
    color += uLine * star * 0.3 * smoothstep(0.06, 0.5, up);
  } else {
    float depth = horizon - vUv.y; // 0 at the horizon line
    color = mix(uStage * 1.12, uStage * 0.6, smoothstep(0.0, 0.6, depth));

    // Perspective-projected fract() grid scrolling toward the horizon on a
    // time base (the atmosphere exception to the no-loop rule).
    float z = 1.0 / (depth + 0.015);
    vec2 g = vec2((vUv.x - 0.5) * aspect * z * 0.85, z * 0.7 + uTime * 1.3);
    vec2 a = abs(fract(g) - 0.5);
    vec2 fw = fwidth(g) + 1e-4;
    vec2 ln = 1.0 - smoothstep(fw * 0.8, fw * 2.4, a);
    float line = max(ln.x, ln.y);
    // Settle before the horizon: kill shimmer where line frequency out-runs pixels.
    line *= smoothstep(0.005, 0.06, depth);
    line *= smoothstep(0.9, 0.25, fw.y);
    // Lines shift from the foreground token into the signal near the horizon.
    vec3 lineColor = mix(uLine, uSignal, smoothstep(0.34, 0.03, depth));
    color = mix(color, lineColor, line * 0.8);
  }

  // Horizon glow in the signal color.
  float glow = exp(-abs(vUv.y - horizon) * 16.0);
  color += uSignal * glow * 0.38;

  // Fine grain keeps the field cinematic instead of banded.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.035;

  gl_FragColor = vec4(color, 1.0);
}
`

const STARFIELD_VERTEX_SHADER = /* glsl */ `
attribute float aScale;
attribute float aTint;

uniform float uTime;
uniform float uPixelRatio;

varying float vTint;
varying float vFade;

void main() {
  vec3 p = position;
  // Stream past the camera on a time base — the atmosphere exception to the
  // no-loop rule; wraps seamlessly through a 36-unit corridor.
  p.z = mod(p.z + uTime * 2.6 + 32.0, 36.0) - 32.0;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aScale * uPixelRatio * 52.0 / max(-mvPosition.z, 0.1);

  vTint = aTint;
  // Fade in at the far end, fade out before passing the camera.
  vFade = smoothstep(-32.0, -22.0, p.z) * (1.0 - smoothstep(1.5, 4.5, p.z));
}
`

const STARFIELD_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 uLine;
uniform vec3 uSignal;

varying float vTint;
varying float vFade;

void main() {
  // Soft round sprite from gl_PointCoord — no texture assets.
  float r = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.08, r) * vFade;
  if (alpha < 0.01) discard;

  // Mostly foreground-token stars; a sparse minority carries the signal.
  vec3 color = mix(uLine, uSignal, vTint);
  gl_FragColor = vec4(color, alpha * 0.9);
}
`

const STAR_COUNT = 1600

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

/**
 * HERO COMPOSITION (DIRECTION.md Step 2) — overlay container classes per the commitment's
 * forced choice. Only placement/alignment change; the content semantics never do.
 */
const OVERLAY_CLASSES = {
  "bottom-left": "justify-end px-6 pb-16 md:px-12 md:pb-20",
  centered: "items-center justify-center px-6 text-center md:px-12",
  "right-rail": "items-end justify-center px-6 md:px-12",
  "top-editorial": "justify-between px-6 pt-28 pb-16 md:px-12 md:pt-32 md:pb-20",
} as const

export interface WebglHeroWireframeProps {
  /** "grid" (default): perspective horizon grid. "starfield": points streaming past. */
  variant?: "grid" | "starfield"
  /** Small film-credit caption above the title. */
  label?: string
  /** Scene title, one array entry per deliberate line break. */
  titleLines?: string[]
  /** One-liner under the title. Omit to hide. */
  subline?: string
  cta?: { label: string; href: string }
  /** Overlay composition — one of the commitment's forced choices (see DIRECTION.md Step 2). */
  composition?: "bottom-left" | "centered" | "right-rail" | "top-editorial"
  /** CSS color string overriding the --background stage token for this scene. */
  stageColor?: string
  /** CSS color string overriding the --primary signal token for this scene. */
  signalColor?: string
  className?: string
  /** Escape hatch: replaces the default label/title/subline/CTA overlay entirely. */
  children?: ReactNode
}

export function WebglHeroWireframe({
  variant = "grid",
  label = "Night Circuit — season one",
  titleLines = ["MERIDIAN", "RUN"],
  subline = "A synth-driven racing serial. New episode every Friday at midnight.",
  cta = { label: "Start episode one", href: "#watch" },
  composition = "bottom-left",
  stageColor,
  signalColor,
  className,
  children,
}: WebglHeroWireframeProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // Reduced motion is absolute: keep the static horizon frame, mount nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      // WebGL unavailable — the static horizon frame beneath stays visible.
      return
    }
    // Transparent clear: the starfield floats over the token-driven CSS backdrop;
    // the grid shader paints the full frame opaquely on its own.
    renderer.setClearColor(0x000000, 0)

    // Palette from the page's commitment tokens, read at mount — never hard-coded.
    const stage = readToken(mount, "--background", stageColor, "#101014")
    const line = readToken(mount, "--foreground", undefined, "#f4f3ef")
    const signal = readToken(mount, "--primary", signalColor, "#cfc9bf")

    const scene = new THREE.Scene()
    let camera: THREE.Camera
    let geometry: THREE.BufferGeometry
    let material: THREE.ShaderMaterial
    let onResizeExtras: (width: number, height: number, pixelRatio: number) => void

    if (variant === "starfield") {
      const perspective = new THREE.PerspectiveCamera(60, 1, 0.1, 60)
      perspective.position.z = 6
      camera = perspective

      // Procedural star corridor: positions, sizes, tints — no assets.
      const positions = new Float32Array(STAR_COUNT * 3)
      const scales = new Float32Array(STAR_COUNT)
      const tints = new Float32Array(STAR_COUNT)
      for (let i = 0; i < STAR_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12
        positions[i * 3 + 2] = -32 + Math.random() * 36
        scales[i] = 0.4 + Math.random() * 0.6
        // Mostly foreground stars; roughly one in six carries the signal.
        tints[i] = Math.random() < 0.17 ? 1 : 0
      }
      geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1))
      geometry.setAttribute("aTint", new THREE.BufferAttribute(tints, 1))

      const uniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uLine: { value: line },
        uSignal: { value: signal },
      }
      material = new THREE.ShaderMaterial({
        vertexShader: STARFIELD_VERTEX_SHADER,
        fragmentShader: STARFIELD_FRAGMENT_SHADER,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      scene.add(new THREE.Points(geometry, material))

      onResizeExtras = (width, height, pixelRatio) => {
        perspective.aspect = width / Math.max(height, 1)
        perspective.updateProjectionMatrix()
        uniforms.uPixelRatio.value = pixelRatio
      }
    } else {
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      geometry = new THREE.PlaneGeometry(2, 2)
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uStage: { value: stage },
        uLine: { value: line },
        uSignal: { value: signal },
      }
      material = new THREE.ShaderMaterial({
        vertexShader: QUAD_VERTEX_SHADER,
        fragmentShader: GRID_FRAGMENT_SHADER,
        uniforms,
      })
      scene.add(new THREE.Mesh(geometry, material))

      onResizeExtras = (width, height) => {
        uniforms.uResolution.value.set(width, height)
      }
    }

    // Both variants share one uTime uniform reference for the loop.
    const timeUniform = material.uniforms.uTime as { value: number }

    const canvas = renderer.domElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    // Fade the first frame in over the static frame instead of popping.
    canvas.style.opacity = "0"
    canvas.style.transition = "opacity 700ms ease-out"
    mount.appendChild(canvas)

    const setSize = () => {
      // Manual buffer sizing (three.js manual: prefer this over setPixelRatio), DPR capped at 2.
      const pixelRatio = Math.min(window.devicePixelRatio, 2)
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(Math.floor(width * pixelRatio), Math.floor(height * pixelRatio), false)
      onResizeExtras(width, height, pixelRatio)
    }
    setSize()
    window.addEventListener("resize", setSize)

    const startTime = performance.now()
    let rafId: number | null = null
    let firstFrame = true
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      timeUniform.value = (performance.now() - startTime) / 1000
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
      observer.disconnect()
      stopLoop()
      window.removeEventListener("resize", setSize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      mount.removeChild(canvas)
    }
  }, [variant, stageColor, signalColor])

  // Label / title / subline / CTA — identical semantics in every composition; only the
  // container (OVERLAY_CLASSES) and the top-editorial split below change placement.
  const overlayContent = (
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
  )

  return (
    <section
      className={cn(
        "relative h-svh min-h-[560px] w-full overflow-hidden bg-background",
        className
      )}
    >
      {/* Designed static horizon frame — token classes only, so it re-skins via CSS.
          Serves as the reduced-motion / no-WebGL fallback and, for the starfield
          variant, as the backdrop behind the transparent canvas. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/30" />
        {variant === "grid" ? (
          <>
            <div className="absolute inset-x-0 top-[62%] h-px bg-primary/70" />
            <div className="absolute top-[62%] left-1/2 h-16 w-[110%] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[60px]" />
            <div className="absolute inset-x-0 top-[62%] bottom-0 opacity-25 [background-image:linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] [background-size:56px_44px]" />
            <div className="absolute inset-x-0 top-0 bottom-[42%] opacity-20 [background-image:radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:48px_48px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 bg-primary/15 blur-[110px]" />
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:38px_38px]" />
          </>
        )}
      </div>

      {/* Grid/starfield mounts here; decorative, so hidden from assistive tech. */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />

      {/* Scrim shaped per composition so the HTML type always reads over the lines. */}
      {composition === "bottom-left" ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent"
        />
      ) : null}
      {composition === "centered" ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:radial-gradient(ellipse_75%_65%_at_50%_50%,color-mix(in_srgb,var(--color-background)_70%,transparent),transparent)]"
        />
      ) : null}
      {composition === "right-rail" ? (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-background/90 via-background/40 to-transparent md:w-2/3"
        />
      ) : null}
      {composition === "top-editorial" ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background/70 via-background/25 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 via-background/25 to-transparent"
          />
        </>
      ) : null}

      {/* Type is HTML over the canvas — selectable, accessible, never rendered in WebGL. */}
      <div className={cn("relative z-10 flex h-full flex-col", OVERLAY_CLASSES[composition])}>
        {children ??
          (composition === "top-editorial" ? (
            <>
              <div>
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
              </div>
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
                {subline ? (
                  <p className="max-w-prose text-base text-muted-foreground md:text-lg">
                    {subline}
                  </p>
                ) : null}
                <div className="shrink-0">
                  <Button asChild size="lg" className="rounded-none px-8 uppercase tracking-[0.15em]">
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                </div>
              </div>
            </>
          ) : composition === "right-rail" ? (
            <div className="w-full max-w-md text-left lg:max-w-lg">{overlayContent}</div>
          ) : (
            overlayContent
          ))}
      </div>
    </section>
  )
}
