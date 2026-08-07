/**
 * reference-page.tsx
 * THE canonical assembly example for the immersive direction. Read this file to see how
 * the sections in ./sections snap together into one stage-black title sequence telling
 * one story: SIGNAL BLOOM, the new album by Vela Nox — eleven tracks recorded over one
 * polar winter in a disused planetarium north of Tromsø, out October 2, 2026. The same
 * track titles, the same emails (tour@velanox.live, mgmt@velanox.live, press@velanox.live),
 * everywhere. Every section receives explicit props so the copy stays consistent. Copy the
 * composition pattern, swap the data.
 *
 * Composition rules this page demonstrates (all from ./DIRECTION.md):
 *   1. SmoothScrollProvider wraps the entire page once, at the root — easing over native
 *      scroll, never scroll-jacking; anchors and sticky sections keep working.
 *   2. CustomCursor is the site's ONE recurring magenta motif. magnetic-button.tsx is
 *      therefore deliberately ABSENT — a page gets the cursor OR magnetic buttons, never
 *      both, and the cursor won this site.
 *   3. Exactly ONE WebGL canvas: webgl-hero-gradient. webgl-hero-particles must never
 *      join it, and no content section below opens a second context.
 *   4. Preloader is honest — this page genuinely loads a shader hero and display fonts;
 *      progress is real signals with a 2.5s hard cap.
 *   5. Every scene below the hero is DOM + rAF-lerped scroll scrub. Nothing loops except
 *      the hero atmosphere. type-wall is the ten-second typographic title card announcing
 *      the release; the horizontal gallery that follows is the track list — two different
 *      scenes, one scrub grammar.
 *   6. Reduced motion is absolute: Lenis and the cursor never mount, the preloader
 *      dismisses instantly, and every section renders its designed static fallback.
 *
 * USE WHEN: Building a full immersive site — start from this assembly, not from scratch.
 * INDUSTRY FIT: immersive. AVOID FOR: other industries — follow their own DIRECTION.md
 *           and sections; a normal site that wants "some animation" is not this.
 * PAIRS WITH: every file in ./sections
 * DEPS: ./sections/* (smooth-scroll-provider, custom-cursor, preloader,
 *       webgl-hero-gradient, scroll-story, type-wall, horizontal-gallery,
 *       manifesto-statement, image-scene, credits-contact, scene-footer)
 * NOTE: Unbounded (display) and Sora (body) load via the Google Fonts @import declared in
 *       ./DIRECTION.md — never import a font here. The header is a tiny inline wordmark
 *       bar (Unbounded wordmark left, three 13px uppercase tracking anchor links right)
 *       floated over the hero — an experience site, not a product navbar. image-scene
 *       ships without `src` because the kit has no binary assets; swap in the artist's
 *       photography via its src/alt props.
 */
import { SmoothScrollProvider } from "@/industries/immersive/sections/smooth-scroll-provider"
import { CustomCursor } from "@/industries/immersive/sections/custom-cursor"
import { Preloader } from "@/industries/immersive/sections/preloader"
import { WebglHeroGradient } from "@/industries/immersive/sections/webgl-hero-gradient"
import { ScrollStory } from "@/industries/immersive/sections/scroll-story"
import { TypeWall } from "@/industries/immersive/sections/type-wall"
import { HorizontalGallery } from "@/industries/immersive/sections/horizontal-gallery"
import { ManifestoStatement } from "@/industries/immersive/sections/manifesto-statement"
import { ImageScene } from "@/industries/immersive/sections/image-scene"
import { CreditsContact } from "@/industries/immersive/sections/credits-contact"
import { SceneFooter } from "@/industries/immersive/sections/scene-footer"

/* ------------------------------------------------------------------ */
/* Minimal inline header: Unbounded wordmark left, three film-credit  */
/* anchor links right, floated over the hero. Built inline on purpose */
/* — a shared navbar would break the title-sequence illusion.         */
/* ------------------------------------------------------------------ */

const headerLinks = [
  { label: "The story", href: "#story" },
  { label: "The record", href: "#record" },
  { label: "Tour", href: "#tour" },
]

function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <a
          href="/"
          className="font-[Unbounded] text-sm leading-none font-extrabold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          VELA NOX
        </a>
        <nav aria-label="Site" className="flex items-center gap-x-6">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-[Sora] text-[13px] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
    <SmoothScrollProvider>
      {/* The cursor glow is this site's one magenta motif — magnetic-button stays out. */}
      <CustomCursor>
        <div className="relative bg-background text-foreground">
          {/* Honest opening beat: this page really does load a shader and display fonts. */}
          <Preloader label="Signal Bloom" sublabel="Vela Nox" />

          <SiteHeader />

          <main>
            {/* The page's ONE WebGL canvas. h1 lives here; everything below is h2. */}
            <WebglHeroGradient
              label="Vela Nox — new album"
              titleLines={["SIGNAL", "BLOOM"]}
              subline="Eleven tracks recorded in a disused planetarium. Out October 2."
              cta={{ label: "Pre-save the album", href: "#record" }}
            />

            {/* Pinned storytelling: three scenes, scrubbed, like interactive credits. */}
            <div id="story">
              <ScrollStory
                scenes={[
                  {
                    title: "First light",
                    line: "Recorded over one polar winter in a disused planetarium north of Tromsø.",
                    visualCaption: "The planetarium dome, session one",
                  },
                  {
                    title: "The bloom",
                    line: "Every synth on the record was resampled through the dome's forty-meter natural reverb.",
                    visualCaption: "Modular rig under the projector",
                  },
                  {
                    title: "Afterglow",
                    line: "Eleven tracks, sequenced as a single unbroken transmission from dusk to dawn.",
                    visualCaption: "Vela Nox, final playback",
                  },
                ]}
              />
            </div>

            {/* Typographic title card — type IS the imagery for ten seconds. */}
            <TypeWall rows={["SIGNAL", "BLOOM", "VELA NOX", "OUT 10.02"]} />

            {/* The track list as a sticky horizontal scrub. */}
            <div id="record">
              <HorizontalGallery
                label="The record — eleven transmissions"
                items={[
                  { caption: "Low Orbit", meta: "Track 01 — 03:58" },
                  { caption: "Chlorophyll", meta: "Track 04 — 04:41" },
                  { caption: "Signal Bloom", meta: "Title track — 06:12" },
                  { caption: "Vantablack Sun", meta: "Track 08 — 03:07" },
                  { caption: "Afterglow", meta: "Closer — 07:26" },
                ]}
              />
            </div>

            {/* The editorial thesis in one breath, emphasis lit by scroll. */}
            <ManifestoStatement
              label="The premise"
              sentence="Signal Bloom was written in the dark, mixed at dawn, and mastered for the moment a room full of strangers becomes one organism."
              emphasis={["dark", "dawn", "organism"]}
            />

            {/* Cinematic photo scene. src is empty here (the kit ships no binary
                assets) — the artist's photography goes in via src/alt. */}
            <ImageScene caption="The planetarium dome, Tromsø — final playback at dawn" />

            {/* Film credits, then the tour CTA — the page's magenta primary CTA. */}
            <div id="tour">
              <CreditsContact
                label="Credits"
                credits={[
                  { role: "Written, performed & produced", name: "Vela Nox" },
                  { role: "Mixed", name: "Mari Lindvik" },
                  { role: "Mastered", name: "Jonas Eide, Halvorsen Mastering" },
                  { role: "Dome recordings", name: "Tromsø Planetarium, sessions I–IV" },
                  { role: "Artwork & light design", name: "Studio Overvintre" },
                  { role: "Live visuals", name: "Nordlys Collective" },
                ]}
                cta={{ label: "BOOK THE TOUR", email: "tour@velanox.live" }}
                contacts={[
                  { label: "Management", email: "mgmt@velanox.live" },
                  { label: "Press", email: "press@velanox.live" },
                ]}
              />
            </div>
          </main>

          {/* Quiet close. Bone and muted only — the signal stays upstage. */}
          <SceneFooter
            name="VELA NOX"
            year="2026"
            microcopy="Made loud in Tromsø"
            links={[
              { label: "Listen", href: "#record" },
              { label: "Instagram", href: "https://instagram.com/velanox" },
              { label: "Press kit", href: "mailto:press@velanox.live" },
            ]}
          />
        </div>
      </CustomCursor>
    </SmoothScrollProvider>
  )
}
