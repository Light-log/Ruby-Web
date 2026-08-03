import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { USServicePage } from "@/components/sections/us-service-page";
import { isUSServiceSlug, usServices, usServiceSlugs } from "@/lib/us-campaign";
import { breadcrumbList } from "@/lib/structured-data";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() { return usServiceSlugs.map((service) => ({ service })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  if (!isUSServiceSlug(slug)) return {};
  const service = usServices[slug];
  const url = `https://devruby.org/us/${slug}`;
  return { title: service.title, description: service.description, alternates: { canonical: url }, openGraph: { title: service.title, description: service.description, url, type: "website" }, twitter: { card: "summary_large_image", title: service.title, description: service.description } };
}

function ServiceSchema({ service: slug }: { service: keyof typeof usServices }) {
  const data = usServices[slug];
  const url = `https://devruby.org/us/${slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: data.label, description: data.description, url, provider: { "@type": "Organization", name: "DEVRUBY LLC", url: "https://devruby.org" }, areaServed: { "@type": "Country", name: "United States" }, serviceType: data.label },
    breadcrumbList([{ name: "Home", url: "https://devruby.org" }, { name: "United States", url: "https://devruby.org/us" }, { name: data.label, url }]),
    { "@type": "FAQPage", mainEntity: data.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function USServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  if (!isUSServiceSlug(slug)) notFound();
  return <main className="relative"><ServiceSchema service={slug} /><Navbar /><USServicePage slug={slug} /><Footer /></main>;
}
