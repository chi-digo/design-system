import { forwardRef, type HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string;
  align?: "start" | "center" | "end" | "stretch";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = "var(--space-4)", align = "stretch", children, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
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
