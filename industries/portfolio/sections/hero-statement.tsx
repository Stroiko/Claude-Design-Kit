/**
 * hero-statement.tsx
 * USE WHEN: The opening screen of a personal portfolio — a full viewport of type where the
 *           name or a one-line position statement IS the design. No imagery, no CTA buttons.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a product page needs a promise plus proof
 *           (screenshot, CTA); a bare typographic wall reads as a personal site, not software.
 * PAIRS WITH: work-index.tsx, work-grid.tsx, footer-line.tsx
 * DEPS: /effects/text-animate, /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"
import { TextAnimate } from "@/effects/text-animate"

export interface HeroStatementProps {
  /** Small index-style label at the top, e.g. the person's name when the statement isn't it. */
  label?: string
  /** The statement itself. Set to the name ("Anna Reyes") for a name-first hero. */
  statement?: string
  /** One quiet line pinned to the bottom of the viewport. */
  availability?: string
  /** Email shown next to the availability line. Omit to hide. */
  email?: string
  className?: string
}

export function HeroStatement({
  label = "ANNA REYES — BRAND & TYPE DESIGN, MEXICO CITY",
  statement = "Brand identities and typefaces for people with something to say.",
  availability = "Booking Q1 2027",
  email = "hello@annareyes.studio",
  className,
}: HeroStatementProps) {
  return (
    <section className={cn("flex min-h-svh flex-col font-sans", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 pt-24 pb-10">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>

        <TextAnimate
          as="h1"
          by="word"
          animation="blurInUp"
          once
          startOnView={false}
          duration={0.6}
          className="max-w-5xl text-[45px] leading-[0.95] font-extrabold tracking-tight text-foreground sm:text-[64px] lg:text-[90px]"
        >
          {statement}
        </TextAnimate>

        <p className="text-sm text-muted-foreground tabular-nums">
          {availability}
          {email ? (
            <>
              {" — "}
              <a
                href={`mailto:${email}`}
                className="text-foreground underline underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
              >
                {email}
              </a>
            </>
          ) : null}
        </p>
      </div>
    </section>
  )
}
