import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { SpainServicePage } from "@/components/sections/spain-service-page";
import { isSpainServiceSlug, spainServices, spainServiceSlugs } from "@/lib/spain-campaign";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return spainServiceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  if (!isSpainServiceSlug(slug)) return {};
  const service = spainServices[slug];
  const url = `https://devruby.org/espana/${slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { title: service.title, description: service.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: service.title, description: service.description },
  };
}

function ServiceSchema({ service: slug }: { service: keyof typeof spainServices }) {
  const data = spainServices[slug];
  const url = `https://devruby.org/espana/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: data.shortTitle,
        description: data.description,
        url,
        provider: { "@type": "Organization", name: "DEVRUBY LLC", url: "https://devruby.org" },
        areaServed: { "@type": "Country", name: "España" },
        serviceType: data.shortTitle,
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function SpainServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  if (!isSpainServiceSlug(slug)) notFound();
  return (
    <main className="relative">
      <ServiceSchema service={slug} />
      <Navbar />
      <SpainServicePage slug={slug} />
      <Footer />
    </main>
  );
}
