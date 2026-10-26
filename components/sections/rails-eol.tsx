import Link from "next/link";
import { ArrowRight, CircleHelp, ShieldAlert } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Card } from "@/components/ui/card";
import { cycles, fmt } from "@/lib/eol-dates";
import { breadcrumbList } from "@/lib/structured-data";

export type RailsEolProps = {
  /** Serie de Rails de la página ("7.2", "8.0"). */
  cycle: string;
  url: string;
  /** H1 de la página. */
  heading: string;
  /** Párrafo de entrada, con las fechas clave en texto. */
  lead: string;
  /** Viñetas de «What this means for your app». */
  meaning: string[];
  /** Pasos de «What to do now»: [título, texto]. */
  steps: Array<[string, string]>;
  faqs: Array<[string, string]>;
};

export async function RailsEolPage({ cycle, url, heading, lead, meaning, steps, faqs }: RailsEolProps) {
  const rails = await cycles("rails");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList([
        { name: "Home", url: "https://devruby.org" },
        { name: "United States", url: "https://devruby.org/us" },
        { name: `Rails ${cycle} end of life`, url },
      ]),
      { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  return (
    <main lang="en-US" className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <section className="relative overflow-hidden pt-3 pb-12 md:pb-16">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-ivory-muted"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/us">United States</Link><span aria-hidden>/</span><span aria-current="page">Rails {cycle} end of life</span></nav>
          <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark"><ShieldAlert className="h-3.5 w-3.5" /> Rails {cycle} · security support dates</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-5xl">{heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory-dim">{lead}</p>
          <Link href="/us/rails-expiry-check?ref=eol" className="mt-8 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark">
            Not sure what you&apos;re running? Paste your Gemfile.lock into the free check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-10 md:py-12"><div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl text-ivory">What this means for your app</h2>
        <ul className="mt-6 grid max-w-3xl gap-3 text-ivory-dim">
          {meaning.map((m) => <li key={m} className="flex gap-3 text-sm leading-relaxed"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />{m}</li>)}
        </ul>
      </div></section>

      <section className="py-10 md:py-12"><div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl text-ivory">What to do now</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map(([t, body], i) => (
            <li key={t}><Card className="h-full p-6">
              <p className="font-display text-lg text-crimson">{i + 1}. {t}</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{body}</p>
            </Card></li>
          ))}
        </ol>
      </div></section>

      <section className="py-10 md:py-12"><div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl text-ivory">Rails security support end dates</h2>
        <Card className="mt-6 overflow-x-auto p-0">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-ivory-muted"><tr><th className="px-6 py-4">Rails</th><th className="px-6 py-4">Bug fixes until</th><th className="px-6 py-4">Security patches until</th><th className="px-6 py-4">Latest patch</th></tr></thead>
            <tbody>{rails.map((c) => <tr key={c.cycle} className={`border-t border-black/8 text-ivory-dim ${c.cycle === cycle ? "bg-crimson/5" : ""}`}><td className="px-6 py-3 font-semibold text-ivory">{c.cycle}</td><td className="px-6 py-3">{c.support ? fmt(c.support) : "—"}</td><td className="px-6 py-3">{fmt(c.eol)}</td><td className="px-6 py-3">{c.latest}</td></tr>)}</tbody>
          </table>
        </Card>
        <p className="mt-3 text-xs text-ivory-muted">Source: <a className="underline" href="https://endoflife.date/rails" target="_blank" rel="noreferrer">endoflife.date/rails</a>. Refreshed daily.</p>
      </div></section>

      <section className="py-10 md:py-14" aria-labelledby="faq-title"><div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="faq-title" className="font-display text-3xl text-ivory">Frequently asked questions</h2></div>
        <div className="mt-8 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card"><summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{q}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{a}</p></details>)}</div>
        <Link href="/us/ruby-on-rails-consulting" className="mt-10 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark">Ruby on Rails consulting and upgrades <ArrowRight className="h-4 w-4" /></Link>
      </div></section>
      <Footer />
    </main>
  );
}
