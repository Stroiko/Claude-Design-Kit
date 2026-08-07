/**
 * reference-page.tsx
 * THE canonical assembly example for the restaurant direction. Read this file to see how the
 * sections in ./sections snap together into one page telling one story: "Casa Olea", a fictional
 * wood-fire Mediterranean restaurant on the corner of 18th & Florida in San Francisco's Mission —
 * run by Marta and Tomás Serra, rooted in Mallorca, open Tuesday through Sunday, closed Mondays
 * except for private buyouts. Every section receives explicit props so the fiction stays
 * consistent: same address, same phone (415) 555-0198, same hours, same prices as the menu.
 * Copy the composition pattern, swap the data.
 *
 * USE WHEN: Building a full restaurant page — start from this assembly, not from scratch.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — this page is light, serif, photographic, and
 *           still, the deliberate opposite of /industries/saas/reference-page.tsx.
 * PAIRS WITH: every file in ./sections, /components/navigation
 * DEPS: /components/navigation/navbar-simple, /components/navigation/footer-minimal,
 *       ./sections/* (hero-full-image, story-intro, menu-highlights, menu-list, gallery-grid,
 *       press-quotes, chef-team, reservation-form, hours-location, faq-visit,
 *       newsletter-table-notes)
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { NavbarSimple } from "@/components/navigation/navbar-simple"
import { FooterMinimal } from "@/components/navigation/footer-minimal"
import { HeroFullImage } from "@/industries/restaurant/sections/hero-full-image"
import { StoryIntro } from "@/industries/restaurant/sections/story-intro"
import { MenuHighlights } from "@/industries/restaurant/sections/menu-highlights"
import {
  MenuList,
  type MenuCategory,
} from "@/industries/restaurant/sections/menu-list"
import { GalleryGrid } from "@/industries/restaurant/sections/gallery-grid"
import { PressQuotes } from "@/industries/restaurant/sections/press-quotes"
import { ChefTeam } from "@/industries/restaurant/sections/chef-team"
import { ReservationForm } from "@/industries/restaurant/sections/reservation-form"
import { HoursLocation } from "@/industries/restaurant/sections/hours-location"
import { FaqVisit, type VisitFaq } from "@/industries/restaurant/sections/faq-visit"
import { NewsletterTableNotes } from "@/industries/restaurant/sections/newsletter-table-notes"

/* ------------------------------------------------------------------ */
/* Brand                                                              */
/* ------------------------------------------------------------------ */

const logo = (
  <a
    href="/"
    aria-label="Casa Olea home"
    className="font-serif text-xl font-medium text-foreground"
  >
    Casa Olea
  </a>
)

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our story", href: "#story" },
  { label: "Visit", href: "#visit" },
]

/* ------------------------------------------------------------------ */
/* The menu — one source of truth, echoed by the highlights above it  */
/* ------------------------------------------------------------------ */

const menuCategories: MenuCategory[] = [
  {
    name: "Starters",
    dishes: [
      {
        name: "Pan con tomate",
        description: "Hearth bread, grated tomato, arbequina olive oil, sea salt.",
        price: "9",
        dietary: ["v"],
      },
      {
        name: "Hearth flatbread",
        description: "'Nduja honey, ricotta, wild oregano.",
        price: "14",
      },
      {
        name: "Hearth-roasted carrots",
        description: "Whipped feta, hot honey, crushed pistachio.",
        price: "16",
        dietary: ["v", "gf"],
      },
      {
        name: "Charred octopus",
        description: "Chickpea purée, smoked paprika oil, grilled lemon.",
        price: "24",
        dietary: ["gf"],
      },
    ],
  },
  {
    name: "Mains",
    dishes: [
      {
        name: "Saffron rice of the day",
        description:
          "Bomba rice cooked over the coals with market vegetables and alioli.",
        price: "26",
        dietary: ["v", "gf"],
      },
      {
        name: "Wood-grilled half chicken",
        description:
          "Marinated overnight in lemon and bay, served with pan drippings.",
        price: "29",
        dietary: ["gf"],
      },
      {
        name: "Whole branzino",
        description:
          "Grilled over almond wood — salsa verde, shaved fennel, grilled lemon.",
        price: "38",
        dietary: ["gf"],
      },
      {
        name: "Slow lamb shoulder for two",
        description:
          "Eight hours by the fire — flatbread, pickled onion, yogurt with mint.",
        price: "58",
      },
    ],
  },
  {
    name: "Dessert",
    dishes: [
      {
        name: "Olive oil cake",
        description: "Candied citrus, soft cream.",
        price: "11",
        dietary: ["v"],
      },
      {
        name: "Basque cheesecake",
        description: "Burnt on top, barely set in the middle.",
        price: "12",
        dietary: ["v", "gf"],
      },
      {
        name: "Chocolate torta",
        description: "Warm from the hearth, arbequina oil, sea salt.",
        price: "12",
        dietary: ["v"],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Practicalities — hours and FAQs agree with each other              */
/* ------------------------------------------------------------------ */

const hours = [
  { days: "Monday", time: "Closed" },
  { days: "Tuesday – Thursday", time: "5:00 – 10:00 pm" },
  { days: "Friday – Saturday", time: "5:00 – 11:00 pm" },
  { days: "Sunday", time: "4:00 – 9:00 pm" },
]

const visitFaqs: VisitFaq[] = [
  {
    question: "Do I need a reservation?",
    answer:
      "It helps, but it isn't required. We hold half the room for walk-ins every night, seated in order of arrival — the wait is usually shortest before 6 pm and after 9. Reservations open thirty days out and are confirmed by phone at (415) 555-0198.",
  },
  {
    question: "Can the kitchen handle dietary restrictions?",
    answer:
      "Most nights, yes, and happily. The menu marks vegetarian and gluten-free dishes, and the kitchen adapts many others on request. Because everything is cooked over one wood fire, we can't guarantee a fully allergen-free environment — for serious allergies, call ahead and Marta will walk you through what's safe that week.",
  },
  {
    question: "What is your corkage policy?",
    answer:
      "You're welcome to bring wine we don't have on our list — corkage is $30 per 750ml bottle, two bottles per table. We waive one corkage fee for each bottle you order from our list, which leans on small Mallorcan and Spanish growers.",
  },
  {
    question: "Where should we park, and what about transit?",
    answer:
      "Street parking is easiest on Florida Street, a block over from the busier stretch of 18th. By transit, the 24th Street Mission BART station is a ten-minute walk, and the 33 and 27 buses both stop within two blocks. There are bike racks just past the green door.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Very. We have high chairs, and the kitchen will do half portions of most fire dishes for younger eaters. The room is calmest at the first seatings — Sundays from 4 pm are especially good for families.",
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
        cta={{ label: "Reserve a table", href: "#reservations" }}
      />

      <main>
        <HeroFullImage
          name="Casa Olea"
          tagline="Wood-fire cooking from the Mediterranean coast, on a quiet corner of the Mission."
          imageAlt="The dining room of Casa Olea at dusk, candlelight on linen and a wood-fired hearth glowing at the back"
          reserveCta={{ label: "Reserve a table", href: "#reservations" }}
          hoursLine="Open Tuesday through Sunday · 2841 18th Street, San Francisco"
        />

        <div id="story">
          <StoryIntro
            eyebrow="our story"
            heading="An olive tree, a hearth, and a corner room"
            paragraphs={[
              "Casa Olea takes its name from the olive tree in the courtyard of Marta Serra's grandmother's house outside Palma. Summers there were long tables under its branches — bread rubbed with tomato, fish straight off the coals, nobody in a hurry to leave.",
              "In 2019, Marta and her brother Tomás took over a corner room on 18th Street, built a wood-fired hearth where the old counter stood, and started cooking the food they grew up eating. No gas line in the kitchen. If it isn't touched by the fire, it isn't on the menu.",
              "Six years on, the menu still changes with the market and the wood still comes in on Tuesdays. The table is set for the neighborhood first — walk-ins keep half the room every night.",
            ]}
            photoLeft={{
              alt: "Loaves of hearth bread cooling on the pass at Casa Olea",
              caption: "the day's bread, out of the embers by four",
            }}
            photoRight={{
              alt: "The olive tree branch hung over the doorway of Casa Olea's dining room",
              caption: "an olea branch from Mallorca, over the door since day one",
            }}
          />
        </div>

        <MenuHighlights
          eyebrow="from the kitchen"
          heading="Signatures of the house"
          dishes={[
            {
              name: "Hearth flatbread",
              description:
                "Blistered in the wood oven — 'nduja honey, ricotta, wild oregano.",
              price: "14",
              imageAlt:
                "Charred hearth flatbread with ricotta and 'nduja honey on a ceramic plate",
            },
            {
              name: "Charred octopus",
              description: "Chickpea purée, smoked paprika oil, grilled lemon.",
              price: "24",
              dietary: ["gf"],
              imageAlt:
                "Charred octopus tentacle over chickpea purée, dusted with smoked paprika",
            },
            {
              name: "Hearth-roasted carrots",
              description: "Whipped feta, hot honey, crushed pistachio.",
              price: "16",
              dietary: ["v", "gf"],
              imageAlt:
                "Ember-roasted carrots over whipped feta scattered with pistachio",
            },
            {
              name: "Whole branzino",
              description:
                "Grilled over almond wood — salsa verde, shaved fennel, grilled lemon.",
              price: "38",
              dietary: ["gf"],
              imageAlt:
                "Whole wood-grilled branzino with charred lemon halves and fennel",
            },
          ]}
        />

        <MenuList
          eyebrow="the menu"
          heading="Dinner, from the fire"
          categories={menuCategories}
          withTabs={false}
          dietaryNote="v — vegetarian · gf — gluten-free · the kitchen happily adapts most dishes"
        />

        <GalleryGrid
          eyebrow="the room"
          heading="Evenings at Casa Olea"
          images={[
            {
              alt: "The full dining room of Casa Olea at golden hour, tables set and the hearth glowing",
              caption: "the corner room on 18th street, just before first seating",
            },
            { alt: "A whole branzino on the grill over almond-wood embers" },
            {
              alt: "Two glasses of vermouth and a plate of olives on the marble bar",
            },
            {
              alt: "Tomás Serra carving slow-roasted lamb shoulder at the pass",
              caption: "tomás carving the sunday lamb",
            },
            { alt: "Hands tearing hearth bread over a shared table" },
            { alt: "Stacked almond firewood beside the oven door" },
          ]}
        />

        <PressQuotes
          eyebrow="in the press"
          quotes={[
            {
              text: "The lamb shoulder alone justifies the wait — Casa Olea cooks with the confidence of a place three times its age.",
              source: "Eater SF, 2025",
            },
            {
              text: "The Mission's warmest room: all firelight, olive oil, and the smell of bread coming out of the hearth.",
              source: "San Francisco Chronicle, 2024",
            },
            {
              text: "A neighborhood bistro that whispers instead of shouts.",
              source: "Bon Appétit, 2025",
            },
          ]}
        />

        <ChefTeam
          eyebrow="the people"
          heading="The Serras, at the pass and in the room"
          chef={{
            name: "Marta Serra",
            role: "chef & co-owner",
            bio: "Marta learned to cook in her grandmother Antònia's kitchen outside Palma, where the fire was lit before the coffee was. She spent a decade in Barcelona kitchens before moving to San Francisco, and opened Casa Olea in 2019 with one rule carried over from Mallorca: if it isn't touched by the fire, it isn't on the menu. She still starts every service by tasting the day's olive oil.",
            imageAlt:
              "Marta Serra at the hearth of Casa Olea, turning a pan over the almond-wood coals",
            caption: "marta at the hearth, an hour before first seating",
          }}
          second={{
            name: "Tomás Serra",
            role: "co-owner, wine & the room",
            bio: "Marta's brother runs the dining room and the cellar — a short list that leans on small Mallorcan and Spanish growers he visits every spring. If a bottle is open at the marble bar, he poured it.",
            imageAlt: "Tomás Serra pouring vermouth at the marble bar of Casa Olea",
          }}
        />

        <ReservationForm
          eyebrow="reservations"
          heading="Request a table"
          phoneNote="or call (415) 555-0198"
        />

        <div id="visit">
          <HoursLocation
            eyebrow="visit us"
            heading="Hours & location"
            hours={hours}
            addressLines={[
              "Casa Olea",
              "2841 18th Street",
              "San Francisco, CA 94110",
            ]}
            locationNote="On the corner of 18th and Florida — look for the olive branch over the green door. Walk-ins keep half the room every night."
            mapAlt="Map showing Casa Olea on the corner of 18th and Florida Streets in the Mission"
            directionsHref="https://maps.google.com/?q=2841+18th+Street+San+Francisco"
          />
        </div>

        <FaqVisit
          eyebrow="before you visit"
          heading="Good to know"
          faqs={visitFaqs}
        />

        <NewsletterTableNotes
          eyebrow="table notes"
          heading="A monthly letter from the kitchen"
          supportText="Once a month, Marta writes about what the market brought in, what the fire is cooking, and which Mondays are still open for the long table. No offers, no noise — just notes."
        />
      </main>

      <FooterMinimal
        brand={
          <span className="font-serif text-[17px] font-medium text-foreground">
            Casa Olea · 2841 18th Street, San Francisco
          </span>
        }
        links={[
          { label: "Menu", href: "#menu" },
          { label: "Reservations", href: "#reservations" },
          { label: "Private dining", href: "mailto:events@casaolea.com" },
          { label: "(415) 555-0198", href: "tel:+14155550198" },
        ]}
        socials={[
          { platform: "instagram", href: "https://instagram.com/casaolea" },
        ]}
      />
    </div>
  )
}
