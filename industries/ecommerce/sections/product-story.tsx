/**
 * product-story.tsx
 * USE WHEN: One product deserves a slow paragraph — material, process, and specs beside a large
 *           editorial photo, closing on a priced add-to-cart.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — material-and-process storytelling has no software
 *           equivalent; restaurant — a specs table beside a photo reads product page, not menu.
 * PAIRS WITH: featured-products.tsx, values-band.tsx, lookbook-split.tsx
 * DEPS: /primitives/button, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductStoryProps {
  eyebrow?: string
  heading?: string
  /** Two short paragraphs on material and process. */
  paragraphs?: [string, string]
  /** Rendered as a thin-ruled definition list. */
  specs?: ProductSpec[]
  /** Price appears inside the CTA label, e.g. "Add to cart — $48". */
  cta?: { label: string; href: string }
  /** Editorial 3/2 photo. Omit to render the name-labeled studio fallback. */
  imageSrc?: string
  imageAlt?: string
  /** Product name shown inside the fallback slot when no image is provided. */
  productName?: string
  className?: string
}

const defaultSpecs: ProductSpec[] = [
  { label: "Material", value: "Single-origin ash, food-safe oil finish" },
  { label: "Dimensions", value: '19" long, tapered to 1.5"' },
  { label: "Care", value: "Hand wash, re-oil monthly" },
  { label: "Made in", value: "Kingston, New York" },
]

export function ProductStory({
  eyebrow = "The Ash Rolling Pin",
  heading = "Turned from one tree, finished by one pair of hands",
  paragraphs = [
    "Spun from single-origin ash felled in a Hudson Valley storm, each pin is turned green, air-dried for eight weeks, then finished with a food-safe oil we blend in the workshop. The taper is cut by eye — no two are identical, and none has ever left the lathe unbalanced.",
    "Ash is the wood bakers kept for a reason: dense enough to hold its line under cold butter, light enough to feel the dough through it. Ours will outlast the counter you roll on, and if it ever splits, we repair it. That's the arrangement.",
  ],
  specs = defaultSpecs,
  cta = { label: "Add to cart — $48", href: "/products/ash-rolling-pin" },
  imageSrc,
  imageAlt = "Ash rolling pin mid-turn on the lathe, shavings curling away",
  productName = "Ash Rolling Pin",
  className,
}: ProductStoryProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-5 lg:gap-16">
        {/* Editorial photo takes the 3 of the 3/2 split */}
        <div className="overflow-hidden rounded-md bg-card lg:col-span-3">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="block aspect-[3/2] w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={imageAlt}
              className="flex aspect-[3/2] w-full items-end p-6"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {productName}
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[25px] leading-[1.15] font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}

          <dl className="mt-8 border-t border-border">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between gap-6 border-b border-border py-3"
              >
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="text-right text-sm font-medium text-foreground">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <Button asChild size="lg" className="mt-8 tabular-nums">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
