import type { HTMLAttributes } from "react";

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

function computePoints(
  data: number[],
  width: number,
  height: number,
  padding: number,
): string {
  let min = data[0];
  let max = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] < min) min = data[i];
    if (data[i] > max) max = data[i];
  }
  const range = max - min || 1;
  const usableHeight = height - padding * 2;
  const stepX = width / (data.length - 1);

  return data
    .map((v, i) => {
      const x = i * stepX;
      const y = padding + usableHeight - ((v - min) / range) * usableHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

export function Sparkline({
  data,
  width = 120,
  height = 32,
  color = "var(--fg-muted)",
  strokeWidth = 1.5,
  style,
  ...rest
}: SparklineProps) {
  if (data.length < 2) return null;

  const padding = 4;
  const points = computePoints(data, width, height, padding);

  return (
    <div
      role="img"
      style={{ display: "inline-flex", lineHeight: 0, ...style }}
      {...rest}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
