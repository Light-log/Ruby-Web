"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PLANTILLA = "/recursos/plantilla-inventario-devruby.xlsx";

/** Descarga directa (sin pedir correo) que se cuenta en el servidor, sin cookies. */
export function DescargaPlantilla() {
  function contar() {
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
    fetch("/api/uso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ h: "plantilla-inventario", ref }), keepalive: true }).catch(() => {});
  }
  return (
    <a href={PLANTILLA} download onClick={contar} data-track="download">
      <Button as="span" size="lg" className="w-full sm:w-auto"><Download className="h-4 w-4" /> Descargar la plantilla (.xlsx)</Button>
    </a>
  );
}
