/**
 * cta-simple.tsx
 * USE WHEN: The final section before the footer — one centered ask, one button, a quiet
 *           dot-grid backdrop. The last centered moment the SaaS direction allows.
 * INDUSTRY FIT: saas. AVOID FOR: portfolio sites — a hard conversion ask reads as salesy
 *           where the work itself should close the page.
 * PAIRS WITH: pricing-tiers.tsx, hero-centered.tsx, footer sections
 * DEPS: /primitives/button
 */
import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface CtaSimpleProps {
  heading?: string
  subtext?: string
  cta?: { label: string; href: string }
  className?: string
}

export function CtaSimple({
  heading = "Your next deploy could be the boring kind",
  subtext = "Connect a repo, ship a canary, and see a rollback you didn't have to run. Free for teams up to five.",
  cta = { label: "Start deploying free", href: "/signup" },
  className,
}: CtaSimpleProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border py-24 md:py-32",
        className
      )}
    >
      {/* Dot-grid backdrop, faded toward the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[39px] leading-[1.05] font-bold tracking-tight text-foreground md:text-[49px]">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {subtext}
          </p>
          <Button asChild size="lg" className="mt-10">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
