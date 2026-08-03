"use client";

import * as React from "react";

/**
 * Esfera de logotipos con arrastre, inercia y rotación automática.
 *
 * Distribución de Fibonacci para repartir los nodos por la superficie. Respecto
 * al componente original se cambiaron tres cosas por rendimiento y estabilidad:
 *
 * 1. Fuera la detección de colisiones. Era un doble bucle sobre todos los nodos
 *    ejecutado en cada fotograma: O(n²) a 60fps. Con nodos del mismo tamaño y
 *    repartidos por Fibonacci, el solape ya lo evita la propia distribución.
 * 2. El bucle de animación se detiene cuando la esfera sale de pantalla o si el
 *    sistema pide reducir movimiento. El original lo dejaba corriendo siempre.
 * 3. Posiciones deterministas. El original añadía `Math.random()` a cada ángulo,
 *    así que el reparto cambiaba en cada carga y podía apelotonarse.
 */

export interface SphereLogo {
  id: string;
  src: string;
  /** Nombre de la herramienta; se muestra al pasar el cursor. */
  name: string;
  /** Qué es, en una línea. Aparece en la tarjeta al pulsar. */
  description?: string;
}

export interface LogoSphereProps {
  logos: SphereLogo[];
  /** Radio de la esfera como fracción del lado del contenedor. */
  radiusRatio?: number;
  /** Diámetro de cada ficha como fracción del lado del contenedor. */
  chipRatio?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  autoRotateSpeed?: number;
  className?: string;
}

type Spherical = { theta: number; phi: number };

const DEG = Math.PI / 180;

const normalizeAngle = (angle: number) => {
  let a = angle;
  while (a > 180) a -= 360;
  while (a < -180) a += 360;
  return a;
};

/** Reparto de Fibonacci: cobertura uniforme sin agrupamientos en los polos. */
function fibonacciSphere(count: number): Spherical[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2; // de 1 a -1
    const inclination = Math.acos(Math.min(1, Math.max(-1, y)));
    return { theta: (golden * i) / DEG, phi: inclination / DEG };
  });
}

export function LogoSphere({
  logos,
  radiusRatio = 0.4,
  chipRatio = 0.185,
  dragSensitivity = 0.45,
  momentumDecay = 0.94,
  maxRotationSpeed = 6,
  autoRotateSpeed = 0.22,
  className,
}: LogoSphereProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);
  const [rotation, setRotation] = React.useState({ x: 12, y: 0 });
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [selected, setSelected] = React.useState<number | null>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  const velocity = React.useRef({ x: 0, y: 0 });
  const lastPointer = React.useRef({ x: 0, y: 0 });
  const running = React.useRef(true);
  const reduceMotion = React.useRef(false);

  const points = React.useMemo(() => fibonacciSphere(logos.length), [logos.length]);

  /* El contenedor manda el tamaño: el original fijaba píxeles por prop y no se
     adaptaba al hueco del hero. */
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect.width));
    observer.observe(node);
    setSize(node.clientWidth);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    reduceMotion.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  /* Bucle: gira sola y consume la inercia del arrastre. Se para fuera de vista. */
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || reduceMotion.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      running.current = entry.isIntersecting;
    });
    observer.observe(node);

    let frame = requestAnimationFrame(function tick() {
      frame = requestAnimationFrame(tick);
      if (!running.current || dragging || selected !== null) return;

      const v = velocity.current;
      v.x *= momentumDecay;
      v.y *= momentumDecay;
      if (Math.abs(v.x) < 0.01) v.x = 0;
      if (Math.abs(v.y) < 0.01) v.y = 0;

      setRotation((prev) => ({
        x: normalizeAngle(prev.x + v.x),
        y: normalizeAngle(prev.y + v.y + autoRotateSpeed),
      }));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [dragging, momentumDecay, autoRotateSpeed, selected]);

  /* Tarjeta: cerrar con Escape, bloquear el scroll de fondo y devolver el foco.
     El modal del componente original no hacía nada de esto. */
  React.useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      lastFocused.current?.focus();
    };
  }, [selected]);

  /* Arrastre con puntero unificado: un solo juego de manejadores para ratón,
     lápiz y dedo, en vez de las dos rutas separadas del original. */
  React.useEffect(() => {
    if (!dragging) return;

    const clamp = (n: number) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, n));

    const onMove = (event: PointerEvent) => {
      const dx = (event.clientX - lastPointer.current.x) * dragSensitivity;
      const dy = (event.clientY - lastPointer.current.y) * dragSensitivity;
      lastPointer.current = { x: event.clientX, y: event.clientY };

      velocity.current = { x: clamp(-dy), y: clamp(dx) };
      setRotation((prev) => ({
        x: normalizeAngle(prev.x + clamp(-dy)),
        y: normalizeAngle(prev.y + clamp(dx)),
      }));
    };

    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, dragSensitivity, maxRotationSpeed]);

  const radius = size * radiusRatio;
  const chip = size * chipRatio;

  const nodes = points.map((point, index) => {
    const theta = point.theta * DEG;
    const phi = point.phi * DEG;
    const rx = rotation.x * DEG;
    const ry = rotation.y * DEG;

    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.cos(phi);
    let z = radius * Math.sin(phi) * Math.sin(theta);

    // Giro sobre Y (arrastre horizontal)
    const x1 = x * Math.cos(ry) + z * Math.sin(ry);
    z = -x * Math.sin(ry) + z * Math.cos(ry);
    x = x1;

    // Giro sobre X (arrastre vertical)
    const y1 = y * Math.cos(rx) - z * Math.sin(rx);
    z = y * Math.sin(rx) + z * Math.cos(rx);
    y = y1;

    /* La profundidad da tamaño y opacidad: lo que está detrás se ve más
       pequeño y apagado, que es lo que produce la sensación de volumen. */
    const depth = (z + radius) / (2 * radius); // 0 detrás, 1 delante
    const scale = 0.6 + depth * 0.4;
    const opacity = 0.38 + depth * 0.62;

    return { x, y, z, scale, opacity, index };
  });

  const activeName = hovered !== null ? logos[hovered]?.name : null;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        /* `isolate` crea un contexto de apilamiento propio: sin él, el z-index
           de cada ficha (hasta ~1180 por profundidad) compite con el del resto
           de la página y las fichas se dibujaban por encima del navbar fijo. */
        className="relative isolate aspect-square w-full cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={(event) => {
          lastPointer.current = { x: event.clientX, y: event.clientY };
          velocity.current = { x: 0, y: 0 };
          setDragging(true);
        }}
      >
        {size > 0
          ? nodes.map((node) => {
              const logo = logos[node.index];
              const isHovered = hovered === node.index;

              return (
                <button
                  key={logo.id}
                  type="button"
                  aria-label={logo.name}
                  className="absolute grid place-items-center rounded-full border border-black/8 bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50"
                  style={{
                    width: chip,
                    height: chip,
                    left: size / 2 + node.x,
                    top: size / 2 + node.y,
                    opacity: node.opacity,
                    zIndex: Math.round(1000 + node.z),
                    transform: `translate(-50%, -50%) scale(${node.scale * (isHovered ? 1.25 : 1)})`,
                  }}
                  onMouseEnter={() => setHovered(node.index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.index)}
                  onBlur={() => setHovered(null)}
                  onClick={(event) => {
                    lastFocused.current = event.currentTarget;
                    setSelected(node.index);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    className="h-1/2 w-1/2 object-contain"
                  />
                </button>
              );
            })
          : null}
      </div>

      {/* Etiqueta del logotipo activo. Reserva su alto para que la esfera no
          salte cuando aparece o desaparece. */}
      <p className="mt-2 h-5 text-center text-sm font-medium text-ivory transition-opacity duration-200">
        {activeName ?? ""}
      </p>

      {/* Tarjeta que se abre al pulsar una ficha */}
      {selected !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sphere-card-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ivory/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-xs overflow-hidden rounded-3xl border border-black/8 bg-white shadow-card-hover"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative grid place-items-center bg-dark-200/60 p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logos[selected].src}
                alt=""
                className="h-20 w-20 object-contain"
              />
              <button
                type="button"
                aria-label="Cerrar"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ivory-muted transition-colors hover:bg-black/5 hover:text-ivory"
                onClick={() => setSelected(null)}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 id="sphere-card-title" className="font-display text-xl text-ivory">
                {logos[selected].name}
              </h3>
              {logos[selected].description ? (
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">
                  {logos[selected].description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LogoSphere;
