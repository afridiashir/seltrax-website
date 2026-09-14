import type { Metadata } from "next";
import { IntegrationsDirectory } from "@/components/integrations/directory";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Integrations — connect the tools you already use | Seltrax",
  description:
    "Connect TCS, Leopards and M&P, Facebook Pixel, Google Analytics, Microsoft Clarity, WhatsApp and SMS updates, Mailchimp and more to your Seltrax store — included on every plan.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <IntegrationsDirectory />
      <CTAFooter />
    </main>
  );
}
