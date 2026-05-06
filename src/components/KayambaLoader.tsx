import type { HTMLAttributes } from "react";

export type KayambaLoaderSize = "sm" | "md" | "lg";

export interface KayambaLoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: KayambaLoaderSize;
  label?: string;
}

const sizeConfig: Record<KayambaLoaderSize, { lines: number; height: number; gap: number }> = {
  sm: { lines: 5, height: 16, gap: 2 },
  md: { lines: 7, height: 24, gap: 3 },
  lg: { lines: 9, height: 32, gap: 3 },
};

const keyframes = `
@keyframes chidigo-kayamba {
  0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
  50% { transform: scaleY(1); opacity: 1; }
}
`;

export function KayambaLoader({ size = "md", label = "Loading", style, ...rest }: KayambaLoaderProps) {
  const cfg = sizeConfig[size];

  return (
    <div
      role="status"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${cfg.gap}px`,
        height: `${cfg.height}px`,
        ...style,
      }}
      {...rest}
    >
      <style>{keyframes}</style>
      {Array.from({ length: cfg.lines }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            width: "2px",
            height: "100%",
            background: "var(--color-kaya-indigo)",
            borderRadius: "1px",
            transformOrigin: "center",
            animation: `chidigo-kayamba 0.8s ease-in-out infinite`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
      <span style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}
