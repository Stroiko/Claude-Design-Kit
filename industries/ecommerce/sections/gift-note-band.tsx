/**
 * gift-note-band.tsx
 * USE WHEN: A quiet, bordered pause between merchandising sections — one sentence about how
 *           orders arrive, pointing gifters to the right page. No tiles, no prices.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — packaging promises have no software equivalent;
 *           restaurant — gifting bands read retail, not hospitality.
 * PAIRS WITH: values-band.tsx, lookbook-split.tsx, faq-shipping.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 *       Deliberately no green here — DIRECTION.md reserves it for buy actions.
 */
import { cn } from "@/lib/utils"

export interface GiftNoteBandProps {
  heading?: string
  /** One supporting sentence. Keep it factual, no urgency. */
  supportingLine?: string
  /** Underlined text link — quiet, never a button. */
  link?: { label: string; href: string }
  className?: string
}

export function GiftNoteBand({
  heading = "Every order ships with a linen care card and a handwritten note",
  supportingLine = "Add gift wrap at checkout and we'll pack it in unbleached paper and cotton twine, with no prices anywhere in the box.",
  link = { label: "Gift options", href: "/gifting" },
  className,
}: GiftNoteBandProps) {
  return (
    <section className={cn("border-y border-border py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[25px] leading-[1.15] font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {supportingLine}
          </p>
          <a
            href={link.href}
            className="mt-6 inline-block text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
          >
            {link.label}
          </a>
        </div>
      </div>
    </section>
  )
}
