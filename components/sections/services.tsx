import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Code2, Database, Shield, Sparkles, Workflow, Wrench } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Desarrollo de software a medida",
    desc: "Web apps, APIs, paneles, plataformas y productos digitales con arquitectura limpia y escalable.",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    desc: "Flujos inteligentes para ventas, operaciones, soporte y backoffice. Menos tareas repetitivas, más control.",
  },
  {
    icon: Wrench,
    title: "DevOps e infraestructura",
    desc: "Deploys, observabilidad, CI/CD, contenedores y entornos robustos (cloud o híbrido).",
  },
  {
    icon: Shield,
    title: "Seguridad informática",
    desc: "Hardening, controles, auditorías técnicas básicas, y buenas prácticas de seguridad en apps y servidores.",
  },
  {
    icon: Database,
    title: "Datos e inteligencia",
    desc: "Modelado de datos, analítica, dashboards y pipelines para tomar decisiones con señales reales.",
  },
  {
    icon: Sparkles,
    title: "UI moderna y experiencia",
    desc: "Interfaces con motion design: microinteracciones, transiciones y animaciones con intención (no humo).",
  },
];

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-20">
      <FadeIn>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Servicios con enfoque de producto
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Unimos estrategia, ingeniería y diseño para construir sistemas que se mantengan en el tiempo.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <FadeIn key={it.title} delay={idx * 0.06}>
            <Card className="group h-full p-6 transition hover:border-white/20 hover:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ruby-red/12 text-ruby-red ring-1 ring-ruby-red/20 transition group-hover:bg-ruby-red/18">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg">{it.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{it.desc}</p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="mt-4 text-xs text-white/55">
                Entregables: arquitectura, código, documentación y handoff.
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
