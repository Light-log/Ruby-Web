"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Send } from "lucide-react";
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
      hp: String(fd.get("hp") ?? ""),
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
      setMsg("Mensaje enviado correctamente. Te responderemos pronto.");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setMsg("Error de red. Intenta de nuevo.");
    }
  }

  return (
    <section id="contacto" className="relative py-24">
      <div className="section-divider mx-auto max-w-5xl mb-24" />

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-xs text-crimson-light mb-6">
              <MessageSquare className="h-3.5 w-3.5" />
              Contacto
            </div>

            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Hablemos de tu{" "}
              <span className="gradient-text">próximo proyecto</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              Cuéntanos el objetivo. Te devolvemos una propuesta clara con alcance,
              tiempo y próximos pasos.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-5">
          <FadeIn delay={0.05} className="md:col-span-3">
            <Card className="p-8">
              <form className="grid gap-5" onSubmit={onSubmit}>
                <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid gap-5 md:grid-cols-2">
                  <Input name="name" label="Nombre" placeholder="Tu nombre" required />
                  <Input name="company" label="Empresa" placeholder="Nombre de tu empresa" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Input name="email" label="Email" placeholder="correo@empresa.com" type="email" required />
                  <Input name="phone" label="Teléfono" placeholder="+58 ..." />
                </div>

                <label className="grid gap-2 text-sm text-ivory/80">
                  <span className="font-semibold">Mensaje</span>
                  <textarea
                    name="message"
                    className="min-h-[140px] resize-y rounded-2xl border border-white/10 bg-dark-200/60 px-4 py-3 text-ivory placeholder:text-ivory-muted/50 outline-none transition-all duration-300 focus:border-crimson/40 focus:ring-2 focus:ring-crimson/20 focus:bg-dark-200/80"
                    placeholder="¿Qué necesitas construir o mejorar?"
                    required
                  />
                </label>

                <Button type="submit" className="justify-center" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      Enviar mensaje <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {msg ? (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm animate__animated animate__fadeIn ${
                      status === "ok"
                        ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-200"
                        : status === "error"
                        ? "border-red-400/20 bg-red-400/5 text-red-200"
                        : "border-white/10 bg-white/5 text-ivory-dim"
                    }`}
                  >
                    {msg}
                  </div>
                ) : null}
              </form>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-2">
            <Card className="p-8 h-full">
              <div className="grid gap-5">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                  soporte@devruby.org
                </InfoRow>
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Teléfono">
                  +58 4164118747
                </InfoRow>
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Ubicación">
                  Caracas &bull; Remoto / Latam
                </InfoRow>
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              <div className="mt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-lavender/20 bg-lavender/5 px-3 py-1.5 text-xs text-lavender-light mb-4">
                  Tip
                </div>
                <div className="font-display text-xl text-ivory">
                  ¿Tienes un documento o brief?
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                  Adjúntalo en tu mensaje. Nos ayuda a estimar más rápido y
                  reducir iteraciones innecesarias.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/8 bg-dark-200/50 p-5">
                <div className="text-xs text-ivory-muted mb-2">Tiempo de respuesta promedio</div>
                <div className="font-display text-2xl gradient-text">&lt; 24 horas</div>
                <p className="mt-2 text-xs text-ivory-muted">
                  En días laborables. Urgencias atendidas de inmediato.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>
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
    <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-dark-200/50 px-5 py-4 transition-all duration-300 hover:border-white/15 hover:bg-dark-200/70">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-crimson/10 text-crimson ring-1 ring-crimson/20">
        {icon}
      </div>
      <div className="grid gap-1">
        <div className="text-xs text-ivory-muted">{label}</div>
        <div className="font-semibold text-ivory/90">{children}</div>
      </div>
    </div>
  );
}
