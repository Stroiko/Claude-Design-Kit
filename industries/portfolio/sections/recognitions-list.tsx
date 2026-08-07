/**
 * recognitions-list.tsx
 * USE WHEN: Awards and press deserve their own quiet index — thin-ruled rows of year,
 *           award or publication, and the project it honored. Factual, no logos, no badges.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — buyers want proof tied to outcomes (stats,
 *           testimonials, logo walls), not a typeset honors ledger from the print world.
 * PAIRS WITH: about-block.tsx, clients-line.tsx, experience-list.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface RecognitionItem {
  year: string
  /** The award body or publication, plus what happened: "Type Directors Club — winner". */
  honor: string
  /** The project recognized. */
  project: string
}

export interface RecognitionsListProps {
  label?: string
  items?: RecognitionItem[]
  className?: string
}

const defaultItems: RecognitionItem[] = [
  { year: "2025", honor: "Type Directors Club, Typeface Design — winner", project: "Cardencha" },
  { year: "2024", honor: "Tipos Latinos Biennial — selected", project: "Cardencha" },
  { year: "2024", honor: "Brand New — reviewed", project: "Fonda Nube" },
  { year: "2024", honor: "It's Nice That — feature", project: "Fonda Nube" },
  { year: "2023", honor: "Latin American Design Awards — silver", project: "Ruido Blanco" },
  { year: "2022", honor: "Tipos Latinos Biennial — selected", project: "La Cigarra lettering" },
]

export function RecognitionsList({
  label = "RECOGNITIONS 2022–2025",
  items = defaultItems,
  className,
}: RecognitionsListProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li
              key={`${item.year}-${item.honor}`}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-1 py-4 text-sm md:grid-cols-[3rem_1fr_minmax(0,14rem)]"
            >
              <span className="text-muted-foreground tabular-nums">{item.year}</span>
              <span className="font-medium text-foreground">{item.honor}</span>
              <span className="col-start-2 text-muted-foreground md:col-start-3">
                {item.project}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
