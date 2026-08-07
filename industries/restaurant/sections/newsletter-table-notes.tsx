/**
 * newsletter-table-notes.tsx
 * USE WHEN: A restaurant-voiced email capture near the foot of the page — "table notes",
 *           a monthly letter from the kitchen, wrapped in a cream card between thin rules.
 *           Low pressure: one heading, one line on what the letter contains, the inline form.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — engineering changelogs use the darker, centered
 *           newsletter-band in /industries/saas; this one is serif, cream, and reads like
 *           correspondence, not a subscription funnel.
 * PAIRS WITH: faq-visit.tsx, hours-location.tsx, reservation-form.tsx
 * DEPS: /components/forms/newsletter-signup
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"

export interface NewsletterTableNotesProps {
  eyebrow?: string
  heading?: string
  /** One or two sentences on what the letter holds and how often it arrives. */
  supportText?: string
  /** Called with the submitted email. Passed through to the form. */
  onSubscribe?: (email: string) => void | Promise<void>
  placeholder?: string
  buttonLabel?: string
  className?: string
}

export function NewsletterTableNotes({
  eyebrow = "table notes",
  heading = "A monthly letter from the kitchen",
  supportText = "Once a month, Marta writes about what the market brought in, what the fire is cooking, and which Mondays are still open for the long table. No offers, no noise — just notes.",
  onSubscribe,
  placeholder = "your@email.com",
  buttonLabel = "Sign up",
  className,
}: NewsletterTableNotesProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl border-y border-border bg-card px-6 py-12 md:px-12 md:py-14">
          <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-card-foreground md:text-[40px]">
            {heading}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.7] text-muted-foreground">
            {supportText}
          </p>
          <NewsletterSignup
            className="mt-8"
            onSubscribe={onSubscribe}
            placeholder={placeholder}
            buttonLabel={buttonLabel}
            successMessage="Thank you — the next letter will find you."
          />
          <p className="mt-4 text-sm italic text-muted-foreground">
            one letter a month, and never anything else
          </p>
        </div>
      </div>
    </section>
  )
}
