"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import anime from "animejs";
import * as React from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Award } from "lucide-react";

const bullets = [
  "Arquitectura escalable desde el día uno (no parches).",
  "Automatización real: menos tareas repetitivas, menos errores.",
  "UI con motion design y microinteracciones profesionales.",
  "Deploys automatizados y observabilidad para operar con confianza.",
  "Documentación completa y handoff organizado.",
];

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "98%", label: "Satisfacción del cliente" },
  { value: "24/7", label: "Soporte disponible" },
  { value: "3x", label: "Más rápido que lo convencional" },
];

export function Proof() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const statsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-b]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(90),
              duration: 650,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const counters = el.querySelectorAll("[data-counter]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: counters,
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.95, 1],
              delay: anime.stagger(100),
              duration: 600,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resultados" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6">
              <Award className="h-3.5 w-3.5" />
              Resultados
            </div>

            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              Sistemas que{" "}
              <span className="gradient-text">generan confianza</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              La diferencia no está en el &ldquo;demo bonito&rdquo;, sino en la calidad de
              ingeniería, la claridad y la operación.
            </p>
          </div>
        </FadeIn>

        <div ref={statsRef} className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-counter className="opacity-0">
              <Card className="p-6 text-center transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl gradient-text">{s.value}</div>
                <div className="mt-2 text-sm text-ivory-dim">{s.label}</div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.05}>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-ivory">Enfoque de entrega</div>
              </div>

              <div ref={ref} className="grid gap-3">
                {bullets.map((b) => (
                  <div key={b} data-b className="flex items-start gap-3 opacity-0">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                    <div className="text-sm text-ivory-dim">{b}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {["Arquitectura", "Automatización", "Seguridad", "UI/UX", "DevOps"].map((tag) => (
                  <span key={tag} className="rounded-full border border-black/8 bg-black/3 px-3 py-1.5 text-xs text-ivory-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="relative overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-lavender/3" />
              <div className="relative">
                <div className="font-display text-2xl md:text-3xl text-ivory">
                  ¿Qué hacemos en tu proyecto?
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                  Te entregamos un sistema completo: código + despliegue + prácticas
                  correctas, para que puedas crecer sin fricción.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-black/8 bg-dark-200/60 p-5">
                    <div className="text-xs text-ivory-muted mb-1">Ejemplo de resultado</div>
                    <div className="text-sm font-semibold text-ivory">
                      Panel + API + automatizaciones + métricas, listo para escalar.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/8 bg-dark-200/60 p-5">
                    <div className="text-xs text-ivory-muted mb-1">Ejemplo de impacto</div>
                    <div className="text-sm font-semibold text-ivory">
                      Reducción de tiempos operativos y mayor trazabilidad del negocio.
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic>
                    <a href="#contacto">
                      <Button>
                        Quiero mi propuesta <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </Magnetic>
                  <a href="#servicios">
                    <Button variant="outline">Ver servicios</Button>
                  </a>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-20 h-60 w-60 rounded-full bg-crimson/6 blur-[90px]" />
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
