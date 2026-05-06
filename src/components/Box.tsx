import { forwardRef, type ElementType, type HTMLAttributes } from "react";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padding?: string;
  margin?: string;
  bg?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  display?: string;
  flex?: string;
  gap?: string;
  overflow?: string;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { as: Component = "div", padding, margin, bg, border, radius, shadow, display, flex, gap, overflow, style, children, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      style={{
        padding,
        margin,
        background: bg,
        border,
        borderRadius: radius,
        boxShadow: shadow,
        display,
        flex,
        gap,
        overflow,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType = "div">(props: BoxProps & { as?: T } & React.RefAttributes<HTMLElement>) => React.ReactElement | null;
