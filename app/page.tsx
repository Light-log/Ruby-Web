import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Proof } from "@/components/sections/proof";
import { Portfolio } from "@/components/sections/portfolio";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <StackMarquee />
      <Proof />
      <Contact />
      <Footer />
    </main>
  );
}
