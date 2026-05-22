"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { IconButton } from "./IconButton";

export type FavouriteButtonSize = "sm" | "md" | "lg";

export interface FavouriteButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  filled: boolean;
  onToggle: () => void;
  size?: FavouriteButtonSize;
  label: string;
}

const iconSizes: Record<FavouriteButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const activeKeyframes = `
.chidigo-fav-btn:active {
  transform: scale(0.85);
}
@media (prefers-reduced-motion: reduce) {
  .chidigo-fav-btn:active {
    transform: none;
  }
}
`;

function HeartIcon({ size, filled }: { size: number; filled: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export const FavouriteButton = forwardRef<HTMLButtonElement, FavouriteButtonProps>(
  function FavouriteButton({ filled, onToggle, size = "md", label, disabled, style, className, ...rest }, ref) {
    return (
      <>
        <style>{activeKeyframes}</style>
        <IconButton
          ref={ref}
          icon={<HeartIcon size={iconSizes[size]} filled={filled} />}
          label={label}
          variant="ghost"
          size={size}
          disabled={disabled}
          aria-pressed={filled}
          onClick={onToggle}
          className={`chidigo-fav-btn${className ? ` ${className}` : ""}`}
          style={{
            color: filled ? "var(--accent-favourite)" : "var(--fg-muted)",
            transition: "color var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-spring)",
            ...style,
          }}
          {...rest}
        />
      </>
    );
  },
);
