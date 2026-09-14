import type { Metadata } from "next";
import { ReviewsPage } from "@/components/reviews/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Reviews — what sellers say about Seltrax",
  description: "Store owners on running cash on delivery, dispatching with couriers, switching platforms and growing with their team on Seltrax.",
  alternates: { canonical: "/reviews" },
};

export default function Reviews() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <ReviewsPage />
      <CTAFooter />
    </main>
  );
}
