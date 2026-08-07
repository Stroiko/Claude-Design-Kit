/**
 * before-after.tsx
 * USE WHEN: Showing finished work as static before/after pairs — the highest-value proof a
 *           trade site has. Two labeled photo slots side by side per job, caption with the
 *           job and neighborhood underneath. No sliders, no interactive widgets, no motion.
 * INDUSTRY FIT: local-service. AVOID FOR: saas or portfolio — software has no "before" photo,
 *           and studio work wants full-bleed case studies, not paired repair shots.
 * PAIRS WITH: services-grid.tsx, reviews-local.tsx, team-faces.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface BeforeAfterJob {
  /** What the job was, two or three words ("Repipe"). */
  job: string
  /** Neighborhood and year — the local proof ("North Slope, 2025"). */
  place: string
  /** Photos of the actual job. Empty slots render bg-accent blocks. */
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
}

export interface BeforeAfterProps {
  eyebrow?: string
  heading?: string
  /** 2–3 pairs reads honest; more starts to look like a gallery dump. */
  jobs?: BeforeAfterJob[]
  className?: string
}

const defaultJobs: BeforeAfterJob[] = [
  {
    job: "Repipe",
    place: "North Slope, 2025",
    beforeAlt: "Corroded galvanized pipes before a whole-house repipe",
    afterAlt: "New PEX supply lines after the repipe, labeled and secured",
  },
  {
    job: "Water heater replacement",
    place: "Proctor District, 2025",
    beforeAlt: "Rusted 15-year-old tank water heater before replacement",
    afterAlt: "New tank water heater installed to code with seismic straps",
  },
  {
    job: "Sewer line repair",
    place: "University Place, 2024",
    beforeAlt: "Camera still of a root-blocked clay sewer line before repair",
    afterAlt: "Camera still of the clear repaired sewer line after the fix",
  },
]

function PhotoSlot({
  src,
  alt,
  fallbackLabel,
}: {
  src?: string
  alt: string
  fallbackLabel: string
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="aspect-square w-full rounded-md border object-cover"
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className="flex aspect-square w-full items-center justify-center rounded-md border bg-accent"
    >
      <span className="text-sm text-muted-foreground">{fallbackLabel}</span>
    </div>
  )
}

export function BeforeAfter({
  eyebrow = "Our work",
  heading = "Before and after, from real jobs",
  jobs = defaultJobs,
  className,
}: BeforeAfterProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {jobs.map((item) => (
            <figure key={`${item.job} ${item.place}`}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Before
                  </p>
                  <div className="mt-2">
                    <PhotoSlot
                      src={item.beforeSrc}
                      alt={item.beforeAlt ?? `Before: ${item.job}, ${item.place}`}
                      fallbackLabel="Before photo"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    After
                  </p>
                  <div className="mt-2">
                    <PhotoSlot
                      src={item.afterSrc}
                      alt={item.afterAlt ?? `After: ${item.job}, ${item.place}`}
                      fallbackLabel="After photo"
                    />
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 font-semibold text-foreground">
                {item.job} &mdash;{" "}
                <span className="text-muted-foreground">{item.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
