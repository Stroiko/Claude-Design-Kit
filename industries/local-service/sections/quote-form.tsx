/**
 * quote-form.tsx
 * USE WHEN: The page's quote request — name, phone, service, short description on a bordered
 *           panel. The hero's "Get a free quote" anchor points here (section id="quote").
 * INDUSTRY FIT: local-service. AVOID FOR: saas — software converts through signup, not a
 *           callback form; a "we'll call you" promise belongs to businesses with trucks.
 * PAIRS WITH: hero-promise.tsx, services-grid.tsx, faq-service.tsx
 * DEPS: /primitives/button, /primitives/input, /primitives/label, /primitives/select,
 *       /primitives/textarea, /lib/utils
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/primitives/select"
import { Textarea } from "@/primitives/textarea"

export interface QuoteFormProps {
  /** Anchor target for hero/nav quote CTAs. */
  id?: string
  heading?: string
  supportingLine?: string
  /** Options for the service select — keep in sync with services-grid.tsx. */
  services?: string[]
  submitLabel?: string
  /** Rendered as "Or call {display} — we answer." `href` must be a tel: link. */
  phone?: { display: string; href: string }
  /** Shown after submit. Wire a real handler via onSubmit; default just flips the state. */
  successHeading?: string
  successLine?: string
  /** Optional real submit handler (POST, email service). preventDefault is already called. */
  onSubmit?: (formData: FormData) => void
  className?: string
}

const defaultServices = [
  "Drain cleaning",
  "Water heaters",
  "Leak & pipe repair",
  "Fixture installation",
  "Sewer line service",
  "Emergency plumbing",
]

export function QuoteForm({
  id = "quote",
  heading = "Get a free quote",
  supportingLine = "Tell us what's going on and we'll call back with a flat quote — usually within the hour on weekdays.",
  services = defaultServices,
  submitLabel = "Request my quote",
  phone = { display: "(253) 555-0142", href: "tel:+12535550142" },
  successHeading = "Got it — we'll call you shortly.",
  successLine = "A plumber will look at your request and call back with a quote. If it's urgent, call us directly.",
  onSubmit,
  className,
}: QuoteFormProps) {
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(new FormData(event.currentTarget))
    setSubmitted(true)
  }

  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto w-full max-w-lg">
          <h2 className="text-[27px] leading-tight font-bold text-foreground md:text-[33px]">
            {heading}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {supportingLine}
          </p>

          <div className="mt-8 rounded-lg border bg-card p-6 md:p-8">
            {submitted ? (
              <div role="status">
                <p className="text-[21px] leading-tight font-bold text-foreground">
                  {successHeading}
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {successLine}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-name">Name</Label>
                  <Input
                    id="quote-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-phone">Phone</Label>
                  <Input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="tabular-nums"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-service">What do you need?</Label>
                  <Select name="service" required>
                    <SelectTrigger id="quote-service" className="w-full">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-description">
                    Briefly, what&rsquo;s going on?
                  </Label>
                  <Textarea
                    id="quote-description"
                    name="description"
                    rows={4}
                    placeholder="e.g. Water heater is 15 years old and the water smells metallic."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {submitLabel}
                </Button>
              </form>
            )}
          </div>

          <p className="mt-5 text-center text-foreground">
            Or call{" "}
            <a
              href={phone.href}
              className="font-semibold underline underline-offset-4 tabular-nums transition-colors duration-150 hover:text-muted-foreground"
            >
              {phone.display}
            </a>{" "}
            &mdash; we answer.
          </p>
        </div>
      </div>
    </section>
  )
}
