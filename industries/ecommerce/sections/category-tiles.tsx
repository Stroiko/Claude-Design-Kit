/**
 * category-tiles.tsx
 * USE WHEN: The shop's top-level wayfinding — three or four category doors directly under the
 *           hero so shoppers can self-sort in one glance.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — category doors imply a browsable catalog, not a
 *           feature set; local-services — service menus want descriptions and booking, not
 *           image tiles with item counts.
 * PAIRS WITH: hero-product.tsx, featured-products.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { cn } from "@/lib/utils"

export interface CategoryTile {
  name: string
  /** e.g. "24 items" — rendered muted under the name. */
  itemCount: string
  href: string
  imageSrc?: string
  imageAlt?: string
}

export interface CategoryTilesProps {
  /** 3–4 tiles; the grid holds 2-up on mobile, 4-up on desktop. */
  categories?: CategoryTile[]
  className?: string
}

const defaultCategories: CategoryTile[] = [
  {
    name: "Kitchen",
    itemCount: "24 items",
    href: "/shop/kitchen",
    imageAlt: "Olivewood utensils and an ash rolling pin arranged on studio gray",
  },
  {
    name: "Ceramics",
    itemCount: "18 items",
    href: "/shop/ceramics",
    imageAlt: "Speckled stoneware bowls stacked on a warm gray surface",
  },
  {
    name: "Textiles",
    itemCount: "12 items",
    href: "/shop/textiles",
    imageAlt: "Folded flax linen tea towels in oat and clay tones",
  },
  {
    name: "Care",
    itemCount: "7 items",
    href: "/shop/care",
    imageAlt: "Board butter tin and a horsehair brush on studio gray",
  },
]

export function CategoryTiles({
  categories = defaultCategories,
  className,
}: CategoryTilesProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="group block">
              <div className="overflow-hidden rounded-md bg-card">
                {category.imageSrc ? (
                  <img
                    src={category.imageSrc}
                    alt={category.imageAlt ?? category.name}
                    className="block aspect-[4/5] w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={category.imageAlt ?? category.name}
                    className="flex aspect-[4/5] w-full items-end p-5 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="text-base font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {category.itemCount}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
