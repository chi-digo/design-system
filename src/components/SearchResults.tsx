import { type HTMLAttributes, type ReactNode } from "react";

export interface SearchResult {
  headword: string;
  ipa?: string;
  nounClass?: string;
  definition: string;
  href?: string;
}

export interface SearchResultsProps extends Omit<HTMLAttributes<HTMLDivElement>, "results"> {
  results: SearchResult[];
  query: string;
  loading?: boolean;
  emptyState?: ReactNode;
  renderLink?: (href: string, children: ReactNode) => ReactNode;
}

function highlightMatch(text: string, query: string): ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "color-mix(in srgb, var(--color-kanga-yellow) 40%, transparent)", borderRadius: "2px", padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchResults({ results, query, loading, emptyState, renderLink, style, ...rest }: SearchResultsProps) {
  if (loading) {
    return (
      <div style={{ padding: "var(--space-4)", ...style }} {...rest}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: "var(--space-3) 0", borderBottom: "var(--border-width-thin) solid var(--border-default)" }}>
            <div style={{ height: "1.25rem", width: "40%", background: "var(--border-default)", borderRadius: "var(--radius-sm)", marginBottom: "var(--space-2)" }} />
            <div style={{ height: "0.875rem", width: "80%", background: "var(--border-default)", borderRadius: "var(--radius-sm)" }} />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && emptyState) {
    return <div style={style} {...rest}>{emptyState}</div>;
  }

  return (
    <div style={{ padding: "var(--space-2) var(--space-4)", ...style }} {...rest}>
      {results.map((r, i) => {
        const content = (
          <div
            key={i}
            style={{
              padding: "var(--space-3) 0",
              borderBottom: i < results.length - 1 ? "var(--border-width-thin) solid var(--border-default)" : "none",
              cursor: r.href ? "pointer" : "default",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--fg-heading)",
              }}>
                {highlightMatch(r.headword, query)}
              </span>
              {r.ipa && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>
                  {r.ipa}
                </span>
              )}
              {r.nounClass && (
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 500,
                  padding: "1px var(--space-2)", borderRadius: "var(--radius-full)",
                  background: "var(--color-kaya-indigo)", color: "#FFFFFF",
                }}>
                  cl. {r.nounClass}
                </span>
              )}
            </div>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
              margin: "var(--space-1) 0 0",
              lineHeight: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}>
              {highlightMatch(r.definition, query)}
            </p>
          </div>
        );

        if (r.href && renderLink) return <span key={i}>{renderLink(r.href, content)}</span>;
        if (r.href) return <a key={i} href={r.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>{content}</a>;
        return content;
      })}
    </div>
  );
}
