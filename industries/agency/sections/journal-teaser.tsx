/**
 * journal-teaser.tsx
 * USE WHEN: Surfacing three recent opinions as an index — divide-y rows, whole row a link,
 *           title takes a cobalt underline on hover. Proof the studio has a point of view.
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or local-services (customers want hours and quotes, not hot takes on branding).
 * PAIRS WITH: team-grid.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — article titles are Syne 700 at 21–28px.
 */
import { cn } from "@/lib/utils"

export interface JournalArticle {
  title: string
  /** Machine-readable date for the <time> element, e.g. "2026-07-14". */
  dateTime: string
  /** Display date, kept short and tabular, e.g. "07.14.26". */
  dateLabel: string
  /** Plain-text topic tag — no pill, no badge. */
  topic: string
  href: string
}

export interface JournalTeaserProps {
  eyebrow?: string
  heading?: string
  articles?: JournalArticle[]
  className?: string
}

export function JournalTeaser({
  eyebrow = "Journal",
  heading = "Opinions, mostly ours",
  articles = [
    {
      title: "Your brand guidelines are why nobody uses your brand",
      dateTime: "2026-07-14",
      dateLabel: "07.14.26",
      topic: "Identity",
      href: "/journal/guidelines-nobody-uses",
    },
    {
      title: "Every category has a beige problem",
      dateTime: "2026-06-02",
      dateLabel: "06.02.26",
      topic: "Strategy",
      href: "/journal/beige-problem",
    },
    {
      title: "The case study is the product now",
      dateTime: "2026-04-21",
      dateLabel: "04.21.26",
      topic: "Studio",
      href: "/journal/case-study-is-the-product",
    },
  ],
  className,
}: JournalTeaserProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
          {heading}
        </h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <a
              key={article.href}
              href={article.href}
              className="group grid gap-x-6 gap-y-2 py-7 md:grid-cols-12 md:items-baseline"
            >
              <h3 className="font-sans text-[21px] leading-tight font-bold tracking-tight text-foreground decoration-primary decoration-2 underline-offset-4 group-hover:underline md:col-span-8 md:text-[28px]">
                {article.title}
              </h3>
              <time
                dateTime={article.dateTime}
                className="text-base text-muted-foreground tabular-nums md:col-span-2"
              >
                {article.dateLabel}
              </time>
              <p className="text-base text-muted-foreground md:col-span-2 md:text-right">
                {article.topic}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
