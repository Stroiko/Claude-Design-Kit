/**
 * preloader.tsx
 * USE WHEN: A page that genuinely loads heavy assets (WebGL hero, display fonts, provided
 *           imagery) needs an honest opening beat. Progress is driven by real signals —
 *           document.fonts.ready and window load — with a 2.5s hard cap; never include this
 *           on light pages (fake loading screens are a DIRECTION.md anti-pattern).
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: webgl-hero-gradient.tsx, webgl-hero-particles.tsx, smooth-scroll-provider.tsx
 * DEPS: /lib/utils
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). Reduced motion dismisses instantly — no percentage theater.
 */
"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface PreloaderProps {
  /** Uppercase tracking label, film-credit style. */
  label?: string
  /** Smaller second line under the label. Omit to hide. */
  sublabel?: string
  /** Called once the curtain has fully left. */
  onComplete?: () => void
  className?: string
}

/** Hard cap: never make the audience wait longer than the honest maximum. */
const MAX_WAIT_MS = 2500
const EXIT_MS = 700

export function Preloader({
  label = "Signal Bloom",
  sublabel = "Vela Nox",
  onComplete,
  className,
}: PreloaderProps) {
  const [percent, setPercent] = useState(0)
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading")
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // Reduced motion is absolute: dismiss instantly, no percentage theater.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done")
      onCompleteRef.current?.()
      return
    }

    // Honest progress: a small base for "the document responded", then real signals.
    let target = 20
    let fontsReady = false
    let windowLoaded = false
    let cancelled = false
    const advance = () => {
      target = 20 + (fontsReady ? 40 : 0) + (windowLoaded ? 40 : 0)
    }

    document.fonts.ready.then(() => {
      if (cancelled) return
      fontsReady = true
      advance()
    })
    const onLoad = () => {
      windowLoaded = true
      advance()
    }
    if (document.readyState === "complete") onLoad()
    else window.addEventListener("load", onLoad)

    // Hard timeout — the cap on honesty. Whatever hasn't arrived, we leave anyway.
    const timeout = window.setTimeout(() => {
      fontsReady = true
      windowLoaded = true
      advance()
    }, MAX_WAIT_MS)

    let displayed = 0
    let rafId = 0
    let leaveTimer = 0
    const loop = () => {
      displayed += (target - displayed) * 0.09
      if (target >= 100 && displayed > 99.2) {
        setPercent(100)
        setPhase("leaving")
        leaveTimer = window.setTimeout(() => {
          setPhase("done")
          onCompleteRef.current?.()
        }, EXIT_MS)
        return
      }
      setPercent(Math.round(displayed))
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.clearTimeout(timeout)
      window.clearTimeout(leaveTimer)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  if (phase === "done") return null

  return (
    <div
      role="status"
      className={cn(
        "fixed inset-0 z-[70] flex flex-col justify-end bg-background transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "leaving" && "-translate-y-full",
        className
      )}
    >
      <span className="sr-only">Loading {label}</span>
      <div aria-hidden="true" className="flex items-end justify-between p-6 md:p-10">
        <div>
          <p className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </p>
          {sublabel ? (
            <p className="mt-2 font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
              {sublabel}
            </p>
          ) : null}
        </div>
        <p className="font-(family-name:--font-display) text-[54px] leading-none font-extrabold tracking-tight text-foreground tabular-nums md:text-[81px]">
          {percent}
        </p>
      </div>
      {/* Bone progress hairline — the signal-color motif is reserved (see custom-cursor.tsx). */}
      <div aria-hidden="true" className="h-px w-full bg-border">
        <div
          className="h-full origin-left bg-foreground"
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>
    </div>
  )
}
