"use client";

import { useState, type FormHTMLAttributes, type ReactNode } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
  onSubmit: (data: FormData) => Promise<void> | void;
  children: ReactNode | ((status: FormStatus) => ReactNode);
  validationMode?: "onBlur" | "onSubmit";
  errorSummary?: string;
}

export function Form({
  onSubmit,
  children,
  validationMode = "onBlur",
  errorSummary: errorSummaryProp,
  style,
  ...rest
}: FormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const displayError = errorSummaryProp ?? errorMessage;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={validationMode === "onSubmit"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        ...style,
      }}
      {...rest}
    >
      {displayError && status === "error" && (
        <div
          role="alert"
          style={{
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-md)",
            borderLeft: "3px solid var(--color-error-red)",
            background: "color-mix(in srgb, var(--color-error-red) 5%, var(--bg-surface))",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-error-red)",
          }}
        >
          {displayError}
        </div>
      )}
      {typeof children === "function" ? children(status) : children}
    </form>
  );
}
