/**
 * colophon.tsx
 * USE WHEN: The small end-of-page production note — typeface, toolkit, photo credits — one
 *           muted row over a thin rule, sitting between the last section and footer-line.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — production credits are print-culture manners;
 *           a product page ends with a CTA and a multi-column footer, not a colophon.
 * PAIRS WITH: footer-line.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ColophonProps {
  label?: string
  /** Short factual credits, rendered in one row separated by middle dots. */
  notes?: string[]
  className?: string
}

const defaultNotes = [
  "Set in Archivo",
  "Built from the Claude Design Kit",
  "Photography by Sofía Ledesma",
  "Last updated August 2026",
]

export function Colophon({
  label = "COLOPHON",
  notes = defaultNotes,
  className,
}: ColophonProps) {
  return (
    <section className={cn("border-t border-border py-8 font-sans", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-2 px-6 text-sm">
        <h2 className="font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>
        <p className="text-muted-foreground tabular-nums">
          {notes.map((note, i) => (
            <span key={note}>
              {note}
              {i < notes.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
