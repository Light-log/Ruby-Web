import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search, Lightbulb, Code2, Rocket, CheckCircle2,
  ArrowRight, Clock, Users, MessageSquare, Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "Proceso de Trabajo",
  description:
    "Conoce nuestra metodología de 4 fases: Descubrimiento, Estrategia & Diseño, Desarrollo & Testing, y Entrega & Soporte. Proceso claro, transparente y orientado a resultados.",
  keywords: [
    "metodología desarrollo software",
    "proceso desarrollo web",
    "metodología agile",
    "sprints semanales",
    "CI/CD",
    "proceso consultora tecnológica",
  ],
  openGraph: {
    title: "Proceso de Trabajo | Consultora Ruby",
    description:
      "Metodología clara y eficiente en 4 fases para entregar soluciones tecnológicas de calidad.",
    url: "https://devruby.org/proceso",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Consultora Ruby" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proceso de Trabajo | Consultora Ruby",
    description: "4 fases claras para entregar soluciones tecnológicas premium.",
  },
  alternates: { canonical: "https://devruby.org/proceso" },
};

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Descubrimiento",
    desc: "Entendemos tu negocio, objetivos y contexto técnico. Identificamos oportunidades y definimos el alcance con precisión.",
    details: [
      "Reunión inicial de 60-90 minutos",
      "Análisis profundo de requerimientos",
      "Mapeo de procesos actuales",
      "Identificación de stakeholders",
      "Documentación de casos de uso",
    ],
    duration: "1-2 semanas",
    deliverable: "Documento de alcance y requerimientos",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Estrategia & Diseño",
    desc: "Diseñamos la arquitectura técnica, prototipos interactivos y un plan de ejecución con hitos claros y medibles.",
    details: [
      "Arquitectura técnica documentada",
      "Prototipos de alta fidelidad en Figma",
      "Plan de ejecución con milestones",
      "Estimación detallada de costos",
      "Selección de stack tecnológico",
    ],
    duration: "1-2 semanas",
    deliverable: "Propuesta técnica + prototipos",
  },
  {
    num: "03",
    icon: Code2,
    title: "Desarrollo & Testing",
    desc: "Construimos con prácticas modernas: código limpio, CI/CD, testing automatizado y revisiones constantes.",
    details: [
      "Sprints semanales con demos",
      "Code reviews obligatorios",
      "Testing automatizado (unit + e2e)",
      "CI/CD desde el día uno",
      "Comunicación diaria por Slack/Discord",
    ],
    duration: "4-8 semanas",
    deliverable: "Producto funcional + tests",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Entrega & Soporte",
    desc: "Desplegamos en producción, documentamos todo y te acompañamos post-lanzamiento con soporte técnico dedicado.",
    details: [
      "Deploy automatizado a producción",
      "Documentación técnica y de usuario",
      "Capacitación al equipo",
      "Monitoreo y alertas configuradas",
      "Soporte técnico 24/7 post-entrega",
    ],
    duration: "1 semana + soporte continuo",
    deliverable: "Sistema en producción + docs",
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Tiempos predecibles",
    desc: "Cada proyecto tiene un cronograma claro con milestones semanales. Sin sorpresas ni retrasos.",
  },
  {
    icon: MessageSquare,
    title: "Comunicación constante",
    desc: "Canal directo con el equipo, demos semanales y reportes de progreso. Siempre sabrás el estado.",
  },
  {
    icon: Shield,
    title: "Calidad garantizada",
    desc: "Code reviews, testing automatizado y CI/CD aseguran que cada entrega cumple estándares premium.",
  },
  {
    icon: Users,
    title: "Tu equipo involucrado",
    desc: "Participas en cada fase: validación de diseños, demos de sprints y pruebas de aceptación.",
  },
];

function ProcesoJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Proceso de desarrollo de software - Consultora Ruby",
    description:
      "Metodología de 4 fases para entregar soluciones tecnológicas de calidad: Descubrimiento, Estrategia, Desarrollo y Entrega.",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.desc,
      position: parseInt(s.num),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProcesoPage() {
  return (
    <main className="relative">
      <ProcesoJsonLd />
      <Navbar />

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-lavender/6 blur-[100px]" />
          <div className="absolute top-20 right-1/4 h-[350px] w-[350px] rounded-full bg-crimson/6 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Metodología
              </div>

              <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
                Un proceso{" "}
                <span className="gradient-text">claro y eficiente</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-ivory-dim">
                Desde el primer contacto hasta la entrega final, cada paso está diseñado
                para maximizar valor y minimizar fricciones. Transparencia total en cada fase.
              </p>
            </div>
          </FadeIn>

          {/* Steps */}
          <div className="mt-20 grid gap-8">
            {steps.map((step, idx) => (
              <FadeIn key={step.num} delay={idx * 0.05}>
                <Card className="p-8 md:p-10 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover">
                  <div className="grid gap-8 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-display text-5xl text-crimson/20">
                          {step.num}
                        </span>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lavender/8 text-lavender ring-1 ring-lavender/15">
                          <step.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h2 className="font-display text-2xl text-ivory mb-3">{step.title}</h2>
                      <p className="text-sm leading-relaxed text-ivory-dim">{step.desc}</p>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-black/8 bg-dark-200/60 px-4 py-3">
                          <div className="text-[10px] text-ivory-muted">Duración</div>
                          <div className="font-display text-sm text-ivory">{step.duration}</div>
                        </div>
                        <div className="rounded-xl border border-black/8 bg-dark-200/60 px-4 py-3">
                          <div className="text-[10px] text-ivory-muted">Entregable</div>
                          <div className="font-display text-sm text-ivory">{step.deliverable}</div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="rounded-2xl border border-black/8 bg-dark-200/60 p-6">
                        <div className="text-xs text-ivory-muted mb-4 uppercase tracking-wider">
                          Actividades clave
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {step.details.map((d) => (
                            <div key={d} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lavender" />
                              <span className="text-sm text-ivory-dim">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Advantages */}
          <div className="mt-24">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl tracking-tight text-ivory md:text-4xl">
                  ¿Por qué funciona{" "}
                  <span className="gradient-text">nuestro proceso</span>?
                </h2>
                <p className="mt-3 text-ivory-dim">
                  Principios que garantizan entregas exitosas en cada proyecto.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv, idx) => (
                <FadeIn key={adv.title} delay={idx * 0.08}>
                  <Card className="h-full p-7 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson/8 text-crimson ring-1 ring-crimson/15 mb-5">
                      <adv.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg text-ivory mb-3">{adv.title}</h3>
                    <p className="text-sm leading-relaxed text-ivory-dim">{adv.desc}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* CTA */}
          <FadeIn delay={0.1}>
            <div className="mt-24 text-center">
              <Card className="inline-block p-10 md:p-14 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-crimson/5 blur-[80px]" />
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-lavender/5 blur-[80px]" />
                <div className="relative flex flex-col items-center gap-4">
                  <h3 className="font-display text-2xl md:text-3xl text-ivory">
                    ¿Listo para empezar?
                  </h3>
                  <p className="max-w-lg text-ivory-dim">
                    Cuéntanos tu proyecto y te mostramos cómo este proceso se adapta a tus necesidades específicas.
                  </p>
                  <a href="/contacto" className="mt-4">
                    <Button size="lg">
                      Iniciar mi proyecto <ArrowRight className="h-4 w-4" />
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
