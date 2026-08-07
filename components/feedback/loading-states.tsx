/**
 * loading-states.tsx
 * USE WHEN: Content or an action is pending: Spinner for buttons/inline waits, Skeleton for layout placeholders, LoadingDots for chat-style typing waits.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: empty-state.tsx, toast.tsx
 * DEPS: /lib/utils, lucide-react
 */
import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SpinnerProps {
  /** Accessible description of what is loading. */
  label?: string
  className?: string
}

/** Rotating indicator for inline or button-level waits. */
export function Spinner({ label = "Loading", className }: SpinnerProps) {
  return (
    <span role="status" className={cn("inline-flex items-center", className)}>
      <Loader2 aria-hidden="true" className="size-4 animate-spin text-muted-foreground" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export interface SkeletonProps extends React.ComponentProps<"div"> {
  className?: string
}

/** Shape placeholder while real content loads. Size it with width/height classes. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export interface LoadingDotsProps {
  /** Accessible description of what is loading. */
  label?: string
  className?: string
}

/** Three pulsing dots for conversational or streaming waits. */
export function LoadingDots({ label = "Loading", className }: LoadingDotsProps) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-1", className)}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden="true"
          className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
          style={{ animationDelay: `${index * 150}ms` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}
