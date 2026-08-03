"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, ShieldCheck, Wrench } from "lucide-react";

const principles = [
  {
    icon: FileCheck2,
    title: "Alcance claro",
    description: "Aterrizamos objetivos, procesos, riesgos y prioridades antes de proponer una solución.",
  },
  {
    icon: Wrench,
    title: "Ingeniería mantenible",
    description: "Diseñamos sistemas que tu equipo pueda entender, operar y evolucionar con documentación.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad desde el diseño",
    description: "Incorporamos revisión técnica y buenas prácticas de seguridad según el contexto del proyecto.",
  },
];

export function Proof() {
  return (
    <section id="enfoque" className="relative py-24">
      <div className="section-divider mx-auto mb-12 max-w-5xl md:mb-16" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lavender/15 bg-lavender/5 px-4 py-2 text-xs text-lavender-dark">
              Nuestro enfoque
            </div>
            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              Ingeniería con <span className="gradient-text">criterio y contexto</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Cada propuesta se define a partir de tu operación, los sistemas que ya usas y el riesgo técnico que hay que resolver.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <FadeIn key={title} delay={index * 0.08}>
              <Card className="h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/12 hover:shadow-card-hover">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl text-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 rounded-3xl border border-black/8 bg-white/70 p-8 text-center shadow-card md:p-10">
            <h3 className="font-display text-2xl text-ivory">¿Tienes un sistema por construir, integrar o revisar?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ivory-dim">
              Conversemos sobre el contexto técnico y define si DEVRUBY es el equipo adecuado para tu proyecto.
            </p>
            <Magnetic>
              <a className="mt-6 inline-flex" href="/agenda" data-track="agenda">
                <Button>Hablar de tu sistema <ArrowRight className="h-4 w-4" /></Button>
              </a>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
