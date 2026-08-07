/**
 * comparison-plans.tsx
 * USE WHEN: Buyers need the fine print — a full feature-by-feature table across the three plans,
 *           usually on a dedicated pricing page below pricing-tiers.tsx cards.
 * INDUSTRY FIT: saas. AVOID FOR: consultative services (legal, agencies) — a feature matrix
 *           implies self-serve packaging; engagements are scoped, not compared.
 * PAIRS WITH: pricing-tiers.tsx, faq-accordion.tsx, cta-simple.tsx
 * DEPS: /components/data/comparison-table
 */
import { cn } from "@/lib/utils"
import {
  ComparisonTable,
  type ComparisonRow,
} from "@/components/data/comparison-table"

export interface ComparisonPlansProps {
  eyebrow?: string
  heading?: string
  description?: string
  /** Plan names, in column order. */
  columns?: string[]
  rows?: ComparisonRow[]
  /** Index of the recommended plan's column. */
  highlightColumn?: number
  /** Screen-reader caption passed through to the table. */
  caption?: string
  className?: string
}

const defaultColumns = ["Starter", "Pro", "Scale"]

const defaultRows: ComparisonRow[] = [
  { feature: "Users", cells: ["Up to 5", "Unlimited", "Unlimited"] },
  { feature: "Deploys per month", cells: ["100", "Unlimited", "Unlimited"] },
  { feature: "Canary rollouts", cells: ["1 service", "All services", "All services"] },
  { feature: "Automatic rollback windows", cells: [false, true, true] },
  { feature: "Deploy policies and approvals", cells: [false, true, true] },
  { feature: "Slack and PagerDuty integration", cells: [false, true, true] },
  { feature: "Audit log retention", cells: ["30 days", "1 year", "Unlimited"] },
  { feature: "SAML SSO and SCIM provisioning", cells: [false, false, true] },
  { feature: "Self-hosted runners", cells: [false, false, true] },
  { feature: "SOC 2 evidence exports", cells: [false, false, true] },
  { feature: "Support", cells: ["Community", "Email", "Dedicated with SLAs"] },
]

export function ComparisonPlans({
  eyebrow = "Compare plans",
  heading = "Exactly what each plan includes",
  description = "No usage cliffs, no surprise line items. The differences are features, not meters.",
  columns = defaultColumns,
  rows = defaultRows,
  highlightColumn = 1,
  caption = "Feature comparison across plans",
  className,
}: ComparisonPlansProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[31px] leading-tight font-semibold tracking-tight text-foreground md:text-[39px]">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <ComparisonTable
          className="mt-16"
          columns={columns}
          rows={rows}
          caption={caption}
          highlightColumn={highlightColumn}
        />
      </div>
    </section>
  )
}
