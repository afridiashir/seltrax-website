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
    Watch,
    type LucideIcon,
} from "lucide-react"

/* A store design. To add one, append to `designs` below with the slug of the
   category it belongs to. `image` is a screenshot under /public/designs/,
   `preview` is the live demo store (optional until one exists). */
export type Design = {
    slug: string
    name: string
    category: string
    image: string
    tags?: string[]
    preview?: string
}

export type Category = {
    slug: string
    name: string
    blurb: string
    icon: LucideIcon
}

export const ALL = "all"

export const categories: Category[] = [
    { slug: "watches", name: "Watches", blurb: "Clean, product-first layouts that let the timepiece do the talking.", icon: Watch },
    { slug: "fragrances", name: "Fragrances", blurb: "Editorial designs with room for notes, moods and bottle photography.", icon: SprayCan },
    { slug: "clothing", name: "Clothing", blurb: "Lookbook-style grids for kurtas, abayas, lawn and everyday wear.", icon: Shirt },
    { slug: "footwear", name: "Footwear", blurb: "Bold, high-contrast layouts built around size and colour variants.", icon: Footprints },
    { slug: "jewellery", name: "Jewellery", blurb: "Minimal, luxurious designs with generous whitespace and detail shots.", icon: Gem },
    { slug: "electronics", name: "Electronics", blurb: "Spec-friendly layouts with comparison tables and clear pricing.", icon: Smartphone },
    { slug: "beauty", name: "Beauty & Skincare", blurb: "Soft palettes, ingredient callouts and routine-style bundles.", icon: Sparkles },
    { slug: "home", name: "Home & Decor", blurb: "Room-by-room browsing with wide imagery and collection banners.", icon: Sofa },
    { slug: "grocery", name: "Food & Grocery", blurb: "Fast, list-driven layouts for repeat orders and cash on delivery.", icon: ShoppingBasket },
    { slug: "kids", name: "Kids & Toys", blurb: "Playful designs with age filters and gift-ready collections.", icon: Baby },
    { slug: "sports", name: "Sports & Fitness", blurb: "Energetic layouts for gear, apparel and supplements.", icon: Dumbbell },
    { slug: "books", name: "Books & Stationery", blurb: "Catalogue-style grids with authors, series and bestseller shelves.", icon: BookOpen },
]

export const allCategory: Category = { slug: ALL, name: "All designs", blurb: "Every ready-made store design, across all categories.", icon: LayoutGrid }

/* Empty for now — designs are added here as they are produced. */
export const designs: Design[] = []

export const designsFor = (slug: string) => (slug === ALL ? designs : designs.filter((d) => d.category === slug))
