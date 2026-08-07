/**
 * faq-accordion.tsx
 * USE WHEN: Objection handling before the final CTA — heading block on the left, an accordion
 *           of 5-6 buying questions on the right. Answers the email nobody wants to send.
 * INDUSTRY FIT: saas. AVOID FOR: portfolio sites — a FAQ implies a transactional product;
 *           creative work should raise questions, not preempt them.
 * PAIRS WITH: pricing-tiers.tsx, comparison-plans.tsx, cta-simple.tsx
 * DEPS: /primitives/accordion
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"
import { cn } from "@/lib/utils"

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqAccordionProps {
  eyebrow?: string
  heading?: string
  /** Line under the heading, before the contact link. */
  supportText?: string
  contactLink?: { label: string; href: string }
  /** 5-6 questions. Order them by how often sales actually hears them. */
  faqs?: FaqItem[]
  className?: string
}

const defaultFaqs: FaqItem[] = [
  {
    question: "Can I change plans in the middle of a billing cycle?",
    answer:
      "Yes. Upgrades apply immediately and we prorate the difference on your next invoice. Downgrades take effect at the next renewal, and you keep the higher plan's features until then.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "After 14 days you drop to the free Starter plan automatically — no card is required up front and nothing is deleted. Your deploy history, policies, and integrations are all waiting if you upgrade later.",
  },
  {
    question: "Can we export our data if we leave?",
    answer:
      "Always. Release history, audit logs, and policy configuration export as JSON or CSV from the dashboard or the API, on every plan — including for 90 days after you cancel.",
  },
  {
    question: "Do you support single sign-on?",
    answer:
      "SAML 2.0 SSO and SCIM provisioning are included on the Scale plan. Google and GitHub OAuth sign-in are available on every plan, including Starter.",
  },
  {
    question: "Does Relay need access to our production environment?",
    answer:
      "No. Relay reads health metrics from your observability stack and triggers deploys through your existing CI. Teams with stricter requirements can run self-hosted runners on the Scale plan so nothing leaves their network.",
  },
  {
    question: "Is there a limit on deploys or rollbacks?",
    answer:
      "Starter includes 100 deploys a month. Pro and Scale are unlimited — and we never meter rollbacks, canaries, or environments on any plan. Undoing a mistake should not cost extra.",
  },
]

export function FaqAccordion({
  eyebrow = "FAQ",
  heading = "Questions, answered",
  supportText = "Can't find what you're looking for?",
  contactLink = { label: "Contact us", href: "/contact" },
  faqs = defaultFaqs,
  className,
}: FaqAccordionProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-[31px] leading-tight font-semibold tracking-tight text-foreground md:text-[39px]">
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {supportText}{" "}
              <a
                href={contactLink.href}
                className="font-medium text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-primary"
              >
                {contactLink.label}
              </a>
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
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
      </div>
    </section>
  )
}
