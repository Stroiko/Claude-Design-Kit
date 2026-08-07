/**
 * morph-gallery.tsx
 * USE WHEN: A thumbnail grid where clicking an item morphs it into its detail view while the surrounding grid yields and scatters out of the way. Portfolio galleries, case-study grids, product lightboxes.
 * INDUSTRY FIT: per DIRECTION.md motion budget only (immersive, portfolio, agency, ecommerce). AVOID FOR: industries whose budget excludes layout morphs; dense data grids.
 * PAIRS WITH: proximity-field, ink-bleed, bento-grid
 * DEPS: /lib/utils, motion
 */
"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export interface MorphGallerySpring {
  stiffness: number
  damping: number
  mass: number
}

export interface MorphGalleryProps<T> {
  items: T[]
  /** Thumbnail content. The gallery owns the cell chrome; this renders inside it. */
  renderThumb: (item: T) => React.ReactNode
  /** Detail-view content, rendered inside the morphing card. */
  renderDetail: (item: T) => React.ReactNode
  /** Stable unique id per item — also seeds the namespaced layoutId. */
  getId: (item: T) => string
  columns?: number
  /** Max sibling displacement while an item is open, in px. */
  scatterStrength?: number
  /** How sibling displacement falls off with distance from the opened item. */
  scatterFalloff?: "linear" | "gaussian"
  morphSpring?: MorphGallerySpring
  backdrop?: "blur" | "dim" | "none"
  closeOn?: ("click" | "escape" | "drag-down")[]
  onOpen?: (item: T) => void
  onClose?: (item: T) => void
  className?: string
}

const DEFAULT_SPRING: MorphGallerySpring = { stiffness: 300, damping: 30, mass: 0.8 }
const DEFAULT_CLOSE_ON: NonNullable<MorphGalleryProps<unknown>["closeOn"]> = ["click", "escape"]

// t is normalized so the nearest sibling is 0 (full strength) and the
// farthest is 1 — normalizing by raw distance instead would leave even
// adjacent cells deep in the falloff tail on small grids.
const SCATTER_FALLOFF: Record<NonNullable<MorphGalleryProps<unknown>["scatterFalloff"]>, (t: number) => number> = {
  linear: (t) => 1 - t,
  gaussian: (t) => Math.exp(-(t * t) / 0.5),
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared-element morph with sibling scatter: the clicked thumbnail becomes the
 * detail view (layoutId FLIP), and the rest of the grid springs outward like a
 * surface yielding to it, settling back on close. One item open at a time;
 * focus moves into the dialog and returns to the originating thumbnail.
 * Reduced motion: plain cross-fade, no morph, no scatter.
 *
 * @example
 * <MorphGallery
 *   items={projects}
 *   getId={(p) => p.slug}
 *   renderThumb={(p) => <img src={p.cover} alt={p.title} className="aspect-square w-full object-cover" />}
 *   renderDetail={(p) => (
 *     <article className="max-w-lg p-8">
 *       <img src={p.cover} alt="" className="aspect-video w-full object-cover" />
 *       <h2 className="mt-4 text-2xl font-semibold">{p.title}</h2>
 *       <p className="text-muted-foreground">{p.summary}</p>
 *     </article>
 *   )}
 * />
 *
 * @example Swipe-to-dismiss on touch-heavy layouts
 * <MorphGallery items={shots} getId={(s) => s.id} closeOn={["click", "escape", "drag-down"]}
 *   backdrop="blur" columns={4} renderThumb={...} renderDetail={...} />
 */
export function MorphGallery<T>({
  items,
  renderThumb,
  renderDetail,
  getId,
  columns = 3,
  scatterStrength = 60,
  scatterFalloff = "gaussian",
  morphSpring = DEFAULT_SPRING,
  backdrop = "dim",
  closeOn = DEFAULT_CLOSE_ON,
  onOpen,
  onClose,
  className,
}: MorphGalleryProps<T>) {
  const prefersReduced = useReducedMotion()
  // Namespace layoutIds per gallery instance so two galleries on one page
  // can never pair with each other's elements.
  const galleryId = useId()
  const layoutIdFor = (id: string) => `morph-${galleryId}-${id}`

  const [openId, setOpenId] = useState<string | null>(null)
  const openItem = openId !== null ? items.find((it) => getId(it) === openId) : undefined

  const gridRef = useRef<HTMLDivElement>(null)
  const cellEls = useRef(new Map<string, HTMLElement>())
  const thumbEls = useRef(new Map<string, HTMLButtonElement>())
  const centersRef = useRef(new Map<string, { x: number; y: number }>())
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastOpenedRef = useRef<string | null>(null)

  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      centersRef.current = new Map(
        [...cellEls.current].map(([id, el]) => [
          id,
          { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 },
        ])
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [items.length, columns])

  const open = (item: T) => {
    const id = getId(item)
    lastOpenedRef.current = id
    setOpenId(id)
    onOpenRef.current?.(item)
  }

  const close = () => {
    if (openItem === undefined) return
    const closing = openItem
    setOpenId(null)
    onCloseRef.current?.(closing)
    const thumb = lastOpenedRef.current !== null ? thumbEls.current.get(lastOpenedRef.current) : undefined
    thumb?.focus()
  }

  // Escape + focus management while the dialog is open.
  useEffect(() => {
    if (openId === null) return
    const dialog = dialogRef.current
    const first = dialog?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? dialog)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOn.includes("escape")) {
        e.stopPropagation()
        close()
        return
      }
      if (e.key !== "Tab" || !dialog) return
      // Trap focus: cycle within the dialog.
      const focusables = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId])

  // Scatter offsets: purely visual transforms, computed from cached centers.
  const scatterFor = (id: string): { x: number; y: number; delay: number } => {
    if (openId === null || id === openId || prefersReduced) return { x: 0, y: 0, delay: 0 }
    const origin = centersRef.current.get(openId)
    const center = centersRef.current.get(id)
    if (!origin || !center) return { x: 0, y: 0, delay: 0 }
    const dx = center.x - origin.x
    const dy = center.y - origin.y
    const d = Math.hypot(dx, dy)
    if (d === 0) return { x: 0, y: 0, delay: 0 }
    const siblingDistances = [...centersRef.current.entries()]
      .filter(([cid]) => cid !== openId)
      .map(([, c]) => Math.hypot(c.x - origin.x, c.y - origin.y))
    const minD = Math.min(...siblingDistances)
    const maxD = Math.max(...siblingDistances)
    const t = maxD > minD ? (d - minD) / (maxD - minD) : 0
    const f = SCATTER_FALLOFF[scatterFalloff](t)
    return { x: (dx / d) * f * scatterStrength, y: (dy / d) * f * scatterStrength, delay: t * 0.08 }
  }

  return (
    <LayoutGroup id={galleryId}>
      <div
        ref={gridRef}
        className={cn("relative grid gap-4", className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((item) => {
          const id = getId(item)
          const scatter = scatterFor(id)
          return (
            <motion.div
              key={id}
              ref={(el) => {
                if (el) cellEls.current.set(id, el)
                else cellEls.current.delete(id)
              }}
              animate={{ x: scatter.x, y: scatter.y }}
              transition={{ ...morphSpring, type: "spring", delay: scatter.delay }}
            >
              <motion.button
                type="button"
                layoutId={prefersReduced ? undefined : layoutIdFor(id)}
                ref={(el) => {
                  if (el) thumbEls.current.set(id, el)
                  else thumbEls.current.delete(id)
                }}
                onClick={() => open(item)}
                aria-haspopup="dialog"
                aria-expanded={openId === id}
                className="block w-full cursor-pointer overflow-hidden rounded-lg bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {renderThumb(item)}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {openItem !== undefined && openId !== null && (
          <React.Fragment key={openId}>
            {backdrop !== "none" && (
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeOn.includes("click") ? close : undefined}
                className={cn(
                  "fixed inset-0 z-40",
                  backdrop === "dim" && "bg-foreground/60",
                  backdrop === "blur" && "bg-background/40 backdrop-blur-md"
                )}
              />
            )}
            <div
              className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-6"
              onClick={closeOn.includes("click") ? close : undefined}
            >
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                layoutId={prefersReduced ? undefined : layoutIdFor(openId)}
                initial={prefersReduced ? { opacity: 0 } : undefined}
                animate={prefersReduced ? { opacity: 1 } : undefined}
                exit={prefersReduced ? { opacity: 0 } : undefined}
                transition={{ ...morphSpring, type: "spring" }}
                drag={closeOn.includes("drag-down") && !prefersReduced ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 120 || info.velocity.y > 800) close()
                }}
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto relative max-h-full max-w-full overflow-hidden rounded-lg bg-card shadow-lg outline-none"
              >
                {renderDetail(openItem)}
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
