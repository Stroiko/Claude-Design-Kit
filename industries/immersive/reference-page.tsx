/**
 * reference-page.tsx
 * THE canonical assembly example for the immersive direction — and ONE example commitment,
 * not a house style. The DIRECTION.md Commitment Protocol requires inventing a bespoke
 * palette/type/atmosphere per project; this page shows the protocol fully executed for one
 * fictional subject. A different subject (a game, a festival, a film) must produce a
 * DIFFERENT commitment — copy the composition pattern and the commitment MECHANISM below,
 * never this page's colors or fonts.
 *
 * THE EXAMPLE COMMITMENT: SIGNAL BLOOM — the new album by Vela Nox, recorded over one
 * polar winter in a disused planetarium north of Tromsø, out October 2, 2026. The full
 * commitment — rejected candidates, chosen art direction, every axis — is written as the
 * EMBEDDED ARTIFACT above COMMITMENT_CSS below; that comment-plus-token-block pair is the
 * template every generated immersive page must carry.
 *
 * Composition rules this page demonstrates (all from ./DIRECTION.md physics):
 *   1. SmoothScrollProvider wraps the entire page once, at the root — easing over native
 *      scroll, never scroll-jacking; anchors and sticky sections keep working.
 *   2. CustomCursor is the site's ONE recurring signal-color motif. magnetic-button.tsx is
 *      therefore deliberately ABSENT — a page gets the cursor OR magnetic buttons, never
 *      both, and the cursor won this site.
 *   3. Exactly ONE WebGL canvas: webgl-hero-gradient. Its colors resolve from the
 *      commitment tokens at mount — declare a different token block, get a different aurora.
 *   4. Preloader is honest — this page genuinely loads a shader hero and display fonts;
 *      progress is real signals with a 2.5s hard cap.
 *   5. Every scene below the hero is DOM + rAF-lerped scroll scrub. Nothing loops except
 *      the hero atmosphere. type-wall is the ten-second typographic title card announcing
 *      the release; the horizontal gallery that follows is the track list — two different
 *      scenes, one scrub grammar.
 *   6. Reduced motion is absolute: Lenis and the cursor never mount, the preloader
 *      dismisses instantly, and every section renders its designed static fallback.
 *
 * USE WHEN: Building a full immersive site — start from this assembly pattern, with YOUR
 *           OWN commitment stated first.
 * INDUSTRY FIT: immersive. AVOID FOR: other industries — follow their own DIRECTION.md
 *           and sections; a normal site that wants "some animation" is not this.
 * PAIRS WITH: every file in ./sections
 * DEPS: ./sections/* (smooth-scroll-provider, custom-cursor, preloader,
 *       webgl-hero-gradient, scroll-story, type-wall, horizontal-gallery,
 *       manifesto-statement, image-scene, credits-contact, scene-footer)
 * NOTE: The header is a tiny inline wordmark bar floated over the hero — an experience
 *       site, not a product navbar. image-scene ships without `src` because the kit has
 *       no binary assets; swap in the artist's photography via its src/alt props.
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
          className="font-(family-name:--font-display) text-sm leading-none font-extrabold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          VELA NOX
        </a>
        <nav aria-label="Site" className="flex items-center gap-x-6">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-(family-name:--font-body) text-[13px] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

/**
 * THE EMBEDDED COMMITMENT ARTIFACT (DIRECTION.md: "ship the commitment inside the
 * artifact"). Every generated immersive page must carry a block like this, verbatim
 * format, directly above its token style block — rejections included, so the protocol
 * run is checkable in the output and diffable against other pages' commitments:
 *
 * FIRST INSTINCT (rejected): dark void + hot magenta "music site" — the default neon
 *   attractor, a decoration choice rather than a decision about THIS record.
 * RUNNER-UP (rejected): editorial ink-on-paper with a red seal — handsome, but it reads
 *   as a book about the album, not the album; too quiet for a planetarium of sound.
 * ART DIRECTION: cinematic — a record made under a dome of projected stars demands
 *   title-sequence calm, full-bleed darkness, patient type.
 * MOOD: nocturnal, astronomical, patient
 * VALUE: dark stage (a planetarium at showtime, not a void by default)
 * TEMPERATURE: cold field, one warm-violet cast; the heat lives only in the signal
 * STAGE + SIGNAL: stage black with warm-violet cast + hot magenta (an aurora over a dome)
 * TYPE CLASS: sans, techno-wide — Unbounded (display) + Sora (body)
 * DENSITY: sparse and monumental
 * HERO COMPOSITION: bottom-left
 * ATMOSPHERE: gradient (slow aurora drift)
 * MOTIF: the cursor glow
 *
 * The token block below is that commitment made executable. THIS PAIR — rationale
 * comment + token block — is what you replace per project; the assembly is what you keep.
 */
const COMMITMENT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Sora:wght@400;600&display=swap');
:root {
  --background: oklch(0.11 0.005 300);
  --foreground: oklch(0.96 0.005 90);
  --card: oklch(0.15 0.008 300);
  --card-foreground: oklch(0.96 0.005 90);
  --primary: oklch(0.62 0.26 350);
  --primary-foreground: oklch(0.11 0.005 300);
  --secondary: oklch(0.2 0.01 300);
  --secondary-foreground: oklch(0.96 0.005 90);
  --muted: oklch(0.18 0.008 300);
  --muted-foreground: oklch(0.62 0.01 300);
  --accent: oklch(0.25 0.03 300);
  --accent-foreground: oklch(0.96 0.005 90);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.62 0.26 350);
  --radius: 0rem;
  --font-display: "Unbounded", ui-sans-serif, sans-serif;
  --font-body: "Sora", ui-sans-serif, sans-serif;
}
`

export default function ReferencePage() {
  return (
    <SmoothScrollProvider>
      {/* The commitment made real: swap this block per project, keep the assembly. */}
      <style dangerouslySetInnerHTML={{ __html: COMMITMENT_CSS }} />
      {/* The cursor glow is this site's one signal-color motif — magnetic-button stays out. */}
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
