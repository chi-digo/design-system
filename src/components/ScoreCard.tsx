"use client";

import type { HTMLAttributes, ReactNode } from "react";

export interface ScoreBreakdown {
  category: string;
  correct: number;
  total: number;
}

export interface ScoreCardProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  total: number;
  breakdown?: ScoreBreakdown[];
  message: string;
  actions?: ReactNode;
}

export function ScoreCard({
  score,
  total,
  breakdown,
  message,
  actions,
  style,
  ...rest
}: ScoreCardProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (circumference * pct) / 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-5)",
        padding: "var(--space-6)",
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        textAlign: "center",
        ...style,
      }}
      {...rest}
    >
      {/* Score ring */}
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--bg-surface-muted)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={pct >= 80 ? "var(--color-success-green)" : pct >= 50 ? "var(--color-mnazi-gold)" : "var(--color-error-red)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: `stroke-dashoffset var(--duration-slow) var(--ease-default)`,
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--fg-default)",
              lineHeight: 1,
            }}
          >
            {score}/{total}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              color: "var(--fg-subtle)",
            }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Message */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-lg)",
          fontWeight: 500,
          color: "var(--fg-default)",
          margin: 0,
        }}
      >
        {message}
      </p>

      {/* Breakdown */}
      {breakdown && breakdown.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            width: "100%",
            maxWidth: "360px",
          }}
        >
          {breakdown.map((b) => (
            <div
              key={b.category}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
              }}
            >
              <span style={{ color: "var(--fg-muted)" }}>{b.category}</span>
              <span
                style={{
                  fontWeight: 500,
                  color:
                    b.correct === b.total
                      ? "var(--color-success-green)"
                      : "var(--fg-default)",
                }}
              >
                {b.correct}/{b.total}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
