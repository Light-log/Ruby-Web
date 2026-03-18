"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = children.split(" ");

  return (
    <span ref={ref} className="inline">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{
            duration: 0.5,
            ease: [0.21, 0.99, 0.24, 1],
            delay: delay + i * stagger,
          }}
        >
          {/* ✅ CORRECCIÓN: Aplicamos la clase del degradado dentro de la animación */}
          <span className={cn(className)}>{word}</span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}