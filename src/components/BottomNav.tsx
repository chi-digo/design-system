"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

export interface BottomNavProps extends HTMLAttributes<HTMLElement> {
  items: BottomNavItem[];
  renderLink?: (href: string, children: ReactNode, active: boolean) => ReactNode;
}

export function BottomNav({ items, renderLink, style, ...rest }: BottomNavProps) {
  return (
    <nav
      aria-label="Bottom navigation"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "56px",
        background: "var(--bg-surface)",
        borderTop: "var(--border-width-thin) solid var(--border-default)",
        zIndex: "var(--z-sticky)" as unknown as number,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        ...style,
      }}
      {...rest}
    >
      {items.slice(0, 5).map((item) => {
        const content = (
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "var(--space-1) var(--space-2)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.625rem",
              fontWeight: 500,
              color: item.active ? "var(--color-kaya-indigo)" : "var(--fg-muted)",
              textDecoration: "none",
              transition: `color var(--duration-fast) var(--ease-default)`,
            }}
          >
            <span style={{ display: "flex" }}>{item.icon}</span>
            {item.label}
          </span>
        );

        if (renderLink) {
          return <span key={item.href}>{renderLink(item.href, content, !!item.active)}</span>;
        }

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            style={{ textDecoration: "none" }}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
