import { forwardRef, type HTMLAttributes } from "react";

export type ContainerSize = "reading" | "content" | "wide" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const maxWidthMap: Record<ContainerSize, string> = {
  reading: "42.5rem",
  content: "75rem",
  wide: "90rem",
  full: "100%",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = "content", children, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: maxWidthMap[size],
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
