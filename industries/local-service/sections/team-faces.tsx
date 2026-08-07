/**
 * team-faces.tsx
 * USE WHEN: Showing the actual crew — three or four headshots with names and roles, plus one
 *           collective line. Faces build trust in this industry: people want to know who
 *           knocks on the door. Empty slots render bg-accent blocks.
 * INDUSTRY FIT: local-service. AVOID FOR: portfolio or agency — there the work is the proof
 *           and a headshot wall reads as filler; here the person IS the service.
 * PAIRS WITH: trust-band.tsx, reviews-local.tsx, how-we-work.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface TeamMember {
  /** Full name ("Dale Harbor"). */
  name: string
  /** Plain role, lowercase after the dash ("Owner, master plumber"). */
  role: string
  /** Real headshot — uniform, on the job, or against the shop wall. Empty renders bg-accent. */
  imageSrc?: string
  imageAlt?: string
}

export interface TeamFacesProps {
  eyebrow?: string
  heading?: string
  members?: TeamMember[]
  /** One collective fact about the crew, stated plainly. */
  collectiveLine?: string
  className?: string
}

const defaultMembers: TeamMember[] = [
  {
    name: "Dale Harbor",
    role: "Owner, master plumber",
    imageAlt: "Dale Harbor, owner and master plumber at Harbor Plumbing Co.",
  },
  {
    name: "Patty Harbor",
    role: "Office manager — she answers the phone",
    imageAlt: "Patty Harbor, office manager at Harbor Plumbing Co.",
  },
  {
    name: "Ray Delgado",
    role: "Journeyman plumber, 12 years with us",
    imageAlt: "Ray Delgado, journeyman plumber at Harbor Plumbing Co.",
  },
  {
    name: "Marcus Bell",
    role: "Journeyman plumber, drain specialist",
    imageAlt: "Marcus Bell, journeyman plumber at Harbor Plumbing Co.",
  },
]

export function TeamFaces({
  eyebrow = "The crew",
  heading = "Who shows up at your door",
  members = defaultMembers,
  collectiveLine = "The same faces every time — we don't subcontract.",
  className,
}: TeamFacesProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {members.map((member) => (
            <li key={member.name}>
              {member.imageSrc ? (
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt ?? member.name}
                  className="aspect-square w-full rounded-lg border object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={member.imageAlt ?? member.name}
                  className="flex aspect-square w-full items-center justify-center rounded-lg border bg-accent"
                >
                  <span className="text-sm text-muted-foreground">Headshot</span>
                </div>
              )}
              <p className="mt-4 font-bold text-foreground">{member.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {member.role}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-semibold text-foreground">{collectiveLine}</p>
      </div>
    </section>
  )
}
