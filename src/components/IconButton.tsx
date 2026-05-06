"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type IconButtonVariant = "default" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variantStyles: Record<IconButtonVariant, React.CSSProperties> = {
  default: {
    background: "var(--bg-surface)",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid var(--border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--fg-muted)",
    border: "var(--border-width-thin) solid transparent",
  },
  danger: {
    background: "transparent",
    color: "var(--color-error-red)",
    border: "var(--border-width-thin) solid transparent",
  },
};

const sizeDimensions: Record<IconButtonSize, string> = {
  sm: "var(--space-8)",
  md: "var(--space-10)",
  lg: "var(--space-12)",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = "default", size = "md", disabled, style, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: sizeDimensions[size],
        height: sizeDimensions[size],
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: `background var(--duration-fast) var(--ease-default)`,
        flexShrink: 0,
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {icon}
    </button>
  );
});
