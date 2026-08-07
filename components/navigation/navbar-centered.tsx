/**
 * navbar-centered.tsx
 * USE WHEN: The brand should anchor the page center — links split evenly to its left and right on desktop, disclosure menu on mobile.
 * INDUSTRY FIT: all. AVOID FOR: - (needs 4+ links to feel balanced; with fewer, prefer navbar-simple.tsx)
 * PAIRS WITH: navbar-simple.tsx, footer-columns.tsx, footer-minimal.tsx
 * DEPS: /primitives/button, /lib/utils, lucide-react
 */
"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface NavbarCenteredLink {
  label: string
  href: string
}

export interface NavbarCenteredProps {
  /** Brand mark — an <a> wrapping a logo image or wordmark. Rendered dead-center on desktop. */
  logo: React.ReactNode
  /** Split in half: first half renders left of the logo, second half right. */
  links: NavbarCenteredLink[]
  /** Optional CTA; renders at the far right on desktop and at the bottom of the mobile menu. */
  cta?: NavbarCenteredLink
  className?: string
}

function NavLinkItem({ link }: { link: NavbarCenteredLink }) {
  return (
    <li>
      <a
        href={link.href}
        className="text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {link.label}
      </a>
    </li>
  )
}

export function NavbarCentered({ logo, links, cta, className }: NavbarCenteredProps) {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()

  const midpoint = Math.ceil(links.length / 2)
  const leftLinks = links.slice(0, midpoint)
  const rightLinks = links.slice(midpoint)

  return (
    <header className={cn("w-full border-b border-border bg-background", className)}>
      {/* Desktop: three balanced tracks keep the logo optically centered */}
      <nav
        aria-label="Main"
        className="mx-auto hidden h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 md:grid"
      >
        <ul className="flex items-center justify-end gap-8">
          {leftLinks.map((link) => (
            <NavLinkItem key={link.href} link={link} />
          ))}
        </ul>

        <div className="flex items-center justify-center">{logo}</div>

        <div className="flex items-center justify-start gap-8">
          <ul className="flex items-center gap-8">
            {rightLinks.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}
          </ul>
          {cta ? (
            <Button asChild size="sm" className="ml-auto">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          ) : null}
        </div>
      </nav>

      {/* Mobile: logo left, disclosure trigger right */}
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between px-4 md:hidden"
      >
        <div className="flex items-center">{logo}</div>
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-opacity duration-150 ease-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div id={menuId} hidden={!open} className="border-t border-border md:hidden">
        <ul className="flex flex-col gap-1 px-4 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          {cta ? (
            <li className="pt-2">
              <Button asChild className="w-full">
                <a href={cta.href}>{cta.label}</a>
              </Button>
            </li>
          ) : null}
        </ul>
      </div>
    </header>
  )
}
