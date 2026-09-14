import type { Metadata } from "next";
import { CaseStudiesListing } from "@/components/resources/pages";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Case studies — how sellers grow on Seltrax",
  description: "How brands launched, switched platforms and scaled their cash-on-delivery business with Seltrax.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <CaseStudiesListing />
      <CTAFooter />
    </main>
  );
}
