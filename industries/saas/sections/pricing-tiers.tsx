/**
 * pricing-tiers.tsx
 * USE WHEN: The pricing section — three tiers on cards, the recommended tier lifted with a
 *           magic-card spotlight and a "Most popular" badge, optional monthly/annual toggle.
 * INDUSTRY FIT: saas. AVOID FOR: legal or medical sites — package-tier pricing signals
 *           self-serve software; consultative services quote engagements instead.
 * PAIRS WITH: features-rows.tsx, stats-band.tsx, cta-simple.tsx
 * DEPS: /primitives/card, /primitives/button, /primitives/badge, /primitives/tabs, /effects/magic-card
 */
"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Tabs, TabsList, TabsTrigger } from "@/primitives/tabs"
import { MagicCard } from "@/effects/magic-card"

export type BillingPeriod = "monthly" | "annual"

export interface PricingTier {
  name: string
  description: string
  /** Already-formatted price per period, e.g. { monthly: "$29", annual: "$24" }. */
  price: Record<BillingPeriod, string>
  /** Suffix after the price, e.g. "per user / month". */
  priceNote?: string
  features: string[]
  cta: { label: string; href: string }
  /** The one recommended tier — gets the spotlight treatment and badge. */
  popular?: boolean
}

export interface PricingTiersProps {
  eyebrow?: string
  heading?: string
  description?: string
  tiers?: PricingTier[]
  /** Show the monthly/annual toggle. Set false for single-price products. */
  showBillingToggle?: boolean
  className?: string
}

const defaultTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For side projects and small teams finding their footing.",
    price: { monthly: "$0", annual: "$0" },
    priceNote: "per user / month",
    features: [
      "Up to 5 users",
      "100 deploys per month",
      "Canary rollouts on one service",
      "Community support",
    ],
    cta: { label: "Start for free", href: "/signup" },
  },
  {
    name: "Team",
    description: "For teams shipping to production several times a day.",
    price: { monthly: "$29", annual: "$24" },
    priceNote: "per user / month",
    features: [
      "Unlimited users and deploys",
      "Canary rollouts on every service",
      "Automatic rollback windows",
      "Deploy policies and approvals",
      "Slack and PagerDuty integration",
    ],
    cta: { label: "Start 14-day trial", href: "/signup?plan=team" },
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For orgs with compliance, SSO, and audit requirements.",
    price: { monthly: "Custom", annual: "Custom" },
    features: [
      "Everything in Team",
      "SAML SSO and SCIM provisioning",
      "SOC 2 evidence exports",
      "Dedicated support with SLAs",
      "Self-hosted runner option",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
]

function TierCard({
  tier,
  billing,
}: {
  tier: PricingTier
  billing: BillingPeriod
}) {
  return (
    <Card
      className={cn(
        "h-full gap-0",
        tier.popular && "border-0 bg-transparent shadow-none"
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg">{tier.name}</CardTitle>
        <CardDescription className="min-h-10">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 flex flex-1 flex-col">
        <p className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
            {tier.price[billing]}
          </span>
          {tier.priceNote ? (
            <span className="text-sm text-muted-foreground">
              {tier.priceNote}
            </span>
          ) : null}
        </p>
        {billing === "annual" && tier.priceNote ? (
          <p className="mt-1 text-xs text-muted-foreground">billed annually</p>
        ) : null}
        <ul className="mt-8 flex flex-col gap-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-primary"
              />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-8">
        <Button
          asChild
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
        >
          <a href={tier.cta.href}>{tier.cta.label}</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function PricingTiers({
  eyebrow = "Pricing",
  heading = "Priced for how often you ship",
  description = "Every plan includes unlimited environments and rollbacks. Upgrade when the team, not the bill, grows.",
  tiers = defaultTiers,
  showBillingToggle = true,
  className,
}: PricingTiersProps) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly")

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[31px] leading-tight font-semibold tracking-tight text-foreground md:text-[39px]">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {showBillingToggle ? (
          <Tabs
            value={billing}
            onValueChange={(value) => setBilling(value as BillingPeriod)}
            className="mt-10"
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual — save 17%</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : null}

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map((tier) =>
            tier.popular ? (
              <div key={tier.name} className="relative">
                <Badge className="absolute -top-3 left-1/2 z-50 -translate-x-1/2">
                  Most popular
                </Badge>
                <MagicCard
                  className="h-full rounded-xl"
                  gradientFrom="var(--color-primary)"
                  gradientTo="var(--color-border)"
                  gradientColor="var(--color-muted)"
                  gradientOpacity={0.5}
                >
                  <TierCard tier={tier} billing={billing} />
                </MagicCard>
              </div>
            ) : (
              <TierCard key={tier.name} tier={tier} billing={billing} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
