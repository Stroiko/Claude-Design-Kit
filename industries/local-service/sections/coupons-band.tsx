/**
 * coupons-band.tsx
 * USE WHEN: Two honest offers on dashed-border cards — the print-ad coupon, done plainly.
 *           Each offer carries a plain terms line. No countdowns, no urgency theatrics,
 *           no "limited time" unless it literally is.
 * INDUSTRY FIT: local-service. AVOID FOR: saas or portfolio — coupons read as a neighborhood
 *           trade's mailer; software discounts belong on the pricing page, studios don't discount.
 * PAIRS WITH: services-grid.tsx, quote-form.tsx, financing-band.tsx
 * DEPS: /primitives (none — plain dashed-border markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface CouponOffer {
  /** The offer itself, stated as the headline ("$25 off first service call"). */
  offer: string
  /** Plain terms, one line ("One per household. Mention when booking."). */
  terms: string
}

export interface CouponsBandProps {
  eyebrow?: string
  heading?: string
  /** Two offers reads honest; a wall of coupons reads desperate. */
  offers?: CouponOffer[]
  className?: string
}

const defaultOffers: CouponOffer[] = [
  {
    offer: "$25 off your first service call",
    terms: "One per household. Mention when booking.",
  },
  {
    offer: "Free camera inspection with any drain cleaning",
    terms: "Includes the recording. No obligation on the findings.",
  },
]

export function CouponsBand({
  eyebrow = "Offers",
  heading = "Two ways to save",
  offers = defaultOffers,
  className,
}: CouponsBandProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {offers.map((coupon) => (
            <div
              key={coupon.offer}
              className="rounded-lg border-2 border-dashed bg-card p-6 md:p-8"
            >
              <p className="text-[21px] leading-tight font-bold text-foreground">
                {coupon.offer}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {coupon.terms}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
