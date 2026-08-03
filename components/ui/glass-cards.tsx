"use client";

import * as React from "react";

/**
 * Tarjetas de cristal que se abren en abanico al pasar el cursor.
 *
 * Tres cambios respecto al original:
 *
 * 1. Tailwind en lugar de `styled-components`. Esa dependencia no está en el
 *    proyecto y añadir CSS-in-JS —con su configuración de SSR en Next— por un
 *    solo componente no compensa: el resultado visual es el mismo.
 * 2. `style={{-r: -15}}` no compila: `-r` no es un nombre de propiedad válido
 *    en JavaScript. El CSS lee `var(--r)`, así que la intención era `"--r"`.
 * 3. La etiqueta era un `::before` con `content: attr(data-text)`. Ahora es un
 *    elemento real, que los lectores de pantalla sí anuncian.
 *
 * Los colores se adaptan al tema claro: el original usaba blancos translúcidos
 * sobre fondo oscuro y aquí habría quedado invisible.
 */

export type GlassCard = {
  label: string;
  /** Inclinación en grados cuando el abanico está cerrado. */
  rotation: number;
  icon: React.ReactNode;
};

export interface GlassCardsProps {
  cards: GlassCard[];
  className?: string;
}

export function GlassCards({ cards, className }: GlassCardsProps) {
  return (
    <div className={`group flex items-center justify-center ${className ?? ""}`}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{ "--r": card.rotation } as React.CSSProperties}
          className="
            relative mx-[-38px] flex h-[200px] w-[150px] flex-col items-center justify-center
            overflow-hidden rounded-2xl border border-black/8 bg-white/60 shadow-card
            backdrop-blur-md transition-all duration-500
            [transform:rotate(calc(var(--r)*1deg))]
            group-hover:mx-2 group-hover:[transform:rotate(0deg)]
            sm:mx-[-45px] sm:h-[220px] sm:w-[180px] sm:group-hover:mx-2.5
          "
        >
          <span className="text-crimson [&>svg]:h-10 [&>svg]:w-10 [&>svg]:fill-current">
            {card.icon}
          </span>

          <span className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center bg-black/[0.04] text-sm font-medium text-ivory-dim">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default GlassCards;
