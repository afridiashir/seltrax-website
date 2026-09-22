import type { Metadata } from "next";
import { DayInInbox, OrdersComparison, OrdersDetails, OrdersFAQ, OrdersHero, OrdersInbox, OrdersSpec, Stages } from "@/components/orders/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Orders — every order, one clear inbox | Seltrax",
  description:
    "Manage every order in stages built for cash on delivery: confirm, dispatch, deliver, return. Bulk actions, customer refusal history, automation rules, staff permissions and a full audit trail.",
  alternates: { canonical: "/orders" },
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <OrdersHero />
      <OrdersInbox />
      <Stages />
      <OrdersDetails />
      <DayInInbox />
      <OrdersSpec />
      <OrdersComparison />
      <OrdersFAQ />
      <CTAFooter />
    </main>
  );
}
