import type { Metadata } from "next";
import { AfterLaunch, DoneForYou, LaunchFAQ, LaunchHero, LaunchSimulator, SetupComparison } from "@/components/launch/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Launch in minutes — your store live today | Seltrax",
  description:
    "No hosting, theme, plugins or developer. Sign up, pick a design, add a product, set cash on delivery and publish — most sellers go live the same day, many in under an hour.",
  alternates: { canonical: "/launch" },
};

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <LaunchHero />
      <LaunchSimulator />
      <DoneForYou />
      <SetupComparison />
      <AfterLaunch />
      <LaunchFAQ />
      <CTAFooter />
    </main>
  );
}
