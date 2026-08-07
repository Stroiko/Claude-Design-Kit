/**
 * faq-service.tsx
 * USE WHEN: The practical questions people call to ask anyway — pricing, licensing, warranty,
 *           scheduling, payment — answered plainly in an accordion near the end of the page.
 * INDUSTRY FIT: local-service. AVOID FOR: saas — buyers there ask about seats, SSO, and data;
 *           these questions ("are you licensed?", "when do you show up?") belong to trades.
 * PAIRS WITH: quote-form.tsx, emergency-band.tsx, reviews-local.tsx
 * DEPS: /primitives/accordion, /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"

export interface ServiceFaqEntry {
  question: string
  answer: string
}

export interface FaqServiceProps {
  eyebrow?: string
  heading?: string
  entries?: ServiceFaqEntry[]
  className?: string
}

const defaultEntries: ServiceFaqEntry[] = [
  {
    question: "How do you price jobs?",
    answer:
      "Flat rate, quoted before we start. We look at the job, give you one number in writing, and that's what you pay — even if it takes longer than we expected. Estimates over the phone are free.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Harbor Plumbing Co. is a licensed Washington plumbing contractor, license #HARBOPC891JD, and we carry full liability insurance. Ask to see the license — we bring it to every job.",
  },
  {
    question: "Do you guarantee your work?",
    answer:
      "Every repair and installation carries a two-year workmanship guarantee. If something we fixed fails, we come back and make it right at no charge. Manufacturer warranties on fixtures and water heaters apply on top of that.",
  },
  {
    question: "When will you actually show up?",
    answer:
      "We book two-hour arrival windows and call about 30 minutes before we arrive. Call before noon and we can usually get to you the same day.",
  },
  {
    question: "What payment methods do you take?",
    answer:
      "Card, check, or cash, paid when the job is done — never up front. Financing is available for larger work like water heater replacements and repipes.",
  },
]

export function FaqService({
  eyebrow = "FAQ",
  heading = "Questions people call to ask",
  entries = defaultEntries,
  className,
}: FaqServiceProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
            {heading}
          </h2>

          <Accordion type="single" collapsible className="mt-8">
            {entries.map((entry) => (
              <AccordionItem key={entry.question} value={entry.question}>
                <AccordionTrigger className="text-base font-semibold text-foreground">
                  {entry.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-prose text-base leading-relaxed text-muted-foreground">
                  {entry.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
