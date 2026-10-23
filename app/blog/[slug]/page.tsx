import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/resources/blog-post";
import { CTAFooter } from "@/components/home/cta-footer";
import { getPost, getPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = "https://seltrax.com";

/* Posts known at build time are prerendered; ones published later render on
   first visit and are cached until the webhook revalidates them. */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seoTitle || `${post.title} | Seltrax Blog`;
  const description = post.seoDescription || post.excerpt;
  const image = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url() : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    ...(post.mainImage ? { image: urlFor(post.mainImage).width(1200).height(630).fit("crop").url() } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author.name } } : {}),
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogPost post={post} />
      <CTAFooter />
    </main>
  );
}
