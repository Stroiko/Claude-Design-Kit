/**
 * instagram-band.tsx
 * USE WHEN: A "follow along" strip near the foot of the page — four or five square photo
 *           slots at varied sizes with one handle link. Pure image slots and a plain anchor:
 *           no embed scripts, no API, no hover zooms.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — a photo feed of plates and firelight has no
 *           product equivalent; SaaS social proof is logos and testimonials, not Instagram.
 * PAIRS WITH: gallery-grid.tsx, faq-visit.tsx, newsletter-table-notes.tsx
 * DEPS: /lib/utils, lucide-react
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { Instagram } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InstagramPhoto {
  src?: string
  alt: string
}

export interface InstagramBandProps {
  eyebrow?: string
  heading?: string
  /** Instagram handle without the @. */
  handle?: string
  /** Link target for the handle. */
  profileHref?: string
  /** 4–5 square photos. Sizes cycle asymmetrically — order matters. */
  photos?: InstagramPhoto[]
  className?: string
}

/** Asymmetric span cycle on a 12-column grid — squares of two sizes, centered on one row. */
const photoSpans = ["md:col-span-3", "md:col-span-2", "md:col-span-3", "md:col-span-2", "md:col-span-2"] as const

const defaultPhotos: InstagramPhoto[] = [
  { alt: "The day's whole branzino on ice at the pass of Casa Olea" },
  { alt: "A glass of vermouth catching the evening light on the marble bar" },
  { alt: "Flames rising in the wood-fired hearth as service begins" },
  { alt: "Olive oil cake dusted with candied citrus on a ceramic plate" },
  { alt: "The green door at 18th and Florida with the olive branch above it" },
]

export function InstagramBand({
  eyebrow = "follow along",
  heading = "From the pass, most nights",
  handle = "casaolea",
  profileHref = "https://instagram.com/casaolea",
  photos = defaultPhotos,
  className,
}: InstagramBandProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
            <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
              {heading}
            </h2>
          </div>

          <a
            href={profileHref}
            aria-label={`Casa Olea on Instagram, @${handle}`}
            className="inline-flex items-center gap-2 text-[17px] text-foreground underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            <Instagram aria-hidden="true" className="size-4" />@{handle}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 items-center gap-4 md:grid-cols-12 md:gap-5">
          {photos.slice(0, 5).map((photo, i) =>
            photo.src ? (
              <img
                key={photo.alt}
                src={photo.src}
                alt={photo.alt}
                className={cn(
                  "block aspect-square w-full object-cover",
                  photoSpans[i % photoSpans.length]
                )}
              />
            ) : (
              <div
                key={photo.alt}
                role="img"
                aria-label={photo.alt}
                className={cn(
                  "aspect-square w-full bg-secondary",
                  photoSpans[i % photoSpans.length]
                )}
              />
            )
          )}
        </div>
      </div>
    </section>
  )
}
