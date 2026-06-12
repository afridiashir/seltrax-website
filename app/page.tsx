import { Hero } from "@/components/landing/hero";
import { StatsStrip } from "@/components/landing/stats-strip";
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
      <StatsStrip />
      <Features />
      <Steps />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
