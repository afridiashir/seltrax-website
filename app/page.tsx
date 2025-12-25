import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import WhySeltrax from "@/components/problem";
import WaitlistSection from "@/components/waiting-section";
import ComparisonSection from "@/components/compare";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <WhySeltrax />
      <ComparisonSection />
      <FAQ />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
