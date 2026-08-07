/**
 * reservation-form.tsx
 * USE WHEN: The booking request section — date, time, party size, name, and phone inside a
 *           cream card framed by thin rules, with a terracotta submit and an in-place success
 *           state. Requests are confirmed by phone, so the number is always printed beneath.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — a table-booking form has no SaaS equivalent;
 *           product signups use email-first forms, not party sizes.
 * PAIRS WITH: menu-list.tsx, hours-location.tsx, hero-full-image.tsx
 * DEPS: /primitives/button, /primitives/input, /primitives/label, /primitives/select
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
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

export interface ReservationRequest {
  date: string
  time: string
  partySize: string
  name: string
  phone: string
}

export interface ReservationFormProps {
  eyebrow?: string
  heading?: string
  /** Seating times offered in the time select. */
  times?: string[]
  /** Party size options offered in the guests select. */
  partySizes?: string[]
  /** Printed beneath the submit button and echoed in the success note. */
  phoneNote?: string
  /** Called with the submitted values; the built-in success state shows regardless. */
  onSubmit?: (request: ReservationRequest) => void
  className?: string
}

export function ReservationForm({
  eyebrow = "reservations",
  heading = "Request a table",
  times = [
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm",
    "9:00 pm",
    "9:30 pm",
  ],
  partySizes = [
    "1 guest",
    "2 guests",
    "3 guests",
    "4 guests",
    "5 guests",
    "6 guests",
    "7 guests",
    "8 guests",
    "9 or more — call us",
  ],
  phoneNote = "or call (415) 555-0198",
  onSubmit,
  className,
}: ReservationFormProps) {
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.({
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      partySize: String(data.get("party-size") ?? ""),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
    })
    setSubmitted(true)
  }

  return (
    <section id="reservations" className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl border-y border-border bg-card px-6 py-12 md:px-12 md:py-14">
          <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-card-foreground md:text-[40px]">
            {heading}
          </h2>

          {submitted ? (
            <div role="status" className="mt-8">
              <p className="font-serif text-[23px] font-medium italic text-card-foreground">
                Thank you — your request is in.
              </p>
              <p className="mt-4 max-w-md text-[17px] leading-[1.7] text-muted-foreground">
                We confirm every table by phone, usually within a couple of
                hours. For same-day requests, call (415) 555-0198 and we will
                do our best to fit you by the fire.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="reservation-date">Date</Label>
                  <Input
                    id="reservation-date"
                    name="date"
                    type="date"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="reservation-time">Time</Label>
                  <Select name="time" required defaultValue={times[0]}>
                    <SelectTrigger id="reservation-time" className="w-full">
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="reservation-party">Guests</Label>
                  <Select
                    name="party-size"
                    required
                    defaultValue={partySizes[1] ?? partySizes[0]}
                  >
                    <SelectTrigger id="reservation-party" className="w-full">
                      <SelectValue placeholder="Party size" />
                    </SelectTrigger>
                    <SelectContent>
                      {partySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="reservation-name">Name</Label>
                  <Input
                    id="reservation-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="reservation-phone">Phone</Label>
                  <Input
                    id="reservation-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button type="submit" size="lg">
                  Request a table
                </Button>
                <p className="text-sm italic text-muted-foreground">
                  {phoneNote}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
