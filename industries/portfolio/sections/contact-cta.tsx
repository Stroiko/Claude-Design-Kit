/**
 * contact-cta.tsx
 * USE WHEN: The closing ask — one display-scale line, the email as a huge underlined link
 *           that inverts on hover, and a small location/timezone line. No form, no buttons.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a bare mailto at display size skips the funnel;
 *           products need a signup CTA (cta-simple), not a personal email.
 * PAIRS WITH: hero-statement.tsx, services-list.tsx, footer-line.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ContactCtaProps {
  label?: string
  /** The display-scale statement. */
  statement?: string
  email?: string
  /** Small factual line under the email — location, timezone, response habit. */
  secondary?: string
  className?: string
}

export function ContactCta({
  label = "CONTACT",
  statement = "Let's make something worth keeping.",
  email = "hello@annareyes.studio",
  secondary = "Mexico City · UTC−6 · I reply within two working days.",
  className,
}: ContactCtaProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>

        <h2 className="mt-6 max-w-5xl text-[45px] leading-[0.95] font-extrabold tracking-tight text-foreground sm:text-[64px] lg:text-[90px]">
          {statement}
        </h2>

        <p className="mt-10">
          <a
            href={`mailto:${email}`}
            className="inline-block text-[23px] font-bold tracking-tight text-foreground underline decoration-2 underline-offset-8 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none md:text-[32px]"
          >
            {email}
          </a>
        </p>

        <p className="mt-6 text-sm text-muted-foreground tabular-nums">
          {secondary}
        </p>
      </div>
    </section>
  )
}
