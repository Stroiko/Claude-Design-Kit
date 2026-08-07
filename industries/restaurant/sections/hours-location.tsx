/**
 * hours-location.tsx
 * USE WHEN: The practical section near the foot of the page — opening hours as a definition
 *           list beside the address, a map photo, and a directions link, separated by thin rules.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — software has no opening hours; SaaS closes with
 *           a CTA band, not a street address.
 * PAIRS WITH: reservation-form.tsx, menu-list.tsx, private-events.tsx
 * DEPS: /lib/utils only
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"

export interface HoursEntry {
  /** Day or day range, e.g. "Tuesday – Thursday". */
  days: string
  /** Time range with tabular figures, e.g. "5:00 – 10:00 pm", or "Closed". */
  time: string
}

export interface HoursLocationProps {
  eyebrow?: string
  heading?: string
  hours?: HoursEntry[]
  /** Street address lines, rendered in order. */
  addressLines?: string[]
  /** Short note under the address — parking, transit, the door to look for. */
  locationNote?: string
  /** Map or storefront photo. Omitted: warm placeholder block. */
  mapSrc?: string
  mapAlt?: string
  directionsHref?: string
  className?: string
}

export function HoursLocation({
  eyebrow = "visit us",
  heading = "Hours & location",
  hours = [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday – Thursday", time: "5:00 – 10:00 pm" },
    { days: "Friday – Saturday", time: "5:00 – 11:00 pm" },
    { days: "Sunday", time: "4:00 – 9:00 pm" },
  ],
  addressLines = ["Casa Olea", "2841 18th Street", "San Francisco, CA 94110"],
  locationNote = "On the corner of 18th and Florida — look for the olive branch over the green door. Walk-ins keep half the room every night.",
  mapSrc,
  mapAlt = "Map showing Casa Olea on the corner of 18th and Florida Streets in the Mission",
  directionsHref = "https://maps.google.com/?q=2841+18th+Street+San+Francisco",
  className,
}: HoursLocationProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-16">
          {/* Hours as a definition list */}
          <div>
            <h3 className="font-serif text-[23px] font-medium text-foreground">
              Hours
            </h3>
            <dl className="mt-5">
              {hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex items-baseline justify-between gap-6 border-t border-border py-3.5 last:border-b"
                >
                  <dt className="text-[17px] text-foreground">{entry.days}</dt>
                  <dd className="text-[17px] tabular-nums text-muted-foreground">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Address, map photo, directions */}
          <div>
            <h3 className="font-serif text-[23px] font-medium text-foreground">
              Location
            </h3>
            <address className="mt-5 border-t border-border pt-5 text-[17px] leading-[1.7] not-italic text-foreground">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            {mapSrc ? (
              <img
                src={mapSrc}
                alt={mapAlt}
                className="mt-6 block aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={mapAlt}
                className="mt-6 aspect-[4/3] w-full bg-secondary"
              />
            )}

            {locationNote ? (
              <p className="mt-4 text-sm italic text-muted-foreground">
                {locationNote}
              </p>
            ) : null}

            <a
              href={directionsHref}
              className="mt-5 inline-block text-[17px] text-foreground underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
