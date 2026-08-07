/**
 * hero-centered.tsx
 * USE WHEN: The landing page opener for a product that sells on one sharp promise plus a
 *           product screenshot. Centered layout; the only centered section besides the final CTA.
 * INDUSTRY FIT: saas. AVOID FOR: local-services or restaurant sites — centered dark hero with a
 *           dashboard frame reads as developer tooling, not a neighborhood business.
 * PAIRS WITH: logos-marquee.tsx, features-bento.tsx, cta-simple.tsx
 * DEPS: /primitives/button, /effects/animated-shiny-text
 */
import { type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"
import { AnimatedShinyText } from "@/effects/animated-shiny-text"

export interface HeroCenteredProps {
  /** Optional announcement pill above the headline. Omit to hide. */
  announcement?: {
    text: string
    /** Usually the changelog entry the announcement refers to. */
    href: string
  }
  headline?: string
  subline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Product screenshot shown inside the dark browser frame. */
  screenshotSrc?: string
  screenshotAlt?: string
  /** Custom content for the frame slot (e.g. a live demo). Overrides screenshotSrc. */
  children?: ReactNode
  className?: string
}

export function HeroCentered({
  announcement = {
    text: "Introducing rollback windows — restore any deploy in one click",
    href: "/changelog",
  },
  headline = "Ship releases your on-call team can sleep through",
  subline = "Relay stages every deploy behind health checks, canaries, and automatic rollback — so pushing to production on a Friday stops being a personality trait.",
  primaryCta = { label: "Start deploying free", href: "/signup" },
  secondaryCta = { label: "Read the docs", href: "/docs" },
  screenshotSrc,
  screenshotAlt = "Relay deploy dashboard showing a canary release at 25% traffic with all health checks passing",
  children,
  className,
}: HeroCenteredProps) {
  return (
    <section className={cn("pt-32 pb-24 md:pt-40", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {announcement ? (
            <a
              href={announcement.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm transition-colors duration-200 hover:border-foreground/20"
            >
              <AnimatedShinyText className="mx-0 max-w-none">
                {announcement.text}
              </AnimatedShinyText>
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          ) : null}

          <h1 className="mt-8 max-w-4xl text-[39px] leading-[1.05] font-bold tracking-tight text-foreground md:text-[61px]">
            {headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </div>

        {/* Dark browser-chrome frame for the product screenshot */}
        <div className="mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
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
                className="aspect-[16/9] w-full bg-background [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
              />
            ))}
        </div>
      </div>
    </section>
  )
}
