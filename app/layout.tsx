import "./globals.css";
import "animate.css";

import type { Metadata, Viewport } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#C41E3A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devruby.org"),
  title: {
    default: "Consultora Ruby | Desarrollo de Software a Medida y Automatización",
    template: "%s | Consultora Ruby",
  },
  description:
    "Consultora tecnológica premium en Latinoamérica. Desarrollo de software a medida, automatización de procesos, DevOps, ciberseguridad e inteligencia de datos. +50 proyectos entregados con 98% de satisfacción.",
  keywords: [
    "desarrollo de software",
    "software a medida",
    "consultora tecnológica",
    "automatización de procesos",
    "DevOps",
    "ciberseguridad",
    "desarrollo web",
    "aplicaciones móviles",
    "inteligencia de datos",
    "transformación digital",
    "consultora IT",
    "Venezuela",
    "Latinoamérica",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Consultora Ruby", url: "https://devruby.org" }],
  creator: "Consultora Ruby",
  publisher: "Consultora Ruby",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://devruby.org",
    siteName: "Consultora Ruby",
    title: "Consultora Ruby | Desarrollo de Software Premium",
    description:
      "Transformamos ideas en soluciones digitales que impulsan tu negocio. +50 proyectos, 98% satisfacción, soporte 24/7.",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Consultora Ruby - Soluciones Tecnológicas Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultora Ruby | Soluciones Tecnológicas Premium",
    description:
      "Desarrollo de software, automatización, DevOps y más. +50 proyectos entregados.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  alternates: {
    canonical: "https://devruby.org",
  },
  category: "technology",
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Consultora Ruby",
    url: "https://devruby.org",
    logo: "https://devruby.org/logo.svg",
    description:
      "Consultora tecnológica premium. Desarrollo de software a medida, automatización, DevOps, ciberseguridad e inteligencia de datos.",
    email: "soporte@devruby.org",
    telephone: "+584164118747",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Caracas",
      addressCountry: "VE",
    },
    areaServed: ["VE", "LATAM", "ES", "US"],
    serviceType: [
      "Desarrollo de Software",
      "Automatización de Procesos",
      "DevOps",
      "Ciberseguridad",
      "Inteligencia de Datos",
      "Diseño UI/UX",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
    },
    priceRange: "$$",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(oswald.variable, openSans.variable)}>
      <head>
        <JsonLd />
      </head>
      <body className="relative min-h-screen bg-dark font-body antialiased">
        <div className="pointer-events-none fixed inset-0 z-[20]">
          <Spotlight
            fullscreen
            className="opacity-20"
            fill="rgba(124,92,191,.05)"
            size={800}
            follow={0.15}
            softness={0.7}
          />
        </div>
        <div className="noise pointer-events-none fixed inset-0 z-[21]" />
        <div className="relative z-[30]">{children}</div>
      </body>
    </html>
  );
}
