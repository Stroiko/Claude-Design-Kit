/**
 * culture-band.tsx
 * USE WHEN: Saying how the studio actually works — one Syne pull-line, two or three short
 *           Manrope paragraphs offset right (small teams, no account layer, everyone makes),
 *           and an optional wide studio photo. No headshots — team-grid.tsx has those.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or healthcare (patients want credentials and outcomes, not studio culture).
 * PAIRS WITH: team-grid.tsx, awards-line.tsx, careers-band.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the pull-line is Syne 700 at 38px.
 *       The empty photo slot renders a pale-cobalt `bg-accent` block per the direction.
 *       No effects: the page's motion budget is spent by the hero and the client ticker.
 */
import { cn } from "@/lib/utils"

export interface CultureBandProps {
  eyebrow?: string
  /** The one-line stance, stat-free — e.g. "Fourteen people. No middle managers." */
  pullLine?: string
  /** Two or three short paragraphs on how the studio runs. */
  paragraphs?: string[]
  /** Wide candid studio shot — the space, not headshots. Falls back to a bg-accent block. */
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function CultureBand({
  eyebrow = "The studio",
  pullLine = "Fourteen people. No middle managers.",
  paragraphs = [
    "Project teams are four people, tops. The strategist who wrote the brief sits in the design reviews, and the designer presents their own work — nothing gets translated by somebody who wasn't in the room when it was made.",
    "There is no account layer. You get a producer who keeps the trains running and direct lines to the people making the thing, so feedback lands in hours instead of a Tuesday status call.",
    "Everyone makes. The founders still design, still write, still cut film. Nobody here manages full time, and the work is better for it.",
  ],
  imageSrc,
  imageAlt = "The Loud Neighbor studio floor — a converted print shop in Southeast Portland",
  className,
}: CultureBandProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {pullLine}
        </h2>

        {/* Deliberate asymmetry: the paragraphs sit in the right two-thirds, off the pull-line's axis. */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2 md:col-start-2">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mt-16 aspect-[21/9] w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={imageAlt}
            className="mt-16 aspect-[21/9] w-full bg-accent"
          />
        )}
      </div>
    </section>
  )
}
