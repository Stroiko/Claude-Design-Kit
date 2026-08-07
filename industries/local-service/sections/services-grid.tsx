/**
 * services-grid.tsx
 * USE WHEN: The "what we actually do" section — six services on bordered cards, each with an
 *           honest starting price where one exists. This industry earns visible card borders.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — priced service tiles read as a trade's rate
 *           card; software features belong in bento or feature sections, not a price list.
 * PAIRS WITH: trust-band.tsx, how-we-work.tsx, quote-form.tsx
 * DEPS: /primitives (none — plain rounded-lg border bg-card markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import {
  Droplets,
  Flame,
  ShowerHead,
  Siren,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export interface ServiceItem {
  icon: LucideIcon
  name: string
  /** One plain line about the service. No adjectives doing the work of facts. */
  description: string
  /** Honest starting price ("From $99"). Omit when a flat quote needs a site visit. */
  price?: string
  /** Optional: makes the whole card a link (e.g. a service detail page or #quote). */
  href?: string
}

export interface ServicesGridProps {
  eyebrow?: string
  heading?: string
  services?: ServiceItem[]
  className?: string
}

const defaultServices: ServiceItem[] = [
  {
    icon: Droplets,
    name: "Drain cleaning",
    description: "Slow or blocked drains cleared, usually in one visit.",
    price: "From $99",
  },
  {
    icon: Flame,
    name: "Water heaters",
    description: "Repairs and same-day replacements, tank or tankless.",
    price: "From $1,450",
  },
  {
    icon: Wrench,
    name: "Leak & pipe repair",
    description: "We find the leak and fix the pipe, not just the symptom.",
    price: "From $165",
  },
  {
    icon: ShowerHead,
    name: "Fixture installation",
    description: "Faucets, toilets, and shower valves, installed to code.",
    price: "From $140",
  },
  {
    icon: Waves,
    name: "Sewer line service",
    description: "Camera inspection first, then a flat quote for the fix.",
    price: "Quoted after inspection",
  },
  {
    icon: Siren,
    name: "Emergency plumbing",
    description: "Burst pipes and backups — nights and weekends included.",
    price: "From $185",
  },
]

export function ServicesGrid({
  eyebrow = "Services",
  heading = "What we fix",
  services = defaultServices,
  className,
}: ServicesGridProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const body = (
              <>
                <service.icon
                  aria-hidden="true"
                  className="size-6 text-foreground"
                />
                <h3 className="mt-4 font-bold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {service.price ? (
                  <p className="mt-4 text-sm font-semibold text-foreground tabular-nums">
                    {service.price}
                  </p>
                ) : null}
              </>
            )
            const cardClasses =
              "flex flex-col rounded-lg border bg-card p-5 md:p-6"

            return service.href ? (
              <a
                key={service.name}
                href={service.href}
                className={cn(
                  cardClasses,
                  "transition-colors duration-150 hover:border-foreground/25 focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
                )}
              >
                {body}
              </a>
            ) : (
              <div key={service.name} className={cardClasses}>
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
