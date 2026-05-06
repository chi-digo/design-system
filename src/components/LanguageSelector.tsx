"use client";

import { type HTMLAttributes } from "react";

export type LanguageValue = "auto" | "dig" | "en" | "sw";
export type LanguageSelectorVariant = "dropdown" | "segmented";

export interface LanguageSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: LanguageValue;
  onChange: (value: LanguageValue) => void;
  variant?: LanguageSelectorVariant;
}

const labels: Record<LanguageValue, string> = {
  auto: "Auto",
  dig: "Chidigo",
  en: "English",
  sw: "Kiswahili",
};

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);

export function LanguageSelector({ value, onChange, variant = "dropdown", style, ...rest }: LanguageSelectorProps) {
  if (variant === "segmented") {
    const options: LanguageValue[] = ["dig", "en", "sw"];
    return (
      <div
        role="radiogroup"
        aria-label="Language"
        style={{
          display: "inline-flex",
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin) solid var(--border-default)",
          overflow: "hidden",
          ...style,
        }}
        {...rest}
      >
        {options.map((lang) => (
          <button
            key={lang}
            role="radio"
            aria-checked={value === lang}
            onClick={() => onChange(lang)}
            style={{
              padding: "var(--space-1-5) var(--space-3)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              background: value === lang ? "var(--color-kaya-indigo)" : "var(--bg-surface)",
              color: value === lang ? "#FFFFFF" : "var(--fg-muted)",
              transition: `background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default)`,
            }}
          >
            {labels[lang]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", ...style }} {...rest}>
      <GlobeIcon />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageValue)}
        aria-label="Language"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--fg-default)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          appearance: "none",
          paddingRight: "var(--space-4)",
        }}
      >
        {(["auto", "dig", "en", "sw"] as LanguageValue[]).map((lang) => (
          <option key={lang} value={lang}>{labels[lang]}</option>
        ))}
      </select>
    </div>
  );
}
