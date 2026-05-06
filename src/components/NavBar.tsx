"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export type NavBarVariant = "landing" | "app";

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  variant?: NavBarVariant;
  logo?: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  transparent?: boolean;
}

export function NavBar({
  variant = "app",
  logo,
  search,
  actions,
  transparent = false,
  children,
  style,
  ...rest
}: NavBarProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        height: "48px",
        padding: "0 var(--space-4)",
        background: transparent ? "transparent" : "var(--bg-surface)",
        borderBottom: transparent ? "none" : "var(--border-width-thin) solid var(--border-default)",
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)" as unknown as number,
        ...style,
      }}
      {...rest}
    >
      {logo && <div style={{ flexShrink: 0 }}>{logo}</div>}
      {variant === "app" && search && (
        <div style={{ flex: 1, maxWidth: "32rem" }}>{search}</div>
      )}
      {children && (
        <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flex: variant === "landing" ? 1 : undefined }}>
          {children}
        </nav>
      )}
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginLeft: "auto" }}>
          {actions}
        </div>
      )}
    </header>
  );
}
