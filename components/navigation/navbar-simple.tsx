/**
 * navbar-simple.tsx
 * USE WHEN: A standard top bar is needed: logo left, links inline, one CTA right, collapsing to a disclosure menu on mobile.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: navbar-centered.tsx, footer-columns.tsx, footer-minimal.tsx
 * DEPS: /primitives/button, /lib/utils, lucide-react
 */
"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface NavbarLink {
  label: string
  href: string
}

export interface NavbarSimpleProps {
  /** Brand mark — an <a> wrapping a logo image or wordmark. */
  logo: React.ReactNode
  links: NavbarLink[]
  cta: NavbarLink
  className?: string
}

export function NavbarSimple({ logo, links, cta, className }: NavbarSimpleProps) {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()

  return (
    <header
      className={cn(
        "w-full border-b border-border bg-background",
        className
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6"
      >
        <div className="flex shrink-0 items-center">{logo}</div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <a href={cta.href}>{cta.label}</a>
          </Button>

          {/* Mobile disclosure trigger */}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-opacity duration-150 ease-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
          <li className="pt-2">
            <Button asChild className="w-full">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
