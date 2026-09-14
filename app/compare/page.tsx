import type { Metadata } from "next";
import { CompareFAQ, CompareHero, FullComparison, HeadToHead, HonestFit, TwelveMonthCost } from "@/components/compare/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Seltrax vs Shopify vs WooCommerce — honest comparison | Seltrax",
  description:
    "Compare Seltrax, Shopify and WooCommerce for selling in Pakistan: rupee pricing, cash on delivery, local couriers, speed, maintenance and the real first-year cost.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <CompareHero />
      <HeadToHead />
      <FullComparison />
      <TwelveMonthCost />
      <HonestFit />
      <CompareFAQ />
      <CTAFooter />
    </main>
  );
}
