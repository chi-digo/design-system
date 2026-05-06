import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import { DocShell } from "@/components/DocShell";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  adjustFontFallback: false,
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Chidigo Design System",
    template: "%s — Chidigo Design System",
  },
  description:
    "The design system for Chidigo digital products. Tokens, components, and patterns for the Digo language platform.",
};

const fontVars = [
  fraunces.variable,
  sourceSerif.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var r=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';document.documentElement.setAttribute('data-theme',r)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ background: "var(--bg-page)", color: "var(--fg-default)" }}
      >
        <DocShell>{children}</DocShell>
      </body>
    </html>
  );
}
