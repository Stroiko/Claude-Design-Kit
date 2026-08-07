/**
 * hero-product.tsx
 * USE WHEN: The store's opening section — a quiet headline beside one large product photo on a
 *           studio surface. The photo is the hero; the type stays out of its way.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — a product-photo hero has no dashboard frame and
 *           sells objects, not software; restaurant — the studio-gray surface reads catalog,
 *           not hospitality.
 * PAIRS WITH: announcement-bar.tsx, category-tiles.tsx, featured-products.tsx
 * DEPS: /primitives/button, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface HeroProductProps {
  headline?: string
  /** One supporting line under the headline. Keep it to a sentence. */
  supportingLine?: string
  primaryCta?: { label: string; href: string }
  /** Underlined text link beside the primary CTA. */
  secondaryLink?: { label: string; href: string }
  /** Hero product photo. Omit to render the name-labeled studio fallback. */
  imageSrc?: string
  imageAlt?: string
  /** Product name shown inside the fallback slot when no image is provided. */
  productName?: string
  className?: string
}

export function HeroProduct({
  headline = "Kitchen tools made to be repaired, not replaced",
  supportingLine = "Small-batch home goods from Aldercrest — turned, thrown, and woven by workshops we know by name.",
  primaryCta = { label: "Shop the collection", href: "/shop" },
  secondaryLink = { label: "Browse bestsellers", href: "/shop/bestsellers" },
  imageSrc,
  imageAlt = "Aldercrest ash rolling pin resting on a warm gray studio surface",
  productName = "Ash Rolling Pin",
  className,
}: HeroProductProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy — quiet on purpose; the product photo is the hero */}
        <div className="max-w-xl">
          <h1 className="text-[39px] leading-[1.1] font-semibold tracking-normal text-foreground md:text-[49px]">
            {headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {supportingLine}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            <a
              href={secondaryLink.href}
              className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
            >
              {secondaryLink.label}
            </a>
          </div>
        </div>

        {/* Product image on the studio surface, 4/5 like every product slot */}
        <div className="overflow-hidden rounded-md bg-card">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="block aspect-[4/5] w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={imageAlt}
              className="flex aspect-[4/5] w-full items-end p-6"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {productName}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
