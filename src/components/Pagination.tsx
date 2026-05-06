"use client";

import { type HTMLAttributes } from "react";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  variant?: "default" | "simple";
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
);

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({ totalPages, currentPage, onChange, variant = "default", style, ...rest }: PaginationProps) {
  if (totalPages <= 1) return null;

  const btnBase: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minWidth: "var(--space-8)", height: "var(--space-8)", borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500,
    border: "none", cursor: "pointer", padding: "0 var(--space-2)",
    transition: `background var(--duration-fast) var(--ease-default)`,
  };

  return (
    <nav aria-label="Pagination" style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", ...style }} {...rest}>
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        style={{ ...btnBase, background: "transparent", color: currentPage <= 1 ? "var(--fg-subtle)" : "var(--fg-default)", opacity: currentPage <= 1 ? 0.5 : 1 }}
      >
        <ChevronLeft />
        {variant === "simple" && <span style={{ marginLeft: "var(--space-1)" }}>Prev</span>}
      </button>

      {variant === "default" && getPageNumbers(currentPage, totalPages).map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e${i}`} style={{ ...btnBase, background: "transparent", color: "var(--fg-subtle)", cursor: "default" }}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            style={{
              ...btnBase,
              background: p === currentPage ? "var(--color-kaya-indigo)" : "transparent",
              color: p === currentPage ? "#FFFFFF" : "var(--fg-default)",
            }}
          >
            {p}
          </button>
        ),
      )}

      {variant === "simple" && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)", padding: "0 var(--space-2)" }}>
          {currentPage} / {totalPages}
        </span>
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        style={{ ...btnBase, background: "transparent", color: currentPage >= totalPages ? "var(--fg-subtle)" : "var(--fg-default)", opacity: currentPage >= totalPages ? 0.5 : 1 }}
      >
        {variant === "simple" && <span style={{ marginRight: "var(--space-1)" }}>Next</span>}
        <ChevronRight />
      </button>
    </nav>
  );
}
