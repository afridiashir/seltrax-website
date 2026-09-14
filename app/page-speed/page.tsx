import type { Metadata } from "next";
import { Calculator, Inside, SpeedComparison, SpeedFAQ, SpeedHero, SpeedSells, WhyFaster } from "@/components/speed/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Page Speed — Seltrax loads before they blink",
  description:
    "One theme, rendered from JSON, zero plugins: Seltrax stores open about 2x faster than Shopify and nearly 3x faster than WooCommerce. See what slow is costing you.",
  alternates: { canonical: "/page-speed" },
};

export default function PageSpeedPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <SpeedHero />
      <WhyFaster />
      <SpeedSells />
      <Calculator />
      <Inside />
      <SpeedComparison />
      <SpeedFAQ />
      <CTAFooter />
    </main>
  );
}
