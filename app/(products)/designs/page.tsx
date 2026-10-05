import type { Metadata } from "next";
import { DesignsBrowser } from "@/components/designs/browser";
import { CTAFooter } from "@/components/home/cta-footer";
import { getTemplates } from "@/lib/templates-api";

export const metadata: Metadata = {
  title: "Store Designs — Seltrax",
  description:
    "Ready-made online store designs by category: watches, fragrances, clothing, footwear, jewellery, electronics and more. Pick one, add your products, publish.",
  alternates: { canonical: "/designs" },
};

export default async function DesignsPage() {
  const { templates, categories, failed } = await getTemplates();
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <DesignsBrowser templates={templates} apiCategories={categories} failed={failed} />
      <CTAFooter />
    </main>
  );
}
