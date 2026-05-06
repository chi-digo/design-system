import type { HTMLAttributes } from "react";

export interface SkipToContentProps extends HTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

export function SkipToContent({ targetId = "main-content", style, children, ...rest }: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      style={{
        position: "absolute",
        top: "-100%",
        left: "var(--space-4)",
        padding: "var(--space-2) var(--space-4)",
        background: "var(--color-kaya-indigo)",
        color: "#FFFFFF",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        borderRadius: "var(--radius-md)",
        zIndex: 9999,
        textDecoration: "none",
        ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.top = "var(--space-2)"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100%"; }}
      {...rest}
    >
      {children ?? "Skip to content"}
    </a>
  );
}
