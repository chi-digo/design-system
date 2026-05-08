"use client";

import type { ButtonHTMLAttributes } from "react";

export type QuizOptionState =
  | "default"
  | "selected"
  | "correct"
  | "incorrect"
  | "disabled";

export interface QuizOptionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  text: string;
  state?: QuizOptionState;
}

const stateStyles: Record<QuizOptionState, React.CSSProperties> = {
  default: {
    background: "var(--bg-surface)",
    borderColor: "var(--border-default)",
    color: "var(--fg-default)",
    cursor: "pointer",
  },
  selected: {
    background: "var(--bg-surface)",
    borderColor: "var(--color-kaya-indigo)",
    color: "var(--fg-default)",
    cursor: "pointer",
    boxShadow: "0 0 0 1px var(--color-kaya-indigo)",
  },
  correct: {
    background: "var(--color-success-green)",
    borderColor: "var(--color-success-green)",
    color: "#FFFFFF",
    cursor: "default",
  },
  incorrect: {
    background: "var(--color-error-red)",
    borderColor: "var(--color-error-red)",
    color: "#FFFFFF",
    cursor: "default",
  },
  disabled: {
    background: "var(--bg-surface-muted)",
    borderColor: "var(--border-default)",
    color: "var(--fg-subtle)",
    cursor: "default",
    opacity: 0.6,
  },
};

export function QuizOption({
  label,
  text,
  state = "default",
  disabled,
  style,
  ...rest
}: QuizOptionProps) {
  const isDisabled = disabled || state === "disabled" || state === "correct" || state === "incorrect";

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={`${label}: ${text}`}
      data-state={state}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        width: "100%",
        padding: "var(--space-3) var(--space-4)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 400,
        lineHeight: 1.5,
        borderRadius: "var(--radius-md)",
        borderWidth: "var(--border-width-thin)",
        borderStyle: "solid",
        transition: `all var(--duration-fast) var(--ease-default)`,
        textAlign: "left",
        ...stateStyles[state],
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "var(--radius-full)",
          fontWeight: 600,
          fontSize: "var(--text-xs)",
          flexShrink: 0,
          background:
            state === "correct" || state === "incorrect"
              ? "rgba(255,255,255,0.2)"
              : "var(--bg-surface-muted)",
          color:
            state === "correct" || state === "incorrect"
              ? "#FFFFFF"
              : "var(--fg-muted)",
        }}
      >
        {state === "correct" ? "✓" : state === "incorrect" ? "✗" : label}
      </span>
      <span style={{ flex: 1 }}>{text}</span>
    </button>
  );
}
