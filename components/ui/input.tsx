import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { className, label, id, ...rest } = props;
  const inputId = id ?? React.useId();

  return (
    <label className="grid gap-2 text-sm text-white/80" htmlFor={inputId}>
      {label ? <span className="font-semibold">{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          "h-12 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-white/35 outline-none transition focus:border-ruby-red/40 focus:ring-2 focus:ring-ruby-red/20",
          className
        )}
        {...rest}
      />
    </label>
  );
}
