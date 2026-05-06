"use client";

import { useState, useRef, useEffect, useCallback, useId, type HTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: (SelectOption | SelectOptionGroup)[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

function isGroup(opt: SelectOption | SelectOptionGroup): opt is SelectOptionGroup {
  return "options" in opt;
}

function flatOptions(options: (SelectOption | SelectOptionGroup)[]): SelectOption[] {
  const result: SelectOption[] = [];
  for (const opt of options) {
    if (isGroup(opt)) result.push(...opt.options);
    else result.push(opt);
  }
  return result;
}

export function Select({
  label,
  options,
  placeholder,
  helperText,
  error,
  value,
  onChange,
  name,
  disabled,
  style,
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const selected = value ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const autoId = useId();
  const buttonId = `${autoId}-btn`;
  const listId = `${autoId}-list`;
  const helperId = `${autoId}-helper`;
  const errorId = `${autoId}-error`;

  const flat = flatOptions(options);
  const selectedOption = flat.find((o) => o.value === selected);
  const [focusIdx, setFocusIdx] = useState(-1);

  const handleSelect = useCallback((val: string) => {
    if (onChange) onChange(val);
    else setInternalValue(val);
    setOpen(false);
  }, [onChange]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      const idx = flat.findIndex((o) => o.value === selected);
      setFocusIdx(idx >= 0 ? idx : 0);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, handleClickOutside, selected, flat]);

  useEffect(() => {
    if (open && listRef.current && focusIdx >= 0) {
      const el = listRef.current.children[focusIdx] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [focusIdx, open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusIdx((i) => {
          let next = i + 1;
          while (next < flat.length && flat[next].disabled) next++;
          return next < flat.length ? next : i;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusIdx((i) => {
          let next = i - 1;
          while (next >= 0 && flat[next].disabled) next--;
          return next >= 0 ? next : i;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusIdx >= 0 && !flat[focusIdx].disabled) {
          handleSelect(flat[focusIdx].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setFocusIdx(0);
        break;
      case "End":
        e.preventDefault();
        setFocusIdx(flat.length - 1);
        break;
    }
  };

  let optionIndex = 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", ...style }} ref={containerRef} {...rest}>
      {name && <input type="hidden" name={name} value={selected} />}
      <label
        id={`${autoId}-label`}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--fg-default)",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          id={buttonId}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-labelledby={`${autoId}-label`}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={!!error}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            padding: "var(--space-3) var(--space-8) var(--space-3) var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: `var(--border-width-thin) solid ${error ? "var(--color-error-red)" : "var(--border-default)"}`,
            background: "var(--bg-surface)",
            color: selectedOption ? "var(--fg-default)" : "var(--fg-muted)",
            outline: "none",
            width: "100%",
            textAlign: "left",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            transition: "border-color var(--duration-fast) var(--ease-default)",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder ?? "Select…"}
        </button>
        <ChevronDown rotated={open} />

        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={`${autoId}-label`}
            style={{
              position: "absolute",
              top: "calc(100% + var(--space-1))",
              left: 0,
              right: 0,
              zIndex: "var(--z-dropdown)" as unknown as number,
              background: "var(--bg-surface)",
              border: "var(--border-width-thin) solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              padding: "var(--space-1) 0",
              margin: 0,
              listStyle: "none",
              maxHeight: "15rem",
              overflowY: "auto",
            }}
          >
            {options.map((opt) => {
              if (isGroup(opt)) {
                return (
                  <li key={opt.label} role="presentation">
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: "var(--fg-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        padding: "var(--space-2) var(--space-3) var(--space-1)",
                      }}
                    >
                      {opt.label}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {opt.options.map((o) => {
                        const idx = optionIndex++;
                        return (
                          <OptionItem
                            key={o.value}
                            option={o}
                            isSelected={o.value === selected}
                            isFocused={idx === focusIdx}
                            onSelect={handleSelect}
                            onHover={() => setFocusIdx(idx)}
                          />
                        );
                      })}
                    </ul>
                  </li>
                );
              }
              const idx = optionIndex++;
              return (
                <OptionItem
                  key={opt.value}
                  option={opt}
                  isSelected={opt.value === selected}
                  isFocused={idx === focusIdx}
                  onSelect={handleSelect}
                  onHover={() => setFocusIdx(idx)}
                />
              );
            })}
          </ul>
        )}
      </div>
      {error ? (
        <span id={errorId} role="alert" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--color-error-red)" }}>
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}

function OptionItem({
  option,
  isSelected,
  isFocused,
  onSelect,
  onHover,
}: {
  option: SelectOption;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (value: string) => void;
  onHover: () => void;
}) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!option.disabled) onSelect(option.value);
      }}
      onMouseEnter={onHover}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        padding: "var(--space-2) var(--space-3)",
        cursor: option.disabled ? "not-allowed" : "pointer",
        opacity: option.disabled ? 0.4 : 1,
        background: isFocused ? "var(--bg-surface-muted)" : "transparent",
        color: isSelected ? "var(--fg-heading)" : "var(--fg-default)",
        fontWeight: isSelected ? 500 : 400,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
      }}
    >
      <span style={{ width: "1rem", flexShrink: 0, textAlign: "center" }}>
        {isSelected && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {option.label}
    </li>
  );
}

function ChevronDown({ rotated }: { rotated: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "var(--space-3)",
        top: "50%",
        transform: rotated ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
        pointerEvents: "none",
        color: "var(--fg-muted)",
        transition: "transform var(--duration-fast) var(--ease-default)",
      }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
