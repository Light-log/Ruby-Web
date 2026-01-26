"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ShineBorder (Magic UI–style)
 * - Adds an animated "shine sweep" across a border.
 * - Works great as a wrapper around cards / CTAs.
 */
export function ShineBorder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-3xl border-grad", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
      >
        <div className="absolute -inset-y-8 -left-1/2 w-[140%] rotate-12 opacity-60">
          <div className="h-1/2 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
      </div>
      {children}
    </div>
  );
}
