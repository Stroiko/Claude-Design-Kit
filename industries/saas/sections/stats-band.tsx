/**
 * stats-band.tsx
 * USE WHEN: Proving scale or reliability with 3-4 hard numbers in a full-width band between
 *           heavier sections — mono tabular figures, hairline top/bottom borders.
 * INDUSTRY FIT: saas. AVOID FOR: businesses without real operating numbers — invented metrics
 *           in a mono typeface read as fabricated benchmarks.
 * PAIRS WITH: logos-marquee.tsx, integrations-beam.tsx, pricing-tiers.tsx
 * DEPS: /lib/utils
 */
import { cn } from "@/lib/utils"

export interface BandStat {
  /** Already-formatted figure: "99.99%", "41ms", "2.1B". */
  value: string
  label: string
}

export interface StatsBandProps {
  /** 3-4 metrics. */
  stats?: BandStat[]
  /** Index of the one metric rendered in the mint accent. Omit for all-monochrome. */
  highlightIndex?: number
  className?: string
}

const defaultStats: BandStat[] = [
  { value: "99.99%", label: "Deploy pipeline uptime, trailing 12 months" },
  { value: "41s", label: "Median time from breach to rollback" },
  { value: "2.4M", label: "Production deploys shipped through Relay" },
  { value: "0", label: "Config changes needed to your CI" },
]

export function StatsBand({
  stats = defaultStats,
  highlightIndex = 1,
  className,
}: StatsBandProps) {
  return (
    <section
      className={cn("border-y border-border py-16 md:py-24", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <dl
          className={cn(
            "grid grid-cols-2 gap-x-6 gap-y-12",
            stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
          )}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <dd
                className={cn(
                  "order-1 font-mono text-4xl font-semibold tracking-tight tabular-nums md:text-5xl",
                  index === highlightIndex ? "text-primary" : "text-foreground"
                )}
              >
                {stat.value}
              </dd>
              <dt className="order-2 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
