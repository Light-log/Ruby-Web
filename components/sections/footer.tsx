import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#portafolio", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const serviceLinks = [
  "Desarrollo a medida",
  "Automatización",
  "DevOps & Infra",
  "Seguridad",
  "Datos & Analytics",
  "UI/UX Premium",
];

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-dark-50/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Consultora Ruby"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-widest text-ivory">
                  CONSULTORA RUBY
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
              Diseñamos, construimos e integramos soluciones tecnológicas con
              estándares premium.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm tracking-wider text-ivory mb-4">
              NAVEGACIÓN
            </h4>
            <ul className="grid gap-2">
              {navLinks.map((link) => (
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

          {/* Services */}
          <div>
            <h4 className="font-display text-sm tracking-wider text-ivory mb-4">
              SERVICIOS
            </h4>
            <ul className="grid gap-2">
              {serviceLinks.map((svc) => (
                <li key={svc}>
                  <Link
                    href="/servicios"
                    className="text-sm text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-wider text-ivory mb-4">
              CONTACTO
            </h4>
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
                Caracas &bull; Remoto / Latam
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-ivory-muted">
            &copy; {new Date().getFullYear()} Consultora Ruby. Todos los derechos reservados.
          </div>
          <div className="text-sm text-ivory-muted">
            Ingeniería &bull; Diseño &bull; Innovación
          </div>
        </div>
      </div>
    </footer>
  );
}
