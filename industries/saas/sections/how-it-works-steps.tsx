/**
 * how-it-works-steps.tsx
 * USE WHEN: Onboarding needs demystifying — a numbered 3-step horizontal flow (01/02/03)
 *           showing how fast a team gets from signup to value.
 * INDUSTRY FIT: saas. AVOID FOR: e-commerce — shoppers don't need a process diagram to buy;
 *           mono step numbers read as developer tooling.
 * PAIRS WITH: features-bento.tsx, integrations-beam.tsx, cta-simple.tsx
 * DEPS: /lib/utils
 */
import { cn } from "@/lib/utils"

export interface Step {
  title: string
  description: string
}

export interface HowItWorksStepsProps {
  eyebrow?: string
  heading?: string
  /** Usually exactly three steps; the layout supports 3-4. */
  steps?: Step[]
  className?: string
}

const defaultSteps: Step[] = [
  {
    title: "Connect your pipeline",
    description:
      "Install the GitHub app or drop the Relay CLI into your existing CI. First deploy tracked in under ten minutes.",
  },
  {
    title: "Define healthy",
    description:
      "Point Relay at the metrics you already collect and set the thresholds a release must hold before it takes full traffic.",
  },
  {
    title: "Ship on autopilot",
    description:
      "Merges roll out as canaries, promote themselves when checks pass, and roll back on their own when they don't.",
  },
]

export function HowItWorksSteps({
  eyebrow = "How it works",
  heading = "From first install to unattended deploys",
  steps = defaultSteps,
  className,
}: HowItWorksStepsProps) {
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
        </div>

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <li key={step.title} className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-medium tracking-widest text-primary tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Thin connector line toward the next step (desktop only) */}
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-border md:block"
                    />
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
