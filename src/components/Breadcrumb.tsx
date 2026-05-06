import type { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  renderLink?: (href: string, children: ReactNode) => ReactNode;
}

const DefaultSeparator = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function Breadcrumb({
  items,
  separator,
  renderLink,
  style,
  ...rest
}: BreadcrumbProps) {
  const sep = separator ?? <DefaultSeparator />;

  return (
    <nav aria-label="Breadcrumb" style={style} {...rest}>
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
              {i > 0 && <span style={{ color: "var(--fg-subtle)", display: "flex" }}>{sep}</span>}
              {item.icon && <span style={{ display: "flex", marginRight: "var(--space-1)" }}>{item.icon}</span>}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{ color: isLast ? "var(--fg-default)" : "var(--fg-muted)", fontWeight: isLast ? 500 : 400 }}
                >
                  {item.label}
                </span>
              ) : renderLink ? (
                renderLink(item.href, item.label)
              ) : (
                <a
                  href={item.href}
                  style={{
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
