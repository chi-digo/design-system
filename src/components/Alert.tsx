"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

const variantConfig: Record<AlertVariant, { borderColor: string; bgMix: string; icon: string }> = {
  info: { borderColor: "var(--color-kaya-indigo)", bgMix: "var(--color-kaya-indigo)", icon: "ℹ" },
  success: { borderColor: "var(--color-success-green)", bgMix: "var(--color-success-green)", icon: "✓" },
  warning: { borderColor: "var(--color-kanga-orange)", bgMix: "var(--color-kanga-orange)", icon: "⚠" },
  error: { borderColor: "var(--color-error-red)", bgMix: "var(--color-error-red)", icon: "✕" },
};

export function Alert({
  variant = "info",
  title,
  dismissible,
  onDismiss,
  icon,
  children,
  style,
  ...rest
}: AlertProps) {
  const cfg = variantConfig[variant];

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-md)",
        borderLeft: `3px solid ${cfg.borderColor}`,
        background: `color-mix(in srgb, ${cfg.bgMix} 5%, var(--bg-surface))`,
        ...style,
      }}
      {...rest}
    >
      <span style={{ color: cfg.borderColor, fontSize: "var(--text-lg)", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>
        {icon ?? cfg.icon}
      </span>
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--fg-default)",
            marginBottom: children ? "var(--space-1)" : 0,
          }}>
            {title}
          </div>
        )}
        {children && (
          <div style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
            lineHeight: 1.5,
          }}>
            {children}
          </div>
        )}
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg-muted)",
            padding: "var(--space-1)",
            lineHeight: 1,
            fontSize: "var(--text-base)",
            flexShrink: 0,
            alignSelf: "flex-start",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
