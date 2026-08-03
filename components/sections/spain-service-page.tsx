import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, CircleHelp, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingUrl, site } from "@/lib/site";
import type { SpainServiceSlug } from "@/lib/spain-campaign";
import { spainServices } from "@/lib/spain-campaign";

function campaignUrl() {
  const url = bookingUrl();
  if (!url) return "/contacto?origen=espana";
  const booking = new URL(url);
  booking.searchParams.set("utm_source", "devruby.org");
  booking.searchParams.set("utm_medium", "organic");
  booking.searchParams.set("utm_campaign", "espana");
  return booking.toString();
}

function whatsappUrl(service: string) {
  const url = new URL(site.whatsAppUrl);
  url.searchParams.set("text", `Hola DEVRUBY, soy de una empresa en España y quiero hablar sobre ${service}.`);
  return url.toString();
}

export function SpainServicePage({ slug }: { slug: SpainServiceSlug }) {
  const service = spainServices[slug];
  const booking = campaignUrl();
  const isExternalBooking = booking.startsWith("https://");

  return (
    <>
      <section className="relative overflow-hidden pt-3 pb-20 md:pb-28">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-lavender/10 blur-[100px]" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <div className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-ivory-muted">
              <Link href="/">Inicio</Link><span aria-hidden>/</span><Link href="/espana">España</Link><span aria-hidden>/</span><span aria-current="page">{service.shortTitle}</span>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark">
              <ShieldCheck className="h-3.5 w-3.5" /> {service.eyebrow} · España
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-6xl">
              {service.headline}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ivory-dim">{service.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {isExternalBooking ? (
                <a href={booking} target="_blank" rel="noreferrer" data-track="booking">
                  <Button size="lg" className="w-full sm:w-auto">Agendar diagnóstico inicial <CalendarDays className="h-4 w-4" /></Button>
                </a>
              ) : (
                <Link href={booking} data-track="agenda"><Button size="lg" className="w-full sm:w-auto">Solicitar diagnóstico inicial <CalendarDays className="h-4 w-4" /></Button></Link>
              )}
              <a href={whatsappUrl(service.shortTitle)} target="_blank" rel="noreferrer" data-track="whatsapp">
                <Button variant="outline" size="lg" className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Hablar por WhatsApp</Button>
              </a>
            </div>
            <p className="mt-4 text-xs text-ivory-muted">Consulta inicial de 30 minutos · Trabajo remoto con empresas de España</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          <Card className="p-7 md:p-9">
            <h2 className="font-display text-2xl text-ivory">Señales de que este puede ser el siguiente paso</h2>
            <ul className="mt-6 grid gap-4">
              {service.painPoints.map((point) => <li key={point} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />{point}</li>)}
            </ul>
          </Card>
          <Card className="p-7 md:p-9">
            <h2 className="font-display text-2xl text-ivory">Cómo abordamos el trabajo</h2>
            <ul className="mt-6 grid gap-4">
              {service.deliverables.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lavender" />{item}</li>)}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Card className="border-crimson/15 bg-crimson/5 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Encaje del proyecto</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Para quién está pensado</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ivory-dim">{service.fit}</p>
            <p className="mt-5 text-sm leading-relaxed text-ivory-dim">En el diagnóstico revisamos el contexto y te diremos con claridad si tiene sentido avanzar, qué información falta y cuál puede ser el primer alcance útil.</p>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="faq-title">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="faq-title" className="font-display text-3xl text-ivory">Preguntas frecuentes</h2></div>
          <div className="mt-8 grid gap-4">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card">
                <summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{faq.question}</summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">¿Quieres valorar el caso con contexto?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ivory-dim">Cuéntanos el proceso, los sistemas que intervienen y el resultado que necesitas. Prepararemos la conversación para aprovechar los 30 minutos.</p>
          <Link href="/contacto?origen=espana" data-track="contact"><Button size="lg" className="mt-8">Contar mi caso <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </section>
    </>
  );
}
