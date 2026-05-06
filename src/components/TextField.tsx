"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  maxCharacters?: number;
  currentLength?: number;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helperText, error, maxCharacters, currentLength, id: idProp, style, ...rest },
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
      <input
        ref={ref}
        id={id}
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
          transition: `border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)`,
          width: "100%",
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
