import { type HTMLAttributes, type ReactNode } from "react";

export interface TimelineItem {
  date?: string;
  title: string;
  description?: string | ReactNode;
  icon?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export function Timeline({ items, style, ...rest }: TimelineProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "var(--space-4)",
            paddingBottom: i < items.length - 1 ? "var(--space-6)" : 0,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: "var(--space-8)",
              height: "var(--space-8)",
              borderRadius: "var(--radius-full)",
              background: i === 0 ? "var(--color-kaya-indigo)" : "var(--bg-surface-muted)",
              color: i === 0 ? "#FFFFFF" : "var(--fg-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              flexShrink: 0,
              zIndex: 1,
            }}>
              {item.icon ?? (i + 1)}
            </div>
            {i < items.length - 1 && (
              <div style={{
                width: "2px",
                flex: 1,
                background: "var(--border-default)",
                marginTop: "var(--space-1)",
              }} />
            )}
          </div>
          <div style={{ paddingTop: "var(--space-1)" }}>
            {item.date && (
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                color: "var(--fg-subtle)",
                marginBottom: "var(--space-0-5)",
              }}>
                {item.date}
              </div>
            )}
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              color: "var(--fg-default)",
              marginBottom: item.description ? "var(--space-1)" : 0,
            }}>
              {item.title}
            </div>
            {item.description && (
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-muted)",
                lineHeight: 1.55,
              }}>
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
