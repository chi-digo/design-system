"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  columns: DataTableColumn<T>[];
  data: T[];
  sortable?: boolean;
  emptyState?: ReactNode;
  rowKey?: (row: T, index: number) => string | number;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortable = false,
  emptyState,
  rowKey,
  style,
  ...rest
}: DataTableProps<T>) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortCol === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(key);
      setSortDir("asc");
    }
  };

  const sortedData = sortCol
    ? [...data].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  if (data.length === 0 && emptyState) {
    return <div style={style} {...rest}>{emptyState}</div>;
  }

  return (
    <div style={{ overflowX: "auto", ...style }} {...rest}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
      }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={sortable && col.sortable !== false ? () => handleSort(col.key) : undefined}
                style={{
                  textAlign: "left",
                  fontWeight: 500,
                  padding: "var(--space-3) var(--space-4)",
                  borderBottom: "2px solid var(--border-default)",
                  color: "var(--fg-muted)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  cursor: sortable && col.sortable !== false ? "pointer" : "default",
                  userSelect: sortable ? "none" : undefined,
                  width: col.width,
                  whiteSpace: "nowrap",
                }}
              >
                {col.header}
                {sortCol === col.key && (
                  <span style={{ marginLeft: "var(--space-1)" }}>{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr key={rowKey ? rowKey(row, i) : i}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    borderBottom: "var(--border-width-thin) solid var(--border-default)",
                    verticalAlign: "top",
                    color: "var(--fg-default)",
                  }}
                >
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
