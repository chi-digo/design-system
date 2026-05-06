import type { Metadata } from "next";

export const metadata: Metadata = { title: "Spacing" };

const spacingScale = [
  { token: "--space-0-5", value: "2px", px: 2 },
  { token: "--space-1", value: "4px", px: 4 },
  { token: "--space-1-5", value: "6px", px: 6 },
  { token: "--space-2", value: "8px", px: 8 },
  { token: "--space-3", value: "12px", px: 12 },
  { token: "--space-4", value: "16px", px: 16 },
  { token: "--space-5", value: "20px", px: 20 },
  { token: "--space-6", value: "24px", px: 24 },
  { token: "--space-8", value: "32px", px: 32 },
  { token: "--space-10", value: "40px", px: 40 },
  { token: "--space-12", value: "48px", px: 48 },
  { token: "--space-16", value: "64px", px: 64 },
  { token: "--space-20", value: "80px", px: 80 },
  { token: "--space-24", value: "96px", px: 96 },
];

const radiusScale = [
  { token: "--radius-none", value: "0", px: 0 },
  { token: "--radius-sm", value: "4px", px: 4 },
  { token: "--radius-md", value: "8px", px: 8 },
  { token: "--radius-lg", value: "12px", px: 12 },
  { token: "--radius-xl", value: "16px", px: 16 },
  { token: "--radius-full", value: "9999px", px: 9999 },
];

export default function SpacingPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Spacing
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        Base-4 spacing scale with 2px increments for fine control. All margin, padding,
        and gap values must use scale tokens.
      </p>

      <h2>Spacing scale</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {spacingScale.map((s) => (
          <div key={s.token} style={{
            display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0",
            borderBottom: "1px solid var(--border-default)",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-muted)", minWidth: "8rem" }}>
              {s.token}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-subtle)", minWidth: "3rem" }}>
              {s.value}
            </span>
            <div style={{
              height: "12px", width: `${Math.min(s.px, 200)}px`,
              background: "var(--color-kaya-indigo)", borderRadius: "var(--radius-sm)",
              opacity: 0.7,
            }} />
          </div>
        ))}
      </div>

      <h2>Border radius</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
        {radiusScale.map((r) => (
          <div key={r.token} style={{ textAlign: "center" }}>
            <div style={{
              width: "4rem", height: "4rem",
              background: "var(--color-kaya-indigo)",
              borderRadius: r.px === 9999 ? "9999px" : `${r.px}px`,
              marginBottom: "0.5rem",
            }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-muted)" }}>
              {r.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-subtle)" }}>
              {r.token.replace("--", "")}
            </div>
          </div>
        ))}
      </div>

      <h2>Layout grid</h2>
      <table>
        <thead>
          <tr><th>Breakpoint</th><th>Columns</th><th>Gutter</th><th>Margin</th></tr>
        </thead>
        <tbody>
          <tr><td>&lt; 480px</td><td>4</td><td>16px</td><td>16px</td></tr>
          <tr><td>480–767px</td><td>6</td><td>16px</td><td>24px</td></tr>
          <tr><td>768–1023px</td><td>8</td><td>24px</td><td>32px</td></tr>
          <tr><td>1024–1279px</td><td>12</td><td>24px</td><td>40px</td></tr>
          <tr><td>1280px+</td><td>12</td><td>32px</td><td>auto (max 1200px)</td></tr>
        </tbody>
      </table>

      <h2>Content width constraints</h2>
      <table>
        <thead>
          <tr><th>Context</th><th>Max width</th><th>Use</th></tr>
        </thead>
        <tbody>
          <tr><td>Long-form reading</td><td>680px (42.5rem)</td><td>Dictionary entries, articles, commentary</td></tr>
          <tr><td>App shell</td><td>1200px (75rem)</td><td>Main content area</td></tr>
          <tr><td>Full-bleed</td><td>100%</td><td>Hero images, landing pages</td></tr>
          <tr><td>Sidebar</td><td>280px (17.5rem)</td><td>Navigation, filters</td></tr>
        </tbody>
      </table>
    </div>
  );
}
