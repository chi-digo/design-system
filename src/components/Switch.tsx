"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  size?: "sm" | "md";
}

const sizeConfig = {
  sm: { width: 32, height: 18, thumbSize: 14 },
  md: { width: 44, height: 24, thumbSize: 20 },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, size = "md", checked, disabled, id: idProp, style, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const cfg = sizeConfig[size];

  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span style={{ position: "relative", display: "inline-block", width: `${cfg.width}px`, height: `${cfg.height}px` }}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
          {...rest}
        />
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: `${cfg.width}px`,
            height: `${cfg.height}px`,
            borderRadius: "var(--radius-full)",
            background: checked ? "var(--color-kaya-indigo)" : "var(--border-default)",
            transition: `background var(--duration-fast) var(--ease-default)`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: checked ? `${cfg.width - cfg.thumbSize - 2}px` : "2px",
              transform: "translateY(-50%)",
              width: `${cfg.thumbSize}px`,
              height: `${cfg.thumbSize}px`,
              borderRadius: "var(--radius-full)",
              background: "#FFFFFF",
              boxShadow: "var(--shadow-sm)",
              transition: `left var(--duration-fast) var(--ease-default)`,
            }}
          />
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-default)" }}>
        {label}
      </span>
    </label>
  );
});
