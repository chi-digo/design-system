import type { Metadata } from "next";
import { ColorSwatch } from "@/components/ColorSwatch";

export const metadata: Metadata = { title: "Color" };

const primary = [
  { name: "Hando cream", hex: "#F2EAD7", cssVar: "--color-hando-cream", source: "Mijikenda women's hando skirt, white variant", textColor: "#1A1A1A" },
  { name: "Ngundu red", hex: "#B5261D", cssVar: "--color-ngundu-red", source: "Diviners' red, hando ngundu, kisutu red" },
  { name: "Kaya indigo", hex: "#1F3A5F", cssVar: "--color-kaya-indigo", source: "Kaya elder kitambi, deep indigo kikoy" },
  { name: "Vigango black", hex: "#1A1A1A", cssVar: "--color-vigango-black", source: "Blackened pitch of vigango triangles" },
];

const secondary = [
  { name: "Coral-lime sand", hex: "#E8DCC2", cssVar: "--color-coral-lime-sand", source: "Coral-lime plaster, Diani sand", textColor: "#1A1A1A" },
  { name: "Mangrove green", hex: "#2E4A2C", cssVar: "--color-mangrove-green", source: "Mangrove inlets, south coast" },
  { name: "Palm-frond green", hex: "#7A8C3C", cssVar: "--color-palm-frond-green", source: "Coconut palm fronds, fresh makuti thatch" },
  { name: "Mnazi gold", hex: "#C99846", cssVar: "--color-mnazi-gold", source: "Palm wine sap, tapped at dawn" },
];

const accent = [
  { name: "Kanga orange", hex: "#E8761B", cssVar: "--color-kanga-orange", source: "Bright-field kanga, celebratory" },
  { name: "Kanga yellow", hex: "#F2C12E", cssVar: "--color-kanga-yellow", source: "Kanga bright fields, jamhuri contexts", textColor: "#1A1A1A" },
];

const functional = [
  { name: "Error red", hex: "#D93D3D", cssVar: "--color-error-red", source: "Functional UI color — NOT Ngundu red" },
  { name: "Success green", hex: "#2D7A3A", cssVar: "--color-success-green", source: "Functional UI color — distinct from Mangrove green" },
];

const semanticLight = [
  { token: "--bg-page", value: "Hando cream", color: "#F2EAD7" },
  { token: "--bg-surface", value: "#FFFFFF", color: "#FFFFFF" },
  { token: "--bg-surface-warm", value: "Coral-lime sand", color: "#E8DCC2" },
  { token: "--bg-surface-brand", value: "Kaya indigo", color: "#1F3A5F" },
  { token: "--fg-default", value: "Vigango black", color: "#1A1A1A" },
  { token: "--fg-heading", value: "Kaya indigo", color: "#1F3A5F" },
  { token: "--fg-link", value: "Kaya indigo", color: "#1F3A5F" },
  { token: "--color-error", value: "Error red", color: "#D93D3D" },
  { token: "--color-success", value: "Success green", color: "#2D7A3A" },
];

const contrastPairs = [
  { fg: "Vigango black", bg: "Hando cream", ratio: "~14.6:1", grade: "AAA" },
  { fg: "Kaya indigo", bg: "Hando cream", ratio: "~9.6:1", grade: "AAA" },
  { fg: "Mangrove green", bg: "Hando cream", ratio: "~9.4:1", grade: "AAA" },
  { fg: "Ngundu red", bg: "Hando cream", ratio: "~6.3:1", grade: "AA" },
  { fg: "Kanga orange", bg: "Hando cream", ratio: "~3.0:1", grade: "Large text only" },
  { fg: "Mnazi gold", bg: "Hando cream", ratio: "~1.9:1", grade: "Decorative only" },
];

export default function ColorPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Color
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        The Chidigo palette is anchored in the <em>kaya elder&apos;s kitambi</em> (deep indigo with
        red bands) and the <em>wedding kisutu</em> (red, black, and white). Every color is named
        after its cultural source so the brand&apos;s specificity travels into code.
      </p>

      <h2>Primary palette</h2>
      <p>These four carry the brand on their own. Present on every Chidigo surface.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {primary.map((c) => <ColorSwatch key={c.hex} {...c} />)}
      </div>

      <h2>Secondary palette</h2>
      <p>Supporting roles — book covers, illustration palettes, alternate surfaces.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {secondary.map((c) => <ColorSwatch key={c.hex} {...c} />)}
      </div>

      <h2>Accent palette</h2>
      <p>
        Used sparingly — children&apos;s content, calls to contribute, celebratory moments.
        A page with no accent colour is normal. A page with both accents is an error.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {accent.map((c) => <ColorSwatch key={c.hex} {...c} />)}
      </div>

      <h2>Functional status colors</h2>
      <div style={{
        padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
        borderLeft: "3px solid var(--color-kanga-orange)", background: "var(--bg-surface-muted)",
        marginBottom: "1.5rem", maxWidth: "42.5rem",
      }}>
        <p style={{ fontSize: "0.875rem", margin: 0 }}>
          <strong>Ngundu red is never used for errors.</strong> It carries spiritual weight — the red of
          diviners, initiation, and the kisutu wedding kanga. Error states use a separate, cooler red
          that has no cultural association.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {functional.map((c) => <ColorSwatch key={c.hex} {...c} />)}
      </div>

      <h2>Semantic tokens</h2>
      <p>
        Semantic tokens map intent to color. Components use semantic tokens, never primitives directly.
        They remap automatically between light and dark mode.
      </p>
      <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Light mode value</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {semanticLight.map((row) => (
              <tr key={row.token}>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>{row.token}</td>
                <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>{row.value}</td>
                <td>
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "var(--radius-sm)",
                    background: row.color, border: "1px solid var(--border-default)",
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Accessibility — contrast pairs</h2>
      <p>
        All body text passes WCAG 2.1 AA (4.5:1). Default body pair exceeds AAA (14.6:1).
        Color is never the sole carrier of information.
      </p>
      <table>
        <thead>
          <tr>
            <th>Foreground</th>
            <th>Background</th>
            <th>Ratio</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {contrastPairs.map((pair) => (
            <tr key={`${pair.fg}-${pair.bg}`}>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem" }}>{pair.fg}</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem" }}>{pair.bg}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>{pair.ratio}</td>
              <td>
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 500,
                  padding: "0.15rem 0.5rem", borderRadius: "var(--radius-full)",
                  background: pair.grade === "AAA" ? "var(--color-success-green)" : pair.grade === "AA" ? "var(--color-kaya-indigo)" : "var(--bg-surface-muted)",
                  color: pair.grade === "AAA" || pair.grade === "AA" ? "#FFFFFF" : "var(--fg-muted)",
                }}>
                  {pair.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cultural notes</h2>
      <h3>For designers and developers</h3>
      <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}><strong>Never use red without intention.</strong> Ngundu red carries spiritual weight. It is not a &ldquo;warning&rdquo; colour in this brand, and it is not the default CTA colour. It is a celebratory and editorial accent.</li>
        <li style={{ marginBottom: "0.75rem" }}><strong>Indigo is the workhorse.</strong> Most brand presence is indigo + black on warm white. This is the kaya-elder palette. Lean into it.</li>
        <li style={{ marginBottom: "0.75rem" }}><strong>Yellow and orange are kanga, not Maasai.</strong> Use them for joy and contribution prompts, not for &ldquo;African&rdquo; colour.</li>
        <li style={{ marginBottom: "0.75rem" }}><strong>Green is mangrove, not savannah.</strong> Always with a coastal connotation.</li>
      </ul>
    </div>
  );
}
