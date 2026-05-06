interface ColorSwatchProps {
  name: string;
  hex: string;
  cssVar: string;
  source?: string;
  textColor?: string;
}

export function ColorSwatch({ name, hex, cssVar, source, textColor = "#FFFFFF" }: ColorSwatchProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div
        style={{
          width: "100%",
          height: "80px",
          borderRadius: "var(--radius-lg)",
          background: hex,
          display: "flex",
          alignItems: "flex-end",
          padding: "0.75rem",
          border: "1px solid var(--border-default)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: textColor,
          }}
        >
          {hex}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.875rem", color: "var(--fg-default)" }}>
          {name}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
          {cssVar}
        </div>
        {source && (
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", color: "var(--fg-subtle)", fontStyle: "italic", marginTop: "0.25rem" }}>
            {source}
          </div>
        )}
      </div>
    </div>
  );
}
