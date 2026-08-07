/**
 * awards-line.tsx
 * USE WHEN: Recognition worth stating once — a quiet divide-y index of juried awards
 *           (tabular year, award, project). Plain text only: no badges, no laurel logos,
 *           no trust-spam strip. Reads like a colophon, not a trophy case.
 * INDUSTRY FIT: agency. AVOID FOR: saas (buyers there want uptime and customer logos-as-text,
 *           not design juries) or local-services (a homeowner has never heard of the ADC).
 * PAIRS WITH: case-study-feature.tsx, journal-teaser.tsx, culture-band.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the heading is Syne 700 at 28px; rows stay
 *       Manrope. Cobalt appears on the eyebrow only. No effects: the page's motion budget
 *       is spent by the hero and the client ticker.
 */
import { cn } from "@/lib/utils"

export interface AwardEntry {
  /** Display year, kept tabular, e.g. "2026". */
  year: string
  /** Award body and category as one plain line — no acronym without the name. */
  award: string
  /** The client project that earned it. Keep names identical to the work showcase. */
  project: string
}

export interface AwardsLineProps {
  eyebrow?: string
  heading?: string
  entries?: AwardEntry[]
  className?: string
}

export function AwardsLine({
  eyebrow = "Recognition",
  heading = "The work gets around",
  entries = [
    {
      year: "2026",
      award: "Type Directors Club — Certificate of Typographic Excellence",
      project: "Marrow Coffee packaging",
    },
    {
      year: "2026",
      award: "ADC Annual Awards — Merit, Motion & Film Craft",
      project: "Alder & Ash launch film",
    },
    {
      year: "2025",
      award: "Communication Arts — Design Annual",
      project: "Pinetop Provisions packaging",
    },
    {
      year: "2025",
      award: "The One Show — Merit, Integrated Campaign",
      project: "Ranger Optics launch",
    },
    {
      year: "2025",
      award: "Brand New — Best Reviewed",
      project: "Marrow Coffee rebrand",
    },
  ],
  className,
}: AwardsLineProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-[28px] leading-tight font-bold tracking-tight text-foreground">
          {heading}
        </h2>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {entries.map((entry) => (
            <li
              key={`${entry.year}-${entry.award}`}
              className="grid gap-x-6 gap-y-1 py-5 md:grid-cols-12 md:items-baseline"
            >
              <span className="text-base text-muted-foreground tabular-nums md:col-span-1">
                {entry.year}
              </span>
              <span className="text-base font-medium text-foreground md:col-span-7">
                {entry.award}
              </span>
              <span className="text-base text-muted-foreground md:col-span-4 md:text-right">
                {entry.project}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
