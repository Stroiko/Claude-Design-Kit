/**
 * chef-team.tsx
 * USE WHEN: Putting faces to the food — an asymmetric portrait-and-text feature for the chef,
 *           with an optional smaller, offset block for a second person. Reads like a magazine
 *           profile, never a team grid: no cards, no social icons, no hover states.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — founder credibility there is a LinkedIn-style
 *           team grid or an about page; a serif chef portrait would read as hospitality.
 * PAIRS WITH: story-intro.tsx, press-quotes.tsx, gallery-grid.tsx
 * DEPS: /lib/utils only
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"

export interface TeamMember {
  name: string
  /** Set small and italic under the name, e.g. "chef & co-owner". */
  role: string
  /** Two or three sentences. Biography, not résumé. */
  bio: string
  /** Portrait photo. Omitted: warm placeholder block per DIRECTION.md. */
  imageSrc?: string
  imageAlt: string
  /** Italic caption set in the margin under the portrait. */
  caption?: string
}

export interface ChefTeamProps {
  eyebrow?: string
  heading?: string
  /** The lead portrait — usually the chef. */
  chef?: TeamMember
  /** Optional second person, rendered smaller and offset. Pass null to omit. */
  second?: TeamMember | null
  className?: string
}

function PortraitSlot({
  member,
  aspect,
}: {
  member: TeamMember
  aspect: string
}) {
  return member.imageSrc ? (
    <img
      src={member.imageSrc}
      alt={member.imageAlt}
      className={cn("block w-full object-cover", aspect)}
    />
  ) : (
    <div
      role="img"
      aria-label={member.imageAlt}
      className={cn("w-full bg-secondary", aspect)}
    />
  )
}

export function ChefTeam({
  eyebrow = "the people",
  heading = "The Serras, at the pass and in the room",
  chef = {
    name: "Marta Serra",
    role: "chef & co-owner",
    bio: "Marta learned to cook in her grandmother Antònia's kitchen outside Palma, where the fire was lit before the coffee was. She spent a decade in Barcelona kitchens before moving to San Francisco, and opened Casa Olea in 2019 with one rule carried over from Mallorca: if it isn't touched by the fire, it isn't on the menu. She still starts every service by tasting the day's olive oil.",
    imageAlt:
      "Marta Serra at the hearth of Casa Olea, turning a pan over the almond-wood coals",
    caption: "marta at the hearth, an hour before first seating",
  },
  second = {
    name: "Tomás Serra",
    role: "co-owner, wine & the room",
    bio: "Marta's brother runs the dining room and the cellar — a short list that leans on small Mallorcan and Spanish growers he visits every spring. If a bottle is open at the marble bar, he poured it.",
    imageAlt: "Tomás Serra pouring vermouth at the marble bar of Casa Olea",
  },
  className,
}: ChefTeamProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 max-w-xl font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        {/* Lead portrait — asymmetric split, photo takes the wider column */}
        <div className="mt-14 grid gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
          <figure>
            <PortraitSlot member={chef} aspect="aspect-[4/5]" />
            {chef.caption ? (
              <figcaption className="mt-3 text-sm italic text-muted-foreground">
                {chef.caption}
              </figcaption>
            ) : null}
          </figure>

          <div className="md:pt-10">
            <h3 className="font-serif text-[23px] leading-tight font-medium text-foreground md:text-[30px]">
              {chef.name}
            </h3>
            <p className="mt-1.5 text-sm italic lowercase text-muted-foreground">
              {chef.role}
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-foreground/90">
              {chef.bio}
            </p>
          </div>
        </div>

        {/* Second person — smaller, offset to the right, text leads */}
        {second ? (
          <div className="mt-16 grid gap-8 border-t border-border pt-12 md:ml-auto md:mt-20 md:w-4/5 md:grid-cols-[3fr_2fr] md:gap-12">
            <div>
              <h3 className="font-serif text-[23px] leading-tight font-medium text-foreground">
                {second.name}
              </h3>
              <p className="mt-1.5 text-sm italic lowercase text-muted-foreground">
                {second.role}
              </p>
              <p className="mt-5 max-w-[55ch] text-[17px] leading-[1.7] text-muted-foreground">
                {second.bio}
              </p>
            </div>

            <figure>
              <PortraitSlot member={second} aspect="aspect-square" />
              {second.caption ? (
                <figcaption className="mt-3 text-sm italic text-muted-foreground">
                  {second.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}
      </div>
    </section>
  )
}
