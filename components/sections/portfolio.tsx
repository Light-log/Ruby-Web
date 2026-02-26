"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ShineBorder } from "@/components/ui/shine-border";
import { FadeIn } from "@/components/animate/fade-in";
import { ExternalLink, Briefcase } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
  isNext?: boolean;
};

const projects: Project[] = [
  {
    title: "Obelium App",
    subtitle: "Marketplace de funerarias + comparación + chat",
    description:
      "Plataforma web donde las funerarias publican sus servicios y los clientes comparan opciones en tiempo real con filtros avanzados y mensajería directa.",
    tags: ["Web App", "Marketplace", "Filtros", "Chat"],
    metrics: [
      { label: "Descubrimiento", value: "Comparar fácil" },
      { label: "Conversión", value: "Chat directo" },
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
    tags: ["LegalTech", "Automatización", "UX"],
    metrics: [
      { label: "Tiempo", value: "Minutos" },
      { label: "Acceso", value: "Gratuito" },
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
    tags: ["Odoo", "ERP", "Venezuela"],
    metrics: [
      { label: "Implementación", value: "Más rápida" },
      { label: "Adaptación", value: "Homologada" },
    ],
    image: "/odoo.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Ver módulos",
  },
  {
    title: "Titan Fitness",
    subtitle: "IA visual para calorías + rutinas personalizadas",
    description:
      "App móvil que estima calorías desde fotos de alimentos usando IA y genera rutinas personalizadas con seguimiento de progreso.",
    tags: ["Mobile", "IA", "Fitness"],
    metrics: [
      { label: "Valor clave", value: "Foto → Calorías" },
      { label: "Personalización", value: "Rutinas IA" },
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
    tags: ["Windows", "Medical", "Overlay"],
    metrics: [
      { label: "Objetivo", value: "Aviso visible" },
      { label: "Entorno", value: "Interfaz clínica" },
    ],
    image: "/Check.png",
    ctaHref: "#contacto",
    ctaLabel: "Ver caso",
  },
  {
    title: "Tu próximo proyecto",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [],
    image: "/Ganancias.jpg",
    ctaHref: "#contacto",
    ctaLabel: "",
    isNext: true,
  },
];

export function Portfolio() {
  return (
    <section id="portafolio" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-xs text-crimson-light mb-6">
              <Briefcase className="h-3.5 w-3.5" />
              Portafolio
            </div>

            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Proyectos con{" "}
              <span className="gradient-text">impacto real</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Productos y soluciones: IA aplicada, plataformas web, automatización
              y software a medida.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <FadeIn key={p.title} delay={idx * 0.08}>
              <Magnetic>
                <ShineBorder className="h-full rounded-2xl">
                  <article className="group relative flex h-[520px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-dark-100/60 backdrop-blur-xl">
                    {/* Image */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.06] group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/40 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {p.isNext ? (
                        <div className="flex flex-1 flex-col">
                          <h3 className="font-display text-xl text-ivory mb-3">
                            Tu próximo proyecto
                          </h3>
                          <div className="flex flex-1 flex-col items-center justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lavender/20 bg-lavender/5 text-4xl font-light text-lavender backdrop-blur-md transition-all duration-300 group-hover:bg-lavender/10 group-hover:border-lavender/30 group-hover:shadow-glow-lavender">
                              +
                            </div>
                            <p className="mt-4 text-center text-sm text-ivory-dim">
                              Tú puedes ser el próximo
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <a href="#contacto">
                              <Button variant="lavender" size="sm">
                                Hablemos
                              </Button>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-display text-xl text-ivory">{p.title}</h3>
                          <p className="text-sm text-ivory-muted mt-1">{p.subtitle}</p>
                          <p className="mt-4 text-sm leading-relaxed text-ivory-dim flex-1">
                            {p.description}
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {p.metrics.map((m) => (
                              <div key={m.label} className="rounded-xl border border-white/6 bg-dark-200/50 px-3 py-2">
                                <div className="text-[10px] text-ivory-muted">{m.label}</div>
                                <div className="font-display text-xs text-ivory">{m.value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                              <span key={t} className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[10px] text-ivory-muted">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4">
                            <a href={p.ctaHref ?? "#contacto"}>
                              <Button variant="secondary" size="sm" className="gap-2">
                                {p.ctaLabel ?? "Ver más"} <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </a>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100">
                      <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(196,30,58,.15),transparent_55%)]" />
                    </div>
                  </article>
                </ShineBorder>
              </Magnetic>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
