import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de Privacidad y Cookies",
  description:
    "Política de privacidad y uso de cookies del sitio web de Consultora Ruby.",
  alternates: {
    canonical: "https://devruby.org/privacidad",
  },
};

const sections = [
  {
    title: "1. Responsable",
    body: (
      <p>
        El responsable del tratamiento de los datos recogidos a través de este
        sitio es <strong>Consultora Ruby</strong>. Puedes contactarnos en{" "}
        <a href="mailto:soporte@devruby.org">soporte@devruby.org</a>.
      </p>
    ),
  },
  {
    title: "2. Datos que tratamos",
    body: (
      <ul>
        <li>
          <strong>Datos de contacto:</strong> los que nos facilitas
          voluntariamente a través del formulario de contacto (nombre, empresa,
          email, teléfono y mensaje).
        </li>
        <li>
          <strong>Datos de navegación:</strong> información agregada y anónima
          sobre el uso del sitio recogida mediante cookies de análisis, solo si
          das tu consentimiento.
        </li>
        <li>
          <strong>Datos técnicos:</strong> al enviar el formulario de contacto
          registramos tu dirección IP de forma temporal, con el único fin de
          prevenir abusos (anti-spam y limitación de solicitudes).
        </li>
      </ul>
    ),
  },
  {
    title: "3. Finalidad y base legal",
    body: (
      <ul>
        <li>
          <strong>Atender tus solicitudes</strong> y preparar propuestas
          comerciales. Base legal: tu <em>consentimiento</em> y la aplicación de
          medidas precontractuales (Art. 6.1.a y 6.1.b RGPD).
        </li>
        <li>
          <strong>Medir y mejorar</strong> el rendimiento y los contenidos del
          sitio. Base legal: tu <em>consentimiento</em> para las cookies de
          analítica (Art. 6.1.a RGPD).
        </li>
        <li>
          <strong>Prevenir abusos</strong> del formulario. Base legal: nuestro{" "}
          <em>interés legítimo</em> en proteger el servicio (Art. 6.1.f RGPD).
        </li>
      </ul>
    ),
  },
  {
    title: "4. Cookies y analítica",
    body: (
      <>
        <p>
          Este sitio utiliza <strong>Google Analytics 4</strong> para obtener
          estadísticas de uso de forma anónima. Estas cookies{" "}
          <strong>no se activan hasta que las aceptas</strong> en el banner de
          consentimiento. Puedes cambiar tu elección en cualquier momento
          borrando las cookies y datos del sitio en tu navegador.
        </p>
        <p>
          El uso de Google Analytics está sujeto a la{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Política de Privacidad de Google
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "5. Conservación",
    body: (
      <p>
        Conservamos los datos de contacto durante el tiempo necesario para
        atender tu solicitud y, en su caso, mantener la relación comercial.
        Los datos de analítica se conservan según la configuración de Google
        Analytics.
      </p>
    ),
  },
  {
    title: "6. Tus derechos",
    body: (
      <>
        <p>Puedes ejercer en cualquier momento tus derechos de:</p>
        <ul>
          <li>
            <strong>Acceso, rectificación y supresión</strong> de tus datos
            (Art. 15-17 RGPD).
          </li>
          <li>
            <strong>Oposición y limitación</strong> del tratamiento (Art. 18 y
            21 RGPD).
          </li>
          <li>
            <strong>Portabilidad</strong> de tus datos en un formato
            estructurado y legible (Art. 20 RGPD).
          </li>
          <li>
            <strong>Retirar el consentimiento</strong> prestado en cualquier
            momento, sin que afecte a la licitud del tratamiento previo. Para
            las cookies, usa el enlace{" "}
            <strong>&ldquo;Gestionar cookies&rdquo;</strong> del pie de página.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, escríbenos a{" "}
          <a href="mailto:soporte@devruby.org">soporte@devruby.org</a>.
          Atenderemos tu solicitud en un plazo máximo de un mes.
        </p>
        <p>
          Si consideras que el tratamiento no se ajusta a la normativa, tienes
          derecho a presentar una reclamación ante la autoridad de control
          competente (en España, la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
            Agencia Española de Protección de Datos
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    title: "7. Cambios en esta política",
    body: (
      <p>
        Podemos actualizar esta política ocasionalmente. La fecha de última
        actualización aparece al inicio del documento.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-dark px-5 py-10 text-ivory sm:px-6 lg:py-16">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" aria-label="Volver al inicio">
            <Image
              src="/logo.svg"
              alt="Consultora Ruby"
              width={56}
              height={56}
              priority
              className="rounded-2xl shadow-glow"
            />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Consultora Ruby
            </p>
            <p className="mt-1 text-sm text-ivory-muted">Sitio web</p>
          </div>
        </div>

        <div className="mb-10 border-b border-black/10 pb-8">
          <p className="mb-3 inline-flex rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-dark">
            Última actualización: 29 de junio de 2025
          </p>
          <h1 className="font-display text-4xl uppercase leading-tight text-ivory sm:text-5xl">
            Política de Privacidad y Cookies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-dim">
            Cómo tratamos tus datos y qué cookies utilizamos en el sitio web de
            Consultora Ruby.
          </p>
        </div>

        <Card className="rounded-2xl p-6 sm:p-8">
          <div className="space-y-10 text-sm leading-7 text-ivory-dim sm:text-base">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-black/8 pb-8 last:border-b-0 last:pb-0 [&_a]:font-semibold [&_a]:text-crimson [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:mb-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
              >
                <h2 className="mb-3 font-display text-xl uppercase text-ivory">
                  {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </div>
        </Card>

        <footer className="py-8 text-center text-xs text-ivory-muted">
          © 2025 Consultora Ruby. Todos los derechos reservados.
        </footer>
      </section>
    </main>
  );
}
