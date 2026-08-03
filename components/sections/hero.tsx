"use client";

import { useCallback, useState } from "react";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { PageLoader } from "@/components/ui/page-loader";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/animate/text-reveal";
import { FadeIn } from "@/components/animate/fade-in";
import { ArrowRight, Braces, Code2, ShieldCheck, Workflow } from "lucide-react";

const capabilities = [
  { icon: Code2, label: "Aplicaciones web" },
  { icon: Braces, label: "APIs e integraciones" },
  { icon: Workflow, label: "Sistemas internos" },
  { icon: ShieldCheck, label: "Auditorías técnicas" },
];

export function Hero() {
  const [visualReady, setVisualReady] = useState(false);
  const handleVisualReady = useCallback(() => setVisualReady(true), []);

  return (
    <section className="relative flex min-h-[92vh] items-start overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <GLSLHills className="h-full w-full" onReady={handleVisualReady} />
        {!visualReady && <PageLoader className="absolute inset-0 bg-dark" />}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-3 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lavender/20 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark">
            Ingeniería de software para empresas
          </div>

          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
            <TextReveal>Construimos software que</TextReveal>{" "}
            <TextReveal delay={0.4} className="gradient-text">
              organiza y conecta
            </TextReveal>{" "}
            <TextReveal delay={0.7}>tu operación</TextReveal>
          </h1>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
              En DEVRUBY diseñamos aplicaciones web, APIs y sistemas internos para
              empresas que necesitan una base técnica clara, mantenible y segura.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a href="/agenda" data-track="agenda">
                  <Button size="lg" className="w-full sm:w-auto">
                    Agenda una consulta inicial <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Magnetic>
              <a href="/proyectos" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver proyectos públicos
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {capabilities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/70 px-4 py-3 backdrop-blur shadow-card">
              <Icon className="h-4 w-4 shrink-0 text-crimson" />
              <span className="text-sm font-bold text-ivory">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
