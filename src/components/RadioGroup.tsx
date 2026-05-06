"use client";

import { useId, type HTMLAttributes } from "react";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  name?: string;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  orientation = "vertical",
  name: nameProp,
  style,
  ...rest
}: RadioGroupProps) {
  const autoId = useId();
  const name = nameProp ?? autoId;

  return (
    <fieldset
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      <legend
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--fg-default)",
          marginBottom: "var(--space-2)",
        }}
      >
        {label}
      </legend>
      <div
        role="radiogroup"
        style={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          gap: orientation === "vertical" ? "var(--space-2)" : "var(--space-4)",
        }}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: opt.disabled ? "var(--fg-subtle)" : "var(--fg-default)",
              cursor: opt.disabled ? "not-allowed" : "pointer",
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
              style={{
                width: "18px",
                height: "18px",
                accentColor: "var(--color-kaya-indigo)",
                cursor: opt.disabled ? "not-allowed" : "pointer",
                margin: 0,
              }}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
