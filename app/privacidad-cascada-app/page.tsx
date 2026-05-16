import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de Privacidad - Cascada App",
  description:
    "Política de privacidad de Cascada App, desarrollada por Consultora Ruby.",
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
    canonical: "https://devruby.org/privacidad-cascada-app",
  },
};

const sections = [
  {
    title: "1. Información general",
    body: (
      <p>
        Cascada App es una aplicación móvil de gestión de distribución
        desarrollada por <strong>Consultora Ruby</strong> para uso interno de
        Helados Cascada y sus distribuidores. Esta política describe cómo
        recopilamos, usamos y protegemos la información de los usuarios.
      </p>
    ),
  },
  {
    title: "2. Información que recopilamos",
    body: (
      <ul>
        <li>
          <strong>Datos de cuenta:</strong> nombre, número de teléfono y
          contraseña para autenticación.
        </li>
        <li>
          <strong>Ubicación GPS:</strong> recopilamos la ubicación del
          dispositivo cuando la app está en uso activo, para registrar rutas de
          vendedores y repartidores.
        </li>
        <li>
          <strong>Datos de clientes:</strong> nombre, dirección, teléfono y tipo
          de cliente ingresados por el usuario.
        </li>
        <li>
          <strong>Datos de pedidos:</strong> productos, cantidades y valores
          asociados a cada pedido registrado.
        </li>
        <li>
          <strong>Información de congeladores:</strong> tipo, número de serie y
          condiciones del equipo asignado a cada cliente.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Uso de la información",
    body: (
      <>
        <p>La información recopilada se utiliza exclusivamente para:</p>
        <ul>
          <li>Gestionar rutas y zonas de distribución.</li>
          <li>Registrar y dar seguimiento a pedidos de clientes.</li>
          <li>
            Mostrar la ubicación en tiempo real de vendedores y repartidores en
            el mapa administrativo.
          </li>
          <li>Generar reportes internos de ventas e inventario.</li>
        </ul>
        <p>No vendemos, alquilamos ni compartimos información personal con terceros.</p>
      </>
    ),
  },
  {
    title: "4. Uso de la ubicación",
    body: (
      <>
        <p>La app solicita permiso de acceso a la ubicación del dispositivo.</p>
        <ul>
          <li>
            Registrar la posición de vendedores y repartidores durante su jornada
            laboral.
          </li>
          <li>Ayudar al usuario a identificar clientes cercanos en el mapa.</li>
        </ul>
        <p>
          La ubicación solo se transmite cuando el usuario tiene la sesión
          activa. No se recopila ubicación en segundo plano cuando la app está
          cerrada.
        </p>
      </>
    ),
  },
  {
    title: "5. Almacenamiento y seguridad",
    body: (
      <p>
        Los datos se almacenan en servidores seguros con acceso restringido. Las
        contraseñas se almacenan de forma cifrada. Tomamos medidas técnicas
        razonables para proteger la información contra accesos no autorizados.
      </p>
    ),
  },
  {
    title: "6. Retención de datos",
    body: (
      <p>
        Los datos se conservan mientras el usuario mantenga una cuenta activa.
        Al solicitar la eliminación de la cuenta, los datos personales se
        eliminan en un plazo máximo de 30 días.
      </p>
    ),
  },
  {
    title: "7. Derechos del usuario",
    body: (
      <>
        <p>El usuario puede en cualquier momento:</p>
        <ul>
          <li>Solicitar acceso a sus datos personales.</li>
          <li>Solicitar la corrección de datos incorrectos.</li>
          <li>Solicitar la eliminación de su cuenta y datos.</li>
        </ul>
        <p>Para ejercer estos derechos, contáctenos al correo indicado al final.</p>
      </>
    ),
  },
  {
    title: "8. Aplicaciones de terceros",
    body: (
      <p>
        La app utiliza <strong>Google Maps</strong> para mostrar mapas e
        información geográfica. El uso de Google Maps está sujeto a la{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Política de Privacidad de Google
        </a>
        .
      </p>
    ),
  },
  {
    title: "9. Cambios a esta política",
    body: (
      <p>
        Podemos actualizar esta política ocasionalmente. La fecha de última
        actualización aparece al inicio del documento. El uso continuado de la
        app tras los cambios implica la aceptación de la nueva política.
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
          <strong>Correo:</strong> consultoraruby@gmail.com
        </li>
        <li>
          <strong>País:</strong> Venezuela
        </li>
      </ul>
    ),
  },
];

export default function PrivacidadCascadaAppPage() {
  return (
    <main className="min-h-screen bg-dark px-5 py-10 text-ivory sm:px-6 lg:py-16">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Consultora Ruby"
            width={56}
            height={56}
            priority
            className="rounded-2xl shadow-glow"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Consultora Ruby
            </p>
            <p className="mt-1 text-sm text-ivory-muted">Cascada App</p>
          </div>
        </div>

        <div className="mb-10 border-b border-black/10 pb-8">
          <p className="mb-3 inline-flex rounded-full border border-crimson/20 bg-crimson/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-dark">
            Última actualización: 16 de mayo de 2025
          </p>
          <h1 className="font-display text-4xl uppercase leading-tight text-ivory sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-dim">
            Documento de privacidad para Cascada App, aplicación móvil de gestión
            de distribución desarrollada por Consultora Ruby.
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
