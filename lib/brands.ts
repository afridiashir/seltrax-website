import { defineQuery } from "next-sanity";
import { client } from "@/lib/sanity/client";

/* The "Trusted by" logo strip on the homepage. Editors manage it in the Studio
   (Homepage logos → drag to reorder); until that document has logos, the
   files in public/brands are shown. Tagged like the blog so the
   /api/revalidate webhook refreshes it on publish. */

export type Brand = { name: string; src: string; width: number; height: number };

const defaults: Brand[] = [
  { name: "Zarqash", src: "/brands/zarqash.png", width: 245, height: 180 },
  { name: "Balaj Aura", src: "/brands/balaj-aura.png", width: 211, height: 56 },
  { name: "WristGadgets", src: "/brands/wristgadgets.png", width: 585, height: 180 },
  { name: "T for Toys", src: "/brands/t-for-toys.png", width: 175, height: 180 },
  { name: "Apna Time Watches", src: "/brands/apna-time.png", width: 219, height: 180 },
];

const BRANDS_QUERY = defineQuery(`*[_id == "trustedBrands"][0].logos[defined(logo.asset)] {
  name,
  "src": logo.asset->url,
  "width": logo.asset->metadata.dimensions.width,
  "height": logo.asset->metadata.dimensions.height
}`);

export async function getBrands(): Promise<Brand[]> {
  if (!client) return defaults;
  try {
    const brands = await client.fetch<Brand[] | null>(BRANDS_QUERY, {}, { next: { revalidate: 3600, tags: ["trustedBrands"] } });
    return brands?.length ? brands : defaults;
  } catch (err) {
    console.error("Sanity fetch failed", err);
    return defaults;
  }
}
