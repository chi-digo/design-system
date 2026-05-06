import { forwardRef, type HTMLAttributes } from "react";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { gap = "var(--space-2)", children, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
