import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Foundations" };

const foundations = [
  {
    title: "Color",
    href: "/foundations/color",
    description: "Culturally-named palette anchored in the kaya elder's kitambi and the wedding kisutu. Primary, secondary, accent, and functional status colors.",
  },
  {
    title: "Typography",
    href: "/foundations/typography",
    description: "Four open-source typefaces — Fraunces for display, Source Serif 4 for editorial body, Inter for UI, JetBrains Mono for IPA and technical.",
  },
  {
    title: "Spacing",
    href: "/foundations/spacing",
    description: "Base-4 spacing scale with 2px fine control, border radius tokens, responsive layout grid, and content width constraints.",
  },
  {
    title: "Elevation",
    href: "/foundations/elevation",
    description: "Four shadow levels for depth hierarchy and eight z-index layers to prevent stacking collisions.",
  },
  {
    title: "Motion",
    href: "/foundations/motion",
    description: "Five duration steps and five easing curves for functional animation. All motion respects prefers-reduced-motion.",
  },
];

export default function FoundationsPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Foundations
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        The visual atoms of every Chidigo digital product. Foundations define the design tokens,
        scales, and rules that all components and patterns build on.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {foundations.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="doc-card-link"
            style={{
              display: "block", textDecoration: "none", padding: "1.5rem",
              borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              transition: "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 600,
              color: "var(--fg-heading)", marginBottom: "0.5rem",
            }}>
              {f.title}
            </h2>
            <p style={{
              fontFamily: "var(--font-serif)", fontSize: "0.875rem", lineHeight: 1.5,
              color: "var(--fg-muted)", margin: 0,
            }}>
              {f.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
