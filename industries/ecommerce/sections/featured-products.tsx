/**
 * featured-products.tsx
 * USE WHEN: The main product grid — bestsellers or new arrivals in a disciplined 2-to-4-column
 *           scan, information-dense meta under identical studio tiles.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — a priced product grid is a catalog, not a feature
 *           tour; portfolio — work belongs in a case-study grid, not tiles with prices.
 * PAIRS WITH: category-tiles.tsx, product-story.tsx, reviews-grid.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { cn } from "@/lib/utils"

export interface FeaturedProduct {
  name: string
  /** Whole-dollar price; rendered weight 400, tabular-nums, never bold or colored. */
  price: number
  /** Marked-down original — struck through in muted ink, never red. */
  originalPrice?: number
  /** "sold-out" renders muted; "back-in-stock" is the one green note allowed on a tile. */
  availability?: "sold-out" | "back-in-stock"
  href: string
  imageSrc?: string
  imageAlt?: string
}

export interface FeaturedProductsProps {
  heading?: string
  shopAllLink?: { label: string; href: string }
  /** 4–8 products; the grid holds 2-up on mobile, 4-up on desktop. */
  products?: FeaturedProduct[]
  className?: string
}

const defaultProducts: FeaturedProduct[] = [
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
  {
    name: "Ceramic Pour-Over Set",
    price: 88,
    availability: "back-in-stock",
    href: "/products/ceramic-pour-over-set",
    imageAlt: "Matte stoneware pour-over dripper resting on its carafe",
  },
  {
    name: "Olivewood Utensil Set",
    price: 62,
    href: "/products/olivewood-utensil-set",
    imageAlt: "Five olivewood cooking utensils fanned on studio gray",
  },
  {
    name: "Speckled Dinner Plates, set of 4",
    price: 96,
    availability: "sold-out",
    href: "/products/speckled-dinner-plates",
    imageAlt: "Stack of four speckled stoneware dinner plates",
  },
  {
    name: "Waxed Canvas Apron",
    price: 74,
    href: "/products/waxed-canvas-apron",
    imageAlt: "Waxed canvas apron with leather straps on a hook",
  },
]

function formatPrice(price: number): string {
  return `$${price}`
}

export function FeaturedProducts({
  heading = "Bestsellers",
  shopAllLink = { label: "Shop all", href: "/shop" },
  products = defaultProducts,
  className,
}: FeaturedProductsProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          <a
            href={shopAllLink.href}
            className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
          >
            {shopAllLink.label}
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
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
                    className="flex aspect-[4/5] w-full items-end p-5 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {product.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-base font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-base font-normal text-foreground tabular-nums">
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
                {product.availability === "sold-out" ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Sold out
                  </p>
                ) : null}
                {product.availability === "back-in-stock" ? (
                  <p className="mt-0.5 text-sm font-medium text-primary">
                    Back in stock
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
