/**
 * private-events.tsx
 * USE WHEN: Offering the room for private dinners and events — a photo-and-text split with a
 *           capacity facts line and a quiet outline "Enquire" button. Sits late in the page,
 *           after the menu and gallery have done the persuading.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — private dining is a hospitality offer; the SaaS
 *           equivalent is an enterprise contact section with a different vocabulary entirely.
 * PAIRS WITH: gallery-grid.tsx, hours-location.tsx, reservation-form.tsx
 * DEPS: /primitives/button
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface PrivateEventsProps {
  eyebrow?: string
  heading?: string
  /** Two or three sentences on what a private evening looks like. */
  copy?: string
  /** Capacity facts, separated by middle dots. */
  factsLine?: string
  /** Room photo. Omitted: warm placeholder block. */
  imageSrc?: string
  imageAlt?: string
  enquireCta?: { label: string; href: string }
  className?: string
}

export function PrivateEvents({
  eyebrow = "private dining",
  heading = "The whole room, your table",
  copy = "On Mondays the hearth burns for one party only. Marta sets a single long table down the middle of the room and cooks a family-style menu around whatever the market and the fire suggest — lamb shoulder carved at the table, bread from the embers, sherry to finish. We also host smaller gatherings at the back table any night of the week.",
  factsLine = "Seats 24 at the long table · 40 for a standing evening · full buyouts on Mondays",
  imageSrc,
  imageAlt = "One long candlelit table set for a private dinner down the middle of Casa Olea's dining room",
  enquireCta = { label: "Enquire", href: "mailto:events@casaolea.com" },
  className,
}: PrivateEventsProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
          {/* Room photo */}
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="block aspect-[4/5] w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={imageAlt}
              className="aspect-[4/5] w-full bg-secondary"
            />
          )}

          <div>
            <p className="text-sm italic lowercase text-primary">{eyebrow}</p>

            <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
              {heading}
            </h2>

            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-muted-foreground">
              {copy}
            </p>

            <p className="mt-6 border-t border-border pt-5 text-[17px] tabular-nums text-foreground">
              {factsLine}
            </p>

            <div className="mt-8">
              <Button asChild variant="outline" size="lg">
                <a href={enquireCta.href}>{enquireCta.label}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
