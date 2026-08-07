/**
 * webgl-hero-gradient.tsx
 * USE WHEN: The full-viewport opener for an experience-first site — a scene title over a
 *           slow-drifting procedural shader atmosphere. The page's ONE WebGL canvas
 *           (never combine with webgl-hero-particles.tsx on the same page).
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, split-text-title.tsx, smooth-scroll-provider.tsx, preloader.tsx
 * DEPS: /primitives/button, /lib/utils, three
 * NOTE: Unbounded (display) and Sora (body) come from the Google Fonts @import declared in
 *       ../DIRECTION.md. Reduced motion / no WebGL renders the designed static gradient frame
 *       that also serves as the pre-first-frame base layer — never a blank hole.
 */
"use client"

import { useEffect, useRef } from "react"
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
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

${SIMPLEX_NOISE_GLSL}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  // Slow drift — the atmosphere is the only thing allowed to loop (DIRECTION motion budget).
  float t = uTime * 0.05;
  float n1 = snoise(vec3(p * 1.3, t));
  float n2 = snoise(vec3(p * 2.9 + 17.3, t * 1.7));

  // DIRECTION.md palette, violet-magenta-black family only:
  // stageBlack ~ --background (oklch 0.11, warm-violet cast)
  // deepViolet ~ --accent territory (oklch 0.25 0.03 300)
  // hotMagenta ~ --primary (oklch 0.62 0.26 350)
  vec3 stageBlack = vec3(0.043, 0.035, 0.058);
  vec3 deepViolet = vec3(0.16, 0.10, 0.24);
  vec3 hotMagenta = vec3(0.83, 0.12, 0.47);

  float field = smoothstep(-0.7, 0.9, n1 + 0.35 * n2);
  vec3 color = mix(stageBlack, deepViolet, field);

  // The magenta signal blooms sparsely from the noise ridges, biased toward the top.
  float signal = smoothstep(0.55, 0.95, n1) * smoothstep(1.05, 0.15, vUv.y + n2 * 0.2);
  color = mix(color, hotMagenta, signal * 0.5);

  // Fine procedural grain keeps the gradient cinematic instead of banded.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.04;

  gl_FragColor = vec4(color, 1.0);
}
`

export interface WebglHeroGradientProps {
  /** Small film-credit caption above the title. */
  label?: string
  /** Scene title, one array entry per deliberate line break. */
  titleLines?: string[]
  /** Sora one-liner under the title. Omit to hide. */
  subline?: string
  cta?: { label: string; href: string }
  className?: string
}

export function WebglHeroGradient({
  label = "Vela Nox — new album",
  titleLines = ["SIGNAL", "BLOOM"],
  subline = "Eleven tracks recorded in a disused planetarium. Out October 2.",
  cta = { label: "Pre-save the album", href: "#listen" },
  className,
}: WebglHeroGradientProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // Reduced motion is absolute: keep the static gradient frame, mount nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch {
      // WebGL unavailable — the static CSS gradient frame beneath stays visible.
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const canvas = renderer.domElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    // Fade the first frame in over the static gradient frame instead of popping.
    canvas.style.opacity = "0"
    canvas.style.transition = "opacity 700ms ease-out"
    mount.appendChild(canvas)

    const setSize = () => {
      // Manual buffer sizing (three.js manual: prefer this over setPixelRatio), DPR capped at 2.
      const pixelRatio = Math.min(window.devicePixelRatio, 2)
      const width = Math.floor(mount.clientWidth * pixelRatio)
      const height = Math.floor(mount.clientHeight * pixelRatio)
      renderer.setSize(width, height, false)
      uniforms.uResolution.value.set(width, height)
    }
    setSize()
    window.addEventListener("resize", setSize)

    const startTime = performance.now()
    let rafId: number | null = null
    let firstFrame = true
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      uniforms.uTime.value = (performance.now() - startTime) / 1000
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
  }, [])

  return (
    <section
      className={cn(
        "relative h-svh min-h-[560px] w-full overflow-hidden bg-background",
        className
      )}
    >
      {/* Designed static gradient frame — base layer, reduced-motion and no-WebGL fallback. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 right-[-10%] h-[80%] w-[70%] rounded-full bg-accent blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[70%] w-[60%] rounded-full bg-primary/25 blur-[160px]" />
      </div>

      {/* Shader atmosphere mounts here; decorative, so hidden from assistive tech. */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />

      {/* Bottom scrim so the HTML type always reads over the shader. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent"
      />

      {/* Type is HTML over the canvas — selectable, accessible, never rendered in WebGL. */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <p className="font-[Sora] text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        <h1 className="mt-6 font-[Unbounded] text-[54px] leading-[0.95] font-extrabold tracking-tight text-foreground md:text-[81px] lg:text-[121px]">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {subline ? (
          <p className="mt-6 max-w-prose font-[Sora] text-base text-muted-foreground md:text-lg">
            {subline}
          </p>
        ) : null}
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-none px-8 uppercase tracking-[0.15em]">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
