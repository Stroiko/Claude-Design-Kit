/**
 * financing-band.tsx
 * USE WHEN: A short navy band noting that big jobs can be financed — one heading, one factual
 *           line, one underlined link. Informational, not an action: NO amber here, the amber
 *           stays reserved for call/quote/emergency.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — software spreads cost through monthly
 *           pricing already; a financing band only makes sense for four-figure physical jobs.
 * PAIRS WITH: services-grid.tsx, quote-form.tsx, faq-service.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface FinancingBandProps {
  heading?: string
  /** One factual line about the terms. State the number, skip the sales pitch. */
  detail?: string
  /** Underlined navy link — informational, never an amber button. */
  link?: { label: string; href: string }
  className?: string
}

export function FinancingBand({
  heading = "Big job? Spread it out.",
  detail = "Water heaters, repipes, and sewer work qualify for 0% financing for 12 months through our lending partner — approved before the work starts.",
  link = { label: "See financing options", href: "/financing" },
  className,
}: FinancingBandProps) {
  return (
    <section className={cn("border-y bg-secondary py-10 md:py-14", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="text-[21px] leading-tight font-bold text-foreground md:text-[27px]">
              {heading}
            </h2>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {detail}
            </p>
          </div>
          <a
            href={link.href}
            className="shrink-0 font-semibold text-foreground underline underline-offset-4 transition-colors duration-150 hover:text-muted-foreground"
          >
            {link.label}
          </a>
        </div>
      </div>
    </section>
  )
}
