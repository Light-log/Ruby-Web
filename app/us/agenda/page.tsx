import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

const URL_ = "https://devruby.org/us/agenda";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Book a 30-minute discovery call with DEVRUBY about Rails upgrades, web applications, API integrations, workflow automation or a technical audit.",
  alternates: { canonical: URL_ },
};

const topics = [
  "Ruby on Rails upgrades and rescues",
  "Web applications and internal tools",
  "API integrations between systems",
  "Workflow automation and technical audits",
];

const booking = `${site.usBookingUrl}?utm_source=devruby.org&utm_medium=organic&utm_campaign=us`;

export default function USAgendaPage() {
  return (
    <main lang="en-US" className="relative">
      <Navbar />
      <section className="relative pt-3 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs text-crimson-dark">
              <CalendarDays className="h-3.5 w-3.5" />
              Discovery call
            </div>
            <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
              Let&apos;s talk about your <span className="gradient-text">technical challenge</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory-dim">
              Book a 30-minute call to review the context, the priorities and the most useful next step for your
              business. If the fit is not there, we will say so clearly.
            </p>
          </div>

          <Card className="mx-auto mt-12 max-w-3xl p-7 md:p-10">
            <h2 className="font-display text-2xl text-ivory">What we can cover</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-sm text-ivory-dim">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={booking} target="_blank" rel="noreferrer" data-track="booking">
                <Button as="span" size="lg" className="w-full">Pick a time</Button>
              </a>
              <a href={site.usWhatsAppUrl} target="_blank" rel="noreferrer" data-track="whatsapp">
                <Button as="span" variant="outline" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>
      <Footer lang="en" />
    </main>
  );
}
