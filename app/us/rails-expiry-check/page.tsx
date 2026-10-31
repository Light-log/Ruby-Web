import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Card } from "@/components/ui/card";
import { RailsExpiryCheck } from "@/components/tools/rails-expiry-check";
import { cycles, fmt } from "@/lib/eol-dates";
import { bookingUrl, site } from "@/lib/site";
import { breadcrumbList } from "@/lib/structured-data";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/us/rails-expiry-check";
const title = "Rails Expiry Check: when does your Rails version stop getting security patches?";
const description =
  "Paste your Gemfile.lock and see when your Rails and Ruby versions stop receiving security patches. Runs in your browser; nothing is uploaded.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL_ },
  openGraph: { title, description, url: URL_, type: "website", locale: "en_US", images: ogImages },
  twitter: { card: "summary_large_image", title, description, images: ogImages.map((i) => i.url) },
};

// Las fechas se refrescan una vez al día (lib/eol-dates.ts); si endoflife.date falla, copia de lib/expiry.ts.
export const revalidate = 86400;

const faqs: Array<[string, string]> = [
  ["Is my Gemfile.lock uploaded anywhere?", "No. The file is read by JavaScript in your browser and never sent to our servers. We only count that the check was used, without the file or any data from it."],
  ["Where do the dates come from?", "From endoflife.date, which tracks the Rails maintenance policy and Ruby's release branches. We refresh them daily."],
  ["What does \"security patches only\" mean?", "The Rails team no longer fixes regular bugs in that series, but still releases fixes for security issues until the end date. After that date, new vulnerabilities are not patched for it."],
  ["My Gemfile.lock has no RUBY VERSION section. Why?", "Bundler only writes it when the Gemfile declares a Ruby version. Pick your Ruby version in the selector and the check still works."],
  ["Our app is expired. What now?", "Upgrade one minor version at a time, with tests passing at each step, and check your gems for compatibility before you start. We do this work for U.S. businesses; the discovery call is where we look at your case."],
];

export default async function RailsExpiryCheckPage() {
  const data = { rails: await cycles("rails"), ruby: await cycles("ruby") };
  const raw = bookingUrl(site.usBookingUrl);
  let booking = "/contacto?origen=us";
  if (raw) {
    const u = new URL(raw);
    u.searchParams.set("utm_source", "devruby.org");
    u.searchParams.set("utm_medium", "tool");
    u.searchParams.set("utm_campaign", "rails-expiry-check");
    booking = u.toString();
  }
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: "Rails Expiry Check", url: URL_, applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: "DEVRUBY LLC", url: "https://devruby.org" } },
      breadcrumbList([{ name: "Home", url: "https://devruby.org" }, { name: "United States", url: "https://devruby.org/us" }, { name: "Rails Expiry Check", url: URL_ }]),
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
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-ivory-muted"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/us">United States</Link><span aria-hidden>/</span><span aria-current="page">Rails Expiry Check</span></nav>
          <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark"><ShieldCheck className="h-3.5 w-3.5" /> Free tool · Rails &amp; Ruby support dates</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-6xl">Is your Rails app expired?</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory-dim">
            Paste your <code>Gemfile.lock</code> and see the date your Rails and Ruby versions stop getting security patches. Then send the summary to whoever signs off the budget.
          </p>
          <div className="mt-10"><RailsExpiryCheck cycles={data} bookingUrl={booking} /></div>
        </div>
      </section>

      <section className="py-12 md:py-16"><div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl text-ivory">Rails security support end dates</h2>
        <Card className="mt-6 overflow-x-auto p-0">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-ivory-muted"><tr><th className="px-6 py-4">Rails</th><th className="px-6 py-4">Bug fixes until</th><th className="px-6 py-4">Security patches until</th><th className="px-6 py-4">Latest patch</th></tr></thead>
            <tbody>{data.rails.map((c) => <tr key={c.cycle} className="border-t border-black/8 text-ivory-dim"><td className="px-6 py-3 font-semibold text-ivory">{c.cycle}</td><td className="px-6 py-3">{c.support ? fmt(c.support) : "—"}</td><td className="px-6 py-3">{fmt(c.eol)}</td><td className="px-6 py-3">{c.latest}</td></tr>)}</tbody>
          </table>
        </Card>
        <p className="mt-3 text-xs text-ivory-muted">Source: <a className="underline" href="https://endoflife.date/rails" target="_blank" rel="noreferrer">endoflife.date/rails</a> and <a className="underline" href="https://endoflife.date/ruby" target="_blank" rel="noreferrer">endoflife.date/ruby</a>.</p>
      </div></section>

      <section className="py-12 md:py-16" aria-labelledby="faq-title"><div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="faq-title" className="font-display text-3xl text-ivory">Frequently asked questions</h2></div>
        <div className="mt-8 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card"><summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{q}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{a}</p></details>)}</div>
        <Link href="/us/ruby-on-rails-consulting" className="mt-10 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark">Ruby on Rails consulting and upgrades <ArrowRight className="h-4 w-4" /></Link>
      </div></section>
      <Footer lang="en" />
    </main>
  );
}
