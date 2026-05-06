import type { HTMLAttributes } from "react";

export interface ProverbCardProps extends HTMLAttributes<HTMLDivElement> {
  proverb: string;
  translation: string;
  gloss?: string;
  source?: string;
  lang?: string;
}

export function ProverbCard({
  proverb,
  translation,
  gloss,
  source,
  lang = "dig",
  style,
  ...rest
}: ProverbCardProps) {
  return (
    <figure
      style={{
        margin: 0,
        padding: "var(--space-6)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface-warm)",
        border: "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      <blockquote style={{ margin: 0 }}>
        <p
          lang={lang}
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
          lineHeight: 1.55,
          color: "var(--fg-default)",
          marginTop: "var(--space-2)",
          marginBottom: 0,
        }}>
          {translation}
        </p>
        {gloss && (
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
            marginTop: "var(--space-2)",
            marginBottom: 0,
            fontStyle: "italic",
          }}>
            {gloss}
          </p>
        )}
      </blockquote>
      {source && (
        <figcaption style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          color: "var(--fg-subtle)",
          marginTop: "var(--space-4)",
          paddingTop: "var(--space-3)",
          borderTop: "var(--border-width-thin) solid var(--border-default)",
        }}>
          {source}
        </figcaption>
      )}
    </figure>
  );
}
