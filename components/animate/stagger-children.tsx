"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  direction = "up",
}: StaggerChildrenProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  const d = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
        hidden: {},
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, x: d.x, y: d.y, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.21, 0.99, 0.24, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
