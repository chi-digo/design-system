"use client";

import { useEffect, useRef, useCallback, type HTMLAttributes, type ReactNode } from "react";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  width?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  width = "28rem",
  style,
  ...rest
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      });
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)" as unknown as number,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 26, 26, 0.5)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: width,
          maxHeight: "85vh",
          borderRadius: "var(--radius-xl)",
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...style,
        }}
        {...rest}
      >
        <div style={{ padding: "var(--space-6) var(--space-6) 0" }}>
          <h2
            id="dialog-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              fontWeight: 600,
              color: "var(--fg-heading)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              id="dialog-description"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-muted)",
                margin: "var(--space-2) 0 0",
              }}
            >
              {description}
            </p>
          )}
        </div>
        <div style={{ padding: "var(--space-4) var(--space-6)", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
        {actions && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-2)",
              padding: "var(--space-4) var(--space-6)",
              borderTop: "var(--border-width-thin) solid var(--border-default)",
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
