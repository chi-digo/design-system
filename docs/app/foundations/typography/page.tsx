import type { Metadata } from "next";

export const metadata: Metadata = { title: "Typography" };

const typeScale = [
  { token: "display-xl", size: "4rem / 64px", leading: "1.05", weight: "Fraunces 400", tracking: "-0.01em", example: "Karibu ku Chidigo" },
  { token: "display-lg", size: "3rem / 48px", leading: "1.10", weight: "Fraunces 400", tracking: "-0.005em", example: "Methali za Kidigo" },
  { token: "heading-1", size: "2.25rem / 36px", leading: "1.15", weight: "Fraunces 600", tracking: "0", example: "The dictionary" },
  { token: "heading-2", size: "1.75rem / 28px", leading: "1.20", weight: "Fraunces 600", tracking: "0", example: "Proverb collections" },
  { token: "heading-3", size: "1.375rem / 22px", leading: "1.30", weight: "Source Serif 600", tracking: "0", example: "Related words" },
  { token: "heading-4", size: "1.125rem / 18px", leading: "1.40", weight: "Source Serif 600", tracking: "0.005em", example: "Etymology" },
  { token: "body-lg", size: "1.125rem / 18px", leading: "1.55", weight: "Source Serif 400", tracking: "0", example: "Mti unaomera ph'wani, una makumbi marefu na nazi." },
  { token: "body", size: "1rem / 16px", leading: "1.55", weight: "Source Serif 400", tracking: "0", example: "The coconut palm bears the heart of the coconut palm." },
  { token: "body-sm", size: "0.875rem / 14px", leading: "1.50", weight: "Inter 400", tracking: "0.005em", example: "Pronunciation by Mwanaisha Ali" },
  { token: "ui", size: "0.875rem / 14px", leading: "1.40", weight: "Inter 500", tracking: "0.005em", example: "Search the dictionary" },
  { token: "ui-sm", size: "0.75rem / 12px", leading: "1.40", weight: "Inter 500", tracking: "0.01em", example: "EDITORIAL · n. cl.3" },
  { token: "mono", size: "0.875rem / 14px", leading: "1.55", weight: "JetBrains Mono 400", tracking: "0", example: "/mˈnazi/" },
];

function fontFamilyForToken(token: string): string {
  if (token.startsWith("display") || token.startsWith("heading-1") || token.startsWith("heading-2")) return "var(--font-display)";
  if (token.startsWith("heading")) return "var(--font-serif)";
  if (token.startsWith("body-sm") || token.startsWith("ui")) return "var(--font-sans)";
  if (token === "mono") return "var(--font-mono)";
  return "var(--font-serif)";
}

function fontWeightForToken(weight: string): number {
  if (weight.includes("600")) return 600;
  if (weight.includes("500")) return 500;
  return 400;
}

function fontSizeForToken(size: string): string {
  return size.split(" / ")[0];
}

function lineHeightForToken(leading: string): string {
  return leading;
}

export default function TypographyPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Typography
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        Four typefaces — one for editorial body, one for UI, one for display, one for technical/IPA.
        All open-source (SIL OFL). A 1.250 (major third) modular scale on a 16px base.
      </p>

      <h2>Typefaces</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {[
          { name: "Fraunces", role: "Display / headlines / marketing", sample: "Karibu ku Chidigo", family: "var(--font-display)", weight: 400 },
          { name: "Source Serif 4", role: "Editorial body / dictionary entries", sample: "Mwana wa nyoka ni nyoka.", family: "var(--font-serif)", weight: 400 },
          { name: "Inter", role: "UI / app shell / forms", sample: "Search the dictionary", family: "var(--font-sans)", weight: 500 },
          { name: "JetBrains Mono", role: "Mono / IPA / technical", sample: "/mˈnazi/ [n. cl.3]", family: "var(--font-mono)", weight: 400 },
        ].map((face) => (
          <div key={face.name} style={{
            padding: "1.5rem", borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-default)", background: "var(--bg-surface)",
          }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "0.75rem" }}>
              {face.role}
            </div>
            <div style={{ fontFamily: face.family, fontSize: "1.5rem", fontWeight: face.weight, color: "var(--fg-default)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              {face.name}
            </div>
            <div style={{ fontFamily: face.family, fontSize: "1rem", fontWeight: face.weight, color: "var(--fg-muted)", lineHeight: 1.5 }}>
              {face.sample}
            </div>
          </div>
        ))}
      </div>

      <h2>Type scale</h2>
      <p>
        Use these tokens directly. Do not introduce off-scale sizes. The scale covers display through
        caption with clear role separation between faces.
      </p>
      <div style={{ marginBottom: "2.5rem" }}>
        {typeScale.map((row) => (
          <div
            key={row.token}
            style={{
              padding: "1rem 0",
              borderBottom: "1px solid var(--border-default)",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", minWidth: "7rem" }}>
                {row.token}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--fg-subtle)" }}>
                {row.size} · {row.weight}
              </span>
            </div>
            <div style={{
              fontFamily: fontFamilyForToken(row.token),
              fontSize: fontSizeForToken(row.size),
              fontWeight: fontWeightForToken(row.weight),
              lineHeight: lineHeightForToken(row.leading),
              color: "var(--fg-default)",
            }}>
              {row.example}
            </div>
          </div>
        ))}
      </div>

      <h2>Digo-language setting</h2>
      <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>Use typographic apostrophe <code>U+2019</code> (right single quotation mark), never ASCII <code>U+0027</code>.</li>
        <li style={{ marginBottom: "0.75rem" }}>Non-breaking spaces between words in proverb fragments.</li>
        <li style={{ marginBottom: "0.75rem" }}>Digo text is <strong>never</strong> set smaller than English text on the same surface.</li>
        <li style={{ marginBottom: "0.75rem" }}>Italicise Digo terms on first use in English-led contexts. Do not italicise in Digo-led contexts.</li>
      </ul>

      <h2>Bilingual layout patterns</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2rem", maxWidth: "42.5rem" }}>
        <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "1rem" }}>
            Stacked — Digo above, English at 80% and 60% opacity
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 500, color: "var(--fg-heading)", lineHeight: 1.2 }}>
            Karibu ku Chidigo.
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-default)", opacity: 0.6, marginTop: "0.25rem" }}>
            Welcome to Chidigo.
          </div>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "1rem" }}>
            Inline gloss — em-dash separated
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-default)", lineHeight: 1.55 }}>
            <em>Karibu ku Chidigo</em> — welcome to Chidigo.
          </div>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "1rem" }}>
            Two-column — equal weight
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-default)", lineHeight: 1.55 }}>
              Mwana wa nyoka ni nyoka.
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-default)", lineHeight: 1.55 }}>
              A child of a snake is a snake.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
