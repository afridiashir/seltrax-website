import type { Metadata } from "next";
import { DesignsBrowser } from "@/components/designs/browser";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Store Designs — Seltrax",
  description:
    "Ready-made online store designs by category: watches, fragrances, clothing, footwear, jewellery, electronics and more. Pick one, add your products, publish.",
  alternates: { canonical: "/designs" },
};

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <DesignsBrowser />
      <CTAFooter />
    </main>
  );
}
