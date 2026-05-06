/**
 * Chidigo Design System — Tailwind CSS 4 Preset
 *
 * Maps brand tokens to Tailwind utility classes.
 * Import in consuming products: presets: [chidigoPreset]
 */

const chidigoPreset = {
  theme: {
    colors: {
      // Primitives
      "hando-cream": "var(--color-hando-cream)",
      "ngundu-red": "var(--color-ngundu-red)",
      "kaya-indigo": "var(--color-kaya-indigo)",
      "vigango-black": "var(--color-vigango-black)",
      "coral-lime-sand": "var(--color-coral-lime-sand)",
      "mangrove-green": "var(--color-mangrove-green)",
      "palm-frond-green": "var(--color-palm-frond-green)",
      "mnazi-gold": "var(--color-mnazi-gold)",
      "kanga-orange": "var(--color-kanga-orange)",
      "kanga-yellow": "var(--color-kanga-yellow)",
      white: "var(--color-white)",

      // Semantic backgrounds
      "bg-page": "var(--bg-page)",
      "bg-surface": "var(--bg-surface)",
      "bg-surface-warm": "var(--bg-surface-warm)",
      "bg-surface-brand": "var(--bg-surface-brand)",
      "bg-surface-muted": "var(--bg-surface-muted)",
      "bg-overlay": "var(--bg-overlay)",
      "bg-example": "var(--bg-example)",

      // Semantic foreground
      "fg-default": "var(--fg-default)",
      "fg-heading": "var(--fg-heading)",
      "fg-muted": "var(--fg-muted)",
      "fg-subtle": "var(--fg-subtle)",
      "fg-on-brand": "var(--fg-on-brand)",
      "fg-link": "var(--fg-link)",

      // Semantic borders
      "border-default": "var(--border-default)",
      "border-strong": "var(--border-strong)",

      // Status
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      error: "var(--color-error)",
      info: "var(--color-info)",

      // Interactive
      interactive: "var(--interactive-default)",
      "interactive-hover": "var(--interactive-hover)",

      // Accents
      "accent-primary": "var(--accent-primary)",
      "accent-editorial": "var(--accent-editorial)",
      "accent-community": "var(--accent-community)",
      "accent-favourite": "var(--accent-favourite)",

      // Audio
      "audio-play": "var(--audio-play)",
      "audio-play-bg": "var(--audio-play-bg)",

      // Domain
      "sense-number-bg": "var(--sense-number-bg)",
      "sense-number-fg": "var(--sense-number-fg)",
      "noun-class-bg": "var(--noun-class-bg)",
      "noun-class-fg": "var(--noun-class-fg)",

      // Transparent
      transparent: "transparent",
      current: "currentColor",
    },

    fontFamily: {
      display: "var(--font-display)",
      serif: "var(--font-serif)",
      sans: "var(--font-sans)",
      mono: "var(--font-mono)",
    },

    borderRadius: {
      none: "var(--radius-none)",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      full: "var(--radius-full)",
    },

    boxShadow: {
      sm: "var(--shadow-sm)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)",
      none: "none",
    },

    zIndex: {
      base: "var(--z-base)",
      raised: "var(--z-raised)",
      dropdown: "var(--z-dropdown)",
      sticky: "var(--z-sticky)",
      overlay: "var(--z-overlay)",
      modal: "var(--z-modal)",
      toast: "var(--z-toast)",
      tooltip: "var(--z-tooltip)",
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },

    extend: {
      spacing: {
        "0.5": "var(--space-0-5)",
        "1": "var(--space-1)",
        "1.5": "var(--space-1-5)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "20": "var(--space-20)",
        "24": "var(--space-24)",
        "32": "var(--space-32)",
      },

      maxWidth: {
        reading: "42.5rem",
        content: "75rem",
        wide: "90rem",
      },

      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        moderate: "var(--duration-moderate)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },

      transitionTimingFunction: {
        default: "var(--ease-default)",
        "ease-in": "var(--ease-in)",
        "ease-out": "var(--ease-out)",
        "ease-in-out": "var(--ease-in-out)",
        spring: "var(--ease-spring)",
      },
    },
  },
};

export default chidigoPreset;
