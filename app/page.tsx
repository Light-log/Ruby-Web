import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Proof } from "@/components/sections/proof";
import { CTASection } from "@/components/sections/cta-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <ArcRevealHero>
        <Hero />
      </ArcRevealHero>
      <Clients />
      <Services />
      <Process />
      <Portfolio />
      <StackMarquee />
      <Proof />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}
