/**
 * gift-cards.tsx
 * USE WHEN: A small, quiet gift-card offer between larger sections — eyebrow, one heading,
 *           a single line of copy, and one outline button, framed by thin rules. Deliberately
 *           the smallest section on the page; it should read like a note, not a promotion.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — software gifts credits or trials through
 *           pricing, not a dinner-table gift card; this is a hospitality gesture.
 * PAIRS WITH: press-quotes.tsx, faq-visit.tsx, hours-location.tsx
 * DEPS: /primitives/button
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface GiftCardsProps {
  eyebrow?: string
  heading?: string
  /** One sentence. Resist the urge to add a second. */
  line?: string
  cta?: { label: string; href: string }
  className?: string
}

export function GiftCards({
  eyebrow = "give a dinner",
  heading = "An evening by the fire, on you",
  line = "Gift cards in any amount, good for dinner, wine, and Monday private tables — sent by post in a letterpress envelope or by email the same day.",
  cta = { label: "Purchase a gift card", href: "/gift-cards" },
  className,
}: GiftCardsProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl border-y border-border py-14 text-center md:py-16">
          <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[55ch] text-[17px] leading-[1.7] text-muted-foreground">
            {line}
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
