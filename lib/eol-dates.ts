/**
 * Fechas de fin de soporte de Rails y Ruby desde endoflife.date, con la copia
 * de lib/expiry.ts como respaldo. Compartido por el Rails Expiry Check y las
 * páginas «Rails X.Y end of life».
 */
import { type Cycle, type Product, FALLBACK } from "@/lib/expiry";

export const REVALIDATE = 86400;

export async function cycles(product: Product): Promise<Cycle[]> {
  try {
    const res = await fetch(`https://endoflife.date/api/${product}.json`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Array<Record<string, unknown>>;
    const list = data
      .map((c) => ({
        cycle: String(c.cycle),
        support: typeof c.support === "string" ? c.support : undefined,
        eol: typeof c.eol === "string" ? c.eol : "9999-12-31", // `false` = sin fecha de fin todavía
        latest: String(c.latest),
      }))
      .filter((c) => /^\d+\.\d+$/.test(c.cycle))
      .slice(0, 8);
    return list.length ? list : FALLBACK[product];
  } catch {
    return FALLBACK[product];
  }
}

export const fmt = (iso: string) =>
  iso.startsWith("9999")
    ? "not announced"
    : new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
