"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  count?: number;
  className?: string;
}

export function Meteors({ count = 8, className }: MeteorsProps) {
  const meteors = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
        size: `${1 + Math.random() * 1.5}px`,
      })),
    [count]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute animate-meteor"
          style={{
            top: "-5%",
            left: m.left,
            width: m.size,
            height: "80px",
            background: `linear-gradient(to bottom, rgba(196,30,58,0.4), rgba(124,92,191,0.2), transparent)`,
            borderRadius: "999px",
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
