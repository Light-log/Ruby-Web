"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { cn } from "@/lib/utils";
import { Cpu, Lock, Cloud, Braces, Database, Gauge, Boxes, Globe, Smartphone, Palette } from "lucide-react";

const techItems = [
  { icon: Braces, label: "Next.js" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Boxes, label: "Docker" },
  { icon: Cloud, label: "AWS" },
  { icon: Lock, label: "Security" },
  { icon: Gauge, label: "Performance" },
  { icon: Cpu, label: "CI/CD" },
  { icon: Globe, label: "APIs" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Palette, label: "UI/UX" },
];

export function StackMarquee() {
  const content = [...techItems, ...techItems, ...techItems];

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="rounded-3xl border border-white/6 bg-dark-100/40 px-8 py-10 backdrop-blur-xl overflow-hidden">
            <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-xl text-ivory">Stack tecnológico moderno</div>
                <div className="mt-1 text-sm text-ivory-muted">
                  Herramientas y tecnologías que usamos para construir soluciones robustas.
                </div>
              </div>
              <div className="hidden text-xs text-ivory-muted md:block">
                Actualizado constantemente
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-dark-100/80 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-dark-100/80 to-transparent" />

              <div className={cn("flex w-[200%] gap-3 animate-marquee")}>
                {content.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-dark-200/50 px-5 py-3 text-sm text-ivory-dim whitespace-nowrap transition-colors hover:border-white/15 hover:text-ivory"
                  >
                    <item.icon className="h-4 w-4 text-lavender" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
