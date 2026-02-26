"use client";

import Image from "next/image";
import { Aurora } from "@/components/ui/aurora";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FadeIn } from "@/components/animate/fade-in";
import { ArrowRight, Shield, Zap, BarChart3, Code2 } from "lucide-react";
import anime from "animejs";
import * as React from "react";

export function Hero() {
  const logoRef = React.useRef<HTMLDivElement | null>(null);
  const statsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const gem = el.querySelector("[data-gem]");
    const glow = el.querySelector("[data-glow]");

    const tl = anime.timeline({ loop: true, autoplay: true });
    tl.add({
      targets: gem,
      scale: [1, 1.04, 1],
      rotate: [0, -1.5, 0],
      duration: 4000,
      easing: "easeInOutSine",
    }).add(
      {
        targets: glow,
        opacity: [0.15, 0.35, 0.15],
        duration: 4000,
        easing: "easeInOutSine",
      },
      0
    );

    return () => tl.pause();
  }, []);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-stat]");
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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <Aurora />
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(26,26,46,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(26,26,46,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24 lg:gap-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-lavender/20 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark mb-6">
            <Zap className="h-3.5 w-3.5" />
            Innovación tecnológica con propósito empresarial
          </div>

          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
            Transformamos ideas en{" "}
            <span className="gradient-text">soluciones digitales</span>
            {" "}que impulsan tu negocio
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
            Diseñamos, desarrollamos e integramos productos digitales de nivel premium:
            software a medida, automatización inteligente, infraestructura robusta y
            experiencias que generan confianza.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <a href="#contacto">
                <Button size="lg" className="w-full sm:w-auto">
                  Agenda una consulta gratuita <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </Magnetic>

            <a href="#servicios" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explorar servicios
              </Button>
            </a>
          </div>

          <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatPill data-stat icon={<Code2 className="h-4 w-4" />} label="Proyectos" value="50+" />
            <StatPill data-stat icon={<Shield className="h-4 w-4" />} label="Seguridad" value="100%" />
            <StatPill data-stat icon={<Zap className="h-4 w-4" />} label="Entregas" value="A tiempo" />
            <StatPill data-stat icon={<BarChart3 className="h-4 w-4" />} label="Satisfacción" value="98%" />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div ref={logoRef} className="relative">
            <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-lavender/10 blur-2xl animate-pulse-glow" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-crimson/10 blur-2xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

            <div className="relative rounded-3xl border border-black/8 bg-white/80 p-8 backdrop-blur-xl shadow-card overflow-hidden">
              <div
                data-glow
                className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-crimson/8 via-transparent to-lavender/6 blur-3xl"
              />

              <div className="relative grid gap-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
                    <span className="text-xs text-ivory-muted tracking-wider">IDENTIDAD &bull; TECNOLOGÍA &bull; ESTRATEGIA</span>
                  </div>
                </div>

                <div className="grid place-items-center py-4">
                  <div data-gem className="relative">
                    <Image
                      src="/logo.svg"
                      alt="Isotipo Consultora Ruby"
                      width={280}
                      height={280}
                      priority
                      className="select-none drop-shadow-[0_16px_60px_rgba(196,30,58,.12)]"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-crimson/0 via-lavender/3 to-black/3 blur-2xl" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-ivory">
                      &ldquo;Lo difícil se vuelve simple cuando el sistema está bien diseñado.&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-ivory-muted">
                      Arquitectura, automatización y diseño con estándares modernos.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Kpi label="Entrega" value="Rápida" />
                    <Kpi label="Calidad" value="Premium" />
                    <Kpi label="Soporte" value="24/7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}

function StatPill({
  icon,
  label,
  value,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
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
        <div className="text-sm font-bold text-ivory">{value}</div>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/8 bg-dark-200/60 px-4 py-3 text-center">
      <div className="text-[11px] text-ivory-muted">{label}</div>
      <div className="mt-1 text-sm font-bold text-ivory">{value}</div>
    </div>
  );
}
