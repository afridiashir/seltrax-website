import type { Metadata } from "next";
import { CheckoutComparison, CheckoutFAQ, CheckoutHero, CheckoutSpec, FieldConfigurator, FieldControls, WhyFast } from "@/components/checkout/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Frictionless Checkout — one page, your fields | Seltrax",
  description:
    "A one-page, phone-first checkout with cash on delivery selected by default. Require, make optional or hide any field, add your own, set fees per city — no plugins.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <CheckoutHero />
      <FieldConfigurator />
      <WhyFast />
      <FieldControls />
      <CheckoutSpec />
      <CheckoutComparison />
      <CheckoutFAQ />
      <CTAFooter />
    </main>
  );
}
