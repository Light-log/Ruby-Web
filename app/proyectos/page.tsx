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
    "Portafolio de productos y soluciones desarrolladas por DEVRUBY: plataformas web, aplicaciones, integraciones y sistemas empresariales.",
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
    title: "Proyectos | DEVRUBY",
    description:
      "Conoce productos y soluciones desarrolladas por DEVRUBY.",
    url: "https://devruby.org/proyectos",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "DEVRUBY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos | DEVRUBY",
    description: "Productos y soluciones desarrolladas por DEVRUBY.",
  },
  alternates: { canonical: "https://devruby.org/proyectos" },
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  imageFit?: "contain";
  ctaHref?: string;
  ctaLabel?: string;
  highlights?: string[];
};

const projects: Project[] = [
  {
    title: "RubyQ",
    subtitle: "Bots de IA omnicanal para atención al cliente",
    description:
      "Plataforma SaaS que automatiza la atención al cliente con IA conversacional, unificando todos los canales de mensajería de una empresa en un único panel con constructor visual de flujos sin código.",
    tags: ["SaaS", "IA", "Omnicanal", "No-Code", "Next.js"],
    highlights: [
      "Bandeja unificada de WhatsApp, Telegram, IG, Messenger, TikTok y web",
      "Constructor visual de flujos de IA sin programación",
      "Métricas y analítica de conversaciones en tiempo real",
      "Derivación automática a agentes humanos cuando se necesita",
    ],
    image: "/RubyQ-refined.png",
    ctaHref: "https://q.devruby.org",
    ctaLabel: "Ver plataforma",
  },
  {
    title: "Ekono",
    subtitle: "App de finanzas personales privacy-first",
    description:
      "App móvil de finanzas personales centrada en la privacidad: todos los datos se almacenan únicamente en el dispositivo, sin cuenta ni servidores. Ayuda a controlar gastos, ahorrar y manejar divisas en el contexto venezolano.",
    tags: ["Mobile", "Fintech", "Privacy-first", "Android"],
    highlights: [
      "Datos almacenados solo en tu dispositivo, sin servidores",
      "No requiere registro ni cuenta de usuario",
      "Presupuestos, metas de ahorro y recordatorios",
      "Conversión de divisas Bs.S ↔ USD/EUR con tasas en vivo",
    ],
    image: "/ekono-icon.png",
    imageFit: "contain",
    ctaHref: "https://play.google.com/store/apps/details?id=com.ekono.app",
    ctaLabel: "Ver en Google Play",
  },
  {
    title: "Lazo",
    subtitle: "Aplicación móvil publicada para conexión en pareja",
    description:
      "Aplicación móvil publicada en Google Play y Apple App Store. Facilita actividades diarias, estados compartidos, cuentas vinculadas y notificaciones para acompañar la conexión entre parejas.",
    tags: ["Mobile", "iOS", "Android", "Producto digital"],
    highlights: [
      "Cuentas vinculadas entre integrantes de una pareja",
      "Actividades y retos diarios para conversar y conectar",
      "Estado emocional compartido y progreso conjunto",
      "Notificaciones para acompañar los momentos compartidos",
    ],
    image: "/lazo-icon.svg",
    imageFit: "contain",
    ctaHref: "https://play.google.com/store/apps/details?id=app.lazo.com",
    ctaLabel: "Ver en Google Play",
  },
  {
    title: "Obelium App",
    subtitle: "Marketplace de funerarias + comparación + chat",
    description:
      "Plataforma web donde las funerarias publican sus servicios y los clientes comparan opciones en tiempo real con filtros avanzados y mensajería directa.",
    tags: ["Web App", "Marketplace", "Filtros", "Chat", "Next.js"],
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
    subtitle: "Software Windows + panel web para mantenimiento de equipos médicos",
    description:
      "Sistema conectado para programar alertas nativas en equipos médicos, registrar acciones de mantenimiento y operar equipos, escaneos QR, personal y actividad desde un panel web.",
    tags: ["Windows", "Web app", "Medical", "QR"],
    highlights: [
      "Notificaciones nativas y persistentes en equipos Windows",
      "Registro de acciones y estado al resolver alertas",
      "Vinculación y consulta de equipos mediante códigos QR",
      "Panel web para equipos, actividad, personal y empresa",
    ],
    image: "/Check.png",
    ctaHref: "https://mcheck.devruby.org/",
    ctaLabel: "Ver plataforma",
  },
];

function PortfolioJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portafolio de proyectos - DEVRUBY",
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

      <section className="relative pt-3 pb-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-crimson/6 blur-[100px]" />
          <div className="absolute top-20 right-1/3 h-[350px] w-[350px] rounded-full bg-lavender/6 blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
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
                Productos públicos y soluciones desarrolladas para resolver operaciones,
                automatización y experiencias digitales concretas.
              </p>
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
                        className={p.imageFit ? "object-contain" : "object-cover"}
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-crimson/30 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-crimson/70 via-crimson/20 to-transparent md:hidden" />
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
