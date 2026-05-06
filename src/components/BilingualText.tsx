import type { HTMLAttributes } from "react";

export type BilingualLayout = "stacked" | "inline" | "two-column";

export interface BilingualTextProps extends HTMLAttributes<HTMLDivElement> {
  primary: string;
  secondary: string;
  primaryLang?: string;
  secondaryLang?: string;
  layout?: BilingualLayout;
  primaryStyle?: React.CSSProperties;
  secondaryStyle?: React.CSSProperties;
}

export function BilingualText({
  primary,
  secondary,
  primaryLang = "dig",
  secondaryLang = "en",
  layout = "stacked",
  primaryStyle,
  secondaryStyle,
  style,
  ...rest
}: BilingualTextProps) {
  if (layout === "inline") {
    return (
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", lineHeight: 1.55, color: "var(--fg-default)", ...style }} {...rest}>
        <em lang={primaryLang} style={primaryStyle}>{primary}</em>
        {" — "}
        <span lang={secondaryLang} style={secondaryStyle}>{secondary}</span>
      </div>
    );
  }

  if (layout === "two-column") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", ...style }} {...rest}>
        <div
          lang={primaryLang}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-lg)",
            lineHeight: 1.55,
            color: "var(--fg-default)",
            ...primaryStyle,
          }}
        >
          {primary}
        </div>
        <div
          lang={secondaryLang}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-lg)",
            lineHeight: 1.55,
            color: "var(--fg-default)",
            ...secondaryStyle,
          }}
        >
          {secondary}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...style }} {...rest}>
      <div
        lang={primaryLang}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 500,
          color: "var(--fg-heading)",
          lineHeight: 1.2,
          ...primaryStyle,
        }}
      >
        {primary}
      </div>
      <div
        lang={secondaryLang}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-lg)",
          color: "var(--fg-default)",
          opacity: 0.6,
          marginTop: "var(--space-1)",
          ...secondaryStyle,
        }}
      >
        {secondary}
      </div>
    </div>
  );
}
