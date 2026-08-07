/**
 * depth-stack.tsx
 * USE WHEN: A layered scene with real depth — the camera follows the cursor on desktop and device tilt on mobile. Hero scenes, cover art, atmospheric section backdrops.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency). AVOID FOR: content-dense pages; industries whose budget excludes ambient motion.
 * PAIRS WITH: ink-bleed, axis-type, hero sections
 * DEPS: /lib/utils, motion
 * NOTE: blurWithDepth forces per-layer filter surfaces — capped at 8px and still costly; keep layers few and sized to the scene. iOS needs requestOrientationPermission() called from a user gesture.
 */
"use client"

import React, { useEffect, useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

export interface DepthStackSpring {
  stiffness: number
  damping: number
  mass: number
}

export interface DepthStackProps {
  /** One layer per child, ordered front to back. */
  children: React.ReactNode[]
  /** Per-layer depth multiplier, 1 = frontmost movement. Inferred from child order when omitted. */
  depth?: number[]
  /** Offset ceiling in px for a depth-1 layer at full camera deflection. */
  maxOffset?: number
  sources?: ("pointer" | "orientation")[]
  sensitivity?: number
  /** Blur deeper layers for atmosphere. Expensive: forces a filter surface per layer, capped at 8px. */
  blurWithDepth?: boolean
  /** CSS perspective on the scene container, in px. */
  perspective?: number
  /** When the camera drifts back to center: after ~1.5s idle, on pointer leave, or never. */
  recenterOn?: "idle" | "leave" | "never"
  spring?: DepthStackSpring
  className?: string
}

const DEFAULT_SPRING: DepthStackSpring = { stiffness: 100, damping: 20, mass: 0.5 }
const TILT_RANGE_DEG = 20
const MAX_BLUR_PX = 8
const IDLE_RECENTER_MS = 1500

// lib.dom types requestPermission only on Notification; iOS puts one on
// DeviceOrientationEvent. Structural type instead of `any`.
interface OrientationPermissionStatic {
  requestPermission?: () => Promise<"granted" | "denied">
}

/**
 * Ask iOS for device-orientation access. MUST be called from a user gesture
 * (button click) — iOS rejects requests made on mount. Resolves true when
 * orientation events will flow: granted, or no permission gate exists
 * (Android, desktop). DepthStack itself never requests; it silently stays
 * pointer-only until events arrive.
 */
export async function requestOrientationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") return false
  const doe = DeviceOrientationEvent as unknown as OrientationPermissionStatic
  if (typeof doe.requestPermission !== "function") return true
  try {
    return (await doe.requestPermission()) === "granted"
  } catch {
    return false
  }
}

interface DepthLayerProps {
  depthValue: number
  maxOffset: number
  sensitivity: number
  blurWithDepth: boolean
  zIndex: number
  camX: MotionValue<number>
  camY: MotionValue<number>
  children: React.ReactNode
}

function DepthLayer({ depthValue, maxOffset, sensitivity, blurWithDepth, zIndex, camX, camY, children }: DepthLayerProps) {
  const x = useTransform(() => camX.get() * depthValue * maxOffset * sensitivity)
  const y = useTransform(() => camY.get() * depthValue * maxOffset * sensitivity)
  const blur = Math.min(MAX_BLUR_PX, (1 - depthValue) * MAX_BLUR_PX)
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{
        x,
        y,
        zIndex,
        ...(blurWithDepth && blur > 0.1 ? { filter: `blur(${blur}px)` } : null),
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Pointer + gyroscope parallax: cursor position and device tilt both write
 * into one shared camera motion-value pair, so layers never know which source
 * is active. First orientation reading is captured as the calibration
 * baseline (holding the phone at any natural angle reads as centered), and
 * beta/gamma are clamped to ±20° before reaching any transform. Layers are
 * pointer-events: none — interactive children must opt back in. Reduced
 * motion renders the scene flat and static.
 *
 * @example
 * <DepthStack className="h-[70vh]" maxOffset={32}>
 *   <h1 className="pointer-events-auto grid h-full place-items-center text-7xl font-bold">ALTITUDE</h1>
 *   <div className="grid h-full place-items-center"><div className="h-64 w-64 rounded-full bg-accent" /></div>
 *   <div className="h-full bg-gradient-to-b from-muted to-background" />
 * </DepthStack>
 *
 * @example iOS: request tilt access from your own button
 * import { DepthStack, requestOrientationPermission } from "@/effects/depth-stack"
 * <button onClick={() => requestOrientationPermission()}>Enable tilt</button>
 * <DepthStack sources={["pointer", "orientation"]}>{layers}</DepthStack>
 */
export function DepthStack({
  children,
  depth,
  maxOffset = 40,
  sources = ["pointer", "orientation"],
  sensitivity = 1,
  blurWithDepth = false,
  perspective = 1000,
  recenterOn = "leave",
  spring = DEFAULT_SPRING,
  className,
}: DepthStackProps) {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const layers = React.Children.toArray(children)
  // Front to back: first child moves most, deepest layer least (but never 0).
  const depths = layers.map((_, i) => depth?.[i] ?? (layers.length - i) / Math.max(layers.length, 1))

  // The shared camera, in [-1, 1] per axis. Both sources write, layers only read.
  const camX = useMotionValue(0)
  const camY = useMotionValue(0)
  const camXs = useSpring(camX, spring)
  const camYs = useSpring(camY, spring)

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enabled = !prefersReduced

  const bumpIdleTimer = () => {
    if (recenterOn !== "idle") return
    if (idleTimer.current !== null) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      camX.set(0)
      camY.set(0)
    }, IDLE_RECENTER_MS)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    camX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    camY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
    bumpIdleTimer()
  }

  const handlePointerLeave = () => {
    if (recenterOn === "leave") {
      camX.set(0)
      camY.set(0)
    }
  }

  useEffect(() => {
    if (!enabled || !sources.includes("orientation")) return
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return
    // Calibration baseline: the first reading defines "centered", so any
    // natural holding angle starts the scene at rest.
    let baseline: { beta: number; gamma: number } | null = null
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return
      if (baseline === null) baseline = { beta: e.beta, gamma: e.gamma }
      const dBeta = Math.max(-TILT_RANGE_DEG, Math.min(TILT_RANGE_DEG, e.beta - baseline.beta))
      const dGamma = Math.max(-TILT_RANGE_DEG, Math.min(TILT_RANGE_DEG, e.gamma - baseline.gamma))
      camX.set(dGamma / TILT_RANGE_DEG)
      camY.set(dBeta / TILT_RANGE_DEG)
      bumpIdleTimer()
    }
    window.addEventListener("deviceorientation", onOrientation)
    return () => window.removeEventListener("deviceorientation", onOrientation)
    // Recreating the listener resets calibration — intentional on source/motion changes.
  }, [enabled, sources.join(","), camX, camY, recenterOn])

  useEffect(() => {
    return () => {
      if (idleTimer.current !== null) clearTimeout(idleTimer.current)
    }
  }, [])

  const pointerActive = enabled && sources.includes("pointer")

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ perspective }}
      onPointerMove={pointerActive ? handlePointerMove : undefined}
      onPointerLeave={pointerActive ? handlePointerLeave : undefined}
    >
      {layers.map((layer, i) => (
        <DepthLayer
          key={i}
          depthValue={enabled ? depths[i] : 0}
          maxOffset={maxOffset}
          sensitivity={sensitivity}
          blurWithDepth={blurWithDepth}
          zIndex={layers.length - i}
          camX={camXs}
          camY={camYs}
        >
          {layer}
        </DepthLayer>
      ))}
    </div>
  )
}
