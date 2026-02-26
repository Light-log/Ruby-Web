import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2, Database, Shield, Sparkles, Workflow, Wrench,
  ArrowRight, CheckCircle2, Layers, Cpu, BarChart3
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo de software a medida",
    desc: "Construimos aplicaciones web, APIs, paneles administrativos, plataformas digitales y productos completos con arquitectura limpia, escalable y mantenible.",
    features: [
      "Aplicaciones web modernas con React / Next.js",
      "APIs REST y GraphQL con documentación completa",
      "Paneles de administración y dashboards",
      "Integraciones con servicios externos y ERPs",
      "Arquitectura de microservicios",
      "Code reviews y buenas prácticas",
    ],
    color: "crimson" as const,
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    desc: "Diseñamos flujos inteligentes que eliminan tareas repetitivas y reducen errores en ventas, operaciones, soporte y backoffice.",
    features: [
      "Automatización de flujos de trabajo con n8n / Zapier",
      "Integración entre herramientas (CRM, ERP, email)",
      "Reportes y alertas automatizadas",
      "Procesamiento de documentos e información",
      "Bots y asistentes automatizados",
      "Monitoreo y optimización continua",
    ],
    color: "lavender" as const,
  },
  {
    icon: Wrench,
    title: "DevOps e infraestructura",
    desc: "Implementamos pipelines de CI/CD, contenedores, observabilidad y entornos robustos en cloud o híbrido para que tu equipo despliegue con confianza.",
    features: [
      "Pipelines CI/CD (GitHub Actions, GitLab CI)",
      "Contenedores con Docker y Kubernetes",
      "Infraestructura como código (Terraform)",
      "Monitoreo y alertas (Grafana, Prometheus)",
      "Administración de servidores Linux",
      "Ambientes de staging y producción",
    ],
    color: "crimson" as const,
  },
  {
    icon: Shield,
    title: "Seguridad informática",
    desc: "Protegemos tus sistemas con hardening, auditorías técnicas, controles de acceso y prácticas de seguridad en apps y servidores.",
    features: [
      "Hardening de servidores y aplicaciones",
      "Auditorías de seguridad y pentesting básico",
      "Configuración de WAF y firewalls",
      "Gestión de secretos y credenciales",
      "Políticas de acceso y autenticación",
      "Cumplimiento de normativas básicas",
    ],
    color: "lavender" as const,
  },
  {
    icon: Database,
    title: "Datos e inteligencia",
    desc: "Diseñamos modelos de datos, pipelines de procesamiento, dashboards analíticos y procesos ETL para que tomes decisiones basadas en señales reales.",
    features: [
      "Modelado de bases de datos (SQL/NoSQL)",
      "Pipelines ETL y procesamiento de datos",
      "Dashboards interactivos con Metabase",
      "Reportes automatizados con KPIs",
      "Integración de fuentes de datos",
      "Analítica descriptiva y predictiva",
    ],
    color: "crimson" as const,
  },
  {
    icon: Sparkles,
    title: "UI moderna y experiencia",
    desc: "Diseñamos interfaces con motion design que conectan: microinteracciones, transiciones fluidas y animaciones con intención que elevan la experiencia del usuario.",
    features: [
      "Diseño de interfaces modernas y responsivas",
      "Motion design y microinteracciones",
      "Sistemas de diseño y componentes reutilizables",
      "Auditorías de UX y mejoras de usabilidad",
      "Prototipos interactivos de alta fidelidad",
      "Accesibilidad y performance web",
    ],
    color: "lavender" as const,
  },
];

export default function ServiciosPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-crimson/10 blur-[100px]" />
          <div className="absolute top-20 right-1/4 h-[350px] w-[350px] rounded-full bg-lavender/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-xs text-crimson-light mb-6">
                <Layers className="h-3.5 w-3.5" />
                Servicios
              </div>

              <h1 className="font-display text-4xl tracking-tight md:text-6xl">
                Soluciones completas para{" "}
                <span className="gradient-text">cada desafío</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-ivory-dim">
                Cada servicio combina estrategia, ingeniería y diseño para construir
                sistemas que funcionan, escalan y se mantienen en el tiempo.
              </p>
            </div>
          </FadeIn>

          <div className="mt-20 grid gap-8">
            {services.map((svc, idx) => (
              <FadeIn key={svc.title} delay={idx * 0.05}>
                <Card className="p-8 md:p-10 transition-all duration-300 hover:border-white/15">
                  <div className="grid gap-8 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`grid h-12 w-12 place-items-center rounded-2xl ${
                            svc.color === "crimson"
                              ? "bg-crimson/10 text-crimson ring-1 ring-crimson/20"
                              : "bg-lavender/10 text-lavender ring-1 ring-lavender/20"
                          }`}
                        >
                          <svc.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h2 className="font-display text-2xl text-ivory mb-3">{svc.title}</h2>
                      <p className="text-sm leading-relaxed text-ivory-dim">{svc.desc}</p>

                      <a href="/#contacto" className="inline-block mt-6">
                        <Button variant={svc.color === "crimson" ? "primary" : "lavender"} size="sm">
                          Solicitar información <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>

                    <div className="md:col-span-3">
                      <div className="rounded-2xl border border-white/8 bg-dark-200/40 p-6">
                        <div className="text-xs text-ivory-muted mb-4 uppercase tracking-wider">
                          Qué incluye
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {svc.features.map((f) => (
                            <div key={f} className="flex items-start gap-2">
                              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${
                                svc.color === "crimson" ? "text-crimson" : "text-lavender"
                              }`} />
                              <span className="text-sm text-ivory-dim">{f}</span>
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

          {/* CTA */}
          <FadeIn delay={0.1}>
            <div className="mt-20 text-center">
              <Card className="inline-block p-10 md:p-14">
                <div className="flex flex-col items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-crimson/10 text-crimson ring-1 ring-crimson/20 mb-2">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="max-w-lg text-ivory-dim">
                    Cuéntanos tu reto y diseñamos una solución personalizada para tu caso específico.
                  </p>
                  <a href="/#contacto" className="mt-4">
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
