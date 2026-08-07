/**
 * integrations-beam.tsx
 * USE WHEN: Showing the product as the hub of an existing stack — surrounding integration
 *           nodes connected to a center product node by animated beams.
 * INDUSTRY FIT: saas. AVOID FOR: local-services or restaurant sites — an integration diagram
 *           is meaningless without an API story, and the beam motion exceeds their budgets.
 * PAIRS WITH: features-bento.tsx, how-it-works-steps.tsx, stats-band.tsx
 * DEPS: /effects/animated-beam
 */
"use client"

import { createRef, useMemo, useRef, type ReactNode } from "react"
import {
  BarChart3,
  Boxes,
  Cloud,
  Database,
  GitPullRequest,
  MessageSquare,
  Webhook,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/effects/animated-beam"

export interface IntegrationNode {
  name: string
  /** Icon or small logo for the node. Defaults to a generic webhook icon. */
  icon?: ReactNode
}

export interface IntegrationsBeamProps {
  eyebrow?: string
  heading?: string
  description?: string
  /** Up to six integrations; the first three render left of the product, the rest right. */
  integrations?: IntegrationNode[]
  productName?: string
  /** Icon or logo for the center product node. */
  productIcon?: ReactNode
  className?: string
}

const defaultIntegrations: IntegrationNode[] = [
  { name: "GitHub", icon: <GitPullRequest aria-hidden="true" className="size-5" /> },
  { name: "Postgres", icon: <Database aria-hidden="true" className="size-5" /> },
  { name: "AWS", icon: <Cloud aria-hidden="true" className="size-5" /> },
  { name: "Slack", icon: <MessageSquare aria-hidden="true" className="size-5" /> },
  { name: "Datadog", icon: <BarChart3 aria-hidden="true" className="size-5" /> },
  { name: "Webhooks", icon: <Webhook aria-hidden="true" className="size-5" /> },
]

/** Curvature per row so the three beams on each side fan out instead of overlapping. */
const rowCurvature = [60, 0, -60]

export function IntegrationsBeam({
  eyebrow = "Integrations",
  heading = "Relay sits in the middle of the stack you already run",
  description = "Deploys come in from your repo host, health signals come in from your observability stack, and updates go out to wherever your team reads them.",
  integrations = defaultIntegrations,
  productName = "Relay",
  productIcon = <Boxes aria-hidden="true" className="size-7" />,
  className,
}: IntegrationsBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  const nodes = integrations.slice(0, 6)
  const nodeRefs = useMemo(
    () => nodes.map(() => createRef<HTMLDivElement>()),
    // Refs only need to be recreated when the number of nodes changes.
    [nodes.length]
  )

  const leftNodes = nodes.slice(0, 3)
  const rightNodes = nodes.slice(3)

  const renderNode = (node: IntegrationNode, index: number) => (
    <div
      key={node.name}
      ref={nodeRefs[index]}
      className="z-10 flex size-14 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm"
    >
      {node.icon ?? <Webhook aria-hidden="true" className="size-5" />}
      <span className="sr-only">{node.name}</span>
    </div>
  )

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[31px] leading-tight font-semibold tracking-tight text-foreground md:text-[39px]">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto mt-16 flex w-full max-w-3xl items-center justify-between px-4 py-10"
        >
          <div className="flex flex-col gap-12">
            {leftNodes.map((node, i) => renderNode(node, i))}
          </div>

          <div
            ref={centerRef}
            className="z-10 flex size-20 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm"
          >
            {productIcon}
            <span className="sr-only">{productName}</span>
          </div>

          <div className="flex flex-col gap-12">
            {rightNodes.map((node, i) => renderNode(node, i + leftNodes.length))}
          </div>

          {leftNodes.map((node, i) => (
            <AnimatedBeam
              key={`beam-${node.name}`}
              containerRef={containerRef}
              fromRef={nodeRefs[i]}
              toRef={centerRef}
              curvature={rowCurvature[i % rowCurvature.length]}
              duration={5}
              delay={i * 0.8}
              pathColor="var(--color-border)"
              pathOpacity={1}
              pathWidth={1.5}
              gradientStartColor="var(--color-primary)"
              gradientStopColor="var(--color-primary)"
            />
          ))}
          {rightNodes.map((node, i) => (
            <AnimatedBeam
              key={`beam-${node.name}`}
              containerRef={containerRef}
              fromRef={nodeRefs[i + leftNodes.length]}
              toRef={centerRef}
              reverse
              curvature={rowCurvature[i % rowCurvature.length]}
              duration={5}
              delay={i * 0.8 + 0.4}
              pathColor="var(--color-border)"
              pathOpacity={1}
              pathWidth={1.5}
              gradientStartColor="var(--color-primary)"
              gradientStopColor="var(--color-primary)"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
