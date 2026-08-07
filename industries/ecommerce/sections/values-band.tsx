/**
 * values-band.tsx
 * USE WHEN: A quiet reassurance strip between merchandising sections — the store's standing
 *           promises (batches, repairs, shipping, returns) stated once, in muted ink.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — this is the shape of a stats/features band there,
 *           and reads as SaaS furniture; portfolio — service promises undercut an editorial
 *           body of work.
 * PAIRS WITH: product-story.tsx, reviews-grid.tsx
 * DEPS: /lib/utils, lucide-react
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 *       Deliberately no green here — DIRECTION.md reserves it for buy actions.
 */
import { Leaf, Package, RotateCcw, Wrench, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ValueProp {
  icon: LucideIcon
  name: string
  /** One line; keep it factual, no urgency. */
  line: string
}

export interface ValuesBandProps {
  /** 3–4 value props; the band holds 2-up on mobile, 4-up on desktop. */
  values?: ValueProp[]
  className?: string
}

const defaultValues: ValueProp[] = [
  {
    icon: Package,
    name: "Small batches",
    line: "Runs of forty or fewer, numbered by hand.",
  },
  {
    icon: Wrench,
    name: "Repairs for life",
    line: "Send it back; we mend it or replace it.",
  },
  {
    icon: Leaf,
    name: "Plastic-free post",
    line: "Paper, card, and starch — nothing else in the box.",
  },
  {
    icon: RotateCcw,
    name: "60-day returns",
    line: "Use it first. Return it if it isn't right.",
  },
]

export function ValuesBand({
  values = defaultValues,
  className,
}: ValuesBandProps) {
  return (
    <section className={cn("border-y border-border py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {values.map((value) => (
            <li key={value.name}>
              <value.icon
                aria-hidden="true"
                className="size-5 text-muted-foreground"
                strokeWidth={1.5}
              />
              <h3 className="mt-3 text-base font-medium text-foreground">
                {value.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {value.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
