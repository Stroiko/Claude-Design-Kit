/**
 * scroll-story.tsx
 * USE WHEN: The pinned storytelling block after the hero — 2–4 scenes crossfading inside a
 *           sticky viewport while the page scrolls, like interactive film credits. Scene
 *           progress is scrubbed (rAF-lerped from scroll position), never triggered.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: webgl-hero-gradient.tsx, horizontal-gallery.tsx, manifesto-statement.tsx
 * DEPS: /lib/utils
 * NOTE: Unbounded (display) and Sora (body) come from the Google Fonts @import declared in
 *       ../DIRECTION.md. Reduced motion renders every scene as a normal stacked static
 *       section — same content, zero pinning, zero motion.
 */
"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface StoryScene {
  /** Scene title, Unbounded display type. */
  title: string
  /** One Sora line — this direction speaks in headlines, keep it short. */
  line: string
  /** Optional visual slot (e.g. a full-bleed darkened image). Falls back to a styled frame. */
  visual?: ReactNode
  /** Caption under the visual slot, film-credit style. */
  visualCaption?: string
}

export interface ScrollStoryProps {
  /** 2–4 scenes. More than 4 turns storytelling into a slideshow — split the page instead. */
  scenes?: StoryScene[]
  className?: string
}

const DEFAULT_SCENES: StoryScene[] = [
  {
    title: "First light",
    line: "Recorded over one polar winter in a disused planetarium north of Tromsø.",
    visualCaption: "The planetarium dome, session one",
  },
  {
    title: "The bloom",
    line: "Every synth on the record was resampled through the dome's forty-meter natural reverb.",
    visualCaption: "Modular rig under the projector",
  },
  {
    title: "Afterglow",
    line: "Eleven tracks, sequenced as a single unbroken transmission from dusk to dawn.",
    visualCaption: "Vela Nox, final playback",
  },
]

export function ScrollStory({ scenes = DEFAULT_SCENES, className }: ScrollStoryProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const count = scenes.length

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
    let lastActive = -1
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const target = Math.min(Math.max((window.scrollY - wrapperTop) / scrollRange, 0), 1)
      current += (target - current) * 0.1

      // Clamp so the first scene is lit at the top and the last at the bottom.
      const segment = Math.min(Math.max(current * count, 0.5), count - 0.5)
      for (let i = 0; i < count; i++) {
        const el = sceneRefs.current[i]
        if (!el) continue
        const distance = Math.abs(segment - i - 0.5)
        const opacity = Math.min(Math.max((0.5 - distance) * 4, 0), 1)
        el.style.opacity = opacity.toFixed(3)
        el.style.transform = `translateY(${((segment - i - 0.5) * -36).toFixed(2)}px)`
      }
      const active = Math.min(Math.floor(segment), count - 1)
      if (active !== lastActive) {
        lastActive = active
        setActiveIndex(active)
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

    // Only scrub while the story is near the viewport.
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
  }, [reducedMotion, scenes.length])

  const sceneContent = (scene: StoryScene, index: number) => (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-12">
      <div>
        <p className="font-[Sora] text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Scene {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-5 font-[Unbounded] text-[36px] leading-[1.0] font-extrabold tracking-tight text-foreground md:text-[54px] lg:text-[81px]">
          {scene.title}
        </h2>
        <p className="mt-6 max-w-prose font-[Sora] text-base leading-relaxed text-muted-foreground md:text-lg">
          {scene.line}
        </p>
      </div>
      <div>
        {scene.visual ?? (
          <div
            aria-hidden="true"
            className="aspect-[4/3] w-full border border-border bg-secondary [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
          />
        )}
        {scene.visualCaption ? (
          <p className="mt-3 font-[Sora] text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {scene.visualCaption}
          </p>
        ) : null}
      </div>
    </div>
  )

  // Reduced motion: same scenes as normal stacked sections. Fully usable, zero motion.
  if (reducedMotion) {
    return (
      <section className={cn("bg-background", className)}>
        {scenes.map((scene, index) => (
          <div key={scene.title} className="flex min-h-svh items-center py-16">
            {sceneContent(scene, index)}
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={wrapperRef}
      style={{ height: `${scenes.length * 100}svh` }}
      className={cn("relative bg-background", className)}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {scenes.map((scene, index) => (
          <div
            key={scene.title}
            ref={(el) => {
              sceneRefs.current[index] = el
            }}
            className="absolute inset-0 flex items-center will-change-[transform,opacity]"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            {sceneContent(scene, index)}
          </div>
        ))}

        {/* Scene index, film-credit style. Decorative — the scenes themselves stay readable. */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
        >
          {scenes.map((scene, index) => (
            <span
              key={scene.title}
              className={cn(
                "font-[Sora] text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500",
                index === activeIndex ? "text-foreground" : "text-muted-foreground/50"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
