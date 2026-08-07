/**
 * reference-page.tsx
 * THE canonical assembly example for the agency direction. Read this file to see how the
 * sections in ./sections snap together into one bone-and-cobalt studio site telling one
 * story: Loud Neighbor, a fourteen-person brand & campaign studio in Portland OR, founded
 * 2017 — the same five clients (Marrow Coffee, Ranger Optics, Kite Insurance, Pinetop
 * Provisions, Alder & Ash), the same email (hello@loudneighbor.co), everywhere. Every
 * section receives explicit props so the copy stays consistent. Copy the composition
 * pattern, swap the data.
 *
 * USE WHEN: Building a full agency site — start from this assembly, not from scratch.
 * INDUSTRY FIT: agency. AVOID FOR: other industries — follow their own DIRECTION.md and
 *           sections; the shared SaaS-flavored navbar is deliberately NOT used here.
 * PAIRS WITH: every file in ./sections
 * DEPS: /components/navigation/footer-minimal, ./sections/* (hero-manifesto, client-ticker,
 *       work-showcase, capabilities-list, process-steps, case-study-feature, culture-band,
 *       awards-line, journal-teaser, contact-cta)
 * NOTE: Syne (display) and Manrope (body) load via the Google Fonts import declared in
 *       industries/agency/DIRECTION.md — use `font-sans`; never import a font here. The
 *       header is a tiny inline wordmark-plus-links bar (Syne 800 left, four links and a
 *       cobalt text CTA right) — a studio site, not a product navbar. The page's motion
 *       budget (two effects max) is fully spent by the hero's text-animate and the client
 *       ticker's marquee; every other section is static on purpose.
 */
import { HeroManifesto } from "@/industries/agency/sections/hero-manifesto"
import { ClientTicker } from "@/industries/agency/sections/client-ticker"
import { WorkShowcase } from "@/industries/agency/sections/work-showcase"
import { CapabilitiesList } from "@/industries/agency/sections/capabilities-list"
import { ProcessSteps } from "@/industries/agency/sections/process-steps"
import { CaseStudyFeature } from "@/industries/agency/sections/case-study-feature"
import { CultureBand } from "@/industries/agency/sections/culture-band"
import { AwardsLine } from "@/industries/agency/sections/awards-line"
import { JournalTeaser } from "@/industries/agency/sections/journal-teaser"
import { ContactCta } from "@/industries/agency/sections/contact-cta"
import { FooterMinimal } from "@/components/navigation/footer-minimal"

/* ------------------------------------------------------------------ */
/* Minimal header: Syne wordmark left, four links + cobalt text CTA   */
/* right. Built inline on purpose — the shared navbar is too          */
/* product-y for a studio.                                            */
/* ------------------------------------------------------------------ */

const headerLinks = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
]

function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-6 py-5">
        <a
          href="/"
          className="font-sans text-[21px] leading-none font-extrabold tracking-tight text-foreground"
        >
          Loud Neighbor
        </a>
        <nav aria-label="Site" className="flex items-baseline gap-x-6">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden text-sm font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-primary hover:decoration-2 sm:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-2"
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Footer brand: same Syne wordmark, one honest line.                 */
/* ------------------------------------------------------------------ */

const footerBrand = (
  <p className="text-sm text-muted-foreground">
    <a
      href="/"
      className="font-sans text-base font-extrabold tracking-tight text-foreground"
    >
      Loud Neighbor
    </a>
    <span className="ml-3">Portland, OR — since 2017</span>
  </p>
)

/* ------------------------------------------------------------------ */
/* The page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferencePage() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Effect 1 of 2: text-animate on the hero statement. */}
        <HeroManifesto
          eyebrow="Loud Neighbor — Brand & campaign studio, Portland OR"
          headline="Brands that pick fights win them."
          supporting="Fourteen people making identities, campaigns, and film for challengers who are done being polite about it. Since 2017 the loudest work in the room has usually been ours."
          primaryCta={{ label: "Start a project", href: "#contact" }}
          secondaryCta={{ label: "See the work", href: "#work" }}
          animate
        />

        {/* Effect 2 of 2: the marquee. That's the whole motion budget. */}
        <ClientTicker
          clients={[
            "Marrow Coffee",
            "Ranger Optics",
            "Kite Insurance",
            "Pinetop Provisions",
            "Alder & Ash",
            "Hoyt Cider Co.",
            "Bramble Yard",
          ]}
        />

        <div id="work">
          <WorkShowcase
            eyebrow="Selected work"
            heading="Work that made noise"
            items={[
              {
                name: "Marrow Coffee",
                result: "Rebrand → 3× shelf pickup",
                href: "/work/marrow-coffee",
              },
              {
                name: "Ranger Optics",
                result: "Launch campaign → first run sold out in 11 days",
                href: "/work/ranger-optics",
              },
              {
                name: "Kite Insurance",
                result: "Naming & voice → 41% more quote starts",
                href: "/work/kite-insurance",
              },
              {
                name: "Pinetop Provisions",
                result: "Packaging → picked up by 240 grocers",
                href: "/work/pinetop-provisions",
              },
              {
                name: "Alder & Ash",
                result: "Identity & motion → 2.1M organic views",
                href: "/work/alder-and-ash",
              },
            ]}
          />
        </div>

        <CapabilitiesList
          eyebrow="Capabilities"
          heading="Five things, done all the way"
          items={[
            {
              title: "Brand identity",
              description:
                "Logos, systems, and the guts to apply them without watering anything down.",
            },
            {
              title: "Campaigns",
              description:
                "Launches and seasonal pushes people quote back at the bar.",
            },
            {
              title: "Motion & film",
              description:
                "Thirty seconds built to earn the replay, not survive the skip button.",
            },
            {
              title: "Packaging",
              description:
                "Shelf presence measured in pickups per aisle, not mood-board likes.",
            },
            {
              title: "Naming & voice",
              description:
                "Names that clear trademark and still start conversations.",
            },
          ]}
        />

        <ProcessSteps
          eyebrow="How it runs"
          heading="Twelve weeks, three fights"
          steps={[
            {
              title: "Pick the fight",
              description:
                "Weeks 1–2: we argue about the brief until it's true. You leave with one sentence everyone in your company can repeat — that sentence runs the rest of the project.",
            },
            {
              title: "Make it loud",
              description:
                "Weeks 3–8: identity, campaign, motion — built in the open with a working review every Friday. You see rough work early instead of a big reveal you can't react to.",
            },
            {
              title: "Put it everywhere",
              description:
                "Weeks 9–12: launch, rollout kits, and files your team can actually use. We stay on the phone through the first month of real-world contact.",
            },
          ]}
        />

        <CaseStudyFeature
          eyebrow="Featured case"
          statement="Marrow went from shelf wallpaper to"
          highlight="the bag people photograph."
          meta={[
            { label: "Client", value: "Marrow Coffee" },
            { label: "Scope", value: "Rebrand, packaging, launch film" },
            { label: "Year", value: "2025" },
            { label: "Result", value: "3× shelf pickup in six months" },
          ]}
          cta={{ label: "Read the case", href: "/work/marrow-coffee" }}
          imageAlt="Marrow Coffee rebrand — new bags lined up on a grocery shelf"
        />

        <div id="studio">
          <CultureBand
            eyebrow="The studio"
            pullLine="Fourteen people. No middle managers."
            paragraphs={[
              "Project teams are four people, tops. The strategist who wrote the brief sits in the design reviews, and the designer presents their own work — nothing gets translated by somebody who wasn't in the room when it was made.",
              "There is no account layer. You get a producer who keeps the trains running and direct lines to the people making the thing, so feedback lands in hours instead of a Tuesday status call.",
              "Everyone makes. The founders still design, still write, still cut film. Nobody here manages full time, and the work is better for it.",
            ]}
            imageAlt="The Loud Neighbor studio floor — a converted print shop in Southeast Portland"
          />
        </div>

        <AwardsLine
          eyebrow="Recognition"
          heading="The work gets around"
          entries={[
            {
              year: "2026",
              award: "Type Directors Club — Certificate of Typographic Excellence",
              project: "Marrow Coffee packaging",
            },
            {
              year: "2026",
              award: "ADC Annual Awards — Merit, Motion & Film Craft",
              project: "Alder & Ash launch film",
            },
            {
              year: "2025",
              award: "Communication Arts — Design Annual",
              project: "Pinetop Provisions packaging",
            },
            {
              year: "2025",
              award: "The One Show — Merit, Integrated Campaign",
              project: "Ranger Optics launch",
            },
            {
              year: "2025",
              award: "Brand New — Best Reviewed",
              project: "Marrow Coffee rebrand",
            },
          ]}
        />

        <div id="journal">
          <JournalTeaser
            eyebrow="Journal"
            heading="Opinions, mostly ours"
            articles={[
              {
                title: "Your brand guidelines are why nobody uses your brand",
                dateTime: "2026-07-14",
                dateLabel: "07.14.26",
                topic: "Identity",
                href: "/journal/guidelines-nobody-uses",
              },
              {
                title: "Every category has a beige problem",
                dateTime: "2026-06-02",
                dateLabel: "06.02.26",
                topic: "Strategy",
                href: "/journal/beige-problem",
              },
              {
                title: "The case study is the product now",
                dateTime: "2026-04-21",
                dateLabel: "04.21.26",
                topic: "Studio",
                href: "/journal/case-study-is-the-product",
              },
            ]}
          />
        </div>

        <div id="contact">
          <ContactCta
            statement="Got something worth making loud?"
            primaryCta={{ label: "Start a project", href: "/contact" }}
            email="hello@loudneighbor.co"
            responseNote="We answer everything within two working days — usually the same afternoon."
          />
        </div>
      </main>

      <FooterMinimal
        brand={footerBrand}
        links={[
          { label: "Work", href: "#work" },
          { label: "Studio", href: "#studio" },
          { label: "Journal", href: "#journal" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "#contact" },
        ]}
        socials={[
          { platform: "instagram", href: "https://instagram.com/loudneighbor" },
          { platform: "linkedin", href: "https://linkedin.com/company/loudneighbor" },
          { platform: "youtube", href: "https://youtube.com/@loudneighbor" },
        ]}
      />
    </div>
  )
}
