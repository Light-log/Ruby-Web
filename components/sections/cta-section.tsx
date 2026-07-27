"use client";

import { FadeIn } from "@/components/animate/fade-in";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-white/70 p-12 md:p-20 text-center backdrop-blur-xl shadow-card">
            <Image
              src="/devruby-consultation-v2.png"
              alt="Arquitectura de software y seguridad empresarial"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-right opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/35" />
            <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-crimson/6 blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-lavender/6 blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-8">
                <Rocket className="h-3.5 w-3.5" />
                Consulta inicial
              </div>

              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight text-ivory">
                ¿Tienes un sistema que{" "}
                <span className="gradient-text">necesita evolucionar?</span>
              </h2>

              <p className="mt-6 mx-auto max-w-2xl text-ivory-dim text-lg">
                Cuéntanos el contexto técnico y revisemos el siguiente paso para
                construir, integrar o asegurar tu sistema.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Magnetic>
                  <a href="/agenda" data-track="agenda">
                    <Button size="lg">
                      Agenda una consulta inicial <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </Magnetic>

                <a href="/servicios">
                  <Button variant="outline" size="lg">
                    Ver nuestros servicios
                  </Button>
                </a>
              </div>

              <p className="mt-6 text-xs text-ivory-muted">
                Aplicaciones web &bull; APIs &bull; Sistemas internos &bull; Auditorías técnicas
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
