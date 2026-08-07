/**
 * webgl-hero-terrain.tsx
 * USE WHEN: The full-viewport opener as a procedural low-poly landscape — slow-morphing
 *           ridges receding into fog, camera drifting forward. Suits subjects with a
 *           world to traverse: game reveals, expedition films, festivals with a sense
 *           of place, anything outdoors/territorial. This is the page's ONE WebGL
 *           canvas: never combine with any other webgl-hero-*.tsx on the same page
 *           (one-canvas rule in DIRECTION.md).
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, image-scene.tsx, smooth-scroll-provider.tsx, preloader.tsx
 * DEPS: /primitives/button, /lib/utils, three
 * NOTE: All atmosphere colors are read at mount from the page's commitment tokens
 *       (--background as stage, --primary as signal — see the Commitment Protocol in
 *       ../DIRECTION.md). Nothing is hard-coded, so the scene re-skins with the page;
 *       stageColor/signalColor props override per-instance. Type inherits the page's
 *       commitment fonts — no families are hard-coded here. Reduced motion / no WebGL
 *       renders the designed static horizon frame built from the same token classes —
 *       never a blank hole.
 */
"use client"

import { useEffect, useRef, type ReactNode } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

/**
 * Simplex noise GLSL, vendored per /CREDITS.md:
 *
 * Description : Array and textureless GLSL 2D/3D/4D simplex noise functions.
 *      Author : Ian McEwan, Ashima Arts.
 *  Maintainer : stegu
 *     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
 *               Distributed under the MIT License.
 *               https://github.com/ashima/webgl-noise
 *               https://github.com/stegu/webgl-noise
 */
const SIMPLEX_NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uAmp;

varying vec3 vWorldPos;
varying vec3 vViewPos;
varying float vHeight;

${SIMPLEX_NOISE_GLSL}

float terrainHeight(vec2 cell, float t) {
  float h = snoise(vec3(cell * 0.055, t)) * 2.6;        // broad ridge lines
  h += snoise(vec3(cell * 0.16 + 31.7, t * 0.6)) * 0.9; // mid-scale detail
  h += snoise(vec3(cell * 0.42 + 7.3, t * 0.35)) * 0.3; // facet-scale detail
  return h;
}

void main() {
  vec3 pos = position;

  // Forward drift: the noise domain slides toward the viewer while the field
  // morphs on a much slower clock. The atmosphere is the only thing allowed
  // to loop (DIRECTION motion budget).
  vec2 cell = pos.xy + vec2(0.0, uTime * 0.55);
  float h = terrainHeight(cell, uTime * 0.03);

  // Valley corridor: keep the center low so the fog line reads under the title.
  h *= mix(0.22, 1.0, smoothstep(1.5, 9.0, abs(pos.x))) * uAmp;
  h = max(h, -0.6);

  pos.z += h;
  vHeight = h;

  vec4 world = modelMatrix * vec4(pos, 1.0);
  vWorldPos = world.xyz;
  vec4 mv = viewMatrix * world;
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 uStage;
uniform vec3 uSignal;

varying vec3 vWorldPos;
varying vec3 vViewPos;
varying float vHeight;

void main() {
  // Flat-facet normal from screen-space derivatives — the low-poly look without
  // per-vertex normals (vertex displacement would invalidate them anyway).
  vec3 n = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
  float lit = clamp(dot(n, normalize(vec3(0.4, 0.75, 0.5))), 0.0, 1.0);

  // Both facet tones are derived from the stage token, never a second palette.
  vec3 shadowed = uStage * 0.45;
  vec3 sunlit = mix(uStage, vec3(1.0), 0.16);
  vec3 color = mix(shadowed, sunlit, lit);

  // Sparse signal: only the highest light-facing ridges catch the accent.
  float peak = smoothstep(1.7, 3.1, vHeight) * lit;
  color = mix(color, uSignal, peak * 0.6);

  // Fog recedes to the stage, warmed faintly by the signal at the far line.
  float depth = length(vViewPos);
  float fogAmt = smoothstep(9.0, 46.0, depth);
  vec3 fogColor = mix(uStage, uSignal, 0.12);
  color = mix(color, fogColor, fogAmt);

  // Fine grain keeps the facets cinematic instead of banded.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.03;

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

export interface WebglHeroTerrainProps {
  /** Small film-credit caption above the title. */
  label?: string
  /** Scene title, one array entry per deliberate line break. */
  titleLines?: string[]
  /** One-liner under the title. Omit to hide. */
  subline?: string
  cta?: { label: string; href: string }
  /** Displacement amplitude multiplier, roughly 0–1.5. Default 1. */
  intensity?: number
  /** CSS color string overriding the --background stage token for this scene. */
  stageColor?: string
  /** CSS color string overriding the --primary signal token for this scene. */
  signalColor?: string
  className?: string
  /** Escape hatch: replaces the default label/title/subline/CTA overlay entirely. */
  children?: ReactNode
}

export function WebglHeroTerrain({
  label = "Emberwake — a world premiere",
  titleLines = ["EMBER", "WAKE"],
  subline = "An open-world elegy across a continent of cooling ash. PC and consoles, 2027.",
  cta = { label: "Wishlist now", href: "#wishlist" },
  intensity = 1,
  stageColor,
  signalColor,
  className,
  children,
}: WebglHeroTerrainProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // Reduced motion is absolute: keep the static horizon frame, mount nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      // Antialias on (unlike the fullscreen-quad heroes): displaced polygon
      // silhouettes alias hard without it.
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      // WebGL unavailable — the static horizon frame beneath stays visible.
      return
    }
    // Transparent clear: the token-driven CSS sky (the static frame) shows
    // through above the terrain, so sky and fallback re-skin identically.
    renderer.setClearColor(0x000000, 0)

    // Palette from the page's commitment tokens, read at mount — never hard-coded.
    const stage = readToken(mount, "--background", stageColor, "#101014")
    const signal = readToken(mount, "--primary", signalColor, "#cfc9bf")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120)
    camera.position.set(0, 3.1, 8)

    const geometry = new THREE.PlaneGeometry(110, 78, 150, 110)
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: intensity },
      uStage: { value: stage },
      uSignal: { value: signal },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.z = -26
    scene.add(mesh)

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
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }
    setSize()
    window.addEventListener("resize", setSize)

    const startTime = performance.now()
    let rafId: number | null = null
    let firstFrame = true
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const t = (performance.now() - startTime) / 1000
      uniforms.uTime.value = t
      // Subtle hover — no user control, just a slow breathing drift.
      camera.position.y = 3.1 + Math.sin(t * 0.22) * 0.12
      camera.position.x = Math.sin(t * 0.11) * 0.4
      camera.lookAt(0, 1.1, -34)
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
  }, [intensity, stageColor, signalColor])

  return (
    <section
      className={cn(
        "relative h-svh min-h-[560px] w-full overflow-hidden bg-background",
        className
      )}
    >
      {/* Designed static horizon frame — token classes only, so it re-skins via CSS.
          Doubles as the sky behind the transparent canvas and as the reduced-motion /
          no-WebGL fallback. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/40" />
        <div className="absolute top-[55%] left-1/2 h-28 w-[130%] -translate-x-1/2 -translate-y-1/2 bg-primary/25 blur-[90px]" />
        <div className="absolute inset-x-0 top-[58%] bottom-0 bg-gradient-to-b from-accent/50 via-background/80 to-background" />
      </div>

      {/* Terrain mounts here; decorative, so hidden from assistive tech. */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />

      {/* Bottom scrim so the HTML type always reads over the ridges. */}
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
