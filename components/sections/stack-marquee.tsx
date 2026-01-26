"use client";

import { FadeIn } from "@/components/animate/fade-in";
import { cn } from "@/lib/utils";
import { Cpu, Lock, Cloud, Braces, Database, Gauge, Boxes } from "lucide-react";

/**
 * Simple marquee that looks "alive" when combined with the aurora bg.
 */
const icons = [Braces, Database, Boxes, Cloud, Lock, Gauge, Cpu];

export function StackMarquee() {
  const content = [...icons, ...icons, ...icons];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <FadeIn>
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-5 py-7">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="font-display text-lg">Stack moderno</div>
              <div className="mt-1 text-sm text-white/65">
                Next.js • Tailwind • Anime.js • Motion design • Infra robusta
              </div>
            </div>
            <div className="hidden text-xs text-white/50 md:block">
              (Marquee con animación nativa)
            </div>
          </div>

          <div className="mt-6 overflow-hidden">
            <div className={cn("flex w-[200%] gap-3 animate-marquee")}>
              {content.map((Ico, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gunmetal-900/60 px-4 py-3 text-sm text-white/70"
                >
                  <Ico className="h-4 w-4 text-ruby-red" />
                  <span>Performance</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
