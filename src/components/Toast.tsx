"use client";

import { useEffect, type HTMLAttributes } from "react";

export type ToastVariant = "info" | "success" | "error" | "warning";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}

const variantStyles: Record<ToastVariant, { borderColor: string; iconColor: string }> = {
  info: { borderColor: "var(--color-kaya-indigo)", iconColor: "var(--color-kaya-indigo)" },
  success: { borderColor: "var(--color-success-green)", iconColor: "var(--color-success-green)" },
  error: { borderColor: "var(--color-error-red)", iconColor: "var(--color-error-red)" },
  warning: { borderColor: "var(--color-kanga-orange)", iconColor: "var(--color-kanga-orange)" },
};

const icons: Record<ToastVariant, string> = {
  info: "ℹ",
  success: "✓",
  error: "✕",
  warning: "⚠",
};

export function Toast({
  message,
  variant = "info",
  duration = 5000,
  onDismiss,
  action,
  style,
  ...rest
}: ToastProps) {
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const vs = variantStyles[variant];

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface)",
        boxShadow: "var(--shadow-lg)",
        borderLeft: `3px solid ${vs.borderColor}`,
        maxWidth: "24rem",
        ...style,
      }}
      {...rest}
    >
      <span style={{ color: vs.iconColor, fontSize: "var(--text-lg)", flexShrink: 0, lineHeight: 1 }}>
        {icons[variant]}
      </span>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--fg-default)",
        flex: 1,
      }}>
        {message}
      </span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            color: "var(--color-kaya-indigo)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            whiteSpace: "nowrap",
          }}
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
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
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
