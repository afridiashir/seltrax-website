import type { Metadata } from "next";
import { AppFeatures, AppHero, AppSteps } from "@/components/mobile-app/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Seltrax for Android — Your Store in Your Pocket",
  description:
    "Live sales, sessions and conversion, every order and its dispatch status, and your team — the whole Seltrax dashboard on your phone.",
  alternates: { canonical: "/mobile-app" },
};

export default function MobileAppPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <AppHero />
      <AppFeatures />
      <AppSteps />
      <CTAFooter />
    </main>
  );
}
