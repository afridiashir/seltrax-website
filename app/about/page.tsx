import type { Metadata } from "next";
import { AboutCTA, AboutHero, Mission, Story, Values } from "@/components/about/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "About us — who we are | Seltrax",
  description:
    "Seltrax is an ecommerce platform built for sellers in Pakistan: cash on delivery, local couriers, a fast storefront and one flat price in rupees. Meet the team behind it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <AboutHero />
      <Story />
      <Mission />
      <Values />
      <AboutCTA />
      <CTAFooter />
    </main>
  );
}
