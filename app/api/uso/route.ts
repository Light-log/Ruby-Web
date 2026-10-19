// Contador de usos de las herramientas, sin cookies ni IP guardada: una línea por uso
// (fecha, herramienta, canal de `?ref=`). GA4 cuenta de menos por el banner y los bloqueadores.
import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOOLS = new Set(["rails-expiry-check", "plantilla-inventario"]);
// Fuera de la carpeta de la app para que sobreviva a cada despliegue.
const FILE = path.join(process.env.USO_DIR ?? path.join(os.homedir(), "devruby-uso"), "usos.tsv");

// ponytail: límite en memoria por IP (se pierde al reiniciar); basta para que nadie infle los números a mano.
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 20;
const buckets = new Map<string, { count: number; resetAt: number }>();

function limited(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "?";
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  return ++b.count > MAX;
}

export async function POST(req: NextRequest) {
  if (limited(req)) return new NextResponse(null, { status: 429 });
  const body = (await req.json().catch(() => null)) as { h?: unknown; ref?: unknown } | null;
  const tool = typeof body?.h === "string" ? body.h : "";
  if (!TOOLS.has(tool)) return new NextResponse(null, { status: 400 });
  const ref = typeof body?.ref === "string" ? body.ref.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30) : "";
  try {
    await mkdir(path.dirname(FILE), { recursive: true });
    await appendFile(FILE, `${new Date().toISOString()}\t${tool}\t${ref || "directo"}\n`);
  } catch (err) {
    console.error("uso: no se pudo guardar", err); // el usuario no debe notar nada
  }
  return new NextResponse(null, { status: 204 });
}

/** Totales por herramienta y canal (solo recuentos, sin datos personales). */
export async function GET() {
  const text = await readFile(FILE, "utf8").catch(() => "");
  const totals: Record<string, Record<string, number>> = {};
  for (const line of text.split("\n")) {
    const [, tool, ref] = line.split("\t");
    if (!tool) continue;
    totals[tool] ??= {};
    totals[tool][ref] = (totals[tool][ref] ?? 0) + 1;
  }
  return NextResponse.json(totals, { headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" } }); // la CDN de Hostinger lo guardaba 5 min
}
