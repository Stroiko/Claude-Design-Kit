/**
 * velocity-type.tsx
 * USE WHEN: Display type that reacts to how fast the user scrolls — skewing, stretching, or driving a direction-aware marquee — and springs back at rest. Editorial heroes, section dividers.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency). AVOID FOR: industries whose budget excludes scroll-driven motion; body copy of any kind.
 * PAIRS WITH: text-animate, marquee, hero sections
 * DEPS: /lib/utils, motion
 */
"use client"

import React, { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import { cn } from "@/lib/utils"

export interface VelocityTypeSpring {
  stiffness: number
  damping: number
  mass: number
}

interface VelocityTypeBaseProps {
  children: React.ReactNode
  /** Overall response multiplier. */
  intensity?: number
  /** Spring smoothing the raw scroll velocity — this is what makes it feel physical. */
  spring?: VelocityTypeSpring
  /** Optional scroll container; defaults to the viewport. */
  container?: React.RefObject<HTMLElement | null>
  className?: string
}

interface VelocityTypeSkewProps extends VelocityTypeBaseProps {
  /** Type shears in the scroll direction. */
  mode?: "skew"
  /** Hard skew ceiling, in degrees. */
  maxSkew?: number
  maxStretch?: never
  baseVelocity?: never
}

interface VelocityTypeStretchProps extends VelocityTypeBaseProps {
  /** Type stretches horizontally with scroll speed — scaleX only, so it stays legible. */
  mode: "stretch"
  /** scaleX ceiling. */
  maxStretch?: number
  maxSkew?: never
  baseVelocity?: never
}

interface VelocityTypeMarqueeProps extends VelocityTypeBaseProps {
  /** Endless strip that drifts at idle, accelerates with scroll, and reverses with scroll direction. */
  mode: "marquee"
  /** Idle drift speed, in % of one copy per second. */
  baseVelocity?: number
  maxSkew?: never
  maxStretch?: never
}

export type VelocityTypeProps =
  | VelocityTypeSkewProps
  | VelocityTypeStretchProps
  | VelocityTypeMarqueeProps

const DEFAULT_SPRING: VelocityTypeSpring = { stiffness: 400, damping: 50, mass: 1 }

// motion@12 exports wrap() at runtime but not in its type declarations,
// so a local copy keeps `npm run typecheck` honest.
const wrap = (min: number, max: number, v: number): number => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

const MARQUEE_COPIES = 4

/**
 * Velocity-warped typography: reacts to how fast the page scrolls, not how
 * far. Raw velocity is spring-smoothed and clamped before it touches any
 * transform, so trackpad flings can never destroy the layout. Renders static
 * text under prefers-reduced-motion.
 *
 * @example
 * <VelocityType className="text-7xl font-bold" maxSkew={10}>
 *   Motion is meaning
 * </VelocityType>
 *
 * @example Direction-aware marquee inside a scroll container
 * const ref = useRef<HTMLDivElement>(null)
 * <div ref={ref} className="h-screen overflow-y-auto">
 *   <VelocityType mode="marquee" baseVelocity={2} container={ref} className="text-5xl">
 *     STUDIO — ARCHIVE — CONTACT —&nbsp;
 *   </VelocityType>
 * </div>
 */
export function VelocityType(props: VelocityTypeProps) {
  const {
    children,
    intensity = 1,
    spring = DEFAULT_SPRING,
    container,
    className,
  } = props
  const mode = props.mode ?? "skew"
  const maxSkew = props.maxSkew ?? 12
  const maxStretch = props.maxStretch ?? 1.4
  const baseVelocity = props.baseVelocity ?? 3

  const prefersReduced = useReducedMotion()

  const { scrollY } = useScroll(
    container ? { container: container as React.RefObject<HTMLElement> } : undefined
  )
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, spring)
  // Clamped map to [-1, 1]: the guard against enormous trackpad-fling values.
  const factor = useTransform(smooth, [-3000, 0, 3000], [-1, 0, 1], { clamp: true })

  const skewX = useTransform(() => factor.get() * maxSkew * intensity)
  const scaleX = useTransform(() =>
    Math.min(maxStretch, 1 + Math.abs(factor.get()) * (maxStretch - 1) * intensity)
  )
  // Promote to the GPU only while actually moving.
  const willChange = useTransform(() => (Math.abs(smooth.get()) > 5 ? "transform" : "auto"))

  // Marquee baseline: rAF + wrap(), never CSS keyframes or `left`.
  const baseX = useMotionValue(0)
  const marqueeX = useMotionTemplate`${baseX}%`
  const directionRef = useRef(1)
  useMotionValueEvent(factor, "change", (f) => {
    if (f < 0) directionRef.current = -1
    else if (f > 0) directionRef.current = 1
  })
  useAnimationFrame((_, delta) => {
    if (mode !== "marquee" || prefersReduced) return
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)
    moveBy += moveBy * Math.abs(factor.get()) * 4 * intensity
    baseX.set(wrap(-100 / MARQUEE_COPIES, 0, baseX.get() + moveBy))
  })

  if (prefersReduced) {
    return <span className={className}>{children}</span>
  }

  if (mode === "marquee") {
    return (
      <div className={cn("overflow-hidden whitespace-nowrap", className)}>
        <motion.div
          className="flex w-max"
          style={{ x: marqueeX, willChange: "transform" }}
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, i) => (
            <span key={i} aria-hidden={i > 0 || undefined} className="shrink-0 pr-[0.5em]">
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={
        mode === "stretch"
          ? { scaleX, transformOrigin: "center", willChange }
          : { skewX, willChange }
      }
    >
      {children}
    </motion.span>
  )
}
