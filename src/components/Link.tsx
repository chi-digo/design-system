import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

export type LinkVariant = "inline" | "standalone";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  external?: boolean;
  underline?: "always" | "hover" | "none";
  iconRight?: ReactNode;
}

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: "2px", display: "inline-block", verticalAlign: "middle" }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "inline", external, underline, iconRight, children, style, ...rest },
  ref,
) {
  const resolvedUnderline = underline ?? (variant === "inline" ? "always" : "hover");

  return (
    <a
      ref={ref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: variant === "standalone" ? "var(--font-sans)" : "inherit",
        fontSize: variant === "standalone" ? "var(--text-sm)" : "inherit",
        fontWeight: variant === "standalone" ? 500 : "inherit",
        color: "var(--fg-link)",
        textDecoration: resolvedUnderline === "always" ? "underline" : "none",
        textUnderlineOffset: "2px",
        textDecorationColor: "color-mix(in srgb, var(--fg-link) 60%, transparent)",
        cursor: "pointer",
        transition: `color var(--duration-fast) var(--ease-default)`,
        ...style,
      }}
      {...rest}
    >
      {children}
      {external && <ExternalIcon />}
      {iconRight}
    </a>
  );
});
