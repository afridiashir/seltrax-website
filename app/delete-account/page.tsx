import type { Metadata } from "next";
import { DeleteAccountBody, DeleteAccountHero } from "@/components/legal/delete-account";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Delete your account | Seltrax",
  description:
    "How to delete your Seltrax account and its data from the Android app, what gets deleted, what happens to your stores, and the 30-day window to change your mind.",
  alternates: { canonical: "/delete-account" },
  // Play Console links here from Data safety; a reviewer opens it signed out.
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://seltrax.com/delete-account",
    title: "Delete your account | Seltrax",
    description:
      "Delete your Seltrax account from the app. Nothing is removed for 30 days, and you can cancel until then.",
  },
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <DeleteAccountHero />
      <DeleteAccountBody />
      <CTAFooter />
    </main>
  );
}
