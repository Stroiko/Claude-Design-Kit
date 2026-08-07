/**
 * scene-footer.tsx
 * USE WHEN: The quiet close after the credits — a minimal one-line footer with the project
 *           name, year, one line of microcopy, and 2–3 text links under a thin top rule.
 *           Completely static: the show is over, nothing moves here.
 * INDUSTRY FIT: immersive. AVOID FOR: every other industry (motion budgets forbid it).
 * PAIRS WITH: credits-contact.tsx, manifesto-statement.tsx
 * DEPS: /lib/utils
 * NOTE: Display/body fonts come from the commitment tokens --font-display/--font-body
 *       (each project declares its own fonts + Google Fonts import — see ../DIRECTION.md). Bone and muted only — the signal color never appears down here
 *       (DIRECTION.md two-role rule).
 */
import { cn } from "@/lib/utils"

export interface SceneFooterProps {
  /** Project or artist name, small display-type wordmark. */
  name?: string
  /** Copyright year. */
  year?: string
  /** One line of microcopy after the name. Keep it in character. */
  microcopy?: string
  /** 2–3 text links. More belongs on a different kind of site. */
  links?: Array<{ label: string; href: string }>
  className?: string
}

const DEFAULT_LINKS = [
  { label: "Listen", href: "#record" },
  { label: "Instagram", href: "https://instagram.com/velanox" },
  { label: "Press kit", href: "mailto:press@velanox.live" },
]

export function SceneFooter({
  name = "VELA NOX",
  year = "2026",
  microcopy = "Made loud in Tromsø",
  links = DEFAULT_LINKS,
  className,
}: SceneFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 px-6 py-8 md:px-12">
        <p className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          <span className="font-(family-name:--font-display) text-foreground">{name}</span>
          <span className="ml-3">© {year}</span>
          <span className="ml-3">— {microcopy}</span>
        </p>
        <nav aria-label="Footer" className="flex items-baseline gap-x-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-(family-name:--font-body) text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
