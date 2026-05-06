"use client";

import type { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "noun-class" | "editorial" | "contributor" | "success" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--bg-surface-muted)",
    color: "var(--fg-muted)",
  },
  "noun-class": {
    background: "var(--color-kaya-indigo)",
    color: "#FFFFFF",
  },
  editorial: {
    background: "var(--color-mnazi-gold)",
    color: "var(--color-vigango-black)",
  },
  contributor: {
    background: "var(--color-mangrove-green)",
    color: "#FFFFFF",
  },
  success: {
    background: "var(--color-success-green)",
    color: "#FFFFFF",
  },
  error: {
    background: "var(--color-error-red)",
    color: "#FFFFFF",
  },
};

export function Badge({ variant = "default", size = "sm", children, style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        borderRadius: "var(--radius-full)",
        whiteSpace: "nowrap",
        lineHeight: 1,
        ...(size === "sm"
          ? { fontSize: "var(--text-xs)", padding: "2px var(--space-2)" }
          : { fontSize: "var(--text-sm)", padding: "var(--space-1) var(--space-3)" }),
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
