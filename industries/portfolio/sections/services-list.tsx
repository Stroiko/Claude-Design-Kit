/**
 * services-list.tsx
 * USE WHEN: Capabilities as a short numbered ledger — 01–04 rows, service name in bold, one
 *           factual line each. No cards, no icons, no pricing.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — numbered text rows read as a studio's service
 *           menu; software capabilities need feature sections with product evidence.
 * PAIRS WITH: about-block.tsx, contact-cta.tsx, work-index.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ServiceItem {
  name: string
  /** One factual sentence — what the engagement actually produces. */
  detail: string
}

export interface ServicesListProps {
  label?: string
  items?: ServiceItem[]
  className?: string
}

const defaultItems: ServiceItem[] = [
  {
    name: "Identity systems",
    detail: "Logotype, typography, and usage rules built to survive whoever inherits them.",
  },
  {
    name: "Custom typefaces",
    detail: "Proprietary display and text faces, from brief to hinted production files.",
  },
  {
    name: "Art direction",
    detail: "Campaign and editorial direction for brands I've built, print-first.",
  },
  {
    name: "Design engineering",
    detail: "Variable-font tooling, specimen sites, and type testing pages I code myself.",
  },
]

export function ServicesList({
  label = "CAPABILITIES",
  items = defaultItems,
  className,
}: ServicesListProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>

        <ol className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <li
              key={item.name}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 py-6 md:grid-cols-[3rem_minmax(0,20rem)_1fr]"
            >
              <span
                aria-hidden="true"
                className="text-sm text-muted-foreground tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[23px] leading-[1.2] font-bold tracking-tight text-foreground">
                {item.name}
              </h3>
              <p className="col-start-2 mt-1 max-w-prose text-base leading-relaxed text-muted-foreground md:col-start-3 md:mt-0">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
