/**
 * cta-banner.tsx
 * USE WHEN: The final ask should stay left-aligned — a full-width bordered banner with heading
 *           and support line on the left, a button pair on the right, and a dot-grid corner.
 *           The alternative to cta-simple.tsx when the page already had its centered moment.
 * INDUSTRY FIT: saas. AVOID FOR: portfolio sites — a hard conversion banner reads as salesy
 *           where the work itself should close the page.
 * PAIRS WITH: cta-simple.tsx, pricing-tiers.tsx, footer sections
 * DEPS: /primitives/button
 */
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface CtaBannerProps {
  heading?: string
  supportText?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function CtaBanner({
  heading = "Put your next release on rails",
  supportText = "Connect a repo and ship your first canary before stand-up. Free for teams up to five.",
  primaryCta = { label: "Start deploying free", href: "/signup" },
  secondaryCta = { label: "Book a demo", href: "/demo" },
  className,
}: CtaBannerProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card px-8 py-12 md:px-14 md:py-16">
          {/* Dot-grid texture pinned to the top-right corner */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_90%_at_100%_0%,black,transparent)]"
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[31px] leading-tight font-bold tracking-tight text-foreground md:text-[39px]">
                {heading}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {supportText}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={secondaryCta.href}>
                  {secondaryCta.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
