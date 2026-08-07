/**
 * service-area.tsx
 * USE WHEN: Naming the actual neighborhoods and towns you serve — the strongest local-SEO
 *           and trust signal a service site has. Map slot on the right, plain list on the left.
 * INDUSTRY FIT: local-service. AVOID FOR: saas or e-commerce — software has no service radius;
 *           listing towns only makes sense when a truck has to drive there.
 * PAIRS WITH: how-we-work.tsx, reviews-local.tsx, quote-form.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface ServiceAreaProps {
  eyebrow?: string
  heading?: string
  /** Neighborhoods and towns, rendered as plain comma-separated text. 8–10 reads honest. */
  areas?: string[]
  /** A factual response-time line, not a promise you can't keep. */
  responseLine?: string
  /** Rendered as "Not sure? Call {display}" — `href` must be a tel: link. */
  phone?: { display: string; href: string }
  /** Static map image showing the coverage area. Empty renders a bg-accent slot. */
  mapSrc?: string
  mapAlt?: string
  className?: string
}

const defaultAreas = [
  "Proctor District",
  "North End",
  "Stadium District",
  "Old Town",
  "South Tacoma",
  "Ruston",
  "Fircrest",
  "University Place",
  "Browns Point",
  "Lakewood",
]

export function ServiceArea({
  eyebrow = "Service area",
  heading = "Tacoma and the neighborhoods around it",
  areas = defaultAreas,
  responseLine = "Most calls inside this area get a plumber the same day — often within the hour for emergencies.",
  phone = { display: "(253) 555-0142", href: "tel:+12535550142" },
  mapSrc,
  mapAlt = "Service area map",
  className,
}: ServiceAreaProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
              {heading}
            </h2>

            <p className="mt-6 font-semibold text-foreground">We cover:</p>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {areas.join(", ")}
            </p>

            <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
              {responseLine}
            </p>

            <p className="mt-6 text-foreground">
              Not sure if we reach you?{" "}
              <a
                href={phone.href}
                className="font-semibold underline underline-offset-4 transition-colors duration-150 hover:text-muted-foreground"
              >
                Call <span className="tabular-nums">{phone.display}</span>
              </a>{" "}
              and ask.
            </p>
          </div>

          {mapSrc ? (
            <img
              src={mapSrc}
              alt={mapAlt}
              className="aspect-[4/3] w-full rounded-lg border object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={mapAlt}
              className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border bg-accent"
            >
              <span className="text-sm text-muted-foreground">
                Service area map
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
