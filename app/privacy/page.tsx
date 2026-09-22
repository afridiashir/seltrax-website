import type { Metadata } from "next";
import { PrivacyBody, PrivacyHero } from "@/components/legal/privacy";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Seltrax",
  description:
    "How Seltrax collects, uses, shares and deletes your data — account information, push notifications, photo access, sub-processors, and the 30-day account deletion window.",
  alternates: { canonical: "/privacy" },
  // Play Console and app stores need this reachable without signing in.
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://seltrax.com/privacy",
    title: "Privacy Policy | Seltrax",
    description:
      "What Seltrax collects, why, who else sees it, and how to delete your account and everything in it.",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <PrivacyHero />
      <PrivacyBody />
      <CTAFooter />
    </main>
  );
}
