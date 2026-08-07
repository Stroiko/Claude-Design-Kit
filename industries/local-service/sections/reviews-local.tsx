/**
 * reviews-local.tsx
 * USE WHEN: Three neighbor reviews with names, neighborhoods, and the actual job done —
 *           specificity is the proof. No stars, no aggregate widgets, no carousels.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — testimonials there cite roles and companies;
 *           "Maria G., Proctor District" only builds trust when the reader lives nearby.
 * PAIRS WITH: trust-band.tsx, service-area.tsx, quote-form.tsx
 * DEPS: /primitives (none — plain rounded-lg border bg-card markup), /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"

export interface LocalReview {
  /** The review in the customer's own words — concrete details, no superlatives stacked. */
  quote: string
  /** First name + last initial ("Maria G."). */
  name: string
  /** Neighborhood or town — the local proof. */
  neighborhood: string
  /** What the job actually was ("Water heater replacement"). */
  jobType: string
}

export interface ReviewsLocalProps {
  eyebrow?: string
  heading?: string
  reviews?: LocalReview[]
  className?: string
}

const defaultReviews: LocalReview[] = [
  {
    quote:
      "They quoted the water heater over the phone, showed up at 8 the next morning, and the price didn't move. Hot water by lunch.",
    name: "Maria G.",
    neighborhood: "Proctor District",
    jobType: "Water heater replacement",
  },
  {
    quote:
      "Our kitchen drain had been slow for months. One visit, cleared, and he showed me what caused it so it wouldn't come back.",
    name: "Dan & Katie R.",
    neighborhood: "North End",
    jobType: "Drain cleaning",
  },
  {
    quote:
      "Found the leak behind the laundry wall in twenty minutes and fixed the pipe without tearing up half the room.",
    name: "Elaine T.",
    neighborhood: "Browns Point",
    jobType: "Leak repair",
  },
]

export function ReviewsLocal({
  eyebrow = "Reviews",
  heading = "What neighbors say",
  reviews = defaultReviews,
  className,
}: ReviewsLocalProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
          {heading}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-lg border bg-card p-6"
            >
              <blockquote className="flex-1 leading-relaxed text-foreground">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold text-foreground">
                  {review.name}, {review.neighborhood}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {review.jobType}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
