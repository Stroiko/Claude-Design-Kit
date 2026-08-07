/**
 * hero-manifesto.tsx
 * USE WHEN: The agency landing page opener — a point-of-view statement, not a service list.
 *           Headline runs two-thirds wide with the supporting copy offset right.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or saas (its hero is a dark centered product frame; this is bone-light opinion).
 * PAIRS WITH: client-ticker.tsx, work-showcase.tsx, contact-cta.tsx
 * DEPS: /primitives/button, /effects/text-animate, /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size (Syne = 700/800 at 28px+), not a font class.
 *       This section spends one of the page's two allowed effects (text-animate).
 */
import { TextAnimate } from "@/effects/text-animate"
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface HeroManifestoProps {
  /** Small cobalt line above the statement. */
  eyebrow?: string
  /** The point of view. Keep it to one sentence someone could repeat at a bar. */
  headline?: string
  supporting?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Set false to render the headline statically — e.g. when the ticker already uses the page's motion budget elsewhere. */
  animate?: boolean
  className?: string
}

export function HeroManifesto({
  eyebrow = "Loud Neighbor — Brand & campaign studio, Portland OR",
  headline = "Brands that pick fights win them.",
  supporting = "Fourteen people making identities, campaigns, and film for challengers who are done being polite about it. Since 2017 the loudest work in the room has usually been ours.",
  primaryCta = { label: "Start a project", href: "/contact" },
  secondaryCta = { label: "See the work", href: "/work" },
  animate = true,
  className,
}: HeroManifestoProps) {
  const headlineClasses =
    "max-w-3xl font-sans text-[50px] leading-none font-extrabold tracking-tight text-foreground md:text-[67px]"

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>

        {animate ? (
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            duration={0.8}
            once
            startOnView={false}
            className={headlineClasses}
          >
            {headline}
          </TextAnimate>
        ) : (
          <h1 className={headlineClasses}>{headline}</h1>
        )}

        {/* Deliberate asymmetry: copy and CTAs sit in the right two-thirds, off the headline's axis. */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 md:col-start-2">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {supporting}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <a
                href={secondaryCta.href}
                className="font-medium text-foreground underline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
