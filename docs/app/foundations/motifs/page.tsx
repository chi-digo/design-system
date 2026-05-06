import type { Metadata } from "next";

export const metadata: Metadata = { title: "Motifs" };

function PindoDiamondChain({ fg = "#1F3A5F", bg = "#F2EAD7" }: { fg?: string; bg?: string }) {
  return (
    <svg viewBox="0 0 480 48" role="img" aria-label="Kanga pindo border — diamond chain" style={{ width: "100%", height: "auto" }}>
      <rect width="480" height="48" fill={bg} />
      <line x1="0" y1="6" x2="480" y2="6" stroke={fg} strokeWidth="1" />
      <line x1="0" y1="42" x2="480" y2="42" stroke={fg} strokeWidth="1" />
      <g fill={fg} stroke={fg} strokeWidth="1">
        {[20, 100, 180, 260, 340, 420].map((cx) => (
          <polygon key={cx} points={`${cx},12 ${cx + 12},24 ${cx},36 ${cx - 12},24`} fill={fg} />
        ))}
        {[60, 140, 220, 300, 380, 460].map((cx) => (
          <polygon key={cx} points={`${cx},12 ${cx + 12},24 ${cx},36 ${cx - 12},24`} fill="none" />
        ))}
      </g>
    </svg>
  );
}

function TriangleColumn({ fg = "#1A1A1A", bg = "#F2EAD7", count = 7 }: { fg?: string; bg?: string; count?: number }) {
  const h = count * 24 + 16;
  const triangles = [];
  for (let i = 0; i < count; i++) {
    const y = 8 + i * 24;
    if (i % 2 === 0) {
      triangles.push(<polygon key={i} points={`8,${y} 40,${y} 24,${y + 24}`} fill={fg} />);
    } else {
      triangles.push(<polygon key={i} points={`8,${y} 40,${y} 24,${y - 24}`} fill={fg} />);
    }
  }
  return (
    <svg viewBox={`0 0 48 ${h}`} role="img" aria-label="Vigango triangle column" style={{ height: "100%", width: "auto" }}>
      <rect width="48" height={h} fill={bg} />
      <rect x="8" y="8" width="32" height={h - 16} fill="none" stroke={fg} strokeWidth="1.2" />
      <g>{triangles}</g>
    </svg>
  );
}

function KayambaReedGrid({ fg = "#1A1A1A", bg = "#F2EAD7", opacity = 0.12 }: { fg?: string; bg?: string; opacity?: number }) {
  const lines = [];
  for (let x = 0; x < 320; x += 4) {
    lines.push(<line key={x} x1={x + 0.5} y1="0" x2={x + 0.5} y2="160" stroke={fg} strokeWidth="1" strokeOpacity={opacity} />);
  }
  return (
    <svg viewBox="0 0 320 160" role="img" aria-label="Kayamba reed grid" style={{ width: "100%", height: "auto" }}>
      <rect width="320" height="160" fill={bg} />
      {lines}
      <line x1="0" y1="16" x2="320" y2="16" stroke={fg} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="0" y1="144" x2="320" y2="144" stroke={fg} strokeWidth="1.2" strokeOpacity="0.4" />
    </svg>
  );
}

function JinaBand({ bg = "#1F3A5F", fg = "#F2EAD7" }: { bg?: string; fg?: string }) {
  return (
    <div style={{
      background: bg,
      padding: "1rem 1.5rem",
      borderTop: `1px solid ${fg}`,
      borderBottom: `1px solid ${fg}`,
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: "1.125rem",
        color: fg,
        margin: 0,
        lineHeight: 1.4,
      }}>
        Mwana wa nyoka ni nyoka
      </p>
      <p style={{
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontSize: "0.8125rem",
        color: fg,
        opacity: 0.75,
        margin: "0.25rem 0 0",
      }}>
        A child of a snake is a snake — character runs in families
      </p>
    </div>
  );
}

function MotifSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "3rem", marginBottom: "1rem",
        paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-default)",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function MotifPreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 600,
        color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.04em",
        marginBottom: "0.5rem",
      }}>
        {label}
      </p>
      <div style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-default)",
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

export default function MotifsPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Motifs
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        The Chidigo brand uses a <strong>three-motif library</strong>, each grounded in a documented
        Mijikenda visual practice. Motifs are decorative, not load-bearing &mdash; they support layout,
        they do not become logos.
      </p>

      <div style={{
        padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
        borderLeft: "3px solid var(--color-kanga-orange)", background: "var(--bg-surface-muted)",
        marginBottom: "2rem", maxWidth: "42.5rem",
      }}>
        <p style={{ fontSize: "0.875rem", margin: 0 }}>
          <strong>Motifs are seasoning. Content is the meal.</strong> Never serve only seasoning.
          If a motif and content compete, reduce or remove the motif.
        </p>
      </div>

      {/* Overview table */}
      <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
        <table>
          <thead>
            <tr>
              <th>Motif</th>
              <th>Cultural source</th>
              <th>Primary use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 500 }}>Kanga <em>pindo</em> border</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Patterned edge of the kanga textile</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Borders on covers, screens, social cards</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500 }}>Vigango triangle column</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Chip-carved triangles on memorial posts</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Book spines, vertical dividers, edge ornaments</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500 }}>Kayamba reed grid</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Parallel-reed surface of the <em>kayamba</em> rattle</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>Background textures, endpapers, loading states</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---- PINDO ---- */}
      <MotifSection title="Kanga pindo border">
        <p>
          Every kanga has three structural elements: <strong><em>pindo</em></strong> (the patterned border),
          <strong> <em>mji</em></strong> (the centre field), and <strong><em>jina</em></strong> (the proverb band).
          We borrow this structure literally. A page or screen is treated as a kanga: a content field flanked by a{" "}
          <em>pindo</em> and, where appropriate, a <em>jina</em>.
        </p>
        <p>
          The pattern is built from a <strong>repeating geometric unit</strong>: diamond chain, triangle row,
          or reed bars. Width: <code>6&ndash;12 px</code> on screen, 6&ndash;12 mm in print.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <MotifPreview label="Default — Kaya indigo on Hando cream">
            <PindoDiamondChain />
          </MotifPreview>
          <MotifPreview label="Editorial — Vigango black on Coral-lime sand">
            <PindoDiamondChain fg="#1A1A1A" bg="#E8DCC2" />
          </MotifPreview>
          <MotifPreview label="Ceremonial — Ngundu red on Hando cream">
            <PindoDiamondChain fg="#B5261D" bg="#F2EAD7" />
          </MotifPreview>
          <MotifPreview label="Reversed — Hando cream on Kaya indigo">
            <PindoDiamondChain fg="#F2EAD7" bg="#1F3A5F" />
          </MotifPreview>
        </div>

        <h3>Where <em>pindo</em> appears</h3>
        <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Book covers — bottom edge, sometimes top</li>
          <li style={{ marginBottom: "0.5rem" }}>Social cards — top and bottom</li>
          <li style={{ marginBottom: "0.5rem" }}>App splash screens — bottom edge only</li>
          <li style={{ marginBottom: "0.5rem" }}>Letterhead — top edge</li>
        </ul>

        <h3>Where <em>pindo</em> does not appear</h3>
        <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Inside the content field — it would compete with content</li>
          <li style={{ marginBottom: "0.5rem" }}>On all four edges of a surface — <em>pindo</em> belongs on two edges, never four</li>
          <li style={{ marginBottom: "0.5rem" }}>Around photographs — the photo carries its own edge</li>
        </ul>
      </MotifSection>

      {/* ---- VIGANGO ---- */}
      <MotifSection title="Vigango triangle column">
        <p>
          The chip-carved alternating triangle column found on the torso of <em>vigango</em> (Mijikenda
          memorial posts), filled alternately with white coral-lime plaster and blackened pitch. We use the{" "}
          <strong>rhythm and the high-contrast geometry</strong>, not the anatomical reading.
        </p>
        <p>
          Standard sizes: <strong>5 triangles</strong> for the logo mark, <strong>7&ndash;9</strong> for
          medium decoration (book spines, app ornaments), <strong>12+</strong> for full-height dividers.
          Width: <code>20&ndash;32 px</code> on screen.
        </p>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <MotifPreview label="Default — Vigango black on Hando cream (9 triangles)">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#F2EAD7" }}>
              <div style={{ height: "240px" }}>
                <TriangleColumn count={9} />
              </div>
            </div>
          </MotifPreview>
          <MotifPreview label="Reversed — Hando cream on Kaya indigo">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#1F3A5F" }}>
              <div style={{ height: "240px" }}>
                <TriangleColumn fg="#F2EAD7" bg="#1F3A5F" count={9} />
              </div>
            </div>
          </MotifPreview>
          <MotifPreview label="Editorial — Kaya indigo on Coral-lime sand">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#E8DCC2" }}>
              <div style={{ height: "240px" }}>
                <TriangleColumn fg="#1F3A5F" bg="#E8DCC2" count={9} />
              </div>
            </div>
          </MotifPreview>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <MotifPreview label="5 triangles (logo mark)">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#F2EAD7" }}>
              <div style={{ height: "140px" }}>
                <TriangleColumn count={5} />
              </div>
            </div>
          </MotifPreview>
          <MotifPreview label="7 triangles (spine)">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#F2EAD7" }}>
              <div style={{ height: "180px" }}>
                <TriangleColumn count={7} />
              </div>
            </div>
          </MotifPreview>
          <MotifPreview label="12 triangles (divider)">
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "#F2EAD7" }}>
              <div style={{ height: "320px" }}>
                <TriangleColumn count={12} />
              </div>
            </div>
          </MotifPreview>
        </div>

        <h3>Where the triangle column appears</h3>
        <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Book spines — vertically centred, full length</li>
          <li style={{ marginBottom: "0.5rem" }}>App long-form article dividers — 32 px wide column between major sections</li>
          <li style={{ marginBottom: "0.5rem" }}>Signage edges — vertical strip, full height</li>
          <li style={{ marginBottom: "0.5rem" }}>Calls to contribute — short column beside the call-out copy</li>
        </ul>

        <div style={{
          padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
          borderLeft: "3px solid var(--color-ngundu-red)", background: "var(--bg-surface-muted)",
          marginTop: "1rem", maxWidth: "42.5rem",
        }}>
          <p style={{ fontSize: "0.875rem", margin: 0 }}>
            <strong>Cultural sensitivity.</strong> Do not use the triangle column in children&apos;s content
            (the original context is funerary). Do not use in sacred contexts without advisory-board approval.
          </p>
        </div>
      </MotifSection>

      {/* ---- KAYAMBA ---- */}
      <MotifSection title="Kayamba reed grid">
        <p>
          The <em>kayamba</em> is a Digo rectangular reed-mat rattle. Its surface is a clean, calm grid of
          parallel reeds bound by twine. The <strong>grid itself</strong> is the motif &mdash; almost subliminal,
          felt before it is seen.
        </p>
        <p>
          Line weight: <code>1 px</code> on screen. Spacing: <code>4 px</code>. Colour: Vigango black
          at <strong>8&ndash;12% opacity</strong> on light grounds; Hando cream at 12% on dark grounds.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <MotifPreview label="Default — Vigango black at 12% on Hando cream">
            <KayambaReedGrid />
          </MotifPreview>
          <MotifPreview label="Subtle — Vigango black at 8% on Hando cream">
            <KayambaReedGrid opacity={0.08} />
          </MotifPreview>
          <MotifPreview label="On dark — Hando cream at 12% on Kaya indigo">
            <KayambaReedGrid fg="#F2EAD7" bg="#1F3A5F" opacity={0.12} />
          </MotifPreview>
          <MotifPreview label="On dark — Hando cream at 12% on Vigango black">
            <KayambaReedGrid fg="#F2EAD7" bg="#1A1A1A" opacity={0.12} />
          </MotifPreview>
        </div>

        <div style={{
          padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
          borderLeft: "3px solid var(--color-mangrove-green)", background: "var(--bg-surface-muted)",
          maxWidth: "42.5rem",
        }}>
          <p style={{ fontSize: "0.875rem", margin: 0 }}>
            <strong>The safe motif.</strong> The <em>kayamba</em> is a public, daily, joyful Digo instrument
            with no sacred or restricted context. When in doubt, reach for the reed grid before the triangle column.
          </p>
        </div>

        <h3>Where the reed grid appears</h3>
        <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Background plates — under hero text on launch pages</li>
          <li style={{ marginBottom: "0.5rem" }}>Book endpapers — the cream pages between cover and first signature</li>
          <li style={{ marginBottom: "0.5rem" }}>App loading state — vertical lines fill left-to-right at 80 ms per line</li>
          <li style={{ marginBottom: "0.5rem" }}>Audio playback — the waveform reduces to vertical reed lines</li>
          <li style={{ marginBottom: "0.5rem" }}>Section dividers — narrow horizontal bands (the grid rotated 90&deg;)</li>
        </ul>
      </MotifSection>

      {/* ---- JINA BAND ---- */}
      <MotifSection title="Jina band">
        <p>
          Borrowed from the kanga&apos;s <em>jina</em> (proverb band). A coloured strip running along the
          bottom of a surface, carrying a Digo proverb in Fraunces with an English translation beneath.
          The <em>jina</em> band is a <strong>load-bearing identity element</strong> &mdash; it carries the
          brand&apos;s voice and cultural specificity together.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <MotifPreview label="Default — Kaya indigo band, Hando cream text">
            <JinaBand />
          </MotifPreview>
          <MotifPreview label="Editorial — Vigango black band, Coral-lime sand text">
            <JinaBand bg="#1A1A1A" fg="#E8DCC2" />
          </MotifPreview>
          <MotifPreview label="Ceremonial — Ngundu red band, Hando cream text">
            <JinaBand bg="#B5261D" fg="#F2EAD7" />
          </MotifPreview>
        </div>

        <h3>Where the <em>jina</em> band appears</h3>
        <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Launch page hero — bottom edge</li>
          <li style={{ marginBottom: "0.5rem" }}>Book back covers</li>
          <li style={{ marginBottom: "0.5rem" }}>Funder and annual report covers</li>
          <li style={{ marginBottom: "0.5rem" }}>Social cards — as a contextual proverb band</li>
        </ul>
      </MotifSection>

      {/* ---- COMBINATION ---- */}
      <MotifSection title="Combination rules">
        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 500 }}>One motif per surface</td>
                <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                  Do not combine <em>pindo</em>, triangle column, and reed grid on the same page.
                  Exception: reed grid at &le;8% opacity can co-exist with a single <em>pindo</em> edge.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Brand palette only</td>
                <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                  Motifs use primary and secondary colours only. Never accent (orange, yellow), except
                  for special celebratory editions ratified by the advisory board.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Edges and gutters</td>
                <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                  Motifs sit at the edges or in the gutters between content blocks. They never occupy the content field.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Content always wins</td>
                <td style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                  If a motif and content compete, reduce or remove the motif. The motif is a frame, not a feature.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MotifSection>

      {/* ---- APPLICATION ---- */}
      <MotifSection title="Application examples">
        <p>Compositions showing how motifs frame content in real layouts.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* App home screen */}
          <MotifPreview label="App home screen — reed grid background + pindo bottom edge">
            <div style={{ position: "relative", background: "#F2EAD7", padding: "2rem 1.5rem 0" }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <KayambaReedGrid opacity={0.06} />
              </div>
              <div style={{ position: "relative" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "#1F3A5F", margin: "0 0 0.25rem" }}>
                  Habari za asubuhi
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.875rem", color: "#1A1A1A", opacity: 0.7, margin: "0 0 1.25rem" }}>
                  Good morning — karibu Gomba
                </p>
                <div style={{
                  background: "#FFFFFF", borderRadius: "24px", padding: "0.625rem 1rem",
                  display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem",
                  border: "1px solid rgba(26,26,26,0.12)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeOpacity="0.4"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "rgba(26,26,26,0.4)" }}>Search dictionary&hellip;</span>
                </div>
              </div>
              <PindoDiamondChain />
            </div>
          </MotifPreview>

          {/* Book spine */}
          <MotifPreview label="Book spine — vigango triangle column with title">
            <div style={{
              display: "flex", background: "#F2EAD7", padding: "1.5rem 2rem",
              justifyContent: "center", gap: "1rem", alignItems: "center",
            }}>
              <div style={{ height: "280px" }}>
                <TriangleColumn count={11} />
              </div>
              <div style={{
                writingMode: "vertical-rl", textOrientation: "mixed",
                fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem",
                color: "#1F3A5F", letterSpacing: "0.08em",
              }}>
                CHIDIGO &middot; MWANZO WA LUGHA
              </div>
              <div style={{ height: "280px" }}>
                <TriangleColumn count={11} />
              </div>
            </div>
          </MotifPreview>

          {/* Social card */}
          <MotifPreview label="Social card — pindo top/bottom with jina proverb">
            <div style={{ background: "#F2EAD7", maxWidth: "480px" }}>
              <PindoDiamondChain />
              <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 500,
                  color: "#1F3A5F", margin: "0 0 0.5rem", lineHeight: 1.35,
                }}>
                  Mwana wa nyoka ni nyoka
                </p>
                <p style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.875rem",
                  color: "#1A1A1A", opacity: 0.6, margin: 0,
                }}>
                  A child of a snake is a snake
                </p>
              </div>
              <PindoDiamondChain />
            </div>
          </MotifPreview>

          {/* Signage */}
          <MotifPreview label="Signage — vigango column on Kaya indigo ground">
            <div style={{
              display: "flex", background: "#1F3A5F", padding: "1.5rem",
            }}>
              <div style={{ height: "200px", flexShrink: 0 }}>
                <TriangleColumn fg="#F2EAD7" bg="#1F3A5F" count={8} />
              </div>
              <div style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600,
                  color: "#F2EAD7", margin: "0 0 0.5rem",
                }}>
                  Chidigo
                </p>
                <p style={{
                  fontFamily: "var(--font-serif)", fontSize: "0.875rem",
                  color: "#F2EAD7", opacity: 0.75, margin: "0 0 0.25rem",
                }}>
                  Lugha ya Adigo &mdash; kuihifadhi,
                </p>
                <p style={{
                  fontFamily: "var(--font-serif)", fontSize: "0.875rem",
                  color: "#F2EAD7", opacity: 0.75, margin: 0,
                }}>
                  kuiendeleza, kuipenda.
                </p>
              </div>
            </div>
          </MotifPreview>
        </div>
      </MotifSection>

      {/* ---- CSS USAGE ---- */}
      <MotifSection title="Usage in code">
        <p>
          Motifs are available as SVG files and as React components in the design system.
          Use them at layout edges, never as primary content.
        </p>

        <h3>CSS background pattern (reed grid)</h3>
        <pre><code>{`/* Kayamba reed grid as CSS background */
.hero-section {
  background-image: repeating-linear-gradient(
    to right,
    var(--color-vigango-black) 0px,
    var(--color-vigango-black) 1px,
    transparent 1px,
    transparent 4px
  );
  background-size: 4px 100%;
  opacity: 0.08;
}`}</code></pre>

        <h3>CSS border pattern (pindo)</h3>
        <pre><code>{`/* Pindo border via border-image */
.card-with-pindo {
  border-bottom: 8px solid;
  border-image: url('/motifs/pindo-diamond-chain.svg') 48 round;
}`}</code></pre>

        <h3>SVG inline (triangle column)</h3>
        <pre><code>{`/* Import from the design system */
import { TriangleColumn } from '@chidigo/design-system/motifs';

<aside className="article-divider">
  <TriangleColumn count={9} />
</aside>`}</code></pre>
      </MotifSection>
    </div>
  );
}
