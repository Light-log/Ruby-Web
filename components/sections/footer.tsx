import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { site } from "@/lib/site";
import { CookieSettingsLink } from "@/components/ui/cookie-settings-link";
import { servicesCatalog, serviceSlugs } from "@/lib/services-catalog";
import { usServices, usServiceSlugs } from "@/lib/us-campaign";

const copy = {
  es: {
    home: "/",
    tagline: "Aplicaciones web, APIs, sistemas internos y auditorías técnicas para empresas.",
    nav: "NAVEGACIÓN",
    services: "SERVICIOS",
    contact: "CONTACTO",
    location: "Remoto \u2022 LLC en Nuevo México, EE. UU.",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    cookies: "Política de cookies",
    legal: "Aviso legal y términos",
    cookieSettings: "Gestionar cookies",
    motto: "Ingeniería \u2022 Diseño \u2022 Innovación",
    navLinks: [
      { href: "/servicios", label: "Servicios" },
      { href: "/proceso", label: "Proceso" },
      { href: "/proyectos", label: "Proyectos" },
      { href: "/nosotros", label: "Nosotros" },
      { href: "/blog", label: "Blog" },
      { href: "/contacto", label: "Contacto" },
      { href: "/espana", label: "Empresas en España" },
      { href: "/us", label: "U.S. Businesses" },
    ],
    serviceLinks: serviceSlugs.map((slug) => ({ href: `/servicios/${slug}`, label: servicesCatalog[slug].label })),
  },
  // Rutas /us. Las páginas legales solo existen en español: se enlazan con hrefLang="es".
  en: {
    home: "/us",
    tagline: "Web applications, APIs, internal systems and technical audits for businesses.",
    nav: "NAVIGATION",
    services: "SERVICES",
    contact: "CONTACT",
    location: "Remote \u2022 New Mexico LLC, USA",
    rights: "All rights reserved.",
    privacy: "Privacy policy (Spanish)",
    cookies: "Cookie policy (Spanish)",
    legal: "Legal notice (Spanish)",
    cookieSettings: "Cookie settings",
    motto: "Engineering \u2022 Design \u2022 Innovation",
    navLinks: [
      { href: "/us#solutions", label: "Services" },
      { href: "/us/rails-expiry-check", label: "Rails Expiry Check" },
      { href: "/us/blog", label: "Guides" },
      { href: "/us/agenda", label: "Book a discovery call" },
      { href: "/", label: "Español" },
    ],
    serviceLinks: usServiceSlugs.map((slug) => ({ href: `/us/${slug}`, label: usServices[slug].label })),
  },
};

export function Footer({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = copy[lang];
  return (
    <footer className="border-t border-black/6 bg-dark-50/80">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem] py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href={t.home} className="flex items-center gap-3">
              <Image
                src="/logo-mark.webp"
                alt="DEVRUBY"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-widest text-ivory">
                  DEVRUBY
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
              {t.tagline}
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-wider text-ivory mb-4">
              {t.nav}
            </h2>
            <ul className="grid gap-2">
              {t.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-wider text-ivory mb-4">
              {t.services}
            </h2>
            <ul className="grid gap-2">
              {t.serviceLinks.map((svc) => (
                <li key={svc.href}>
                  <Link
                    href={svc.href}
                    className="text-sm text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-wider text-ivory mb-4">
              {t.contact}
            </h2>
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-sm text-ivory-dim">
                <Mail className="h-4 w-4 text-crimson" />
                soporte@devruby.org
              </div>
              <div className="flex items-center gap-2 text-sm text-ivory-dim">
                <Phone className="h-4 w-4 text-crimson" />
                +58 4164118747
              </div>
              <div className="flex items-center gap-2 text-sm text-ivory-dim">
                <MapPin className="h-4 w-4 text-crimson" />
                {t.location}
              </div>
              <a
                href={site.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-ivory-dim transition-colors hover:text-ivory"
              >
                <Linkedin className="h-4 w-4 text-crimson" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-ivory-muted">
            &copy; {new Date().getFullYear()} DEVRUBY LLC. {t.rights}
          </div>
          <div className="flex flex-col gap-2 text-sm text-ivory-muted sm:flex-row sm:items-center sm:gap-4">
            <Link href="/privacidad" hrefLang="es" className="transition-colors hover:text-ivory">
              {t.privacy}
            </Link>
            <Link href="/cookies" hrefLang="es" className="transition-colors hover:text-ivory">
              {t.cookies}
            </Link>
            <Link href="/aviso-legal" hrefLang="es" className="transition-colors hover:text-ivory">
              {t.legal}
            </Link>
            <CookieSettingsLink label={t.cookieSettings} className="text-left transition-colors hover:text-ivory" />
            <span className="hidden sm:inline">{t.motto}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
