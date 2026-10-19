"use client";

import * as React from "react";
import { ArrowLeft, MessageCircle, RotateCcw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ANCLA_FORMULARIO as ANCLA } from "@/lib/plantilla";
import { site } from "@/lib/site";

const PREGUNTAS: Array<[string, string[]]> = [
  ["¿Cuántos productos distintos manejas?", ["Menos de 100", "De 100 a 1.000", "Más de 1.000"]],
  ["¿Dónde vendes o guardas el stock?", ["En un solo sitio", "Tienda y web", "Varios almacenes"]],
  ["¿Qué te quita más tiempo?", ["Que el stock no cuadre", "Actualizarlo a mano", "Saber qué reponer"]],
  ["¿Cuándo te gustaría resolverlo?", ["Este mes", "En 1 a 3 meses", "Solo quiero informarme"]],
];

function whatsappCon(respuestas: string[]) {
  const resumen = PREGUNTAS.map(([p], i) => `• ${p} ${respuestas[i]}`).join("\n");
  const u = new URL(site.whatsAppUrl);
  u.searchParams.set("text", `Hola DEVRUBY, no tengo tiempo para llevar el inventario en Excel. Mis respuestas:\n\n${resumen}\n\n¿Cómo lo resolverían?`);
  return u.toString();
}

function contar() {
  const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
  fetch("/api/uso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ h: "sin-tiempo-excel", ref }), keepalive: true }).catch(() => {});
}

/**
 * «¿Sin tiempo para Excel?»: barra que abre una ventana (<dialog> nativo: Esc, foco y fondo difuminado) con
 * 4 preguntas de botones. La última respuesta abre WhatsApp con el mensaje armado. No se guarda nada.
 */
export function SinTiempoExcel() {
  const dialogo = React.useRef<HTMLDialogElement>(null);
  const [respuestas, setRespuestas] = React.useState<string[]>([]);
  const paso = respuestas.length;
  const hecho = paso === PREGUNTAS.length;

  const abrir = React.useCallback(() => {
    if (!dialogo.current?.open) dialogo.current?.showModal();
  }, []);

  // El botón de la tarjeta de colores enlaza a #sin-tiempo: abrimos la ventana al llegar.
  React.useEffect(() => {
    const porAncla = () => window.location.hash === `#${ANCLA}` && abrir();
    porAncla();
    window.addEventListener("hashchange", porAncla);
    return () => window.removeEventListener("hashchange", porAncla);
  }, [abrir]);

  function cerrar() {
    dialogo.current?.close();
    if (window.location.hash === `#${ANCLA}`) history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function responder(op: string) {
    const nuevas = [...respuestas, op];
    setRespuestas(nuevas);
    if (nuevas.length === PREGUNTAS.length) {
      contar();
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "contact_whatsapp", { page_category: "plantilla", method: "sin-tiempo-excel" });
      window.fbq?.("track", "Contact");
      window.open(whatsappCon(nuevas), "_blank", "noopener"); // dentro del clic: el navegador no lo bloquea
    }
  }

  return (
    <>
      <Button variant="lavender" size="lg" className="w-full" onClick={abrir} aria-haspopup="dialog">
        <Sparkles className="h-4 w-4" /> ¿Sin tiempo para Excel? Responde 4 preguntas y te ayudamos por WhatsApp
      </Button>

      <dialog
        id={ANCLA}
        ref={dialogo}
        aria-labelledby="sin-tiempo-titulo"
        onClick={(e) => e.target === dialogo.current && cerrar()} // clic en el fondo difuminado
        onClose={() => history.replaceState(null, "", window.location.pathname + window.location.search)}
        className="m-auto w-[min(92vw,30rem)] rounded-3xl border border-lavender/25 bg-white p-0 shadow-2xl backdrop:bg-ivory/40 backdrop:backdrop-blur-md"
      >
        <div className="p-6 sm:p-7" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <p id="sin-tiempo-titulo" className="font-display text-2xl text-ivory">¿Sin tiempo para Excel?</p>
            <button type="button" onClick={cerrar} aria-label="Cerrar" className="rounded-full p-1.5 text-ivory-muted hover:bg-black/5 hover:text-ivory">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!hecho ? (
            <>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-lavender-dark">
                <span>Pregunta {paso + 1} de {PREGUNTAS.length}</span>
                {paso > 0 && (
                  <button type="button" onClick={() => setRespuestas((r) => r.slice(0, -1))} className="inline-flex items-center gap-1 normal-case tracking-normal text-ivory-muted hover:text-ivory">
                    <ArrowLeft className="h-3.5 w-3.5" /> Anterior
                  </button>
                )}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lavender/15">
                <div className="h-full rounded-full bg-lavender transition-all" style={{ width: `${(paso / PREGUNTAS.length) * 100}%` }} />
              </div>
              <p className="mt-5 text-lg font-semibold text-ivory">{PREGUNTAS[paso][0]}</p>
              <div className="mt-4 grid gap-2.5">
                {PREGUNTAS[paso][1].map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => responder(op)}
                    className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-left font-semibold text-ivory transition-colors hover:border-lavender hover:bg-lavender/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                  >
                    {op}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs text-ivory-muted">Al responder la última, se abre WhatsApp con tus respuestas para que nos las envíes.</p>
            </>
          ) : (
            <>
              <p className="mt-4 text-ivory-dim">Te abrimos WhatsApp con tus respuestas. Solo tienes que pulsar <strong>enviar</strong>.</p>
              <a href={whatsappCon(respuestas)} target="_blank" rel="noreferrer" data-track="whatsapp" className="mt-5 block">
                <Button as="span" className="w-full"><MessageCircle className="h-4 w-4" /> ¿No se abrió? Abrir WhatsApp</Button>
              </a>
              <button type="button" onClick={() => setRespuestas([])} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ivory-muted hover:text-ivory">
                <RotateCcw className="h-3.5 w-3.5" /> Cambiar respuestas
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
