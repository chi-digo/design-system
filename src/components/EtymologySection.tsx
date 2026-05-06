import type { HTMLAttributes, ReactNode } from "react";

export interface EtymologySectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
}

export function EtymologySection({ content, style, ...rest }: EtymologySectionProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-base)",
        lineHeight: 1.55,
        color: "var(--fg-default)",
        ...style,
      }}
      {...rest}
    >
      {content}
    </div>
  );
}
