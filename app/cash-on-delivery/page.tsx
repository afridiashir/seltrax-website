import type { Metadata } from "next";
import { CODComparison, CODFAQ, CODHero, Defences, Flow, Reconciliation, WhyCOD } from "@/components/cod/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Cash on Delivery, done properly — Seltrax",
  description:
    "COD built in, not bolted on: phone-first checkout, confirmation before dispatch, one-click TCS / Leopards / M&P booking, tracking, returns handling and remittance reconciliation.",
  alternates: { canonical: "/cash-on-delivery" },
};

export default function CashOnDeliveryPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <CODHero />
      <WhyCOD />
      <Flow />
      <Defences />
      <Reconciliation />
      <CODComparison />
      <CODFAQ />
      <CTAFooter />
    </main>
  );
}
