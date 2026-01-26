"use client";

import * as React from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper:
 * - Cursor "pull" effect for buttons/cards (anime.js).
 * - Subtle but feels premium and uncommon.
 */
export function Magnetic({
  children,
  className,
  strength = 18,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = el;

    function onMove(e: MouseEvent) {
      const r = target.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const mx = (dx / r.width) * strength;
      const my = (dy / r.height) * strength;

      anime.remove(target);
      anime({
        targets: target,
        translateX: mx,
        translateY: my,
        duration: 260,
        easing: "easeOutQuad",
      });
    }

    function onLeave() {
      anime.remove(target);
      anime({
        targets: target,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: "easeOutElastic(1, .55)",
      });
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
