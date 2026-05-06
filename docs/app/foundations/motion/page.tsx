import type { Metadata } from "next";

export const metadata: Metadata = { title: "Motion" };

const durations = [
  { token: "--duration-instant", value: "0ms", use: "Immediate state changes (checked/unchecked)" },
  { token: "--duration-fast", value: "100ms", use: "Button presses, hover effects, focus rings" },
  { token: "--duration-moderate", value: "200ms", use: "Dropdowns, tooltips, small reveals" },
  { token: "--duration-slow", value: "400ms", use: "Modals, drawers, page transitions" },
  { token: "--duration-slower", value: "600ms", use: "Elaborate entrances, loading sequences" },
];

const easings = [
  { token: "--ease-default", value: "cubic-bezier(0.25, 0.1, 0.25, 1)", use: "Most transitions — natural deceleration", curve: "ease" },
  { token: "--ease-in", value: "cubic-bezier(0.42, 0, 1, 1)", use: "Elements leaving the viewport", curve: "ease-in" },
  { token: "--ease-out", value: "cubic-bezier(0, 0, 0.58, 1)", use: "Elements entering the viewport", curve: "ease-out" },
  { token: "--ease-in-out", value: "cubic-bezier(0.42, 0, 0.58, 1)", use: "Symmetrical transitions, toggles", curve: "ease-in-out" },
  { token: "--ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "Playful bounces, celebrations, success feedback", curve: "spring" },
];

function DurationDemo({ token, value }: { token: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-muted)", minWidth: "10rem" }}>
        {token}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-subtle)", minWidth: "3rem" }}>
        {value}
      </span>
      <div style={{ flex: 1, position: "relative", height: "4px", background: "var(--border-default)", borderRadius: "var(--radius-full)" }}>
        <div
          className="motion-demo-bar"
          style={{
            position: "absolute", left: 0, top: 0, height: "100%", width: "0%",
            background: "var(--color-kaya-indigo)", borderRadius: "var(--radius-full)",
            transition: `width ${value} var(--ease-default)`,
          }}
        />
      </div>
    </div>
  );
}

export default function MotionPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Motion
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem" }}>
        Motion gives feedback and guides attention. Prefer subtle, functional animation over
        decorative motion. All animation respects <code>prefers-reduced-motion</code>.
      </p>

      <h2>Duration scale</h2>
      <p>Five steps from instant to slow. Pair with an easing curve for every transition.</p>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "2.5rem" }}>
        {durations.map((d) => (
          <div key={d.token} style={{
            display: "flex", alignItems: "center", gap: "1rem", padding: "0.625rem 0",
            borderBottom: "1px solid var(--border-default)",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-default)", minWidth: "10rem" }}>
              {d.token}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-subtle)", minWidth: "3rem" }}>
              {d.value}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
              {d.use}
            </span>
          </div>
        ))}
      </div>

      <h2>Easing curves</h2>
      <p>
        Five curves for different motion contexts. <code>--ease-default</code> covers 80% of transitions.
        Use <code>--ease-spring</code> only for celebratory or playful moments.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {easings.map((e) => (
          <div key={e.token} style={{
            padding: "1.25rem", borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-default)", background: "var(--bg-surface)",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--fg-default)", marginBottom: "0.5rem" }}>
              {e.token}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-subtle)", marginBottom: "0.75rem" }}>
              {e.value}
            </div>
            <div style={{
              height: "3rem", marginBottom: "0.75rem", position: "relative",
              background: "var(--bg-surface-muted)", borderRadius: "var(--radius-sm)", overflow: "hidden",
            }}>
              <svg viewBox="0 0 100 48" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
                {e.curve === "ease" && (
                  <path d="M 0 48 C 25 43.2 25 0 100 0" fill="none" stroke="var(--color-kaya-indigo)" strokeWidth="2" />
                )}
                {e.curve === "ease-in" && (
                  <path d="M 0 48 C 42 48 100 0 100 0" fill="none" stroke="var(--color-kaya-indigo)" strokeWidth="2" />
                )}
                {e.curve === "ease-out" && (
                  <path d="M 0 48 C 0 0 58 0 100 0" fill="none" stroke="var(--color-kaya-indigo)" strokeWidth="2" />
                )}
                {e.curve === "ease-in-out" && (
                  <path d="M 0 48 C 42 48 58 0 100 0" fill="none" stroke="var(--color-kaya-indigo)" strokeWidth="2" />
                )}
                {e.curve === "spring" && (
                  <path d="M 0 48 C 34 -26.88 64 0 100 0" fill="none" stroke="var(--color-kanga-orange)" strokeWidth="2" />
                )}
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              {e.use}
            </div>
          </div>
        ))}
      </div>

      <h2>Combining duration + easing</h2>
      <table>
        <thead>
          <tr><th>Interaction</th><th>Duration</th><th>Easing</th><th>Property</th></tr>
        </thead>
        <tbody>
          <tr><td>Button hover</td><td>--duration-fast</td><td>--ease-default</td><td>background, box-shadow</td></tr>
          <tr><td>Focus ring</td><td>--duration-fast</td><td>--ease-out</td><td>outline-offset, opacity</td></tr>
          <tr><td>Dropdown open</td><td>--duration-moderate</td><td>--ease-out</td><td>opacity, transform</td></tr>
          <tr><td>Dropdown close</td><td>--duration-fast</td><td>--ease-in</td><td>opacity, transform</td></tr>
          <tr><td>Modal enter</td><td>--duration-slow</td><td>--ease-out</td><td>opacity, transform</td></tr>
          <tr><td>Modal exit</td><td>--duration-moderate</td><td>--ease-in</td><td>opacity, transform</td></tr>
          <tr><td>Page transition</td><td>--duration-slow</td><td>--ease-in-out</td><td>opacity</td></tr>
          <tr><td>Success celebration</td><td>--duration-slow</td><td>--ease-spring</td><td>transform</td></tr>
        </tbody>
      </table>

      <h2>Reduced motion</h2>
      <div style={{
        padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
        borderLeft: "3px solid var(--color-kaya-indigo)", background: "var(--bg-surface-muted)",
        marginBottom: "1.5rem", maxWidth: "42.5rem",
      }}>
        <p style={{ fontSize: "0.875rem", margin: 0 }}>
          <strong>All animation must respect <code>prefers-reduced-motion: reduce</code>.</strong>{" "}
          The design system&apos;s <code>base.css</code> sets <code>transition-duration: 0.01ms</code> and{" "}
          <code>animation-duration: 0.01ms</code> globally when the preference is active. Components
          should not override this.
        </p>
      </div>

      <h2>Guidelines</h2>
      <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Enter slower, exit faster.</strong> Appearing content earns attention; disappearing content should not linger.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Only animate what changed.</strong> If a card expands, animate the card — not the entire page layout.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>No decorative motion.</strong> Every animation should communicate state change, guide focus, or provide feedback.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Spring easing is celebratory.</strong> Reserve <code>--ease-spring</code> for success states and Kanga-palette moments.
        </li>
      </ul>
    </div>
  );
}
