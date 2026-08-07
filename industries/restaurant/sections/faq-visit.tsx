/**
 * faq-visit.tsx
 * USE WHEN: Answering the practical questions guests actually call about — reservations vs
 *           walk-ins, dietary needs, corkage, parking, children — as a quiet single-column
 *           accordion late in the page, near hours and reservations.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — buying-objection FAQs use the two-column
 *           faq-accordion in /industries/saas; this one is typeset like the back page of a menu.
 * PAIRS WITH: hours-location.tsx, reservation-form.tsx, newsletter-table-notes.tsx
 * DEPS: /primitives/accordion
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"
import { cn } from "@/lib/utils"

export interface VisitFaq {
  question: string
  answer: string
}

export interface FaqVisitProps {
  eyebrow?: string
  heading?: string
  /** 4–6 questions, ordered by how often the phone actually rings about them. */
  faqs?: VisitFaq[]
  className?: string
}

const defaultFaqs: VisitFaq[] = [
  {
    question: "Do I need a reservation?",
    answer:
      "It helps, but it isn't required. We hold half the room for walk-ins every night, seated in order of arrival — the wait is usually shortest before 6 pm and after 9. Reservations open thirty days out and are confirmed by phone at (415) 555-0198.",
  },
  {
    question: "Can the kitchen handle dietary restrictions?",
    answer:
      "Most nights, yes, and happily. The menu marks vegetarian and gluten-free dishes, and the kitchen adapts many others on request. Because everything is cooked over one wood fire, we can't guarantee a fully allergen-free environment — for serious allergies, call ahead and Marta will walk you through what's safe that week.",
  },
  {
    question: "What is your corkage policy?",
    answer:
      "You're welcome to bring wine we don't have on our list — corkage is $30 per 750ml bottle, two bottles per table. We waive one corkage fee for each bottle you order from our list, which leans on small Mallorcan and Spanish growers.",
  },
  {
    question: "Where should we park, and what about transit?",
    answer:
      "Street parking is easiest on Florida Street, a block over from the busier stretch of 18th. By transit, the 24th Street Mission BART station is a ten-minute walk, and the 33 and 27 buses both stop within two blocks. There are bike racks just past the green door.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Very. We have high chairs, and the kitchen will do half portions of most fire dishes for younger eaters. The room is calmest at the first seatings — Sundays from 4 pm are especially good for families.",
  },
]

export function FaqVisit({
  eyebrow = "before you visit",
  heading = "Good to know",
  faqs = defaultFaqs,
  className,
}: FaqVisitProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        <Accordion type="single" collapsible className="mt-10 border-t border-border">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-border last:border-b">
              <AccordionTrigger className="py-6 font-serif text-[17px] font-medium text-foreground hover:no-underline hover:opacity-70 md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="max-w-[65ch] text-[17px] leading-[1.7] text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
