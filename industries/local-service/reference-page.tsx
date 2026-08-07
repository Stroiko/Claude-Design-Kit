/**
 * reference-page.tsx
 * THE canonical assembly example for the local-service direction. Read this file to see how
 * the sections in ./sections snap together into one service site telling one story:
 * Harbor Plumbing Co., a fictional family-run plumber in Tacoma, WA — since 1994, WA license
 * #HARBOPC891JD, (253) 555-0142. Every section receives explicit props so the facts stay
 * consistent: same phone number everywhere (always a tel: link, always tabular-nums), same
 * six services, same neighborhoods, same guarantee. Amber appears only on call/quote/emergency
 * actions; nothing on the page moves. Copy the composition pattern, swap the data.
 *
 * USE WHEN: Building a full local-service site — start from this assembly, not from scratch.
 * INDUSTRY FIT: local-service. AVOID FOR: other industries — follow their own DIRECTION.md
 *           and sections.
 * PAIRS WITH: every file in ./sections, /components/navigation
 * DEPS: /components/navigation/navbar-simple, /components/navigation/footer-columns,
 *       ./sections/* (hero-promise, trust-band, services-grid, how-we-work, before-after,
 *       service-area, reviews-local, coupons-band, quote-form, emergency-band, faq-service)
 * NOTE: Plus Jakarta Sans (display) and Source Sans 3 (body) load via the Google Fonts import
 *       declared in this industry's DIRECTION.md and are exposed through font-sans.
 */
import {
  BadgeCheck,
  Droplets,
  Flame,
  History,
  MessageSquareText,
  ShieldCheck,
  ShowerHead,
  Siren,
  Waves,
  Wrench,
} from "lucide-react"

import { NavbarSimple } from "@/components/navigation/navbar-simple"
import { FooterColumns } from "@/components/navigation/footer-columns"
import { HeroPromise } from "@/industries/local-service/sections/hero-promise"
import {
  TrustBand,
  type TrustFact,
} from "@/industries/local-service/sections/trust-band"
import {
  ServicesGrid,
  type ServiceItem,
} from "@/industries/local-service/sections/services-grid"
import {
  HowWeWork,
  type WorkStep,
} from "@/industries/local-service/sections/how-we-work"
import {
  BeforeAfter,
  type BeforeAfterJob,
} from "@/industries/local-service/sections/before-after"
import { ServiceArea } from "@/industries/local-service/sections/service-area"
import {
  ReviewsLocal,
  type LocalReview,
} from "@/industries/local-service/sections/reviews-local"
import {
  CouponsBand,
  type CouponOffer,
} from "@/industries/local-service/sections/coupons-band"
import { QuoteForm } from "@/industries/local-service/sections/quote-form"
import { EmergencyBand } from "@/industries/local-service/sections/emergency-band"
import {
  FaqService,
  type ServiceFaqEntry,
} from "@/industries/local-service/sections/faq-service"

/* ------------------------------------------------------------------ */
/* The facts — one source for everything below                        */
/* ------------------------------------------------------------------ */

const phone = { display: "(253) 555-0142", href: "tel:+12535550142" }

const logo = (
  <a
    href="/"
    aria-label="Harbor Plumbing Co. home"
    className="text-lg font-bold tracking-tight text-foreground"
  >
    Harbor Plumbing Co.
  </a>
)

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Service area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
]

/* ------------------------------------------------------------------ */
/* Trust: the four facts a homeowner checks before calling            */
/* ------------------------------------------------------------------ */

const trustFacts: TrustFact[] = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    detail: "WA license #HARBOPC891JD",
  },
  {
    icon: History,
    title: "31 years in business",
    detail: "Family-run in Tacoma since 1994",
  },
  {
    icon: MessageSquareText,
    title: "4.9 from 800+ local reviews",
    detail: "Rated by your neighbors",
  },
  {
    icon: BadgeCheck,
    title: "Workmanship guaranteed",
    detail: "Two years on every repair",
  },
]

/* ------------------------------------------------------------------ */
/* Services: six, with honest prices — sewer is quoted after looking  */
/* ------------------------------------------------------------------ */

const services: ServiceItem[] = [
  {
    icon: Droplets,
    name: "Drain cleaning",
    description: "Slow or blocked drains cleared, usually in one visit.",
    price: "From $99",
  },
  {
    icon: Flame,
    name: "Water heaters",
    description: "Repairs and same-day replacements, tank or tankless.",
    price: "From $1,450",
  },
  {
    icon: Wrench,
    name: "Leak & pipe repair",
    description: "We find the leak and fix the pipe, not just the symptom.",
    price: "From $165",
  },
  {
    icon: ShowerHead,
    name: "Fixture installation",
    description: "Faucets, toilets, and shower valves, installed to code.",
    price: "From $140",
  },
  {
    icon: Waves,
    name: "Sewer line service",
    description: "Camera inspection first, then a flat quote for the fix.",
    price: "Quoted after inspection",
  },
  {
    icon: Siren,
    name: "Emergency plumbing",
    description: "Burst pipes and backups — nights and weekends included.",
    price: "From $185",
  },
]

const workSteps: WorkStep[] = [
  {
    title: "Call or book",
    description:
      "Call or send the quote form — a real person answers and books your two-hour window.",
  },
  {
    title: "Upfront quote",
    description:
      "We look at the job and quote a flat price before any work starts.",
  },
  {
    title: "Fixed right",
    description:
      "We do the work, clean up after ourselves, and back it with a two-year guarantee.",
  },
]

/* ------------------------------------------------------------------ */
/* Proof: real jobs, real neighborhoods                               */
/* ------------------------------------------------------------------ */

const beforeAfterJobs: BeforeAfterJob[] = [
  {
    job: "Repipe",
    place: "North Slope, 2025",
    beforeAlt: "Corroded galvanized pipes before a whole-house repipe",
    afterAlt: "New PEX supply lines after the repipe, labeled and secured",
  },
  {
    job: "Water heater replacement",
    place: "Proctor District, 2025",
    beforeAlt: "Rusted 15-year-old tank water heater before replacement",
    afterAlt: "New tank water heater installed to code with seismic straps",
  },
  {
    job: "Sewer line repair",
    place: "University Place, 2024",
    beforeAlt: "Camera still of a root-blocked clay sewer line before repair",
    afterAlt: "Camera still of the clear repaired sewer line after the fix",
  },
]

const serviceAreas = [
  "Proctor District",
  "North End",
  "Stadium District",
  "Old Town",
  "South Tacoma",
  "Ruston",
  "Fircrest",
  "University Place",
  "Browns Point",
  "Lakewood",
]

const reviews: LocalReview[] = [
  {
    quote:
      "They quoted the water heater over the phone, showed up at 8 the next morning, and the price didn't move. Hot water by lunch.",
    name: "Maria G.",
    neighborhood: "Proctor District",
    jobType: "Water heater replacement",
  },
  {
    quote:
      "Our kitchen drain had been slow for months. One visit, cleared, and he showed me what caused it so it wouldn't come back.",
    name: "Dan & Katie R.",
    neighborhood: "North End",
    jobType: "Drain cleaning",
  },
  {
    quote:
      "Found the leak behind the laundry wall in twenty minutes and fixed the pipe without tearing up half the room.",
    name: "Elaine T.",
    neighborhood: "Browns Point",
    jobType: "Leak repair",
  },
]

/* ------------------------------------------------------------------ */
/* Commercials: offers and FAQs                                       */
/* ------------------------------------------------------------------ */

const offers: CouponOffer[] = [
  {
    offer: "$25 off your first service call",
    terms: "One per household. Mention when booking.",
  },
  {
    offer: "Free camera inspection with any drain cleaning",
    terms: "Includes the recording. No obligation on the findings.",
  },
]

const faqs: ServiceFaqEntry[] = [
  {
    question: "How do you price jobs?",
    answer:
      "Flat rate, quoted before we start. We look at the job, give you one number in writing, and that's what you pay — even if it takes longer than we expected. Estimates over the phone are free.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Harbor Plumbing Co. is a licensed Washington plumbing contractor, license #HARBOPC891JD, and we carry full liability insurance. Ask to see the license — we bring it to every job.",
  },
  {
    question: "Do you guarantee your work?",
    answer:
      "Every repair and installation carries a two-year workmanship guarantee. If something we fixed fails, we come back and make it right at no charge. Manufacturer warranties on fixtures and water heaters apply on top of that.",
  },
  {
    question: "When will you actually show up?",
    answer:
      "We book two-hour arrival windows and call about 30 minutes before we arrive. Call before noon and we can usually get to you the same day.",
  },
  {
    question: "What payment methods do you take?",
    answer:
      "Card, check, or cash, paid when the job is done — never up front. Financing is available for larger work like water heater replacements and repipes.",
  },
]

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Drain cleaning", href: "/services/drain-cleaning" },
      { label: "Water heaters", href: "/services/water-heaters" },
      { label: "Leak & pipe repair", href: "/services/leak-pipe-repair" },
      { label: "Fixture installation", href: "/services/fixture-installation" },
      { label: "Sewer line service", href: "/services/sewer-line" },
      { label: "Emergency plumbing", href: "/services/emergency" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Reviews", href: "#reviews" },
      { label: "Service area", href: "#service-area" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: `Call ${phone.display}`, href: phone.href },
      { label: "Get a free quote", href: "#quote" },
      { label: "office@harborplumbing.com", href: "mailto:office@harborplumbing.com" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* The page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferencePage() {
  return (
    <div className="bg-background text-foreground">
      <NavbarSimple
        logo={logo}
        links={navLinks}
        cta={{ label: `Call ${phone.display}`, href: phone.href }}
      />

      <main>
        <HeroPromise
          headline="Burst pipe? We're there within the hour."
          supportingLine="Harbor Plumbing Co. has fixed Tacoma's plumbing since 1994. Flat quotes before we start, and a real person answers the phone."
          phone={phone}
          quoteCta={{ label: "Get a free quote", href: "#quote" }}
          trustLine="Licensed & insured · Since 1994 · Same-day service"
          imageAlt="Harbor Plumbing Co. technician replacing a water heater in a Tacoma home"
        />

        <TrustBand facts={trustFacts} />

        <div id="services">
          <ServicesGrid
            eyebrow="Services"
            heading="What we fix"
            services={services}
          />
        </div>

        <HowWeWork
          eyebrow="How we work"
          heading="No surprises, start to finish"
          steps={workSteps}
        />

        <BeforeAfter
          eyebrow="Our work"
          heading="Before and after, from real jobs"
          jobs={beforeAfterJobs}
        />

        <div id="service-area">
          <ServiceArea
            eyebrow="Service area"
            heading="Tacoma and the neighborhoods around it"
            areas={serviceAreas}
            responseLine="Most calls inside this area get a plumber the same day — often within the hour for emergencies."
            phone={phone}
          />
        </div>

        <div id="reviews">
          <ReviewsLocal
            eyebrow="Reviews"
            heading="What neighbors say"
            reviews={reviews}
          />
        </div>

        <CouponsBand
          eyebrow="Offers"
          heading="Two ways to save"
          offers={offers}
        />

        <QuoteForm
          id="quote"
          heading="Get a free quote"
          supportingLine="Tell us what's going on and we'll call back with a flat quote — usually within the hour on weekdays."
          services={services.map((service) => service.name)}
          submitLabel="Request my quote"
          phone={phone}
        />

        <EmergencyBand
          message="Emergency? We answer nights and weekends."
          phone={phone}
        />

        <div id="faq">
          <FaqService
            eyebrow="FAQ"
            heading="Questions people call to ask"
            entries={faqs}
          />
        </div>
      </main>

      <FooterColumns
        logo={logo}
        blurb="Family-run plumbing in Tacoma since 1994. WA license #HARBOPC891JD. Open 7am–6pm weekdays, 8am–4pm Saturdays — emergencies answered nights and weekends."
        columns={footerColumns}
        legal="© 2026 Harbor Plumbing Co. · Tacoma, WA · License #HARBOPC891JD"
        legalLinks={[
          { label: phone.display, href: phone.href },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ]}
      />
    </div>
  )
}
