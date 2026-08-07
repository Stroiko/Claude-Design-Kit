/**
 * work-index.tsx
 * USE WHEN: The main body of work as a printed-index list — name, client/category, year in
 *           thin-ruled rows. The right choice when the work is better named than pictured.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a bare text index of "projects" reads as a
 *           studio archive; product features need explanation and visuals, not a ledger.
 * PAIRS WITH: hero-statement.tsx, project-feature.tsx, contact-cta.tsx
 * DEPS: lucide-react, /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface WorkIndexItem {
  name: string
  /** Client or category line, e.g. "Restaurant identity" or "Self-initiated". */
  category: string
  year: string
  href: string
}

export interface WorkIndexProps {
  label?: string
  items?: WorkIndexItem[]
  className?: string
}

const defaultItems: WorkIndexItem[] = [
  { name: "Cardencha", category: "Display typeface, retail release", year: "2025", href: "/work/cardencha" },
  { name: "Fonda Nube", category: "Restaurant identity, Roma Norte", year: "2024", href: "/work/fonda-nube" },
  { name: "Editorial Antena", category: "Publishing imprint & covers", year: "2024", href: "/work/editorial-antena" },
  { name: "Ruido Blanco", category: "Record label identity", year: "2023", href: "/work/ruido-blanco" },
  { name: "La Cigarra", category: "Mezcal brand & packaging", year: "2022", href: "/work/la-cigarra" },
  { name: "Grupo Terral", category: "Wayfinding & signage system", year: "2021", href: "/work/grupo-terral" },
]

export function WorkIndex({
  label = "SELECTED WORK 2021–2026",
  items = defaultItems,
  className,
}: WorkIndexProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none md:grid-cols-[1fr_minmax(0,16rem)_4rem_auto] md:items-center"
              >
                <span className="text-[32px] leading-[1.1] font-bold tracking-tight md:text-[45px]">
                  {item.name}
                </span>
                <span className="col-start-1 row-start-2 text-sm text-muted-foreground transition-colors duration-150 group-hover:text-background/70 group-focus-visible:text-background/70 md:col-start-2 md:row-start-1">
                  {item.category}
                </span>
                <span className="col-start-2 row-start-1 text-sm tabular-nums md:col-start-3">
                  {item.year}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="col-start-2 row-start-2 hidden size-5 self-center justify-self-end opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 md:col-start-4 md:row-start-1 md:block"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
