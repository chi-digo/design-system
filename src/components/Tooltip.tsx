"use client";

import { useState, useRef, useId, type ReactNode, type HTMLAttributes } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
}

const placementStyles: Record<TooltipPlacement, React.CSSProperties> = {
  top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "var(--space-2)" },
  bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "var(--space-2)" },
  left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "var(--space-2)" },
  right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "var(--space-2)" },
};

export function Tooltip({ content, children, placement = "top", delay = 200, style, ...rest }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipId = useId();

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...rest}
    >
      <div aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </div>
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          style={{
            position: "absolute",
            ...placementStyles[placement],
            padding: "var(--space-1-5) var(--space-3)",
            borderRadius: "var(--radius-md)",
            background: "var(--color-vigango-black)",
            color: "var(--color-hando-cream)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            lineHeight: 1.4,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: "var(--z-tooltip)" as unknown as number,
            boxShadow: "var(--shadow-md)",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
