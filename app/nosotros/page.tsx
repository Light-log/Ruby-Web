import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Users, Target, Heart, Lightbulb,
  Rocket, Shield, Code2, Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos un equipo de ingenieros, diseñadores y estrategas comprometidos con construir soluciones tecnológicas que transforman negocios en Latinoamérica.",
  keywords: [
    "consultora tecnológica",
    "equipo desarrollo software",
    "nosotros consultora Ruby",
    "ingenieros software Venezuela",
    "transformación digital Latinoamérica",
  ],
  openGraph: {
    title: "Nosotros | Consultora Ruby",
    description:
      "Tecnología con propósito humano. Conoce al equipo detrás de +50 proyectos exitosos.",
    url: "https://devruby.org/nosotros",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Consultora Ruby" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Consultora Ruby",
    description: "Ingenieros, diseñadores y estrategas comprometidos con tu éxito.",
  },
  alternates: { canonical: "https://devruby.org/nosotros" },
};

const values = [
  {
    icon: Target,
    title: "Enfoque en resultados",
    desc: "Cada línea de código tiene un propósito. No construimos por construir, sino para generar impacto real en tu negocio.",
  },
  {
    icon: Heart,
    title: "Compromiso genuino",
    desc: "Tratamos cada proyecto como propio. Tu éxito es nuestro éxito, y eso se refleja en la calidad de cada entrega.",
  },
  {
    icon: Lightbulb,
    title: "Innovación práctica",
    desc: "Usamos tecnología de vanguardia cuando aporta valor real, no por moda. Soluciones inteligentes, no complicadas.",
  },
  {
    icon: Shield,
    title: "Transparencia total",
    desc: "Comunicación clara, precios justos y sin sorpresas. Sabrás exactamente qué estamos haciendo y por qué.",
  },
];

const capabilities = [
  { icon: Code2, label: "Desarrollo Full-Stack" },
  { icon: Rocket, label: "DevOps & Cloud" },
  { icon: Shield, label: "Ciberseguridad" },
  { icon: Sparkles, label: "Diseño UI/UX" },
];

export default function NosotrosPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-lavender/6 blur-[100px]" />
          <div className="absolute top-40 left-1/4 h-[350px] w-[350px] rounded-full bg-crimson/6 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6">
                <Users className="h-3.5 w-3.5" />
                Nosotros
              </div>

              <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
                Tecnología con{" "}
                <span className="gradient-text">propósito humano</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-ivory-dim">
                Somos un equipo de ingenieros, diseñadores y estrategas comprometidos
                con construir soluciones que realmente transforman negocios.
              </p>
            </div>
          </FadeIn>

          <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
            <FadeIn delay={0.05}>
              <Card className="p-8 md:p-10">
                <h2 className="font-display text-2xl text-ivory mb-4">Nuestra historia</h2>
                <div className="grid gap-4 text-sm leading-relaxed text-ivory-dim">
                  <p>
                    Consultora Ruby nació de una convicción: la tecnología debe ser una herramienta
                    de empoderamiento, no una barrera. Hemos visto demasiadas empresas frustradas
                    por soluciones mediocres, entregas incompletas y promesas vacías.
                  </p>
                  <p>
                    Decidimos crear una consultora diferente. Una donde la ingeniería de calidad,
                    la comunicación transparente y el compromiso genuino sean la norma, no la excepción.
                  </p>
                  <p>
                    Desde nuestros inicios, hemos acompañado a startups, PyMEs y empresas
                    consolidadas en su transformación digital, construyendo productos que
                    no solo funcionan, sino que generan confianza y escalan con el negocio.
                  </p>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-crimson/6 via-transparent to-lavender/6 blur-3xl" />
                  <Image
                    src="/logo.svg"
                    alt="Consultora Ruby"
                    width={240}
                    height={240}
                    className="relative select-none drop-shadow-[0_16px_60px_rgba(196,30,58,.08)]"
                  />
                </div>
                <div className="mt-8 text-center">
                  <div className="font-display text-2xl text-ivory">Consultora Ruby</div>
                  <div className="mt-1 text-sm text-ivory-muted">
                    Soluciones tecnológicas premium
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-sm">
                  {capabilities.map((cap) => (
                    <div key={cap.label} className="flex items-center gap-2 rounded-xl border border-black/8 bg-dark-200/60 px-4 py-3">
                      <cap.icon className="h-4 w-4 text-lavender" />
                      <span className="text-xs text-ivory-dim">{cap.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-24">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl tracking-tight text-ivory md:text-4xl">
                  Nuestros <span className="gradient-text">valores</span>
                </h2>
                <p className="mt-3 text-ivory-dim">
                  Los principios que guían cada decisión y cada línea de código.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((v, idx) => (
                <FadeIn key={v.title} delay={idx * 0.08}>
                  <Card className="h-full p-7 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson/8 text-crimson ring-1 ring-crimson/15 mb-5">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg text-ivory mb-3">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-ivory-dim">{v.desc}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-24">
              <Card className="relative overflow-hidden p-10 md:p-14 text-center">
                <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-crimson/5 blur-[80px]" />
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-lavender/5 blur-[80px]" />

                <div className="relative">
                  <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">
                    Nuestra misión
                  </h2>
                  <p className="max-w-3xl mx-auto text-lg text-ivory-dim leading-relaxed">
                    Empoderar a empresas de Latinoamérica y el mundo con soluciones tecnológicas
                    de clase mundial que generen confianza, impulsen el crecimiento y se mantengan
                    en el tiempo. Creemos que la buena ingeniería es la base de la transformación digital.
                  </p>

                  <a href="/contacto" className="inline-block mt-8">
                    <Button size="lg">
                      Trabaja con nosotros <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
