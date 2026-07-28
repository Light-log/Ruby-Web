import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Code2, Link2, ShieldCheck, Workflow } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usServices } from "@/lib/us-campaign";

export const metadata: Metadata = {
  title: "Custom Software, Automation & API Integrations for U.S. Businesses",
  description: "DEVRUBY LLC helps U.S. businesses build internal tools, automate workflows, connect systems, and review application security.",
  alternates: { canonical: "https://devruby.org/us" },
  openGraph: { title: "Custom Software & Workflow Automation | DEVRUBY LLC", description: "Internal tools, workflow automation, API integrations, and application security reviews for U.S. businesses.", url: "https://devruby.org/us", type: "website" },
};

const services = [
  ["custom-internal-tools", Code2], ["workflow-automation", Workflow], ["api-integration-services", Link2], ["application-security-audit", ShieldCheck],
] as const;

export default function USPage() {
  return <main className="relative"><Navbar />
    <section className="relative overflow-hidden py-20 md:py-28"><div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-crimson/10 blur-[130px]" /><div className="mx-auto max-w-7xl px-6 text-center">
      <p className="inline-flex rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark">Remote software engineering for U.S. businesses</p>
      <h1 className="mx-auto mt-6 max-w-5xl font-display text-4xl leading-[1.04] tracking-tight text-ivory md:text-6xl">Turn disconnected work into an operation that is <span className="gradient-text">clear and connected</span></h1>
      <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-ivory-dim">DEVRUBY LLC builds custom internal tools, workflow automation, and API integrations for teams that have outgrown manual handoffs and disconnected systems.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/agenda?origen=us" data-track="agenda"><Button size="lg" className="w-full sm:w-auto">Book a discovery call <CalendarDays className="h-4 w-4" /></Button></Link><Link href="#solutions"><Button variant="outline" size="lg" className="w-full sm:w-auto">Explore solutions <ArrowRight className="h-4 w-4" /></Button></Link></div>
      <p className="mt-5 text-xs text-ivory-muted">DEVRUBY LLC is a U.S. company working remotely nationwide.</p>
    </div></section>

    <section className="py-12 md:py-16"><div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-3xl text-ivory md:text-4xl">The issue is rarely a lack of software</h2><p className="mt-4 text-ivory-dim">It is usually that no system represents the whole workflow, its rules, and the information the team needs to make decisions.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{["The same data is copied between systems and spreadsheets.", "Key workflows depend on email follow-ups and individual memory.", "Teams cannot see exceptions, ownership, or pending work early enough."].map((item) => <Card key={item} className="p-7"><CheckCircle2 className="h-6 w-6 text-crimson" /><p className="mt-5 leading-relaxed text-ivory-dim">{item}</p></Card>)}</div></div></section>

    <section id="solutions" className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-6"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Solutions</p><h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Start with the constraint affecting your operation</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2">{services.map(([slug, Icon]) => { const service = usServices[slug]; return <Card key={slug} className="flex flex-col p-7 md:p-8"><Icon className="h-7 w-7 text-crimson" /><h3 className="mt-5 font-display text-2xl text-ivory">{service.label}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-dim">{service.description}</p><Link className="mt-6 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark" href={`/us/${slug}`}>Explore this service <ArrowRight className="h-4 w-4" /></Link></Card>; })}</div></div></section>

    <section className="py-12 md:py-16"><div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Selected work</p><h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Products built for real operational needs</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2"><Card className="p-8"><h3 className="font-display text-2xl text-ivory">Lazo</h3><p className="mt-3 leading-relaxed text-ivory-dim">A mobile application delivered by DEVRUBY and published on the Apple App Store and Google Play. Product details and public links are being prepared for this case study.</p></Card><Card className="p-8"><h3 className="font-display text-2xl text-ivory">Maintenance Check</h3><p className="mt-3 leading-relaxed text-ivory-dim">A Windows suite for persistent maintenance alerts on medical equipment interfaces, designed to make scheduled notices visible without interrupting the primary workflow.</p></Card></div><p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ivory-muted">We publish only the information authorized for each project. No client results or metrics are implied where they have not been documented.</p></div></section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">How we work</p><h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Understand the operation before proposing technology</h2></div><ol className="mt-12 grid gap-5 md:grid-cols-4">{[["01","Context","Map the workflow, systems, users, and desired outcome."],["02","Diagnosis","Identify the constraint, risk, and sensible next step."],["03","Scope","Define a useful first delivery and its validation criteria."],["04","Delivery","Build with documented decisions, demonstrations, and handoff." ]].map(([number,title,text]) => <li key={number}><Card className="h-full p-6"><span className="font-display text-4xl text-crimson/60">{number}</span><h3 className="mt-5 font-display text-xl text-ivory">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ivory-dim">{text}</p></Card></li>)}</ol></div></section>

    <section className="pb-24 pt-12"><div className="mx-auto max-w-5xl px-6"><Card className="border-crimson/15 bg-crimson/5 p-8 text-center md:p-12"><h2 className="font-display text-3xl text-ivory md:text-4xl">Does an important workflow still depend on manual coordination?</h2><p className="mx-auto mt-4 max-w-2xl text-ivory-dim">Use a 30-minute call to walk through the process, systems involved, and result you need. If the fit is not there, we will say so clearly.</p><Link href="/agenda?origen=us" data-track="agenda"><Button size="lg" className="mt-8">See available times <CalendarDays className="h-4 w-4" /></Button></Link></Card></div></section>
    <Footer />
  </main>;
}
