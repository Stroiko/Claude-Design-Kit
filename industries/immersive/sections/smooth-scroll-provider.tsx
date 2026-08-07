/**
 * smooth-scroll-provider.tsx
 * USE WHEN: The whole immersive page should scroll with eased inertia. Wrap the page once,
 *           at the root, outside every section. Lenis wraps NATIVE scroll — position:sticky,
 *           anchor links, and keyboard/assistive scrolling keep working. This is easing,
 *           never scroll-jacking: if native scroll would break, do not ship this.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: custom-cursor.tsx, scroll-story.tsx, horizontal-gallery.tsx, preloader.tsx
 * DEPS: lenis
 * NOTE: Under prefers-reduced-motion Lenis is never instantiated — the page uses plain
 *       native scrolling, and children render identically.
 */
"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

export interface SmoothScrollProviderProps {
  children?: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Reduced motion is absolute: no Lenis, native scroll only.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    // Route same-page anchor clicks through lenis.scrollTo so #links ease instead of jump.
    // Without JS (or with reduced motion) the same links fall back to native anchor behavior.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']")
      if (!anchor) return
      const id = decodeURIComponent(anchor.hash.slice(1))
      if (!id) return
      const destination = document.getElementById(id)
      if (!destination) return
      event.preventDefault()
      lenis.scrollTo(destination)
      history.pushState(null, "", anchor.hash)
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
