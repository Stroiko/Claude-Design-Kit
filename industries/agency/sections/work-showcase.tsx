/**
 * work-showcase.tsx
 * USE WHEN: The main work grid — five case tiles in an asymmetric layout with one-line
 *           factual results. Each tile is a link; the name takes a cobalt underline on hover.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or ecommerce (these are case tiles with outcomes, not product cards with prices).
 * PAIRS WITH: client-ticker.tsx, case-study-feature.tsx, capabilities-list.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — tile names are Syne 700 via font-bold.
 *       Near-zero radius: image slots stay square-cornered on purpose.
 */
import { cn } from "@/lib/utils"

export interface WorkShowcaseItem {
  /** Campaign or brand name. */
  name: string
  /** One-line factual result, e.g. "Rebrand → 3× shelf pickup". */
  result: string
  href: string
  imageSrc?: string
  imageAlt?: string
}

export interface WorkShowcaseProps {
  eyebrow?: string
  heading?: string
  items?: WorkShowcaseItem[]
  className?: string
}

/** Varying spans + a vertical offset every other tile keep the grid deliberately uneven. */
const TILE_LAYOUT = [
  { span: "md:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "md:mt-16" },
  { span: "md:col-span-5", aspect: "aspect-square", offset: "" },
  { span: "md:col-span-7", aspect: "aspect-[4/3]", offset: "md:mt-16" },
  { span: "md:col-span-8", aspect: "aspect-[16/9]", offset: "" },
  { span: "md:col-span-4", aspect: "aspect-[4/5]", offset: "md:mt-16" },
]

export function WorkShowcase({
  eyebrow = "Selected work",
  heading = "Work that made noise",
  items = [
    {
      name: "Marrow Coffee",
      result: "Rebrand → 3× shelf pickup",
      href: "/work/marrow-coffee",
    },
    {
      name: "Ranger Optics",
      result: "Launch campaign → first run sold out in 11 days",
      href: "/work/ranger-optics",
    },
    {
      name: "Kite Insurance",
      result: "Naming & voice → 41% more quote starts",
      href: "/work/kite-insurance",
    },
    {
      name: "Pinetop Provisions",
      result: "Packaging → picked up by 240 grocers",
      href: "/work/pinetop-provisions",
    },
    {
      name: "Alder & Ash",
      result: "Identity & motion → 2.1M organic views",
      href: "/work/alder-and-ash",
    },
  ],
  className,
}: WorkShowcaseProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground md:text-[50px]">
          {heading}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
          {items.map((item, i) => {
            const layout = TILE_LAYOUT[i % TILE_LAYOUT.length]
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn("group block", layout.span, layout.offset)}
              >
                {item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt ?? `${item.name} — campaign work`}
                    className={cn("w-full object-cover", layout.aspect)}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={cn("w-full bg-accent", layout.aspect)}
                  />
                )}
                <h3 className="mt-4 font-sans text-[21px] leading-tight font-bold tracking-tight text-foreground decoration-primary decoration-2 underline-offset-4 group-hover:underline">
                  {item.name}
                </h3>
                <p className="mt-1 text-base text-muted-foreground">
                  {item.result}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
