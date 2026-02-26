"use client";

import * as React from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const blobs = Array.from(el.querySelectorAll<HTMLElement>("[data-blob]"));

    const animations = blobs.map((b, i) =>
      anime({
        targets: b,
        translateX: () => anime.random(-120, 120),
        translateY: () => anime.random(-80, 80),
        scale: () => anime.random(90, 130) / 100,
        duration: 4500 + i * 400,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
        delay: i * 120,
      })
    );

    return () => {
      animations.forEach((a) => a.pause());
    };
  }, []);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        data-blob
        className="absolute -left-24 top-12 h-[420px] w-[420px] rounded-full bg-crimson/8 blur-[100px]"
      />
      <div
        data-blob
        className="absolute right-[-120px] top-[-40px] h-[520px] w-[520px] rounded-full bg-lavender/8 blur-[120px]"
      />
      <div
        data-blob
        className="absolute bottom-[-140px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-crimson-dark/6 blur-[120px]"
      />
      <div
        data-blob
        className="absolute bottom-[-120px] right-[-120px] h-[460px] w-[460px] rounded-full bg-lavender-dark/6 blur-[100px]"
      />
    </div>
  );
}
