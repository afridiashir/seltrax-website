import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, bySlug } from "@/components/help/docs";
import { HelpArticle } from "@/components/help/article";
import { CTAFooter } from "@/components/home/cta-footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) return {};
  return {
    title: `${a.title} — Seltrax Help`,
    description: a.summary,
    alternates: { canonical: `/help/${a.slug}` },
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { slug } = await params;
  if (!bySlug(slug)) notFound();
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <HelpArticle slug={slug} />
      <CTAFooter />
    </main>
  );
}
