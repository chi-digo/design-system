import { forwardRef, type HTMLAttributes, type ElementType } from "react";

export type DisplaySize = "lg" | "xl";

export interface DisplayTextProps extends HTMLAttributes<HTMLElement> {
  size?: DisplaySize;
  lang?: "dig" | "en" | "sw";
  as?: ElementType;
}

const sizeStyles: Record<DisplaySize, React.CSSProperties> = {
  lg: { fontSize: "var(--text-4xl)", lineHeight: 1.10, letterSpacing: "-0.005em" },
  xl: { fontSize: "var(--text-5xl)", lineHeight: 1.05, letterSpacing: "-0.01em" },
};

export const DisplayText = forwardRef<HTMLElement, DisplayTextProps>(function DisplayText(
  { size = "lg", lang, as, children, style, ...rest },
  ref,
) {
  const Component = (as ?? "h1") as ElementType;

  return (
    <Component
      ref={ref}
      lang={lang}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        color: "var(--fg-heading)",
        margin: 0,
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});
