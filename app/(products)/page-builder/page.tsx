import type { Metadata } from "next";
import { BuilderComparison, BuilderFAQ, BuilderHero, Controls, LiveBuilder, PageTypes, Presets } from "@/components/builder/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Page Builder — build any page, no theme required | Seltrax",
  description:
    "No theme deciding what your pages can be. Build any page — home, product, collection, landing, about — stack sections in any order, change every setting, or start from 80+ pre-designed sections.",
  alternates: { canonical: "/page-builder" },
};

export default function PageBuilderPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <BuilderHero />
      <LiveBuilder />
      <PageTypes />
      <Controls />
      <Presets />
      <BuilderComparison />
      <BuilderFAQ />
      <CTAFooter />
    </main>
  );
}
