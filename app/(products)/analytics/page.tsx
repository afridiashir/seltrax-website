import type { Metadata } from "next";
import { AnalyticsComparison, AnalyticsFAQ, AnalyticsHero, AnalyticsSpec, CODMetrics, Dashboard, OnYourPhone, Reports } from "@/components/analytics/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Analytics — know your numbers, not just your orders | Seltrax",
  description:
    "Sales, sessions, conversion and average order, plus the metrics a COD store needs: delivered rate, return rate by city and courier, cash still with couriers. Built in, on every plan and on your phone.",
  alternates: { canonical: "/analytics" },
};

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <AnalyticsHero />
      <Dashboard />
      <CODMetrics />
      <Reports />
      <OnYourPhone />
      <AnalyticsSpec />
      <AnalyticsComparison />
      <AnalyticsFAQ />
      <CTAFooter />
    </main>
  );
}
