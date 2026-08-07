/**
 * client-ticker.tsx
 * USE WHEN: A one-row strip of client names scrolling under the hero — social proof as
 *           typography, never a logo wall (the agency direction bans logo grids).
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or healthcare (motion strips read flippant where calm credibility is the job).
 * PAIRS WITH: hero-manifesto.tsx, work-showcase.tsx
 * DEPS: /effects/marquee, /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the names here are Syne 700 via font-bold.
 *       This section spends one of the page's two allowed effects (marquee).
 */
import { Marquee } from "@/effects/marquee"
import { cn } from "@/lib/utils"

export interface ClientTickerProps {
  clients?: string[]
  /** Glyph rendered between names. Keep it a plain text character. */
  separator?: string
  pauseOnHover?: boolean
  className?: string
}

export function ClientTicker({
  clients = [
    "Marrow Coffee",
    "Ranger Optics",
    "Kite Insurance",
    "Pinetop Provisions",
    "Alder & Ash",
    "Hoyt Cider Co.",
    "Bramble Yard",
  ],
  separator = "*",
  pauseOnHover = true,
  className,
}: ClientTickerProps) {
  return (
    <section
      className={cn("border-y border-border py-10 md:py-12", className)}
      aria-label="Selected clients"
    >
      {/* Static list for screen readers; the marquee repeats content and is hidden from AT. */}
      <p className="sr-only">Clients: {clients.join(", ")}.</p>

      <div aria-hidden="true">
        <Marquee
          pauseOnHover={pauseOnHover}
          className="p-0 [--duration:50s] [--gap:2.5rem]"
        >
          {clients.map((client) => (
            <span
              key={client}
              className="flex items-center gap-10 font-sans text-[28px] leading-none font-bold tracking-tight whitespace-nowrap text-muted-foreground md:text-[38px]"
            >
              <span>{client}</span>
              <span className="text-[21px]">{separator}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
