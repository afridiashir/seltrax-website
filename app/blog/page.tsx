import type { Metadata } from "next";
import { BlogListing } from "@/components/resources/pages";
import { CTAFooter } from "@/components/home/cta-footer";
import { getPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Blog — guides for online sellers | Seltrax",
  description: "Guides on cash on delivery, couriers, store design and growing an online brand in Pakistan, plus Seltrax product updates.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <BlogListing
        posts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          date: p.publishedAt,
          readMinutes: p.readMinutes,
          image: p.mainImage ? urlFor(p.mainImage).width(800).height(450).fit("crop").url() : undefined,
          href: `/blog/${p.slug}`,
        }))}
      />
      <CTAFooter />
    </main>
  );
}
