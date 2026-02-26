"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
  size?: number;
  opacity?: number;
  follow?: number;
  softness?: number;
  fullscreen?: boolean;
  zIndex?: number;
  initial?: { x: number; y: number };
};

export function Spotlight({
  className,
  fill = "rgba(196,30,58,.15)",
  size = 620,
  opacity = 0.7,
  follow = 0.22,
  softness = 0.62,
  fullscreen = false,
  zIndex = 0,
  initial = { x: 50, y: 30 },
}: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    el.style.setProperty("--x", `${initial.x}%`);
    el.style.setProperty("--y", `${initial.y}%`);
    el.style.setProperty("--spot-fill", fill);
    el.style.setProperty("--spot-size", `${size}px`);
    el.style.setProperty("--spot-soft", `${Math.max(0, Math.min(1, softness))}`);
    el.style.setProperty("--spot-opacity", `${Math.max(0, Math.min(1, opacity))}`);

    if (reduced) return;

    let raf = 0;
    let targetX = initial.x;
    let targetY = initial.y;
    let currentX = initial.x;
    let currentY = initial.y;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const animate = () => {
      raf = 0;
      const t = clamp(follow, 0.01, 1);
      currentX += (targetX - currentX) * t;
      currentY += (targetY - currentY) * t;
      el.style.setProperty("--x", `${currentX}%`);
      el.style.setProperty("--y", `${currentY}%`);
    };

    const requestTick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      targetX = clamp(x, 0, 100);
      targetY = clamp(y, 0, 100);
      requestTick();
    };

    const onPointerLeave = () => {
      targetX = initial.x;
      targetY = initial.y;
      requestTick();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [fill, size, opacity, follow, softness, initial.x, initial.y]);

  return (
    <div
      ref={ref}
      style={{ zIndex }}
      className={cn(
        "pointer-events-none",
        fullscreen ? "fixed inset-0" : "absolute inset-0",
        [
          "opacity-[var(--spot-opacity)]",
          "[background:",
          "radial-gradient(calc(var(--spot-size)*1.35)_circle_at_var(--x,50%)_var(--y,30%),rgba(255,255,255,0.06),transparent_65%),",
          "radial-gradient(var(--spot-size)_circle_at_var(--x,50%)_var(--y,30%),var(--spot-fill),transparent_calc(55%+var(--spot-soft)*20%))",
          "]",
          "mix-blend-screen",
          "blur-[0.2px]",
        ].join(""),
        className
      )}
    />
  );
}
