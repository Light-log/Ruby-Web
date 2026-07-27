import "./globals.css";
import "animate.css";

import type { Metadata, Viewport } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { ConsentBanner } from "@/components/ui/consent-banner";

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
    default: "DEVRUBY | Aplicaciones web, APIs y sistemas internos",
    template: "%s | DEVRUBY",
  },
  description:
    "DEVRUBY LLC diseña aplicaciones web, APIs, integraciones, sistemas internos y auditorías técnicas para empresas.",
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
  authors: [{ name: "DEVRUBY LLC", url: "https://devruby.org" }],
  creator: "DEVRUBY LLC",
  publisher: "DEVRUBY LLC",
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
    siteName: "DEVRUBY",
    title: "DEVRUBY | Ingeniería de software para empresas",
    description:
      "Aplicaciones web, APIs, sistemas internos y auditorías técnicas para empresas.",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "DEVRUBY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVRUBY | Ingeniería de software para empresas",
    description:
      "Aplicaciones web, APIs, sistemas internos y auditorías técnicas.",
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
    name: "DEVRUBY LLC",
    url: "https://devruby.org",
    logo: "https://devruby.org/logo.svg",
    description:
      "Aplicaciones web, APIs, sistemas internos e ingeniería de seguridad para empresas.",
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
        <ConsentBanner />
      </body>
    </html>
  );
}
