/**
 * testimonials-grid.tsx
 * USE WHEN: Social proof deserves real estate — 4-6 customer quotes in an asymmetric card grid,
 *           one featured quote enlarged with its hard number pulled out in mint mono.
 * INDUSTRY FIT: saas. AVOID FOR: legal or medical sites — casual engineer testimonials read as
 *           product marketing; those industries prove trust with credentials, not quotes.
 * PAIRS WITH: stats-band.tsx, testimonials-marquee.tsx, pricing-tiers.tsx
 * DEPS: /primitives/card, /primitives/avatar
 */
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/primitives/avatar"
import { Card, CardContent } from "@/primitives/card"

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatarSrc?: string
  /** The one enlarged card — spans two columns on desktop. At most one per grid. */
  featured?: boolean
  /** Hard number pulled out above the featured quote, e.g. { value: "41s", label: "…" }. */
  metric?: { value: string; label: string }
}

export interface TestimonialsGridProps {
  eyebrow?: string
  heading?: string
  /** 4-6 quotes. Mark exactly one `featured` for the asymmetric layout. */
  testimonials?: Testimonial[]
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "We went from dreading Friday deploys to not noticing them. Relay caught a bad migration at 1% traffic and rolled it back before the first alert even fired.",
    name: "Mara Okafor",
    role: "VP of Engineering",
    company: "Opsline",
    featured: true,
    metric: { value: "41s", label: "from error-budget breach to rollback" },
  },
  {
    quote:
      "The audit log paid for itself during our SOC 2 audit. Every release already had the approver, the checks, and the traffic curve attached.",
    name: "Priya Natarajan",
    role: "Platform Lead",
    company: "Halyard",
  },
  {
    quote:
      "We plugged Relay into our existing GitHub Actions in an afternoon. No migration project, no new deploy tool to learn.",
    name: "Dan Reyes",
    role: "Staff Engineer",
    company: "Ferrous Labs",
  },
  {
    quote:
      "Canary rollouts used to be something we admired in other teams' conference talks. Now every merge to main gets one automatically.",
    name: "Elin Marsh",
    role: "Head of Infrastructure",
    company: "Northbeam Systems",
  },
  {
    quote:
      "On-call pages dropped by half in our first quarter. Bad releases just stop themselves now.",
    name: "Tomás Rivera",
    role: "Engineering Manager",
    company: "Kilnworks",
  },
]

/** "Mara Okafor" → "MO". Fallback shown when a testimonial has no avatar image. */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card
      className={cn("h-full", testimonial.featured && "md:col-span-2")}
    >
      <CardContent className="flex h-full flex-col">
        <figure className="flex h-full flex-col">
          {testimonial.featured && testimonial.metric ? (
            <div className="mb-6">
              <p className="font-mono text-4xl font-semibold tracking-tight text-primary tabular-nums">
                {testimonial.metric.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {testimonial.metric.label}
              </p>
            </div>
          ) : null}
          <blockquote
            className={cn(
              "flex-1 leading-relaxed text-foreground",
              testimonial.featured ? "text-lg" : "text-base"
            )}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <Avatar size="lg">
              {testimonial.avatarSrc ? (
                <AvatarImage src={testimonial.avatarSrc} alt="" />
              ) : null}
              <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">
                {testimonial.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  )
}

export function TestimonialsGrid({
  eyebrow = "Testimonials",
  heading = "Teams that stopped babysitting deploys",
  testimonials = defaultTestimonials,
  className,
}: TestimonialsGridProps) {
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
