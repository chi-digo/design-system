"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  onClear?: () => void;
  iconLeft?: ReactNode;
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { label, onClear, iconLeft, value, placeholder = "Search…", style, ...rest },
  ref,
) {
  const autoId = useId();
  const id = rest.id ?? autoId;

  return (
    <div style={{ width: "100%", ...style }}>
      <style dangerouslySetInnerHTML={{ __html: `input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;appearance:none;}` }} />
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            color: "var(--fg-muted)",
            marginBottom: "var(--space-1)",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--fg-muted)",
            pointerEvents: "none",
          }}
        >
          {iconLeft ?? <SearchIcon />}
        </div>
        <input
          ref={ref}
          id={id}
          type="search"
          role="searchbox"
          value={value}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            padding: "var(--space-3) var(--space-4)",
            paddingLeft: "40px",
            paddingRight: value && onClear ? "40px" : "var(--space-4)",
            borderRadius: "var(--radius-full)",
            border: "var(--border-width-thin) solid var(--border-default)",
            background: "var(--bg-surface)",
            color: "var(--fg-default)",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            transition: `border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)`,
          }}
          {...rest}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--fg-muted)",
            }}
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </div>
  );
});
