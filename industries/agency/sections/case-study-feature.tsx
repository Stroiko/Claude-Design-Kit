/**
 * case-study-feature.tsx
 * USE WHEN: One case deserves the whole stage — full-bleed image, then an asymmetric split:
 *           big result statement left, factual Client/Scope/Year/Result list right.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or restaurant (a menu spread wants appetite photography, not engagement metadata).
 * PAIRS WITH: work-showcase.tsx, process-steps.tsx, team-grid.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size. The `highlight` span carries the page's one
 *       expressive cobalt underline moment — don't add a second.
 */
import { cn } from "@/lib/utils"

export interface CaseStudyMetaRow {
  label: string
  value: string
}

export interface CaseStudyFeatureProps {
  eyebrow?: string
  /** Statement lead-in; renders before the underlined highlight. */
  statement?: string
  /** The words that get the cobalt underline — the page's one expressive color moment. */
  highlight?: string
  meta?: CaseStudyMetaRow[]
  cta?: { label: string; href: string }
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function CaseStudyFeature({
  eyebrow = "Featured case",
  statement = "Marrow went from shelf wallpaper to",
  highlight = "the bag people photograph.",
  meta = [
    { label: "Client", value: "Marrow Coffee" },
    { label: "Scope", value: "Rebrand, packaging, launch film" },
    { label: "Year", value: "2025" },
    { label: "Result", value: "3× shelf pickup in six months" },
  ],
  cta = { label: "Read the case", href: "/work/marrow-coffee" },
  imageSrc,
  imageAlt = "Marrow Coffee rebrand — new bags lined up on a grocery shelf",
  className,
}: CaseStudyFeatureProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      {/* Full-bleed case image — intentionally outside the max-w-6xl container. */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="aspect-[21/9] w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={imageAlt}
          className="aspect-[21/9] w-full bg-accent"
        />
      )}

      <div className="mx-auto mt-12 max-w-6xl px-6 md:mt-16">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>

        <div className="mt-6 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground md:text-[50px]">
              {statement}{" "}
              <span className="underline decoration-primary decoration-4 underline-offset-8">
                {highlight}
              </span>
            </h2>
            <a
              href={cta.href}
              className="mt-10 inline-block font-medium text-foreground underline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
            >
              {cta.label}
            </a>
          </div>

          <dl className="border-y border-border md:col-span-4 md:col-start-9">
            {meta.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-4 last:border-b-0"
              >
                <dt className="text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-right text-base font-medium text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
