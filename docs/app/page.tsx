import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chidigo Design System",
};

const sections = [
  {
    title: "Foundations",
    description: "Color, typography, spacing, elevation, and motion — the visual atoms of every Chidigo product.",
    href: "/foundations/color",
    items: ["Color", "Typography", "Spacing", "Elevation", "Motion"],
  },
  {
    title: "Components",
    description: "Reusable UI building blocks from buttons and inputs to dictionary entries and proverb cards.",
    href: "/components",
    items: ["Button", "SearchField", "Card", "Badge", "AudioPlayer", "BilingualText"],
  },
  {
    title: "Patterns",
    description: "Composed solutions for search, forms, loading states, bilingual content, and more.",
    href: "/patterns",
    items: ["Search", "Dictionary entry", "Bilingual content", "Error handling", "Loading"],
  },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--fg-heading)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Chidigo Design System
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            lineHeight: 1.5,
            color: "var(--fg-default)",
            maxWidth: "42.5rem",
            marginBottom: "1rem",
          }}
        >
          The shared design language for every Chidigo digital product — the landing page, the Gomba
          dictionary, the language learning app, and beyond. Rooted in the visual culture of the
          Kenyan south coast, built for transmission.
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1rem",
            lineHeight: 1.55,
            color: "var(--fg-muted)",
            maxWidth: "42.5rem",
          }}
        >
          Tokens are named after their cultural sources — <em>Hando</em> white, <em>Kaya</em> indigo,{" "}
          <em>Vigango</em> black — so the brand&apos;s specificity travels into code. Every component
          passes WCAG 2.1 AA. Every text component handles bilingual content natively.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="doc-card-link"
            style={{
              display: "block",
              textDecoration: "none",
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              transition: "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "var(--fg-heading)",
                marginBottom: "0.5rem",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "var(--fg-muted)",
                marginBottom: "1rem",
              }}
            >
              {section.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {section.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-full)",
                    background: "var(--bg-surface-muted)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "1.5rem 2rem",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface-warm)",
          maxWidth: "42.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--fg-heading)",
            marginBottom: "0.5rem",
          }}
        >
          Design principle
        </h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1rem",
            lineHeight: 1.55,
            color: "var(--fg-default)",
            margin: 0,
          }}
        >
          The design system exists to carry the brand into code, not to replace the brand book.
          When the system and the brand book disagree, the brand book wins. When neither has an
          answer, return to the principle:{" "}
          <strong>the Digo child in 2040 who speaks Digo at home.</strong>
        </p>
      </div>
    </div>
  );
}
