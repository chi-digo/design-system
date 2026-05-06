import { forwardRef, type HTMLAttributes } from "react";

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string;
  align?: "start" | "center" | "end" | "baseline";
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { gap = "var(--space-3)", align = "center", wrap = true, children, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
