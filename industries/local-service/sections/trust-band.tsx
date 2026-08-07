/**
 * trust-band.tsx
 * USE WHEN: Directly under the hero — the four facts a homeowner checks before calling:
 *           license, years in business, review score, guarantee. Informational, navy, no amber.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — a license number and review count read as
 *           tradesman proof; software proof lives in logo bars and metrics, not credentials.
 * PAIRS WITH: hero-promise.tsx, services-grid.tsx, reviews-local.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import {
  BadgeCheck,
  History,
  MessageSquareText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export interface TrustFact {
  icon: LucideIcon
  /** The fact itself, stated plainly ("Licensed & insured"). */
  title: string
  /** One supporting detail — a license number, a year, a count. Never vague. */
  detail: string
}

export interface TrustBandProps {
  facts?: TrustFact[]
  className?: string
}

const defaultFacts: TrustFact[] = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    detail: "WA license #HARBOPC891JD",
  },
  {
    icon: History,
    title: "31 years in business",
    detail: "Family-run in Tacoma since 1994",
  },
  {
    icon: MessageSquareText,
    title: "4.9 from 800+ local reviews",
    detail: "Rated by your neighbors",
  },
  {
    icon: BadgeCheck,
    title: "Workmanship guaranteed",
    detail: "Two years on every repair",
  },
]

export function TrustBand({ facts = defaultFacts, className }: TrustBandProps) {
  return (
    <section className={cn("border-y bg-secondary py-10 md:py-12", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.title} className="flex items-start gap-3">
              <fact.icon
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-foreground"
              />
              <div>
                <p className="font-semibold text-foreground">{fact.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {fact.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
