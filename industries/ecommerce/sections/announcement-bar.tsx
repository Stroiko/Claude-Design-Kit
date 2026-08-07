/**
 * announcement-bar.tsx
 * USE WHEN: A thin utility strip at the very top of the store — shipping threshold, delivery
 *           promise. Sits above the navbar; the only place the marquee effect is allowed.
 * INDUSTRY FIT: ecommerce. AVOID FOR: saas — an inverted announcement strip over a product
 *           catalog reads as a store, not a tool; portfolio — utility chrome breaks the
 *           full-bleed editorial opener.
 * PAIRS WITH: hero-product.tsx, featured-products.tsx
 * DEPS: /effects/marquee, /lib/utils
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Marquee } from "@/effects/marquee"
import { cn } from "@/lib/utils"

export interface AnnouncementBarProps {
  message?: string
  /**
   * When true the message scrolls via the marquee effect (DIRECTION.md allows it once,
   * here). When false, renders a single static centered line.
   */
  scrolling?: boolean
  className?: string
}

export function AnnouncementBar({
  message = "Free shipping over $75 — carbon-neutral delivery",
  scrolling = true,
  className,
}: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        "bg-foreground font-sans text-[13px] leading-none text-background",
        className
      )}
    >
      {scrolling ? (
        <Marquee
          repeat={6}
          className="p-0 py-2 [--duration:30s] [--gap:3rem]"
        >
          <span className="flex items-center gap-12 whitespace-nowrap">
            {message}
            <span aria-hidden="true" className="text-background/40">
              ·
            </span>
          </span>
        </Marquee>
      ) : (
        <p className="py-2 text-center">{message}</p>
      )}
    </div>
  )
}
