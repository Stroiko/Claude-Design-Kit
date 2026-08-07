/**
 * ink-bleed.tsx
 * USE WHEN: Content that bleeds in or out through an irregular, textured edge instead of a fade or rectangular wipe. Route transitions, section reveals, image swaps.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency). AVOID FOR: industries whose budget excludes theatrical reveals; body-copy readability moments.
 * PAIRS WITH: text-animate, hero sections, AnimatePresence route shells
 * DEPS: /lib/utils, motion
 * NOTE: The mask re-rasters while animating — size the element, not the page. variant="turbulence" adds an SVG displacement filter: small elements only, never viewport-scale.
 */
"use client"

import React, { useEffect, useId, useMemo, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useTransform,
} from "motion/react"
import { cn } from "@/lib/utils"

export interface InkBleedProps {
  children: React.ReactNode
  /** Revealed when true, bled out when false. */
  show?: boolean
  /** Texture of the bleeding edge. `turbulence` uses an SVG displacement filter — small elements only. */
  variant?: "ink" | "grain" | "dissolve" | "turbulence"
  /** Where the bleed travels: a top-down sweep, bottom-up, out from the center, or in from the edges. */
  direction?: "in" | "out" | "center" | "edges"
  /** Edge irregularity, 0 (near-clean wipe) to 1 (wide chaotic bleed). */
  roughness?: number
  /** Seconds. */
  duration?: number
  /** Mask pattern seed; defaults to a stable per-instance value so two instances never reveal identically. */
  seed?: number
  /** Cubic bezier for the reveal. */
  easing?: [number, number, number, number]
  /** Fires when a reveal or bleed-out finishes (including the reduced-motion fade). */
  onComplete?: () => void
  className?: string
}

type InkVariant = NonNullable<InkBleedProps["variant"]>
type InkDirection = NonNullable<InkBleedProps["direction"]>

// Static noise tile configs. The tile is rasterized once at image decode —
// this is NOT an animated SVG filter.
const NOISE: Record<Exclude<InkVariant, "turbulence">, { bf: (r: number) => number; oct: number }> = {
  ink: { bf: (r) => 0.012 * (0.5 + r), oct: 3 },
  grain: { bf: (r) => 0.6 + 0.3 * r, oct: 2 },
  dissolve: { bf: (r) => 0.08 * (0.5 + r), oct: 4 },
}

// Three mask layers, top to bottom: a hard-edged gradient (the fully revealed
// zone — added, so revealed content never shows noise holes), the noise tile
// (intersected with...), and a soft-band gradient (...so blobs exist only in
// the traveling frontier). Stops are string fragments so one useMotionTemplate
// call covers every direction.
const STOPS: Record<InkDirection, { h1: string; h2: string; s1: string; s2: string }> = {
  in: {
    h1: "linear-gradient(180deg, #000 ", h2: "%, transparent ",
    s1: "linear-gradient(180deg, #000 ", s2: "%, transparent ",
  },
  out: {
    h1: "linear-gradient(0deg, #000 ", h2: "%, transparent ",
    s1: "linear-gradient(0deg, #000 ", s2: "%, transparent ",
  },
  center: {
    h1: "radial-gradient(circle at 50% 50%, #000 ", h2: "%, transparent ",
    s1: "radial-gradient(circle at 50% 50%, #000 ", s2: "%, transparent ",
  },
  edges: {
    h1: "radial-gradient(circle at 50% 50%, transparent ", h2: "%, #000 ",
    s1: "radial-gradient(circle at 50% 50%, transparent ", s2: "%, #000 ",
  },
}

/**
 * Organic, non-rectangular reveal: content bleeds in through a textured
 * frontier driven by an animated mask threshold (GPU-friendly; no animated
 * SVG filters on the default path). Falls back to a plain opacity fade where
 * mask-image is unsupported, and to a 150ms fade under prefers-reduced-motion.
 *
 * @example
 * <InkBleed variant="ink" direction="center" roughness={0.7}>
 *   <img src="/poster.jpg" alt="Exhibition poster" className="rounded-lg" />
 * </InkBleed>
 *
 * @example Route-transition swap — works with AnimatePresence mode="wait"
 * <AnimatePresence mode="wait">
 *   <InkBleed key={route} variant="dissolve" duration={0.8}>
 *     <ArticleCard article={current} />
 *   </InkBleed>
 * </AnimatePresence>
 */
export function InkBleed({
  children,
  show = true,
  variant = "ink",
  direction = "in",
  roughness = 0.5,
  duration = 1.2,
  seed: seedProp,
  easing = [0.4, 0, 0.2, 1],
  onComplete,
  className,
}: InkBleedProps) {
  const prefersReduced = useReducedMotion()
  const [isPresent, safeToRemove] = usePresence()
  const visible = show && isPresent

  // Stable per-instance seed with no render-time randomness: Math.random here
  // would guarantee an SSR hydration mismatch inside the mask data-URI.
  const reactId = useId()
  const autoSeed = useMemo(() => {
    let h = 0
    for (const ch of reactId) h = (h * 31 + ch.charCodeAt(0)) | 0
    return Math.abs(h) % 10000
  }, [reactId])
  const seed = seedProp ?? autoSeed
  const filterId = `ink-bleed-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`

  const [maskSupported, setMaskSupported] = useState(true)
  useEffect(() => {
    setMaskSupported(
      CSS.supports("mask-image", "linear-gradient(#000, transparent)") ||
        CSS.supports("-webkit-mask-image", "linear-gradient(#000, transparent)")
    )
  }, [])

  // 0 = fully bled out, 1 = fully revealed. Starts at 0 so mounting is the reveal.
  const progress = useMotionValue(0)
  const [hidden, setHidden] = useState(!show)

  const band = 4 + roughness * 36
  const inverted = direction === "edges"
  const edge = useTransform(progress, (p) => {
    const q = inverted ? 1 - p : p
    return -band + q * (100 + 2 * band)
  })
  const soft = useTransform(() => edge.get() + band)
  // "edges" reveals outside-in, so its hard (fully revealed) stop rides the
  // outer boundary of the band instead of the inner one.
  const hardStop = inverted ? soft : edge

  const noiseSvgUri = useMemo(() => {
    if (variant === "turbulence") return ""
    const cfg = NOISE[variant]
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${cfg.bf(roughness)}" numOctaves="${cfg.oct}" seed="${seed}" stitchTiles="stitch"/>` +
      `<feComponentTransfer><feFuncA type="discrete" tableValues="0 0 1 1"/></feComponentTransfer></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }, [variant, roughness, seed])

  // Every mask-image change makes the browser re-resolve its image layers, and
  // re-rasterizing SVG turbulence per frame starves the frame budget (~2fps
  // measured). Rasterize the tile to a PNG once; per-frame updates then only
  // blit a cached bitmap.
  const [noisePngUri, setNoisePngUri] = useState("")
  useEffect(() => {
    setNoisePngUri("")
    if (!noiseSvgUri) return
    let disposed = false
    const img = new Image()
    img.onload = () => {
      if (disposed) return
      const canvas = document.createElement("canvas")
      canvas.width = 240
      canvas.height = 240
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      setNoisePngUri(canvas.toDataURL("image/png"))
    }
    img.src = noiseSvgUri
    return () => {
      disposed = true
    }
  }, [noiseSvgUri])

  const noiseUri = `url("${noisePngUri || noiseSvgUri}")`

  const c = STOPS[direction]
  const noiseLayer = variant === "turbulence" ? ", " : `, ${noiseUri}, `
  const maskImage = useMotionTemplate`${c.h1}${hardStop}${c.h2}${hardStop}%)${noiseLayer}${c.s1}${edge}${c.s2}${soft}%)`

  const isTurbulence = variant === "turbulence"
  const maskLayout = isTurbulence
    ? {
        maskRepeat: "no-repeat, no-repeat",
        WebkitMaskRepeat: "no-repeat, no-repeat",
        maskSize: "100% 100%, 100% 100%",
        WebkitMaskSize: "100% 100%, 100% 100%",
        maskComposite: "add, add",
        WebkitMaskComposite: "source-over, source-over",
      }
    : {
        maskRepeat: "no-repeat, repeat, no-repeat",
        WebkitMaskRepeat: "no-repeat, repeat, no-repeat",
        maskSize: "100% 100%, 240px 240px, 100% 100%",
        WebkitMaskSize: "100% 100%, 240px 240px, 100% 100%",
        maskComposite: "add, intersect, add",
        WebkitMaskComposite: "source-over, source-in, source-over",
      }

  const useMask = maskSupported && !prefersReduced

  const durationRef = useRef(duration)
  durationRef.current = prefersReduced ? 0.15 : duration
  const easingRef = useRef(easing)
  easingRef.current = easing
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const safeToRemoveRef = useRef(safeToRemove)
  safeToRemoveRef.current = safeToRemove
  const visibleRef = useRef(visible)
  visibleRef.current = visible

  useEffect(() => {
    if (visible) setHidden(false)
    // cancelled + visibleRef guards: a superseded animation's onComplete can
    // fire after the replacing effect has run, and must not touch state then.
    let cancelled = false
    const controls = animate(progress, visible ? 1 : 0, {
      duration: durationRef.current,
      ease: easingRef.current,
      onComplete: () => {
        if (cancelled) return
        if (!visibleRef.current) {
          // Fully masked out: drop from the a11y tree and tab order in one move.
          setHidden(true)
          safeToRemoveRef.current?.()
        }
        onCompleteRef.current?.()
      },
    })
    return () => {
      cancelled = true
      controls.stop()
    }
  }, [visible, progress])

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        visibility: hidden ? "hidden" : "visible",
        ...(isTurbulence ? { filter: `url(#${filterId})` } : null),
        ...(useMask
          ? { maskImage, WebkitMaskImage: maskImage, ...maskLayout }
          : { opacity: progress }),
      }}
    >
      {isTurbulence && (
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.05 + roughness * 0.1}
              numOctaves={2}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={8 + roughness * 24} />
          </filter>
        </svg>
      )}
      {children}
    </motion.div>
  )
}
