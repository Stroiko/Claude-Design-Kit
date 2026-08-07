/**
 * manifesto-statement.tsx
 * USE WHEN: The big-type statement scene near the end of the page — one long sentence where
 *           the emphasized words light up in magenta as scroll progress advances through the
 *           section (scrubbed, reversible). The page's editorial thesis in one breath.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, type-wall.tsx, split-text-title.tsx
 * DEPS: /lib/utils
 * NOTE: Unbounded (display) and Sora (body) come from the Google Fonts @import declared in
 *       ../DIRECTION.md. Emphasized words render already lit (final state) — JS dims them
 *       only after the reduced-motion check, so static users always see the finished scene.
 */
"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export interface ManifestoStatementProps {
  /** Film-credit caption above the sentence. */
  label?: string
  /** One long sentence, 36–54px. This section is the whole thought — no paragraphs after. */
  sentence?: string
  /**
   * Words to emphasize in magenta Unbounded, matched case-insensitively with punctuation
   * stripped. They light up in sentence order as progress advances.
   */
  emphasis?: string[]
  className?: string
}

const DEFAULT_SENTENCE =
  "Signal Bloom was written in the dark, mixed at dawn, and mastered for the moment a room full of strangers becomes one organism."

export function ManifestoStatement({
  label = "The premise",
  sentence = DEFAULT_SENTENCE,
  emphasis = ["dark", "dawn", "organism"],
  className,
}: ManifestoStatementProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const words = sentence.split(/\s+/).filter(Boolean)
  const emphasisSet = new Set(emphasis.map((w) => w.toLowerCase()))
  const isEmphasized = (word: string) =>
    emphasisSet.has(word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""))

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    // Reduced motion is absolute: all emphasized words already render lit — do nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const emphasized = Array.from(
      section.querySelectorAll<HTMLSpanElement>("[data-emphasis-word]")
    )
    if (emphasized.length === 0) return

    // Start dimmed; the scrub lights them back up. Inline color only ever points at tokens.
    emphasized.forEach((el) => {
      el.style.color = "var(--color-muted-foreground)"
    })

    // Geometry is measured on mount/resize only — the rAF loop never reads layout.
    let sectionTop = 0
    let sectionHeight = 1
    const measure = () => {
      const rect = section.getBoundingClientRect()
      sectionTop = rect.top + window.scrollY
      sectionHeight = rect.height
    }
    measure()
    window.addEventListener("resize", measure)

    let current = 0
    let litCount = -1
    let rafId: number | null = null
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const viewportH = window.innerHeight
      const target = Math.min(
        Math.max(
          (window.scrollY + viewportH * 0.85 - sectionTop) / (sectionHeight + viewportH * 0.35),
          0
        ),
        1
      )
      current += (target - current) * 0.1
      const nextLit = Math.round(current * emphasized.length)
      if (nextLit !== litCount) {
        litCount = nextLit
        emphasized.forEach((el, i) => {
          el.style.color = i < litCount ? "" : "var(--color-muted-foreground)"
        })
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startLoop()
        else stopLoop()
      },
      { rootMargin: "20% 0px 20% 0px" }
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      stopLoop()
      window.removeEventListener("resize", measure)
    }
  }, [sentence, emphasis])

  return (
    <section ref={sectionRef} className={cn("bg-background py-24 md:py-40", className)}>
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <p className="font-[Sora] text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-10 font-[Sora] text-[24px] leading-[1.4] font-semibold text-foreground md:text-[36px] md:leading-[1.35] lg:text-[54px] lg:leading-[1.25]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              {isEmphasized(word) ? (
                <span
                  data-emphasis-word=""
                  className="font-[Unbounded] text-primary transition-colors duration-700"
                >
                  {word}
                </span>
              ) : (
                word
              )}
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
