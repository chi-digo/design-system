"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  elevated?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
}

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "between";
}

const paddingMap = {
  none: "0",
  sm: "var(--space-3)",
  md: "var(--space-4)",
  lg: "var(--space-6)",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = "md", elevated = false, children, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-surface)",
        boxShadow: elevated ? "var(--shadow-sm)" : "none",
        overflow: "hidden",
        transition: `box-shadow var(--duration-fast) var(--ease-default)`,
        ...style,
      }}
      {...rest}
    >
      <div style={{ padding: paddingMap[padding] }}>
        {children}
      </div>
    </div>
  );
});

export function CardHeader({ title, subtitle, action, style, ...rest }: CardHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        marginBottom: "var(--space-3)",
        ...style,
      }}
      {...rest}
    >
      <div>
        <h3 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-lg)",
          fontWeight: 600,
          color: "var(--fg-heading)",
          margin: 0,
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
            margin: "var(--space-1) 0 0",
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function CardMedia({ src, alt, aspectRatio = "16/9", style, ...rest }: CardMediaProps) {
  return (
    <div
      style={{
        aspectRatio,
        overflow: "hidden",
        margin: "calc(-1 * var(--space-4)) calc(-1 * var(--space-4)) var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

export function CardActions({ align = "end", children, style, ...rest }: CardActionsProps) {
  const justifyMap = { start: "flex-start", end: "flex-end", between: "space-between" };
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-2)",
        justifyContent: justifyMap[align],
        marginTop: "var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
