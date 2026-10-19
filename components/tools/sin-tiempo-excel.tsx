"use client";

import * as React from "react";
import { ArrowLeft, CalendarDays, Mail, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ANCLA_FORMULARIO as ANCLA } from "@/lib/plantilla";
import { bookingUrl, site } from "@/lib/site";

const PREGUNTAS: Array<[string, string[]]> = [
  ["¿Cuántos productos distintos manejas?", ["Menos de 100", "De 100 a 1.000", "Más de 1.000"]],
  ["¿Dónde vendes o guardas el stock?", ["En un solo sitio", "Tienda y web", "Varios almacenes"]],
  ["¿Qué te quita más tiempo?", ["Que el stock no cuadre", "Actualizarlo a mano", "Saber qué reponer"]],
  ["¿Cuándo te gustaría resolverlo?", ["Este mes", "En 1 a 3 meses", "Solo quiero informarme"]],
];

/** «¿Sin tiempo para Excel?»: 4 preguntas con botones y un toque para enviarlas. Sin campos ni datos guardados. */
export function SinTiempoExcel() {
  const [abierto, setAbierto] = React.useState(false);
  const [respuestas, setRespuestas] = React.useState<string[]>([]);
  const paso = respuestas.length;
  const hecho = paso === PREGUNTAS.length;

  // El botón de la tarjeta de colores enlaza a #sin-tiempo: abrimos el formulario al llegar.
  React.useEffect(() => {
    const abrirSiAncla = () => {
      if (window.location.hash === `#${ANCLA}`) setAbierto(true);
    };
    abrirSiAncla();
    window.addEventListener("hashchange", abrirSiAncla);
    return () => window.removeEventListener("hashchange", abrirSiAncla);
  }, []);

  React.useEffect(() => {
    if (!hecho) return;
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
    fetch("/api/uso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ h: "sin-tiempo-excel", ref }), keepalive: true }).catch(() => {});
  }, [hecho]);

  const resumen = PREGUNTAS.map(([p], i) => `${p} ${respuestas[i] ?? ""}`).join("\n");
  const mensaje = `Hola DEVRUBY, no tengo tiempo para llevar el inventario en Excel.\n\n${resumen}`;
  const whatsapp = (() => {
    const u = new URL(site.whatsAppUrl);
    u.searchParams.set("text", mensaje);
    return u.toString();
  })();
  const correo = `mailto:${site.email}?subject=${encodeURIComponent("Sin tiempo para Excel: inventario")}&body=${encodeURIComponent(mensaje)}`;
  const agenda = (() => {
    const raw = bookingUrl();
    if (!raw) return "/agenda";
    const u = new URL(raw);
    u.searchParams.set("utm_source", "devruby.org");
    u.searchParams.set("utm_medium", "formulario");
    u.searchParams.set("utm_campaign", "sin-tiempo-excel");
    return u.toString();
  })();

  return (
    <div id={ANCLA} className="scroll-mt-40">
      {!abierto ? (
        <Button variant="lavender" size="lg" className="w-full" onClick={() => setAbierto(true)}>
          <Sparkles className="h-4 w-4" /> ¿Sin tiempo para Excel? Responde 4 preguntas
        </Button>
      ) : (
        <div className="rounded-2xl border border-lavender/25 bg-white/90 p-5 shadow-card" aria-live="polite">
          {!hecho ? (
            <>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-lavender-dark">
                <span>¿Sin tiempo para Excel?</span>
                <span>{paso + 1} de {PREGUNTAS.length}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lavender/15">
                <div className="h-full rounded-full bg-lavender transition-all" style={{ width: `${(paso / PREGUNTAS.length) * 100}%` }} />
              </div>
              <p className="mt-4 font-semibold text-ivory">{PREGUNTAS[paso][0]}</p>
              <div className="mt-3 grid gap-2">
                {PREGUNTAS[paso][1].map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setRespuestas((r) => [...r, op])}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm font-semibold text-ivory transition-colors hover:border-lavender hover:bg-lavender/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                  >
                    {op}
                  </button>
                ))}
              </div>
              {paso > 0 && (
                <button type="button" onClick={() => setRespuestas((r) => r.slice(0, -1))} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ivory-muted hover:text-ivory">
                  <ArrowLeft className="h-3.5 w-3.5" /> Anterior
                </button>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold text-ivory">Listo. Envíanos tus respuestas y te decimos cómo lo resolveríamos.</p>
              <ul className="mt-3 grid gap-1 text-sm text-ivory-dim">
                {respuestas.map((r, i) => <li key={PREGUNTAS[i][0]}><span className="text-ivory-muted">{PREGUNTAS[i][0]}</span> <strong className="text-ivory">{r}</strong></li>)}
              </ul>
              <div className="mt-4 grid gap-2">
                <a href={whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp"><Button as="span" className="w-full"><MessageCircle className="h-4 w-4" /> Enviar por WhatsApp</Button></a>
                <a href={agenda} target="_blank" rel="noreferrer" data-track="booking"><Button as="span" variant="lavender" className="w-full"><CalendarDays className="h-4 w-4" /> Agendar una llamada de 30 min</Button></a>
                <a href={correo} data-track="contact"><Button as="span" variant="outline" className="w-full bg-white"><Mail className="h-4 w-4" /> Enviar por correo</Button></a>
              </div>
              <button type="button" onClick={() => setRespuestas([])} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ivory-muted hover:text-ivory">
                <RotateCcw className="h-3.5 w-3.5" /> Empezar de nuevo
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
