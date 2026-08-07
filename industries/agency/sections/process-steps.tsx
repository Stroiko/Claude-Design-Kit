/**
 * process-steps.tsx
 * USE WHEN: Explaining how engagements actually run — three phases with oversized cobalt
 *           numbers, honest timeframes, and thin rules. Heading left, phases right (two-thirds).
 * INDUSTRY FIT: agency. AVOID FOR: portfolio (individual, monochrome — this is a loud crew)
 *           or local-services (homeowners want "call, quote, done", not a 12-week engagement arc).
 * PAIRS WITH: capabilities-list.tsx, case-study-feature.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md. Both resolve through `font-sans`, so display vs
 *       body is expressed with weight + size — phase subheads are Syne 700 at 28px.
 *       Cobalt is spent on the oversized numbers here; keep the rest ink-on-bone.
 */
import { cn } from "@/lib/utils"

export interface ProcessStep {
  title: string
  /** Two honest lines, timeframe first — e.g. "Weeks 1–2: we argue about the brief until it's true." */
  description: string
}

export interface ProcessStepsProps {
  eyebrow?: string
  heading?: string
  steps?: ProcessStep[]
  className?: string
}

export function ProcessSteps({
  eyebrow = "How it runs",
  heading = "Twelve weeks, three fights",
  steps = [
    {
      title: "Pick the fight",
      description:
        "Weeks 1–2: we argue about the brief until it's true. You leave with one sentence everyone in your company can repeat — that sentence runs the rest of the project.",
    },
    {
      title: "Make it loud",
      description:
        "Weeks 3–8: identity, campaign, motion — built in the open with a working review every Friday. You see rough work early instead of a big reveal you can't react to.",
    },
    {
      title: "Put it everywhere",
      description:
        "Weeks 9–12: launch, rollout kits, and files your team can actually use. We stay on the phone through the first month of real-world contact.",
    },
  ],
  className,
}: ProcessStepsProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Asymmetric split: heading holds the left third, phases run down the right two-thirds. */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[13px] font-semibold tracking-widest uppercase text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-sans text-[38px] leading-[1.1] font-bold tracking-tight text-foreground">
              {heading}
            </h2>
          </div>

          <ol className="md:col-span-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-x-8 gap-y-4 border-t border-border py-10 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="font-sans text-[50px] leading-none font-extrabold tracking-tight text-primary md:text-[67px]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-[28px] leading-tight font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
