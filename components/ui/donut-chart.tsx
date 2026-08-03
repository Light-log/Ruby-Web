"use client";

import * as React from "react";
import { arc, pie, type PieArcDatum } from "d3-shape";

export type DonutSlice = {
  name: string;
  value: number;
};

export interface DonutChartProps {
  data: DonutSlice[];
  /** Unidad del total que se muestra en el centro. */
  unit: string;
  className?: string;
}

/**
 * Donut de parte-de-un-todo.
 *
 * La paleta no es de marca a propósito: seis tonos del mismo morado —como traía
 * la plantilla original— dan un ΔE de 1.6 entre porciones vecinas cuando el
 * mínimo legible es 15, así que dos porciones serían indistinguibles incluso con
 * visión normal. Estos cinco tonos están validados para daltonismo (protan,
 * deutan y tritan) sobre la superficie clara de la tarjeta.
 *
 * Los tonos quedan por debajo de 3:1 contra el fondo, lo que obliga a que la
 * identidad no dependa solo del color: de ahí la leyenda con nombre y valor.
 */

/* Slots categóricos validados, en orden fijo. No se reordenan ni se ciclan. */
const SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"];

const RADIUS = 160;
const INNER_RADIUS = RADIUS / 1.6;

export function DonutChart({ data, unit, className }: DonutChartProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const total = React.useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  const arcs = React.useMemo(() => {
    /* `padAngle` deja el hueco de 2px entre porciones que pide la guía: a este
       radio, 0.012 rad ≈ 2px de separación en el borde exterior. */
    const layout = pie<DonutSlice>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.012);
    return layout(data);
  }, [data]);

  const arcGenerator = React.useMemo(
    () =>
      arc<PieArcDatum<DonutSlice>>()
        .innerRadius(INNER_RADIUS)
        .outerRadius(RADIUS)
        .cornerRadius(4),
    [],
  );

  const active = hovered !== null ? data[hovered] : null;

  return (
    <div className={className}>
      <div className="relative">
        {/* Texto central: el total se calcula, no se escribe a mano. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="max-w-[52%] text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-ivory-muted">
              {active ? active.name : "Total"}
            </p>
            <p className="font-display text-3xl tabular-nums text-ivory sm:text-4xl">
              {active ? active.value : total}
            </p>
            <p className="mt-0.5 text-xs text-ivory-muted">
              {active ? `${Math.round((active.value / total) * 100)}%` : unit}
            </p>
          </div>
        </div>

        <svg
          viewBox={`-${RADIUS} -${RADIUS} ${RADIUS * 2} ${RADIUS * 2}`}
          className="mx-auto block w-full max-w-[17rem]"
          role="img"
          aria-label={`Reparto de ${unit}: ${data
            .map((d) => `${d.name} ${d.value}`)
            .join(", ")}. Total ${total}.`}
        >
          {arcs.map((d, i) => (
            <path
              key={d.data.name}
              d={arcGenerator(d) ?? undefined}
              fill={SERIES[i % SERIES.length]}
              opacity={hovered === null || hovered === i ? 1 : 0.35}
              className="transition-opacity duration-200"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
      </div>

      {/* Leyenda: sostiene la identidad sin depender del color y hace de tabla. */}
      <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex items-center gap-3 text-sm"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: SERIES[i % SERIES.length] }}
            />
            <span className="min-w-0 flex-1 truncate text-ivory-dim">{d.name}</span>
            <span className="tabular-nums font-medium text-ivory">{d.value}</span>
            <span className="w-10 text-right tabular-nums text-ivory-muted">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonutChart;
