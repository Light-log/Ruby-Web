"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Menu, X } from "lucide-react";
import * as React from "react";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#portafolio", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
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
          ? "border-b border-white/6 bg-dark/80 backdrop-blur-2xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Consultora Ruby"
            width={48}
            height={48}
            className="rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-base tracking-widest text-ivory">
              CONSULTORA RUBY
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ivory-muted">
              SOLUCIONES TECNOLÓGICAS
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ivory/60 lg:flex">
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
            <Link href="/#contacto" className="hidden sm:block">
              <Button variant="primary" size="sm">
                Solicitar propuesta
              </Button>
            </Link>
          </Magnetic>

          <button
            className="lg:hidden text-ivory p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/6 bg-dark/95 backdrop-blur-2xl animate__animated animate__fadeIn animate__faster">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-4 py-3 text-sm text-ivory/70 transition-colors hover:bg-white/5 hover:text-ivory"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/#contacto" className="mt-3" onClick={() => setOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Solicitar propuesta
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
