import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo trata DEVRUBY LLC los datos personales recogidos en su sitio web.",
  alternates: {
    canonical: "https://devruby.org/privacidad",
  },
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    title: "1. Responsable",
    body: (
      <p>
        El responsable del tratamiento es <strong>{site.legalName}</strong>. Puedes
        contactarnos en {mail}. Los datos identificativos de la empresa figuran en
        el <Link href="/aviso-legal">Aviso legal</Link>.
      </p>
    ),
  },
  {
    title: "2. Datos que tratamos",
    body: (
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, email y mensaje
          (obligatorios), y empresa y teléfono si decides darlos. Sin los datos
          obligatorios no podemos responderte; no pedimos más de los necesarios.
        </li>
        <li>
          <strong>Analítica:</strong> identificadores de cookie, páginas visitadas
          y datos técnicos del navegador, solo si aceptas las cookies de analítica.
        </li>
        <li>
          <strong>Datos técnicos:</strong> al enviar el formulario usamos tu
          dirección IP temporalmente en memoria para limitar abusos. No la
          guardamos ni la incluimos en el correo de contacto.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Finalidad y base legal",
    body: (
      <ul>
        <li>
          <strong>Responder a tu solicitud</strong> y preparar propuestas: tu
          consentimiento y la aplicación de medidas precontractuales (art. 6.1.a
          y 6.1.b RGPD).
        </li>
        <li>
          <strong>Medir el uso del sitio:</strong> tu consentimiento para las
          cookies de analítica (art. 6.1.a RGPD y art. 22.2 LSSI).
        </li>
        <li>
          <strong>Prevenir abusos</strong> del formulario: nuestro interés
          legítimo en proteger el servicio (art. 6.1.f RGPD).
        </li>
      </ul>
    ),
  },
  {
    id: "terceros",
    title: "4. Proveedores e integraciones de terceros",
    body: (
      <>
        <p>
          Para prestar el servicio usamos estos proveedores, que tratan datos por
          cuenta nuestra o como responsables independientes cuando usas sus
          servicios:
        </p>
        <ul>
          <li>
            <strong>Hostinger</strong>: alojamiento del sitio y correo electrónico
            por el que recibimos el formulario.
          </li>
          <li>
            <strong>Unsplash</strong>: sirve algunas fotografías de las páginas de
            servicios, por lo que recibe tu dirección IP al cargarlas.{" "}
            <a href="https://unsplash.com/privacy" target="_blank" rel="noreferrer">
              Política de Unsplash
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics 4</strong> (Google): analítica, solo con tu
            consentimiento.{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Política de Google
            </a>
            .
          </li>
          <li>
            <strong>Calendly</strong>: reserva de reuniones. Se abre solo si pulsas
            el enlace de agenda y tratará los datos que introduzcas allí.{" "}
            <a href="https://calendly.com/privacy" target="_blank" rel="noreferrer">
              Política de Calendly
            </a>
            .
          </li>
          <li>
            <strong>WhatsApp</strong> (Meta): mensajería, solo si decides
            escribirnos por ese canal.{" "}
            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              Política de WhatsApp
            </a>
            .
          </li>
        </ul>
        <p>
          {site.legalName} es una empresa estadounidense cuyo equipo trabaja en
          remoto desde Venezuela, y algunos proveedores están fuera del Espacio
          Económico Europeo, así que tus datos pueden tratarse en EE. UU. y
          Venezuela. Las transferencias a proveedores se amparan en el Marco de
          Privacidad de Datos UE-EE. UU. cuando el proveedor está adherido, o en
          las cláusulas contractuales tipo de la Comisión Europea.
        </p>
        <p>No vendemos ni cedemos tus datos personales a terceros con fines comerciales.</p>
      </>
    ),
  },
  {
    title: "5. Conservación",
    body: (
      <p>
        Conservamos los datos de contacto mientras gestionamos tu solicitud y, si
        no se inicia una relación comercial, hasta 12 meses desde el último
        contacto. Si se firma un contrato, durante su vigencia y los plazos de
        prescripción legales. Los datos de analítica se conservan según el plazo
        configurado en Google Analytics, como máximo 14 meses.
      </p>
    ),
  },
  {
    title: "6. Tus derechos",
    body: (
      <>
        <p>
          Puedes pedir acceso, rectificación, supresión, oposición, limitación y
          portabilidad de tus datos (art. 15 a 22 RGPD), y retirar tu
          consentimiento en cualquier momento sin que afecte al tratamiento
          anterior. Para las cookies, usa <strong>&ldquo;Gestionar cookies&rdquo;</strong>{" "}
          en el pie de página.
        </p>
        <p>
          Escríbenos a {mail}. Respondemos en un plazo máximo de un mes. Si
          resides en EE. UU., puedes ejercer por el mismo canal los derechos que
          te reconozca la ley de tu estado.
        </p>
        <p>
          Si crees que no hemos tratado bien tus datos, puedes reclamar ante la
          autoridad de control; en España, la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "7. Decisiones automatizadas y menores",
    body: (
      <p>
        No tomamos decisiones basadas únicamente en tratamientos automatizados ni
        elaboramos perfiles con tus datos. Este sitio se dirige a empresas y no a
        menores de 14 años.
      </p>
    ),
  },
  {
    title: "8. Cookies",
    body: (
      <p>
        Qué cookies usamos y cómo gestionarlas se explica en la{" "}
        <Link href="/cookies">Política de cookies</Link>.
      </p>
    ),
  },
  {
    title: "9. Cambios en esta política",
    body: (
      <p>
        Podemos actualizar esta política. La fecha de la última actualización
        aparece al inicio del documento.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      intro={`Cómo trata ${site.legalName} los datos personales que recoge a través de este sitio web.`}
      updated="25 de septiembre de 2026"
      sections={sections}
    />
  );
}
