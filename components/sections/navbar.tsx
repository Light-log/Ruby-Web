// components/navbar.tsx (o donde esté tu Navbar)
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#resultados", label: "Resultados" },
  { href: "#portafolio", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-gunmetal-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Consultora Ruby"
            width={60}
            height={36}
            className="rounded-xl"
          />
          <span className="font-display text-base tracking-wide">
            CONSULTORA RUBY
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors duration-200 hover:text-[#E63946]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Magnetic>
          <a href="#contacto">
            <Button
              className="animate__animated animate__fadeIn"
              variant="primary"
              size="sm"
            >
              Solicitar propuesta
            </Button>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
