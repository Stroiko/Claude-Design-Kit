/**
 * multi-step-form.tsx
 * USE WHEN: An intake flow is long enough to chunk: contact info, then details, then a confirm step, with a progress indicator.
 * INDUSTRY FIT: all. AVOID FOR: forms with 5 or fewer fields — a single contact-form.tsx converts better.
 * PAIRS WITH: contact-form.tsx, newsletter-signup.tsx
 * DEPS: /primitives/input, /primitives/textarea, /primitives/label, /primitives/button, /lib/utils
 */
"use client"

import * as React from "react"

import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { Textarea } from "@/primitives/textarea"
import { cn } from "@/lib/utils"

export interface MultiStepFormValues {
  name: string
  email: string
  topic: string
  details: string
}

export interface MultiStepFormProps {
  /** Called with all collected values when the confirm step is submitted. */
  onComplete?: (values: MultiStepFormValues) => void
  /** Step labels for the progress indicator. */
  stepLabels?: [string, string, string]
  className?: string
}

const emptyValues: MultiStepFormValues = {
  name: "",
  email: "",
  topic: "",
  details: "",
}

export function MultiStepForm({
  onComplete,
  stepLabels = ["Contact", "Details", "Confirm"],
  className,
}: MultiStepFormProps) {
  const [step, setStep] = React.useState(0)
  const [values, setValues] = React.useState<MultiStepFormValues>(emptyValues)
  const totalSteps = stepLabels.length

  function update<K extends keyof MultiStepFormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
    } else {
      onComplete?.(values)
    }
  }

  return (
    <div className={cn("w-full max-w-lg", className)}>
      {/* Progress indicator */}
      <ol
        aria-label="Form progress"
        className="mb-8 flex items-center gap-2"
      >
        {stepLabels.map((label, index) => {
          const state =
            index < step ? "done" : index === step ? "current" : "upcoming"
          return (
            <li
              key={label}
              aria-current={state === "current" ? "step" : undefined}
              className="flex flex-1 flex-col gap-2"
            >
              <span
                className={cn(
                  "h-1 w-full rounded-full transition-opacity duration-300 ease-out",
                  state === "upcoming" ? "bg-border" : "bg-primary",
                  state === "current" && "opacity-100",
                  state === "done" && "opacity-60"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  state === "current" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {index + 1}. {label}
              </span>
            </li>
          )
        })}
      </ol>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {step === 0 ? (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msf-name">Name</Label>
              <Input
                id="msf-name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msf-email">Email</Label>
              <Input
                id="msf-email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msf-topic">What is this about?</Label>
              <Input
                id="msf-topic"
                type="text"
                required
                value={values.topic}
                onChange={(e) => update("topic", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msf-details">Anything else we should know?</Label>
              <Textarea
                id="msf-details"
                rows={4}
                value={values.details}
                onChange={(e) => update("details", e.target.value)}
              />
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <dl className="flex flex-col gap-4 rounded-lg border border-border bg-muted p-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd className="mt-1 text-foreground">{values.name || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd className="mt-1 text-foreground">{values.email || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Topic</dt>
              <dd className="mt-1 text-foreground">{values.topic || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Details</dt>
              <dd className="mt-1 whitespace-pre-wrap text-foreground">
                {values.details || "—"}
              </dd>
            </div>
          </dl>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button type="submit">
            {step < totalSteps - 1 ? "Next" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
