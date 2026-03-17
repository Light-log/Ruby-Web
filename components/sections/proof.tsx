"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Counter } from "@/components/animate/counter";
import { StaggerChildren } from "@/components/animate/stagger-children";
import { BorderBeam } from "@/components/animate/border-beam";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Award, Quote } from "lucide-react";

const bullets = [
  "Arquitectura escalable desde el día uno — sin deuda técnica.",
  "Automatización que elimina hasta el 60% de tareas manuales.",
  "Interfaces con microinteracciones que aumentan la retención un 25%.",
  "Deploys automatizados: de 2 semanas a 15 minutos.",
  "Documentación completa para que tu equipo sea autónomo.",
];

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 40, suffix: "%", label: "Ahorro operativo promedio" },
  { value: 24, suffix: "/7", label: "Soporte técnico" },
];

const testimonials = [
  {
    quote: "Automatizaron nuestro proceso de facturación y redujimos errores en un 90%. ROI positivo en 3 meses.",
    author: "CEO",
    company: "Empresa de logística",
  },
  {
    quote: "El equipo entregó a tiempo, documentó todo y el soporte post-lanzamiento fue excelente.",
    author: "CTO",
    company: "Startup fintech",
  },
];

export function Proof() {
  return (
    <section id="resultados" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6">
              <Award className="h-3.5 w-3.5" />
              Resultados comprobados
            </div>

            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              Resultados que{" "}
              <span className="gradient-text">hablan por sí solos</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              No vendemos promesas. Cada número aquí es real y verificable con nuestros clientes.
            </p>
          </div>
        </FadeIn>

        {/* Animated counters */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <FadeIn key={s.label} delay={0.05}>
              <Card className="p-6 text-center transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-ivory-dim">{s.label}</div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <BorderBeam duration={8} colorFrom={i === 0 ? "#C41E3A" : "#7C5CBF"} colorTo={i === 0 ? "#7C5CBF" : "#C41E3A"}>
                <Card className="p-7 h-full">
                  <Quote className="h-8 w-8 text-crimson/20 mb-4" />
                  <p className="text-sm leading-relaxed text-ivory-dim italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-crimson/10 grid place-items-center text-xs font-bold text-crimson">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ivory">{t.author}</div>
                      <div className="text-xs text-ivory-muted">{t.company}</div>
                    </div>
                  </div>
                </Card>
              </BorderBeam>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.05}>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-ivory">Lo que obtienes con nosotros</div>
              </div>

              <StaggerChildren stagger={0.08}>
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                    <div className="text-sm text-ivory-dim">{b}</div>
                  </div>
                ))}
              </StaggerChildren>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="relative overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-lavender/3" />
              <div className="relative">
                <div className="font-display text-2xl md:text-3xl text-ivory">
                  Garantía de satisfacción
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                  Si en los primeros 30 días no estás satisfecho con nuestro trabajo,
                  te devolvemos tu inversión. Así de seguros estamos de lo que hacemos.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-black/8 bg-dark-200/60 p-5">
                    <div className="text-xs text-ivory-muted mb-1">Resultado típico</div>
                    <div className="text-sm font-semibold text-ivory">
                      Panel + API + automatizaciones + métricas en producción en 6-8 semanas.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/8 bg-dark-200/60 p-5">
                    <div className="text-xs text-ivory-muted mb-1">Impacto medido</div>
                    <div className="text-sm font-semibold text-ivory">
                      Reducción del 40% en costos operativos y 3x más velocidad de entrega.
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic>
                    <a href="/contacto">
                      <Button>
                        Quiero resultados así <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </Magnetic>
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
