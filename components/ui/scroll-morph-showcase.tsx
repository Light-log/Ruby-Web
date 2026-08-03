"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/* ── imágenes ────────────────────────────────────────────────── */

/**
 * Set de stock curado: producto, interfaz y equipo trabajando. El objetivo es
 * el impacto visual del arco, no describir el servicio — eso lo hacen las
 * secciones de texto que vienen a continuación.
 */
export const SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
  "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=400&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=80",
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
  "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&q=80",
];

/* ── tipos ───────────────────────────────────────────────────── */

export interface ScrollMorphShowcaseProps {
  /** Imágenes del arco. Por defecto, el set curado de arriba. */
  images?: string[];
  accent?: "crimson" | "lavender";
  /** Título que aparece cuando el arco termina de formarse. */
  title: string;
  /** Frase de apoyo bajo el título. */
  subtitle?: string;
  /** Texto del estado inicial, antes de hacer scroll. */
  intro?: string;
  /** Frase grande del estado inicial. */
  overline?: string;
  className?: string;
}

/* ── constantes ──────────────────────────────────────────────── */

const CARD_W = 96;
const CARD_H = 132;

/** Escala de las tarjetas mientras forman el círculo, antes del arco. */
const CIRCLE_SCALE = 0.8;

/** Fases de entrada: disperso → línea → círculo. El arco lo controla el scroll. */
const PHASE_SCATTER = 0;
const PHASE_LINE = 1;
const PHASE_CIRCLE = 2;

const POSITION_SPRING = { stiffness: 42, damping: 16, mass: 0.9 } as const;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

/**
 * Ruido determinista por índice: evita `Math.random()` para que el HTML del
 * servidor y el del cliente coincidan (sin hydration mismatch).
 */
function noise(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * El render de servidor serializa el transform con precisión limitada, así que
 * sin redondear el valor de partida React detecta un hydration mismatch al
 * comparar `translateX(682.237px)` con `translateX(682.2369159781374px)`.
 */
const round = (value: number) => Math.round(value * 100) / 100;

/* ── tarjeta ─────────────────────────────────────────────────── */

type CardProps = {
  src: string;
  index: number;
  total: number;
  size: { width: number; height: number };
  accent: "crimson" | "lavender";
  phase: MotionValue<number>;
  morph: MotionValue<number>;
  sweep: MotionValue<number>;
  parallax: MotionValue<number>;
};

function MorphCard({ src, index, total, size, accent, phase, morph, sweep, parallax }: CardProps) {
  const isMobile = size.width > 0 && size.width < 768;

  /**
   * Una única función de posición para las cinco propiedades animadas: cada
   * `useTransform` la reevalúa con los mismos valores, así no hay estados
   * intermedios inconsistentes entre x, y, rotación, escala y opacidad.
   */
  const solve = React.useCallback(
    (ph: number, m: number, s: number, px: number) => {
      if (ph === PHASE_SCATTER) {
        return {
          x: round((noise(index, 1) - 0.5) * 1400),
          y: round((noise(index, 2) - 0.5) * 900),
          rotation: round((noise(index, 3) - 0.5) * 180),
          scale: 0.6,
          opacity: 0,
        };
      }

      if (ph === PHASE_LINE) {
        const spacing = Math.min(CARD_W * 0.78, (size.width || 900) / Math.max(total, 1));
        return {
          x: round(index * spacing - (spacing * (total - 1)) / 2),
          y: 0,
          rotation: 0,
          scale: 0.9,
          opacity: 1,
        };
      }

      const minDimension = Math.min(size.width, size.height) || 600;

      // A. Círculo de partida. El radio deja las tarjetas borde con borde sin
      // que las de arriba y abajo se recorten contra el alto del escenario.
      const circleRadius = Math.min(minDimension * 0.4, 330);
      const circleAngle = (index / total) * 360;
      const circleRad = (circleAngle * Math.PI) / 180;
      const circle = {
        x: Math.cos(circleRad) * circleRadius,
        y: Math.sin(circleRad) * circleRadius,
        rotation: circleAngle + 90,
      };

      // B. Arco inferior: convexo hacia arriba, con el centro como punto alto.
      const arcRadius =
        Math.min(size.width || 900, (size.height || 600) * 1.5) * (isMobile ? 1.45 : 1.12);
      const arcApexY = (size.height || 600) * (isMobile ? 0.32 : 0.24);
      const arcCenterY = arcApexY + arcRadius;

      const spreadAngle = isMobile ? 100 : 132;
      const startAngle = -90 - spreadAngle / 2;
      const step = spreadAngle / Math.max(total - 1, 1);

      // El barrido es corto a propósito: el arco es más ancho que la pantalla,
      // así que unos pocos grados ya desplazan el conjunto de forma visible sin
      // vaciar un lado del encuadre al llegar al final del recorrido.
      const boundedRotation = -s * spreadAngle * 0.12;
      const angle = startAngle + index * step + boundedRotation;
      const arcRad = (angle * Math.PI) / 180;

      const arc = {
        x: Math.cos(arcRad) * arcRadius + px,
        y: Math.sin(arcRad) * arcRadius + arcCenterY,
        rotation: angle + 90,
        scale: isMobile ? 1.2 : 1.65,
      };

      // C. Interpolación círculo → arco.
      return {
        x: round(lerp(circle.x, arc.x, m)),
        y: round(lerp(circle.y, arc.y, m)),
        rotation: round(lerp(circle.rotation, arc.rotation, m)),
        scale: round(lerp(CIRCLE_SCALE, arc.scale, m)),
        opacity: 1,
      };
    },
    [index, total, size.width, size.height, isMobile],
  );

  const inputs: MotionValue<number>[] = React.useMemo(
    () => [phase, morph, sweep, parallax],
    [phase, morph, sweep, parallax],
  );

  const x = useSpring(
    useTransform(inputs, ([ph, m, s, px]: number[]) => solve(ph, m, s, px).x),
    POSITION_SPRING,
  );
  const y = useSpring(
    useTransform(inputs, ([ph, m, s, px]: number[]) => solve(ph, m, s, px).y),
    POSITION_SPRING,
  );
  const rotate = useSpring(
    useTransform(inputs, ([ph, m, s, px]: number[]) => solve(ph, m, s, px).rotation),
    POSITION_SPRING,
  );
  const scale = useSpring(
    useTransform(inputs, ([ph, m, s, px]: number[]) => solve(ph, m, s, px).scale),
    POSITION_SPRING,
  );
  const opacity = useSpring(
    useTransform(inputs, ([ph, m, s, px]: number[]) => solve(ph, m, s, px).opacity),
    { stiffness: 60, damping: 20 },
  );

  const backFace =
    accent === "crimson"
      ? "border-crimson/30 bg-gradient-to-br from-crimson to-crimson-dark"
      : "border-lavender/30 bg-gradient-to-br from-lavender to-lavender-dark";

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer"
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Cara frontal */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-dark-300 shadow-card-hover ring-1 ring-black/5"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ivory/15 transition-colors duration-300 group-hover:bg-transparent" />
        </div>

        {/* Cara trasera */}
        <div
          className={`absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-xl border shadow-card-hover ${backFace}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-display text-[9px] uppercase tracking-[0.28em] text-white/85">
            DEVRUBY
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── componente principal ────────────────────────────────────── */

export function ScrollMorphShowcase({
  images = SHOWCASE_IMAGES,
  accent = "lavender",
  title,
  subtitle,
  intro = "Desliza para ver el conjunto",
  overline = "Diseño, producto y sistema en una sola pieza.",
  className,
}: ScrollMorphShowcaseProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const inView = useInView(stageRef, { amount: 0.4 });

  /* Tamaño real del escenario: de él dependen radios y apertura del arco. */
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(stage);
    setSize({ width: stage.offsetWidth, height: stage.offsetHeight });

    return () => observer.disconnect();
  }, []);

  /* Progreso del propio scroll de la página: no se secuestra la rueda. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 });

  const morph = useTransform(progress, [0.12, 0.58], [0, 1], { clamp: true });
  const sweep = useTransform(progress, [0.62, 1], [0, 1], { clamp: true });

  const introOpacity = useTransform(progress, [0, 0.18], [1, 0]);
  const titleOpacity = useTransform(progress, [0.38, 0.6], [0, 1]);
  const titleY = useTransform(progress, [0.38, 0.6], [18, 0]);

  /* Parallax horizontal del arco con el ratón. */
  const parallaxTarget = useMotionValue(0);
  const parallax = useSpring(parallaxTarget, { stiffness: 28, damping: 20 });

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const normalized = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      parallaxTarget.set(normalized * 80);
    };

    stage.addEventListener("mousemove", handleMove);
    return () => stage.removeEventListener("mousemove", handleMove);
  }, [parallaxTarget, prefersReducedMotion]);

  /* Entrada por fases, solo cuando la sección entra en pantalla. */
  const phase = useMotionValue(PHASE_SCATTER);

  React.useEffect(() => {
    if (!inView) return;

    const toLine = setTimeout(() => phase.set(PHASE_LINE), 220);
    const toCircle = setTimeout(() => phase.set(PHASE_CIRCLE), 1100);
    return () => {
      clearTimeout(toLine);
      clearTimeout(toCircle);
    };
  }, [inView, phase]);

  /**
   * Sin animación: una tira estática con las mismas imágenes. El titular sigue
   * siendo el mismo texto, así que no cambia nada para SEO.
   */
  if (prefersReducedMotion) {
    return (
      <section className={`py-12 md:py-16 ${className ?? ""}`}>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-4 max-w-2xl text-ivory-dim">{subtitle}</p> : null}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {images.slice(0, 10).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full rounded-xl object-cover shadow-card"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    /* Recorrido más corto en móvil: 220vh de scroll sobre una pantalla pequeña
       se hacen largos antes de llegar al contenido de texto. */
    <section ref={trackRef} className={`relative h-[175vh] md:h-[220vh] ${className ?? ""}`}>
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Estado inicial, antes de que el arco se forme */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6 text-center"
        >
          {/* Panel esmerilado: el texto queda legible sobre las imágenes del anillo */}
          <div className="mx-auto max-w-[340px] rounded-3xl bg-dark/80 px-7 py-7 shadow-card ring-1 ring-black/5 backdrop-blur-md">
            <p className="font-display text-2xl leading-tight tracking-tight text-ivory md:text-3xl">
              {overline}
            </p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-muted">
              {intro}
            </p>
          </div>
        </motion.div>

        {/* Titular del estado final. El `top` deja libre la franja del navbar
            fijo, que se superpone al escenario. */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-[19%] z-10 px-6 text-center"
        >
          <h2 className="font-display text-3xl tracking-tight text-ivory md:text-5xl">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory-dim md:text-base">
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        {/* Escenario de tarjetas */}
        <div className="relative flex h-full w-full items-center justify-center">
          {images.map((src, index) => (
            <MorphCard
              key={src}
              src={src}
              index={index}
              total={images.length}
              size={size}
              accent={accent}
              phase={phase}
              morph={morph}
              sweep={sweep}
              parallax={parallax}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScrollMorphShowcase;
