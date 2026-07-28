import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, CircleHelp, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingUrl, site } from "@/lib/site";
import type { USServiceSlug } from "@/lib/us-campaign";
import { usServices } from "@/lib/us-campaign";

function usBookingUrl() {
  const raw = bookingUrl();
  if (!raw) return "/contacto?origen=us";
  const url = new URL(raw);
  url.searchParams.set("utm_source", "devruby.org");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", "us");
  return url.toString();
}

function usWhatsAppUrl(service: string) {
  const url = new URL(site.whatsAppUrl);
  url.searchParams.set("text", `Hello DEVRUBY, I represent a U.S. business and would like to discuss ${service}.`);
  return url.toString();
}

export function USServicePage({ slug }: { slug: USServiceSlug }) {
  const service = usServices[slug];
  const booking = usBookingUrl();
  const externalBooking = booking.startsWith("https://");

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-lavender/10 blur-[100px]" />
        <div className="mx-auto max-w-7xl px-6"><div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark"><ShieldCheck className="h-3.5 w-3.5" /> {service.eyebrow} · United States</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-6xl">{service.headline}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ivory-dim">{service.intro}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {externalBooking ? <a href={booking} target="_blank" rel="noreferrer" data-track="booking"><Button size="lg" className="w-full sm:w-auto">Book a discovery call <CalendarDays className="h-4 w-4" /></Button></a> : <Link href={booking} data-track="agenda"><Button size="lg" className="w-full sm:w-auto">Request a discovery call <CalendarDays className="h-4 w-4" /></Button></Link>}
            <a href={usWhatsAppUrl(service.label)} target="_blank" rel="noreferrer" data-track="whatsapp"><Button variant="outline" size="lg" className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Contact us on WhatsApp</Button></a>
          </div>
          <p className="mt-4 text-xs text-ivory-muted">30-minute initial call · DEVRUBY LLC works remotely with U.S. businesses.</p>
        </div></div>
      </section>

      <section className="py-12 md:py-16"><div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
        <Card className="p-7 md:p-9"><h2 className="font-display text-2xl text-ivory">Signs this may be the right next step</h2><ul className="mt-6 grid gap-4">{service.pains.map((pain) => <li key={pain} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />{pain}</li>)}</ul></Card>
        <Card className="p-7 md:p-9"><h2 className="font-display text-2xl text-ivory">What the work can include</h2><ul className="mt-6 grid gap-4">{service.deliverables.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lavender" />{item}</li>)}</ul></Card>
      </div></section>

      <section className="py-12 md:py-16"><div className="mx-auto max-w-5xl px-6"><Card className="border-crimson/15 bg-crimson/5 p-8 md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Project fit</p><h2 className="mt-3 font-display text-3xl text-ivory">Who this is for</h2><p className="mt-4 max-w-3xl leading-relaxed text-ivory-dim">{service.fit}</p><p className="mt-5 text-sm leading-relaxed text-ivory-dim">The discovery call is used to understand the context, identify missing information, and decide whether there is a sensible first scope.</p></Card></div></section>

      <section className="py-12 md:py-16" aria-labelledby="us-faq-title"><div className="mx-auto max-w-5xl px-6"><div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="us-faq-title" className="font-display text-3xl text-ivory">Frequently asked questions</h2></div><div className="mt-8 grid gap-4">{service.faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card"><summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{question}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{answer}</p></details>)}</div></div></section>

      <section className="pb-24 pt-12"><div className="mx-auto max-w-5xl px-6 text-center"><h2 className="font-display text-3xl text-ivory md:text-4xl">Want to evaluate the situation with context?</h2><p className="mx-auto mt-4 max-w-2xl text-ivory-dim">Tell us about the workflow, systems involved, and outcome you need. We will use the call to determine a practical next step.</p><Link href="/contacto?origen=us" data-track="contact"><Button size="lg" className="mt-8">Tell us about your project <ArrowRight className="h-4 w-4" /></Button></Link></div></section>
    </>
  );
}
