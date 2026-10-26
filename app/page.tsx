import { Hero } from "@/components/home/hero";
import { TrustedBrands } from "@/components/home/brands";
import { BuiltIn } from "@/components/home/built-in";
import { Steps } from "@/components/home/steps";
import { Mobile } from "@/components/home/mobile";
import { Testimonial } from "@/components/home/testimonial";
import { FAQ } from "@/components/home/faq";
import { CTAFooter } from "@/components/home/cta-footer";
import { getBrands } from "@/lib/brands";

export default async function Home() {
  const brands = await getBrands();

  return (
    <main
      className="min-h-screen bg-white text-[#171717]"
      style={{ fontFamily: "var(--font-home-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      <Hero />
      <TrustedBrands brands={brands} />
      <BuiltIn />
      <Steps />
      <Mobile />
      <Testimonial />
      <FAQ />
      <CTAFooter />
    </main>
  );
}
