import type { HTMLAttributes } from "react";

export interface ProverbOfTheDayProps extends HTMLAttributes<HTMLDivElement> {
  proverb: string;
  translation: string;
}

export function ProverbOfTheDay({ proverb, translation, style, ...rest }: ProverbOfTheDayProps) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface-warm)",
        border: "var(--border-width-thin) solid var(--border-default)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* Vigango triangle column */}
      <div
        aria-hidden="true"
        style={{
          width: "var(--space-6)",
          flexShrink: 0,
          background: `repeating-linear-gradient(
            0deg,
            var(--color-vigango-black) 0px,
            var(--color-vigango-black) 12px,
            var(--bg-surface-warm) 12px,
            var(--bg-surface-warm) 16px
          )`,
          opacity: 0.15,
        }}
      />
      <div style={{ padding: "var(--space-5) var(--space-6)", flex: 1 }}>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          color: "var(--fg-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.01em",
          marginBottom: "var(--space-3)",
        }}>
          Proverb of the day
        </div>
        <blockquote style={{ margin: 0 }}>
          <p
            lang="dig"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              fontWeight: 400,
              lineHeight: 1.3,
              color: "var(--fg-heading)",
              margin: 0,
            }}
          >
            {proverb}
          </p>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-base)",
            color: "var(--fg-default)",
            opacity: 0.7,
            margin: "var(--space-2) 0 0",
          }}>
            {translation}
          </p>
        </blockquote>
      </div>
    </div>
  );
}
