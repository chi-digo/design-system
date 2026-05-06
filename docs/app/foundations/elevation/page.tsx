import type { Metadata } from "next";

export const metadata: Metadata = { title: "Elevation" };

const shadows = [
  { token: "--shadow-sm", value: "0 1px 2px rgba(…, 0.06), 0 1px 3px rgba(…, 0.10)", use: "Cards at rest, subtle separation" },
  { token: "--shadow-md", value: "0 4px 6px rgba(…, 0.07), 0 2px 4px rgba(…, 0.06)", use: "Cards on hover, dropdowns, popovers" },
  { token: "--shadow-lg", value: "0 10px 15px rgba(…, 0.10), 0 4px 6px rgba(…, 0.05)", use: "Modals, drawers, floating panels" },
  { token: "--shadow-xl", value: "0 20px 25px rgba(…, 0.10), 0 10px 10px rgba(…, 0.04)", use: "Toasts, command palette, top-level overlays" },
];

const zLayers = [
  { token: "--z-base", value: "0", use: "Default document flow" },
  { token: "--z-raised", value: "10", use: "Cards, raised surfaces" },
  { token: "--z-dropdown", value: "100", use: "Select menus, autocomplete" },
  { token: "--z-sticky", value: "200", use: "Sticky headers, fixed toolbars" },
  { token: "--z-overlay", value: "300", use: "Overlays, backdrops" },
  { token: "--z-modal", value: "400", use: "Modals, dialogs" },
  { token: "--z-toast", value: "500", use: "Toast notifications" },
  { token: "--z-tooltip", value: "600", use: "Tooltips (always on top)" },
];

export default function ElevationPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Elevation
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        Shadows and z-index layers create depth and hierarchy. Use sparingly — most
        surfaces sit flat on the page. Elevation signals interactivity or temporary state.
      </p>

      <h2>Box shadows</h2>
      <p>Four levels, each a dual-shadow for natural depth. All shadows use Vigango black alpha.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {shadows.map((s) => (
          <div key={s.token} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{
              width: "100%", height: "6rem", borderRadius: "var(--radius-lg)",
              background: "var(--bg-surface)", boxShadow: `var(${s.token})`,
              border: "1px solid var(--border-default)",
            }} />
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-default)", marginBottom: "0.25rem" }}>
                {s.token}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
                {s.use}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Shadow values</h2>
      <table>
        <thead>
          <tr><th>Token</th><th>Value</th><th>Use</th></tr>
        </thead>
        <tbody>
          {shadows.map((s) => (
            <tr key={s.token}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>{s.token}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>{s.value}</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>{s.use}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Z-index layers</h2>
      <p>
        Strict layering prevents z-index wars. Never use arbitrary z-index values — always
        reference the scale tokens.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem", maxWidth: "36rem" }}>
        {[...zLayers].reverse().map((z, i) => (
          <div key={z.token} style={{
            display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1rem",
            borderRadius: "var(--radius-md)", background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            boxShadow: i < 4 ? "var(--shadow-sm)" : "none",
            position: "relative", zIndex: Number(z.value) || 0,
            marginLeft: `${(zLayers.length - 1 - i) * 8}px`,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-default)", minWidth: "7rem" }}>
              {z.token}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-subtle)", minWidth: "2rem" }}>
              {z.value}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              {z.use}
            </span>
          </div>
        ))}
      </div>

      <h2>Z-index reference</h2>
      <table>
        <thead>
          <tr><th>Token</th><th>Value</th><th>Use</th></tr>
        </thead>
        <tbody>
          {zLayers.map((z) => (
            <tr key={z.token}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>{z.token}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>{z.value}</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>{z.use}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Guidelines</h2>
      <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Flat by default.</strong> Most content sits on <code>--bg-page</code> or <code>--bg-surface</code> with no shadow. Elevation is the exception, not the rule.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>One step at a time.</strong> Cards at rest use <code>--shadow-sm</code>; on hover they rise to <code>--shadow-md</code>. Don&apos;t skip levels.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Dark mode shadows deepen.</strong> In dark mode, shadow opacity increases to maintain perceived depth on dark surfaces.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Z-index is non-negotiable.</strong> Use the layer tokens. If two elements collide, rethink the composition instead of bumping a number.
        </li>
      </ul>
    </div>
  );
}
