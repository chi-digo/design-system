interface TokenRow {
  token: string;
  value: string;
  preview?: React.ReactNode;
}

export function TokenTable({ rows, columns = ["Token", "Value", "Preview"] }: { rows: TokenRow[]; columns?: string[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} style={{
                textAlign: "left", fontWeight: 500, padding: "0.75rem 1rem",
                borderBottom: "2px solid var(--border-default)", color: "var(--fg-muted)",
                fontSize: "0.75rem", letterSpacing: "0.01em", textTransform: "uppercase",
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>
                {row.token}
              </td>
              <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                {row.value}
              </td>
              {row.preview !== undefined && (
                <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>
                  {row.preview}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
