/**
 * newsletter-band.tsx
 * USE WHEN: A low-pressure capture between sections — a bordered band with one heading, one
 *           supporting line, and the inline email form. For changelogs and engineering notes,
 *           not gated content.
 * INDUSTRY FIT: saas. AVOID FOR: e-commerce — shoppers expect discount-led capture with
 *           incentives, not an engineering newsletter pitch.
 * PAIRS WITH: cta-simple.tsx, cta-banner.tsx, footer sections
 * DEPS: /components/forms/newsletter-signup
 */
import { cn } from "@/lib/utils"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"

export interface NewsletterBandProps {
  heading?: string
  /** One line on what subscribers actually get, and how often. */
  supportText?: string
  /** Called with the submitted email. Passed through to the form. */
  onSubscribe?: (email: string) => void | Promise<void>
  placeholder?: string
  buttonLabel?: string
  className?: string
}

export function NewsletterBand({
  heading = "Ship notes, monthly",
  supportText = "One email a month on release engineering — what we shipped, what broke, and what we learned. No product pitches.",
  onSubscribe,
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  className,
}: NewsletterBandProps) {
  return (
    <section className={cn("border-y border-border py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-[25px] leading-tight font-semibold tracking-tight text-foreground md:text-[31px]">
            {heading}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {supportText}
          </p>
          <NewsletterSignup
            className="mt-8 justify-center"
            onSubscribe={onSubscribe}
            placeholder={placeholder}
            buttonLabel={buttonLabel}
          />
        </div>
      </div>
    </section>
  )
}
