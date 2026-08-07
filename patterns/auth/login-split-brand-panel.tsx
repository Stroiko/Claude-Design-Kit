/**
 * login-split-brand-panel.tsx
 * USE WHEN: A sign-in page that sells a little — split card with a brand statement and
 *           social-proof avatars on the left, Google + email/password form on the right.
 *           Panel collapses on mobile, leaving just the form.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: login-centered-card.tsx (quieter alternative), /patterns/app/ shells
 * DEPS: /primitives/button, /primitives/input, /primitives/label, /primitives/avatar,
 *       /primitives/card, /lib/utils
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/primitives/avatar"
import { Button } from "@/primitives/button"
import { Card } from "@/primitives/card"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"

export interface LoginSplitBrandPanelProps {
  brandName?: string
  /** The brand statement on the colored panel. Keep it under ~6 words. */
  tagline?: string
  socialProofLine?: string
  /** Names rendered as avatar initials next to the social-proof line. */
  socialProofNames?: string[]
  signUpHref?: string
  forgotPasswordHref?: string
  /**
   * Called with the validated credentials. Default just flips a "signed in"
   * status line — wire real auth (server action, next-auth) here.
   */
  onSignIn?: (email: string, password: string) => void
  onGoogleSignIn?: () => void
  className?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export function LoginSplitBrandPanel({
  brandName = "Northwind",
  tagline = "Where teams ship together.",
  socialProofLine = "Join 40,000+ teams on Northwind",
  socialProofNames = ["Jules Deng", "Marta Kowalski", "Andre Reyes"],
  signUpHref = "#",
  forgotPasswordHref = "#",
  onSignIn,
  onGoogleSignIn,
  className,
}: LoginSplitBrandPanelProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setSubmitted(true)
    onSignIn?.(email, password)
  }

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-background px-6 py-16",
        className
      )}
    >
      <Card className="grid w-full max-w-3xl gap-0 overflow-hidden p-0 md:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
          <div
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary-foreground/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
              <div className="size-3 rotate-45 rounded-xs bg-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              {brandName}
            </span>
          </div>

          <p className="relative mt-auto max-w-[15ch] text-2xl leading-tight font-semibold tracking-tight text-balance">
            {tagline}
          </p>

          <div className="relative mt-8 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {socialProofNames.map((name) => (
                <Avatar key={name} className="size-7 ring-2 ring-primary">
                  <AvatarFallback className="bg-primary-foreground text-xs font-medium text-primary">
                    {initials(name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-primary-foreground/85">
              {socialProofLine}
            </span>
          </div>
        </div>

        <main className="flex flex-col justify-center gap-5 p-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg leading-tight font-semibold">
              Welcome back
            </h1>
            <p className="text-xs text-muted-foreground">
              Sign in to your {brandName} workspace.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onGoogleSignIn}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-split-email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="login-split-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-split-password" className="text-xs">
                    Password
                  </Label>
                  <a
                    href={forgotPasswordHref}
                    className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    Forgot?
                  </a>
                </div>
                <Input
                  id="login-split-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            {submitted && !error && (
              <p role="status" className="text-sm text-muted-foreground">
                Signed in &mdash; redirecting&hellip;
              </p>
            )}

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            No account?{" "}
            <a
              href={signUpHref}
              className="font-medium text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
            >
              Start free trial
            </a>
          </p>
        </main>
      </Card>
    </div>
  )
}
