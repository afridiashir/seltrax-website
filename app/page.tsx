import { Hero } from "@/components/landing/hero";
import { TrustedBrands } from "@/components/landing/trusted-brands";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { Features } from "@/components/landing/features";
import { Comparison } from "@/components/landing/comparison";
import { Steps } from "@/components/landing/steps";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <TrustedBrands />
      <DashboardShowcase />
      <Features />
      <Steps />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
