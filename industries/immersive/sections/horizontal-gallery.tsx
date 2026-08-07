/**
 * horizontal-gallery.tsx
 * USE WHEN: A track list, visual archive, or tour reel presented as a sticky horizontal
 *           scroll-scrub — vertical scroll translates the track on X. 4–6 slots maximum.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: scroll-story.tsx, type-wall.tsx, manifesto-statement.tsx
 * DEPS: /lib/utils
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). Reduced motion renders a plain overflow-x scroll strip — same
 *       content, native scrolling, keyboard reachable.
 */
"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface GalleryItem {
  /** Item title, display type. */
  caption: string
  /** Film-credit meta line under the caption (duration, role, city…). */
  meta?: string
  /** Optional visual slot (e.g. darkened full-bleed art). Falls back to a styled frame. */
  image?: ReactNode
  /** Meaningful alt for the fallback frame. Omit if the visual is purely decorative. */
  imageAlt?: string
}

export interface HorizontalGalleryProps {
  /** Film-credit label above the track. */
  label?: string
  /** 4–6 items. Fewer reads empty; more outstays the scrub. */
  items?: GalleryItem[]
  className?: string
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { caption: "Low Orbit", meta: "Track 01 — 03:58" },
  { caption: "Chlorophyll", meta: "Track 04 — 04:41" },
  { caption: "Signal Bloom", meta: "Title track — 06:12" },
  { caption: "Vantablack Sun", meta: "Track 08 — 03:07" },
  { caption: "Afterglow", meta: "Closer — 07:26" },
]

export function HorizontalGallery({
  label = "The record — eleven transmissions",
  items = DEFAULT_ITEMS,
  className,
}: HorizontalGalleryProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    // Geometry is measured on mount/resize only — the rAF loop never reads layout.
    let wrapperTop = 0
    let scrollRange = 1
    let maxShift = 0
    const measure = () => {
      const rect = wrapper.getBoundingClientRect()
      wrapperTop = rect.top + window.scrollY
      scrollRange = Math.max(rect.height - window.innerHeight, 1)
      maxShift = Math.max(track.scrollWidth - window.innerWidth, 0)
    }
    measure()
    window.addEventListener("resize", measure)

    let current = 0
    let rafId: number | null = null
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const target = Math.min(Math.max((window.scrollY - wrapperTop) / scrollRange, 0), 1)
      current += (target - current) * 0.1
      track.style.transform = `translate3d(${(-maxShift * current).toFixed(2)}px, 0, 0)`
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

    // Only scrub while the gallery is near the viewport.
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

  const itemCards = items.map((item, index) => (
    <figure key={item.caption} className="w-[72vw] max-w-[560px] shrink-0 md:w-[42vw]">
      {item.image ?? (
        <div
          role={item.imageAlt ? "img" : undefined}
          aria-label={item.imageAlt}
          aria-hidden={item.imageAlt ? undefined : true}
          className="aspect-[4/3] w-full border border-border bg-secondary [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
        />
      )}
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-(family-name:--font-display) text-lg font-semibold tracking-tight text-foreground md:text-2xl">
          {item.caption}
        </span>
        <span className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase">
          {item.meta ?? String(index + 1).padStart(2, "0")}
        </span>
      </figcaption>
    </figure>
  ))

  // Reduced motion: a plain horizontal strip with native overflow scrolling.
  if (reducedMotion) {
    return (
      <section className={cn("bg-background py-24 md:py-32", className)}>
        <p className="px-6 font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase md:px-12">
          {label}
        </p>
        <div
          role="region"
          aria-label={label}
          tabIndex={0}
          className="mt-10 flex gap-6 overflow-x-auto px-6 pb-6 focus-visible:outline-2 focus-visible:outline-ring md:px-12"
        >
          {itemCards}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={wrapperRef}
      style={{ height: `${100 + items.length * 55}svh` }}
      className={cn("relative bg-background", className)}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <p className="px-6 font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase md:px-12">
          {label}
        </p>
        <div
          ref={trackRef}
          className="mt-10 flex w-max gap-6 px-6 will-change-transform md:gap-10 md:px-12"
        >
          {itemCards}
        </div>
      </div>
    </section>
  )
}
