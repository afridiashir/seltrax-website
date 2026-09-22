import type { Metadata } from "next";
import { CostCompare, Roles, StaffComparison, StaffDetails, StaffFAQ, StaffHero, StaffSpec, TeamBuilder } from "@/components/staff/sections";
import { CTAFooter } from "@/components/home/cta-footer";

export const metadata: Metadata = {
  title: "Staff Accounts — unlimited, and free | Seltrax",
  description:
    "Add your whole team at no extra cost. Unlimited staff accounts with role presets, per-area permissions, hidden revenue, an activity log and instant access removal — all inside Rs 1,349/month.",
  alternates: { canonical: "/staff-accounts" },
};

export default function StaffAccountsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <StaffHero />
      <TeamBuilder />
      <CostCompare />
      <Roles />
      <StaffDetails />
      <StaffSpec />
      <StaffComparison />
      <StaffFAQ />
      <CTAFooter />
    </main>
  );
}
