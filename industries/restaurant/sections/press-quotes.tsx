/**
 * press-quotes.tsx
 * USE WHEN: Two or three short review pull-quotes from press, typeset large and italic between
 *           thin rules — social proof as typography, not widgets. Never star ratings.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — editorial pull-quotes belong to food journalism;
 *           SaaS proof is customer logos and quantified testimonials.
 * PAIRS WITH: gallery-grid.tsx, story-intro.tsx, reservation-form.tsx
 * DEPS: /lib/utils only
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"

export interface PressQuote {
  /** One sentence, ideally under 25 words — it renders at display size. */
  text: string
  /** Publication and year, e.g. "Eater SF, 2025". Rendered as "— Eater SF, 2025". */
  source: string
}

export interface PressQuotesProps {
  eyebrow?: string
  quotes?: PressQuote[]
  className?: string
}

export function PressQuotes({
  eyebrow = "in the press",
  quotes = [
    {
      text: "The lamb shoulder alone justifies the wait — Casa Olea cooks with the confidence of a place three times its age.",
      source: "Eater SF, 2025",
    },
    {
      text: "The Mission's warmest room: all firelight, olive oil, and the smell of bread coming out of the hearth.",
      source: "San Francisco Chronicle, 2024",
    },
    {
      text: "A neighborhood bistro that whispers instead of shouts.",
      source: "Bon Appétit, 2025",
    },
  ],
  className,
}: PressQuotesProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm italic lowercase text-primary">{eyebrow}</p>

          <div className="mt-6 divide-y divide-border border-y border-border">
            {quotes.map((quote) => (
              <figure key={quote.source} className="py-12 md:py-14">
                <blockquote>
                  <p className="font-serif text-[23px] leading-[1.35] font-medium italic text-foreground md:text-[30px]">
                    <span aria-hidden="true">&ldquo;</span>
                    {quote.text}
                    <span aria-hidden="true">&rdquo;</span>
                  </p>
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  &mdash; {quote.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
