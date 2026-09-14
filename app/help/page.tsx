import type { Metadata } from "next";
import { HelpHome } from "@/components/help/home";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Help Center — Seltrax docs",
  description: "Step-by-step guides for setting up and running your Seltrax store: products, cash on delivery, couriers, design, analytics and staff.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <HelpHome />
      <CTAFooter />
    </main>
  );
}
