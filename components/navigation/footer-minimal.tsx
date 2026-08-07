/**
 * footer-minimal.tsx
 * USE WHEN: A quiet, single-row footer is enough: brand, a few links, social icons — no link columns.
 * INDUSTRY FIT: all. AVOID FOR: large multi-section sites where users expect a full sitemap footer — use footer-columns.tsx.
 * PAIRS WITH: footer-columns.tsx, navbar-simple.tsx, navbar-centered.tsx
 * DEPS: /lib/utils, lucide-react
 */
import * as React from "react"
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

import { cn } from "@/lib/utils"

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "youtube"

const socialIcons: Record<SocialPlatform, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  twitter: { icon: Twitter, label: "Twitter" },
  github: { icon: Github, label: "GitHub" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  instagram: { icon: Instagram, label: "Instagram" },
  facebook: { icon: Facebook, label: "Facebook" },
  youtube: { icon: Youtube, label: "YouTube" },
}

export interface FooterMinimalLink {
  label: string
  href: string
}

export interface FooterMinimalSocial {
  platform: SocialPlatform
  href: string
}

export interface FooterMinimalProps {
  /** Brand mark — an <a> wrapping a logo image or wordmark, or plain text. */
  brand: React.ReactNode
  links?: FooterMinimalLink[]
  socials?: FooterMinimalSocial[]
  className?: string
}

export function FooterMinimal({
  brand,
  links = [],
  socials = [],
  className,
}: FooterMinimalProps) {
  return (
    <footer className={cn("w-full border-t border-border bg-background", className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
        <div className="flex items-center text-sm text-foreground">{brand}</div>

        {links.length > 0 ? (
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {links.map((link) => (
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
        ) : null}

        {socials.length > 0 ? (
          <ul className="flex items-center gap-2">
            {socials.map((social) => {
              const { icon: Icon, label } = socialIcons[social.platform]
              return (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </footer>
  )
}
