/**
 * axis-type.tsx
 * USE WHEN: Type whose letterforms themselves animate — weight, width, slant, optical size — via variable font axes, driven by hover, scroll, cursor proximity, or an ambient cycle. Display headlines, nav wordmarks.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency). AVOID FOR: body copy anywhere; industries whose budget excludes ambient motion. Requires a variable font from the DIRECTION.md import.
 * PAIRS WITH: velocity-type, text-animate, hero sections
 * DEPS: /lib/utils, motion
 * NOTE: No web API exposes a font's axis ranges — values clamp to the OpenType registered-axis spec plus the axisRanges prop; variability detection is a metric heuristic (axes that never change metrics, e.g. pure slnt, may need axisRanges/fallbackAxes set explicitly).
 */
"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

export interface AxisTypeSpring {
  stiffness: number
  damping: number
  mass: number
}

export interface AxisTypeProps {
  /** Plain text only — split into fragments when stagger > 0. */
  children: string
  /** Axis tag → animated range. Any four-character tag, custom axes included. */
  axes?: Record<string, { from: number; to: number }>
  trigger?: "scroll" | "hover" | "proximity" | "always"
  /** Seconds of per-character offset; 0 animates the line as one block. */
  stagger?: number
  /** Scroll-progress window mapped to the axis range. "scroll" only. */
  range?: [number, number]
  /** Influence radius around the cursor, in px. "proximity" only. */
  radius?: number
  /** Seconds per ambient cycle. "always" only. */
  period?: number
  spring?: AxisTypeSpring
  /** Static axis values applied when the font is not variable (or detection fails). */
  fallbackAxes?: Record<string, number>
  /** Manual clamp ranges per axis tag — overrides the registered-axis spec clamps. */
  axisRanges?: Record<string, { min: number; max: number }>
  className?: string
}

const DEFAULT_AXES = { wght: { from: 300, to: 800 } }
const DEFAULT_SPRING: AxisTypeSpring = { stiffness: 200, damping: 25, mass: 0.5 }

// OpenType registered-axis ranges. Pushing past a font's real maximum snaps to
// the nearest master; without any API to read the fvar table these spec limits
// (plus the axisRanges prop) are the honest clamp.
const REGISTERED_RANGES: Record<string, { min: number; max: number }> = {
  wght: { min: 1, max: 1000 },
  wdth: { min: 1, max: 1000 },
  slnt: { min: -90, max: 90 },
  ital: { min: 0, max: 1 },
  opsz: { min: 1, max: 1000 },
}

type HistoryEntry = { at: number; value: number }

function composeSettings(
  axes: Record<string, { from: number; to: number }>,
  ranges: Record<string, { min: number; max: number }> | undefined,
  t: number
): string {
  return Object.entries(axes)
    .map(([tag, { from, to }]) => {
      let v = from + (to - from) * t
      const r = ranges?.[tag] ?? REGISTERED_RANGES[tag]
      if (r) v = Math.min(r.max, Math.max(r.min, v))
      return `"${tag}" ${Math.round(v * 100) / 100}`
    })
    .join(", ")
}

interface AxisCharProps {
  char: string
  index: number
  stagger: number
  history: React.RefObject<HistoryEntry[]>
  compose: (t: number) => string
}

/** One staggered fragment: samples the shared driver's history at a time offset. */
function AxisChar({ char, index, stagger, history, compose }: AxisCharProps) {
  const charT = useMotionValue(0)
  useAnimationFrame(() => {
    const target = performance.now() - index * stagger * 1000
    const buf = history.current
    if (!buf || buf.length === 0) return
    let sample = buf[0].value
    for (const entry of buf) {
      if (entry.at <= target) sample = entry.value
      else break
    }
    if (sample !== charT.get()) charT.set(sample)
  })
  const settings = useTransform(() => compose(charT.get()))
  return (
    <motion.span className="inline-block whitespace-pre" style={{ fontVariationSettings: settings }}>
      {char}
    </motion.span>
  )
}

/**
 * Variable-font axis animation: the glyphs are redrawn, nothing translates or
 * scales. One spring-smoothed driver feeds every axis, so weight carries
 * momentum instead of tracking input rigidly. Not-variable fonts fall back to
 * static fallbackAxes; reduced motion renders at resting (from) values.
 *
 * @example
 * <AxisType className="text-6xl" trigger="hover" axes={{ wght: { from: 300, to: 850 } }}>
 *   Hover me
 * </AxisType>
 *
 * @example Scroll-driven width + optical size with per-character trail
 * <AxisType
 *   trigger="scroll"
 *   range={[0.1, 0.6]}
 *   stagger={0.04}
 *   axes={{ wdth: { from: 75, to: 125 }, opsz: { from: 12, to: 96 } }}
 *   axisRanges={{ wdth: { min: 25, max: 151 } }}
 * >
 *   ELASTIC
 * </AxisType>
 */
export function AxisType({
  children,
  axes = DEFAULT_AXES,
  trigger = "hover",
  stagger = 0,
  range = [0, 1],
  radius = 200,
  period = 4,
  spring = DEFAULT_SPRING,
  fallbackAxes,
  axisRanges,
  className,
}: AxisTypeProps) {
  const prefersReduced = useReducedMotion()
  const rootRef = useRef<HTMLSpanElement>(null)

  // Optimistic default: assume variable until the metric heuristic says otherwise.
  const [isVariable, setIsVariable] = useState(true)

  // Single 0→1 driver written by whichever trigger is active; one spring here
  // is equivalent to a spring per axis (each axis is a linear map of the
  // driver and springs are linear), while keeping hooks static across dynamic
  // axis maps.
  const rawT = useMotionValue(0)
  const springT = useSpring(rawT, spring)

  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (trigger !== "scroll" || prefersReduced) return
    const [start, end] = range
    const t = end > start ? (p - start) / (end - start) : 0
    rawT.set(Math.min(1, Math.max(0, t)))
  })

  useAnimationFrame((time) => {
    if (trigger !== "always" || prefersReduced) return
    rawT.set((Math.sin((time / 1000) * ((2 * Math.PI) / period)) + 1) / 2)
  })

  useEffect(() => {
    if (trigger !== "proximity" || prefersReduced) return
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const d = Math.hypot(e.clientX - cx, e.clientY - cy)
      rawT.set(Math.max(0, 1 - d / radius))
    }
    const relax = () => rawT.set(0)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("blur", relax)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("blur", relax)
    }
  }, [trigger, prefersReduced, radius, rawT])

  // Variability heuristic: load the element's font explicitly, then compare
  // rendered metrics at the two extremes of the configured axes. Identical
  // metrics → not variable. Re-runs on loadingdone because fonts.ready can
  // resolve before a late-arriving stylesheet registers the face.
  useEffect(() => {
    if (typeof document.fonts?.load !== "function") return
    let disposed = false
    const detect = async () => {
      const root = rootRef.current
      if (!root) return
      const cs = getComputedStyle(root)
      const sample = children || "ABCap"
      try {
        await document.fonts.load(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, sample)
      } catch {
        // unparseable font spec — fall through and measure with what we have
      }
      if (disposed || !rootRef.current) return
      const probe = document.createElement("span")
      probe.textContent = sample
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0"
      probe.style.fontFamily = cs.fontFamily
      probe.style.fontSize = cs.fontSize
      probe.style.fontStyle = cs.fontStyle
      probe.style.fontWeight = cs.fontWeight
      document.body.appendChild(probe)
      probe.style.fontVariationSettings = composeSettings(axes, axisRanges, 0)
      const a = probe.getBoundingClientRect()
      probe.style.fontVariationSettings = composeSettings(axes, axisRanges, 1)
      const b = probe.getBoundingClientRect()
      probe.remove()
      setIsVariable(a.width !== b.width || a.height !== b.height)
    }
    detect()
    const onLoadingDone = () => detect()
    document.fonts.addEventListener("loadingdone", onLoadingDone)
    return () => {
      disposed = true
      document.fonts.removeEventListener("loadingdone", onLoadingDone)
    }
  }, [children, JSON.stringify(axes), JSON.stringify(axisRanges)])

  const compose = useMemo(
    () => (t: number) => composeSettings(axes, axisRanges, t),
    [JSON.stringify(axes), JSON.stringify(axisRanges)]
  )
  const settings = useTransform(() => compose(springT.get()))

  // Shared driver history for staggered fragments (trimmed to what the
  // longest trailing character can still need).
  const historyRef = useRef<HistoryEntry[]>([{ at: 0, value: 0 }])
  useMotionValueEvent(springT, "change", (v) => {
    const buf = historyRef.current
    buf.push({ at: performance.now(), value: v })
    const horizon = performance.now() - (children.length * stagger * 1000 + 1000)
    while (buf.length > 2 && buf[0].at < horizon) buf.shift()
  })

  const hoverHandlers =
    trigger === "hover" && !prefersReduced
      ? { onPointerEnter: () => rawT.set(1), onPointerLeave: () => rawT.set(0) }
      : {}

  const staticSettings = !isVariable
    ? fallbackAxes
      ? Object.entries(fallbackAxes).map(([tag, v]) => `"${tag}" ${v}`).join(", ")
      : undefined
    : prefersReduced
      ? compose(0)
      : undefined

  // Static path: not variable, or reduced motion — resting values, no listeners needed.
  if (staticSettings !== undefined || (!isVariable && fallbackAxes === undefined)) {
    return (
      <span ref={rootRef} className={className} style={staticSettings ? { fontVariationSettings: staticSettings } : undefined}>
        {children}
      </span>
    )
  }

  if (stagger > 0) {
    return (
      <span ref={rootRef} aria-label={children} className={cn("inline-block", className)} {...hoverHandlers}>
        <span aria-hidden="true">
          {[...children].map((char, i) => (
            <AxisChar key={i} char={char} index={i} stagger={stagger} history={historyRef} compose={compose} />
          ))}
        </span>
      </span>
    )
  }

  return (
    <motion.span
      ref={rootRef}
      className={cn("inline-block", className)}
      style={{ fontVariationSettings: settings }}
      {...hoverHandlers}
    >
      {children}
    </motion.span>
  )
}
