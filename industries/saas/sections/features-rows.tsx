/**
 * features-rows.tsx
 * USE WHEN: 2-3 features each deserve a full explanation with a supporting visual —
 *           alternating text/media rows with a checklist per feature.
 * INDUSTRY FIT: saas. AVOID FOR: restaurant or portfolio sites — checklist-driven feature
 *           rows are conversion copy for software; visual industries should lead with imagery.
 * PAIRS WITH: features-bento.tsx, how-it-works-steps.tsx, pricing-tiers.tsx
 * DEPS: /lib/utils
 */
import { type ReactNode } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FeatureRow {
  eyebrow?: string
  heading: string
  description: string
  /** Short checklist of concrete capabilities. */
  bullets: string[]
  /** Custom media slot. Overrides imageSrc. */
  media?: ReactNode
  imageSrc?: string
  imageAlt?: string
}

export interface FeaturesRowsProps {
  rows?: FeatureRow[]
  className?: string
}

const defaultRows: FeatureRow[] = [
  {
    eyebrow: "Deploy safety",
    heading: "Releases that check their own vitals",
    description:
      "Define what healthy means once — p99 latency, error budget, queue depth — and every deploy is measured against it before it takes full traffic.",
    bullets: [
      "Health checks pulled from your existing Prometheus or Datadog metrics",
      "Automatic rollback when a canary breaches its error budget",
      "Deploy windows that respect on-call schedules and freeze periods",
    ],
    imageAlt:
      "Relay health-check panel comparing p99 latency between the current and previous release",
  },
  {
    eyebrow: "Audit trail",
    heading: "Every release answers who, what, and why",
    description:
      "Relay records the commit range, the approver, the checks that ran, and the traffic curve for every deploy — so the postmortem writes half of itself.",
    bullets: [
      "Immutable release log exportable for SOC 2 evidence",
      "Slack and PagerDuty threads linked to the exact deploy",
      "Diff view between any two releases, config included",
    ],
    imageAlt:
      "Relay audit log listing releases with approvers, commit ranges, and check results",
  },
]

export function FeaturesRows({
  rows = defaultRows,
  className,
}: FeaturesRowsProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 md:gap-32">
        {rows.map((row, index) => {
          const reversed = index % 2 === 1
          return (
            <div
              key={row.heading}
              className="grid items-center gap-16 lg:grid-cols-2"
            >
              <div className={cn("max-w-2xl", reversed && "lg:order-2")}>
                {row.eyebrow ? (
                  <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
                    {row.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-4 text-[31px] leading-tight font-semibold tracking-tight text-foreground md:text-[39px]">
                  {row.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {row.description}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {row.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-primary"
                      />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn(reversed && "lg:order-1")}>
                {row.media ?? (
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                    {row.imageSrc ? (
                      <img
                        src={row.imageSrc}
                        alt={row.imageAlt ?? ""}
                        className="block w-full"
                      />
                    ) : (
                      <div
                        role="img"
                        aria-label={row.imageAlt ?? `${row.heading} illustration`}
                        className="aspect-[4/3] w-full bg-background [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
