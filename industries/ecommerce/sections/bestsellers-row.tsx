/**
 * bestsellers-row.tsx
 * USE WHEN: A compact second product strip late in the page — four proven pieces in one tight
 *           row, a reminder after the reviews without repeating the full grid.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — a priced product strip is a catalog, not a
 *           feature recap; restaurant — dishes belong on a menu, not commerce tiles.
 * PAIRS WITH: featured-products.tsx, reviews-grid.tsx, newsletter-checkout.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 *       Tiles are deliberately smaller and tighter than featured-products.tsx — this row
 *       recaps; it doesn't merchandise.
 */
import { cn } from "@/lib/utils"

export interface BestsellerProduct {
  name: string
  /** Whole-dollar price; rendered weight 400, tabular-nums, never bold or colored. */
  price: number
  /** Marked-down original — struck through in muted ink, never red. */
  originalPrice?: number
  href: string
  imageSrc?: string
  imageAlt?: string
}

export interface BestsellersRowProps {
  heading?: string
  shopLink?: { label: string; href: string }
  /** Exactly 4 reads best; the row holds 2-up on mobile, 4-up from md. */
  products?: BestsellerProduct[]
  className?: string
}

const defaultProducts: BestsellerProduct[] = [
  {
    name: "Ash Rolling Pin",
    price: 48,
    href: "/products/ash-rolling-pin",
    imageAlt: "Tapered ash rolling pin on a warm gray studio surface",
  },
  {
    name: "Stoneware Mixing Bowl",
    price: 54,
    href: "/products/stoneware-mixing-bowl",
    imageAlt: "Speckled stoneware mixing bowl, three-quarter view",
  },
  {
    name: "Flax Linen Tea Towels, set of 3",
    price: 36,
    href: "/products/flax-linen-tea-towels",
    imageAlt: "Three folded flax linen tea towels in oat, clay, and moss",
  },
  {
    name: "Walnut Serving Board",
    price: 58,
    originalPrice: 72,
    href: "/products/walnut-serving-board",
    imageAlt: "Long walnut serving board with a leather hanging loop",
  },
]

function formatPrice(price: number): string {
  return `$${price}`
}

export function BestsellersRow({
  heading = "Most loved",
  shopLink = { label: "Shop bestsellers", href: "/shop/bestsellers" },
  products = defaultProducts,
  className,
}: BestsellersRowProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          <a
            href={shopLink.href}
            className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
          >
            {shopLink.label}
          </a>
        </div>

        {/* One tight row: smaller tiles and meta than featured-products */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <a key={product.name} href={product.href} className="group block">
              <div className="overflow-hidden rounded-md bg-card">
                {product.imageSrc ? (
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt ?? product.name}
                    className="block aspect-[4/5] w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={product.imageAlt ?? product.name}
                    className="flex aspect-[4/5] w-full items-end p-4 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {product.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2">
                <h3 className="text-sm font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-sm font-normal text-foreground tabular-nums">
                  {formatPrice(product.price)}
                  {product.originalPrice !== undefined ? (
                    <>
                      {" "}
                      <s className="text-muted-foreground">
                        {formatPrice(product.originalPrice)}
                      </s>
                    </>
                  ) : null}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
