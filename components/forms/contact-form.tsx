/**
 * contact-form.tsx
 * USE WHEN: A page needs a straightforward "get in touch" form: name, email, message, one submit button.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: newsletter-signup.tsx, multi-step-form.tsx, footer-columns.tsx
 * DEPS: /primitives/input, /primitives/textarea, /primitives/label, /primitives/button, /lib/utils
 */
import * as React from "react"

import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { Textarea } from "@/primitives/textarea"
import { cn } from "@/lib/utils"

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface ContactFormProps {
  /** Native form handler — validate and set `errors` in the parent. */
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  /** Per-field error text; rendered under the field and wired via aria-describedby. */
  errors?: ContactFormErrors
  submitLabel?: string
  className?: string
}

export function ContactForm({
  onSubmit,
  errors = {},
  submitLabel = "Send message",
  className,
}: ContactFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex w-full max-w-lg flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
