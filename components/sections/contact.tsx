// components/sections/portfolio.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ShineBorder } from "@/components/ui/shine-border";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
  isNext?: boolean; // ✅ marcador para el card especial
};

const projects: Project[] = [
  {
    title: "Titan Fitness (Mobile)",
    subtitle: "IA visual para calorías + rutinas personalizadas",
    description:
      "Aplicación móvil que estima calorías a partir de fotos de alimentos usando IA, y genera rutinas personalizadas según objetivos, nivel y disponibilidad. Incluye seguimiento de progreso, recomendaciones inteligentes y ajustes automáticos semana a semana.",
    tags: ["Mobile", "IA", "Visión", "Fitness"],
    metrics: [
      { label: "Valor clave", value: "Foto → Calorías" },
      { label: "Personalización", value: "Rutinas IA" },
    ],
    image: "/portfolio/p1.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Ver enfoque",
  },
  {
    title: "Obelium App (Web)",
    subtitle: "Marketplace de funerarias + comparación + chat",
    description:
      "Plataforma web donde las funerarias publican sus servicios y los clientes comparan opciones en tiempo real. Filtros avanzados por precio, ubicación y prestaciones; fichas detalladas; mensajería directa y solicitudes desde una misma interfaz.",
    tags: ["Web App", "Marketplace", "Filtros", "Chat"],
    metrics: [
      { label: "Descubrimiento", value: "Comparar fácil" },
      { label: "Conversión", value: "Chat directo" },
    ],
    image: "/portfolio/p2.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Solicitar demo",
  },
  {
    title: "Altum (Legal Web)",
    subtitle: "Generación gratuita de documentos legales",
    description:
      "Web app para crear documentos legales de forma guiada y gratuita: formularios inteligentes, generación instantánea y exportación lista para revisión profesional. El resultado queda preparado para que solo falte el sello/validación de un abogado.",
    tags: ["LegalTech", "Automatización", "Plantillas", "UX"],
    metrics: [
      { label: "Tiempo", value: "Minutos" },
      { label: "Acceso", value: "Gratuito" },
    ],
    image: "/portfolio/p3.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Ver caso",
  },
  {
    title: "ODAV (Odoo Venezuela)",
    subtitle: "Distribución homologada + módulos locales",
    description:
      "Distribución de Odoo adaptada a Venezuela, con módulos y desarrollos específicos para operaciones locales. Implementación, personalizaciones, integraciones y mejoras para acelerar el despliegue y reducir fricción operativa.",
    tags: ["Odoo", "ERP", "Venezuela", "Módulos"],
    metrics: [
      { label: "Implementación", value: "Más rápida" },
      { label: "Adaptación", value: "Homologada" },
    ],
    image: "/portfolio/p1.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Ver módulos",
  },
  {
    title: "Maintenance Check",
    subtitle: "Ejecutables para equipos médicos + alertas overlay",
    description:
      "Suite de ejecutables para equipos médicos (ultrasonidos y otros) que despliega notificaciones persistentes sobre la interfaz clínica. Diseñada para informar falta de soporte, recordatorios y avisos críticos sin interrumpir el flujo de trabajo del operador.",
    tags: ["Windows", "Medical", "Overlay", "Notificaciones"],
    metrics: [
      { label: "Objetivo", value: "Aviso visible" },
      { label: "Entorno", value: "Interfaz clínica" },
    ],
    image: "/portfolio/p2.jpg",
    ctaHref: "#contacto",
    ctaLabel: "Ver implementación",
  },

  // ✅ Card especial
  {
    title: "Tu próximo proyecto",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [],
    image: "/portfolio/p3.jpg",
    ctaHref: "#contacto",
    ctaLabel: "",
    isNext: true,
  },
];

export function Portfolio() {
  return (
    <section id="portafolio" className="relative py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm text-white/60">Portafolio</p>
          <h2 className="font-display text-3xl tracking-tight text-white md:text-4xl">
            Proyectos con impacto real
          </h2>
          <p className="max-w-2xl text-white/70">
            Productos y soluciones: IA aplicada, plataformas web, automatización y
            software a medida. (Puedes reemplazar imágenes y métricas por datos
            reales cuando quieras.)
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p, idx) => (
            <Magnetic key={`${p.title}-${idx}`}>
              <div
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <ShineBorder className="h-full rounded-2xl">
                  <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gunmetal-950/55 backdrop-blur-xl">
                    {/* Imagen */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gunmetal-950/90 via-gunmetal-950/20 to-transparent" />
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      {/* ✅ Card especial: solo + y texto abajo */}
                      {p.isNext ? (
                        <div className="relative">
                          <div className="flex flex-col items-center justify-center py-10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-4xl font-semibold text-white/80 backdrop-blur-md">
                              +
                            </div>
                            <p className="mt-4 text-center text-sm text-white/70">
                              Tú puedes ser el próximo
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-3">
                            <h3 className="font-display text-xl text-white">
                              {p.title}
                            </h3>
                            <p className="text-sm text-white/60">{p.subtitle}</p>
                          </div>

                          <p className="mb-5 text-sm leading-relaxed text-white/70">
                            {p.description}
                          </p>

                          {/* Métricas */}
                          <div className="mb-5 grid grid-cols-2 gap-3">
                            {p.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="rounded-xl border border-white/8 bg-white/3 px-3 py-2"
                              >
                                <div className="text-[11px] text-white/55">
                                  {m.label}
                                </div>
                                <div className="font-display text-sm text-white">
                                  {m.value}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="mb-5 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <a href={p.ctaHref ?? "#contacto"} className="inline-block">
                            <Button variant="secondary" size="sm">
                              {p.ctaLabel ?? "Ver más"}
                            </Button>
                          </a>
                        </>
                      )}
                    </div>

                    {/* Glow hover */}
                    <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100">
                      <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(230,57,70,.25),transparent_55%)]" />
                    </div>
                  </article>
                </ShineBorder>
              </div>
            </Magnetic>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="font-display text-lg text-white">
              ¿Quieres ver casos reales de tu industria?
            </h4>
            <p className="text-sm text-white/70">
              Preparamos una vitrina con capturas, KPIs, stack y narrativa
              orientada a conversión.
            </p>
          </div>
          <Magnetic>
            <a href="#contacto">
              <Button variant="primary" size="sm">
                Armar mi portafolio
              </Button>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
