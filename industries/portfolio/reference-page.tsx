/**
 * reference-page.tsx
 * THE canonical assembly example for the portfolio direction. Read this file to see how the
 * sections in ./sections snap together into one stark, monochrome personal site telling one
 * story: Anna Reyes, brand & type designer working from Mexico City since 2018 — the same
 * six projects (Cardencha, Fonda Nube, Editorial Antena, Ruido Blanco, La Cigarra, Grupo
 * Terral), the same email (hello@annareyes.studio), everywhere. Every section receives
 * explicit props so the copy stays consistent. Copy the composition pattern, swap the data.
 *
 * USE WHEN: Building a full portfolio site — start from this assembly, not from scratch.
 * INDUSTRY FIT: portfolio. AVOID FOR: other industries — follow their own DIRECTION.md and
 *           sections; the SaaS navbar/footer components are deliberately NOT used here.
 * PAIRS WITH: every file in ./sections
 * DEPS: ./sections/* (hero-statement, work-index, project-feature, about-block,
 *       services-list, clients-line, recognitions-list, process-note, contact-cta,
 *       colophon, footer-line)
 *
 * NOTE: Archivo comes from the Google Fonts import declared in
 * industries/portfolio/DIRECTION.md — use `font-sans`; never import a font here.
 * The header is a tiny inline name-plus-links bar, per DIRECTION.md — not the SaaS navbar.
 */
import { HeroStatement } from "@/industries/portfolio/sections/hero-statement"
import { WorkIndex } from "@/industries/portfolio/sections/work-index"
import { ProjectFeature } from "@/industries/portfolio/sections/project-feature"
import { AboutBlock } from "@/industries/portfolio/sections/about-block"
import { ServicesList } from "@/industries/portfolio/sections/services-list"
import { ClientsLine } from "@/industries/portfolio/sections/clients-line"
import { RecognitionsList } from "@/industries/portfolio/sections/recognitions-list"
import { ProcessNote } from "@/industries/portfolio/sections/process-note"
import { ContactCta } from "@/industries/portfolio/sections/contact-cta"
import { Colophon } from "@/industries/portfolio/sections/colophon"
import { FooterLine } from "@/industries/portfolio/sections/footer-line"

/* ------------------------------------------------------------------ */
/* Minimal header: name left, three anchor links right. DIRECTION.md  */
/* asks for "name + 2–3 links" — no CTA button, no SaaS navbar.       */
/* ------------------------------------------------------------------ */

const headerLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

function SiteHeader() {
  return (
    <header className="border-b border-border font-sans">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-5">
        <a
          href="/"
          className="text-sm font-medium tracking-wide text-foreground uppercase transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
        >
          Anna Reyes
        </a>
        <nav aria-label="Site" className="flex gap-x-6 text-sm">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground underline-offset-4 transition-colors duration-150 hover:underline focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* The page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferencePage() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <main>
        <HeroStatement
          label="ANNA REYES — BRAND & TYPE DESIGN, MEXICO CITY"
          statement="Brand identities and typefaces for people with something to say."
          availability="Booking Q1 2027"
          email="hello@annareyes.studio"
        />

        <div id="work">
          <WorkIndex
            label="SELECTED WORK 2021–2026"
            items={[
              { name: "Cardencha", category: "Display typeface, retail release", year: "2025", href: "/work/cardencha" },
              { name: "Fonda Nube", category: "Restaurant identity, Roma Norte", year: "2024", href: "/work/fonda-nube" },
              { name: "Editorial Antena", category: "Publishing imprint & covers", year: "2024", href: "/work/editorial-antena" },
              { name: "Ruido Blanco", category: "Record label identity", year: "2023", href: "/work/ruido-blanco" },
              { name: "La Cigarra", category: "Mezcal brand & packaging", year: "2022", href: "/work/la-cigarra" },
              { name: "Grupo Terral", category: "Wayfinding & signage system", year: "2021", href: "/work/grupo-terral" },
            ]}
          />
        </div>

        <ProjectFeature
          label="FEATURED CASE"
          name="Fonda Nube"
          summary="Fonda Nube is a twelve-table restaurant in Roma Norte that wanted to feel like it had always been there. I drew a single-weight logotype from the owner's grandmother's recipe cards, then let it carry everything — menus, signage, the matchbook by the door. No secondary marks, no pattern library. One voice, set large, printed on cheap paper that ages well."
          imageAlt="Fonda Nube dining room signage, painted logotype on plaster"
          meta={[
            { term: "Client", detail: "Fonda Nube, Mexico City" },
            { term: "Role", detail: "Identity, custom logotype, art direction" },
            { term: "Year", detail: "2024" },
            { term: "Deliverables", detail: "Logotype, menu system, signage, matchbooks, tableware marks" },
          ]}
        />

        <div id="about">
          <AboutBlock
            label="ABOUT"
            bio="I'm Anna Reyes, a brand and type designer working from Mexico City since 2018. I build identity systems around custom letterforms, because a logotype you own outlasts any trend you rent. Most of my work is for restaurants, publishers, and labels who want to sound like themselves in print."
            portraitAlt="Anna Reyes in her studio, black and white"
            recognitions={[
              "Tipos Latinos Biennial, selected 2022 & 2024",
              "TDC Typeface Design, winner 2025",
              "It's Nice That, feature 2024",
            ]}
          />
        </div>

        <ServicesList
          label="CAPABILITIES"
          items={[
            {
              name: "Identity systems",
              detail: "Logotype, typography, and usage rules built to survive whoever inherits them.",
            },
            {
              name: "Custom typefaces",
              detail: "Proprietary display and text faces, from brief to hinted production files.",
            },
            {
              name: "Art direction",
              detail: "Campaign and editorial direction for brands I've built, print-first.",
            },
            {
              name: "Design engineering",
              detail: "Variable-font tooling, specimen sites, and type testing pages I code myself.",
            },
          ]}
        />

        <ClientsLine
          label="SELECTED CLIENTS 2018–2026"
          clients={[
            "Fonda Nube",
            "Editorial Antena",
            "Ruido Blanco",
            "La Cigarra",
            "Grupo Terral",
            "Hotel Marea",
            "Taller Sur",
            "Café Pan y Media",
            "Estudio Vertical",
          ]}
        />

        <RecognitionsList
          label="RECOGNITIONS 2022–2025"
          items={[
            { year: "2025", honor: "Type Directors Club, Typeface Design — winner", project: "Cardencha" },
            { year: "2024", honor: "Tipos Latinos Biennial — selected", project: "Cardencha" },
            { year: "2024", honor: "Brand New — reviewed", project: "Fonda Nube" },
            { year: "2024", honor: "It's Nice That — feature", project: "Fonda Nube" },
            { year: "2023", honor: "Latin American Design Awards — silver", project: "Ruido Blanco" },
            { year: "2022", honor: "Tipos Latinos Biennial — selected", project: "La Cigarra lettering" },
          ]}
        />

        <ProcessNote
          label="HOW I WORK"
          paragraphs={[
            "Every project starts with reading, not sketching. Before I draw a letter for a restaurant or a label, I spend the first weeks in their archive — old menus, pressings, invoices, whatever survived. The identity is usually already in there, badly set.",
            "I take on three or four clients a year, and I stay through production: press checks, signage installs, the second print run where the paper changes and the ink behaves differently. A system I hand off untested isn't finished.",
            "The typography is always drawn from scratch. Licensing a face means sharing a voice with everyone else who licensed it; a logotype built from custom letterforms is the one asset a client owns outright.",
          ]}
          pullLine="Few clients, slow starts, letters drawn from zero."
        />

        <div id="contact">
          <ContactCta
            label="CONTACT"
            statement="Let's make something worth keeping."
            email="hello@annareyes.studio"
            secondary="Mexico City · UTC−6 · I reply within two working days."
          />
        </div>

        <Colophon
          label="COLOPHON"
          notes={[
            "Set in Archivo",
            "Built from the Claude Design Kit",
            "Photography by Sofía Ledesma",
            "Last updated August 2026",
          ]}
        />
      </main>

      <FooterLine
        name="Anna Reyes"
        year="© 2026"
        colophon="Set in Archivo"
        links={[
          { label: "Instagram", href: "https://instagram.com/annareyes.studio" },
          { label: "Are.na", href: "https://are.na/anna-reyes" },
          { label: "Read.cv", href: "https://read.cv/annareyes" },
        ]}
      />
    </div>
  )
}
