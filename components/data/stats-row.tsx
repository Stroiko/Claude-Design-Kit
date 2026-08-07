/**
 * stats-row.tsx
 * USE WHEN: A section should prove credibility with 3-4 big numbers ("120+ projects", "98% satisfaction").
 * INDUSTRY FIT: all. AVOID FOR: businesses with no real numbers yet — fake stats read as slop.
 * PAIRS WITH: pricing-table.tsx, comparison-table.tsx
 * DEPS: /lib/utils
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface Stat {
  /** The big figure, already formatted: "120+", "$4.2M", "98%". */
  value: string
  label: string
  /** Optional one-line qualifier under the label. */
  description?: string
}

export interface StatsRowProps {
  stats: Stat[]
  className?: string
}

export function StatsRow({ stats, className }: StatsRowProps) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-10",
        stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 border-l border-border pl-4">
          <dd className="order-1 text-4xl font-semibold tracking-tight text-foreground tabular-nums md:text-5xl">
            {stat.value}
          </dd>
          <dt className="order-2 text-sm font-medium text-foreground">
            {stat.label}
          </dt>
          {stat.description ? (
            <p className="order-3 text-sm text-muted-foreground">
              {stat.description}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  )
}
