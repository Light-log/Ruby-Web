import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { USServicePage } from "@/components/sections/us-service-page";
import { isUSServiceSlug, usServices, usServiceSlugs } from "@/lib/us-campaign";

type Props = { params: { service: string } };

export function generateStaticParams() { return usServiceSlugs.map((service) => ({ service })); }

export function generateMetadata({ params }: Props): Metadata {
  if (!isUSServiceSlug(params.service)) return {};
  const service = usServices[params.service];
  const url = `https://devruby.org/us/${params.service}`;
  return { title: service.title, description: service.description, alternates: { canonical: url }, openGraph: { title: service.title, description: service.description, url, type: "website" }, twitter: { card: "summary_large_image", title: service.title, description: service.description } };
}

function ServiceSchema({ service: slug }: { service: keyof typeof usServices }) {
  const data = usServices[slug];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: data.label, description: data.description, url: `https://devruby.org/us/${slug}`, provider: { "@type": "Organization", name: "DEVRUBY LLC", url: "https://devruby.org" }, areaServed: { "@type": "Country", name: "United States" }, serviceType: data.label },
    { "@type": "FAQPage", mainEntity: data.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function USServiceRoute({ params }: Props) {
  if (!isUSServiceSlug(params.service)) notFound();
  return <main className="relative"><ServiceSchema service={params.service} /><Navbar /><USServicePage slug={params.service} /><Footer /></main>;
}
