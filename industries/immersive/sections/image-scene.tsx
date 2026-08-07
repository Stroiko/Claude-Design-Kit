/**
 * image-scene.tsx
 * USE WHEN: A cinematic full-bleed photo scene for user-provided imagery — one darkened
 *           image per scene (DIRECTION.md), held in a 100svh sticky frame that settles
 *           from 1.06 to 1.0 scale as viewport progress advances (scrubbed, reversible).
 *           NO WebGL here: the page's one-canvas budget belongs to the hero.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, manifesto-statement.tsx, credits-contact.tsx
 * DEPS: /lib/utils
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). The kit ships no binary assets — without `src`, a bg-secondary
 *       frame with a subtle token gradient stands in until the user provides photography.
 *       Reduced motion renders a static full-bleed image: no sticky frame, no scale.
 */
"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface ImageSceneProps {
  /** User-provided photograph. Omit to render the styled stand-in frame. */
  src?: string
  /** Meaningful alt text for the photograph. Required whenever `src` is set. */
  alt?: string
  /** One caption line, film-credit style. Keep it to a single breath. */
  caption?: string
  className?: string
}

/** Scale travel: 1.06 at scene entry settling to 1.0 by exit. Gentle on purpose. */
const SCALE_FROM = 1.06

export function ImageScene({
  src,
  alt = "",
  caption = "The planetarium dome, Tromsø — final playback at dawn",
  className,
}: ImageSceneProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const wrapper = wrapperRef.current
    const frame = frameRef.current
    if (!wrapper || !frame) return

    // Geometry is measured on mount/resize only — the rAF loop never reads layout.
    let wrapperTop = 0
    let scrollRange = 1
    const measure = () => {
      const rect = wrapper.getBoundingClientRect()
      wrapperTop = rect.top + window.scrollY
      scrollRange = Math.max(rect.height - window.innerHeight, 1)
    }
    measure()
    window.addEventListener("resize", measure)

    let current = 0
    let rafId: number | null = null
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const target = Math.min(Math.max((window.scrollY - wrapperTop) / scrollRange, 0), 1)
      current += (target - current) * 0.1
      const scale = SCALE_FROM - (SCALE_FROM - 1) * current
      frame.style.transform = `scale(${scale.toFixed(4)})`
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

    // Only scrub while the scene is near the viewport.
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
  }, [reducedMotion])

  // The photograph (or stand-in), the dark scrim, and the caption — bone and muted only;
  // the signal color never touches this scene (DIRECTION.md two-role rule).
  const sceneLayers = (
    <>
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        // Stand-in frame: bg-secondary with a subtle token gradient — never a blank hole.
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-secondary bg-gradient-to-b from-accent/40 via-secondary to-background"
        />
      )}
      {/* Dark scrim: photography is treated cinematically — full-bleed and darkened. */}
      <div aria-hidden="true" className="absolute inset-0 bg-background/40" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent"
      />
    </>
  )

  const captionLine = caption ? (
    <p className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase md:px-12">
      {caption}
    </p>
  ) : null

  // Reduced motion: one static full-bleed frame. Same image, same caption, zero motion.
  if (reducedMotion) {
    return (
      <section className={cn("relative h-svh min-h-[560px] overflow-hidden bg-background", className)}>
        {sceneLayers}
        {captionLine}
      </section>
    )
  }

  return (
    <section ref={wrapperRef} className={cn("relative h-[150svh] bg-background", className)}>
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden">
        {/* The frame scales 1.06 → 1.0 with scroll progress; overflow-hidden crops the bleed. */}
        <div
          ref={frameRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${SCALE_FROM})` }}
        >
          {sceneLayers}
        </div>
        {captionLine}
      </div>
    </section>
  )
}
