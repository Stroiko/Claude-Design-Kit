/**
 * clients-line.tsx
 * USE WHEN: Naming past clients without ceremony — one muted paragraph of names separated by
 *           middle dots under a small index label. The quiet alternative to a logo wall.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — buyers scanning for social proof expect logo
 *           marks (logos-marquee), not a typeset list of names.
 * PAIRS WITH: work-index.tsx, about-block.tsx, contact-cta.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface ClientsLineProps {
  label?: string
  clients?: string[]
  className?: string
}

const defaultClients = [
  "Fonda Nube",
  "Editorial Antena",
  "Ruido Blanco",
  "La Cigarra",
  "Grupo Terral",
  "Hotel Marea",
  "Taller Sur",
  "Café Pan y Media",
  "Estudio Vertical",
]

export function ClientsLine({
  label = "SELECTED CLIENTS 2018–2026",
  clients = defaultClients,
  className,
}: ClientsLineProps) {
  return (
    <section className={cn("py-20 font-sans md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </h2>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
          {clients.join(" · ")}
        </p>
      </div>
    </section>
  )
}
