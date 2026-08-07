/**
 * type-wall.tsx
 * USE WHEN: A typographic theater interlude — 3–5 rows of huge display text that
 *           shift subtly on X in opposing directions as the page scrolls. Type IS the
 *           imagery here; use instead of (not alongside) a horizontal gallery.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: webgl-hero-particles.tsx, manifesto-statement.tsx, scroll-story.tsx
 * DEPS: /lib/utils
 * NOTE: Display font comes from the commitment token --font-display (see ../DIRECTION.md).
 *       The scroll offset is scrubbed (rAF-lerped), nothing loops. Reduced motion keeps the
 *       staggered static composition — the offsets are designed in, JS only shifts them.
 */
"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export interface TypeWallProps {
  /** 3–5 short rows. Long rows clip by design (overflow hidden) — keep them punchy. */
  rows?: string[]
  className?: string
}

const DEFAULT_ROWS = ["SIGNAL", "BLOOM", "VELA NOX", "OUT 10.02"]

/** Designed static offsets — the composition holds with zero motion. */
const STATIC_OFFSETS = ["pl-[4vw]", "pl-[16vw]", "pl-[9vw]", "pl-[22vw]", "pl-[2vw]"]

export function TypeWall({ rows = DEFAULT_ROWS, className }: TypeWallProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    // Reduced motion is absolute: the static composition already stands — do nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Geometry is measured on mount/resize only — the rAF loop never reads layout.
    let wrapperTop = 0
    let wrapperHeight = 1
    const measure = () => {
      const rect = wrapper.getBoundingClientRect()
      wrapperTop = rect.top + window.scrollY
      wrapperHeight = rect.height
    }
    measure()
    window.addEventListener("resize", measure)

    let current = 0
    let rafId: number | null = null
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const viewportH = window.innerHeight
      const target = Math.min(
        Math.max((window.scrollY + viewportH - wrapperTop) / (viewportH + wrapperHeight), 0),
        1
      )
      current += (target - current) * 0.1
      rowRefs.current.forEach((el, i) => {
        if (!el) return
        // Subtle opposing drifts, scrubbed — never more than ~10vw of travel.
        const direction = i % 2 === 0 ? -1 : 1
        const amplitude = 60 + i * 30
        el.style.transform = `translate3d(${((current - 0.5) * amplitude * direction).toFixed(2)}px, 0, 0)`
      })
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startLoop()
        else stopLoop()
      },
      { rootMargin: "20% 0px 20% 0px" }
    )
    observer.observe(wrapper)

    return () => {
      observer.disconnect()
      stopLoop()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className={cn("overflow-hidden bg-background py-24 md:py-40", className)}
    >
      {rows.map((row, index) => (
        <div
          key={row}
          ref={(el) => {
            rowRefs.current[index] = el
          }}
          className={cn(
            "font-(family-name:--font-display) text-[54px] leading-[0.95] font-extrabold tracking-tight whitespace-nowrap will-change-transform md:text-[81px] lg:text-[121px]",
            STATIC_OFFSETS[index % STATIC_OFFSETS.length],
            // Every other row is outlined bone — texture without a second color.
            index % 2 === 1
              ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-foreground)]"
              : "text-foreground"
          )}
        >
          {row}
        </div>
      ))}
    </section>
  )
}
