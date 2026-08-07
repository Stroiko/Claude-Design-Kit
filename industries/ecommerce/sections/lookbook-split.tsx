/**
 * lookbook-split.tsx
 * USE WHEN: A breathing space between merchandising sections — two lifestyle photos, offset,
 *           captioned, no CTAs. The products at home instead of on the studio surface.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — lifestyle photography has nothing to show for
 *           software; local-services — uncaptioned mood imagery reads brand-book, not
 *           get-a-quote.
 * PAIRS WITH: product-story.tsx, reviews-grid.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 *       Deliberately quiet: no buttons, no links — the photographs do the selling.
 */
import { cn } from "@/lib/utils"

export interface LookbookImage {
  imageSrc?: string
  imageAlt: string
  /** Short muted caption under the photo. */
  caption: string
}

export interface LookbookSplitProps {
  eyebrow?: string
  /** Short intro block beside the first image. */
  intro?: string
  images?: [LookbookImage, LookbookImage]
  className?: string
}

const defaultImages: [LookbookImage, LookbookImage] = [
  {
    imageAlt:
      "A floured counter at golden hour — the ash rolling pin resting on half-rolled dough",
    caption: "Sunday galette, the ash pin doing the quiet work.",
  },
  {
    imageAlt:
      "Open shelving with speckled stoneware plates and a linen towel over the rail",
    caption: "Speckled stoneware and flax linen, shelved within reach.",
  },
]

export function LookbookSplit({
  eyebrow = "At home",
  intro = "We photograph everything twice: once on the studio table, once in the kitchens that keep it. This is the second kind — flour on the counter, towels over the rail, nothing staged that wouldn't stay put.",
  images = defaultImages,
  className,
}: LookbookSplitProps) {
  const [first, second] = images

  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Intro text block, top-left */}
          <div className="lg:col-span-4">
            <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              {eyebrow}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </div>

          {/* First lifestyle image, larger and high */}
          <figure className="lg:col-span-8">
            {first.imageSrc ? (
              <img
                src={first.imageSrc}
                alt={first.imageAlt}
                className="block aspect-[3/2] w-full rounded-md object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={first.imageAlt}
                className="aspect-[3/2] w-full rounded-md bg-card"
              />
            )}
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {first.caption}
            </figcaption>
          </figure>

          {/* Second image, narrower and offset low-left for asymmetry */}
          <figure className="lg:col-span-6 lg:col-start-2 lg:-mt-10">
            {second.imageSrc ? (
              <img
                src={second.imageSrc}
                alt={second.imageAlt}
                className="block aspect-[3/2] w-full rounded-md object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={second.imageAlt}
                className="aspect-[3/2] w-full rounded-md bg-card"
              />
            )}
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {second.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
