"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import anime from "animejs";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (!inView) return;

    const obj = { val: 0 };
    anime({
      targets: obj,
      val: value,
      duration,
      easing: "easeOutExpo",
      round: 1,
      update: () => setDisplay(String(obj.val)),
    });
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
