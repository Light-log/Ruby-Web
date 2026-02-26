"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "lavender";
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
      "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-crimson/40 disabled:pointer-events-none disabled:opacity-60";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-crimson text-white shadow-glow hover:bg-crimson-light hover:translate-y-[-2px] hover:shadow-glow-lg active:translate-y-[0px] active:opacity-90",
      secondary:
        "bg-black/5 text-ivory border border-black/10 hover:bg-black/8 hover:border-black/15 hover:translate-y-[-1px] active:translate-y-[0px]",
      ghost:
        "bg-transparent text-ivory hover:bg-black/5 hover:translate-y-[-1px] active:translate-y-[0px]",
      outline:
        "border border-black/12 bg-transparent text-ivory hover:bg-black/5 hover:border-black/20",
      lavender:
        "bg-lavender text-white shadow-glow-lavender hover:bg-lavender-light hover:translate-y-[-2px] active:translate-y-[0px] active:opacity-90",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
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
