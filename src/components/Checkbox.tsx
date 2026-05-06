"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  indeterminate?: boolean;
  helpText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate, helpText, id: idProp, disabled, style, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div style={{ display: "flex", gap: "var(--space-2)", ...style }}>
      <input
        ref={(el) => {
          if (el) el.indeterminate = !!indeterminate;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        type="checkbox"
        id={id}
        disabled={disabled}
        aria-describedby={helpText ? `${id}-help` : undefined}
        style={{
          width: "18px",
          height: "18px",
          accentColor: "var(--color-kaya-indigo)",
          cursor: disabled ? "not-allowed" : "pointer",
          marginTop: "2px",
          flexShrink: 0,
        }}
        {...rest}
      />
      <div>
        <label
          htmlFor={id}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: disabled ? "var(--fg-subtle)" : "var(--fg-default)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {label}
        </label>
        {helpText && (
          <p
            id={`${id}-help`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              color: "var(--fg-muted)",
              margin: "var(--space-0-5) 0 0",
            }}
          >
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
});
