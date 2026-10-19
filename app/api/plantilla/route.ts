// Descarga de la plantilla con fecha de cierre real: la cuenta atrás de la página no es decorativa.
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { FIN_DESCARGA } from "@/lib/plantilla";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (Date.now() > Date.parse(FIN_DESCARGA)) {
    return new NextResponse("La descarga directa terminó. Escríbenos STOCK por mensaje directo en Instagram (@devruby.llc) y te la enviamos.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  const file = await readFile(path.join(process.cwd(), "privado", "plantilla-inventario-devruby.xlsx"));
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="plantilla-inventario-devruby.xlsx"',
      "Cache-Control": "no-store",
    },
  });
}
