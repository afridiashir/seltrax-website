import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, livePages } from "@/components/integrations/data";
import { IntegrationDetail } from "@/components/integrations/detail";
import { CTAFooter } from "@/components/home/cta-footer";

type Props = { params: Promise<{ slug: string }> };

// Coming-soon entries have no page, so they are not prerendered and, with
// dynamicParams off, their slugs 404.
export function generateStaticParams() {
  return livePages.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug(slug);
  if (!item) return {};
  return {
    title: `${item.name} integration | Seltrax`,
    description: `${item.tagline} ${item.overview.split(". ")[0]}.`,
    alternates: { canonical: `/integrations/${item.slug}` },
  };
}

export default async function IntegrationPage({ params }: Props) {
  const { slug } = await params;
  if (!bySlug(slug)) notFound();
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <IntegrationDetail slug={slug} />
      <CTAFooter />
    </main>
  );
}
