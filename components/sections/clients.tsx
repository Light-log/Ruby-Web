"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Shield, Award, Clock, Users } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Datos protegidos", desc: "Seguridad en cada proyecto" },
  { icon: Award, label: "Calidad premium", desc: "Estándares internacionales" },
  { icon: Clock, label: "Entregas puntuales", desc: "Compromisos que cumplimos" },
  { icon: Users, label: "Equipo dedicado", desc: "Talento especializado" },
];

export function Clients() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="rounded-3xl border border-white/6 bg-dark-100/40 px-8 py-10 backdrop-blur-xl">
            <div className="text-center mb-8">
              <p className="text-xs tracking-widest text-ivory-muted uppercase">
                ¿Por qué confiar en nosotros?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center group">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lavender/8 text-lavender ring-1 ring-lavender/15 transition-all duration-300 group-hover:bg-lavender/15 group-hover:ring-lavender/30 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="font-display text-sm text-ivory">{item.label}</div>
                  <div className="text-xs text-ivory-muted mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
