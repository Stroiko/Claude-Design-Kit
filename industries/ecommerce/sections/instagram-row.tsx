/**
 * instagram-row.tsx
 * USE WHEN: A social-proof photo band near the foot of the page — five square customer shots
 *           and the store's handle. Pure image slots, no embeds, no scripts.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — customer kitchen photos have no software
 *           equivalent, use logo or testimonial sections; portfolio — the artist's own grid
 *           is the work; reposting followers dilutes it.
 * PAIRS WITH: reviews-grid.tsx, lookbook-split.tsx, newsletter-checkout.tsx
 * DEPS: /lib/utils, lucide-react
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Instagram } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InstagramPhoto {
  imageSrc?: string
  /** Doubles as the fallback slot label — name the dish or product in shot. */
  imageAlt: string
}

export interface InstagramRowProps {
  heading?: string
  /** e.g. "@aldercrest" — rendered beside the Instagram icon. */
  handle?: string
  profileHref?: string
  /** 5 square photos; the row holds 2-3 up on mobile, 5-up from md. */
  photos?: InstagramPhoto[]
  className?: string
}

const defaultPhotos: InstagramPhoto[] = [
  { imageAlt: "Sunday galette rolled with the ash pin" },
  { imageAlt: "Pour-over morning, stoneware dripper mid-bloom" },
  { imageAlt: "Walnut board set with bread and soft cheese" },
  { imageAlt: "Linen towels drying over the oven rail" },
  { imageAlt: "Speckled plates stacked after a long dinner" },
]

export function InstagramRow({
  heading = "In your kitchens",
  handle = "@aldercrest",
  profileHref = "https://instagram.com/aldercrest",
  photos = defaultPhotos,
  className,
}: InstagramRowProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
            {heading}
          </h2>
          <a
            href={profileHref}
            aria-label={`Aldercrest on Instagram, ${handle}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
          >
            <Instagram aria-hidden="true" className="size-4" strokeWidth={1.5} />
            {handle}
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {photos.map((photo) => (
            <div key={photo.imageAlt} className="overflow-hidden rounded-md bg-card">
              {photo.imageSrc ? (
                <img
                  src={photo.imageSrc}
                  alt={photo.imageAlt}
                  className="block aspect-square w-full object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={photo.imageAlt}
                  className="flex aspect-square w-full items-end p-4"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {photo.imageAlt}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
