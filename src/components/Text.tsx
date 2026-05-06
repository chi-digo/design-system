import { forwardRef, type HTMLAttributes, type ElementType } from "react";

export type TextVariant = "body" | "body-lg" | "body-sm" | "ui" | "ui-sm" | "mono";
export type TextColor = "default" | "heading" | "muted" | "subtle" | "link" | "error" | "success";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  lang?: "dig" | "en" | "sw";
  as?: ElementType;
  weight?: "regular" | "medium" | "semibold";
}

const variantStyles: Record<TextVariant, React.CSSProperties> = {
  body: { fontFamily: "var(--font-serif)", fontSize: "var(--text-base)", lineHeight: 1.55, letterSpacing: "0" },
  "body-lg": { fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", lineHeight: 1.55, letterSpacing: "0" },
  "body-sm": { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: 1.50, letterSpacing: "0.005em" },
  ui: { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: 1.40, letterSpacing: "0.005em" },
  "ui-sm": { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", lineHeight: 1.40, letterSpacing: "0.01em" },
  mono: { fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", lineHeight: 1.55, letterSpacing: "0" },
};

const colorMap: Record<TextColor, string> = {
  default: "var(--fg-default)",
  heading: "var(--fg-heading)",
  muted: "var(--fg-muted)",
  subtle: "var(--fg-subtle)",
  link: "var(--fg-link)",
  error: "var(--color-error)",
  success: "var(--color-success)",
};

const weightMap = { regular: 400, medium: 500, semibold: 600 };

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { variant = "body", color = "default", lang, as, weight, children, style, ...rest },
  ref,
) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      ref={ref}
      lang={lang}
      style={{
        margin: 0,
        ...variantStyles[variant],
        color: colorMap[color],
        ...(weight ? { fontWeight: weightMap[weight] } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});
