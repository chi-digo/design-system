import type { HTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string;
}

const sizePx: Record<AvatarSize, string> = {
  sm: "var(--space-8)",
  md: "var(--space-10)",
  lg: "var(--space-12)",
  xl: "var(--space-16)",
};

const fontSizeMap: Record<AvatarSize, string> = {
  sm: "var(--text-xs)",
  md: "var(--text-sm)",
  lg: "var(--text-base)",
  xl: "var(--text-lg)",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, size = "md", fallback, style, ...rest }: AvatarProps) {
  const initials = fallback ?? getInitials(alt);

  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        width: sizePx[size],
        height: sizePx[size],
        borderRadius: "var(--radius-full)",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: src ? "transparent" : "var(--color-kaya-indigo)",
        color: "#FFFFFF",
        fontFamily: "var(--font-sans)",
        fontSize: fontSizeMap[size],
        fontWeight: 500,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
