/**
 * hero-split-screenshot.tsx
 * USE WHEN: The landing page opener when the pitch needs a beat more explanation — eyebrow,
 *           headline, and trust line on the left, product screenshot on the right. Left-aligned
 *           per the SaaS direction.
 * INDUSTRY FIT: saas. AVOID FOR: portfolio or restaurant sites — a framed dashboard next to
 *           conversion copy signals software, and the dense left column crowds visual work.
 * PAIRS WITH: logos-marquee.tsx, features-rows.tsx, stats-band.tsx
 * DEPS: /primitives/button
 */
import { type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface HeroSplitScreenshotProps {
  eyebrow?: string
  headline?: string
  subline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Small reassurance line under the CTAs, e.g. "No credit card required". */
  trustLine?: string
  /** Product screenshot shown inside the dark browser frame. */
  screenshotSrc?: string
  screenshotAlt?: string
  /** Custom content for the frame slot (e.g. a live demo). Overrides screenshotSrc. */
  children?: ReactNode
  className?: string
}

export function HeroSplitScreenshot({
  eyebrow = "Release automation",
  headline = "Every deploy watched, staged, and reversible",
  subline = "Relay wires health checks and canary traffic into your existing CI. Bad releases roll themselves back before the first page goes out.",
  primaryCta = { label: "Start deploying free", href: "/signup" },
  secondaryCta = { label: "Book a demo", href: "/demo" },
  trustLine = "No credit card required · Free for teams up to 5",
  screenshotSrc,
  screenshotAlt = "Relay release timeline showing a staged rollout across three regions with live error-rate graphs",
  children,
  className,
}: HeroSplitScreenshotProps) {
  return (
    <section className={cn("pt-32 pb-24 md:pt-40", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-[39px] leading-[1.05] font-bold tracking-tight text-foreground md:text-[49px]">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {subline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={secondaryCta.href}>
                  {secondaryCta.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
            {trustLine ? (
              <p className="mt-5 text-sm text-muted-foreground">{trustLine}</p>
            ) : null}
          </div>

          {/* Dark browser-chrome frame for the product screenshot */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 border-b border-border px-4 py-3"
            >
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
            </div>
            {children ??
              (screenshotSrc ? (
                <img
                  src={screenshotSrc}
                  alt={screenshotAlt}
                  className="block w-full"
                />
              ) : (
                <div
                  role="img"
                  aria-label={screenshotAlt}
                  className="aspect-[4/3] w-full bg-background [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
