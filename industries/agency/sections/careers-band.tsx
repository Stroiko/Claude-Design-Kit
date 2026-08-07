/**
 * careers-band.tsx
 * USE WHEN: Hiring honestly — a bordered band with "We hire slowly.", one or two openings
 *           as divide-y rows (role, discipline, location), and a mailto for everyone else.
 *           Deliberately quiet: no cobalt anywhere except the hover underline.
 * INDUSTRY FIT: agency. AVOID FOR: saas (a growing product org wants a full careers page
 *           with departments and filters) or restaurant (staffing posts live on job boards).
 * PAIRS WITH: culture-band.tsx, team-grid.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the heading is Syne 700 at 38px, role names
 *       Syne 700 at 21px. The eyebrow stays muted (not cobalt) on purpose: this band is the
 *       quietest thing on the page. No effects: the page's motion budget is spent by the
 *       hero and the client ticker.
 */
import { cn } from "@/lib/utils"

export interface CareerOpening {
  role: string
  /** Discipline the role sits in — match capabilities wording, e.g. "Motion & film". */
  discipline: string
  /** Plain location line, e.g. "Portland or remote". */
  location: string
  href: string
}

export interface CareersBandProps {
  eyebrow?: string
  heading?: string
  /** One honest line under the heading. */
  note?: string
  openings?: CareerOpening[]
  /** Lead-in before the mailto link. */
  fallbackPrompt?: string
  /** Text of the mailto link itself. */
  fallbackLabel?: string
  email?: string
  className?: string
}

export function CareersBand({
  eyebrow = "Careers",
  heading = "We hire slowly.",
  note = "Fourteen people stays fourteen until the work demands fifteen. When a seat opens, it's real.",
  openings = [
    {
      role: "Senior brand designer",
      discipline: "Design",
      location: "Portland or remote",
      href: "/careers/senior-brand-designer",
    },
    {
      role: "Motion designer",
      discipline: "Motion & film",
      location: "Portland or remote",
      href: "/careers/motion-designer",
    },
  ],
  fallbackPrompt = "No openings that fit?",
  fallbackLabel = "Write us anyway",
  email = "hello@loudneighbor.co",
  className,
}: CareersBandProps) {
  return (
    <section className={cn("border-y border-border py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {note}
        </p>

        {openings.length > 0 ? (
          <div className="mt-12 divide-y divide-border border-y border-border">
            {openings.map((opening) => (
              <a
                key={opening.href}
                href={opening.href}
                className="group grid gap-x-6 gap-y-1 py-6 md:grid-cols-12 md:items-baseline"
              >
                <h3 className="font-sans text-[21px] leading-tight font-bold tracking-tight text-foreground decoration-primary decoration-2 underline-offset-4 group-hover:underline md:col-span-6">
                  {opening.role}
                </h3>
                <p className="text-base text-muted-foreground md:col-span-3">
                  {opening.discipline}
                </p>
                <p className="text-base text-muted-foreground md:col-span-3 md:text-right">
                  {opening.location}
                </p>
              </a>
            ))}
          </div>
        ) : null}

        <p className="mt-10 text-base text-muted-foreground">
          {fallbackPrompt}{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-foreground underline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
          >
            {fallbackLabel}
          </a>
        </p>
      </div>
    </section>
  )
}
