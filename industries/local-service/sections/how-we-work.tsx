/**
 * how-we-work.tsx
 * USE WHEN: Three plainly numbered steps that answer "what happens after I call?" —
 *           the anxiety a first-time caller actually has. No connectors, no animation.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — onboarding flows there deserve product
 *           screenshots; a numbered handshake reads as a trade's promise, not a funnel.
 * PAIRS WITH: services-grid.tsx, quote-form.tsx, faq-service.tsx
 * DEPS: /primitives (none — plain markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface WorkStep {
  /** Two or three plain words ("Call or book"). */
  title: string
  /** One factual sentence. What literally happens, no marketing. */
  description: string
}

export interface HowWeWorkProps {
  eyebrow?: string
  heading?: string
  steps?: WorkStep[]
  className?: string
}

const defaultSteps: WorkStep[] = [
  {
    title: "Call or book",
    description:
      "Call or send the quote form — a real person answers and books your two-hour window.",
  },
  {
    title: "Upfront quote",
    description:
      "We look at the job and quote a flat price before any work starts.",
  },
  {
    title: "Fixed right",
    description:
      "We do the work, clean up after ourselves, and back it with a two-year guarantee.",
  },
]

export function HowWeWork({
  eyebrow = "How we work",
  heading = "No surprises, start to finish",
  steps = defaultSteps,
  className,
}: HowWeWorkProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li key={step.title}>
              <h3 className="text-[21px] leading-tight font-bold text-foreground">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
