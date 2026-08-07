/**
 * emergency-band.tsx
 * USE WHEN: A calm amber strip stating that after-hours calls get answered, with the number
 *           big enough to dial. This is the amber's second permitted home besides CTAs.
 *           One line — no flashing, no countdowns, no "24/7 EMERGENCY" theatrics.
 * INDUSTRY FIT: local-service. AVOID FOR: saas or portfolio — nobody has a software emergency
 *           at 2am that a phone band solves; a full-width amber bar reads as a trade's promise.
 * PAIRS WITH: services-grid.tsx, service-area.tsx, faq-service.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface EmergencyBandProps {
  /** One calm sentence. State the fact, skip the sirens. */
  message?: string
  /** The big dialable number. `href` must be a tel: link. */
  phone?: { display: string; href: string }
  className?: string
}

export function EmergencyBand({
  message = "Emergency? We answer nights and weekends.",
  phone = { display: "(253) 555-0142", href: "tel:+12535550142" },
  className,
}: EmergencyBandProps) {
  return (
    <section
      className={cn("bg-primary py-12 text-primary-foreground md:py-14", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-[21px] leading-tight font-bold md:text-[27px]">
            {message}
          </p>
          <a
            href={phone.href}
            className="text-[27px] leading-tight font-bold tabular-nums underline-offset-4 hover:underline md:text-[33px]"
          >
            {phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
