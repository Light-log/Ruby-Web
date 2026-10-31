"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Menu, X } from "lucide-react";
import * as React from "react";
import { site } from "@/lib/site";

const copy = {
  es: {
    home: "/",
    tagline: "SOLUCIONES TECNOLÓGICAS",
    links: [
      { href: "/servicios", label: "Servicios" },
      { href: "/proceso", label: "Proceso" },
      { href: "/proyectos", label: "Proyectos" },
      { href: "/nosotros", label: "Nosotros" },
      { href: "/blog", label: "Blog" },
      { href: "/contacto", label: "Contacto" },
    ],
    cta: { href: "/agenda", label: "Agenda una consulta", track: "agenda" },
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  // Rutas /us: el lector llega desde Google a guías en inglés. /agenda está en español, así que la cita va directa a Cal.com.
  en: {
    home: "/us",
    tagline: "TECHNOLOGY SOLUTIONS",
    links: [
      { href: "/us#solutions", label: "Services" },
      { href: "/us/rails-expiry-check", label: "Rails Expiry Check" },
      { href: "/us/blog", label: "Guides" },
    ],
    cta: {
      href: `${site.usBookingUrl}?utm_source=devruby.org&utm_medium=organic&utm_campaign=us`,
      label: "Book a discovery call",
      track: "booking",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};

export function Navbar() {
  const t = copy[/^\/us(\/|$)/.test(usePathname() ?? "") ? "en" : "es"];
  const links = t.links;
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/6 bg-white/80 backdrop-blur-2xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Mismo contenedor que las páginas: antes se quedaba en 80rem con px-6
          mientras el contenido crecía a 88rem con px-8, así que en monitores
          anchos el navbar iba más estrecho y desalineado respecto a la página. */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
        <Link href={t.home} className="flex items-center gap-3 group">
          <Image
            src="/logo-mark.webp"
            alt="DEVRUBY"
            width={48}
            height={48}
            className="rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-base tracking-widest text-ivory">
              DEVRUBY
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ivory-muted">
              {t.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ivory-dim lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative transition-colors duration-300 hover:text-ivory after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-crimson after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Magnetic>
            <Link href={t.cta.href} className="hidden sm:block" data-track={t.cta.track}>
              <Button as="span" variant="primary" size="sm">
                {t.cta.label}
              </Button>
            </Link>
          </Magnetic>

          <button
            className="lg:hidden grid h-11 w-11 place-items-center text-ivory"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/6 bg-white/95 backdrop-blur-2xl animate__animated animate__fadeIn animate__faster">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-4 py-3 text-sm text-ivory-dim transition-colors hover:bg-black/5 hover:text-ivory"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href={t.cta.href} className="mt-3" onClick={() => setOpen(false)} data-track={t.cta.track}>
              <Button variant="primary" size="sm" className="w-full">
                {t.cta.label}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
