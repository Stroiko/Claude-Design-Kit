/**
 * newsletter-checkout.tsx
 * USE WHEN: The last stop before the footer — a bordered band trading a first-order discount
 *           for an email, centered and compact.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — discounts-for-email is retail language; software
 *           closes with a trial CTA, not 10% off; portfolio — a discount band cheapens an
 *           editorial close.
 * PAIRS WITH: reviews-grid.tsx, footer sections, /components/forms/newsletter-signup
 * DEPS: /components/forms/newsletter-signup, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { cn } from "@/lib/utils"

export interface NewsletterCheckoutProps {
  heading?: string
  supportingLine?: string
  /** Forwarded to NewsletterSignup; called with the submitted email. */
  onSubscribe?: (email: string) => void | Promise<void>
  placeholder?: string
  buttonLabel?: string
  className?: string
}

export function NewsletterCheckout({
  heading = "First order, 10% off",
  supportingLine = "One email a month — new batches, restocks, and workshop notes. Unsubscribe anytime.",
  onSubscribe,
  placeholder = "you@example.com",
  buttonLabel = "Sign up",
  className,
}: NewsletterCheckoutProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-xl rounded-md border border-border px-6 py-12 text-center md:px-12">
          <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {supportingLine}
          </p>
          <NewsletterSignup
            onSubscribe={onSubscribe}
            placeholder={placeholder}
            buttonLabel={buttonLabel}
            className="mx-auto mt-8 justify-center"
          />
        </div>
      </div>
    </section>
  )
}
