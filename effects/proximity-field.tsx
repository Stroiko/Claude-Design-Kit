/**
 * proximity-field.tsx
 * USE WHEN: A grid of glyphs, dots, or image tiles that magnetically displaces around the cursor with distance falloff. Interactive type walls, hero backdrops, gallery teasers.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency). AVOID FOR: industries whose budget excludes pointer-reactive motion.
 * PAIRS WITH: text-animate, magic-card, hero sections
 * DEPS: /lib/utils, motion
 */
"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

export interface ProximityFieldSpring {
  stiffness: number
  damping: number
  mass: number
}

export interface ProximityFieldProps {
  /** Arbitrary cell contents — the field owns layout, never the children's appearance. */
  children: React.ReactNode[]
  /** Grid column count. */
  columns?: number
  /** Influence radius around the pointer, in px. */
  radius?: number
  /** Max displacement at the pointer, in px. */
  strength?: number
  /** Distance falloff curve from pointer to radius edge. */
  falloff?: "linear" | "gaussian" | "inverse"
  /** Whether cells flee the pointer or gather toward it. */
  polarity?: "repel" | "attract"
  /** Optional scale alongside displacement (0.1 → up to 1.1× at the pointer); 0 disables. */
  scaleResponse?: number
  /** Per-cell settle spring. */
  spring?: ProximityFieldSpring
  /** Grid gap. */
  gap?: number | string
  className?: string
}

const DEFAULT_SPRING: ProximityFieldSpring = { stiffness: 150, damping: 15, mass: 0.1 }

// t = distance / radius, in [0, 1]. Every curve is exactly 1 at t=0 and 0 at
// t=1 so cells at the radius boundary never pop.
const FALLOFF: Record<NonNullable<ProximityFieldProps["falloff"]>, (t: number) => number> = {
  linear: (t) => 1 - t,
  gaussian: (t) =>
    (Math.exp(-(t * t) / 0.32) - Math.exp(-1 / 0.32)) / (1 - Math.exp(-1 / 0.32)),
  inverse: (t) => (1 / (1 + 5 * t) - 1 / 6) * (6 / 5),
}

interface CellCenter {
  x: number
  y: number
}

interface ProximityCellProps {
  index: number
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  radius: number
  strength: number
  falloff: NonNullable<ProximityFieldProps["falloff"]>
  polarity: NonNullable<ProximityFieldProps["polarity"]>
  scaleResponse: number
  spring: ProximityFieldSpring
  getCenter: (index: number) => CellCenter | undefined
  registerEl: (index: number, el: HTMLDivElement | null) => void
  children: React.ReactNode
}

/**
 * Module-private cell. This is the zero-re-render seam: each cell subscribes
 * to the parent's shared pointer motion values through useTransform, so
 * pointer movement never touches React state.
 */
function ProximityCell({
  index,
  pointerX,
  pointerY,
  radius,
  strength,
  falloff,
  polarity,
  scaleResponse,
  spring,
  getCenter,
  registerEl,
  children,
}: ProximityCellProps) {
  const sign = polarity === "repel" ? -1 : 1
  const falloffFn = FALLOFF[falloff]

  const dispX = useTransform(() => {
    const px = pointerX.get()
    const py = pointerY.get()
    const c = getCenter(index)
    if (!c || !Number.isFinite(px) || !Number.isFinite(py)) return 0
    const dx = px - c.x
    const dy = py - c.y
    const d = Math.hypot(dx, dy)
    if (d >= radius || d === 0) return 0
    return sign * (dx / d) * falloffFn(d / radius) * strength
  })

  const dispY = useTransform(() => {
    const px = pointerX.get()
    const py = pointerY.get()
    const c = getCenter(index)
    if (!c || !Number.isFinite(px) || !Number.isFinite(py)) return 0
    const dx = px - c.x
    const dy = py - c.y
    const d = Math.hypot(dx, dy)
    if (d >= radius || d === 0) return 0
    return sign * (dy / d) * falloffFn(d / radius) * strength
  })

  const cellScale = useTransform(() => {
    if (scaleResponse === 0) return 1
    const px = pointerX.get()
    const py = pointerY.get()
    const c = getCenter(index)
    if (!c || !Number.isFinite(px) || !Number.isFinite(py)) return 1
    const d = Math.hypot(px - c.x, py - c.y)
    if (d >= radius) return 1
    return 1 + falloffFn(d / radius) * scaleResponse
  })

  const x = useSpring(dispX, spring)
  const y = useSpring(dispY, spring)
  const scale = useSpring(cellScale, spring)

  return (
    <motion.div ref={(el) => registerEl(index, el)} style={{ x, y, scale }}>
      {children}
    </motion.div>
  )
}

/**
 * Pointer-reactive lattice: every cell displaces relative to the cursor with
 * distance falloff, springing back to rest on leave. Reduced-motion and
 * touch (coarse-pointer) environments get the same grid, fully static.
 *
 * @example
 * <ProximityField columns={8} className="mx-auto max-w-3xl">
 *   {Array.from({ length: 32 }, (_, i) => (
 *     <span key={i} className="text-4xl font-semibold text-foreground">*</span>
 *   ))}
 * </ProximityField>
 *
 * @example Attracting image tiles with a gentle scale
 * <ProximityField columns={6} polarity="attract" scaleResponse={0.08} falloff="inverse" gap="0.5rem">
 *   {images.map((src) => (
 *     <img key={src} src={src} alt="" className="aspect-square rounded-md object-cover" />
 *   ))}
 * </ProximityField>
 */
export function ProximityField({
  children,
  columns = 12,
  radius = 180,
  strength = 40,
  falloff = "gaussian",
  polarity = "repel",
  scaleResponse = 0,
  spring = DEFAULT_SPRING,
  gap = "1rem",
  className,
}: ProximityFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cellEls = useRef<(HTMLDivElement | null)[]>([])
  const centersRef = useRef<CellCenter[]>([])
  const warnedRef = useRef(false)

  // Infinity is the "pointer absent" sentinel: every cell transform outputs
  // rest for non-finite input, so springs settle on leave/blur.
  const pointerX = useMotionValue(Infinity)
  const pointerY = useMotionValue(Infinity)

  const prefersReduced = useReducedMotion()
  const [coarsePointer, setCoarsePointer] = useState(false)
  const enabled = !prefersReduced && !coarsePointer

  const cells = React.Children.toArray(children)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    setCoarsePointer(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCoarsePointer(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (cells.length > 250 && !warnedRef.current) {
      warnedRef.current = true
      console.warn(
        `[ProximityField] ${cells.length} cells — per-cell springs cost main-thread time above ~250; consider fewer cells.`
      )
    }
  }, [cells.length])

  // Cell centers are measured once per layout change and cached; transforms
  // read the cache — never getBoundingClientRect inside a transform.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const measure = () => {
      centersRef.current = cellEls.current.map((el) =>
        el
          ? { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 }
          : { x: 0, y: 0 }
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [cells.length, columns, gap])

  useEffect(() => {
    const relax = () => {
      pointerX.set(Infinity)
      pointerY.set(Infinity)
    }
    window.addEventListener("blur", relax)
    return () => window.removeEventListener("blur", relax)
  }, [pointerX, pointerY])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set(e.clientX - rect.left)
    pointerY.set(e.clientY - rect.top)
  }

  const handlePointerLeave = () => {
    pointerX.set(Infinity)
    pointerY.set(Infinity)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative grid", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap }}
      onPointerMove={enabled ? handlePointerMove : undefined}
      onPointerLeave={enabled ? handlePointerLeave : undefined}
    >
      {cells.map((child, i) => (
        <ProximityCell
          key={i}
          index={i}
          pointerX={pointerX}
          pointerY={pointerY}
          radius={radius}
          strength={strength}
          falloff={falloff}
          polarity={polarity}
          scaleResponse={scaleResponse}
          spring={spring}
          getCenter={(idx) => centersRef.current[idx]}
          registerEl={(idx, el) => {
            cellEls.current[idx] = el
          }}
        >
          {child}
        </ProximityCell>
      ))}
    </div>
  )
}
