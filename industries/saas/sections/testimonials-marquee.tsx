/**
 * testimonials-marquee.tsx
 * USE WHEN: Lots of short quotes and limited vertical space — two counter-scrolling marquee
 *           rows of compact quote cards that pause on hover. The moving alternative to
 *           testimonials-grid when quantity matters more than depth.
 * INDUSTRY FIT: saas. AVOID FOR: legal or medical sites — scrolling testimonials exceed those
 *           industries' motion budgets and undercut the stillness they trade on.
 * PAIRS WITH: testimonials-grid.tsx, logos-marquee.tsx, stats-band.tsx
 * DEPS: /effects/marquee, /primitives/avatar
 */
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/primitives/avatar"
import { Marquee } from "@/effects/marquee"

export interface MarqueeTestimonial {
  /** Keep it to one or two sentences — cards are compact. */
  quote: string
  name: string
  role: string
  company: string
  avatarSrc?: string
}

export interface TestimonialsMarqueeProps {
  eyebrow?: string
  heading?: string
  /** 6-10 short quotes, split across the two rows. */
  testimonials?: MarqueeTestimonial[]
  /** Pause both rows while hovered. */
  pauseOnHover?: boolean
  className?: string
}

const defaultTestimonials: MarqueeTestimonial[] = [
  {
    quote:
      "Relay rolled back a bad release before anyone got paged. That was the day it earned its seat.",
    name: "Mara Okafor",
    role: "VP of Engineering",
    company: "Opsline",
  },
  {
    quote:
      "Set up in an afternoon on top of the GitHub Actions we already had. No migration project.",
    name: "Dan Reyes",
    role: "Staff Engineer",
    company: "Ferrous Labs",
  },
  {
    quote:
      "Every merge to main ships as a canary now. Nobody on the team had to learn anything new.",
    name: "Elin Marsh",
    role: "Head of Infrastructure",
    company: "Northbeam Systems",
  },
  {
    quote:
      "The release log made our SOC 2 evidence collection a one-afternoon job instead of a quarter.",
    name: "Priya Natarajan",
    role: "Platform Lead",
    company: "Halyard",
  },
  {
    quote:
      "On-call pages dropped by half in the first quarter. Bad releases stop themselves.",
    name: "Tomás Rivera",
    role: "Engineering Manager",
    company: "Kilnworks",
  },
  {
    quote:
      "Deploy windows that respect our on-call calendar ended the Friday-afternoon standoff for good.",
    name: "Grace Adeyemi",
    role: "SRE Lead",
    company: "Quarry Cloud",
  },
  {
    quote:
      "We finally trust juniors to ship on day one. The policies catch what review misses.",
    name: "Peter Lindqvist",
    role: "CTO",
    company: "Cratehaus",
  },
  {
    quote:
      "Watching a canary promote itself at 2am — and not being awake for it — is the whole product.",
    name: "Sofia Marchetti",
    role: "Principal Engineer",
    company: "Vantablue",
  },
]

/** "Dan Reyes" → "DR". Fallback shown when a testimonial has no avatar image. */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function QuoteCard({ testimonial }: { testimonial: MarqueeTestimonial }) {
  return (
    <figure className="w-80 shrink-0 rounded-xl border border-border bg-card p-6">
      <blockquote className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar>
          {testimonial.avatarSrc ? (
            <AvatarImage src={testimonial.avatarSrc} alt="" />
          ) : null}
          <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialsMarquee({
  eyebrow = "Testimonials",
  heading = "Word gets around the on-call rotation",
  testimonials = defaultTestimonials,
  pauseOnHover = true,
  className,
}: TestimonialsMarqueeProps) {
  const midpoint = Math.ceil(testimonials.length / 2)
  const firstRow = testimonials.slice(0, midpoint)
  const secondRow = testimonials.slice(midpoint)

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

        {/* Edge fade keeps the rows reading as a window, not a cut-off list */}
        <div className="mt-16 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee pauseOnHover={pauseOnHover} className="[--duration:60s]">
            {firstRow.map((testimonial) => (
              <QuoteCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </Marquee>
          {secondRow.length > 0 ? (
            <Marquee
              reverse
              pauseOnHover={pauseOnHover}
              className="[--duration:60s]"
            >
              {secondRow.map((testimonial) => (
                <QuoteCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </Marquee>
          ) : null}
        </div>
      </div>
    </section>
  )
}
