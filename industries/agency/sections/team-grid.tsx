/**
 * team-grid.tsx
 * USE WHEN: Showing the crew candidly — five photo slots at varying sizes and offsets
 *           (never a uniform headshot wall), names + roles, one collective caption.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or healthcare (patients need credentialed uniform bios, not candid offsets).
 * PAIRS WITH: case-study-feature.tsx, journal-teaser.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — the heading is Syne 700, names are Manrope.
 *       Empty photo slots render pale-cobalt `bg-accent` blocks per the direction.
 */
import { cn } from "@/lib/utils"

export interface TeamMember {
  name: string
  role: string
  imageSrc?: string
  imageAlt?: string
}

export interface TeamGridProps {
  eyebrow?: string
  heading?: string
  /** One collective line for the whole crew — individual bios are an anti-pattern here. */
  caption?: string
  members?: TeamMember[]
  className?: string
}

/** Varying spans, aspects, and top offsets — deliberately not a uniform headshot wall. */
const MEMBER_LAYOUT = [
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "md:col-span-4", aspect: "aspect-square", offset: "md:mt-16" },
  { span: "md:col-span-3", aspect: "aspect-[4/5]", offset: "md:mt-24" },
  { span: "md:col-span-4 md:col-start-3", aspect: "aspect-[3/4]", offset: "" },
  { span: "md:col-span-5", aspect: "aspect-[4/3]", offset: "md:mt-16" },
  { span: "md:col-span-4", aspect: "aspect-square", offset: "md:mt-8" },
]

export function TeamGrid({
  eyebrow = "The crew",
  heading = "Loud, but organized",
  caption = "Fourteen people in a converted print shop in Southeast Portland. No account layer, no B team — the people in the pitch are the people on the work.",
  members = [
    { name: "Nora Vance", role: "Executive creative director" },
    { name: "Miles Okafor", role: "Design lead" },
    { name: "Priya Nair", role: "Head of strategy" },
    { name: "Theo Lindqvist", role: "Motion director" },
    { name: "June Park", role: "Executive producer" },
  ],
  className,
}: TeamGridProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {caption}
        </p>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
          {members.map((member, i) => {
            const layout = MEMBER_LAYOUT[i % MEMBER_LAYOUT.length]
            return (
              <div key={member.name} className={cn(layout.span, layout.offset)}>
                {member.imageSrc ? (
                  <img
                    src={member.imageSrc}
                    alt={member.imageAlt ?? `${member.name}, ${member.role}`}
                    className={cn("w-full object-cover", layout.aspect)}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={cn("w-full bg-accent", layout.aspect)}
                  />
                )}
                <p className="mt-3 text-base font-medium text-foreground">
                  {member.name}
                </p>
                <p className="text-base text-muted-foreground">{member.role}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
