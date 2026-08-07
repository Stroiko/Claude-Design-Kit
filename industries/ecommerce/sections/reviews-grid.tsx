/**
 * reviews-grid.tsx
 * USE WHEN: Customer proof late in the page — words from real kitchens, each tied to the product
 *           bought. No star widgets; the sentences carry it.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — buyer reviews naming physical products read as a
 *           store, use logo/testimonial sections there; local-services — trades want longer
 *           before/after stories, not product-linked quotes.
 * PAIRS WITH: featured-products.tsx, values-band.tsx, newsletter-checkout.tsx
 * DEPS: /primitives/card, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Card, CardContent } from "@/primitives/card"
import { cn } from "@/lib/utils"

export interface Review {
  quote: string
  /** First name only — reads like a real storefront, not a testimonial wall. */
  firstName: string
  product: { name: string; href: string }
}

export interface ReviewsGridProps {
  heading?: string
  reviews?: Review[]
  className?: string
}

const defaultReviews: Review[] = [
  {
    quote:
      "I've rolled every pie crust since March with this pin. The weight is exactly right — cold butter doesn't stand a chance, and it wipes clean in seconds.",
    firstName: "Margaret",
    product: { name: "Ash Rolling Pin", href: "/products/ash-rolling-pin" },
  },
  {
    quote:
      "The bowl is heavy enough to stay put while I whisk one-handed. Two years of near-daily use and the glaze hasn't crazed at all.",
    firstName: "Daniel",
    product: {
      name: "Stoneware Mixing Bowl",
      href: "/products/stoneware-mixing-bowl",
    },
  },
  {
    quote:
      "These towels actually dry glassware without lint. They've been washed weekly for a year and only get softer.",
    firstName: "Priya",
    product: {
      name: "Flax Linen Tea Towels",
      href: "/products/flax-linen-tea-towels",
    },
  },
  {
    quote:
      "A knife slipped and gouged the board. I mailed it in, and it came back sanded, re-oiled, and better than new — no charge. That's why I keep ordering.",
    firstName: "Tomás",
    product: {
      name: "Walnut Serving Board",
      href: "/products/walnut-serving-board",
    },
  },
  {
    quote:
      "Morning coffee got noticeably better. The dripper holds heat, and the carafe pours without a single drip down the side.",
    firstName: "Elena",
    product: {
      name: "Ceramic Pour-Over Set",
      href: "/products/ceramic-pour-over-set",
    },
  },
  {
    quote:
      "The apron's waxed canvas shrugs off flour and splatter, and the straps don't dig in during long bake days. It already looks better worn in.",
    firstName: "Sam",
    product: {
      name: "Waxed Canvas Apron",
      href: "/products/waxed-canvas-apron",
    },
  },
]

export function ReviewsGrid({
  heading = "From 1,400+ kitchens",
  reviews = defaultReviews,
  className,
}: ReviewsGridProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
          {heading}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.firstName + review.product.name} className="shadow-none">
              <CardContent className="flex h-full flex-col">
                <blockquote className="text-base leading-relaxed text-foreground">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 pt-4">
                  <p className="text-sm font-medium text-foreground">
                    {review.firstName}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · Verified buyer
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Purchased the{" "}
                    <a
                      href={review.product.href}
                      className="underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
                    >
                      {review.product.name}
                    </a>
                  </p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
