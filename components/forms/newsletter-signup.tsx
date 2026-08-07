/**
 * newsletter-signup.tsx
 * USE WHEN: A compact inline email capture is needed — footer strips, blog sidebars, end-of-article CTAs.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: footer-columns.tsx, footer-minimal.tsx, contact-form.tsx
 * DEPS: /primitives/input, /primitives/label, /primitives/button, /lib/utils
 */
"use client"

import * as React from "react"

import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { cn } from "@/lib/utils"

export interface NewsletterSignupProps {
  /** Called with the submitted email. Await it before the success state shows. */
  onSubscribe?: (email: string) => void | Promise<void>
  /** Visually-hidden label text for the email field. */
  label?: string
  placeholder?: string
  buttonLabel?: string
  successMessage?: string
  className?: string
}

export function NewsletterSignup({
  onSubscribe,
  label = "Email address",
  placeholder = "you@example.com",
  buttonLabel = "Subscribe",
  successMessage = "You're subscribed — check your inbox to confirm.",
  className,
}: NewsletterSignupProps) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle")
  const inputId = React.useId()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")
    if (typeof email !== "string" || email.length === 0) return
    setStatus("submitting")
    await onSubscribe?.(email)
    setStatus("success")
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className={cn("text-sm font-medium text-foreground", className)}
      >
        {successMessage}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full max-w-md items-end gap-2", className)}
    >
      <div className="flex-1">
        <Label htmlFor={inputId} className="sr-only">
          {label}
        </Label>
        <Input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={placeholder}
        />
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {buttonLabel}
      </Button>
    </form>
  )
}
