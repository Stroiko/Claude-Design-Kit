/**
 * custom-cursor.tsx
 * USE WHEN: The site's ONE recurring magenta motif (per DIRECTION.md: cursor glow OR scene
 *           accent OR progress line — pick one per site). A lerped glow follows the pointer
 *           and scales up over links/buttons. Wrap the page once, near the root.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: smooth-scroll-provider.tsx, webgl-hero-gradient.tsx, any immersive section
 * DEPS: /lib/utils
 * NOTE: Mounts NOTHING on touch/coarse-pointer devices or under reduced motion. The native
 *       cursor is never hidden (no cursor:none) — the glow is purely additive, pointer-events
 *       are off, and focus states/keyboard navigation are untouched.
 */
"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface CustomCursorProps {
  children?: ReactNode
  className?: string
}

export function CustomCursor({ children, className }: CustomCursorProps) {
  const [active, setActive] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Capability gate: fine pointer + hover + motion allowed. Re-evaluates on change
  // (hybrid laptops, OS-level motion toggles).
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
    const glow = glowRef.current
    const dot = dotRef.current
    if (!glow || !dot) return

    let pointerX = -100
    let pointerY = -100
    let glowX = -100
    let glowY = -100
    let dotX = -100
    let dotY = -100
    let scale = 1
    let targetScale = 1
    let seen = false

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!seen) {
        seen = true
        // Snap to the first position, then reveal — no fly-in from the corner.
        glowX = dotX = pointerX
        glowY = dotY = pointerY
        glow.style.opacity = "1"
        dot.style.opacity = "1"
      }
    }
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target
      const interactive =
        target instanceof Element &&
        target.closest("a, button, [role='button'], input, textarea, select, label")
      targetScale = interactive ? 1.8 : 1
    }
    const onPointerLeave = () => {
      glow.style.opacity = "0"
      dot.style.opacity = "0"
      seen = false
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerover", onPointerOver, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)

    let rafId = 0
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      // The dot tracks tightly; the glow trails on a slower lerp.
      dotX += (pointerX - dotX) * 0.55
      dotY += (pointerY - dotY) * 0.55
      glowX += (pointerX - glowX) * 0.16
      glowY += (pointerY - glowY) * 0.16
      scale += (targetScale - scale) * 0.14
      dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0) translate(-50%, -50%)`
      glow.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerover", onPointerOver)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [active])

  return (
    <>
      {children}
      {active ? (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none fixed inset-0 z-[60]", className)}
        >
          {/* Magenta glow — the recurring motif. Trails the pointer, swells over interactives. */}
          <div
            ref={glowRef}
            className="absolute top-0 left-0 size-10 rounded-full bg-primary/25 opacity-0 blur-md transition-opacity duration-300 will-change-transform"
          />
          <div
            ref={dotRef}
            className="absolute top-0 left-0 size-1.5 rounded-full bg-primary opacity-0 transition-opacity duration-300 will-change-transform"
          />
        </div>
      ) : null}
    </>
  )
}
