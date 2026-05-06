import type { HTMLAttributes } from "react";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div";
}

export function VisuallyHidden({ as: Component = "span", style, children, ...rest }: VisuallyHiddenProps) {
  return (
    <Component
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
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
