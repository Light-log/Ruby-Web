import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal y términos",
  description: "Datos de DEVRUBY LLC, condiciones de uso del sitio y términos de contratación de servicios.",
  alternates: {
    canonical: "https://devruby.org/aviso-legal",
  },
};

const { jurisdiction, address, number } = site.registry;
const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "titular",
    title: "1. Titular del sitio",
    body: (
      <ul>
        <li><strong>Razón social:</strong> {site.legalName} (marca comercial {site.brand})</li>
        {jurisdiction && <li><strong>Constituida en:</strong> {jurisdiction}</li>}
        {address && <li><strong>Domicilio registrado:</strong> {address}</li>}
        {number && <li><strong>Número de registro:</strong> {number}</li>}
        <li><strong>Email:</strong> {mail}</li>
        <li><strong>Teléfono:</strong> {site.phone}</li>
        <li><strong>Actividad:</strong> desarrollo de software, integraciones, automatización y auditorías técnicas, prestados en remoto.</li>
      </ul>
    ),
  },
  {
    title: "2. Uso del sitio",
    body: (
      <p>
        El contenido de este sitio es informativo y no constituye una oferta
        vinculante. Te comprometes a usarlo de forma lícita y a no intentar
        acceder sin autorización a sus sistemas.
      </p>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "3. Propiedad intelectual y marcas",
    body: (
      <>
        <p>
          Los textos, el diseño y el logotipo de {site.brand} pertenecen a{" "}
          {site.legalName}. Algunas fotografías de las páginas de servicios
          proceden de{" "}
          <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
            Unsplash
          </a>{" "}
          y se usan bajo su licencia.
        </p>
        <p>
          Los nombres y logotipos de tecnologías de terceros (por ejemplo,
          lenguajes, plataformas o modelos de IA) son marcas de sus respectivos
          titulares. Se muestran solo para indicar con qué herramientas
          trabajamos y no implican afiliación, patrocinio ni respaldo.
        </p>
        <p>
          Si crees que algún contenido infringe tus derechos, escríbenos a {mail}
          {" "}y lo revisaremos y, si procede, lo retiraremos.
        </p>
      </>
    ),
  },
  {
    id: "contratacion",
    title: "4. Contratación de servicios",
    body: (
      <p>
        Cada proyecto se rige por una propuesta o contrato firmado que fija el
        alcance, los entregables, los plazos, el precio y la propiedad del código.
        Si algo de ese documento contradice estos términos, prevalece el
        documento firmado. Ningún servicio se considera contratado sin él.
      </p>
    ),
  },
  {
    id: "reembolsos",
    title: "5. Pagos, cancelaciones y reembolsos",
    body: (
      <p>
        Las condiciones de pago, cancelación y reembolso se acuerdan en la
        propuesta o contrato de cada proyecto, antes de empezar el trabajo. Si
        tienes una duda sobre un pago, escríbenos a {mail}.
      </p>
    ),
  },
  {
    id: "soporte",
    title: "6. Soporte posterior a la entrega",
    body: (
      <p>
        El soporte técnico 24/7 posterior a la entrega se presta según el plan
        contratado, que fija su duración, canales, tiempos de respuesta y
        sistemas cubiertos. Las consultas comerciales se responden en menos de 24 horas en días
        laborables.
      </p>
    ),
  },
  {
    title: "7. Responsabilidad",
    body: (
      <p>
        Procuramos que la información del sitio sea exacta y esté actualizada,
        pero no garantizamos que esté libre de errores. No respondemos del
        contenido de sitios de terceros enlazados.
      </p>
    ),
  },
  {
    title: "8. Ley aplicable",
    body: (
      <p>
        Estos términos se rigen por las leyes del Estado de Nuevo México (EE. UU.);
        cada contrato de servicios puede fijar su propia ley y jurisdicción. Todo
        ello sin perjuicio de los derechos que la normativa de
        consumo o de protección de datos de tu país te reconozca. El tratamiento
        de datos se explica en la <Link href="/privacidad">Política de
        Privacidad</Link> y las cookies en la <Link href="/cookies">Política de
        cookies</Link>.
      </p>
    ),
  },
];

export default function AvisoLegalPage() {
  return (
    <LegalPage
      title="Aviso legal y términos"
      intro={`Datos de ${site.legalName}, condiciones de uso de este sitio y términos generales de contratación.`}
      updated="25 de septiembre de 2026"
      sections={sections}
    />
  );
}
