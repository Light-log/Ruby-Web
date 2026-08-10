import type { Metadata } from "next";

export const SITE_URL = "https://devruby.org";

/**
 * Imagen social por defecto. Debe ser PNG/JPG: Facebook, LinkedIn, WhatsApp y X
 * no renderizan SVG en `og:image`, así que un `/logo.svg` deja la tarjeta vacía.
 */
export const ogImage = {
  url: "/og-devruby.png",
  width: 1200,
  height: 630,
  alt: "DEVRUBY — ingeniería de software para empresas",
} as const;

export const ogImages = [ogImage];

/**
 * Páginas equivalentes entre la campaña de España (es-ES) y la de EE. UU. (en-US).
 * Cada par forma un clúster hreflang cerrado: ambas se referencian entre sí y a
 * sí mismas, que es lo que Google exige para aceptar la anotación.
 */
const campaignPairs = [
  ["", ""],
  ["desarrollo-software-a-medida", "custom-internal-tools"],
  ["automatizacion-de-procesos", "workflow-automation"],
  ["integracion-api-sistemas", "api-integration-services"],
  ["auditoria-seguridad-aplicaciones", "application-security-audit"],
] as const;

const esByUs = new Map(campaignPairs.map(([es, us]) => [us, es]));
const usByEs = new Map(campaignPairs.map(([es, us]) => [es, us]));

function cluster(esSlug: string, usSlug: string) {
  const es = `${SITE_URL}/espana${esSlug ? `/${esSlug}` : ""}`;
  const us = `${SITE_URL}/us${usSlug ? `/${usSlug}` : ""}`;
  return { "es-ES": es, "en-US": us, "x-default": us };
}

/** hreflang para una página de la campaña España a partir de su slug ("" = hub). */
export function spainAlternates(slug = ""): NonNullable<Metadata["alternates"]> {
  const usSlug = usByEs.get(slug as never);
  const canonical = `${SITE_URL}/espana${slug ? `/${slug}` : ""}`;
  if (usSlug === undefined) return { canonical };
  return { canonical, languages: cluster(slug, usSlug) };
}

/**
 * Servicio general equivalente a cada landing de España. Las dos páginas son en
 * español y compiten por la misma intención (medí 55 % y 48 % de solape de
 * trigramas frente a un 38 % de base entre hermanas de plantilla), así que la
 * landing geográfica enlaza al servicio general para que Google distinga cuál
 * responde a la consulta con modificador «España» y cuál a la genérica.
 */
const generalServiceBySpainSlug: Record<string, string> = {
  "desarrollo-software-a-medida": "desarrollo-de-software",
  "automatizacion-de-procesos": "automatizacion-de-procesos",
  "auditoria-seguridad-aplicaciones": "seguridad-tecnica",
};

export function generalServiceFor(spainSlug: string): string | null {
  return generalServiceBySpainSlug[spainSlug] ?? null;
}

/** hreflang para una página de la campaña US a partir de su slug ("" = hub). */
export function usAlternates(slug = ""): NonNullable<Metadata["alternates"]> {
  const esSlug = esByUs.get(slug as never);
  const canonical = `${SITE_URL}/us${slug ? `/${slug}` : ""}`;
  if (esSlug === undefined) return { canonical };
  return { canonical, languages: cluster(esSlug, slug) };
}
