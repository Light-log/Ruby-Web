import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { CookieSettingsLink } from "@/components/ui/cookie-settings-link";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa el sitio de DEVRUBY LLC, para qué y cómo gestionarlas.",
  alternates: {
    canonical: "https://devruby.org/cookies",
  },
};

const rows = [
  ["ruby-cookie-consent", "Propia (almacenamiento local)", "Técnica: recuerda tu elección de cookies", "Hasta que la borres"],
  ["ruby-hero-intro", "Propia (almacenamiento local)", "Técnica: no repetir la animación de entrada", "Hasta que la borres"],
  ["_ga", "Google Analytics", "Analítica: distinguir visitantes", "2 años"],
  ["_ga_SEZY0Q1JSN", "Google Analytics", "Analítica: mantener el estado de la sesión", "2 años"],
];

const sections: LegalSection[] = [
  {
    title: "1. Qué son",
    body: (
      <p>
        Las cookies y tecnologías similares, como el almacenamiento local del
        navegador, guardan información en tu dispositivo. Las técnicas son
        necesarias para que el sitio funcione; las de analítica solo se activan
        si las aceptas.
      </p>
    ),
  },
  {
    title: "2. Cookies que usamos",
    body: (
      <div className="overflow-x-auto">
        <table className="min-w-[36rem] text-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Titular</th>
              <th scope="col">Finalidad</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, owner, purpose, duration]) => (
              <tr key={name}>
                <td><code>{name}</code></td>
                <td>{owner}</td>
                <td>{purpose}</td>
                <td>{duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "3. Cómo gestionarlas",
    body: (
      <>
        <p>
          Puedes aceptar, rechazar o cambiar tu elección cuando quieras desde{" "}
          <CookieSettingsLink className="font-semibold text-crimson underline underline-offset-4" />
          , también disponible en el pie de página. Si retiras el consentimiento,
          Google Analytics deja de cargarse y borramos sus cookies.
        </p>
        <p>
          También puedes borrar las cookies desde la configuración de tu
          navegador. El tratamiento de datos asociado se explica en la{" "}
          <Link href="/privacidad">Política de Privacidad</Link>.
        </p>
      </>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      intro="Qué cookies usa este sitio, para qué sirven y cómo cambiar tu elección."
      updated="25 de septiembre de 2026"
      sections={sections}
    />
  );
}
