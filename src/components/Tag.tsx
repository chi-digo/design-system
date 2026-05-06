"use client";

import type { HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "brand";
}

export function Tag({ label, onRemove, variant = "default", style, ...rest }: TagProps) {
  const isBrand = variant === "brand";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: "var(--space-1) var(--space-3)",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        lineHeight: 1.4,
        background: isBrand ? "var(--color-kaya-indigo)" : "var(--bg-surface-muted)",
        color: isBrand ? "#FFFFFF" : "var(--fg-default)",
        border: isBrand ? "none" : "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "16px",
            height: "16px",
            borderRadius: "var(--radius-full)",
            border: "none",
            background: "none",
            color: "inherit",
            cursor: "pointer",
            padding: 0,
            opacity: 0.7,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
