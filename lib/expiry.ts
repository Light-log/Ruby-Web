/**
 * Rails Expiry Check: lee un Gemfile.lock y dice cuándo dejan de recibir parches Rails y Ruby.
 * Funciones puras (sin React ni red) para poder probarlas con `node --test`.
 * Fechas: endoflife.date (https://endoflife.date/rails, /ruby). `support` = fin de correcciones de errores
 * (solo Rails); `eol` = fin de parches de seguridad.
 */

export type Cycle = { cycle: string; support?: string; eol: string; latest: string };
export type Product = "rails" | "ruby";
export type Status = "supported" | "security-only" | "expired" | "unknown";

export type Verdict = {
  product: Product;
  version: string;
  cycle: string;
  status: Status;
  /** Fin de parches de seguridad (ISO), si se conoce la serie. */
  eol?: string;
  /** Fin de correcciones de errores (ISO), solo Rails. */
  support?: string;
  /** Último parche publicado de la serie, si la versión va por detrás. */
  latestPatch?: string;
};

/** Copia del 19/10/2026 por si endoflife.date no responde al compilar. */
export const FALLBACK: Record<Product, Cycle[]> = {
  rails: [
    { cycle: "8.1", support: "2026-10-10", eol: "2027-10-10", latest: "8.1.4" },
    { cycle: "8.0", support: "2026-05-07", eol: "2026-11-07", latest: "8.0.5.1" },
    { cycle: "7.2", support: "2025-08-09", eol: "2026-08-09", latest: "7.2.4" },
    { cycle: "7.1", support: "2024-10-01", eol: "2025-10-01", latest: "7.1.6" },
    { cycle: "7.0", support: "2023-10-15", eol: "2025-04-01", latest: "7.0.10" },
    { cycle: "6.1", support: "2021-12-15", eol: "2024-10-01", latest: "6.1.7.10" },
  ],
  ruby: [
    { cycle: "4.0", eol: "2029-03-31", latest: "4.0.7" },
    { cycle: "3.4", eol: "2028-03-31", latest: "3.4.11" },
    { cycle: "3.3", eol: "2027-03-31", latest: "3.3.12" },
    { cycle: "3.2", eol: "2026-03-31", latest: "3.2.11" },
    { cycle: "3.1", eol: "2025-03-26", latest: "3.1.7" },
  ],
};

/** Versiones de Rails y Ruby de un Gemfile.lock; `null` si el archivo no las trae. */
export function parseLockfile(text: string): { rails: string | null; ruby: string | null } {
  const spec = (gem: string) => text.match(new RegExp(`^ {4}${gem} \\(([0-9][0-9.]*)\\)`, "m"))?.[1] ?? null;
  // Las apps API-only a veces no declaran la gema `rails`, pero siempre llevan `railties`.
  const rails = spec("rails") ?? spec("railties");
  const ruby = text.match(/^RUBY VERSION\s*\n\s+ruby ([0-9][0-9.]*)/m)?.[1] ?? null;
  return { rails, ruby };
}

function compare(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

export function verdict(product: Product, version: string, cycles: Cycle[], today: string): Verdict {
  const cycle = version.split(".").slice(0, 2).join(".");
  const found = cycles.find((c) => c.cycle === cycle);
  if (!found) {
    // Más antigua que todas las series conocidas: ya sin parches. Más nueva: no la conocemos aún.
    const oldest = cycles.reduce((min, c) => (compare(c.cycle, min) < 0 ? c.cycle : min), cycles[0]?.cycle ?? cycle);
    return { product, version, cycle, status: compare(cycle, oldest) < 0 ? "expired" : "unknown" };
  }
  const status: Status =
    today >= found.eol ? "expired" : found.support && today >= found.support ? "security-only" : "supported";
  return {
    product,
    version,
    cycle,
    status,
    eol: found.eol,
    support: found.support,
    latestPatch: compare(version, found.latest) < 0 ? found.latest : undefined,
  };
}

/** Días hasta una fecha ISO (negativo si ya pasó). */
export function daysUntil(iso: string, today: string): number {
  return Math.round((Date.parse(iso) - Date.parse(today)) / 86_400_000);
}
