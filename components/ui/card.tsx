import * as React from "react";
import { cn } from "@/lib/utils";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,.06)]",
        className
      )}
      {...rest}
    />
  );
}
