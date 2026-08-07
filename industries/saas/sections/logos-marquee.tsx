/**
 * logos-marquee.tsx
 * USE WHEN: Social proof directly under the hero — a quiet strip of customer logos scrolling
 *           in a marquee, desaturated so they read as texture, not advertising.
 * INDUSTRY FIT: saas. AVOID FOR: legal or medical sites — an animated logo strip undercuts the
 *           stillness those industries trade on; use a static grid instead.
 * PAIRS WITH: hero-centered.tsx, hero-split-screenshot.tsx, stats-band.tsx
 * DEPS: /effects/marquee
 */
import { isValidElement, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Marquee } from "@/effects/marquee"

export interface LogoItem {
  name: string
  /** Logo image URL. When omitted, the name renders as a text wordmark. */
  src?: string
}

export interface LogosMarqueeProps {
  /** Microcopy above the strip. */
  label?: string
  /** Company logos: `{ name, src }` items or fully custom ReactNode slots. */
  logos?: (LogoItem | ReactNode)[]
  /** Pause the marquee while hovered. */
  pauseOnHover?: boolean
  className?: string
}

function isLogoItem(logo: LogoItem | ReactNode): logo is LogoItem {
  return (
    typeof logo === "object" &&
    logo !== null &&
    !isValidElement(logo) &&
    "name" in logo
  )
}

const defaultLogos: LogoItem[] = [
  { name: "Northbeam Systems" },
  { name: "Kilnworks" },
  { name: "Ferrous Labs" },
  { name: "Opsline" },
  { name: "Quarry Cloud" },
  { name: "Halyard" },
  { name: "Vantablue" },
  { name: "Cratehaus" },
]

export function LogosMarquee({
  label = "Trusted by engineering teams shipping to production every day",
  logos = defaultLogos,
  pauseOnHover = true,
  className,
}: LogosMarqueeProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee pauseOnHover={pauseOnHover} className="[--duration:40s]">
            {logos.map((logo, index) =>
              isLogoItem(logo) ? (
                <div
                  key={logo.name}
                  className="flex h-10 items-center px-8 opacity-60 grayscale transition-opacity duration-200 hover:opacity-100"
                >
                  {logo.src ? (
                    <img
                      src={logo.src}
                      alt={`${logo.name} logo`}
                      className="max-h-8 w-auto"
                    />
                  ) : (
                    <span className="text-lg font-semibold whitespace-nowrap text-muted-foreground">
                      {logo.name}
                    </span>
                  )}
                </div>
              ) : (
                <div
                  key={index}
                  className="flex h-10 items-center px-8 opacity-60 grayscale"
                >
                  {logo}
                </div>
              )
            )}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
