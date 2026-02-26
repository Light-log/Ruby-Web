"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { Code2, Database, Shield, Sparkles, Workflow, Wrench, ArrowRight } from "lucide-react";
import anime from "animejs";
import * as React from "react";

const items = [
  {
    icon: Code2,
    title: "Desarrollo a medida",
    desc: "Web apps, APIs, paneles, plataformas y productos digitales con arquitectura limpia y escalable.",
    color: "crimson",
  },
  {
    icon: Workflow,
    title: "Automatización",
    desc: "Flujos inteligentes para ventas, operaciones, soporte y backoffice. Menos tareas repetitivas.",
    color: "lavender",
  },
  {
    icon: Wrench,
    title: "DevOps & Infra",
    desc: "CI/CD, contenedores, observabilidad y entornos robustos en cloud o híbrido.",
    color: "crimson",
  },
  {
    icon: Shield,
    title: "Seguridad",
    desc: "Hardening, auditorías técnicas, controles y mejores prácticas de seguridad en apps y servidores.",
    color: "lavender",
  },
  {
    icon: Database,
    title: "Datos & Analytics",
    desc: "Modelado de datos, dashboards, pipelines y analítica para decisiones basadas en datos reales.",
    color: "crimson",
  },
  {
    icon: Sparkles,
    title: "UI/UX Premium",
    desc: "Interfaces modernas con motion design: microinteracciones, transiciones y animaciones con intención.",
    color: "lavender",
  },
];

export function Services() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-svc]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.97, 1],
              delay: anime.stagger(80),
              duration: 700,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Nuestros servicios
            </div>

            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              Soluciones con{" "}
              <span className="gradient-text">enfoque de producto</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Unimos estrategia, ingeniería y diseño para construir sistemas que se
              mantengan en el tiempo y escalen con tu negocio.
            </p>
          </div>
        </FadeIn>

        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} data-svc className="opacity-0">
              <ShineBorder className="h-full">
                <Card className="group h-full p-7 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${
                        it.color === "crimson"
                          ? "bg-crimson/8 text-crimson ring-1 ring-crimson/15 group-hover:bg-crimson/12 group-hover:shadow-glow"
                          : "bg-lavender/8 text-lavender ring-1 ring-lavender/15 group-hover:bg-lavender/12 group-hover:shadow-glow-lavender"
                      }`}
                    >
                      <it.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl text-ivory">{it.title}</h3>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-ivory-dim">{it.desc}</p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xs text-ivory-muted">
                      Arquitectura + Código + Documentación
                    </p>
                    <ArrowRight className="h-4 w-4 text-ivory-muted transition-all duration-300 group-hover:text-crimson group-hover:translate-x-1" />
                  </div>
                </Card>
              </ShineBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
