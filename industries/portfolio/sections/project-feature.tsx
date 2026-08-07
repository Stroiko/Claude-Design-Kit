/**
 * project-feature.tsx
 * USE WHEN: One case study deserves the full stage — a near-full-bleed hero image, then a
 *           two-thirds summary paragraph beside a one-third factual metadata list.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — a monograph-style case spread with Client/Role
 *           metadata is studio language; product case studies need outcomes and metrics.
 * PAIRS WITH: work-index.tsx, work-grid.tsx, about-block.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ProjectFeatureMeta {
  term: string
  detail: string
}

export interface ProjectFeatureProps {
  label?: string
  name?: string
  /** The big summary paragraph, first person, factual. */
  summary?: string
  /** Full-bleed hero image for the case. Omit to render a bg-secondary block. */
  imageSrc?: string
  imageAlt?: string
  meta?: ProjectFeatureMeta[]
  className?: string
}

const defaultMeta: ProjectFeatureMeta[] = [
  { term: "Client", detail: "Fonda Nube, Mexico City" },
  { term: "Role", detail: "Identity, custom logotype, art direction" },
  { term: "Year", detail: "2024" },
  { term: "Deliverables", detail: "Logotype, menu system, signage, matchbooks, tableware marks" },
]

export function ProjectFeature({
  label = "FEATURED CASE",
  name = "Fonda Nube",
  summary = "Fonda Nube is a twelve-table restaurant in Roma Norte that wanted to feel like it had always been there. I drew a single-weight logotype from the owner's grandmother's recipe cards, then let it carry everything — menus, signage, the matchbook by the door. No secondary marks, no pattern library. One voice, set large, printed on cheap paper that ages well.",
  imageSrc,
  imageAlt = "Fonda Nube dining room signage, painted logotype on plaster",
  meta = defaultMeta,
  className,
}: ProjectFeatureProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      {/* Full-bleed image slot — deliberately escapes the container */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block aspect-[21/9] w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={imageAlt}
          className="aspect-[21/9] w-full bg-secondary"
        />
      )}

      <div className="mx-auto mt-12 max-w-6xl px-6 md:mt-16">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-[32px] leading-[1.1] font-bold tracking-tight text-foreground md:text-[45px]">
              {name}
            </h2>
            <p className="mt-6 max-w-prose text-[18px] leading-relaxed text-foreground">
              {summary}
            </p>
          </div>

          <dl className="divide-y divide-border border-y border-border text-sm md:self-start">
            {meta.map((row) => (
              <div key={row.term} className="grid grid-cols-[6rem_1fr] gap-4 py-3">
                <dt className="font-medium text-foreground">{row.term}</dt>
                <dd className="text-muted-foreground tabular-nums">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
