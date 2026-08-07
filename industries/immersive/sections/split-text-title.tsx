/**
 * split-text-title.tsx
 * USE WHEN: A scene title that reveals word by word — rise + de-blur, either played once on
 *           view or scrubbed by viewport entry progress. Scratch splitter: no GSAP SplitText,
 *           no paid libraries; screen readers get the intact sentence via sr-only.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, manifesto-statement.tsx, webgl-hero-gradient.tsx
 * DEPS: /lib/utils
 * NOTE: Display font comes from the commitment token --font-display (see ../DIRECTION.md).
 *       Reduced motion renders the final state immediately — the hidden state is only ever
 *       applied by JS after the motion preference check, so static users never see blank text.
 */
"use client"

import { createElement, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export interface SplitTextTitleProps {
  /** The title sentence. Split into words at render; never split manually. */
  text?: string
  /** Heading level — keep one h1 per page. */
  as?: "h1" | "h2" | "h3"
  /**
   * "once": staggered reveal the first time 40% of the title is visible.
   * "scrub": reveal tied to how far the title has entered the viewport (reversible).
   */
  mode?: "once" | "scrub"
  className?: string
}

export function SplitTextTitle({
  text = "Every signal blooms in the dark",
  as = "h2",
  mode = "once",
  className,
}: SplitTextTitleProps) {
  const rootRef = useRef<HTMLElement>(null)
  const words = text.split(/\s+/).filter(Boolean)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // Reduced motion is absolute: words already render in their final state — do nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const wordEls = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-split-word]"))
    if (wordEls.length === 0) return

    const hide = (el: HTMLSpanElement) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(0.6em)"
      el.style.filter = "blur(8px)"
    }

    if (mode === "once") {
      wordEls.forEach(hide)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          observer.disconnect()
          wordEls.forEach((el, i) => {
            el.style.transition = [
              `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
              `transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
              `filter 700ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
            ].join(", ")
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
            el.style.filter = "blur(0px)"
          })
        },
        { threshold: 0.4 }
      )
      observer.observe(root)
      return () => observer.disconnect()
    }

    // mode === "scrub": progress from viewport entry, rAF-lerped. Geometry measured on
    // mount/resize only — the loop itself never reads layout.
    wordEls.forEach(hide)
    let elementTop = 0
    const measure = () => {
      const rect = root.getBoundingClientRect()
      elementTop = rect.top + window.scrollY
    }
    measure()
    window.addEventListener("resize", measure)

    let current = 0
    let rafId: number | null = null
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const viewportH = window.innerHeight
      const target = Math.min(
        Math.max((window.scrollY + viewportH - elementTop) / (viewportH * 0.7), 0),
        1
      )
      current += (target - current) * 0.12
      wordEls.forEach((el, i) => {
        const start = (i / wordEls.length) * 0.6
        const local = Math.min(Math.max((current - start) / 0.4, 0), 1)
        el.style.opacity = local.toFixed(3)
        el.style.transform = `translateY(${((1 - local) * 0.6).toFixed(3)}em)`
        el.style.filter = `blur(${((1 - local) * 8).toFixed(2)}px)`
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
    observer.observe(root)

    return () => {
      observer.disconnect()
      stopLoop()
      window.removeEventListener("resize", measure)
    }
  }, [mode, text])

  return createElement(
    as,
    {
      ref: rootRef,
      className: cn(
        "font-(family-name:--font-display) text-[36px] leading-[0.95] font-extrabold tracking-tight text-foreground md:text-[54px] lg:text-[81px]",
        className
      ),
    },
    // Screen readers get the intact sentence; the split clone is decoration.
    <span className="sr-only">{text}</span>,
    <span aria-hidden="true">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            data-split-word=""
            className="inline-block will-change-[transform,opacity,filter]"
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  )
}
