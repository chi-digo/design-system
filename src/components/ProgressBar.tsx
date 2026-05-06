import type { HTMLAttributes } from "react";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
  variant?: "default" | "success" | "error";
  indeterminate?: boolean;
  size?: "sm" | "md";
}

const colorMap = {
  default: "var(--color-kaya-indigo)",
  success: "var(--color-success-green)",
  error: "var(--color-error-red)",
};

const heightMap = { sm: "4px", md: "8px" };

const indeterminateKeyframes = `
@keyframes chidigo-progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  variant = "default",
  indeterminate = false,
  size = "md",
  style,
  ...rest
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={style} {...rest}>
      {label && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "var(--space-1)",
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-default)" }}>
            {label}
          </span>
          {!indeterminate && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-muted)" }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={{
          height: heightMap[size],
          borderRadius: "var(--radius-full)",
          background: "var(--border-default)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {indeterminate && <style>{indeterminateKeyframes}</style>}
        <div
          style={{
            height: "100%",
            borderRadius: "var(--radius-full)",
            background: colorMap[variant],
            transition: indeterminate ? "none" : `width var(--duration-moderate) var(--ease-default)`,
            ...(indeterminate
              ? { width: "25%", animation: "chidigo-progress 1.5s ease-in-out infinite" }
              : { width: `${pct}%` }),
          }}
        />
      </div>
    </div>
  );
}
