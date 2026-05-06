import { type HTMLAttributes, type ReactNode } from "react";

export interface RelatedWord {
  word: string;
  href?: string;
}

export interface RelatedWordsProps extends HTMLAttributes<HTMLDivElement> {
  words: RelatedWord[];
  renderLink?: (href: string, children: ReactNode) => ReactNode;
}

export function RelatedWords({ words, renderLink, style, ...rest }: RelatedWordsProps) {
  if (words.length === 0) return null;

  return (
    <div style={{ ...style }} {...rest}>
      <h4 style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        color: "var(--fg-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.01em",
        margin: "0 0 var(--space-2) 0",
      }}>
        Related words
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {words.map((w) => {
          const tag = (
            <span
              key={w.word}
              lang="dig"
              style={{
                display: "inline-block",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-full)",
                border: "var(--border-width-thin) solid var(--border-default)",
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-sm)",
                color: w.href ? "var(--fg-link)" : "var(--fg-default)",
                textDecoration: "none",
                cursor: w.href ? "pointer" : "default",
                transition: `background var(--duration-fast) var(--ease-default)`,
              }}
            >
              {w.word}
            </span>
          );

          if (w.href && renderLink) return <span key={w.word}>{renderLink(w.href, tag)}</span>;
          if (w.href) return <a key={w.word} href={w.href} style={{ textDecoration: "none" }}>{tag}</a>;
          return tag;
        })}
      </div>
    </div>
  );
}
