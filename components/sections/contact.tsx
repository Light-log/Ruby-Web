"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { LEAD_SUBMITTED_EVENT } from "@/components/analytics/conversion-events";
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Send, Loader2 } from "lucide-react";
import * as React from "react";

type Status = "idle" | "loading" | "ok" | "error";

const copy = {
  es: {
    sendError: "No se pudo enviar. Intenta de nuevo.",
    sent: "Recibimos tu información. Revisaremos el contexto y te responderemos por el medio indicado para coordinar el siguiente paso.",
    networkError: "Error de red. Intenta de nuevo.",
    badge: "Contacto",
    heading: ["Cuéntanos tu", "necesidad técnica"],
    intro: "Comparte el contexto de tu operación y los sistemas involucrados. Así podremos entender si somos el equipo adecuado para ayudarte.",
    name: ["Nombre", "Tu nombre"],
    company: ["Empresa (opcional)", "Nombre de tu empresa"],
    email: ["Email", "correo@empresa.com"],
    phone: ["Teléfono (opcional)", "+58 ..."],
    message: ["Mensaje", "Cuéntanos el objetivo, el proceso actual y los sistemas que intervienen."],
    required: "Solo pedimos lo necesario para responderte. Nombre, email y mensaje son obligatorios.",
    consent: ["He leído y acepto la", "Política de Privacidad", "y el tratamiento de mis datos para responder a mi solicitud."],
    sending: "Enviando...",
    submit: "Enviar mensaje",
    phoneLabel: "Teléfono",
    locationLabel: "Ubicación",
    location: "Remoto \u2022 España, EE. UU. y Latam",
    bookTitle: "¿Prefieres reservar una conversación?",
    bookText: "Puedes elegir el siguiente paso que te resulte más cómodo.",
    agendaHref: "/agenda",
    agenda: "Ver agenda",
    whatsApp: site.whatsAppUrl,
  },
  // /us/contact. La API responde en español: en inglés se muestra un error propio.
  en: {
    sendError: "We could not send your message. Please try again or email soporte@devruby.org.",
    sent: "We received your message. We will review the context and reply through the channel you gave us to agree on the next step.",
    networkError: "Network error. Please try again.",
    badge: "Contact",
    heading: ["Tell us about your", "technical challenge"],
    intro: "Share the context of your operation and the systems involved, so we can tell whether we are the right team to help.",
    name: ["Name", "Your name"],
    company: ["Company (optional)", "Your company"],
    email: ["Email", "you@company.com"],
    phone: ["Phone (optional)", "+1 ..."],
    message: ["Message", "Tell us the goal, the current process and the systems involved."],
    required: "We only ask for what we need to reply. Name, email and message are required.",
    consent: ["I have read and accept the", "Privacy Policy (in Spanish)", "and the processing of my data to answer my request."],
    sending: "Sending...",
    submit: "Send message",
    phoneLabel: "Phone",
    locationLabel: "Location",
    location: "Remote \u2022 Spain, U.S. and Latin America",
    bookTitle: "Prefer to talk live?",
    bookText: "Pick whichever next step is easiest for you.",
    agendaHref: "/us/agenda",
    agenda: "See available times",
    whatsApp: site.usWhatsAppUrl,
  },
};

/** `origin` fijo (p. ej. "us") manda sobre `?origen=` de la URL. */
export function Contact({ lang = "es", origin }: { lang?: "es" | "en"; origin?: string }) {
  const t = copy[lang];
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
      consent: fd.get("consent") === "on",
      origin: origin ?? new URLSearchParams(window.location.search).get("origen") ?? "sitio-web",
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
        setMsg((lang === "es" && data?.error) || t.sendError);
        return;
      }

      setStatus("ok");
      window.dispatchEvent(new Event(LEAD_SUBMITTED_EVENT));
      setMsg(t.sent);
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setMsg(t.networkError);
    }
  }

  return (
    <section id="contacto" className="relative py-24">
      <div className="section-divider mx-auto mb-12 max-w-5xl md:mb-16" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark mb-6">
              <MessageSquare className="h-3.5 w-3.5" />
              {t.badge}
            </div>

            <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">
              {t.heading[0]}{" "}
              <span className="gradient-text">{t.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-ivory-dim">
              {t.intro}
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-5">
          <FadeIn delay={0.05} className="md:col-span-3">
            <Card className="p-8">
              <form className="grid gap-5" onSubmit={onSubmit}>
                <input
                  name="hp"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Input name="name" label={t.name[0]} placeholder={t.name[1]} autoComplete="name" maxLength={120} required />
                  <Input name="company" label={t.company[0]} placeholder={t.company[1]} autoComplete="organization" maxLength={120} />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Input name="email" label={t.email[0]} placeholder={t.email[1]} type="email" inputMode="email" autoComplete="email" maxLength={254} required />
                  <Input name="phone" label={t.phone[0]} placeholder={t.phone[1]} type="tel" maxLength={40} inputMode="tel" autoComplete="tel" />
                </div>

                <label className="grid gap-2 text-sm text-ivory/80">
                  <span className="font-semibold">{t.message[0]}</span>
                  <textarea
                    name="message"
                    className="min-h-[140px] resize-y rounded-2xl border border-black/10 bg-dark-200/60 px-4 py-3 text-ivory placeholder:text-ivory-muted outline-none transition-all duration-300 focus:border-crimson/40 focus:ring-2 focus:ring-crimson/20 focus:bg-white"
                    placeholder={t.message[1]}
                    minLength={10}
                    maxLength={5000}
                    required
                  />
                </label>

                <p className="text-xs text-ivory-muted">
                  {t.required}
                </p>

                <label className="flex items-start gap-3 text-sm text-ivory-dim">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-black/20 accent-crimson"
                  />
                  <span>
                    {t.consent[0]}{" "}
                    <Link
                      href="/privacidad"
                      hrefLang="es"
                      className="font-semibold text-crimson underline underline-offset-2 transition-colors hover:text-crimson-dark"
                    >
                      {t.consent[1]}
                    </Link>{" "}
                    {t.consent[2]}
                  </span>
                </label>

                <Button
                  type="submit"
                  className="justify-center"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t.sending}
                    </>
                  ) : (
                    <>
                      {t.submit} <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {msg ? (
                  <div
                    role={status === "error" ? "alert" : "status"}
                    aria-live={status === "error" ? "assertive" : "polite"}
                    className={`rounded-2xl border px-4 py-3 text-sm animate__animated animate__fadeIn ${
                      status === "ok"
                        ? "border-emerald-500/20 bg-emerald-50 text-emerald-700"
                        : status === "error"
                        ? "border-red-400/20 bg-red-50 text-red-700"
                        : "border-black/10 bg-black/3 text-ivory-dim"
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
                <InfoRow icon={<Phone className="h-4 w-4" />} label={t.phoneLabel}>
                  {site.phone}
                </InfoRow>
                <InfoRow icon={<MapPin className="h-4 w-4" />} label={t.locationLabel}>
                  {t.location}
                </InfoRow>
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

              <div className="mt-8">
                <div className="font-display text-xl text-ivory">
                  {t.bookTitle}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                  {t.bookText}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link href={t.agendaHref} data-track="agenda"><Button as="span" className="w-full">{t.agenda}</Button></Link>
                  <a href={t.whatsApp} target="_blank" rel="noreferrer" data-track="whatsapp"><Button as="span" variant="outline" className="w-full">WhatsApp</Button></a>
                </div>
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
    <div className="flex items-start gap-3 rounded-2xl border border-black/8 bg-dark-200/60 px-5 py-4 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
        {icon}
      </div>
      <div className="grid gap-1">
        <div className="text-xs text-ivory-muted">{label}</div>
        <div className="font-semibold text-ivory">{children}</div>
      </div>
    </div>
  );
}
