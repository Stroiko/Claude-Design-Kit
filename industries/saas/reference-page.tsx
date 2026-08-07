/**
 * reference-page.tsx
 * THE canonical assembly example for the SaaS direction. Read this file to see how the
 * sections in ./sections snap together into one landing page telling one story: "Relay"
 * (relay.dev), a fictional deploy/release-automation product. Every section receives
 * explicit props so the copy stays consistent — same product, same three core features
 * (canary rollouts, automatic rollback, deploy policies), same tiers (Starter/Pro/Scale).
 * Copy the composition pattern, swap the data.
 *
 * USE WHEN: Building a full SaaS landing page — start from this assembly, not from scratch.
 * INDUSTRY FIT: saas. AVOID FOR: other industries — follow their own DIRECTION.md and sections.
 * PAIRS WITH: every file in ./sections, /components/navigation
 * DEPS: /components/navigation/navbar-simple, /components/navigation/footer-columns,
 *       ./sections/* (hero-centered, logos-marquee, features-bento, features-rows,
 *       how-it-works-steps, integrations-beam, stats-band, testimonials-grid,
 *       pricing-tiers, faq-accordion, cta-simple)
 */
import { type ReactNode } from "react"
import {
  Activity,
  GitBranch,
  ShieldCheck,
  TimerReset,
  Webhook,
} from "lucide-react"

import { NavbarSimple } from "@/components/navigation/navbar-simple"
import { FooterColumns } from "@/components/navigation/footer-columns"
import { HeroCentered } from "@/industries/saas/sections/hero-centered"
import { LogosMarquee } from "@/industries/saas/sections/logos-marquee"
import {
  FeaturesBento,
  type BentoFeature,
} from "@/industries/saas/sections/features-bento"
import {
  FeaturesRows,
  type FeatureRow,
} from "@/industries/saas/sections/features-rows"
import { HowItWorksSteps } from "@/industries/saas/sections/how-it-works-steps"
import { IntegrationsBeam } from "@/industries/saas/sections/integrations-beam"
import { StatsBand } from "@/industries/saas/sections/stats-band"
import {
  TestimonialsGrid,
  type Testimonial,
} from "@/industries/saas/sections/testimonials-grid"
import {
  PricingTiers,
  type PricingTier,
} from "@/industries/saas/sections/pricing-tiers"
import {
  FaqAccordion,
  type FaqItem,
} from "@/industries/saas/sections/faq-accordion"
import { CtaSimple } from "@/industries/saas/sections/cta-simple"

/* ------------------------------------------------------------------ */
/* Brand                                                              */
/* ------------------------------------------------------------------ */

const logo = (
  <a
    href="/"
    aria-label="Relay home"
    className="font-mono text-lg font-semibold tracking-tight text-foreground"
  >
    relay<span className="text-muted-foreground">.dev</span>
  </a>
)

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
]

/* ------------------------------------------------------------------ */
/* Social proof: customer wordmarks as plain text nodes               */
/* ------------------------------------------------------------------ */

const customerLogos: ReactNode[] = [
  "Northbeam Systems",
  "Kilnworks",
  "Ferrous Labs",
  "Opsline",
  "Quarry Cloud",
  "Halyard",
  "Vantablue",
  "Cratehaus",
].map((name) => (
  <span
    key={name}
    className="font-mono text-lg font-semibold whitespace-nowrap text-muted-foreground"
  >
    {name}
  </span>
))

/* ------------------------------------------------------------------ */
/* Features: three core capabilities, echoed everywhere below         */
/* ------------------------------------------------------------------ */

const bentoFeatures: BentoFeature[] = [
  {
    Icon: GitBranch,
    name: "Canary rollouts",
    description:
      "Route 1% of traffic to the new build, watch real error rates, then promote or roll back automatically.",
    className: "col-span-3 lg:col-span-2",
    href: "/docs/canary-rollouts",
    cta: "How canaries work",
  },
  {
    Icon: TimerReset,
    name: "Automatic rollback",
    description:
      "Every deploy keeps a warm previous version. Relay restores it in under ten seconds when a check fails.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/rollback",
    cta: "See rollback windows",
  },
  {
    Icon: ShieldCheck,
    name: "Deploy policies",
    description:
      "Block releases missing approvals, migrations, or a passing suite — enforced in the pipeline, not a wiki page.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/policies",
    cta: "Browse policies",
  },
  {
    Icon: Activity,
    name: "Release health",
    description:
      "Latency, error rate, and saturation for every service, diffed against the version that came before.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/release-health",
    cta: "Explore metrics",
  },
  {
    Icon: Webhook,
    name: "Fits your pipeline",
    description:
      "A GitHub check, a CLI, and a webhook API. Relay slots into the CI you already run — no migration project.",
    className: "col-span-3 lg:col-span-1",
    href: "/docs/integrations",
    cta: "View the API",
  },
]

const featureRows: FeatureRow[] = [
  {
    eyebrow: "Automatic rollback",
    heading: "Releases that check their own vitals",
    description:
      "Define what healthy means once — p99 latency, error budget, queue depth — and every canary is measured against it before it takes full traffic.",
    bullets: [
      "Health checks pulled from your existing Prometheus or Datadog metrics",
      "Automatic rollback when a canary breaches its error budget",
      "Deploy windows that respect on-call schedules and freeze periods",
    ],
    imageAlt:
      "Relay health-check panel comparing p99 latency between the current and previous release",
  },
  {
    eyebrow: "Deploy policies",
    heading: "Every release answers who, what, and why",
    description:
      "Relay records the commit range, the approver, the policies that ran, and the traffic curve for every deploy — so the postmortem writes half of itself.",
    bullets: [
      "Immutable release log exportable for SOC 2 evidence",
      "Slack and PagerDuty threads linked to the exact deploy",
      "Diff view between any two releases, config included",
    ],
    imageAlt:
      "Relay audit log listing releases with approvers, commit ranges, and policy results",
  },
]

const steps = [
  {
    title: "Connect your pipeline",
    description:
      "Install the GitHub app or drop the Relay CLI into your existing CI. First deploy tracked in under ten minutes.",
  },
  {
    title: "Define healthy",
    description:
      "Point Relay at the metrics you already collect and set the thresholds a release must hold before it takes full traffic.",
  },
  {
    title: "Ship on autopilot",
    description:
      "Merges roll out as canaries, promote themselves when checks pass, and roll back on their own when they don't.",
  },
]

/* ------------------------------------------------------------------ */
/* Proof: numbers and quotes                                          */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "99.99%", label: "Deploy pipeline uptime, trailing 12 months" },
  { value: "41s", label: "Median time from breach to rollback" },
  { value: "2.4M", label: "Production deploys shipped through Relay" },
  { value: "0", label: "Config changes needed to your CI" },
]

const testimonials: Testimonial[] = [
  {
    quote:
      "We went from dreading Friday deploys to not noticing them. Relay caught a bad migration at 1% traffic and rolled it back before the first alert even fired.",
    name: "Mara Okafor",
    role: "VP of Engineering",
    company: "Opsline",
    featured: true,
    metric: { value: "41s", label: "from error-budget breach to rollback" },
  },
  {
    quote:
      "The audit log paid for itself during our SOC 2 audit. Every release already had the approver, the checks, and the traffic curve attached.",
    name: "Priya Natarajan",
    role: "Platform Lead",
    company: "Halyard",
  },
  {
    quote:
      "We plugged Relay into our existing GitHub Actions in an afternoon. No migration project, no new deploy tool to learn.",
    name: "Dan Reyes",
    role: "Staff Engineer",
    company: "Ferrous Labs",
  },
  {
    quote:
      "Canary rollouts used to be something we admired in other teams' conference talks. Now every merge to main gets one automatically.",
    name: "Elin Marsh",
    role: "Head of Infrastructure",
    company: "Northbeam Systems",
  },
  {
    quote:
      "On-call pages dropped by half in our first quarter. Bad releases just stop themselves now.",
    name: "Tomás Rivera",
    role: "Engineering Manager",
    company: "Kilnworks",
  },
]

/* ------------------------------------------------------------------ */
/* Commercials: tiers and FAQs                                        */
/* ------------------------------------------------------------------ */

const tiers: PricingTier[] = [
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
    name: "Pro",
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
    cta: { label: "Start 14-day trial", href: "/signup?plan=pro" },
    popular: true,
  },
  {
    name: "Scale",
    description: "For orgs with compliance, SSO, and audit requirements.",
    price: { monthly: "Custom", annual: "Custom" },
    features: [
      "Everything in Pro",
      "SAML SSO and SCIM provisioning",
      "SOC 2 evidence exports",
      "Self-hosted runners",
      "Dedicated support with SLAs",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
]

const faqs: FaqItem[] = [
  {
    question: "Can I change plans in the middle of a billing cycle?",
    answer:
      "Yes. Upgrades apply immediately and we prorate the difference on your next invoice. Downgrades take effect at the next renewal, and you keep the higher plan's features until then.",
  },
  {
    question: "What happens when my Pro trial ends?",
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
]

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API reference", href: "/docs/api" },
      { label: "Security", href: "/security" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* The page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferencePage() {
  return (
    <div className="bg-background text-foreground">
      <NavbarSimple
        logo={logo}
        links={navLinks}
        cta={{ label: "Start deploying free", href: "/signup" }}
      />

      <main>
        <HeroCentered
          announcement={{
            text: "Introducing rollback windows — restore any deploy in one click",
            href: "/changelog",
          }}
          headline="Ship releases your on-call team can sleep through"
          subline="Relay stages every deploy behind health checks, canaries, and automatic rollback — so pushing to production on a Friday stops being a personality trait."
          primaryCta={{ label: "Start deploying free", href: "/signup" }}
          secondaryCta={{ label: "Read the docs", href: "/docs" }}
          screenshotAlt="Relay deploy dashboard showing a canary release at 25% traffic with all health checks passing"
        />

        <LogosMarquee
          label="Trusted by engineering teams shipping to production every day"
          logos={customerLogos}
        />

        <FeaturesBento
          eyebrow="Capabilities"
          heading="Everything between merge and steady-state"
          description="Relay covers the risky stretch of shipping software: the minutes after a deploy lands, when something is either fine or on fire."
          features={bentoFeatures}
        />

        <FeaturesRows rows={featureRows} />

        <HowItWorksSteps
          eyebrow="How it works"
          heading="From first install to unattended deploys"
          steps={steps}
        />

        <IntegrationsBeam
          eyebrow="Integrations"
          heading="Relay sits in the middle of the stack you already run"
          description="Deploys come in from your repo host, health signals come in from your observability stack, and updates go out to wherever your team reads them."
          productName="Relay"
        />

        <StatsBand stats={stats} highlightIndex={1} />

        <TestimonialsGrid
          eyebrow="Testimonials"
          heading="Teams that stopped babysitting deploys"
          testimonials={testimonials}
        />

        <PricingTiers
          eyebrow="Pricing"
          heading="Priced for how often you ship"
          description="Every plan includes unlimited environments and rollbacks. Upgrade when the team, not the bill, grows."
          tiers={tiers}
        />

        <FaqAccordion
          eyebrow="FAQ"
          heading="Questions, answered"
          supportText="Can't find what you're looking for?"
          contactLink={{ label: "Contact us", href: "/contact" }}
          faqs={faqs}
        />

        <CtaSimple
          heading="Your next deploy could be the boring kind"
          subtext="Connect a repo, ship a canary, and see a rollback you didn't have to run. Free for teams up to five."
          cta={{ label: "Start deploying free", href: "/signup" }}
        />
      </main>

      <FooterColumns
        logo={logo}
        blurb="Relay stages every deploy behind health checks, canaries, and automatic rollback. Built in Toronto by people who used to carry the pager."
        columns={footerColumns}
        legal="© 2026 Relay Systems, Inc. All rights reserved."
        legalLinks={[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "DPA", href: "/dpa" },
        ]}
      />
    </div>
  )
}
