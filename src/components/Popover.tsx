"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode, type HTMLAttributes } from "react";

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  trigger: ReactNode;
  content: ReactNode;
  position?: PopoverPosition;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const positionStyles: Record<PopoverPosition, React.CSSProperties> = {
  top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "var(--space-2)" },
  bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "var(--space-2)" },
  left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "var(--space-2)" },
  right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "var(--space-2)" },
};

export function Popover({ trigger, content, position = "bottom", open: controlledOpen, onOpenChange, style, ...rest }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, [setOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", ...style }} {...rest}>
      <div onClick={() => setOpen(!isOpen)} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            ...positionStyles[position],
            padding: "var(--space-4)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-surface)",
            border: "var(--border-width-thin) solid var(--border-default)",
            boxShadow: "var(--shadow-lg)",
            zIndex: "var(--z-dropdown)" as unknown as number,
            minWidth: "12rem",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
