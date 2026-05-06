import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const shimmerKeyframes = `
@keyframes chidigo-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--border-default) 25%, var(--bg-surface-muted) 50%, var(--border-default) 75%)",
  backgroundSize: "200% 100%",
  animation: "chidigo-shimmer 1.5s ease-in-out infinite",
};

export function Skeleton({ variant = "text", width, height, lines = 1, style, ...rest }: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", width, ...style }} {...rest}>
        <style>{shimmerKeyframes}</style>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              height: height ?? "1em",
              borderRadius: "var(--radius-sm)",
              width: i === lines - 1 ? "75%" : "100%",
              ...shimmerStyle,
            }}
          />
        ))}
      </div>
    );
  }

  const borderRadius =
    variant === "circular" ? "var(--radius-full)" : variant === "rectangular" ? "var(--radius-md)" : "var(--radius-sm)";

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div
        aria-hidden="true"
        style={{
          width: width ?? (variant === "circular" ? "var(--space-10)" : "100%"),
          height: height ?? (variant === "circular" ? "var(--space-10)" : variant === "rectangular" ? "6rem" : "1em"),
          borderRadius,
          ...shimmerStyle,
          ...style,
        }}
        {...rest}
      />
    </>
  );
}
