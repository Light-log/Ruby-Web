import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de Privacidad - Ekono",
  description:
    "Política de privacidad de Ekono, aplicación de finanzas personales desarrollada por Consultora Ruby.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "https://devruby.org/politicas-ekono",
  },
};

const sections = [
  {
    title: "1. Información general",
    body: (
      <p>
        <strong>Ekono</strong> es una aplicación de finanzas personales
        desarrollada por <strong>Consultora Ruby</strong>. Esta política explica
        qué información se maneja y cómo se protege tu privacidad. Ekono está
        diseñada con un principio simple: <strong>tus datos financieros se
        almacenan únicamente en tu dispositivo y no se envían a ningún servidor
        nuestro</strong>.
      </p>
    ),
  },
  {
    title: "2. Información que NO recopilamos",
    body: (
      <>
        <p>
          Ekono <strong>no requiere registro ni cuenta</strong>. No recopilamos,
          almacenamos ni transmitimos a servidores propios:
        </p>
        <ul>
          <li>Tu nombre, correo, teléfono u otros datos personales.</li>
          <li>
            Tus movimientos, cuentas, saldos, presupuestos, metas de ahorro,
            recordatorios ni tareas.
          </li>
          <li>Tu ubicación, contactos, fotos ni archivos.</li>
          <li>Identificadores publicitarios ni datos de seguimiento.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Dónde se guardan tus datos",
    body: (
      <>
        <p>
          Toda la información que registras en Ekono (movimientos, cuentas,
          categorías, presupuestos, metas, recordatorios y ajustes) se guarda{" "}
          <strong>localmente en el almacenamiento de tu propio dispositivo</strong>.
          Nosotros no tenemos acceso a esos datos en ningún momento.
        </p>
        <p>
          Si desinstalas la aplicación o usas la opción <strong>&ldquo;Borrar
          todo&rdquo;</strong> dentro de Ajustes &rarr; Privacidad, tus datos se
          eliminan de forma permanente. No conservamos copias.
        </p>
      </>
    ),
  },
  {
    title: "4. Conexiones a internet (terceros)",
    body: (
      <>
        <p>
          Ekono se conecta a internet solo para una función específica y sin
          enviar datos personales:
        </p>
        <ul>
          <li>
            <strong>Tasas de cambio:</strong> para mostrar conversiones (Bs.S
            &harr; USD/EUR) la aplicación consulta tasas públicas a servicios de
            terceros, como{" "}
            <a href="https://ve.dolarapi.com" target="_blank" rel="noreferrer">
              DolarAPI
            </a>{" "}
            y{" "}
            <a href="https://yadio.io" target="_blank" rel="noreferrer">
              Yadio
            </a>
            . Estas consultas <strong>solo descargan el valor de las tasas</strong>;
            no se les envía ninguna información tuya. Aplican las políticas de
            privacidad de dichos servicios.
          </li>
        </ul>
        <p>
          La aplicación <strong>no incluye anuncios, analítica de uso, ni
          rastreadores de terceros</strong>.
        </p>
      </>
    ),
  },
  {
    title: "5. Íconos de terceros",
    body: (
      <p>
        Algunos paquetes de íconos visuales provienen de{" "}
        <a href="https://icons8.com" target="_blank" rel="noreferrer">
          Icons8
        </a>{" "}
        y de{" "}
        <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer">
          Material Symbols (Google)
        </a>
        . Son recursos gráficos incluidos en la app; no recopilan datos.
      </p>
    ),
  },
  {
    title: "6. Permisos del dispositivo",
    body: (
      <p>
        Ekono solo utiliza acceso a internet (para las tasas de cambio). No
        solicita permisos sensibles como cámara, contactos, ubicación o
        micrófono.
      </p>
    ),
  },
  {
    title: "7. Seguridad",
    body: (
      <p>
        Como tus datos permanecen en tu dispositivo, su seguridad depende
        principalmente de la protección de tu propio teléfono (bloqueo de
        pantalla, cifrado del sistema). Ekono incluye además opciones de
        privacidad opcionales (ocultar montos, bloqueo, etc.) en Ajustes.
      </p>
    ),
  },
  {
    title: "8. Privacidad de los niños",
    body: (
      <p>
        Ekono no está dirigida a menores de 13 años y no recopila conscientemente
        información de ellos. Al no recopilar datos personales, no se almacena
        información de ninguna edad.
      </p>
    ),
  },
  {
    title: "9. Cambios a esta política",
    body: (
      <p>
        Esta política <strong>está sujeta a cambios</strong>. Podemos
        actualizarla en cualquier momento para reflejar mejoras en la aplicación
        o cambios legales. Publicaremos siempre la versión vigente en esta misma
        página, con su fecha de última actualización. El uso continuado de Ekono
        tras la publicación de cambios implica la aceptación de la política
        actualizada.
      </p>
    ),
  },
  {
    title: "10. Contacto",
    body: (
      <ul>
        <li>
          <strong>Empresa:</strong> Consultora Ruby
        </li>
        <li>
          <strong>Correo:</strong>{" "}
          <a href="mailto:soporte@devruby.org">soporte@devruby.org</a>
        </li>
        <li>
          <strong>Aplicación:</strong> Ekono
        </li>
        <li>
          <strong>País:</strong> Venezuela
        </li>
      </ul>
    ),
  },
];

export default function PoliticasEkonoPage() {
  return (
    <main className="min-h-screen bg-dark px-5 py-10 text-ivory sm:px-6 lg:py-16">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-5">
          <div className="relative shrink-0 rounded-3xl bg-white p-1.5 shadow-glow ring-1 ring-crimson/20">
            <Image
              src="/ekono-icon.webp"
              alt="Ícono de Ekono"
              width={72}
              height={72}
              priority
              className="rounded-[1.1rem]"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase leading-none tracking-wide text-ivory">
              Ekono
            </h2>
            <p className="mt-1.5 text-sm text-ivory-muted">
              Finanzas personales
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Consultora Ruby"
                width={18}
                height={18}
                className="rounded-md"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
                por Consultora Ruby
              </span>
            </div>
          </div>
        </div>

        <div className="mb-10 border-b border-black/10 pb-8">
          <p className="mb-3 inline-flex rounded-full border border-crimson/20 bg-crimson/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-dark">
            Última actualización: 31 de mayo de 2026
          </p>
          <h1 className="font-display text-4xl uppercase leading-tight text-ivory sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-dim">
            Documento de privacidad para Ekono, aplicación de finanzas personales
            desarrollada por Consultora Ruby. Tus datos se quedan en tu teléfono.
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
          &copy; 2026 Consultora Ruby. Todos los derechos reservados.
        </footer>
      </section>
    </main>
  );
}
