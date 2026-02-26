import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Clock, Shield, FileText, Headphones } from "lucide-react";

const guarantees = [
  {
    icon: Clock,
    title: "Respuesta rápida",
    desc: "Te respondemos en menos de 24 horas en días laborables.",
  },
  {
    icon: Shield,
    title: "100% Confidencial",
    desc: "Tu información y tu proyecto están protegidos en todo momento.",
  },
  {
    icon: FileText,
    title: "Propuesta clara",
    desc: "Recibirás un documento con alcance, tiempo y costos detallados.",
  },
  {
    icon: Headphones,
    title: "Soporte dedicado",
    desc: "Un punto de contacto directo durante todo el proceso.",
  },
];

export default function ContactoPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/3 h-[400px] w-[400px] rounded-full bg-crimson/10 blur-[100px]" />
          <div className="absolute top-40 right-1/3 h-[350px] w-[350px] rounded-full bg-lavender/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 mb-16">
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-4">
              {guarantees.map((g, idx) => (
                <Card key={g.title} className="p-6 text-center transition-all duration-300 hover:border-white/15 hover:-translate-y-1">
                  <div className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-lavender/10 text-lavender ring-1 ring-lavender/20 mb-4">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm text-ivory mb-2">{g.title}</h3>
                  <p className="text-xs text-ivory-dim">{g.desc}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>

        <Contact />
      </section>

      <Footer />
    </main>
  );
}
