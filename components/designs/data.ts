import {
    Baby,
    BookOpen,
    Dumbbell,
    Footprints,
    Gem,
    LayoutGrid,
    Shirt,
    ShoppingBasket,
    Smartphone,
    Sofa,
    Sparkles,
    SprayCan,
    Tag,
    Watch,
    type LucideIcon,
} from "lucide-react"
import type { PublicTemplate } from "@/lib/templates-api"

/* Designs come from the Templates API (lib/templates-api.ts). Categories are
   whatever the API reports, so a new one appears without a code change; the
   table below only adds an icon and a one-line blurb to the ones we know about.
   Keyed by slugified name, with a few aliases ("fashion" is "clothing"). */
export type Category = {
    slug: string
    name: string
    blurb: string
    icon: LucideIcon
}

export const ALL = "all"

const known: Record<string, Pick<Category, "blurb" | "icon">> = {
    watches: { blurb: "Clean, product-first layouts that let the timepiece do the talking.", icon: Watch },
    fragrances: { blurb: "Editorial designs with room for notes, moods and bottle photography.", icon: SprayCan },
    clothing: { blurb: "Lookbook-style grids for kurtas, abayas, lawn and everyday wear.", icon: Shirt },
    fashion: { blurb: "Lookbook-style grids for kurtas, abayas, lawn and everyday wear.", icon: Shirt },
    footwear: { blurb: "Bold, high-contrast layouts built around size and colour variants.", icon: Footprints },
    jewellery: { blurb: "Minimal, luxurious designs with generous whitespace and detail shots.", icon: Gem },
    electronics: { blurb: "Spec-friendly layouts with comparison tables and clear pricing.", icon: Smartphone },
    beauty: { blurb: "Soft palettes, ingredient callouts and routine-style bundles.", icon: Sparkles },
    "beauty-skincare": { blurb: "Soft palettes, ingredient callouts and routine-style bundles.", icon: Sparkles },
    home: { blurb: "Room-by-room browsing with wide imagery and collection banners.", icon: Sofa },
    "home-decor": { blurb: "Room-by-room browsing with wide imagery and collection banners.", icon: Sofa },
    grocery: { blurb: "Fast, list-driven layouts for repeat orders and cash on delivery.", icon: ShoppingBasket },
    "food-grocery": { blurb: "Fast, list-driven layouts for repeat orders and cash on delivery.", icon: ShoppingBasket },
    kids: { blurb: "Playful designs with age filters and gift-ready collections.", icon: Baby },
    "kids-toys": { blurb: "Playful designs with age filters and gift-ready collections.", icon: Baby },
    sports: { blurb: "Energetic layouts for gear, apparel and supplements.", icon: Dumbbell },
    "sports-fitness": { blurb: "Energetic layouts for gear, apparel and supplements.", icon: Dumbbell },
    books: { blurb: "Catalogue-style grids with authors, series and bestseller shelves.", icon: BookOpen },
    "books-stationery": { blurb: "Catalogue-style grids with authors, series and bestseller shelves.", icon: BookOpen },
}

export const allCategory: Category = { slug: ALL, name: "All designs", blurb: "Every ready-made store design, across all categories.", icon: LayoutGrid }

/* Templates with no category are grouped under this one so they still show up
   in a filter instead of only under "All". */
const OTHER = "Other"

export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/&/g, " ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

export const categorySlug = (t: PublicTemplate) => slugify(t.category ?? OTHER)

export function buildCategories(apiCategories: string[], templates: PublicTemplate[]): Category[] {
    const names = [...apiCategories]
    if (templates.some((t) => !t.category) && !names.includes(OTHER)) names.push(OTHER)
    return names.map((name) => {
        const slug = slugify(name)
        const meta = known[slug]
        return {
            slug,
            name,
            blurb: meta?.blurb ?? `Ready-made ${name.toLowerCase()} store designs.`,
            icon: meta?.icon ?? Tag,
        }
    })
}

export const templatesFor = (templates: PublicTemplate[], slug: string) =>
    slug === ALL ? templates : templates.filter((t) => categorySlug(t) === slug)
