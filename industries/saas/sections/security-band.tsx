/**
 * security-band.tsx
 * USE WHEN: The procurement checklist needs answering in one glance — a quiet compliance strip
 *           (SOC 2, GDPR, SSO, encryption) between heavier sections. States facts, sells nothing.
 * INDUSTRY FIT: saas. AVOID FOR: restaurant or portfolio sites — compliance badges are
 *           meaningless outside a software buying process and read as noise.
 * PAIRS WITH: stats-band.tsx, pricing-tiers.tsx, faq-accordion.tsx
 * DEPS: /lib/utils, lucide-react
 */
import { Globe, KeyRound, Lock, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SecurityItem {
  Icon: React.ElementType
  label: string
  /** One factual line — what it is, not what could go wrong. */
  detail: string
}

export interface SecurityBandProps {
  heading?: string
  /** Optional line under the heading. */
  supportText?: string
  /** 3-4 items. Keep details factual; no fear-based copy. */
  items?: SecurityItem[]
  className?: string
}

const defaultItems: SecurityItem[] = [
  {
    Icon: ShieldCheck,
    label: "SOC 2 Type II",
    detail: "Audited annually; report available under NDA.",
  },
  {
    Icon: Globe,
    label: "GDPR",
    detail: "DPA included; EU data residency available.",
  },
  {
    Icon: KeyRound,
    label: "SSO / SAML",
    detail: "SAML 2.0 and SCIM provisioning on the Scale plan.",
  },
  {
    Icon: Lock,
    label: "Encryption",
    detail: "AES-256 at rest, TLS 1.3 in transit.",
  },
]

export function SecurityBand({
  heading = "Built to pass your security review",
  supportText = "The controls your procurement team will ask about, documented and audited.",
  items = defaultItems,
  className,
}: SecurityBandProps) {
  return (
    <section className={cn("border-y border-border py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {heading}
          </h2>
          {supportText ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {supportText}
            </p>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 rounded-lg border border-border p-5"
            >
              <item.Icon
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
