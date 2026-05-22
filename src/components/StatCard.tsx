import { forwardRef, type HTMLAttributes } from "react";

export interface StatCardProps extends HTMLAttributes<HTMLDListElement> {
  label: string;
  value: string | number;
  subtitle?: string;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-1)",
  padding: "var(--space-4)",
  background: "var(--bg-surface)",
  border: "var(--border-width-thin) solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  minWidth: 120,
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  fontFamily: "var(--font-sans)",
  fontWeight: "var(--weight-medium)",
  color: "var(--fg-muted)",
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase" as const,
  margin: 0,
  lineHeight: "var(--leading-tight)",
};

const valueStyle: React.CSSProperties = {
  fontSize: "var(--text-2xl)",
  fontFamily: "var(--font-serif)",
  fontWeight: "var(--weight-semibold)",
  color: "var(--fg-heading)",
  margin: 0,
  lineHeight: "var(--leading-none)",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  fontFamily: "var(--font-sans)",
  color: "var(--fg-subtle)",
  margin: 0,
  lineHeight: "var(--leading-normal)",
};

export const StatCard = forwardRef<HTMLDListElement, StatCardProps>(
  function StatCard({ label, value, subtitle, style, ...rest }, ref) {
    return (
      <dl ref={ref} style={{ ...containerStyle, ...style }} {...rest}>
        <dt style={labelStyle}>{label}</dt>
        <dd style={valueStyle}>{value}</dd>
        {subtitle && <dd style={subtitleStyle}>{subtitle}</dd>}
      </dl>
    );
  },
);
