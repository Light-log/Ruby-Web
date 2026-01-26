"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import * as React from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [msg, setMsg] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      hp: String(fd.get("hp") ?? ""), // honeypot anti-bots
    };

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));

      if (!r.ok || !data?.ok) {
        setStatus("error");
        setMsg(data?.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }

      setStatus("ok");
      setMsg("Listo. Mensaje enviado. Te respondemos pronto.");
      form.reset();
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setMsg("Error de red. Intenta de nuevo.");
    }
  }

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-20">
      <FadeIn>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Contacto
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Cuéntanos el objetivo. Te devolvemos una propuesta clara (alcance,
          tiempo y próximos pasos).
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <Card className="p-7">
            <form className="grid gap-4" onSubmit={onSubmit}>
              {/* honeypot anti-bots (no visible) */}
              <input
                name="hp"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  name="name"
                  label="Nombre"
                  placeholder="Tu nombre"
                  required
                />
                <Input
                  name="company"
                  label="Empresa"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <Input
                name="email"
                label="Email"
                placeholder="correo@empresa.com"
                type="email"
                required
              />
              <Input name="phone" label="Teléfono" placeholder="+58 ..." />

              <label className="grid gap-2 text-sm text-white/80">
                <span className="font-semibold">Mensaje</span>
                <textarea
                  name="message"
                  className="min-h-[130px] resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-ruby-red/40 focus:ring-2 focus:ring-ruby-red/20"
                  placeholder="¿Qué necesitas construir o mejorar?"
                  required
                />
              </label>

              <Button
                type="submit"
                className="justify-center"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Enviar <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              {msg ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status === "ok"
                      ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-100/80"
                      : status === "error"
                      ? "border-red-400/20 bg-red-400/5 text-red-100/80"
                      : "border-white/10 bg-white/[0.02] text-white/70"
                  }`}
                >
                  {msg}
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
