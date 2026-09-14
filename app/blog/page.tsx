import type { Metadata } from "next";
import { BlogListing } from "@/components/resources/pages";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Blog — guides for online sellers | Seltrax",
  description: "Guides on cash on delivery, couriers, store design and growing an online brand in Pakistan, plus Seltrax product updates.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <BlogListing />
      <CTAFooter />
    </main>
  );
}
