"use client";

import * as React from "react";
import { Check, Loader2, Circle, Inbox, ShieldCheck, Cog, Send, BarChart3 } from "lucide-react";

/**
 * Consola de automatización.
 *
 * Combina tres piezas de 21st.dev, reinterpretadas para el tema claro de marca y
 * gobernadas por un único reloj, de modo que las tres cuentan el mismo paso a la
 * vez en lugar de animarse cada una por su lado:
 *
 * - Circuit Board (@componentry): trazas en ángulo recto entre nodos con un
 *   pulso que las recorre. Aquí es el cableado del flujo.
 * - AI Agent Pipeline (@monolythdev): cabecera "en vivo", ramificación en
 *   salidas paralelas y registro de ejecución al pie.
 * - Agent Plan (@isaiahbjork): lista de tareas con estado pendiente / en curso /
 *   hecho, con subtareas en la etapa activa.
 *
 * Los datos salen del `flow` del catálogo, así que las etapas del dibujo y las
 * de la ficha del servicio no pueden desincronizarse.
 */

export type AutomationStep = {
  name: string;
  /** Qué ocurre en esta etapa; se muestra en el registro. */
  detail: string;
  /** Subtareas, visibles solo mientras la etapa está en curso. */
  substeps: string[];
};

export interface AutomationConsoleProps {
  steps: AutomationStep[];
  /** Salidas paralelas que dispara la penúltima etapa. */
  outputs?: string[];
  className?: string;
}

const STEP_ICONS = [Inbox, ShieldCheck, Cog, Send, BarChart3];

/* Lienzo del diagrama. Las coordenadas son del viewBox, no píxeles de pantalla:
   el SVG escala solo con el contenedor. */
const VB = { w: 620, h: 250 };
const ROW_Y = 62;
const OUT_Y = 196;
const NODE_R = 21;

export function AutomationConsole({ steps, outputs = [], className }: AutomationConsoleProps) {
  const [active, setActive] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  /* Un solo temporizador para las tres vistas. Sin él, cada una tendría su
     propio ciclo y acabarían contando pasos distintos. */
  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, [steps.length, reduced]);

  const xs = steps.map((_, i) => 70 + (i * (VB.w - 140)) / Math.max(steps.length - 1, 1));
  const outX = outputs.map((_, i) => 130 + (i * (VB.w - 260)) / Math.max(outputs.length - 1, 1));
  const branchFrom = Math.max(steps.length - 2, 0); // la etapa que reparte

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-black/8 bg-white/80 shadow-card backdrop-blur-xl ${className ?? ""}`}
    >
      {/* Cabecera en vivo, del AI Agent Pipeline */}
      <div className="flex items-center justify-between gap-4 border-b border-black/8 px-5 py-3 sm:px-7">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory-muted">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inset-0 rounded-full bg-crimson/40 motion-safe:animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-crimson" />
          </span>
          Flujo de facturación · activo
        </p>
        <p className="text-[11px] tabular-nums text-ivory-muted">
          paso {active + 1} / {steps.length}
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-5">
        {/* Cableado: trazas en ángulo recto con pulso, del Circuit Board */}
        <div className="border-b border-black/8 p-4 sm:p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
          <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full" role="img" aria-label={
            `Flujo: ${steps.map((s) => s.name).join(" → ")}`
          }>
            {/* Tramos entre etapas */}
            {steps.slice(0, -1).map((_, i) => {
              const isLive = i === active;
              const d = `M ${xs[i] + NODE_R} ${ROW_Y} L ${xs[i + 1] - NODE_R} ${ROW_Y}`;
              return (
                <g key={`link-${i}`}>
                  <path d={d} fill="none" stroke="#1A1A2E" strokeOpacity={0.12} strokeWidth={2} />
                  {isLive && !reduced ? (
                    <>
                      <path d={d} fill="none" stroke="#C41E3A" strokeWidth={2} />
                      <circle r={4} fill="#C41E3A">
                        <animateMotion dur="1.1s" repeatCount="indefinite" path={d} />
                      </circle>
                    </>
                  ) : null}
                </g>
              );
            })}

            {/* Ramificación a las salidas paralelas: bajada, tramo horizontal y
                bajada final, que es el trazado en ángulo recto del Circuit Board */}
            {outputs.map((label, i) => {
              const midY = 130;
              const d = `M ${xs[branchFrom]} ${ROW_Y + NODE_R} L ${xs[branchFrom]} ${midY} L ${outX[i]} ${midY} L ${outX[i]} ${OUT_Y - 16}`;
              const isLive = active === branchFrom;
              return (
                <g key={`out-${label}`}>
                  <path d={d} fill="none" stroke="#1A1A2E" strokeOpacity={0.1} strokeWidth={2} />
                  {isLive && !reduced ? (
                    <>
                      <path d={d} fill="none" stroke="#C41E3A" strokeOpacity={0.5} strokeWidth={2} />
                      <circle r={3.5} fill="#C41E3A">
                        <animateMotion
                          dur="1.3s"
                          begin={`${i * 0.18}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    </>
                  ) : null}
                  <g transform={`translate(${outX[i]} ${OUT_Y})`}>
                    <rect
                      x={-52}
                      y={-15}
                      width={104}
                      height={30}
                      rx={15}
                      fill="#FFFFFF"
                      stroke={isLive ? "#C41E3A" : "#1A1A2E"}
                      strokeOpacity={isLive ? 0.35 : 0.12}
                    />
                    <text
                      textAnchor="middle"
                      y={4}
                      fontSize={11}
                      fill="#3D3D55"
                      className="font-body"
                    >
                      {label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Nodos de etapa */}
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              const done = i < active;
              const live = i === active;
              return (
                <g key={step.name} transform={`translate(${xs[i]} ${ROW_Y})`}>
                  {live ? (
                    <circle r={NODE_R + 7} fill="#C41E3A" fillOpacity={0.08} />
                  ) : null}
                  <circle
                    r={NODE_R}
                    fill="#FFFFFF"
                    stroke={live || done ? "#C41E3A" : "#1A1A2E"}
                    strokeOpacity={live ? 0.6 : done ? 0.3 : 0.12}
                    strokeWidth={live ? 2 : 1.5}
                  />
                  <foreignObject x={-10} y={-10} width={20} height={20}>
                    <Icon
                      className={`h-5 w-5 ${live ? "text-crimson" : done ? "text-crimson/60" : "text-ivory-muted"}`}
                    />
                  </foreignObject>
                  <text
                    textAnchor="middle"
                    y={NODE_R + 20}
                    fontSize={12}
                    fill={live ? "#1A1A2E" : "#54546B"}
                    fontWeight={live ? 600 : 400}
                  >
                    {step.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Plan con estados, del Agent Plan */}
        <ul className="grid content-start gap-1 p-4 sm:p-6 lg:col-span-2">
          {steps.map((step, i) => {
            const done = i < active;
            const live = i === active;
            return (
              <li key={step.name} className="rounded-xl px-2 py-2">
                <div className="flex items-center gap-3">
                  {done ? (
                    <Check className="h-4 w-4 shrink-0 text-crimson" />
                  ) : live ? (
                    <Loader2 className="h-4 w-4 shrink-0 text-crimson motion-safe:animate-spin" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-ivory-muted/50" />
                  )}
                  <span
                    className={`flex-1 text-sm ${live ? "font-semibold text-ivory" : done ? "text-ivory-dim" : "text-ivory-muted"}`}
                  >
                    {step.name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      live
                        ? "bg-crimson/8 text-crimson-dark"
                        : done
                          ? "text-ivory-muted"
                          : "text-ivory-muted/70"
                    }`}
                  >
                    {live ? "en curso" : done ? "hecho" : "pendiente"}
                  </span>
                </div>

                {/* Subtareas: solo en la etapa activa, como en el Agent Plan */}
                {live ? (
                  <ul className="ml-7 mt-2 grid gap-1 border-l border-black/8 pl-4">
                    {step.substeps.map((sub) => (
                      <li key={sub} className="text-xs text-ivory-dim">
                        {sub}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Registro de ejecución al pie, del AI Agent Pipeline */}
      <div className="border-t border-black/8 bg-dark-200/50 px-5 py-3 font-mono text-xs text-ivory-dim sm:px-7">
        <span className="text-crimson">›</span> {steps[active].detail}
      </div>
    </div>
  );
}

export default AutomationConsole;
