"use client";

import { useState, useId, type HTMLAttributes, type ReactNode } from "react";

export interface AccordionItem {
  id?: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transition: `transform var(--duration-fast) var(--ease-default)`,
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function Accordion({ items, allowMultiple = false, style, ...rest }: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const defaults = new Set<number>();
    items.forEach((item, i) => {
      if (item.defaultOpen) defaults.add(i);
    });
    return defaults;
  });

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => {
        const open = openItems.has(i);
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.id ?? i}>
            {i > 0 && <div style={{ borderTop: "var(--border-width-thin) solid var(--border-default)" }} />}
            <h3 style={{ margin: 0 }}>
              <button
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "var(--space-4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-base)",
                  fontWeight: 600,
                  color: "var(--fg-default)",
                  textAlign: "left",
                }}
              >
                {item.title}
                <ChevronIcon open={open} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!open}
              style={{
                padding: open ? "0 var(--space-4) var(--space-4)" : undefined,
              }}
            >
              {open && (
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.55,
                  color: "var(--fg-default)",
                }}>
                  {item.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
