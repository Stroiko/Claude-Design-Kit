/**
 * webgl-hero-particles.tsx
 * USE WHEN: The full-viewport opener as a drifting particle field — scene title over ~3000
 *           procedural points with gentle pointer parallax. This is the page's ONE WebGL
 *           canvas: NEVER use both WebGL heroes on one page (one-canvas rule in DIRECTION.md).
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, type-wall.tsx, smooth-scroll-provider.tsx, preloader.tsx
 * DEPS: /primitives/button, /lib/utils, three
 * NOTE: Unbounded (display) and Sora (body) come from the Google Fonts @import declared in
 *       ../DIRECTION.md. Reduced motion / no WebGL renders the designed static frame
 *       (gradient + dot grid echoing the particles) — never a blank hole.
 */
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

const PARTICLE_COUNT = 3000

const VERTEX_SHADER = /* glsl */ `
attribute float aScale;
attribute float aPhase;
attribute float aTint;

uniform float uTime;
uniform vec2 uPointer;
uniform float uPixelRatio;

varying float vTint;

void main() {
  vec3 p = position;

  // Gentle drift — the atmosphere is the only thing allowed to loop (DIRECTION motion budget).
  p.y += sin(uTime * 0.12 + aPhase) * 0.35;
  p.x += cos(uTime * 0.09 + aPhase * 1.7) * 0.28;

  // Subtle pointer parallax: nearer (larger) particles drift more.
  p.xy += uPointer * 0.22 * (0.35 + aScale * 0.65);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aScale * uPixelRatio * 46.0 / -mvPosition.z;

  vTint = aTint;
}
`

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying float vTint;

void main() {
  // Soft round sprite from gl_PointCoord — no texture assets.
  float r = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.06, r);
  if (alpha < 0.01) discard;

  // DIRECTION.md palette, violet-magenta-black family only:
  // bone ~ --foreground (oklch 0.96 0.005 90), hotMagenta ~ --primary (oklch 0.62 0.26 350).
  vec3 bone = vec3(0.95, 0.94, 0.89);
  vec3 hotMagenta = vec3(0.83, 0.12, 0.47);
  vec3 color = mix(bone, hotMagenta, vTint);

  gl_FragColor = vec4(color, alpha * 0.85);
}
`

export interface WebglHeroParticlesProps {
  /** Small film-credit caption above the title. */
  label?: string
  /** Scene title, one array entry per deliberate line break. */
  titleLines?: string[]
  /** Sora one-liner under the title. Omit to hide. */
  subline?: string
  cta?: { label: string; href: string }
  className?: string
}

export function WebglHeroParticles({
  label = "Vela Nox — world tour",
  titleLines = ["SIGNAL", "BLOOM", "LIVE"],
  subline = "Fourteen cities. One album, played front to back in the dark.",
  cta = { label: "Get tour tickets", href: "#tour" },
  className,
}: WebglHeroParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // Reduced motion is absolute: keep the static frame, mount nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      // WebGL unavailable — the static frame beneath stays visible.
      return
    }
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 40)
    camera.position.z = 7

    // Procedural particle field: positions, sizes, phases, tints — no assets.
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const scales = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)
    const tints = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      scales[i] = 0.3 + Math.random() * 0.7
      phases[i] = Math.random() * Math.PI * 2
      // Mostly bone dust; roughly one in eight particles carries the magenta signal.
      tints[i] = Math.random() < 0.125 ? 1 : 0
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute("aTint", new THREE.BufferAttribute(tints, 1))

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const canvas = renderer.domElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
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
      uniforms.uPixelRatio.value = pixelRatio
    }
    setSize()
    window.addEventListener("resize", setSize)

    // Pointer parallax target, lerped in the single rAF loop — no work in the event itself.
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
      uniforms.uTime.value = (performance.now() - startTime) / 1000
      uniforms.uPointer.value.lerp(pointerTarget, 0.05)
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
      window.removeEventListener("pointermove", onPointerMove)
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
      {/* Designed static frame — base layer, reduced-motion and no-WebGL fallback.
          The dot grid echoes the particle field with zero motion. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 left-[-10%] h-[80%] w-[65%] rounded-full bg-accent blur-[140px]" />
        <div className="absolute right-[-15%] bottom-[-25%] h-[70%] w-[60%] rounded-full bg-primary/20 blur-[160px]" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--color-muted-foreground)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      {/* Particle field mounts here; decorative, so hidden from assistive tech. */}
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />

      {/* Bottom scrim so the HTML type always reads over the particles. */}
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
