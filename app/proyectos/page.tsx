import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink, Briefcase, ArrowRight, CheckCircle2,
  TrendingUp, Award
} from "lucide-react";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos: marketplaces, apps con IA, plataformas LegalTech, ERPs personalizados y más. +50 proyectos entregados con 98% de satisfacción.",
  keywords: [
    "portafolio desarrollo software",
    "proyectos tecnológicos",
    "casos de éxito consultora",
    "desarrollo web Venezuela",
    "app móvil IA",
    "marketplace",
    "LegalTech",
    "ERP Odoo",
  ],
  openGraph: {
    title: "Proyectos | Consultora Ruby",
    description:
      "Descubre nuestro portafolio: +50 proyectos con impacto real en negocios de toda Latinoamérica.",
    url: "https://devruby.org/proyectos",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Consultora Ruby" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos | Consultora Ruby",
    description: "+50 proyectos entregados con 98% de satisfacción.",
  },
  alternates: { canonical: "https://devruby.org/proyectos" },
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
  highlights?: string[];
};

const projects: Project[] = [
  {
    title: "Obelium App",
    subtitle: "Marketplace de funerarias + comparación + chat",
    description:
      "Plataforma web donde las funerarias publican sus servicios y los clientes comparan opciones en tiempo real con filtros avanzados y mensajería directa.",
    tags: ["Web App", "Marketplace", "Filtros", "Chat", "Next.js"],
    metrics: [
      { label: "Descubrimiento", value: "Comparar fácil" },
      { label: "Conversión", value: "Chat directo" },
    ],
    highlights: [
      "Sistema de comparación en tiempo real",
      "Chat integrado entre cliente y proveedor",
      "Panel administrativo para funerarias",
      "Filtros avanzados por ubicación y precio",
    ],
    image: "/Obelium.png",
    ctaHref: "http://app.obelium.com/",
    ctaLabel: "Ver proyecto",
  },
  {
    title: "Altum Legal",
    subtitle: "Generación gratuita de documentos legales",
    description:
      "Web app para crear documentos legales de forma guiada y gratuita con formularios inteligentes, generación instantánea y exportación profesional.",
    tags: ["LegalTech", "Automatización", "UX", "React"],
    metrics: [
      { label: "Tiempo", value: "Minutos" },
      { label: "Acceso", value: "Gratuito" },
    ],
    highlights: [
      "Formularios inteligentes con validación",
      "Generación instantánea de documentos",
      "Exportación en PDF profesional",
      "Interfaz guiada paso a paso",
    ],
    image: "/Altum.png",
    ctaHref: "https://app.altumiuris.com/",
    ctaLabel: "Ver proyecto",
  },
  {
    title: "ODAV (Odoo VE)",
    subtitle: "Distribución homologada + módulos locales",
    description:
      "Distribución de Odoo adaptada a Venezuela con módulos específicos, personalizaciones e integraciones para operaciones locales.",
    tags: ["Odoo", "ERP", "Venezuela", "Python"],
    metrics: [
      { label: "Implementación", value: "Más rápida" },
      { label: "Adaptación", value: "Homologada" },
    ],
    highlights: [
      "Módulos adaptados a legislación venezolana",
      "Integración con bancos y pasarelas locales",
      "Configuración de impuestos y retenciones",
      "Soporte en español con equipo local",
    ],
    image: "/odoo.jpg",
    ctaHref: "/contacto",
    ctaLabel: "Ver módulos",
  },
  {
    title: "Titan Fitness",
    subtitle: "IA visual para calorías + rutinas personalizadas",
    description:
      "App móvil que estima calorías desde fotos de alimentos usando IA y genera rutinas personalizadas con seguimiento de progreso.",
    tags: ["Mobile", "IA", "Fitness", "React Native"],
    metrics: [
      { label: "Valor clave", value: "Foto → Calorías" },
      { label: "Personalización", value: "Rutinas IA" },
    ],
    highlights: [
      "Reconocimiento de alimentos con IA",
      "Estimación calórica automática por foto",
      "Rutinas de ejercicio personalizadas",
      "Seguimiento de progreso con gráficos",
    ],
    image: "/Titan.jpg",
    ctaHref: "https://titantraining.es/",
    ctaLabel: "Ver proyecto",
  },
  {
    title: "Maintenance Check",
    subtitle: "Suite para equipos médicos + alertas overlay",
    description:
      "Ejecutables para equipos médicos que despliegan notificaciones persistentes sobre la interfaz clínica sin interrumpir el flujo de trabajo.",
    tags: ["Windows", "Medical", "Overlay", "C#"],
    metrics: [
      { label: "Objetivo", value: "Aviso visible" },
      { label: "Entorno", value: "Interfaz clínica" },
    ],
    highlights: [
      "Notificaciones overlay no intrusivas",
      "Compatible con software clínico existente",
      "Alertas de mantenimiento programadas",
      "Configuración por equipo médico",
    ],
    image: "/Check.png",
    ctaHref: "/contacto",
    ctaLabel: "Ver caso",
  },
];

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "40%", label: "Ahorro operativo promedio" },
  { value: "6", label: "Industrias cubiertas" },
];

function PortfolioJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portafolio de Proyectos - Consultora Ruby",
    description:
      "Portafolio de proyectos tecnológicos: marketplaces, apps con IA, LegalTech, ERPs y más.",
    url: "https://devruby.org/proyectos",
    mainEntity: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: p.ctaHref,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProyectosPage() {
  return (
    <main className="relative">
      <PortfolioJsonLd />
      <Navbar />

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-crimson/6 blur-[100px]" />
          <div className="absolute top-20 right-1/3 h-[350px] w-[350px] rounded-full bg-lavender/6 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-6">
                <Briefcase className="h-3.5 w-3.5" />
                Portafolio
              </div>

              <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
                Proyectos con{" "}
                <span className="gradient-text">impacto real</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-ivory-dim">
                Cada proyecto es una historia de transformación. Desde startups hasta
                empresas consolidadas, construimos soluciones que generan resultados medibles.
              </p>
            </div>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.05}>
            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <Card key={s.label} className="p-5 text-center transition-all duration-300 hover:border-black/12 hover:shadow-card-hover">
                  <div className="font-display text-2xl md:text-3xl gradient-text">{s.value}</div>
                  <div className="mt-1 text-xs text-ivory-dim">{s.label}</div>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Projects */}
          <div className="mt-16 grid gap-8">
            {projects.map((p, idx) => (
              <FadeIn key={p.title} delay={idx * 0.05}>
                <Card className="overflow-hidden transition-all duration-300 hover:border-black/12 hover:shadow-card-hover">
                  <div className="grid md:grid-cols-5">
                    <div className="relative h-64 md:h-auto md:col-span-2">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent md:hidden" />
                    </div>

                    <div className="p-8 md:p-10 md:col-span-3">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full border border-black/8 bg-black/3 px-2.5 py-1 text-[10px] text-ivory-muted">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-display text-2xl text-ivory">{p.title}</h2>
                      <p className="text-sm text-ivory-muted mt-1">{p.subtitle}</p>
                      <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                        {p.description}
                      </p>

                      {p.highlights && (
                        <div className="mt-6 rounded-2xl border border-black/8 bg-dark-200/60 p-5">
                          <div className="text-xs text-ivory-muted mb-3 uppercase tracking-wider">
                            Características clave
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {p.highlights.map((h) => (
                              <div key={h} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                                <span className="text-sm text-ivory-dim">{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 grid grid-cols-2 gap-3 max-w-xs">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="rounded-xl border border-black/6 bg-dark-200/60 px-3 py-2">
                            <div className="text-[10px] text-ivory-muted">{m.label}</div>
                            <div className="font-display text-sm text-ivory">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <a href={p.ctaHref ?? "/contacto"}>
                          <Button variant="primary" size="sm" className="gap-2">
                            {p.ctaLabel ?? "Ver más"} <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* CTA card */}
          <FadeIn delay={0.1}>
            <div className="mt-16">
              <Card className="relative overflow-hidden p-10 md:p-14 text-center">
                <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-lavender/5 blur-[80px]" />
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-crimson/5 blur-[80px]" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-lavender/15 bg-lavender/5 text-4xl font-light text-lavender">
                    +
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory">
                    Tu proyecto puede ser el próximo
                  </h3>
                  <p className="max-w-lg text-ivory-dim">
                    Cuéntanos tu idea y la convertimos en un producto que genere impacto real en tu negocio.
                  </p>
                  <a href="/contacto" className="mt-4">
                    <Button size="lg">
                      Hablemos de tu proyecto <ArrowRight className="h-4 w-4" />
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
