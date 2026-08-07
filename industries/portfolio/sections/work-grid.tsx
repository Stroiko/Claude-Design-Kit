/**
 * work-grid.tsx
 * USE WHEN: The body of work shown visually — an asymmetric two-column image grid with small
 *           factual captions. Alternative to work-index.tsx when the work photographs well.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — an art-directed image grid without copy reads
 *           as a gallery; software needs feature framing, not framed pictures.
 * PAIRS WITH: hero-statement.tsx, project-feature.tsx, about-block.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface WorkGridItem {
  name: string
  category: string
  year: string
  href: string
  /** Project image. Omit to render a bg-secondary placeholder block. */
  imageSrc?: string
  imageAlt?: string
  /** Column span on md+: "wide" = 7/12, "narrow" = 5/12, "full" = 12/12. */
  span?: "wide" | "narrow" | "full"
}

export interface WorkGridProps {
  label?: string
  items?: WorkGridItem[]
  className?: string
}

const defaultItems: WorkGridItem[] = [
  {
    name: "Cardencha",
    category: "Display typeface",
    year: "2025",
    href: "/work/cardencha",
    imageAlt: "Cardencha specimen poster set in tight black display letters",
    span: "wide",
  },
  {
    name: "Fonda Nube",
    category: "Restaurant identity",
    year: "2024",
    href: "/work/fonda-nube",
    imageAlt: "Fonda Nube menu and matchbook on a marble counter",
    span: "narrow",
  },
  {
    name: "Editorial Antena",
    category: "Publishing imprint",
    year: "2024",
    href: "/work/editorial-antena",
    imageAlt: "Row of Editorial Antena paperback spines",
    span: "narrow",
  },
  {
    name: "Ruido Blanco",
    category: "Record label",
    year: "2023",
    href: "/work/ruido-blanco",
    imageAlt: "Ruido Blanco twelve-inch sleeve, front and back",
    span: "wide",
  },
  {
    name: "La Cigarra",
    category: "Mezcal brand",
    year: "2022",
    href: "/work/la-cigarra",
    imageAlt: "La Cigarra bottle with letterpress label",
    span: "full",
  },
]

const spanClass: Record<NonNullable<WorkGridItem["span"]>, string> = {
  wide: "md:col-span-7",
  narrow: "md:col-span-5",
  full: "md:col-span-12",
}

export function WorkGrid({
  label = "SELECTED WORK 2021–2026",
  items = defaultItems,
  className,
}: WorkGridProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
          {items.map((item) => (
            <li key={item.name} className={spanClass[item.span ?? "wide"]}>
              <a
                href={item.href}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt ?? `${item.name} — ${item.category}`}
                    className="block aspect-[4/3] w-full object-cover transition-opacity duration-150 group-hover:opacity-75"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={item.imageAlt ?? `${item.name} — ${item.category}`}
                    className="aspect-[4/3] w-full bg-secondary transition-opacity duration-150 group-hover:opacity-75"
                  />
                )}
                <p className="mt-3 text-sm text-foreground">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {" — "}
                    {item.category},{" "}
                    <span className="tabular-nums">{item.year}</span>
                  </span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
