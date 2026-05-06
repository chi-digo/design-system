"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode, type HTMLAttributes } from "react";

export interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  align?: "start" | "end";
}

export function DropdownMenu({ trigger, items, align = "start", style, ...rest }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, handleClickOutside, handleKeyDown]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", ...style }} {...rest}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "100%",
            [align === "end" ? "right" : "left"]: 0,
            marginTop: "var(--space-1)",
            minWidth: "10rem",
            padding: "var(--space-1)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-surface)",
            border: "var(--border-width-thin) solid var(--border-default)",
            boxShadow: "var(--shadow-lg)",
            zIndex: "var(--z-dropdown)" as unknown as number,
          }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                width: "100%",
                padding: "var(--space-2) var(--space-3)",
                border: "none",
                borderRadius: "var(--radius-md)",
                background: "transparent",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: item.destructive ? "var(--color-error-red)" : item.disabled ? "var(--fg-subtle)" : "var(--fg-default)",
                cursor: item.disabled ? "not-allowed" : "pointer",
                textAlign: "left",
                opacity: item.disabled ? 0.5 : 1,
                transition: `background var(--duration-fast) var(--ease-default)`,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
