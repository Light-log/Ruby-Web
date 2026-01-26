"use client";

import Image from "next/image";
import { Aurora } from "@/components/ui/aurora";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FadeIn } from "@/components/animate/fade-in";
import { ArrowRight, Sparkles, ShieldCheck, Workflow } from "lucide-react";
import anime from "animejs";
import * as React from "react";

export function Hero() {
  const logoRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    // "Gem pulse" micro animation (anime.js)
    const gem = el.querySelector("[data-gem]");
    const glow = el.querySelector("[data-glow]");

    const tl = anime.timeline({ loop: true, autoplay: true });
    tl.add({
      targets: gem,
      scale: [1, 1.06, 1],
      rotate: [0, -2, 0],
      duration: 3200,
      easing: "easeInOutSine",
    }).add(
      {
        targets: glow,
        opacity: [0.25, 0.55, 0.25],
        duration: 3200,
        easing: "easeInOutSine",
      },
      0
    );

    return () => tl.pause();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Aurora />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-14 md:grid-cols-2 md:items-center md:pt-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
            <Sparkles className="h-4 w-4 text-ruby-red" />
            Soluciones tecnológicas con enfoque de negocio
          </div>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Software y automatización{" "}
            <span className="text-ruby-red">de nivel premium</span>
            <br />
            para empresas que quieren crecer rápido.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Diseñamos, desarrollamos e integramos productos digitales: aplicaciones,
            plataformas, automatización de procesos, infraestructura, seguridad e inteligencia de datos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a href="#contacto">
                <Button className="w-full sm:w-auto">
                  Agenda una llamada <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </Magnetic>

            <a href="#servicios" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Ver servicios
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <MiniPill icon={<Workflow className="h-4 w-4" />} title="Automatización" />
            <MiniPill icon={<ShieldCheck className="h-4 w-4" />} title="Seguridad" />
            <MiniPill icon={<Sparkles className="h-4 w-4" />} title="Experiencia UI" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div ref={logoRef} className="relative">
            <ShineBorder className="p-1">
              <div className="relative rounded-3xl bg-gunmetal-900/70 p-8 backdrop-blur-xl">
                <div
                  data-glow
                  className="absolute -inset-1 rounded-3xl bg-ruby-red/20 blur-2xl"
                />

                <div className="relative grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">
                      Identidad • Tecnología • Estrategia
                    </div>
                    <div className="text-xs text-white/60">v1.0</div>
                  </div>

                  <div className="grid place-items-center">
                    <div data-gem className="relative">
                      <Image
                        src="/logo.svg"
                        alt="Isotipo Consultora Ruby"
                        width={320}
                        height={320}
                        priority
                        className="select-none drop-shadow-[0_16px_80px_rgba(230,57,70,.22)]"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-ruby-red/0 via-white/0 to-white/10 blur-2xl" />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-white/90">
                      “Lo difícil se vuelve simple cuando el sistema está bien diseñado.”
                    </div>
                    <div className="text-sm text-white/70">
                      Arquitectura, automatización y UI con estándares modernos.
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                      <Kpi label="Entrega" value="Rápida" />
                      <Kpi label="Calidad" value="Alta" />
                      <Kpi label="Soporte" value="Continuo" />
                    </div>
                  </div>
                </div>
              </div>
            </ShineBorder>

            <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-ruby-burnt/20 blur-[80px]" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MiniPill({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/75">
      <span className="text-ruby-red">{icon}</span>
      <span className="font-semibold text-white/85">{title}</span>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
