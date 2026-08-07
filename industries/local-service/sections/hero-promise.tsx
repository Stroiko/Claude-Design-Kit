/**
 * hero-promise.tsx
 * USE WHEN: The page opener for a local service business: one plain promise, a phone number
 *           you can dial with your thumb, and a quote link. Split layout with a real-work photo.
 * INDUSTRY FIT: local-service. AVOID FOR: saas or portfolio — a tel: CTA and "licensed & insured"
 *           line read as a neighborhood trade, not a product or a studio.
 * PAIRS WITH: trust-band.tsx, services-grid.tsx, quote-form.tsx
 * DEPS: /primitives/button, /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"

export interface HeroPromiseProps {
  /** The plain promise. State what you do and how fast — never a slogan. */
  headline?: string
  supportingLine?: string
  /** Amber call CTA. `display` is what renders; `href` must be a tel: link. */
  phone?: { display: string; href: string }
  /** Outline quote CTA — usually an anchor to the quote form section. */
  quoteCta?: { label: string; href: string }
  /** Short proof line under the CTAs, facts separated by middle dots. */
  trustLine?: string
  /** Real-work photo: truck, crew, or finished job. Empty renders a bg-accent slot. */
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function HeroPromise({
  headline = "Burst pipe? We're there within the hour.",
  supportingLine = "Harbor Plumbing Co. has fixed Tacoma's plumbing since 1994. Flat quotes before we start, and a real person answers the phone.",
  phone = { display: "(253) 555-0142", href: "tel:+12535550142" },
  quoteCta = { label: "Get a free quote", href: "#quote" },
  trustLine = "Licensed & insured · Since 1994 · Same-day service",
  imageSrc,
  imageAlt = "Harbor Plumbing Co. technician replacing a water heater in a Tacoma home",
  className,
}: HeroPromiseProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-[42px] leading-[1.1] font-bold tracking-tight text-foreground md:text-[52px]">
              {headline}
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
              {supportingLine}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={phone.href}>
                  <Phone aria-hidden="true" />
                  Call <span className="tabular-nums">{phone.display}</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={quoteCta.href}>{quoteCta.label}</a>
              </Button>
            </div>

            <p className="mt-5 text-sm font-semibold text-foreground">
              {trustLine}
            </p>
          </div>

          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-[4/3] w-full rounded-lg border object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={imageAlt}
              className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border bg-accent"
            >
              <span className="text-sm text-muted-foreground">
                Real-work photo
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
