import type { HTMLAttributes } from "react";

export interface IPAProps extends HTMLAttributes<HTMLSpanElement> {
  transcription: string;
}

export function IPA({ transcription, style, ...rest }: IPAProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        color: "var(--fg-default)",
        opacity: 0.7,
        ...style,
      }}
      {...rest}
    >
      {transcription}
    </span>
  );
}
