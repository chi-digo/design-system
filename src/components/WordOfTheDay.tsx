import type { HTMLAttributes, ReactNode } from "react";

export interface WordOfTheDayEntry {
  headword: string;
  ipa?: string;
  nounClass?: string;
  partOfSpeech?: string;
  definition: string;
  example?: { text: string; translation?: string };
}

export interface WordOfTheDayProps extends HTMLAttributes<HTMLDivElement> {
  entry: WordOfTheDayEntry;
  date?: string;
  audio?: ReactNode;
}

export function WordOfTheDay({ entry, date, audio, style, ...rest }: WordOfTheDayProps) {
  return (
    <div
      style={{
        padding: "var(--space-6)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface-warm)",
        border: "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        color: "var(--fg-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.01em",
        marginBottom: "var(--space-3)",
      }}>
        Word of the day{date ? ` · ${date}` : ""}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
        <span lang="dig" style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 600,
          color: "var(--fg-heading)",
          lineHeight: 1.2,
        }}>
          {entry.headword}
        </span>
        {entry.ipa && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>
            {entry.ipa}
          </span>
        )}
        {entry.nounClass && (
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 500,
            padding: "2px var(--space-2)", borderRadius: "var(--radius-full)",
            background: "var(--color-mangrove-green)", color: "#FFFFFF",
          }}>
            cl. {entry.nounClass}
          </span>
        )}
        {entry.partOfSpeech && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontStyle: "italic", color: "var(--fg-subtle)" }}>
            {entry.partOfSpeech}
          </span>
        )}
        {audio}
      </div>
      <p style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-base)",
        lineHeight: 1.55,
        color: "var(--fg-default)",
        margin: 0,
      }}>
        {entry.definition}
      </p>
      {entry.example && (
        <div style={{
          marginTop: "var(--space-3)",
          paddingLeft: "var(--space-4)",
          borderLeft: "2px solid var(--border-default)",
        }}>
          <p lang="dig" style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-sm)",
            fontStyle: "italic",
            color: "var(--fg-default)",
            margin: 0,
          }}>
            {entry.example.text}
          </p>
          {entry.example.translation && (
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
              margin: "2px 0 0",
            }}>
              {entry.example.translation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
