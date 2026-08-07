/**
 * footer-line.tsx
 * USE WHEN: The one-line sign-off — name, year, colophon note, and two or three text links
 *           over a thin top rule. Nothing else; the page has already said everything.
 * INDUSTRY FIT: portfolio. AVOID FOR: saas — products need multi-column footers with legal,
 *           docs, and status links; a one-liner reads as a personal site.
 * PAIRS WITH: contact-cta.tsx, hero-statement.tsx
 * DEPS: /lib/utils
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 */
import { cn } from "@/lib/utils"

export interface FooterLink {
  label: string
  href: string
}

export interface FooterLineProps {
  name?: string
  year?: string
  /** Small colophon note, e.g. the typeface credit. */
  colophon?: string
  links?: FooterLink[]
  className?: string
}

const defaultLinks: FooterLink[] = [
  { label: "Instagram", href: "https://instagram.com/annareyes.studio" },
  { label: "Are.na", href: "https://are.na/anna-reyes" },
  { label: "Read.cv", href: "https://read.cv/annareyes" },
]

export function FooterLine({
  name = "Anna Reyes",
  year = "© 2026",
  colophon = "Set in Archivo",
  links = defaultLinks,
  className,
}: FooterLineProps) {
  return (
    <footer className={cn("border-t border-border py-8 font-sans", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-2 px-6 text-sm">
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-muted-foreground tabular-nums">{year}</p>
        <p className="text-muted-foreground">{colophon}</p>
        <nav aria-label="Social links" className="ms-auto flex gap-x-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground underline-offset-4 transition-colors duration-150 hover:underline focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
