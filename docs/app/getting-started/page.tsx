import type { Metadata } from "next";

export const metadata: Metadata = { title: "Getting started" };

const installSnippet = `npm install @chidigo/design-system`;

const registrySnippet = `# .npmrc (project root)
@chidigo:registry=https://npm.pkg.github.com`;

const cssImportSnippet = `/* globals.css or your app entry CSS */
@import "@chidigo/design-system/tokens";`;

const tailwindSnippet = `// tailwind.config.ts  (Tailwind CSS 3)
import { chidigoPreset } from "@chidigo/design-system/tailwind-preset";

export default {
  presets: [chidigoPreset],
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
};`;

const tailwind4Snippet = `/* app.css  (Tailwind CSS 4) */
@import "tailwindcss";
@import "@chidigo/design-system/tokens";`;

const themeSnippet = `// app/layout.tsx
import { ThemeProvider, themeBlockingScript } from "@chidigo/design-system";

export default function RootLayout({ children }) {
  return (
    <html lang="dig" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBlockingScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`;

const useThemeSnippet = `import { useTheme } from "@chidigo/design-system";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? "☀" : "☾"}
    </button>
  );
}`;

const tokenUsageSnippet = `/* Using tokens directly in CSS */
.card {
  background: var(--bg-surface);
  border: var(--border-width-thin) solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-fast) var(--ease-default);
}

.card:hover {
  box-shadow: var(--shadow-md);
}`;

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <pre style={{
      background: "var(--bg-surface-muted)", borderRadius: "var(--radius-md)",
      padding: "1rem 1.25rem", overflowX: "auto", fontSize: "0.8125rem",
      fontFamily: "var(--font-mono)", lineHeight: 1.6, color: "var(--fg-default)",
      border: "1px solid var(--border-default)", marginBottom: "1.5rem",
    }}>
      <code>{code}</code>
    </pre>
  );
}

export default function GettingStartedPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Getting started
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        Install the design system package, import the tokens, and start building with the
        Chidigo visual language in under five minutes.
      </p>

      <h2>1. Configure the registry</h2>
      <p>
        The package is published to GitHub Packages under the <code>@chidigo</code> scope.
        Add a <code>.npmrc</code> file to your project root:
      </p>
      <CodeBlock code={registrySnippet} language="ini" />

      <h2>2. Install</h2>
      <CodeBlock code={installSnippet} language="bash" />

      <h2>3. Import tokens</h2>
      <p>
        The token CSS files define all design primitives and semantic color mappings as CSS custom
        properties. Import them once at the root of your application.
      </p>
      <CodeBlock code={cssImportSnippet} language="css" />

      <h2>4. Tailwind CSS integration</h2>
      <p>
        The design system ships a Tailwind preset that maps all tokens to utility classes. Setup
        differs slightly between Tailwind 3 and 4:
      </p>

      <h3>Tailwind CSS 3</h3>
      <CodeBlock code={tailwindSnippet} />

      <h3>Tailwind CSS 4</h3>
      <p>
        Tailwind 4 uses CSS-first configuration. The token import provides the custom properties;
        no preset is needed for token values, but the preset adds semantic utility mappings.
      </p>
      <CodeBlock code={tailwind4Snippet} language="css" />

      <h2>5. Theme support</h2>
      <p>
        Wrap your app in <code>ThemeProvider</code> for light/dark mode. The blocking script
        prevents a flash of wrong theme on page load.
      </p>
      <CodeBlock code={themeSnippet} />
      <p>Access the current theme in any component:</p>
      <CodeBlock code={useThemeSnippet} />

      <h2>6. Using tokens</h2>
      <p>
        Components should use <strong>semantic tokens</strong> (like <code>--bg-surface</code>,{" "}
        <code>--fg-default</code>) rather than primitive tokens (like <code>--color-kaya-indigo</code>).
        Semantic tokens remap automatically between light and dark mode.
      </p>
      <CodeBlock code={tokenUsageSnippet} language="css" />

      <h2>Package exports</h2>
      <table>
        <thead>
          <tr><th>Import path</th><th>Contents</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@chidigo/design-system</code></td>
            <td>React components, providers, hooks, utilities</td>
          </tr>
          <tr>
            <td><code>@chidigo/design-system/tokens</code></td>
            <td>All CSS token files (primitives + semantic light/dark + base resets)</td>
          </tr>
          <tr>
            <td><code>@chidigo/design-system/tailwind-preset</code></td>
            <td>Tailwind CSS preset mapping tokens to utilities</td>
          </tr>
          <tr>
            <td><code>@chidigo/design-system/fonts/*</code></td>
            <td>Self-hosted woff2 font files (Fraunces, Source Serif 4, Inter, JetBrains Mono)</td>
          </tr>
        </tbody>
      </table>

      <h2>Fonts</h2>
      <p>
        The package includes self-hosted woff2 font files. In Next.js projects, you can also use{" "}
        <code>next/font/google</code> for automatic optimization. The token CSS references four
        font families:
      </p>
      <table>
        <thead>
          <tr><th>Token</th><th>Typeface</th><th>Role</th></tr>
        </thead>
        <tbody>
          <tr><td><code>--font-display</code></td><td>Fraunces</td><td>Display headlines, marketing</td></tr>
          <tr><td><code>--font-serif</code></td><td>Source Serif 4</td><td>Editorial body, dictionary entries</td></tr>
          <tr><td><code>--font-sans</code></td><td>Inter</td><td>UI, app shell, forms</td></tr>
          <tr><td><code>--font-mono</code></td><td>JetBrains Mono</td><td>IPA transcription, code, technical</td></tr>
        </tbody>
      </table>

      <h2>Browser support</h2>
      <p>
        The design system targets modern evergreen browsers. CSS custom properties, container
        queries, and <code>:has()</code> are used throughout. Minimum versions:
      </p>
      <ul>
        <li>Chrome/Edge 105+</li>
        <li>Firefox 110+</li>
        <li>Safari 16.4+</li>
      </ul>
    </div>
  );
}
