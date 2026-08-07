/**
 * gallery-grid.tsx
 * USE WHEN: A photographic breather between content sections — an asymmetric mosaic of the room,
 *           the food, and the people, with italic captions on a few frames. Still by design:
 *           no hover zooms, no lightbox chrome.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — a photo mosaic of plates and firelight has no
 *           product equivalent; SaaS shows screenshots in framed bento sections instead.
 * PAIRS WITH: story-intro.tsx, press-quotes.tsx, private-events.tsx
 * DEPS: /lib/utils only
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"

export interface GalleryImage {
  src?: string
  alt: string
  /** Italic caption under the frame. Use sparingly — two or three per gallery. */
  caption?: string
}

export interface GalleryGridProps {
  eyebrow?: string
  heading?: string
  /** 5–8 images. Spans cycle through an asymmetric layout — order matters. */
  images?: GalleryImage[]
  className?: string
}

/** Asymmetric span cycle: one large anchor frame, then varied small and tall frames. */
const frameSpans = [
  "col-span-2 md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "col-span-2 md:col-span-4",
  "md:col-span-2",
] as const

export function GalleryGrid({
  eyebrow = "the room",
  heading = "Evenings at Casa Olea",
  images = [
    {
      alt: "The full dining room of Casa Olea at golden hour, tables set and the hearth glowing",
      caption: "the corner room on 18th street, just before first seating",
    },
    { alt: "A whole branzino on the grill over almond-wood embers" },
    { alt: "Two glasses of vermouth and a plate of olives on the marble bar" },
    {
      alt: "Tomás Serra carving slow-roasted lamb shoulder at the pass",
      caption: "tomás carving the sunday lamb",
    },
    { alt: "Hands tearing hearth bread over a shared table" },
    { alt: "Stacked almond firewood beside the oven door" },
  ],
  className,
}: GalleryGridProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6 md:auto-rows-[11rem] md:gap-5">
          {images.map((image, i) => (
            <figure
              key={image.alt}
              className={cn("flex min-h-40 flex-col", frameSpans[i % frameSpans.length])}
            >
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="min-h-0 w-full flex-1 object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={image.alt}
                  className="min-h-0 w-full flex-1 bg-secondary"
                />
              )}
              {image.caption ? (
                <figcaption className="mt-2 text-sm italic text-muted-foreground">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
