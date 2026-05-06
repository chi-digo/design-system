import type { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "strong";
}

export function Divider({ orientation = "horizontal", variant = "default", style, ...rest }: DividerProps) {
  const color = variant === "strong" ? "var(--border-strong)" : "var(--border-default)";

  if (orientation === "vertical") {
    return (
      <hr
        aria-orientation="vertical"
        style={{
          border: "none",
          width: "1px",
          alignSelf: "stretch",
          background: color,
          margin: 0,
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <hr
      style={{
        border: "none",
        height: "1px",
        background: color,
        margin: 0,
        ...style,
      }}
      {...rest}
    />
  );
}
