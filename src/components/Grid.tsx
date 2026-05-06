import { forwardRef, type HTMLAttributes } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  minChildWidth?: string;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  placeItems?: string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, rows, gap = "var(--space-4)", rowGap, columnGap, minChildWidth, alignItems, justifyItems, placeItems, children, style, ...rest },
  ref,
) {
  const gridTemplateColumns = minChildWidth
    ? `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`
    : typeof columns === "number"
      ? `repeat(${columns}, 1fr)`
      : columns ?? "1fr";

  const gridTemplateRows = rows
    ? typeof rows === "number"
      ? `repeat(${rows}, 1fr)`
      : rows
    : undefined;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gap: rowGap || columnGap ? undefined : gap,
        rowGap: rowGap,
        columnGap: columnGap,
        alignItems,
        justifyItems,
        placeItems,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
