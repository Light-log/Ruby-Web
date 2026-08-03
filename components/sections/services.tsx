"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { Sparkles, ArrowRight } from "lucide-react";
import { servicesCatalog, serviceSlugs } from "@/lib/services-catalog";
import anime from "animejs";
import * as React from "react";

export function Services() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-svc]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.97, 1],
              delay: anime.stagger(80),
              duration: 700,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className="relative py-24">
      <div className="section-divider mx-auto mb-12 max-w-5xl md:mb-16" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Nuestros servicios
            </div>

            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              Soluciones con{" "}
              <span className="gradient-text">enfoque de producto</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Unimos estrategia, ingeniería y diseño para construir sistemas que se
              mantengan en el tiempo y escalen con tu negocio.
            </p>
          </div>
        </FadeIn>

        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceSlugs.map((slug) => {
            const it = servicesCatalog[slug];
            return (
              <div key={slug} data-svc className="opacity-0">
                <ShineBorder className="h-full">
                  <Link href={`/servicios/${slug}`} className="group block h-full">
                    <Card className="h-full p-7 transition-all duration-300 group-hover:border-black/12 group-hover:shadow-card-hover group-hover:-translate-y-1">
                      <div className="flex items-center gap-4">
                        <div
                          className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${
                            it.color === "crimson"
                              ? "bg-crimson/8 text-crimson ring-1 ring-crimson/15 group-hover:bg-crimson/12 group-hover:shadow-glow"
                              : "bg-lavender/8 text-lavender ring-1 ring-lavender/15 group-hover:bg-lavender/12 group-hover:shadow-glow-lavender"
                          }`}
                        >
                          <it.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-xl text-ivory">{it.shortTitle}</h3>
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-ivory-dim">{it.summary}</p>

                      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-xs text-ivory-muted">Ver detalle del servicio</p>
                        <ArrowRight className="h-4 w-4 text-ivory-muted transition-all duration-300 group-hover:text-crimson group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                </ShineBorder>
              </div>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div className="mt-14 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-crimson"
            >
              Ver el catálogo completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
