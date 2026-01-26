"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      ...rest
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition will-change-transform focus:outline-none focus:ring-2 focus:ring-ruby-red/40 disabled:pointer-events-none disabled:opacity-60";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-ruby-red text-white shadow-glow hover:translate-y-[-1px] active:translate-y-[0px] active:opacity-90",
      secondary:
        "bg-white/10 text-white border border-white/12 hover:bg-white/14 hover:border-white/18 hover:translate-y-[-1px] active:translate-y-[0px]",
      ghost:
        "bg-white/0 text-white hover:bg-white/6 hover:translate-y-[-1px] active:translate-y-[0px]",
      outline:
        "border border-white/12 bg-white/0 text-white hover:bg-white/6 hover:border-white/20",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-3 text-sm",
      lg: "px-6 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      />
    );
  }
);

Button.displayName = "Button";
