/**
 * services-detail.tsx
 * USE WHEN: A capabilities page needs depth, not an index — three disciplines as asymmetric
 *           blocks that stagger across the grid: Syne subhead, a short Manrope paragraph,
 *           and a "Recent:" line linking a real case. The deeper alternative to
 *           capabilities-list.tsx; never run both on the same page.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or saas (products explain features with proof and screenshots, not disciplines).
 * PAIRS WITH: work-showcase.tsx, process-steps.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — discipline subheads are Syne 700 at 28px.
 *       Cobalt appears on the eyebrow and the "Recent:" hover underline only. No effects:
 *       the page's motion budget is spent by the hero and the client ticker.
 */
import { cn } from "@/lib/utils"

export interface ServiceDetailItem {
  /** Discipline name — match the wording in capabilities-list.tsx. */
  title: string
  /** Two to three plain lines on how the discipline actually runs here. */
  description: string
  /** The case that proves it, e.g. "Marrow Coffee — rebrand, packaging, launch film". */
  recent: { label: string; href: string }
}

export interface ServicesDetailProps {
  eyebrow?: string
  heading?: string
  items?: ServiceDetailItem[]
  className?: string
}

/** Blocks stagger across the 12-column grid — deliberately off-axis, never centered. */
const BLOCK_OFFSETS = [
  "md:col-span-7",
  "md:col-span-7 md:col-start-6",
  "md:col-span-7 md:col-start-3",
]

export function ServicesDetail({
  eyebrow = "Capabilities",
  heading = "Three disciplines, all the way down",
  items = [
    {
      title: "Brand identity",
      description:
        "Identity systems built to survive contact with the real world — the truck wrap, the 16-pixel favicon, the intern's first deck. We ship the logic, the files, and the nerve to hold the line when someone asks for a softer version.",
      recent: {
        label: "Marrow Coffee — rebrand, packaging, launch film",
        href: "/work/marrow-coffee",
      },
    },
    {
      title: "Campaigns",
      description:
        "One sharp idea pushed until it's slightly uncomfortable, then run across out-of-home, social, and retail without dilution. We write the headline before we pick the channels — never the other way around.",
      recent: {
        label: "Ranger Optics — launch campaign",
        href: "/work/ranger-optics",
      },
    },
    {
      title: "Motion & film",
      description:
        "Launch films, spots, and identity motion cut in-house by the same people who drew the letterforms — no hand-off to an outside post shop. Sound gets treated as half the job, because it is.",
      recent: {
        label: "Alder & Ash — identity & motion",
        href: "/work/alder-and-ash",
      },
    },
  ],
  className,
}: ServicesDetailProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {heading}
        </h2>

        <div className="mt-16">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="grid border-t border-border py-12 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-12"
            >
              <div className={cn(BLOCK_OFFSETS[i % BLOCK_OFFSETS.length])}>
                <h3 className="font-sans text-[28px] leading-tight font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-5 text-base text-foreground">
                  <span className="font-medium text-muted-foreground">
                    Recent:{" "}
                  </span>
                  <a
                    href={item.recent.href}
                    className="font-medium underline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
                  >
                    {item.recent.label}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
