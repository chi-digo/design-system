import type { HTMLAttributes } from "react";

export interface SenseExample {
  text: string;
  translation?: string;
  lang?: string;
}

export interface Sense {
  definition: string;
  examples?: SenseExample[];
  usageNote?: string;
}

export interface SenseListProps extends HTMLAttributes<HTMLOListElement> {
  senses: Sense[];
}

export function SenseList({ senses, style, ...rest }: SenseListProps) {
  return (
    <ol
      style={{
        listStyleType: "decimal",
        paddingLeft: "var(--space-6)",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {senses.map((sense, i) => (
        <li key={i} style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-base)", lineHeight: 1.55, color: "var(--fg-default)" }}>
          <span>{sense.definition}</span>
          {sense.usageNote && (
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-subtle)",
              fontStyle: "italic",
              marginLeft: "var(--space-2)",
            }}>
              ({sense.usageNote})
            </span>
          )}
          {sense.examples && sense.examples.length > 0 && (
            <ul style={{
              listStyle: "none",
              padding: 0,
              marginTop: "var(--space-2)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}>
              {sense.examples.map((ex, j) => (
                <li key={j} style={{
                  paddingLeft: "var(--space-4)",
                  borderLeft: "2px solid var(--border-default)",
                }}>
                  <div
                    lang={ex.lang ?? "dig"}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-sm)",
                      fontStyle: "italic",
                      color: "var(--fg-default)",
                    }}
                  >
                    {ex.text}
                  </div>
                  {ex.translation && (
                    <div style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-muted)",
                      marginTop: "2px",
                    }}>
                      {ex.translation}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
