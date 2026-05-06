"use client";

import { useState } from "react";
import { SearchField } from "@chidigo/design-system/components/SearchField";
import { SearchResults } from "@chidigo/design-system/components/SearchResults";
import { Headword } from "@chidigo/design-system/components/Headword";
import { SenseList } from "@chidigo/design-system/components/SenseList";
import { RelatedWords } from "@chidigo/design-system/components/RelatedWords";
import { EtymologySection } from "@chidigo/design-system/components/EtymologySection";
import { AudioPlayer } from "@chidigo/design-system/components/AudioPlayer";
import { BilingualText } from "@chidigo/design-system/components/BilingualText";
import { TextField } from "@chidigo/design-system/components/TextField";
import { TextArea } from "@chidigo/design-system/components/TextArea";
import { Select } from "@chidigo/design-system/components/Select";
import { Button } from "@chidigo/design-system/components/Button";
import { Form } from "@chidigo/design-system/components/Form";
import { Skeleton } from "@chidigo/design-system/components/Skeleton";
import { KayambaLoader } from "@chidigo/design-system/components/KayambaLoader";
import { Alert } from "@chidigo/design-system/components/Alert";
import { EmptyState } from "@chidigo/design-system/components/EmptyState";
import { NavBar } from "@chidigo/design-system/components/NavBar";
import { SideNav } from "@chidigo/design-system/components/SideNav";
import { Breadcrumb } from "@chidigo/design-system/components/Breadcrumb";
import { BottomNav } from "@chidigo/design-system/components/BottomNav";
import { Tabs } from "@chidigo/design-system/components/Tabs";
import { Card, CardHeader } from "@chidigo/design-system/components/Card";
import { Container } from "@chidigo/design-system/components/Container";
import { Grid } from "@chidigo/design-system/components/Grid";
import { Box } from "@chidigo/design-system/components/Box";
import { Text } from "@chidigo/design-system/components/Text";
import { Heading } from "@chidigo/design-system/components/Heading";
import { Stack } from "@chidigo/design-system/components/Stack";
import { Badge } from "@chidigo/design-system/components/Badge";
import { Accordion } from "@chidigo/design-system/components/Accordion";
import { ProgressBar } from "@chidigo/design-system/components/ProgressBar";

const patterns = [
  { id: "dictionary-search", name: "Dictionary search", products: ["Gomba dictionary"] },
  { id: "dictionary-entry", name: "Dictionary entry", products: ["Gomba dictionary"] },
  { id: "bilingual-content", name: "Bilingual content", products: ["All"] },
  { id: "form-patterns", name: "Form patterns", products: ["Gomba dictionary", "Language app"] },
  { id: "loading-states", name: "Loading states", products: ["All"] },
  { id: "error-handling", name: "Error handling", products: ["All"] },
  { id: "audio-playback", name: "Audio playback", products: ["Gomba dictionary", "Language app"] },
  { id: "navigation", name: "Navigation", products: ["All"] },
  { id: "responsive-layout", name: "Responsive layout", products: ["All"] },
];

function PatternSection({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: "5rem", marginBottom: "3rem" }}>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "3rem", marginBottom: "0.5rem",
        paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-default)",
      }}>
        {title}
      </h2>
      <p style={{
        fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--fg-muted)",
        lineHeight: 1.55, maxWidth: "42.5rem", marginBottom: "1.25rem",
      }}>
        {description}
      </p>
      <div style={{
        padding: "1.5rem", borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)", background: "var(--bg-surface)",
      }}>
        {children}
      </div>
    </section>
  );
}

const sampleResults = [
  { headword: "mnazi", ipa: "/mˈnazi/", nounClass: "3", definition: "Coconut palm (Cocos nucifera). A tall tropical palm cultivated throughout the coast." },
  { headword: "mnariri", definition: "A type of tree with medicinal bark." },
  { headword: "mnara", definition: "Tower, minaret; a tall structure." },
];

export default function PatternsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const filteredResults = searchQuery.length >= 2
    ? sampleResults.filter((r) => r.headword.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Patterns
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem", lineHeight: 1.55 }}>
        Patterns are composed solutions that combine multiple components to solve common UX
        problems. Each pattern below includes a live demo showing how components work together.
      </p>

      {/* Jump links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "2.5rem" }}>
        {patterns.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            style={{
              fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 500,
              padding: "0.2rem 0.5rem", borderRadius: "var(--radius-full)",
              background: "var(--bg-surface-muted)", color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            {p.name}
          </a>
        ))}
      </div>

      {/* ---- DICTIONARY SEARCH ---- */}
      <PatternSection
        id="dictionary-search"
        title="Dictionary search"
        description="Search field with results list, empty state, and loading state. Handles partial matching and highlights query in results. Type at least 2 characters to see results."
      >
        <div style={{ maxWidth: "28rem" }}>
          <SearchField
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onClear={() => { setSearchQuery(""); setShowResults(false); }}
            placeholder="Try typing 'mna'…"
            label="Dictionary search"
          />
          {showResults && searchQuery.length >= 2 && (
            <div style={{
              marginTop: "var(--space-2)",
              border: "var(--border-width-thin) solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-surface)",
            }}>
              {filteredResults.length > 0 ? (
                <SearchResults query={searchQuery} results={filteredResults} />
              ) : (
                <EmptyState
                  title="No matches"
                  description={`No words match "${searchQuery}". Try a different spelling.`}
                />
              )}
            </div>
          )}
          {showResults && searchQuery.length === 1 && (
            <Text variant="body-sm" color="muted" style={{ marginTop: "var(--space-2)" }}>
              Type at least 2 characters to search…
            </Text>
          )}
        </div>
      </PatternSection>

      {/* ---- DICTIONARY ENTRY ---- */}
      <PatternSection
        id="dictionary-entry"
        title="Dictionary entry"
        description="Full entry layout composed from Headword, SenseList, EtymologySection, and RelatedWords. This is how a dictionary entry appears in the Gomba dictionary."
      >
        <div style={{ maxWidth: "36rem" }}>
          <Headword
            word="mnazi"
            pronunciation="/mˈnazi/"
            nounClass="3"
            partOfSpeech="n."
            audio={<AudioPlayer src="#" label="mnazi pronunciation" variant="inline" />}
          />
          <div style={{ marginTop: "var(--space-4)" }}>
            <SenseList senses={[
              {
                definition: "Coconut palm (Cocos nucifera).",
                examples: [
                  { text: "Mti unaomera ph'wani, una makumbi marefu na nazi.", translation: "The tree that grows by the coast, with long fronds and coconuts." },
                ],
              },
              {
                definition: "The fruit of the coconut palm.",
                usageNote: "more commonly nazi",
                examples: [
                  { text: "Nikanunula mnazi sokoni.", translation: "I bought a coconut at the market." },
                ],
              },
            ]} />
          </div>
          <div style={{ marginTop: "var(--space-5)" }}>
            <Text variant="ui" weight="semibold" style={{ marginBottom: "var(--space-1)" }}>Etymology</Text>
            <EtymologySection content={<>From Proto-Bantu <em>*-nàzí</em>. Cognates include Swahili <em>mnazi</em>, Pokomo <em>mnazi</em>, and Giriama <em>mnazi</em>.</>} />
          </div>
          <div style={{ marginTop: "var(--space-5)" }}>
            <Text variant="ui" weight="semibold" style={{ marginBottom: "var(--space-1)" }}>Related words</Text>
            <RelatedWords words={[
              { word: "nazi", href: "#" },
              { word: "mti", href: "#" },
              { word: "tende", href: "#" },
              { word: "embe" },
            ]} />
          </div>
        </div>
      </PatternSection>

      {/* ---- BILINGUAL CONTENT ---- */}
      <PatternSection
        id="bilingual-content"
        title="Bilingual content"
        description="Three layout modes for Digo + English content: stacked (primary above secondary), inline gloss (em-dash separated), and two-column (equal weight). Each mode sets lang attributes for screen readers."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "36rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Stacked — definition context</Text>
            <BilingualText
              primary="Mnazi ni mti unaomera ph'wani, una makumbi marefu."
              secondary="The coconut palm grows by the coast, with long fronds."
            />
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Inline — glossary or short phrases</Text>
            <BilingualText
              primary="Karibu"
              secondary="Welcome"
              layout="inline"
            />
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Two-column — parallel text</Text>
            <BilingualText
              primary="Mwana wa nyoka ni nyoka. Asemaye hivyo anajua asili ya mtu."
              secondary="A child of a snake is a snake. Whoever says this knows a person's origins."
              layout="two-column"
            />
          </div>
        </div>
      </PatternSection>

      {/* ---- FORM PATTERNS ---- */}
      <PatternSection
        id="form-patterns"
        title="Form patterns"
        description="Field layout, validation, error display, and submission flow. The Form component manages status (idle, submitting, success, error) and renders children as a function for status-aware UI."
      >
        <div style={{ maxWidth: "28rem" }}>
          <Form onSubmit={async (data) => {
            await new Promise((r) => setTimeout(r, 1500));
            const headword = data.get("headword") as string;
            if (!headword) throw new Error("Headword is required");
          }}>
            {(status) => (
              <>
                <TextField label="Headword" placeholder="Enter a Digo word" name="headword" />
                <Select
                  label="Noun class"
                  placeholder="Choose a class…"
                  options={[
                    { label: "Class 1 (m-/mw-)", value: "1" },
                    { label: "Class 3 (m-)", value: "3" },
                    { label: "Class 5 (ji-/Ø)", value: "5" },
                    { label: "Class 9 (n-/Ø)", value: "9" },
                  ]}
                />
                <TextArea label="Definition" placeholder="English definition" name="definition" rows={3} />
                {status === "success" && (
                  <Alert variant="success">Entry submitted successfully.</Alert>
                )}
                <Button type="submit" loading={status === "submitting"}>
                  {status === "success" ? "Submitted!" : "Submit entry"}
                </Button>
              </>
            )}
          </Form>
        </div>
      </PatternSection>

      {/* ---- LOADING STATES ---- */}
      <PatternSection
        id="loading-states"
        title="Loading states"
        description="Skeleton screens match the shape of loaded content. Use Skeleton for content placeholders and KayambaLoader for full-page or section loading. Never use a spinner where a skeleton will do."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Dictionary entry skeleton</Text>
            <div style={{ maxWidth: "28rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <Skeleton variant="rectangular" width="8rem" height="1.5rem" />
                <Skeleton variant="rectangular" width="5rem" height="1rem" />
                <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
              </div>
              <Skeleton variant="text" lines={2} />
              <div style={{ marginTop: "var(--space-3)" }}>
                <Skeleton variant="text" lines={1} />
              </div>
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Search results skeleton</Text>
            <div style={{ maxWidth: "28rem" }}>
              <SearchResults query="" results={[]} loading />
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Section loader</Text>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <KayambaLoader size="sm" />
              <KayambaLoader size="md" label="Loading dictionary…" />
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Progress indicator</Text>
            <div style={{ maxWidth: "20rem" }}>
              <ProgressBar value={65} label="Importing entries…" />
            </div>
          </div>
        </div>
      </PatternSection>

      {/* ---- ERROR HANDLING ---- */}
      <PatternSection
        id="error-handling"
        title="Error handling"
        description="Empty states, network errors, 404 pages, and validation errors. Each with clear messaging and a recovery action. Bilingual messaging for user-facing errors."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "28rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Empty search results</Text>
            <EmptyState
              title="No results found"
              description="Try a different search term or browse by letter."
              action={<Button variant="secondary" size="sm">Browse A-Z</Button>}
            />
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Network error</Text>
            <Alert variant="error" title="Connection lost">
              Could not reach the dictionary server. Check your connection and try again.
            </Alert>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Validation error</Text>
            <Alert variant="warning" title="Incomplete entry">
              This word is missing a definition and audio pronunciation.
            </Alert>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>404 page</Text>
            <EmptyState
              title="Page not found"
              description="The page you're looking for doesn't exist or has been moved."
              action={<Button variant="secondary" size="sm">Go home</Button>}
            />
          </div>
        </div>
      </PatternSection>

      {/* ---- AUDIO PLAYBACK ---- */}
      <PatternSection
        id="audio-playback"
        title="Audio playback"
        description="Pronunciation audio with inline and block variants. Inline for headwords (small play button beside text), block for longer recordings (full player with progress bar)."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "28rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Inline — beside a headword</Text>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 600 }}>mnazi</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>/mˈnazi/</span>
              <AudioPlayer src="#" label="mnazi pronunciation" variant="inline" />
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Inline — in a definition list</Text>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {["mnazi", "nazi", "tende"].map((word) => (
                <div key={word} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <AudioPlayer src="#" label={`${word} pronunciation`} variant="inline" />
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}>{word}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Block — proverb or sentence recording</Text>
            <AudioPlayer src="#" label="Proverb: Mwana wa nyoka ni nyoka" variant="block" />
          </div>
        </div>
      </PatternSection>

      {/* ---- NAVIGATION ---- */}
      <PatternSection
        id="navigation"
        title="Navigation"
        description="App shell with top bar, sidebar, breadcrumbs, tabs, and mobile bottom nav. Components compose together for consistent navigation across all Chidigo products."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Top bar + breadcrumbs</Text>
            <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <NavBar
                variant="app"
                logo={<span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.125rem" }}>Gomba</span>}
                actions={<Button size="sm" variant="ghost">Sign in</Button>}
                style={{ position: "relative" }}
              >
                <a href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)", textDecoration: "none" }}>Dictionary</a>
                <a href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)", textDecoration: "none" }}>Proverbs</a>
              </NavBar>
              <div style={{ padding: "var(--space-3) var(--space-4)" }}>
                <Breadcrumb items={[
                  { label: "Home", href: "#" },
                  { label: "Dictionary", href: "#" },
                  { label: "M", href: "#" },
                  { label: "mnazi" },
                ]} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 14rem" }}>
              <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Side navigation</Text>
              <SideNav items={[
                { label: "Dictionary", href: "#", active: true },
                { label: "Proverbs", href: "#" },
                { label: "Grammar", href: "#", children: [
                  { label: "Noun classes", href: "#" },
                  { label: "Verb forms", href: "#" },
                ]},
                { label: "About", href: "#" },
              ]} />
            </div>
            <div style={{ flex: 1 }}>
              <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Content tabs</Text>
              <Tabs items={[
                { label: "Definition", content: <Text>Coconut palm (Cocos nucifera). A tall tropical palm cultivated throughout the coast.</Text> },
                { label: "Examples", content: <Text><em>Mti unaomera ph&apos;wani, una makumbi marefu na nazi.</em></Text> },
                { label: "Etymology", content: <Text>From Proto-Bantu *-nàzí.</Text> },
              ]} />
            </div>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Mobile bottom nav</Text>
            <div style={{ position: "relative", height: "4rem", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <BottomNav
                style={{ position: "absolute" }}
                items={[
                  { label: "Home", href: "#", icon: <NavIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />, active: true },
                  { label: "Search", href: "#", icon: <NavIcon d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z" /> },
                  { label: "Saved", href: "#", icon: <NavIcon d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> },
                  { label: "Profile", href: "#", icon: <NavIcon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" /> },
                ]}
              />
            </div>
          </div>
        </div>
      </PatternSection>

      {/* ---- RESPONSIVE LAYOUT ---- */}
      <PatternSection
        id="responsive-layout"
        title="Responsive layout"
        description="Content width constraints with Container, column grids with Grid, and responsive card layouts. Reading content at 680px max, app shell at 1200px."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Container sizes</Text>
            <Stack gap="var(--space-3)">
              {(["reading", "content", "wide"] as const).map((size) => (
                <Container key={size} size={size}>
                  <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)">
                    <Text variant="ui">Container: {size}</Text>
                  </Box>
                </Container>
              ))}
            </Stack>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Responsive card grid</Text>
            <Grid minChildWidth="200px" gap="var(--space-4)">
              {["mnazi", "nyumba", "mwana", "kuni"].map((word) => (
                <Card key={word}>
                  <CardHeader title={word} subtitle="Dictionary entry" />
                  <Text variant="body-sm" color="muted">Tap to view the full dictionary entry for this word.</Text>
                </Card>
              ))}
            </Grid>
          </div>
          <div>
            <Text variant="ui" color="muted" weight="semibold" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>Two-column reading layout</Text>
            <Grid columns={2} gap="var(--space-6)">
              <div>
                <Heading level={4}>Digo</Heading>
                <Text lang="dig">Mnazi ni mti unaomera ph&apos;wani, una makumbi marefu na nazi. Mti huno ni muhimu sana kwa maisha ga Adigo — chakurya, chinywaji, nyumba, na mila.</Text>
              </div>
              <div>
                <Heading level={4}>English</Heading>
                <Text>The coconut palm grows by the coast, with long fronds and coconuts. This tree is very important for Digo life — food, drink, shelter, and ritual.</Text>
              </div>
            </Grid>
          </div>
        </div>
      </PatternSection>

      {/* ---- GUIDELINES ---- */}
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "3.5rem", marginBottom: "1rem",
        paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-default)",
      }}>
        When to create a pattern
      </h2>
      <ul style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, paddingLeft: "1.25rem", maxWidth: "42.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Two products need the same solution.</strong> If only one product uses it, it&apos;s a product feature, not a pattern.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>The composition involves non-obvious decisions.</strong> If combining components is straightforward, you don&apos;t need a pattern — just compose them.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Accessibility requires coordination.</strong> When multiple components need coordinated ARIA roles, focus management, or keyboard interaction.
        </li>
      </ul>

      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "2.5rem", marginBottom: "1rem",
        paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-default)",
      }}>
        Pattern vs. component
      </h2>
      <table style={{
        width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem",
        fontFamily: "var(--font-sans)", fontSize: "0.875rem",
      }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", fontWeight: 500, padding: "0.75rem 1rem", borderBottom: "2px solid var(--border-default)", color: "var(--fg-muted)", fontSize: "0.75rem", letterSpacing: "0.01em", textTransform: "uppercase" }}>Aspect</th>
            <th style={{ textAlign: "left", fontWeight: 500, padding: "0.75rem 1rem", borderBottom: "2px solid var(--border-default)", color: "var(--fg-muted)", fontSize: "0.75rem", letterSpacing: "0.01em", textTransform: "uppercase" }}>Component</th>
            <th style={{ textAlign: "left", fontWeight: 500, padding: "0.75rem 1rem", borderBottom: "2px solid var(--border-default)", color: "var(--fg-muted)", fontSize: "0.75rem", letterSpacing: "0.01em", textTransform: "uppercase" }}>Pattern</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Scope</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Single UI element</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Composed solution from multiple components</td></tr>
          <tr><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Import</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", background: "var(--bg-surface-muted)", padding: "0.1em 0.3em", borderRadius: "var(--radius-sm)" }}>{"import { Button }"}</code></td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Documentation + guidelines</td></tr>
          <tr><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Example</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>SearchField, Card, Badge</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Dictionary search flow, bilingual layout</td></tr>
          <tr><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Decisions</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Visual + interactive</td><td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-default)" }}>Layout, flow, content strategy, a11y coordination</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
