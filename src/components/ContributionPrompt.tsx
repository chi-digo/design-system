import { type HTMLAttributes, type ReactNode } from "react";

export type ContributionVariant = "word" | "audio" | "review";

export interface ContributionPromptProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ContributionVariant;
  compact?: boolean;
  action?: ReactNode;
}

const copy: Record<ContributionVariant, { title: string; body: string }> = {
  word: {
    title: "The dictionary needs you.",
    body: "Add a word, record a pronunciation, or flag a missing definition.",
  },
  audio: {
    title: "Lend your voice.",
    body: "Record a pronunciation for this word so others can hear how it sounds.",
  },
  review: {
    title: "Help us get it right.",
    body: "Review this entry and suggest corrections or additions.",
  },
};

export function ContributionPrompt({ variant = "word", compact = false, action, style, ...rest }: ContributionPromptProps) {
  const c = copy[variant];

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          padding: "var(--space-3) var(--space-4)",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-surface-muted)",
          ...style,
        }}
        {...rest}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>
          {c.title}
        </span>
        {action}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "var(--space-6)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface-warm)",
        border: "var(--border-width-thin) solid var(--border-default)",
        textAlign: "center",
        ...style,
      }}
      {...rest}
    >
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-xl)",
        fontWeight: 600,
        color: "var(--fg-heading)",
        margin: "0 0 var(--space-2)",
      }}>
        {c.title}
      </h3>
      <p style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-base)",
        color: "var(--fg-muted)",
        lineHeight: 1.55,
        margin: "0 0 var(--space-4)",
        maxWidth: "28rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {c.body}
      </p>
      {action}
    </div>
  );
}
