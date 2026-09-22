import type { Metadata } from "next";
import { Comparison, DetailSections, DeviceSimulator, SpecSheet, StorefrontFAQ, StorefrontHero } from "@/components/storefront/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Mobile-first Storefronts — Seltrax",
  description:
    "What mobile-first actually means on Seltrax: 360px-first layouts, a load budget (LCP < 2.5s on 4G), 44px tap targets, automatic AVIF/WebP images and a one-page cash-on-delivery checkout.",
  alternates: { canonical: "/mobile-first" },
};

export default function MobileFirstPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <StorefrontHero />
      <DeviceSimulator />
      <DetailSections />
      <SpecSheet />
      <Comparison />
      <StorefrontFAQ />
      <CTAFooter />
    </main>
  );
}
