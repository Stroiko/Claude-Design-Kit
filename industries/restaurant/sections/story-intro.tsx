/**
 * story-intro.tsx
 * USE WHEN: The section directly after the hero — a narrow, book-like origin story in two or
 *           three paragraphs, closed by a pair of offset photos with italic margin captions.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — long serif prose about family and firewood is
 *           the opposite of a features grid; SaaS explains with product, not memoir.
 * PAIRS WITH: hero-full-image.tsx, menu-highlights.tsx, press-quotes.tsx
 * DEPS: /lib/utils only
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"

interface StoryPhoto {
  src?: string
  alt: string
  /** Italic caption set in the margin under the photo. */
  caption?: string
}

export interface StoryIntroProps {
  eyebrow?: string
  heading?: string
  /** Two or three paragraphs. Keep each under ~4 sentences. */
  paragraphs?: string[]
  photoLeft?: StoryPhoto
  photoRight?: StoryPhoto
  className?: string
}

function StoryPhotoSlot({ photo }: { photo: StoryPhoto }) {
  return photo.src ? (
    <img
      src={photo.src}
      alt={photo.alt}
      className="block aspect-[4/5] w-full object-cover"
    />
  ) : (
    <div
      role="img"
      aria-label={photo.alt}
      className="aspect-[4/5] w-full bg-secondary"
    />
  )
}

export function StoryIntro({
  eyebrow = "our story",
  heading = "An olive tree, a hearth, and a corner room",
  paragraphs = [
    "Casa Olea takes its name from the olive tree in the courtyard of Marta Serra's grandmother's house outside Palma. Summers there were long tables under its branches — bread rubbed with tomato, fish straight off the coals, nobody in a hurry to leave.",
    "In 2019, Marta and her brother Tomás took over a corner room on 18th Street, built a wood-fired hearth where the old counter stood, and started cooking the food they grew up eating. No gas line in the kitchen. If it isn't touched by the fire, it isn't on the menu.",
    "Six years on, the menu still changes with the market and the wood still comes in on Tuesdays. The table is set for the neighborhood first — walk-ins keep half the room every night.",
  ],
  photoLeft = {
    alt: "Loaves of hearth bread cooling on the pass at Casa Olea",
    caption: "the day's bread, out of the embers by four",
  },
  photoRight = {
    alt: "The olive tree branch hung over the doorway of Casa Olea's dining room",
    caption: "an olea branch from Mallorca, over the door since day one",
  },
  className,
}: StoryIntroProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>

        <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-[17px] leading-[1.7] text-foreground/90 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Offset photo pair — deliberately asymmetric, captions in the margin */}
        <div className="mt-16 grid grid-cols-[5fr_4fr] items-start gap-6 md:gap-10">
          <figure>
            <StoryPhotoSlot photo={photoLeft} />
            {photoLeft.caption ? (
              <figcaption className="mt-3 text-sm italic text-muted-foreground">
                {photoLeft.caption}
              </figcaption>
            ) : null}
          </figure>

          <figure className="mt-12 md:mt-20">
            <StoryPhotoSlot photo={photoRight} />
            {photoRight.caption ? (
              <figcaption className="mt-3 text-sm italic text-muted-foreground">
                {photoRight.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  )
}
