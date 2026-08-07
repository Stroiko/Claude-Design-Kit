/**
 * about-block.tsx
 * USE WHEN: The first-person bio — a big left margin, two or three confident sentences at
 *           reading-display size, a small offset portrait slot, recognitions as one quiet line.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — first-person "I" copy and a portrait belong to
 *           a person, not a product; SaaS uses a team or story section instead.
 * PAIRS WITH: project-feature.tsx, services-list.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface AboutBlockProps {
  label?: string
  /** First-person bio, 2–3 sentences. Confident, factual, never "passionate". */
  bio?: string
  /** Small portrait slot, offset right. Omit src to render a bg-secondary block. */
  portraitSrc?: string
  portraitAlt?: string
  /** Recognitions rendered inline, separated by middle dots. */
  recognitions?: string[]
  className?: string
}

const defaultRecognitions = [
  "Tipos Latinos Biennial, selected 2022 & 2024",
  "TDC Typeface Design, winner 2025",
  "It's Nice That, feature 2024",
]

export function AboutBlock({
  label = "ABOUT",
  bio = "I'm Anna Reyes, a brand and type designer working from Mexico City since 2018. I build identity systems around custom letterforms, because a logotype you own outlasts any trend you rent. Most of my work is for restaurants, publishers, and labels who want to sound like themselves in print.",
  portraitSrc,
  portraitAlt = "Anna Reyes in her studio, black and white",
  recognitions = defaultRecognitions,
  className,
}: AboutBlockProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase md:col-span-3">
            {label}
          </h2>

          {/* Big left margin: the bio starts a third of the way across */}
          <div className="md:col-span-6 md:col-start-4">
            <p className="text-[23px] leading-snug font-medium tracking-tight text-foreground md:text-[32px]">
              {bio}
            </p>

            {recognitions.length > 0 ? (
              <p className="mt-8 text-sm text-muted-foreground tabular-nums">
                {recognitions.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < recognitions.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-2 md:col-start-11 md:mt-16">
            {portraitSrc ? (
              <img
                src={portraitSrc}
                alt={portraitAlt}
                className="block aspect-[3/4] w-full max-w-40 object-cover md:max-w-none"
              />
            ) : (
              <div
                role="img"
                aria-label={portraitAlt}
                className="aspect-[3/4] w-full max-w-40 bg-secondary md:max-w-none"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
