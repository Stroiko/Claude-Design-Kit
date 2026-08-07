/**
 * comparison-table.tsx
 * USE WHEN: Features must be compared across 2-4 tiers or competitors in a semantic table with yes/no/value cells.
 * INDUSTRY FIT: all. AVOID FOR: 2-3 simple tiers with short feature lists — pricing-table.tsx cards scan faster.
 * PAIRS WITH: pricing-table.tsx, stats-row.tsx
 * DEPS: /lib/utils, lucide-react
 */
import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

/** true → check icon, false → x icon, string → literal value ("Up to 5", "Unlimited"). */
export type ComparisonCell = boolean | string

export interface ComparisonRow {
  feature: string
  /** One cell per column, in column order. */
  cells: ComparisonCell[]
}

export interface ComparisonTableProps {
  /** Column headings: tier or competitor names. */
  columns: string[]
  rows: ComparisonRow[]
  /** Caption for screen readers, e.g. "Plan feature comparison". */
  caption: string
  /** Index of the column to visually emphasize (e.g. your product). */
  highlightColumn?: number
  className?: string
}

function CellValue({ cell }: { cell: ComparisonCell }) {
  if (cell === true) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto size-4 text-primary" />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (cell === false) {
    return (
      <>
        <X aria-hidden="true" className="mx-auto size-4 text-muted-foreground" />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <>{cell}</>
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  highlightColumn,
  className,
}: ComparisonTableProps) {
  return (
    /* Horizontal scroll keeps the table semantic on narrow screens */
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-3 pr-4 text-left font-medium text-muted-foreground">
              Feature
            </th>
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "px-4 py-3 text-center font-semibold text-foreground",
                  index === highlightColumn && "bg-muted"
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border">
              <th
                scope="row"
                className="py-3 pr-4 text-left font-normal text-foreground"
              >
                {row.feature}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-4 py-3 text-center text-muted-foreground tabular-nums",
                    index === highlightColumn && "bg-muted text-foreground"
                  )}
                >
                  <CellValue cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
