import { forwardRef, type HTMLAttributes, type ElementType } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  as?: ElementType;
  lang?: "dig" | "en" | "sw";
}

const levelStyles: Record<HeadingLevel, React.CSSProperties> = {
  1: { fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "0" },
  2: { fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 600, lineHeight: 1.20, letterSpacing: "0" },
  3: { fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)", fontWeight: 600, lineHeight: 1.30, letterSpacing: "0" },
  4: { fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", fontWeight: 600, lineHeight: 1.40, letterSpacing: "0.005em" },
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level, as, lang, children, style, ...rest },
  ref,
) {
  const Component = (as ?? `h${level}`) as ElementType;

  return (
    <Component
      ref={ref}
      lang={lang}
      style={{
        color: "var(--fg-heading)",
        margin: 0,
        ...levelStyles[level],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});
