/**
 * hero-editorial-split.tsx
 * USE WHEN: A restaurant opener that leads with story as much as image — a large photo bleeding
 *           to the viewport edge beside an italic eyebrow, headline, and short origin paragraph.
 *           Choose this over hero-full-image when the copy deserves the first word.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — the asymmetric photo-and-serif-prose split reads
 *           as a magazine spread, not a product pitch; SaaS heroes sell a screenshot.
 * PAIRS WITH: menu-highlights.tsx, gallery-grid.tsx, reservation-form.tsx
 * DEPS: /primitives/button
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface HeroEditorialSplitProps {
  /** Italic lowercase eyebrow in terracotta, e.g. "a mediterranean table in the mission". */
  eyebrow?: string
  /** Plain part of the headline. */
  headline?: string
  /** Optional trailing accent, rendered in italic Fraunces. */
  headlineAccent?: string
  /** Two or three sentences of story — who cooks, what burns in the hearth. */
  story?: string
  /** Large photo, bleeding to the left viewport edge. Omitted: warm placeholder block. */
  imageSrc?: string
  imageAlt?: string
  reserveCta?: { label: string; href: string }
  menuLink?: { label: string; href: string }
  className?: string
}

export function HeroEditorialSplit({
  eyebrow = "a mediterranean table in the mission",
  headline = "Dinner from the hearth,",
  headlineAccent = "every night",
  story = "Casa Olea is a small neighborhood bistro built around one wood-fired hearth. Marta and Tomás Serra cook what the coast of Mallorca taught them — whole fish, slow lamb, bread pulled from the embers — for the block they live on.",
  imageSrc,
  imageAlt = "Marta Serra tending the wood-fired hearth at Casa Olea, flames catching a whole branzino on the grill",
  reserveCta = { label: "Reserve a table", href: "#reservations" },
  menuLink = { label: "View menu", href: "#menu" },
  className,
}: HeroEditorialSplitProps) {
  return (
    <section className={cn("grid lg:grid-cols-[3fr_2fr]", className)}>
      {/* Photo column — no container, so the image bleeds to the viewport edge */}
      <div className="relative min-h-[55vh] lg:min-h-svh">
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
      </div>

      {/* Text column */}
      <div className="flex items-center px-6 py-20 md:py-28 lg:px-14">
        <div className="max-w-md">
          <p className="text-sm italic lowercase text-primary">{eyebrow}</p>

          <h1 className="mt-4 font-serif text-[40px] leading-[1.1] font-medium text-foreground md:text-[54px]">
            {headline}
            {headlineAccent ? (
              <>
                {" "}
                <em className="italic">{headlineAccent}</em>
              </>
            ) : null}
          </h1>

          <p className="mt-6 text-[17px] leading-[1.7] text-muted-foreground">
            {story}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <a href={reserveCta.href}>{reserveCta.label}</a>
            </Button>
            <a
              href={menuLink.href}
              className="text-[17px] text-foreground underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
            >
              {menuLink.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
