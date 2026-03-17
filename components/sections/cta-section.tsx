"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-white/70 p-12 md:p-20 text-center backdrop-blur-xl shadow-card">
            <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-crimson/6 blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-lavender/6 blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-8">
                <Rocket className="h-3.5 w-3.5" />
                Empecemos hoy
              </div>

              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight text-ivory">
                ¿Listo para transformar{" "}
                <span className="gradient-text">tu negocio?</span>
              </h2>

              <p className="mt-6 mx-auto max-w-2xl text-ivory-dim text-lg">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte a
                construir la solución tecnológica que tu empresa necesita.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Magnetic>
                  <a href="/contacto">
                    <Button size="lg">
                      Agenda tu consulta gratuita <ArrowRight className="h-4 w-4" />
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
                Sin compromisos &bull; Respuesta en menos de 24h &bull; 100% confidencial
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
