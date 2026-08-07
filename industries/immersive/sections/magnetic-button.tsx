/**
 * magnetic-button.tsx
 * USE WHEN: The ALTERNATIVE recurring interaction motif to custom-cursor.tsx — per
 *           DIRECTION.md a site gets a custom cursor OR magnetic buttons, NEVER both on
 *           one page. Wraps a Button (or link via asChild) so it lerps gently toward the
 *           pointer within a small radius (max ~12px translate) and springs back on leave.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: webgl-hero-particles.tsx, credits-contact.tsx, any immersive section CTA
 * DEPS: /primitives/button, /lib/utils
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). Gated exactly like custom-cursor.tsx — pointer:fine + hover:hover
 *       + prefers-reduced-motion:no-preference, re-evaluated on change — and renders a
 *       plain Button otherwise. Focus states and keyboard activation are untouched.
 */
"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface MagneticButtonProps extends ComponentProps<typeof Button> {
  /** Class for the outer magnetic wrapper (the Button keeps `className`). */
  wrapperClassName?: string
}

/** Maximum translate in px — a lean, never a chase. */
const MAX_SHIFT = 12
/** Fraction of the pointer's offset from center the button leans by, pre-clamp. */
const PULL = 0.3

export function MagneticButton({ wrapperClassName, ...buttonProps }: MagneticButtonProps) {
  const [active, setActive] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)

  // Capability gate: fine pointer + hover + motion allowed. Re-evaluates on change
  // (hybrid laptops, OS-level motion toggles) — identical to custom-cursor.tsx.
  useEffect(() => {
    const queries = [
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(hover: hover)"),
      window.matchMedia("(prefers-reduced-motion: no-preference)"),
    ]
    const evaluate = () => setActive(queries.every((q) => q.matches))
    evaluate()
    queries.forEach((q) => q.addEventListener("change", evaluate))
    return () => queries.forEach((q) => q.removeEventListener("change", evaluate))
  }, [])

  useEffect(() => {
    if (!active) return
    const wrap = wrapRef.current
    if (!wrap) return

    // Center is measured once on pointerenter — never while the wrapper is translating,
    // so the lean can't feed back into its own measurement.
    let centerX = 0
    let centerY = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let rafId: number | null = null

    const loop = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      // Settled at rest? Clear the transform and stop the loop until the next hover.
      if (targetX === 0 && targetY === 0 && Math.abs(x) < 0.05 && Math.abs(y) < 0.05) {
        x = 0
        y = 0
        wrap.style.transform = ""
        rafId = null
        return
      }
      wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      rafId = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      if (rafId === null) rafId = requestAnimationFrame(loop)
    }

    const onPointerEnter = () => {
      const rect = wrap.getBoundingClientRect()
      centerX = rect.left + rect.width / 2 - x
      centerY = rect.top + rect.height / 2 - y
    }
    const onPointerMove = (event: PointerEvent) => {
      const clamp = (v: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, v))
      targetX = clamp((event.clientX - centerX) * PULL)
      targetY = clamp((event.clientY - centerY) * PULL)
      startLoop()
    }
    const onPointerLeave = () => {
      // Spring back to rest; the loop stops itself once settled.
      targetX = 0
      targetY = 0
      startLoop()
    }
    wrap.addEventListener("pointerenter", onPointerEnter)
    wrap.addEventListener("pointermove", onPointerMove, { passive: true })
    wrap.addEventListener("pointerleave", onPointerLeave)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      wrap.removeEventListener("pointerenter", onPointerEnter)
      wrap.removeEventListener("pointermove", onPointerMove)
      wrap.removeEventListener("pointerleave", onPointerLeave)
      wrap.style.transform = ""
    }
  }, [active])

  // Coarse pointer, no hover, or reduced motion: a plain Button, nothing else.
  if (!active) return <Button {...buttonProps} />

  return (
    <span ref={wrapRef} className={cn("inline-block will-change-transform", wrapperClassName)}>
      <Button {...buttonProps} />
    </span>
  )
}
