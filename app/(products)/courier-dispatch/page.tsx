import type { Metadata } from "next";
import { CourierHero, Couriers, DispatchComparison, DispatchFAQ, DispatchFlow, DispatchSpec, LabelPreview, Tracking } from "@/components/courier/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Courier Dispatch — TCS, Leopards & M&P from the order | Seltrax",
  description:
    "Book TCS, Leopards or M&P from the order or in bulk, print labels with the COD amount, request pickup, and get every consignment number and courier scan back on the order automatically.",
  alternates: { canonical: "/courier-dispatch" },
};

export default function CourierDispatchPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <CourierHero />
      <Couriers />
      <DispatchFlow />
      <LabelPreview />
      <Tracking />
      <DispatchSpec />
      <DispatchComparison />
      <DispatchFAQ />
      <CTAFooter />
    </main>
  );
}
