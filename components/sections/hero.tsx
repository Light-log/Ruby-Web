"use client";

import { GLSLHills } from "@/components/ui/glsl-hills";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/animate/text-reveal";
import { Counter } from "@/components/animate/counter";
import { FadeIn } from "@/components/animate/fade-in";
import { ArrowRight, Shield, Zap, BarChart3, Code2, Star } from "lucide-react";
import anime from "animejs";
import * as React from "react";

export function Hero() {
  const statsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-stat]");

    // Con movimiento reducido las píldoras deben quedar visibles sin animar
    // (su estado base es opacity-0, así que las forzamos a visibles).
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((it) => {
        it.style.opacity = "1";
      });
      return;
    }

    anime({
      targets: items,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(120, { start: 600 }),
      duration: 800,
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <GLSLHills className="h-full w-full" />
        {/* Velo crema sobre la columna de texto para mantener legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        {/* Fundido inferior para integrar las colinas con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(26,26,46,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(26,26,46,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 md:pt-24">
        <div className="max-w-2xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-lavender/20 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6 animate__animated animate__fadeInDown">
              <Star className="h-3.5 w-3.5 fill-lavender text-lavender" />
              4.9/5 valoración promedio de nuestros clientes
            </div>
          </FadeIn>

          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
            <TextReveal>Reducimos tus costos operativos</TextReveal>{" "}
            <TextReveal delay={0.4} className="gradient-text">
              hasta un 40%
            </TextReveal>{" "}
            <TextReveal delay={0.7}>con tecnología inteligente</TextReveal>
          </h1>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
              Más de <strong className="text-ivory">50 empresas</strong> ya
              confían en nosotros. Desarrollamos software a medida,
              automatizamos procesos y blindamos tu infraestructura.{" "}
              <strong className="text-crimson">
                Primera consulta sin costo.
              </strong>
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a href="/contacto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Solicita tu diagnóstico gratis{" "}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Magnetic>

              <a href="/proyectos" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver casos de éxito
                </Button>
              </a>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-ivory-muted">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-crimson" /> Sin compromisos
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-lavender" /> Respuesta en 24h
              </span>
            </div>
          </FadeIn>
        </div>

        <div
          ref={statsRef}
          className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <StatPill data-stat icon={<Code2 className="h-4 w-4" />} label="Proyectos">
            <Counter value={50} suffix="+" />
          </StatPill>
          <StatPill data-stat icon={<Shield className="h-4 w-4" />} label="Uptime">
            <Counter value={99} suffix=".9%" />
          </StatPill>
          <StatPill data-stat icon={<Zap className="h-4 w-4" />} label="Más rápido">
            <Counter value={3} suffix="x" />
          </StatPill>
          <StatPill data-stat icon={<BarChart3 className="h-4 w-4" />} label="Satisfacción">
            <Counter value={98} suffix="%" />
          </StatPill>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}

function StatPill({
  icon,
  label,
  children,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  "data-stat"?: boolean;
}) {
  return (
    <div
      {...rest}
      className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/70 px-4 py-3 opacity-0 backdrop-blur shadow-card"
    >
      <span className="text-crimson">{icon}</span>
      <div>
        <div className="text-xs text-ivory-muted">{label}</div>
        <div className="text-sm font-bold text-ivory">{children}</div>
      </div>
    </div>
  );
}
