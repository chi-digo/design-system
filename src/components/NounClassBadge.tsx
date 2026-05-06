import type { HTMLAttributes } from "react";

export interface NounClassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  nounClass: string;
  variant?: "default" | "compact";
}

export function NounClassBadge({ nounClass, variant = "default", style, ...rest }: NounClassBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        borderRadius: "var(--radius-full)",
        background: "var(--color-mangrove-green)",
        color: "#FFFFFF",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...(variant === "compact"
          ? { fontSize: "0.625rem", padding: "1px var(--space-1-5)" }
          : { fontSize: "var(--text-xs)", padding: "2px var(--space-2)" }),
        ...style,
      }}
      {...rest}
    >
      {variant === "compact" ? nounClass : `cl. ${nounClass}`}
    </span>
  );
}
