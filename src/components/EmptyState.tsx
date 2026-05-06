import { type HTMLAttributes, type ReactNode } from "react";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action, style, ...rest }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-12) var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <div style={{ color: "var(--fg-subtle)", marginBottom: "var(--space-4)", fontSize: "2.5rem", lineHeight: 1 }}>
          {icon}
        </div>
      )}
      <h3 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-lg)",
        fontWeight: 600,
        color: "var(--fg-heading)",
        margin: 0,
        marginBottom: description ? "var(--space-2)" : action ? "var(--space-4)" : 0,
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-base)",
          color: "var(--fg-muted)",
          margin: 0,
          maxWidth: "24rem",
          lineHeight: 1.55,
          marginBottom: action ? "var(--space-4)" : 0,
        }}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
