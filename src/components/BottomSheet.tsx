"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "content" | "half" | "full";
  children: ReactNode;
}

const sizeMaxHeight: Record<string, string> = {
  content: "85vh",
  half: "50vh",
  full: "90vh",
};

export function BottomSheet({
  open,
  onClose,
  title,
  size = "content",
  children,
  style,
  ...rest
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const scrollYRef = useRef(0);
  const onCloseRef = useRef(onClose);
  const reducedMotion = useReducedMotion();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalHost(document.body);
  }, []);

  onCloseRef.current = onClose;

  // Keyboard handling — separate effect so it doesn't churn the scroll lock
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab" && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
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
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Scroll lock + focus management — depends ONLY on `open`
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    scrollYRef.current = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const firstFocusable = sheetRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    });

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);

      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [open]);

  const duration = reducedMotion ? "0ms" : "300ms";

  if (!portalHost) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)" as unknown as number,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
      }}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={() => onCloseRef.current()}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 26, 26, 0.3)",
          opacity: open ? 1 : 0,
          transition: `opacity ${duration} ${open ? "ease-out" : "ease-in"}`,
          cursor: "pointer",
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          width: "100%",
          maxWidth: "480px",
          maxHeight: sizeMaxHeight[size],
          transform: open
            ? "translate(-50%, 0)"
            : "translate(-50%, 100%)",
          transition: `transform ${duration} ${open ? "ease-out" : "ease-in"}, visibility 0s ${open ? "0s" : duration}`,
          visibility: open ? "visible" : "hidden",
          borderRadius: "16px 16px 0 0",
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overscrollBehavior: "contain",
          ...style,
        }}
        {...rest}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "var(--space-3) 0 0",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "4px",
              borderRadius: "2px",
              background: "var(--border-default)",
            }}
          />
        </div>

        {title && (
          <div style={{ padding: "var(--space-3) var(--space-5) 0" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--fg-heading)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {title}
            </h2>
          </div>
        )}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-4) var(--space-5) var(--space-6)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    portalHost,
  );
}
