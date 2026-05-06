"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, type NavItem } from "@/lib/navigation";
import { ThemeToggle } from "./ThemeToggle";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/getting-started": "Getting started",
  "/foundations": "Foundations",
  "/foundations/color": "Foundations / Color",
  "/foundations/typography": "Foundations / Typography",
  "/foundations/spacing": "Foundations / Spacing",
  "/foundations/elevation": "Foundations / Elevation",
  "/foundations/motion": "Foundations / Motion",
  "/foundations/motifs": "Foundations / Motifs",
  "/components": "Components",
  "/patterns": "Patterns",
};

function usePageTitle() {
  const pathname = usePathname();
  return pageTitles[pathname] || pathname.split("/").filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" / ");
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const basePath = item.href.split("#")[0];
  const isActive = pathname === item.href || pathname === basePath;
  const isParentActive = item.children?.some(
    (c) => pathname === c.href.split("#")[0] || c.children?.some((gc) => pathname === gc.href.split("#")[0])
  );
  const shouldExpand = isParentActive || isActive || (basePath !== "/" && pathname.startsWith(basePath));

  const paddingLeft = depth === 0 ? "0" : depth === 1 ? "1rem" : "2rem";
  const isGroupLabel = depth === 1 && !!item.children;

  return (
    <li>
      <Link
        href={item.href}
        className="block transition-colors"
        style={{
          paddingLeft,
          paddingTop: isGroupLabel ? "0.5rem" : "0.25rem",
          paddingBottom: "0.25rem",
          fontFamily: "var(--font-sans)",
          fontSize: depth === 0 ? "0.875rem" : depth === 1 ? "0.75rem" : "0.8125rem",
          fontWeight: depth === 0 && isActive ? 600 : isGroupLabel ? 600 : 400,
          color: depth === 0 && isActive
            ? "var(--fg-heading)"
            : isGroupLabel
              ? "var(--fg-heading)"
              : "var(--fg-muted)",
          textTransform: isGroupLabel ? "uppercase" : "none",
          letterSpacing: isGroupLabel ? "0.04em" : "normal",
          textDecoration: "none",
        }}
      >
        {item.label}
      </Link>
      {item.children && shouldExpand && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "var(--bg-overlay)" }}
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[280px] overflow-y-auto transition-transform md:sticky md:top-0 md:z-0 md:translate-x-0 md:h-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border-default)",
          padding: "1.5rem",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Link
          href="/"
          className="block mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.375rem",
            fontWeight: 600,
            color: "var(--fg-heading)",
            textDecoration: "none",
          }}
          onClick={onClose}
        >
          Chidigo
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--fg-muted)",
              letterSpacing: "0.01em",
              marginTop: "0.125rem",
            }}
          >
            Design System
          </span>
        </Link>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navigation.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border-default)" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--fg-subtle)",
              marginBottom: "0.5rem",
            }}
          >
            v0.1.0
          </div>
        </div>
      </aside>
    </>
  );
}

export function DocShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 h-12 md:hidden"
          style={{
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-default)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--fg-default)",
              padding: "0.5rem",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--fg-heading)",
            }}
          >
            Chidigo
          </span>
          <ThemeToggle />
        </header>

        <div className="hidden md:flex items-center justify-between h-12"
          style={{ borderBottom: "1px solid var(--border-default)", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--fg-muted)",
          }}>
            {pageTitle}
          </span>
          <ThemeToggle />
        </div>

        <main className="flex-1" style={{ padding: "2.5rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
