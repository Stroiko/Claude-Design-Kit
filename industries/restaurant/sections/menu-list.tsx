/**
 * menu-list.tsx
 * USE WHEN: The full menu as a quiet, book-like page — categories under thin rules, each dish a
 *           name–dotted-leader–price row with its description beneath. Optionally tabbed by
 *           category via `withTabs` for long menus.
 * INDUSTRY FIT: restaurant. AVOID FOR: saas — this is typeset like a printed menu; pricing
 *           software belongs in a pricing table, not a dotted-leader list.
 * PAIRS WITH: menu-highlights.tsx, reservation-form.tsx, hours-location.tsx
 * DEPS: /primitives/tabs
 * NOTE: `font-serif` resolves to Fraunces (display) / Lora (body) via the Google Fonts import
 *       declared in industries/restaurant/DIRECTION.md.
 */
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"

export interface MenuDish {
  name: string
  description?: string
  /** Display string, e.g. "24". Rendered with tabular-nums. */
  price: string
  /** Short dietary marks, e.g. ["v", "gf"] — set small and italic after the name. */
  dietary?: string[]
}

export interface MenuCategory {
  name: string
  dishes: MenuDish[]
}

export interface MenuListProps {
  eyebrow?: string
  heading?: string
  categories?: MenuCategory[]
  /** When true, categories become tabs instead of a stacked list. */
  withTabs?: boolean
  /** Legend under the menu explaining dietary marks. Pass "" to hide. */
  dietaryNote?: string
  className?: string
}

const defaultCategories: MenuCategory[] = [
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
        description: "Bomba rice cooked over the coals with market vegetables and alioli.",
        price: "26",
        dietary: ["v", "gf"],
      },
      {
        name: "Wood-grilled half chicken",
        description: "Marinated overnight in lemon and bay, served with pan drippings.",
        price: "29",
        dietary: ["gf"],
      },
      {
        name: "Whole branzino",
        description: "Grilled over almond wood — salsa verde, shaved fennel, grilled lemon.",
        price: "38",
        dietary: ["gf"],
      },
      {
        name: "Slow lamb shoulder for two",
        description: "Eight hours by the fire — flatbread, pickled onion, yogurt with mint.",
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

function CategoryBlock({ category }: { category: MenuCategory }) {
  return (
    <div>
      <h3 className="border-b border-border pb-3 font-serif text-[23px] font-medium text-foreground md:text-[30px]">
        {category.name}
      </h3>
      <ul className="mt-6 space-y-7">
        {category.dishes.map((dish) => (
          <li key={dish.name}>
            <div className="flex items-baseline gap-3">
              <p className="font-serif text-[17px] font-medium text-foreground">
                {dish.name}
                {dish.dietary && dish.dietary.length > 0 ? (
                  <span className="ml-2 text-sm font-normal italic text-muted-foreground">
                    {dish.dietary.join(", ")}
                  </span>
                ) : null}
              </p>
              <span
                aria-hidden="true"
                className="min-w-6 flex-1 border-b border-dotted border-border"
              />
              <p className="text-[17px] tabular-nums text-foreground">
                {dish.price}
              </p>
            </div>
            {dish.description ? (
              <p className="mt-1.5 max-w-[52ch] text-[17px] leading-[1.7] text-muted-foreground">
                {dish.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MenuList({
  eyebrow = "the menu",
  heading = "Dinner, from the fire",
  categories = defaultCategories,
  withTabs = false,
  dietaryNote = "v — vegetarian · gf — gluten-free · the kitchen happily adapts most dishes",
  className,
}: MenuListProps) {
  return (
    <section id="menu" className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm italic lowercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[30px] leading-[1.15] font-medium text-foreground md:text-[40px]">
          {heading}
        </h2>

        {withTabs && categories.length > 0 ? (
          <Tabs defaultValue={categories[0].name} className="mt-10">
            <TabsList variant="line">
              {categories.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent
                key={category.name}
                value={category.name}
                className="mt-8"
              >
                <CategoryBlock category={category} />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="mt-12 space-y-16">
            {categories.map((category) => (
              <CategoryBlock key={category.name} category={category} />
            ))}
          </div>
        )}

        {dietaryNote ? (
          <p className="mt-14 border-t border-border pt-6 text-sm italic text-muted-foreground">
            {dietaryNote}
          </p>
        ) : null}
      </div>
    </section>
  )
}
