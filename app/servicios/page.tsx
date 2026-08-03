import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ArrowRight, Cpu, Layers, Compass, Rocket, Wrench } from "lucide-react";
import {
  businessAreas,
  engagementModels,
  servicesCatalog,
  serviceSlugs,
  startingPoints,
} from "@/lib/services-catalog";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo de software a medida, apps móviles, automatización, IA aplicada, datos y KPIs, infraestructura, seguridad y UI/UX para empresas.",
  keywords: [
    "desarrollo software a medida",
    "apps móviles",
    "automatización de procesos",
    "inteligencia artificial aplicada",
    "DevOps",
    "ciberseguridad",
    "inteligencia de datos",
    "diseño UI/UX",
    "consultora tecnológica Venezuela",
  ],
  openGraph: {
    title: "Servicios | DEVRUBY",
    description:
      "Software, automatización e inteligencia artificial para convertir procesos en productos digitales que funcionan.",
    url: "https://devruby.org/servicios",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "DEVRUBY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | DEVRUBY",
    description: "Soluciones tecnológicas completas para cada desafío.",
  },
  alternates: { canonical: "https://devruby.org/servicios" },
};

/** Frentes que atendemos sin ficha propia en el catálogo. */
const alsoSolved = [
  "Modernización de sistemas",
  "Auditorías de UX",
  "Migraciones y testing",
  "Observabilidad",
  "Soporte de producto",
] as const;

export default function ServiciosPage() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      {/* `overflow-hidden`: las manchas decorativas se salen del viewport y
          provocaban scroll horizontal en móvil. */}
      <section className="relative overflow-hidden pt-3 pb-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-crimson/6 blur-[100px]" />
          <div className="absolute top-20 right-1/4 h-[350px] w-[350px] rounded-full bg-lavender/6 blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark">
                <Layers className="h-3.5 w-3.5" />
                Catálogo de servicios
              </div>

              <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
                Encuentra una solución para{" "}
                <span className="gradient-text">tu necesidad</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-ivory-dim">
                Software, automatización e inteligencia artificial para
                convertir procesos en productos digitales que funcionan. Un
                catálogo claro para identificar oportunidades, priorizar alcance
                y comenzar con el servicio correcto.
              </p>
            </div>
          </FadeIn>

          {/* Grid de servicios */}
          <div
            data-spotlight-grid
            className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {serviceSlugs.map((slug, idx) => {
              const svc = servicesCatalog[slug];
              return (
                <FadeIn key={slug} delay={idx * 0.05}>
                  <SpotlightCard
                    accent={svc.color}
                    className="group block h-full"
                  >
                    <Link href={`/servicios/${slug}`} className="block h-full">
                      <Card className="flex h-full flex-col bg-white/80 p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/12 group-hover:shadow-card-hover">
                        <div className="flex items-center gap-4">
                          <div
                            className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${
                              svc.color === "crimson"
                                ? "bg-crimson/8 text-crimson ring-1 ring-crimson/15 group-hover:bg-crimson/12 group-hover:shadow-glow"
                                : "bg-lavender/8 text-lavender ring-1 ring-lavender/15 group-hover:bg-lavender/12 group-hover:shadow-glow-lavender"
                            }`}
                          >
                            <svc.icon className="h-5 w-5" />
                          </div>
                          <p className="text-xs uppercase tracking-wider text-ivory-muted">
                            {svc.eyebrow}
                          </p>
                        </div>

                        <h2 className="mt-5 font-display text-xl text-ivory">
                          {svc.shortTitle}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                          {svc.summary}
                        </p>

                        <ul className="mt-5 grid gap-2">
                          {svc.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-2 text-sm text-ivory-dim"
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  svc.color === "crimson"
                                    ? "bg-crimson"
                                    : "bg-lavender"
                                }`}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* `mt-auto` fija el pie al fondo: en una fila con
                            tarjetas de distinta altura, si no, cada "Ver
                            detalle" queda a una altura distinta. */}
                        <div className="mt-auto pt-6">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                          <div className="mt-5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-ivory transition-colors group-hover:text-crimson">
                              Ver detalle
                            </span>
                            <ArrowRight className="h-4 w-4 text-ivory-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-crimson" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </SpotlightCard>
                </FadeIn>
              );
            })}

            {/* Novena tarjeta: ocupa el hueco que dejan 8 servicios en una
                rejilla de 3 columnas y recoge los frentes que no tienen ficha
                propia en el catálogo. */}
            <FadeIn delay={serviceSlugs.length * 0.05}>
              <SpotlightCard accent="lavender" className="group block h-full">
                <Link href="/contacto" className="block h-full">
                  {/* Fondo opaco como el de las hermanas: con un tinte
                      translúcido, el halo del spotlight se ve a través de la
                      tarjeta y borra el texto. El acento lo da el borde. */}
                  <Card className="flex h-full flex-col border-lavender/20 bg-white/80 p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-lavender/30 group-hover:shadow-card-hover">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lavender/8 text-lavender ring-1 ring-lavender/15 transition-all duration-300 group-hover:bg-lavender/12 group-hover:shadow-glow-lavender">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <p className="text-xs uppercase tracking-wider text-ivory-muted">
                        Otros frentes
                      </p>
                    </div>

                    <h2 className="mt-5 font-display text-xl text-ivory">
                      También resolvemos
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                      Trabajo que no siempre encaja en una ficha de catálogo,
                      pero que hacemos con la misma profundidad.
                    </p>

                    <ul className="mt-5 grid gap-2">
                      {alsoSolved.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-ivory-dim"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-ivory transition-colors group-hover:text-lavender">
                          Cuéntanos tu caso
                        </span>
                        <ArrowRight className="h-4 w-4 text-ivory-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-lavender" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Casos de uso por área */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender">
                <Compass className="h-3.5 w-3.5" />
                Soluciones por área
              </div>
              <h2 className="font-display text-3xl tracking-tight text-ivory md:text-4xl">
                Casos de uso para cada parte del negocio
              </h2>
              <p className="mt-4 max-w-2xl text-ivory-dim">
                Una guía rápida para que cada equipo identifique oportunidades
                concretas.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <Card className="mt-12 overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="bg-dark-200/60">
                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-ivory-muted">
                        Área
                      </th>
                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-ivory-muted">
                        Oportunidades frecuentes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessAreas.map((row) => (
                      <tr key={row.area} className="border-t border-black/8">
                        <td className="px-6 py-5 align-top font-semibold text-ivory">
                          {row.area}
                        </td>
                        <td className="px-6 py-5 text-sm leading-relaxed text-ivory-dim">
                          {row.opportunities}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Formas de comenzar */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark">
                <Rocket className="h-3.5 w-3.5" />
                Punto de partida
              </div>
              <h2 className="font-display text-3xl tracking-tight text-ivory md:text-4xl">
                Formas frecuentes de comenzar
              </h2>
              <p className="mt-4 max-w-2xl text-ivory-dim">
                El alcance se adapta al punto de partida: una idea, un proceso
                manual, un sistema existente o un producto en crecimiento.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {startingPoints.map((point, idx) => (
              <FadeIn key={point.title} delay={idx * 0.05}>
                <Card className="h-full p-6 text-center">
                  <h3 className="font-display text-xl text-ivory">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                    {point.desc}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Modalidades de colaboración */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {engagementModels.map((model, idx) => (
              <FadeIn key={model.title} delay={idx * 0.05}>
                <Card className="h-full p-7 md:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">
                    {model.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ivory">
                    {model.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                    {model.desc}
                  </p>
                  <ul className="mt-5 grid gap-2">
                    {model.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-ivory-dim"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn delay={0.1}>
            <div className="text-center">
              <Card className="inline-block p-10 md:p-14">
                <div className="flex flex-col items-center gap-4">
                  <div className="mb-2 grid h-14 w-14 place-items-center rounded-2xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-2xl text-ivory md:text-3xl">
                    ¿No encuentras lo que buscas?
                  </h2>
                  <p className="max-w-lg text-ivory-dim">
                    Cuéntanos tu reto y diseñamos una solución personalizada
                    para tu caso específico.
                  </p>
                  <Link href="/contacto" className="mt-4">
                    <Button size="lg">
                      Hablemos de tu proyecto <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
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
