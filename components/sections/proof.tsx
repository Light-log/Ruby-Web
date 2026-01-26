"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import anime from "animejs";
import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const bullets = [
  "Arquitectura escalable (no parches).",
  "Automatización real: menos tareas, menos errores.",
  "UI con motion design y microinteracciones.",
  "Deploys y observabilidad para operar con tranquilidad.",
];

export function Proof() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Stagger reveal with anime.js once on mount
    const items = el.querySelectorAll("[data-b]");
    anime({
      targets: items,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(90),
      duration: 650,
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <section id="resultados" className="mx-auto max-w-6xl px-5 py-20">
      <FadeIn>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Construimos sistemas que se pueden mantener
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          La diferencia no está en el “demo bonito”, sino en la calidad de ingeniería, la claridad y la operación.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <Card className="p-7">
            <div className="text-sm text-white/70">
              Enfoque de entrega:
            </div>
            <div ref={ref} className="mt-5 grid gap-3">
              {bullets.map((b) => (
                <div key={b} data-b className="flex items-start gap-3 opacity-0">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-ruby-red" />
                  <div className="text-sm text-white/75">{b}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">Arquitectura</span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">Automatización</span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">Seguridad</span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">UI</span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">DevOps</span>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="relative overflow-hidden p-7">
            <div className="absolute inset-0 bg-gradient-to-br from-ruby-red/10 via-transparent to-silver/10" />
            <div className="relative">
              <div className="font-display text-2xl">¿Qué hacemos en tu proyecto?</div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Te entregamos un sistema completo: código + despliegue + prácticas correctas, para que puedas crecer sin fricción.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-white/55">Ejemplo de resultado</div>
                  <div className="mt-1 text-sm font-semibold">
                    Panel + API + automatizaciones + métricas, listo para escalar.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-white/55">Ejemplo de impacto</div>
                  <div className="mt-1 text-sm font-semibold">
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

            <div className="pointer-events-none absolute -bottom-16 -right-20 h-60 w-60 rounded-full bg-ruby-burnt/20 blur-[90px]" />
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
