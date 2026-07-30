import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CheckCircle2, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agenda una consulta",
  description:
    "Agenda una consulta inicial con DEVRUBY para hablar de aplicaciones web, APIs, sistemas internos o auditorías técnicas.",
  alternates: { canonical: "https://devruby.org/agenda" },
};

const topics = [
  "Aplicaciones web para operación o clientes",
  "APIs e integraciones entre sistemas",
  "Sistemas internos y portales empresariales",
  "Auditorías técnicas y de ciberseguridad",
];

export default async function AgendaPage({
  searchParams,
}: {
  searchParams?: Promise<{ origen?: string }>;
}) {
  const params = await searchParams;
  const origin = ["espana", "us"].includes(params?.origen ?? "") ? params?.origen : undefined;
  const rawBookingUrl = bookingUrl();
  const configuredBookingUrl = rawBookingUrl && origin
    ? (() => {
        const url = new URL(rawBookingUrl);
        url.searchParams.set("utm_source", "devruby.org");
        url.searchParams.set("utm_medium", "organic");
        url.searchParams.set("utm_campaign", origin);
        return url.toString();
      })()
    : rawBookingUrl;

  return (
    <main className="relative">
      <Navbar />
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark">
              <CalendarDays className="h-3.5 w-3.5" />
              Consulta inicial
            </div>
            <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
              Hablemos de tu <span className="gradient-text">desafío técnico</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory-dim">
              Reserva una conversación inicial de 30 minutos para revisar el contexto,
              las prioridades y el siguiente paso más útil para tu empresa.
            </p>
          </div>

          <Card className="mx-auto mt-12 max-w-3xl p-7 md:p-10">
            <h2 className="font-display text-2xl text-ivory">Podemos conversar sobre</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-sm text-ivory-dim">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {configuredBookingUrl ? (
                <a href={configuredBookingUrl} target="_blank" rel="noreferrer" data-track="booking">
                  <Button size="lg" className="w-full">Elegir horario</Button>
                </a>
              ) : (
                <Link href={origin ? `/contacto?origen=${origin}` : "/contacto"} data-track="booking">
                  <Button size="lg" className="w-full">Solicitar una consulta</Button>
                </Link>
              )}
              <a href={site.whatsAppUrl} target="_blank" rel="noreferrer" data-track="whatsapp">
                <Button variant="outline" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
                </Button>
              </a>
            </div>

            {!configuredBookingUrl ? (
              <p className="mt-5 text-center text-xs leading-relaxed text-ivory-muted">
                Estamos configurando los horarios de reserva. Cuéntanos tu necesidad y coordinaremos la conversación por el medio que indiques.
              </p>
            ) : null}
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}
