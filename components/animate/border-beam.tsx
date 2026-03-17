"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  children: React.ReactNode;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  children,
  duration = 4,
  colorFrom = "#C41E3A",
  colorTo = "#7C5CBF",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          padding: borderWidth,
          background: `conic-gradient(from var(--beam-angle, 0deg) at 50% 50%, transparent 60%, ${colorFrom} 75%, ${colorTo} 85%, transparent 95%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes border-beam-spin {
          from { --beam-angle: 0deg; }
          to { --beam-angle: 360deg; }
        }
        @property --beam-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
      `}</style>
      {children}
    </div>
  );
}
