/**
 * capabilities-list.tsx
 * USE WHEN: Naming what the studio actually does — five numbered rows with oversized muted
 *           numbers and one plain line each. An index, not a card grid.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or saas (products list features with proof, not craft disciplines).
 * PAIRS WITH: work-showcase.tsx, process-steps.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — capability names are Syne 700 at 28px.
 */
import { cn } from "@/lib/utils"

export interface CapabilityItem {
  title: string
  /** One plain sentence. No acronym soup, no "strategy meets creativity". */
  description: string
}

export interface CapabilitiesListProps {
  eyebrow?: string
  heading?: string
  items?: CapabilityItem[]
  className?: string
}

export function CapabilitiesList({
  eyebrow = "Capabilities",
  heading = "Five things, done all the way",
  items = [
    {
      title: "Brand identity",
      description: "Logos, systems, and the guts to apply them without watering anything down.",
    },
    {
      title: "Campaigns",
      description: "Launches and seasonal pushes people quote back at the bar.",
    },
    {
      title: "Motion & film",
      description: "Thirty seconds built to earn the replay, not survive the skip button.",
    },
    {
      title: "Packaging",
      description: "Shelf presence measured in pickups per aisle, not mood-board likes.",
    },
    {
      title: "Naming & voice",
      description: "Names that clear trademark and still start conversations.",
    },
  ],
  className,
}: CapabilitiesListProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {heading}
        </h2>

        <ol className="mt-16 divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-8 md:grid-cols-12 md:gap-x-6"
            >
              <span
                aria-hidden="true"
                className="font-sans text-[38px] leading-none font-bold tracking-tight text-muted-foreground md:col-span-2 md:text-[50px]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-[28px] leading-tight font-bold tracking-tight text-foreground md:col-span-4">
                {item.title}
              </h3>
              <p className="col-span-2 mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:col-span-6 md:mt-0">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
