"use client";

import * as React from "react";
import { Download, MessageCircle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIN_DESCARGA, INSTAGRAM, PLANTILLA_URL } from "@/lib/plantilla";

const fin = Date.parse(FIN_DESCARGA);
const dos = (n: number) => String(n).padStart(2, "0");

/** Hora del navegador cada segundo; null en el servidor para no desajustar la hidratación. */
function useAhora() {
  const [ahora, setAhora] = React.useState<number | null>(null);
  React.useEffect(() => {
    setAhora(Date.now());
    const id = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return ahora;
}

function partes(ahora: number | null): Array<[string, string]> {
  const s = ahora === null ? -1 : Math.max(0, Math.floor((fin - ahora) / 1000));
  const v = (n: number) => (s < 0 ? "--" : dos(n));
  return [
    [v(Math.floor(s / 86400)), "días"],
    [v(Math.floor((s % 86400) / 3600)), "horas"],
    [v(Math.floor((s % 3600) / 60)), "min"],
    [v(s % 60), "seg"],
  ];
}

function contar() {
  const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
  fetch("/api/uso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ h: "plantilla-inventario", ref }), keepalive: true }).catch(() => {});
}

/** Franja fija bajo la navegación: recuerda cuánto falta mientras se baja por la página. */
export function BannerCuentaAtras() {
  const ahora = useAhora();
  if (ahora !== null && ahora > fin) return null;
  const [d, h, m, s] = partes(ahora).map(([n]) => n);
  return (
    <div className="sticky top-[88px] z-40 bg-crimson text-white shadow-md">{/* justo bajo la navegación (sticky, 89 px) */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 text-sm sm:px-6">
        <p className="flex items-center gap-2">
          <Timer className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">La descarga directa termina en</span>
          <span className="sm:hidden">Termina en</span>
          <strong className="tabular-nums">{d} d {h}:{m}:{s}</strong>
        </p>
        <a href={PLANTILLA_URL} download onClick={contar} data-track="download" className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-crimson hover:bg-white/90">
          Descargar
        </a>
      </div>
    </div>
  );
}

/** Descarga directa con cuenta atrás real (también la cierra /api/plantilla) y contador sin cookies. */
export function DescargaPlantilla() {
  const ahora = useAhora();

  if (ahora !== null && ahora > fin) {
    return (
      <div className="rounded-2xl border border-crimson/20 bg-white/80 p-5 shadow-card">
        <p className="text-sm font-semibold text-ivory">La descarga directa ya terminó.</p>
        <p className="mt-1 text-sm text-ivory-dim">Escríbenos <strong>STOCK</strong> por mensaje directo y te la enviamos.</p>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-track="contact" className="mt-4 block">
          <Button as="span" size="lg" className="w-full"><MessageCircle className="h-4 w-4" /> Pedirla por Instagram</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-crimson/20 bg-white/80 p-5 shadow-card">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-crimson-dark">
        <Timer className="h-4 w-4" /> Descarga directa hasta el domingo 25/10
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2" role="timer" aria-label="Tiempo que queda para la descarga directa">
        {partes(ahora).map(([n, u]) => (
          <div key={u} className="rounded-xl bg-crimson/8 px-2 py-2 text-center">
            <div className="font-display text-2xl tabular-nums text-crimson md:text-3xl">{n}</div>
            <div className="text-[11px] uppercase tracking-wide text-ivory-muted">{u}</div>
          </div>
        ))}
      </div>
      <a href={PLANTILLA_URL} download onClick={contar} data-track="download" className="mt-4 block">
        <Button as="span" size="lg" className="w-full"><Download className="h-4 w-4" /> Descargar ahora (.xlsx)</Button>
      </a>
      <p className="mt-2 text-center text-xs text-ivory-muted">Sin registro. Después, solo por mensaje con STOCK.</p>
    </div>
  );
}
