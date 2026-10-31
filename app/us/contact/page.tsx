import type { Metadata } from "next";
import Link from "next/link";
import { ogImages } from "@/lib/seo";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Clock, Shield, FileText, Headphones } from "lucide-react";

const URL_ = "https://devruby.org/us/contact";
const title = "Contact";
const description =
  "Talk to DEVRUBY about a Rails upgrade, a web application, an API integration, workflow automation or a security audit. We reply within one business day.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} | DEVRUBY`, description, url: URL_, type: "website", locale: "en_US", images: ogImages },
  twitter: { card: "summary_large_image", title: `${title} | DEVRUBY`, description },
  alternates: { canonical: URL_ },
};

const guarantees = [
  { icon: Clock, title: "Fast reply", desc: "We reply within 24 hours on business days." },
  { icon: Shield, title: "Confidential", desc: "We only use your information to review and answer your request." },
  { icon: FileText, title: "Clear proposal", desc: "You get a document with scope, timeline and detailed costs." },
  { icon: Headphones, title: "One point of contact", desc: "A direct contact person throughout the project." },
];

export default function USContactPage() {
  return (
    <main lang="en-US" className="relative">
      <Navbar />

      <section className="relative pt-3 pb-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/3 h-[400px] w-[400px] rounded-full bg-crimson/6 blur-[100px]" />
          <div className="absolute top-40 right-1/3 h-[350px] w-[350px] rounded-full bg-lavender/6 blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem] mb-16">
          <FadeIn>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-display text-4xl tracking-tight text-ivory md:text-6xl">
                Contact <span className="gradient-text">DEVRUBY</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ivory-dim">
                Tell us what your business needs: a Rails upgrade, a web application, an API, an internal system,
                automating a manual process or auditing the security of an existing application. We reply within one
                business day with an honest read on whether we are a fit.
              </p>
              <p className="mt-4 text-ivory-muted">
                We work remotely with companies in the U.S., Spain and Latin America. If you prefer to talk it through,{" "}
                <Link href="/us/agenda" className="font-semibold text-crimson hover:text-crimson-dark">
                  book a 30-minute call
                </Link>
                .
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-6 md:grid-cols-4">
              {guarantees.map((g) => (
                <Card key={g.title} className="p-6 text-center transition-all duration-300 hover:border-black/12 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-lavender/6 text-lavender ring-1 ring-lavender/12 mb-4">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm text-ivory mb-2">{g.title}</h3>
                  <p className="text-xs text-ivory-dim">{g.desc}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>

        <Contact lang="en" origin="us" />
      </section>

      <Footer lang="en" />
    </main>
  );
}
