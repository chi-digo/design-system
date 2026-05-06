import type { HTMLAttributes } from "react";

export interface DescriptionItem {
  term: string;
  description: string | React.ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  layout?: "vertical" | "horizontal";
}

export function DescriptionList({ items, layout = "vertical", style, ...rest }: DescriptionListProps) {
  if (layout === "horizontal") {
    return (
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "var(--space-1) var(--space-4)",
          margin: 0,
          ...style,
        }}
        {...rest}
      >
        {items.map((item) => (
          <div key={item.term} style={{ display: "contents" }}>
            <dt style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--fg-muted)",
              paddingTop: "var(--space-2)",
              paddingBottom: "var(--space-2)",
              borderBottom: "var(--border-width-thin) solid var(--border-default)",
            }}>
              {item.term}
            </dt>
            <dd style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-default)",
              margin: 0,
              paddingTop: "var(--space-2)",
              paddingBottom: "var(--space-2)",
              borderBottom: "var(--border-width-thin) solid var(--border-default)",
            }}>
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl style={{ margin: 0, ...style }} {...rest}>
      {items.map((item) => (
        <div key={item.term} style={{ marginBottom: "var(--space-3)" }}>
          <dt style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            marginBottom: "var(--space-0-5)",
          }}>
            {item.term}
          </dt>
          <dd style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-base)",
            color: "var(--fg-default)",
            margin: 0,
            lineHeight: 1.55,
          }}>
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
