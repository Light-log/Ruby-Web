"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import anime from "animejs";
import * as React from "react";
import { Search, Lightbulb, Code2, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Descubrimiento",
    desc: "Entendemos tu negocio, objetivos y contexto técnico. Identificamos oportunidades y definimos el alcance.",
    details: ["Reunión inicial", "Análisis de requerimientos", "Mapeo de procesos"],
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Estrategia & Diseño",
    desc: "Diseñamos la arquitectura, prototipos y plan de ejecución con hitos claros y medibles.",
    details: ["Arquitectura técnica", "Prototipos interactivos", "Plan de ejecución"],
  },
  {
    num: "03",
    icon: Code2,
    title: "Desarrollo & Testing",
    desc: "Construimos con prácticas modernas: código limpio, CI/CD, testing automatizado y revisiones constantes.",
    details: ["Sprints semanales", "Code reviews", "Testing continuo"],
  },
  {
    num: "04",
    icon: Rocket,
    title: "Entrega & Soporte",
    desc: "Desplegamos, documentamos y te acompañamos post-lanzamiento con soporte técnico dedicado.",
    details: ["Deploy automatizado", "Documentación completa", "Soporte 24/7"],
  },
];

export function Process() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-step]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proceso" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-lavender/20 bg-lavender/5 px-4 py-2 text-xs text-lavender-light mb-6">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Metodología
            </div>

            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Un proceso{" "}
              <span className="gradient-text">claro y eficiente</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Desde el primer contacto hasta la entrega final, cada paso está diseñado
              para maximizar valor y minimizar fricciones.
            </p>
          </div>
        </FadeIn>

        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} data-step className="opacity-0">
              <Card className="group h-full p-7 transition-all duration-300 hover:border-white/15 hover:-translate-y-1">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl text-crimson/20 group-hover:text-crimson/40 transition-colors duration-300">
                    {step.num}
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-lavender/10 text-lavender ring-1 ring-lavender/20 transition-all duration-300 group-hover:bg-lavender/20">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-display text-xl text-ivory mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ivory-dim mb-6">{step.desc}</p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-5" />

                <ul className="grid gap-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-ivory-muted">
                      <div className="h-1 w-1 rounded-full bg-crimson" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
