/**
 * features-bento.tsx
 * USE WHEN: The main features section — 4-6 capabilities of unequal weight arranged as an
 *           asymmetric bento mosaic with hover reveals. The modern answer to icon-card rows.
 * INDUSTRY FIT: saas. AVOID FOR: legal or medical sites — hover-animated mosaics read as
 *           playful product marketing, not counsel; those directions exclude bento motion.
 * PAIRS WITH: how-it-works-steps.tsx, integrations-beam.tsx, stats-band.tsx
 * DEPS: /effects/bento-grid
 */
import { type ReactNode } from "react"
import {
  Activity,
  GitBranch,
  ShieldCheck,
  TimerReset,
  Webhook,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoCard, BentoGrid } from "@/effects/bento-grid"

export interface BentoFeature {
  Icon: React.ElementType
  name: string
  description: string
  /** Grid span classes, e.g. "col-span-3 lg:col-span-2". Controls the mosaic shape. */
  className: string
  /** Decorative background slot rendered behind the card copy. */
  background?: ReactNode
  href?: string
  /** Link label revealed on hover. */
  cta?: string
}

export interface FeaturesBentoProps {
  eyebrow?: string
  heading?: string
  description?: string
  /** 4-6 features. className on each controls its span in the 3-column grid. */
  features?: BentoFeature[]
  className?: string
}

/** Quiet dot-grid texture used when a feature has no custom background. */
function DotGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
    />
  )
}

const defaultFeatures: BentoFeature[] = [
  {
    Icon: GitBranch,
    name: "Canary rollouts",
    description:
      "Route 1% of traffic to the new build, watch real error rates, then promote or roll back automatically.",
    className: "col-span-3 lg:col-span-2",
    href: "/docs/canary-rollouts",
    cta: "How canaries work",
  },
  {
    Icon: TimerReset,
    name: "One-click rollback",
    description:
      "Every deploy keeps a warm previous version. Restore it in under ten seconds, no rebuild.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/rollback",
    cta: "See rollback windows",
  },
  {
    Icon: ShieldCheck,
    name: "Policy checks",
    description:
      "Block releases missing approvals, migrations, or a passing suite — enforced in the pipeline, not a wiki page.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/policies",
    cta: "Browse policies",
  },
  {
    Icon: Activity,
    name: "Release health",
    description:
      "Latency, error rate, and saturation for every service, diffed against the version that came before.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/release-health",
    cta: "Explore metrics",
  },
  {
    Icon: Webhook,
    name: "Fits your pipeline",
    description:
      "A GitHub check, a CLI, and a webhook API. Relay slots into the CI you already run — no migration project.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/integrations",
    cta: "View the API",
  },
]

export function FeaturesBento({
  eyebrow = "Capabilities",
  heading = "Everything between merge and steady-state",
  description = "Relay covers the risky stretch of shipping software: the minutes after a deploy lands, when something is either fine or on fire.",
  features = defaultFeatures,
  className,
}: FeaturesBentoProps) {
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

        <BentoGrid className="mt-16 lg:grid-cols-3">
          {features.map((feature) => (
            <BentoCard
              key={feature.name}
              name={feature.name}
              description={feature.description}
              Icon={feature.Icon}
              className={feature.className}
              background={feature.background ?? <DotGridBackground />}
              href={feature.href ?? "#"}
              cta={feature.cta ?? "Learn more"}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
