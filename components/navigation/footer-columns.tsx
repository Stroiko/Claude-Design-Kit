/**
 * footer-columns.tsx
 * USE WHEN: A full site footer is needed: brand blurb beside 3-4 columns of grouped links, with a legal row underneath.
 * INDUSTRY FIT: all. AVOID FOR: single-page microsites with few links — use footer-minimal.tsx instead.
 * PAIRS WITH: footer-minimal.tsx, navbar-simple.tsx, newsletter-signup.tsx
 * DEPS: /lib/utils
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterColumnsProps {
  /** Brand mark — an <a> wrapping a logo image or wordmark. */
  logo: React.ReactNode
  /** One or two sentences about the business. */
  blurb: string
  /** 3-4 columns of grouped links. */
  columns: FooterColumn[]
  /** e.g. "© 2026 Acme Co. All rights reserved." */
  legal: string
  /** Privacy, Terms, etc. Rendered in the legal row. */
  legalLinks?: FooterLink[]
  className?: string
}

export function FooterColumns({
  logo,
  blurb,
  columns,
  legal,
  legalLinks = [],
  className,
}: FooterColumnsProps) {
  return (
    <footer className={cn("w-full border-t border-border bg-background", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center">{logo}</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {blurb}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{legal}</p>
          {legalLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
