import type { Metadata } from "next";
import { NotFoundHero, NotFoundLinks } from "@/components/not-found/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Page not found | Seltrax",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <NotFoundHero />
      <NotFoundLinks />
      <CTAFooter />
    </main>
  );
}
