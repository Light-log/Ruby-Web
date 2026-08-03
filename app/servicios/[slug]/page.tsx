import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ServiceDetailPage } from "@/components/sections/service-detail-page";
import { isServiceSlug, servicesCatalog, serviceSlugs, type ServiceSlug } from "@/lib/services-catalog";
import { breadcrumbList } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const service = servicesCatalog[slug];
  const url = `https://devruby.org/servicios/${slug}`;

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | DEVRUBY`,
      description: service.description,
      url,
      type: "website",
      images: [{ url: "/logo.svg", width: 512, height: 512, alt: "DEVRUBY" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | DEVRUBY`,
      description: service.description,
    },
  };
}

function ServiceSchema({ slug }: { slug: ServiceSlug }) {
  const service = servicesCatalog[slug];
  const url = `https://devruby.org/servicios/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.shortTitle,
        description: service.description,
        url,
        provider: { "@type": "Organization", name: "DEVRUBY LLC", url: "https://devruby.org" },
        serviceType: service.shortTitle,
      },
      breadcrumbList([
        { name: "Inicio", url: "https://devruby.org" },
        { name: "Servicios", url: "https://devruby.org/servicios" },
        { name: service.shortTitle, url },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  return (
    <main className="relative">
      <ServiceSchema slug={slug} />
      <Navbar />
      <ServiceDetailPage slug={slug} />
      <Footer />
    </main>
  );
}
