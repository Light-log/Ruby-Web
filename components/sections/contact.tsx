"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import * as React from "react";

export function Contact() {
  const [status, setStatus] = React.useState<"idle" | "ok">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo UX only (replace with real API / email integration)
    setStatus("ok");
    setTimeout(() => setStatus("idle"), 3500);
  }

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-20">
      <FadeIn>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Contacto
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Cuéntanos el objetivo. Te devolvemos una propuesta clara (alcance, tiempo y próximos pasos).
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <Card className="p-7">
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Nombre" placeholder="Tu nombre" required />
                <Input label="Empresa" placeholder="Nombre de tu empresa" />
              </div>
              <Input label="Email" placeholder="correo@empresa.com" type="email" required />
              <Input label="Teléfono" placeholder="+58 ..." />
              <label className="grid gap-2 text-sm text-white/80">
                <span className="font-semibold">Mensaje</span>
                <textarea
                  className="min-h-[130px] resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-ruby-red/40 focus:ring-2 focus:ring-ruby-red/20"
                  placeholder="¿Qué necesitas construir o mejorar?"
                  required
                />
              </label>

              <Button type="submit" className="justify-center">
                Enviar <ArrowRight className="h-4 w-4" />
              </Button>

              {status === "ok" ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70">
                  Listo. Mensaje preparado (en esta demo no se envía). Conecta una API en <code className="text-white/85">/app/api</code>.
                </div>
              ) : null}
            </form>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-7">
            <div className="grid gap-4 text-sm text-white/75">
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                soporte@devruby.org
              </InfoRow>
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Teléfono">
                +58 4164118747
              </InfoRow>
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Ubicación">
                Caracas • Remoto / Latam
              </InfoRow>
            </div>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mt-7">
              <div className="text-xs text-white/55">Sugerencia</div>
              <div className="mt-2 font-display text-xl">
                Si tienes un documento o brief, adjúntalo.
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Nos ayuda a estimar más rápido y reducir iteraciones innecesarias.
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
      <div className="grid h-9 w-9 place-items-center rounded-2xl bg-ruby-red/12 text-ruby-red ring-1 ring-ruby-red/20">
        {icon}
      </div>
      <div className="grid gap-1">
        <div className="text-xs text-white/55">{label}</div>
        <div className="font-semibold text-white/80">{children}</div>
      </div>
    </div>
  );
}
