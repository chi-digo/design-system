"use client";

import { useEffect, useRef, useCallback, type HTMLAttributes, type ReactNode } from "react";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  title?: string;
  children: ReactNode;
}

const sizeMap = { sm: "16rem", md: "24rem", lg: "32rem" };

export function Drawer({
  open,
  onClose,
  position = "right",
  size = "md",
  title,
  children,
  style,
  ...rest
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: "var(--z-overlay)" as unknown as number }}>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, background: "rgba(26, 26, 26, 0.5)" }}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          [position]: 0,
          width: "100%",
          maxWidth: sizeMap[size],
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          ...style,
        }}
        {...rest}
      >
        {title && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-4) var(--space-4)",
            borderBottom: "var(--border-width-thin) solid var(--border-default)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              fontWeight: 600,
              color: "var(--fg-heading)",
              margin: 0,
            }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fg-muted)",
                fontSize: "var(--text-lg)",
                padding: "var(--space-1)",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflow: "auto", padding: "var(--space-4)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
