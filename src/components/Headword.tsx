import type { HTMLAttributes, ReactNode } from "react";

export interface HeadwordProps extends HTMLAttributes<HTMLDivElement> {
  word: string;
  pronunciation?: string;
  nounClass?: string;
  partOfSpeech?: string;
  audio?: ReactNode;
  lang?: string;
}

export function Headword({
  word,
  pronunciation,
  nounClass,
  partOfSpeech,
  audio,
  lang = "dig",
  style,
  ...rest
}: HeadwordProps) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-2)", ...style }} {...rest}>
      <h2
        lang={lang}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-3xl)",
          fontWeight: 600,
          color: "var(--fg-heading)",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {word}
      </h2>
      {pronunciation && (
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-base)",
          color: "var(--fg-muted)",
        }}>
          {pronunciation}
        </span>
      )}
      {nounClass && (
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          padding: "2px var(--space-2)",
          borderRadius: "var(--radius-full)",
          background: "var(--color-kaya-indigo)",
          color: "#FFFFFF",
          lineHeight: 1,
        }}>
          cl. {nounClass}
        </span>
      )}
      {partOfSpeech && (
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          fontStyle: "italic",
          color: "var(--fg-subtle)",
        }}>
          {partOfSpeech}
        </span>
      )}
      {audio}
    </div>
  );
}
