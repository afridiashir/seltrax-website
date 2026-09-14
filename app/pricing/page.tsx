import type { Metadata } from "next";
import { CompareTeaser, Included, NeverPay, PricingFAQ, PricingHero } from "@/components/pricing/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Pricing — from Rs 1,349/month, everything included | Seltrax",
  description:
    "One plan in rupees with every feature: Rs 1,999/month billed monthly, or Rs 1,349/month billed yearly. Store, hosting, designs, COD checkout, courier booking, analytics and unlimited staff — no per-seat fees, no paid apps.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <PricingHero />
      <Included />
      <NeverPay />
      <CompareTeaser />
      <PricingFAQ />
      <CTAFooter />
    </main>
  );
}
