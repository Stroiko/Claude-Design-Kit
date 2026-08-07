/**
 * login-centered-card.tsx
 * USE WHEN: A focused sign-in page — one centered card with email/password, a Google
 *           OAuth button, and a social-proof avatar row beneath the card.
 * INDUSTRY FIT: all. AVOID FOR: -
 * PAIRS WITH: /patterns/app/ shells (the post-login destination)
 * DEPS: /primitives/button, /primitives/input, /primitives/label, /primitives/avatar,
 *       /primitives/separator, /lib/utils, lucide-react
 */
"use client"

import * as React from "react"
import { Compass } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarGroup } from "@/primitives/avatar"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { Separator } from "@/primitives/separator"

export interface LoginCenteredCardProps {
  brandName?: string
  /** Mark shown in the circle above the title. Defaults to a lucide Compass. */
  logo?: React.ReactNode
  signUpHref?: string
  /** e.g. "Join 4,200+ people already planning trips with Northwind." */
  socialProofLine?: React.ReactNode
  /** Names rendered as avatar initials under the social-proof line. */
  socialProofNames?: string[]
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

export function LoginCenteredCard({
  brandName = "Northwind",
  logo = <Compass className="size-6" aria-hidden="true" />,
  signUpHref = "#",
  socialProofLine = (
    <>
      Join <span className="font-medium text-foreground">4,200+ people</span>{" "}
      already using Northwind.
    </>
  ),
  socialProofNames = ["Maya Chen", "Derek Okafor", "Priya Nair", "Tomás Alvarez"],
  onSignIn,
  onGoogleSignIn,
  className,
}: LoginCenteredCardProps) {
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
        "flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 py-16",
        className
      )}
    >
      <main className="w-full max-w-sm rounded-xl border bg-card p-8 text-card-foreground shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {logo}
          </div>
          <h1 className="mt-4 text-2xl leading-tight font-semibold">
            Sign in to {brandName}
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
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

          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="mt-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-5 w-full"
          onClick={onGoogleSignIn}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don&rsquo;t have an account?{" "}
          <a
            href={signUpHref}
            className="font-medium text-foreground underline underline-offset-4 transition-colors duration-150 hover:text-muted-foreground"
          >
            Sign up, it&rsquo;s free
          </a>
        </p>
      </main>

      <div className="mt-12 flex flex-col items-center text-center">
        <p className="text-sm text-muted-foreground">{socialProofLine}</p>
        <AvatarGroup className="mt-3">
          {socialProofNames.map((name) => (
            <Avatar key={name}>
              <AvatarFallback>{initials(name)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  )
}
