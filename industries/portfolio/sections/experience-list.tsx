/**
 * experience-list.tsx
 * USE WHEN: A CV condensed to two short ledgers — "Experience" (role, place, years) beside
 *           "Teaching / Talks" (event, year) — closing with a mailto for the full CV.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a personal résumé block belongs to a person;
 *           products present teams or a company story, never an individual's CV.
 * PAIRS WITH: about-block.tsx, recognitions-list.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ExperienceItem {
  /** Role and place: "Independent practice, Mexico City". */
  position: string
  /** Years span with an en dash: "2018–present". */
  years: string
}

export interface TalkItem {
  /** Event or institution: "Letterform seminar, CENTRO". */
  event: string
  year: string
}

export interface ExperienceListProps {
  experienceLabel?: string
  experience?: ExperienceItem[]
  talksLabel?: string
  talks?: TalkItem[]
  /** Underlined mailto line at the end. Omit email to hide. */
  cvNote?: string
  email?: string
  className?: string
}

const defaultExperience: ExperienceItem[] = [
  { position: "Independent practice, Mexico City", years: "2018–present" },
  { position: "Senior designer, Buró Cardinal, Mexico City", years: "2015–2018" },
  { position: "Designer, Estudio Malinche, Guadalajara", years: "2013–2015" },
]

const defaultTalks: TalkItem[] = [
  { event: "Letterform seminar, CENTRO, Mexico City", year: "2023–2026" },
  { event: "Tipografía México — \"Drawing before branding\"", year: "2025" },
  { event: "Abierto de Diseño, workshop on logotype revivals", year: "2024" },
  { event: "UNAM Faculty of Arts and Design, guest critic", year: "2022" },
]

export function ExperienceList({
  experienceLabel = "EXPERIENCE",
  experience = defaultExperience,
  talksLabel = "TEACHING / TALKS",
  talks = defaultTalks,
  cvNote = "Full CV on request",
  email = "hello@annareyes.studio",
  className,
}: ExperienceListProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {experienceLabel}
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {experience.map((item) => (
                <li
                  key={item.position}
                  className="flex items-baseline justify-between gap-x-6 py-4"
                >
                  <span className="text-base text-foreground">{item.position}</span>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                    {item.years}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {talksLabel}
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {talks.map((item) => (
                <li
                  key={item.event}
                  className="flex items-baseline justify-between gap-x-6 py-4"
                >
                  <span className="text-base text-foreground">{item.event}</span>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                    {item.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {email ? (
          <p className="mt-10 text-sm">
            <a
              href={`mailto:${email}?subject=CV%20request`}
              className="text-foreground underline underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
            >
              {cvNote}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  )
}
