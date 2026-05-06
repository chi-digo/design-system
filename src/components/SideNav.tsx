"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

export interface SideNavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  children?: SideNavItem[];
}

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  items: SideNavItem[];
  collapsible?: boolean;
  renderLink?: (href: string, children: ReactNode, active: boolean) => ReactNode;
}

function NavItemComponent({ item, renderLink, depth = 0 }: { item: SideNavItem; renderLink?: SideNavProps["renderLink"]; depth?: number }) {
  const [open, setOpen] = useState(item.active || item.children?.some((c) => c.active) || false);
  const hasChildren = item.children && item.children.length > 0;

  const labelContent = (
    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
      {item.icon}
      {item.label}
    </span>
  );

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: `var(--space-2) var(--space-3)`,
    paddingLeft: `calc(var(--space-3) + ${depth * 12}px)`,
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: item.active ? 500 : 400,
    color: item.active ? "var(--color-kaya-indigo)" : "var(--fg-default)",
    background: item.active ? "color-mix(in srgb, var(--color-kaya-indigo) 8%, transparent)" : "transparent",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: `background var(--duration-fast) var(--ease-default)`,
  };

  return (
    <li style={{ listStyle: "none" }}>
      {hasChildren ? (
        <>
          <button type="button" onClick={() => setOpen(!open)} style={itemStyle}>
            {labelContent}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: `transform var(--duration-fast) var(--ease-default)` }}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {open && (
            <ul style={{ padding: 0, margin: 0 }}>
              {item.children!.map((child, i) => (
                <NavItemComponent key={`${depth}-${i}`} item={child} renderLink={renderLink} depth={depth + 1} />
              ))}
            </ul>
          )}
        </>
      ) : item.href ? (
        renderLink ? (
          renderLink(item.href, labelContent, !!item.active)
        ) : (
          <a href={item.href} style={itemStyle}>{labelContent}</a>
        )
      ) : (
        <span style={itemStyle}>{labelContent}</span>
      )}
    </li>
  );
}

export function SideNav({ items, collapsible, renderLink, style, ...rest }: SideNavProps) {
  return (
    <nav aria-label="Side navigation" style={style} {...rest}>
      <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
        {items.map((item, i) => (
          <NavItemComponent key={`root-${i}`} item={item} renderLink={renderLink} />
        ))}
      </ul>
    </nav>
  );
}
