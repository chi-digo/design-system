"use client";

import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  resize?: "vertical" | "none";
  maxCharacters?: number;
  currentLength?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, error, resize = "vertical", maxCharacters, currentLength, id: idProp, rows = 4, style, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", ...style }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--fg-default)",
        }}
      >
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        aria-invalid={!!error}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-base)",
          padding: "var(--space-2) var(--space-3)",
          borderRadius: "var(--radius-md)",
          border: `var(--border-width-thin) solid ${error ? "var(--color-error-red)" : "var(--border-default)"}`,
          background: "var(--bg-surface)",
          color: "var(--fg-default)",
          outline: "none",
          width: "100%",
          resize,
          lineHeight: 1.55,
          transition: `border-color var(--duration-fast) var(--ease-default)`,
        }}
        {...rest}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {error ? (
          <span id={errorId} role="alert" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--color-error-red)" }}>
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>
            {helperText}
          </span>
        ) : <span />}
        {maxCharacters != null && (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: (currentLength ?? 0) > maxCharacters ? "var(--color-error-red)" : "var(--fg-subtle)",
          }}>
            {currentLength ?? 0}/{maxCharacters}
          </span>
        )}
      </div>
    </div>
  );
});
