import type { Metadata } from "next";
import { CostAfter, KeepSEO, MigrateFAQ, MigrateHero, SwitchPlan, WhatMoves, Wizard } from "@/components/migrate/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Migrate from Shopify or WooCommerce — keep everything | Seltrax",
  description:
    "Move products, variants, images, customers, orders and SEO from Shopify or WooCommerce to Seltrax. Keep selling while it imports, keep your rankings with 301 redirects, and switch without downtime.",
  alternates: { canonical: "/migrate" },
};

export default function MigratePage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <MigrateHero />
      <Wizard />
      <WhatMoves />
      <KeepSEO />
      <SwitchPlan />
      <CostAfter />
      <MigrateFAQ />
      <CTAFooter />
    </main>
  );
}
