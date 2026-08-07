/**
 * empty-state.tsx
 * USE WHEN: A list, search, or dashboard region has no content yet and needs to explain why plus offer a next step.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: loading-states.tsx, toast.tsx
 * DEPS: /primitives/button, /lib/utils
 */
import * as React from "react"

import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  /** A lucide icon element, e.g. <Inbox className="size-6" />. Decorative. */
  icon?: React.ReactNode
  title: string
  description: string
  /** Optional call to action rendered under the description. */
  action?: {
    label: string
    onClick?: () => void
    /** If set, renders as a link instead of a button. */
    href?: string
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center",
        className
      )}
    >
      {icon ? (
        <div
          aria-hidden="true"
          className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? (
        <div className="mt-4">
          {action.href ? (
            <Button asChild>
              <a href={action.href}>{action.label}</a>
            </Button>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  )
}
