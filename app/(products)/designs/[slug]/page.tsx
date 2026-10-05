import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignDetail } from "@/components/designs/detail";
import { CTAFooter } from "@/components/home/cta-footer";
import { getTemplate, getTemplates } from "@/lib/templates-api";

type Props = { params: Promise<{ slug: string }> };

// Designs are published from the API, not from this repo, so pages are not
// prerendered: each one is built on first visit and refreshed every 5 minutes.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const design = await getTemplate(slug);
  if (!design) return {};
  const image = design.previewImages[0];
  return {
    title: `${design.name} store design | Seltrax`,
    description:
      design.description ??
      `${design.name}, a ready-made${design.category ? ` ${design.category.toLowerCase()}` : ""} store design for Seltrax. Add your products and publish.`,
    alternates: { canonical: `/designs/${design.slug}` },
    ...(image && { openGraph: { images: [image] } }),
  };
}

export default async function DesignPage({ params }: Props) {
  const { slug } = await params;
  const design = await getTemplate(slug);
  if (!design) notFound();
  const { templates } = await getTemplates();
  const related = templates.filter((t) => t.slug !== design.slug && t.category === design.category).slice(0, 3);
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <DesignDetail design={design} related={related} />
      <CTAFooter />
    </main>
  );
}
