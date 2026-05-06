"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-kaya-indigo)",
    color: "#FFFFFF",
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid var(--border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid transparent",
  },
  danger: {
    background: "var(--color-error-red)",
    color: "#FFFFFF",
    border: "none",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "var(--space-1) var(--space-3)", fontSize: "var(--text-sm)" },
  md: { padding: "var(--space-2) var(--space-4)", fontSize: "var(--text-sm)" },
  lg: { padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-base)" },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, disabled, iconLeft, iconRight, children, style, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        borderRadius: "var(--radius-md)",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : loading ? 0.75 : 1,
        transition: `background var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)`,
        lineHeight: 1.4,
        textDecoration: "none",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: "spin 0.6s linear infinite" }}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </svg>
  );
}
