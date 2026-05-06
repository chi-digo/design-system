import type { HTMLAttributes } from "react";

export type Track = "editorial" | "community";

export interface TrackBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  track: Track;
}

const trackConfig: Record<Track, { label: string; bg: string; color: string }> = {
  editorial: {
    label: "Editorial",
    bg: "var(--color-kaya-indigo)",
    color: "#FFFFFF",
  },
  community: {
    label: "Community",
    bg: "var(--color-mangrove-green)",
    color: "#FFFFFF",
  },
};

export function TrackBadge({ track, style, ...rest }: TrackBadgeProps) {
  const cfg = trackConfig[track];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        padding: "2px var(--space-2)",
        borderRadius: "var(--radius-full)",
        background: cfg.bg,
        color: cfg.color,
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      <span style={{
        width: "6px",
        height: "6px",
        borderRadius: "var(--radius-full)",
        background: "currentColor",
        opacity: 0.6,
      }} />
      {cfg.label}
    </span>
  );
}
