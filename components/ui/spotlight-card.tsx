"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta con borde iluminado que sigue al cursor.
 *
 * El gradiente usa `background-attachment: fixed` y coordenadas de viewport, de
 * modo que el foco de luz es continuo entre tarjetas: se comporta como una única
 * linterna que pasa por encima de la rejilla, no como un brillo por tarjeta.
 *
 * Por eso `--x` / `--y` viven en `<html>` y se heredan: son idénticas para todas
 * las tarjetas. Un solo listener y cuatro escrituras por movimiento, en lugar de
 * un listener por tarjeta.
 */

type Accent = "crimson" | "lavender";

/** Tono base de cada acento, en HSL, tomado de la paleta de Tailwind. */
const ACCENT_HUE: Record<Accent, number> = {
  crimson: 350, // #C41E3A
  lavender: 262, // #7C5CBF
};

let pointerSubscribers = 0;
let detachPointer: (() => void) | null = null;

function attachPointerTracking() {
  if (typeof window === "undefined") return;

  pointerSubscribers += 1;
  if (detachPointer) return;

  const root = document.documentElement;
  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const write = () => {
    frame = 0;
    root.style.setProperty("--spot-x", lastX.toFixed(1));
    root.style.setProperty("--spot-y", lastY.toFixed(1));
    root.style.setProperty("--spot-xp", (lastX / window.innerWidth).toFixed(3));
    root.style.setProperty("--spot-yp", (lastY / window.innerHeight).toFixed(3));
  };

  const onPointerMove = (event: PointerEvent) => {
    // El efecto solo tiene sentido con un puntero que se pueda seguir. Se activa
    // con el dispositivo realmente en uso y no con `@media (hover: hover)`, que
    // da falso positivo en portátiles con pantalla táctil.
    if (event.pointerType === "touch") return;
    if (!root.hasAttribute("data-spotlight-pointer")) {
      root.setAttribute("data-spotlight-pointer", "");
    }

    lastX = event.clientX;
    lastY = event.clientY;
    // Una escritura por frame: pointermove dispara mucho más rápido que el repintado.
    if (!frame) frame = requestAnimationFrame(write);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  detachPointer = () => {
    window.removeEventListener("pointermove", onPointerMove);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}

function releasePointerTracking() {
  pointerSubscribers = Math.max(0, pointerSubscribers - 1);
  if (pointerSubscribers === 0 && detachPointer) {
    detachPointer();
    detachPointer = null;
  }
}

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: Accent;
  /** Diámetro del foco de luz, en píxeles. */
  size?: number;
  children: React.ReactNode;
}

export function SpotlightCard({
  accent = "crimson",
  size = 420,
  className,
  children,
  style,
  ...rest
}: SpotlightCardProps) {
  React.useEffect(() => {
    attachPointerTracking();
    return releasePointerTracking;
  }, []);

  return (
    <div
      data-spotlight
      className={cn("relative h-full rounded-3xl", className)}
      style={
        {
          "--spot-hue": ACCENT_HUE[accent],
          "--spot-size": `${size}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
