/**
 * hero-full-image.tsx
 * USE WHEN: The page opener for a restaurant whose photography can carry the first screen —
 *           one full-viewport image, the restaurant name over a soft ink scrim, a single
 *           reservation CTA, and an hours line. The image does the selling.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — a full-bleed photographic hero with serif display
 *           type reads as hospitality, not product software; SaaS uses hero-centered instead.
 * PAIRS WITH: story-intro.tsx, menu-highlights.tsx, reservation-form.tsx
 * DEPS: /primitives/button, /effects/text-animate
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"
import { TextAnimate } from "@/effects/text-animate"

export interface HeroFullImageProps {
  /** Restaurant name, revealed word-by-word. Keep it short — it renders at 54–71px. */
  name?: string
  /** One-line promise under the name. */
  tagline?: string
  /** Background photo. Omitted: a warm-toned placeholder block per DIRECTION.md. */
  imageSrc?: string
  imageAlt?: string
  reserveCta?: { label: string; href: string }
  /** Small line beneath the CTA — opening days and street. */
  hoursLine?: string
  className?: string
}

export function HeroFullImage({
  name = "Casa Olea",
  tagline = "Wood-fire cooking from the Mediterranean coast, on a quiet corner of the Mission.",
  imageSrc,
  imageAlt = "The dining room of Casa Olea at dusk, candlelight on linen and a wood-fired hearth glowing at the back",
  reserveCta = { label: "Reserve a table", href: "#reservations" },
  hoursLine = "Open Tuesday through Sunday from 5 pm · 2841 18th Street, San Francisco",
  className,
}: HeroFullImageProps) {
  return (
    <section className={cn("relative flex min-h-svh items-end", className)}>
      {/* Background photo slot */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={imageAlt}
          className="absolute inset-0 bg-secondary"
        />
      )}

      {/* Soft ink-tinted scrim for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/5"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-40 pb-20 md:pb-28">
        <TextAnimate
          as="h1"
          by="word"
          animation="blurInUp"
          once
          startOnView={false}
          className="font-serif text-[54px] leading-[1.1] font-medium text-primary-foreground md:text-[71px]"
        >
          {name}
        </TextAnimate>

        <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-primary-foreground/90 md:text-lg">
          {tagline}
        </p>

        <div className="mt-9">
          <Button asChild size="lg">
            <a href={reserveCta.href}>{reserveCta.label}</a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/80">{hoursLine}</p>
      </div>
    </section>
  )
}
