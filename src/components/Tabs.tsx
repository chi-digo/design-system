"use client";

import { useState, useId, type HTMLAttributes, type ReactNode } from "react";

export interface TabItem {
  id?: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultIndex?: number;
  onTabChange?: (index: number, item: TabItem) => void;
}

export function Tabs({ items, defaultIndex = 0, onTabChange, style, ...rest }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const baseId = useId();

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % items.length;
      while (items[newIndex]?.disabled && newIndex !== index) {
        newIndex = (newIndex + 1) % items.length;
      }
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + items.length) % items.length;
      while (items[newIndex]?.disabled && newIndex !== index) {
        newIndex = (newIndex - 1 + items.length) % items.length;
      }
    } else if (e.key === "Home") {
      newIndex = items.findIndex((t) => !t.disabled);
    } else if (e.key === "End") {
      for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].disabled) { newIndex = i; break; }
      }
    } else {
      return;
    }
    e.preventDefault();
    if (newIndex !== index) {
      setActiveIndex(newIndex);
      onTabChange?.(newIndex, items[newIndex]);
    }
    document.getElementById(`${baseId}-tab-${newIndex}`)?.focus();
  };

  return (
    <div style={style} {...rest}>
      <div
        role="tablist"
        style={{
          display: "flex",
          borderBottom: "var(--border-width-thick) solid var(--border-default)",
          gap: 0,
        }}
      >
        {items.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.id ?? i}
              id={`${baseId}-tab-${i}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${i}`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => { if (!tab.disabled && i !== activeIndex) { setActiveIndex(i); onTabChange?.(i, items[i]); } }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{
                padding: "var(--space-3) var(--space-4)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: tab.disabled ? "var(--fg-subtle)" : isActive ? "var(--color-kaya-indigo)" : "var(--fg-muted)",
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid var(--color-kaya-indigo)" : "2px solid transparent",
                marginBottom: "-2px",
                cursor: tab.disabled ? "not-allowed" : "pointer",
                opacity: tab.disabled ? 0.5 : 1,
                transition: `color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)`,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {items.map((tab, i) => (
        <div
          key={tab.id ?? i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== activeIndex}
          tabIndex={0}
          style={{
            padding: "var(--space-4) 0",
          }}
        >
          {i === activeIndex && tab.content}
        </div>
      ))}
    </div>
  );
}
