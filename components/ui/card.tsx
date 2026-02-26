import * as React from "react";
import { cn } from "@/lib/utils";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "rounded-3xl border border-black/8 bg-white/80 backdrop-blur-xl shadow-card transition-all duration-300",
        className
      )}
      {...rest}
    />
  );
}
