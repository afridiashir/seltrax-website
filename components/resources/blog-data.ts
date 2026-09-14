import type { ListingEntry } from "./listing"

/* Blog posts. Append an entry to publish a card on /blog — newest dates sort
   first. Set `href` once the article page exists. */
export const blogCategories = [
    { key: "guides", name: "Selling guides" },
    { key: "cod", name: "COD & couriers" },
    { key: "growth", name: "Marketing & growth" },
    { key: "stores", name: "Store design" },
    { key: "updates", name: "Product updates" },
]

export const blogPosts: ListingEntry[] = []
