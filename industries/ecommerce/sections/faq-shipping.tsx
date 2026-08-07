/**
 * faq-shipping.tsx
 * USE WHEN: The practical questions before checkout — shipping, returns, care, repairs, and
 *           gifting answered plainly in a single narrow column, late in the page.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — buying questions there are about billing and
 *           trials, use faq-accordion's two-column layout; portfolio — a FAQ implies a
 *           transaction; creative work should raise questions, not preempt them.
 * PAIRS WITH: values-band.tsx, reviews-grid.tsx, newsletter-checkout.tsx
 * DEPS: /primitives/accordion, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"
import { cn } from "@/lib/utils"

export interface ShippingFaq {
  question: string
  answer: string
}

export interface FaqShippingProps {
  heading?: string
  /** Line under the heading, before the contact link. */
  supportText?: string
  /** Usually a mailto: — the store's actual inbox, not a form. */
  contactLink?: { label: string; href: string }
  /** 5-6 practical questions: shipping, returns, care, repairs, gifting. */
  faqs?: ShippingFaq[]
  className?: string
}

const defaultFaqs: ShippingFaq[] = [
  {
    question: "How long does shipping take, and what does it cost?",
    answer:
      "Orders leave the Kingston workshop within two business days and arrive in three to five across the continental US. Shipping is a flat $6, and free on orders over $75 — everything travels in paper, card, and starch, nothing plastic.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Sixty days, and we mean use it first. Roll a crust with the pin, wash the towels, pour a few mornings of coffee. If a piece isn't right for your kitchen, send it back for a full refund — we'd rather it live somewhere it's used.",
  },
  {
    question: "How do I care for wooden and ceramic pieces?",
    answer:
      "Wood is hand wash only: warm water, mild soap, towel dry, and a coat of board butter about once a month. Stoneware is dishwasher safe, though the glaze keeps its depth longer if washed by hand. Linen goes in the machine warm and only gets softer. Every order includes a linen care card with the specifics.",
  },
  {
    question: "What does repairs for life actually mean?",
    answer:
      "If a piece splits, chips, or wears out of true — this year or in twenty — mail it back and we'll sand, re-oil, re-glaze, or replace it at no charge. You cover postage to us; the return trip is on us. Most repairs are back in your kitchen within three weeks.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes. Choose gift wrap at checkout and we'll pack the piece in unbleached paper tied with cotton twine, tuck in the care card, and handwrite your note — no prices anywhere in the box. Wrapping is $4 per order.",
  },
]

export function FaqShipping({
  heading = "Good to know",
  supportText = "Something we didn't cover?",
  contactLink = { label: "Contact us", href: "mailto:hello@aldercrest.com" },
  faqs = defaultFaqs,
  className,
}: FaqShippingProps) {
  return (
    <section className={cn("py-16 font-sans md:py-24", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-[25px] leading-tight font-semibold text-foreground md:text-[31px]">
          {heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {supportText}{" "}
          <a
            href={contactLink.href}
            className="font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
          >
            {contactLink.label}
          </a>{" "}
          — a person in the workshop answers within a day.
        </p>

        <Accordion type="single" collapsible className="mt-8 w-full border-t border-border">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-base font-medium text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-prose pb-5 text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
