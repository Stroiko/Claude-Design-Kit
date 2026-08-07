/**
 * pricing-table.tsx
 * USE WHEN: The site sells 2-3 named plans or packages and needs side-by-side tier cards with feature lists.
 * INDUSTRY FIT: all. AVOID FOR: quote-only businesses (custom construction, litigation) — a "request a quote" CTA fits better than fake tiers.
 * PAIRS WITH: comparison-table.tsx, stats-row.tsx, contact-form.tsx
 * DEPS: /primitives/card, /primitives/button, /primitives/badge, /lib/utils, lucide-react
 */
import * as React from "react"
import { Check } from "lucide-react"

import { Badge } from "@/primitives/badge"
import { Button } from "@/primitives/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { cn } from "@/lib/utils"

export interface PricingTier {
  name: string
  /** Formatted price: "$29", "$1,200", "Free". */
  price: string
  /** Billing cadence or unit: "/month", "/project", "one-time". */
  period?: string
  description: string
  features: string[]
  cta: {
    label: string
    href: string
  }
  /** Marks the recommended tier: badge + emphasized border. */
  popular?: boolean
}

export interface PricingTableProps {
  tiers: PricingTier[]
  className?: string
}

export function PricingTable({ tiers, className }: PricingTableProps) {
  return (
    <div
      className={cn(
        "grid items-stretch gap-6",
        tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        className
      )}
    >
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={cn(
            "relative h-full",
            tier.popular && "border-primary shadow-md"
          )}
        >
          {tier.popular ? (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              Most popular
            </Badge>
          ) : null}

          <CardHeader>
            <CardTitle className="text-lg">{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                {tier.price}
              </span>
              {tier.period ? (
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              ) : null}
            </p>
          </CardHeader>

          <CardContent className="flex-1">
            <ul className="flex flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              asChild
              variant={tier.popular ? "default" : "outline"}
              className="w-full"
            >
              <a href={tier.cta.href}>{tier.cta.label}</a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
