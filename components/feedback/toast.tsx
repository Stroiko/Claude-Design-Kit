/**
 * toast.tsx
 * USE WHEN: The app needs transient notifications ("Saved", "Message sent") after user actions.
 * INDUSTRY FIT: all. AVOID FOR: static marketing pages with no app-like actions — nothing to notify about.
 * PAIRS WITH: loading-states.tsx, empty-state.tsx, contact-form.tsx
 * DEPS: radix-ui (Toast), lucide-react, /lib/utils
 */
"use client"

import * as React from "react"
import { Toast } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ToastOptions {
  title: string
  description?: string
}

interface ToastItem extends ToastOptions {
  id: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

/** Read the imperative `toast()` function. Must be used under <ToastProvider>. */
export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>")
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  /** Auto-dismiss delay in ms. */
  duration?: number
}

export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])
  const idRef = React.useRef(0)

  const toast = React.useCallback((options: ToastOptions) => {
    idRef.current += 1
    setToasts((prev) => [...prev, { ...options, id: idRef.current }])
  }, [])

  const value = React.useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider duration={duration} swipeDirection="right">
        {children}
        {toasts.map((item) => (
          <Toast.Root
            key={item.id}
            onOpenChange={(open) => {
              if (!open) {
                setToasts((prev) => prev.filter((t) => t.id !== item.id))
              }
            }}
            className={cn(
              "grid grid-cols-[1fr_auto] items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-lg",
              "transition-[transform,opacity] duration-200 ease-out",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
              "data-[swipe=cancel]:translate-x-0",
              "data-[state=closed]:translate-x-4 data-[state=closed]:opacity-0"
            )}
          >
            <div className="flex flex-col gap-1">
              <Toast.Title className="text-sm font-semibold text-foreground">
                {item.title}
              </Toast.Title>
              {item.description ? (
                <Toast.Description className="text-sm text-muted-foreground">
                  {item.description}
                </Toast.Description>
              ) : null}
            </div>
            <Toast.Close
              aria-label="Dismiss notification"
              className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X className="size-4" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport
          className="fixed right-0 bottom-0 z-50 flex w-full max-w-sm flex-col gap-2 p-6 outline-none"
        />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
