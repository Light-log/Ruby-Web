import "./globals.css";
import "animate.css";

import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Consultora Ruby | Soluciones Tecnológicas Premium",
  description:
    "Diseñamos, construimos e integramos soluciones tecnológicas: software a medida, automatización, DevOps, seguridad e inteligencia de datos.",
  icons: {
    icon: "logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(oswald.variable, openSans.variable)}>
      <body className="relative min-h-screen bg-dark font-body antialiased">
        <div className="pointer-events-none fixed inset-0 z-[20]">
          <Spotlight
            fullscreen
            className="opacity-30"
            fill="rgba(124,92,191,.08)"
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
