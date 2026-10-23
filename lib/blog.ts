import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/lib/sanity/client";

/* Blog posts from Sanity. Fetches are tagged so the /api/revalidate webhook
   refreshes them the moment an editor publishes; the hourly revalidate is a
   fallback in case the webhook isn't set up or misfires. */

type Image = SanityImageSource & { alt?: string };

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  mainImage?: Image;
  readMinutes: number;
};

export type Post = PostSummary & {
  seoTitle?: string;
  seoDescription?: string;
  body: PortableTextBlock[];
  author?: { name: string; role?: string; image?: Image };
};

const visible = `_type == "post" && defined(slug.current) && publishedAt <= now()`;
const summary = `
  "slug": slug.current,
  title,
  excerpt,
  category,
  publishedAt,
  "updatedAt": _updatedAt,
  mainImage,
  "readMinutes": round(length(pt::text(body)) / 5 / 200)
`;

const POSTS_QUERY = defineQuery(`*[${visible}] | order(publishedAt desc) { ${summary} }`);

const POST_QUERY = defineQuery(`*[${visible} && slug.current == $slug][0] {
  ${summary},
  seoTitle,
  seoDescription,
  body,
  author->{ name, role, image }
}`);

async function fetchTagged<T>(query: string, params: Record<string, string>, tags: string[], fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    return (await client.fetch<T>(query, params, { next: { revalidate: 3600, tags } })) ?? fallback;
  } catch (err) {
    console.error("Sanity fetch failed", err);
    return fallback;
  }
}

const withMinutes = <T extends PostSummary>(p: T): T => ({ ...p, readMinutes: Math.max(1, p.readMinutes ?? 1) });

export async function getPosts(): Promise<PostSummary[]> {
  const posts = await fetchTagged<PostSummary[]>(POSTS_QUERY, {}, ["post", "author"], []);
  return posts.map(withMinutes);
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = await fetchTagged<Post | null>(POST_QUERY, { slug }, [`post:${slug}`, "author"], null);
  return post && withMinutes(post);
}
