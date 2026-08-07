/**
 * menu-highlights.tsx
 * USE WHEN: Showing 3–6 signature dishes with photography before (or instead of) the full menu —
 *           an appetite section, laid out as an offset editorial grid rather than identical cards.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — dishes-with-prices is a hospitality pattern;
 *           three identical feature cards would be the SaaS reflex this section deliberately avoids.
 * PAIRS WITH: menu-list.tsx, story-intro.tsx, gallery-grid.tsx
 * DEPS: /primitives/badge
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Badge } from "@/primitives/badge"

export interface HighlightDish {
  name: string
  description: string
  /** Display string, e.g. "24". Rendered with tabular-nums. */
  price: string
  /** Short dietary marks, e.g. ["v", "gf"]. Rendered as soft olive badges. */
  dietary?: string[]
  imageSrc?: string
  imageAlt: string
}

export interface MenuHighlightsProps {
  eyebrow?: string
  heading?: string
  dishes?: HighlightDish[]
  className?: string
}

/** Offset layout cycle — width, vertical offset, and aspect vary so no two dishes read as twins. */
const dishLayouts = [
  { wrap: "md:col-span-7", aspect: "aspect-[4/3]" },
  { wrap: "md:col-span-5 md:pt-16", aspect: "aspect-[3/4]" },
  { wrap: "md:col-span-5 md:pt-6", aspect: "aspect-square" },
  { wrap: "md:col-span-7 md:pt-10", aspect: "aspect-[4/3]" },
  { wrap: "md:col-span-6", aspect: "aspect-[4/3]" },
  { wrap: "md:col-span-6 md:pt-14", aspect: "aspect-[3/4]" },
] as const

export function MenuHighlights({
  eyebrow = "from the kitchen",
  heading = "Signatures of the house",
  dishes = [
    {
      name: "Hearth flatbread",
      description: "Blistered in the wood oven — 'nduja honey, ricotta, wild oregano.",
      price: "14",
      imageAlt: "Charred hearth flatbread with ricotta and 'nduja honey on a ceramic plate",
    },
    {
      name: "Charred octopus",
      description: "Chickpea purée, smoked paprika oil, grilled lemon.",
      price: "24",
      dietary: ["gf"],
      imageAlt: "Charred octopus tentacle over chickpea purée, dusted with smoked paprika",
    },
    {
      name: "Hearth-roasted carrots",
      description: "Whipped feta, hot honey, crushed pistachio.",
      price: "16",
      dietary: ["v", "gf"],
      imageAlt: "Ember-roasted carrots over whipped feta scattered with pistachio",
    },
    {
      name: "Whole branzino",
      description: "Grilled over almond wood — salsa verde, shaved fennel, grilled lemon.",
      price: "38",
      dietary: ["gf"],
      imageAlt: "Whole wood-grilled branzino with charred lemon halves and fennel",
    },
  ],
  className,
}: MenuHighlightsProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 max-w-xl font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        <div className="mt-14 grid gap-y-14 md:grid-cols-12 md:gap-x-10 md:gap-y-4">
          {dishes.map((dish, i) => {
            const layout = dishLayouts[i % dishLayouts.length]
            return (
              <article key={dish.name} className={layout.wrap}>
                {dish.imageSrc ? (
                  <img
                    src={dish.imageSrc}
                    alt={dish.imageAlt}
                    className={cn("block w-full object-cover", layout.aspect)}
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={dish.imageAlt}
                    className={cn("w-full bg-secondary", layout.aspect)}
                  />
                )}

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[23px] leading-tight font-medium text-foreground">
                    {dish.name}
                  </h3>
                  <p className="text-[17px] tabular-nums text-foreground">
                    {dish.price}
                  </p>
                </div>

                <p className="mt-2 max-w-sm text-[17px] leading-[1.7] text-muted-foreground">
                  {dish.description}
                </p>

                {dish.dietary && dish.dietary.length > 0 ? (
                  <div className="mt-3 flex gap-2">
                    {dish.dietary.map((mark) => (
                      <Badge
                        key={mark}
                        className="border-transparent bg-accent text-accent-foreground"
                      >
                        {mark}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
