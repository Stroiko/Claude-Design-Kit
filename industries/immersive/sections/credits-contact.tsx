/**
 * credits-contact.tsx
 * USE WHEN: The film-credit contact scene near the end of the page — a centered, STATIC
 *           stack of role/name pairs (rolling-credits layout, never auto-scrolling:
 *           nothing loops except the atmosphere), closing on a huge display-type contact CTA
 *           (mailto) and one muted management/press line.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: manifesto-statement.tsx, image-scene.tsx, scene-footer.tsx, split-text-title.tsx
 * DEPS: /lib/utils, ./split-text-title
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). The CTA reveal is composed from split-text-title (mode "once");
 *       reduced motion renders the finished title immediately. The CTA is the page's
 *       primary-CTA signal role (DIRECTION.md) — the credits themselves stay bone/muted.
 */
"use client"

import { cn } from "@/lib/utils"
import { SplitTextTitle } from "@/industries/immersive/sections/split-text-title"

export interface CreditEntry {
  /** The role, film-credit caption style ("Mixed", "Live visuals"…). */
  role: string
  /** The person, studio, or place credited. */
  name: string
}

export interface CreditsContactProps {
  /** Film-credit label above the credits. */
  label?: string
  /** Role/name pairs, rendered as a centered static stack — keep it to 4–8 entries. */
  credits?: CreditEntry[]
  /** The huge contact CTA. `email` becomes a mailto link. */
  cta?: { label: string; email: string }
  /** Muted management/press contacts under the CTA. 1–2 entries. */
  contacts?: Array<{ label: string; email: string }>
  className?: string
}

const DEFAULT_CREDITS: CreditEntry[] = [
  { role: "Written, performed & produced", name: "Vela Nox" },
  { role: "Mixed", name: "Mari Lindvik" },
  { role: "Mastered", name: "Jonas Eide, Halvorsen Mastering" },
  { role: "Dome recordings", name: "Tromsø Planetarium, sessions I–IV" },
  { role: "Artwork & light design", name: "Studio Overvintre" },
  { role: "Live visuals", name: "Nordlys Collective" },
]

export function CreditsContact({
  label = "Credits",
  credits = DEFAULT_CREDITS,
  cta = { label: "BOOK THE TOUR", email: "tour@velanox.live" },
  contacts = [
    { label: "Management", email: "mgmt@velanox.live" },
    { label: "Press", email: "press@velanox.live" },
  ],
  className,
}: CreditsContactProps) {
  return (
    <section className={cn("bg-background py-24 md:py-40", className)}>
      {/* Rolling-credits layout: the one scene where centered is the correct grid. */}
      <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
        <p className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>

        {/* Static stack — the viewer scrolls the credits; the credits never scroll themselves. */}
        <dl className="mt-14 space-y-10">
          {credits.map((credit) => (
            <div key={`${credit.role}-${credit.name}`}>
              <dt className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {credit.role}
              </dt>
              <dd className="mt-2 font-(family-name:--font-body) text-lg font-semibold text-foreground md:text-xl">
                {credit.name}
              </dd>
            </div>
          ))}
        </dl>

        {/* The contact CTA — the page's primary-CTA signal role. A real link, huge type. */}
        <div className="mt-24 md:mt-32">
          <a
            href={`mailto:${cta.email}`}
            className="inline-block transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ring"
          >
            <SplitTextTitle
              text={cta.label}
              as="h2"
              mode="once"
              className="text-primary"
            />
          </a>
          <p className="mt-8 font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {contacts.map((contact, index) => (
              <span key={contact.email}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                {contact.label} —{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="normal-case underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {contact.email}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
