/**
 * reference-page.tsx
 * THE canonical assembly example for the e-commerce direction. Read this file to see how the
 * sections in ./sections snap together into one storefront telling one story: "Aldercrest",
 * a fictional small-batch home-goods brand from Kingston, New York. Every section receives
 * explicit props so the catalog stays consistent — same products, same prices (Ash Rolling
 * Pin $48, Walnut Serving Board $58, Stoneware Mixing Bowl $54), same four categories
 * (Kitchen / Ceramics / Textiles / Care), same promises (60-day returns, repairs for life).
 * Copy the composition pattern, swap the data.
 *
 * USE WHEN: Building a full e-commerce storefront — start from this assembly, not from scratch.
 * INDUSTRY FIT: ecommerce. AVOID FOR: other industries — follow their own DIRECTION.md and sections.
 * PAIRS WITH: every file in ./sections, /components/navigation
 * DEPS: /components/navigation/navbar-simple, /components/navigation/footer-columns,
 *       ./sections/* (announcement-bar, hero-product, category-tiles, featured-products,
 *       product-story, values-band, bestsellers-row, reviews-grid, lookbook-split,
 *       faq-shipping, newsletter-checkout)
 *
 * NOTE: Instrument Sans is loaded by DIRECTION.md's Google Fonts import — use `font-sans`.
 */
import { Leaf, Package, RotateCcw, Wrench } from "lucide-react"

import { NavbarSimple } from "@/components/navigation/navbar-simple"
import { FooterColumns } from "@/components/navigation/footer-columns"
import { AnnouncementBar } from "@/industries/ecommerce/sections/announcement-bar"
import { HeroProduct } from "@/industries/ecommerce/sections/hero-product"
import {
  CategoryTiles,
  type CategoryTile,
} from "@/industries/ecommerce/sections/category-tiles"
import {
  FeaturedProducts,
  type FeaturedProduct,
} from "@/industries/ecommerce/sections/featured-products"
import { ProductStory } from "@/industries/ecommerce/sections/product-story"
import {
  ValuesBand,
  type ValueProp,
} from "@/industries/ecommerce/sections/values-band"
import {
  BestsellersRow,
  type BestsellerProduct,
} from "@/industries/ecommerce/sections/bestsellers-row"
import {
  ReviewsGrid,
  type Review,
} from "@/industries/ecommerce/sections/reviews-grid"
import {
  LookbookSplit,
  type LookbookImage,
} from "@/industries/ecommerce/sections/lookbook-split"
import {
  FaqShipping,
  type ShippingFaq,
} from "@/industries/ecommerce/sections/faq-shipping"
import { NewsletterCheckout } from "@/industries/ecommerce/sections/newsletter-checkout"

/* ------------------------------------------------------------------ */
/* Brand                                                              */
/* ------------------------------------------------------------------ */

const logo = (
  <a
    href="/"
    aria-label="Aldercrest home"
    className="font-sans text-lg font-semibold tracking-tight text-foreground"
  >
    Aldercrest
  </a>
)

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Story", href: "/story" },
  { label: "Journal", href: "/journal" },
]

/* ------------------------------------------------------------------ */
/* Catalog: the four doors and the products behind them               */
/* ------------------------------------------------------------------ */

const categories: CategoryTile[] = [
  {
    name: "Kitchen",
    itemCount: "24 items",
    href: "/shop/kitchen",
    imageAlt: "Olivewood utensils and an ash rolling pin arranged on studio gray",
  },
  {
    name: "Ceramics",
    itemCount: "18 items",
    href: "/shop/ceramics",
    imageAlt: "Speckled stoneware bowls stacked on a warm gray surface",
  },
  {
    name: "Textiles",
    itemCount: "12 items",
    href: "/shop/textiles",
    imageAlt: "Folded flax linen tea towels in oat and clay tones",
  },
  {
    name: "Care",
    itemCount: "7 items",
    href: "/shop/care",
    imageAlt: "Board butter tin and a horsehair brush on studio gray",
  },
]

const featuredProducts: FeaturedProduct[] = [
  {
    name: "Ash Rolling Pin",
    price: 48,
    href: "/products/ash-rolling-pin",
    imageAlt: "Tapered ash rolling pin on a warm gray studio surface",
  },
  {
    name: "Stoneware Mixing Bowl",
    price: 54,
    href: "/products/stoneware-mixing-bowl",
    imageAlt: "Speckled stoneware mixing bowl, three-quarter view",
  },
  {
    name: "Flax Linen Tea Towels, set of 3",
    price: 36,
    href: "/products/flax-linen-tea-towels",
    imageAlt: "Three folded flax linen tea towels in oat, clay, and moss",
  },
  {
    name: "Walnut Serving Board",
    price: 58,
    originalPrice: 72,
    href: "/products/walnut-serving-board",
    imageAlt: "Long walnut serving board with a leather hanging loop",
  },
  {
    name: "Ceramic Pour-Over Set",
    price: 88,
    availability: "back-in-stock",
    href: "/products/ceramic-pour-over-set",
    imageAlt: "Matte stoneware pour-over dripper resting on its carafe",
  },
  {
    name: "Olivewood Utensil Set",
    price: 62,
    href: "/products/olivewood-utensil-set",
    imageAlt: "Five olivewood cooking utensils fanned on studio gray",
  },
  {
    name: "Speckled Dinner Plates, set of 4",
    price: 96,
    availability: "sold-out",
    href: "/products/speckled-dinner-plates",
    imageAlt: "Stack of four speckled stoneware dinner plates",
  },
  {
    name: "Waxed Canvas Apron",
    price: 74,
    href: "/products/waxed-canvas-apron",
    imageAlt: "Waxed canvas apron with leather straps on a hook",
  },
]

const bestsellers: BestsellerProduct[] = [
  {
    name: "Ash Rolling Pin",
    price: 48,
    href: "/products/ash-rolling-pin",
    imageAlt: "Tapered ash rolling pin on a warm gray studio surface",
  },
  {
    name: "Stoneware Mixing Bowl",
    price: 54,
    href: "/products/stoneware-mixing-bowl",
    imageAlt: "Speckled stoneware mixing bowl, three-quarter view",
  },
  {
    name: "Flax Linen Tea Towels, set of 3",
    price: 36,
    href: "/products/flax-linen-tea-towels",
    imageAlt: "Three folded flax linen tea towels in oat, clay, and moss",
  },
  {
    name: "Walnut Serving Board",
    price: 58,
    originalPrice: 72,
    href: "/products/walnut-serving-board",
    imageAlt: "Long walnut serving board with a leather hanging loop",
  },
]

/* ------------------------------------------------------------------ */
/* Promises: stated once in the band, answered again in the FAQ       */
/* ------------------------------------------------------------------ */

const values: ValueProp[] = [
  {
    icon: Package,
    name: "Small batches",
    line: "Runs of forty or fewer, numbered by hand.",
  },
  {
    icon: Wrench,
    name: "Repairs for life",
    line: "Send it back; we mend it or replace it.",
  },
  {
    icon: Leaf,
    name: "Plastic-free post",
    line: "Paper, card, and starch — nothing else in the box.",
  },
  {
    icon: RotateCcw,
    name: "60-day returns",
    line: "Use it first. Return it if it isn't right.",
  },
]

const reviews: Review[] = [
  {
    quote:
      "I've rolled every pie crust since March with this pin. The weight is exactly right — cold butter doesn't stand a chance, and it wipes clean in seconds.",
    firstName: "Margaret",
    product: { name: "Ash Rolling Pin", href: "/products/ash-rolling-pin" },
  },
  {
    quote:
      "The bowl is heavy enough to stay put while I whisk one-handed. Two years of near-daily use and the glaze hasn't crazed at all.",
    firstName: "Daniel",
    product: {
      name: "Stoneware Mixing Bowl",
      href: "/products/stoneware-mixing-bowl",
    },
  },
  {
    quote:
      "These towels actually dry glassware without lint. They've been washed weekly for a year and only get softer.",
    firstName: "Priya",
    product: {
      name: "Flax Linen Tea Towels",
      href: "/products/flax-linen-tea-towels",
    },
  },
  {
    quote:
      "A knife slipped and gouged the board. I mailed it in, and it came back sanded, re-oiled, and better than new — no charge. That's why I keep ordering.",
    firstName: "Tomás",
    product: {
      name: "Walnut Serving Board",
      href: "/products/walnut-serving-board",
    },
  },
  {
    quote:
      "Morning coffee got noticeably better. The dripper holds heat, and the carafe pours without a single drip down the side.",
    firstName: "Elena",
    product: {
      name: "Ceramic Pour-Over Set",
      href: "/products/ceramic-pour-over-set",
    },
  },
  {
    quote:
      "The apron's waxed canvas shrugs off flour and splatter, and the straps don't dig in during long bake days. It already looks better worn in.",
    firstName: "Sam",
    product: {
      name: "Waxed Canvas Apron",
      href: "/products/waxed-canvas-apron",
    },
  },
]

const lookbookImages: [LookbookImage, LookbookImage] = [
  {
    imageAlt:
      "A floured counter at golden hour — the ash rolling pin resting on half-rolled dough",
    caption: "Sunday galette, the ash pin doing the quiet work.",
  },
  {
    imageAlt:
      "Open shelving with speckled stoneware plates and a linen towel over the rail",
    caption: "Speckled stoneware and flax linen, shelved within reach.",
  },
]

/* ------------------------------------------------------------------ */
/* The practical questions                                            */
/* ------------------------------------------------------------------ */

const faqs: ShippingFaq[] = [
  {
    question: "How long does shipping take, and what does it cost?",
    answer:
      "Orders leave the Kingston workshop within two business days and arrive in three to five across the continental US. Shipping is a flat $6, and free on orders over $75 — everything travels in paper, card, and starch, nothing plastic.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Sixty days, and we mean use it first. Roll a crust with the pin, wash the towels, pour a few mornings of coffee. If a piece isn't right for your kitchen, send it back for a full refund — we'd rather it live somewhere it's used.",
  },
  {
    question: "How do I care for wooden and ceramic pieces?",
    answer:
      "Wood is hand wash only: warm water, mild soap, towel dry, and a coat of board butter about once a month. Stoneware is dishwasher safe, though the glaze keeps its depth longer if washed by hand. Linen goes in the machine warm and only gets softer. Every order includes a linen care card with the specifics.",
  },
  {
    question: "What does repairs for life actually mean?",
    answer:
      "If a piece splits, chips, or wears out of true — this year or in twenty — mail it back and we'll sand, re-oil, re-glaze, or replace it at no charge. You cover postage to us; the return trip is on us. Most repairs are back in your kitchen within three weeks.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes. Choose gift wrap at checkout and we'll pack the piece in unbleached paper tied with cotton twine, tuck in the care card, and handwrite your note — no prices anywhere in the box. Wrapping is $4 per order.",
  },
]

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Kitchen", href: "/shop/kitchen" },
      { label: "Ceramics", href: "/shop/ceramics" },
      { label: "Textiles", href: "/shop/textiles" },
      { label: "Care", href: "/shop/care" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/story" },
      { label: "The workshops", href: "/story/workshops" },
      { label: "Journal", href: "/journal" },
      { label: "Stockists", href: "/stockists" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "/help/shipping" },
      { label: "Repairs for life", href: "/help/repairs" },
      { label: "Care guides", href: "/help/care" },
      { label: "Contact", href: "mailto:hello@aldercrest.com" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* The page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferencePage() {
  return (
    <div className="bg-background font-sans text-foreground">
      <AnnouncementBar
        message="Free shipping over $75 — carbon-neutral delivery"
        scrolling
      />

      <NavbarSimple
        logo={logo}
        links={navLinks}
        cta={{ label: "Cart (0)", href: "/cart" }}
      />

      <main>
        <HeroProduct
          headline="Kitchen tools made to be repaired, not replaced"
          supportingLine="Small-batch home goods from Aldercrest — turned, thrown, and woven by workshops we know by name."
          primaryCta={{ label: "Shop the collection", href: "/shop" }}
          secondaryLink={{ label: "Browse bestsellers", href: "/shop/bestsellers" }}
          imageAlt="Aldercrest ash rolling pin resting on a warm gray studio surface"
          productName="Ash Rolling Pin"
        />

        <CategoryTiles categories={categories} />

        <FeaturedProducts
          heading="New this season"
          shopAllLink={{ label: "Shop all", href: "/shop" }}
          products={featuredProducts}
        />

        <ProductStory
          eyebrow="The Ash Rolling Pin"
          heading="Turned from one tree, finished by one pair of hands"
          paragraphs={[
            "Spun from single-origin ash felled in a Hudson Valley storm, each pin is turned green, air-dried for eight weeks, then finished with a food-safe oil we blend in the workshop. The taper is cut by eye — no two are identical, and none has ever left the lathe unbalanced.",
            "Ash is the wood bakers kept for a reason: dense enough to hold its line under cold butter, light enough to feel the dough through it. Ours will outlast the counter you roll on, and if it ever splits, we repair it. That's the arrangement.",
          ]}
          specs={[
            { label: "Material", value: "Single-origin ash, food-safe oil finish" },
            { label: "Dimensions", value: '19" long, tapered to 1.5"' },
            { label: "Care", value: "Hand wash, re-oil monthly" },
            { label: "Made in", value: "Kingston, New York" },
          ]}
          cta={{ label: "Add to cart — $48", href: "/products/ash-rolling-pin" }}
          imageAlt="Ash rolling pin mid-turn on the lathe, shavings curling away"
          productName="Ash Rolling Pin"
        />

        <ValuesBand values={values} />

        <BestsellersRow
          heading="Most loved"
          shopLink={{ label: "Shop bestsellers", href: "/shop/bestsellers" }}
          products={bestsellers}
        />

        <ReviewsGrid heading="From 1,400+ kitchens" reviews={reviews} />

        <LookbookSplit
          eyebrow="At home"
          intro="We photograph everything twice: once on the studio table, once in the kitchens that keep it. This is the second kind — flour on the counter, towels over the rail, nothing staged that wouldn't stay put."
          images={lookbookImages}
        />

        <FaqShipping
          heading="Good to know"
          supportText="Something we didn't cover?"
          contactLink={{ label: "Contact us", href: "mailto:hello@aldercrest.com" }}
          faqs={faqs}
        />

        <NewsletterCheckout
          heading="First order, 10% off"
          supportingLine="One email a month — new batches, restocks, and workshop notes. Unsubscribe anytime."
          placeholder="you@example.com"
          buttonLabel="Sign up"
        />
      </main>

      <FooterColumns
        logo={logo}
        blurb="Small-batch home goods turned, thrown, and woven in Kingston, New York and the workshops we know by name. Made to be repaired, not replaced."
        columns={footerColumns}
        legal="© 2026 Aldercrest Goods Co. All rights reserved."
        legalLinks={[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ]}
      />
    </div>
  )
}
