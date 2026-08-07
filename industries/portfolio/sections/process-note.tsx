/**
 * process-note.tsx
 * USE WHEN: A short working-note or manifesto — how the studio actually operates — set at
 *           reading-display size with a big left margin and one bold pull-line. No imagery.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a first-person manifesto about working habits
 *           reads as a studio's voice; products explain process with steps and screenshots.
 * PAIRS WITH: about-block.tsx, services-list.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ProcessNoteProps {
  label?: string
  /** Two or three first-person paragraphs on how the work gets made. */
  paragraphs?: string[]
  /** One bold line pulled out between the paragraphs and set larger. */
  pullLine?: string
  className?: string
}

const defaultParagraphs = [
  "Every project starts with reading, not sketching. Before I draw a letter for a restaurant or a label, I spend the first weeks in their archive — old menus, pressings, invoices, whatever survived. The identity is usually already in there, badly set.",
  "I take on three or four clients a year, and I stay through production: press checks, signage installs, the second print run where the paper changes and the ink behaves differently. A system I hand off untested isn't finished.",
  "The typography is always drawn from scratch. Licensing a face means sharing a voice with everyone else who licensed it; a logotype built from custom letterforms is the one asset a client owns outright.",
]

export function ProcessNote({
  label = "HOW I WORK",
  paragraphs = defaultParagraphs,
  pullLine = "Few clients, slow starts, letters drawn from zero.",
  className,
}: ProcessNoteProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase md:col-span-3">
            {label}
          </h2>

          {/* Big left margin: the note starts a third of the way across */}
          <div className="md:col-span-8 md:col-start-4">
            {paragraphs[0] ? (
              <p className="max-w-prose text-[21px] leading-snug font-medium tracking-tight text-foreground">
                {paragraphs[0]}
              </p>
            ) : null}

            {pullLine ? (
              <p className="mt-10 max-w-prose text-[32px] leading-[1.1] font-bold tracking-tight text-foreground">
                {pullLine}
              </p>
            ) : null}

            {paragraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="mt-10 max-w-prose text-[21px] leading-snug font-medium tracking-tight text-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
