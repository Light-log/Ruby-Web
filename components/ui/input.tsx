import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { className, label, id, ...rest } = props;
  const inputId = id ?? React.useId();

  return (
    <label className="grid gap-2 text-sm text-ivory/80" htmlFor={inputId}>
      {label ? <span className="font-semibold">{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          "h-12 rounded-2xl border border-black/10 bg-dark-200/60 px-4 text-ivory placeholder:text-ivory-muted/60 outline-none transition-all duration-300 focus:border-crimson/40 focus:ring-2 focus:ring-crimson/20 focus:bg-white",
          className
        )}
        {...rest}
      />
    </label>
  );
}
