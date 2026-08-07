/**
 * contact-cta.tsx
 * USE WHEN: The page closer — one big Syne question, a cobalt button, an underlined email,
 *           and an honest response-time line. Statement left, actions offset right.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or saas (products close on free trials and docs, not "email the studio").
 * PAIRS WITH: hero-manifesto.tsx, journal-teaser.tsx, /components/forms/contact-form.tsx
 * DEPS: /primitives/button, /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the statement is Syne 800 at 50–67px.
 */
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface ContactCtaProps {
  statement?: string
  primaryCta?: { label: string; href: string }
  email?: string
  /** One honest line about response time — a promise, not a platitude. */
  responseNote?: string
  className?: string
}

export function ContactCta({
  statement = "Got something worth making loud?",
  primaryCta = { label: "Start a project", href: "/contact" },
  email = "hello@loudneighbor.co",
  responseNote = "We answer everything within two working days — usually the same afternoon.",
  className,
}: ContactCtaProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-3xl font-sans text-[50px] leading-none font-extrabold tracking-tight text-foreground md:text-[67px]">
          {statement}
        </h2>

        {/* Deliberate asymmetry: actions sit in the right two-thirds, off the statement's axis. */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 md:col-start-2">
            <div className="flex flex-wrap items-center gap-6">
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <a
                href={`mailto:${email}`}
                className="font-medium text-foreground underline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
              >
                {email}
              </a>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {responseNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
