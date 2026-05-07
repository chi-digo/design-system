"use client";

import { useState } from "react";

import { Button } from "@chidigo/design-system/components/Button";
import { IconButton } from "@chidigo/design-system/components/IconButton";
import { TextField } from "@chidigo/design-system/components/TextField";
import { SearchField } from "@chidigo/design-system/components/SearchField";
import { Select } from "@chidigo/design-system/components/Select";
import { Card, CardHeader, CardActions } from "@chidigo/design-system/components/Card";
import { Badge } from "@chidigo/design-system/components/Badge";
import { AudioPlayer } from "@chidigo/design-system/components/AudioPlayer";
import { BilingualText } from "@chidigo/design-system/components/BilingualText";
import { Headword } from "@chidigo/design-system/components/Headword";
import { SenseList } from "@chidigo/design-system/components/SenseList";
import { ProverbCard } from "@chidigo/design-system/components/ProverbCard";
import { Accordion } from "@chidigo/design-system/components/Accordion";
import { Dialog } from "@chidigo/design-system/components/Dialog";
import { Toast } from "@chidigo/design-system/components/Toast";
import { Tooltip } from "@chidigo/design-system/components/Tooltip";
import { Tabs } from "@chidigo/design-system/components/Tabs";
import { Breadcrumb } from "@chidigo/design-system/components/Breadcrumb";
import { Skeleton } from "@chidigo/design-system/components/Skeleton";
import { Avatar } from "@chidigo/design-system/components/Avatar";
import { Tag } from "@chidigo/design-system/components/Tag";
import { ProgressBar } from "@chidigo/design-system/components/ProgressBar";
import { Box } from "@chidigo/design-system/components/Box";
import { Stack } from "@chidigo/design-system/components/Stack";
import { Inline } from "@chidigo/design-system/components/Inline";
import { Container } from "@chidigo/design-system/components/Container";
import { Grid } from "@chidigo/design-system/components/Grid";
import { Divider } from "@chidigo/design-system/components/Divider";
import { VisuallyHidden } from "@chidigo/design-system/components/VisuallyHidden";
import { Heading } from "@chidigo/design-system/components/Heading";
import { Text } from "@chidigo/design-system/components/Text";
import { DisplayText } from "@chidigo/design-system/components/DisplayText";
import { IPA } from "@chidigo/design-system/components/IPA";
import { ButtonGroup } from "@chidigo/design-system/components/ButtonGroup";
import { Link } from "@chidigo/design-system/components/Link";
import { TextArea } from "@chidigo/design-system/components/TextArea";
import { Checkbox } from "@chidigo/design-system/components/Checkbox";
import { RadioGroup } from "@chidigo/design-system/components/RadioGroup";
import { Switch } from "@chidigo/design-system/components/Switch";
import { LanguageSelector } from "@chidigo/design-system/components/LanguageSelector";
import { Pagination } from "@chidigo/design-system/components/Pagination";
import { Alert } from "@chidigo/design-system/components/Alert";
import { KayambaLoader } from "@chidigo/design-system/components/KayambaLoader";
import { EmptyState } from "@chidigo/design-system/components/EmptyState";
import { DataTable } from "@chidigo/design-system/components/DataTable";
import { DescriptionList } from "@chidigo/design-system/components/DescriptionList";
import { Timeline } from "@chidigo/design-system/components/Timeline";
import { Drawer } from "@chidigo/design-system/components/Drawer";
import { Popover } from "@chidigo/design-system/components/Popover";
import { DropdownMenu } from "@chidigo/design-system/components/DropdownMenu";
import { RelatedWords } from "@chidigo/design-system/components/RelatedWords";
import { NounClassBadge } from "@chidigo/design-system/components/NounClassBadge";
import { WordOfTheDay } from "@chidigo/design-system/components/WordOfTheDay";
import { ProverbOfTheDay } from "@chidigo/design-system/components/ProverbOfTheDay";
import { ContributionPrompt } from "@chidigo/design-system/components/ContributionPrompt";
import { TrackBadge } from "@chidigo/design-system/components/TrackBadge";
import { SearchResults } from "@chidigo/design-system/components/SearchResults";
import { NavBar } from "@chidigo/design-system/components/NavBar";
import { SideNav } from "@chidigo/design-system/components/SideNav";
import { BottomNav } from "@chidigo/design-system/components/BottomNav";
import { SkipToContent } from "@chidigo/design-system/components/SkipToContent";
import { Form } from "@chidigo/design-system/components/Form";
import { EtymologySection } from "@chidigo/design-system/components/EtymologySection";

const componentGroups = [
  { category: "Layout Primitives", items: [
    { id: "box-stack-inline", label: "Box / Stack / Inline" },
    { id: "container-grid", label: "Container / Grid" },
    { id: "divider", label: "Divider" },
  ]},
  { category: "Typography", items: [
    { id: "heading", label: "Heading" },
    { id: "text", label: "Text" },
    { id: "display-text", label: "DisplayText" },
    { id: "ipa", label: "IPA" },
    { id: "bilingual-text", label: "BilingualText" },
  ]},
  { category: "Actions", items: [
    { id: "button", label: "Button" },
    { id: "icon-button", label: "IconButton" },
    { id: "button-group", label: "ButtonGroup" },
    { id: "link", label: "Link" },
  ]},
  { category: "Selection & Input", items: [
    { id: "text-field", label: "TextField" },
    { id: "text-area", label: "TextArea" },
    { id: "search-field", label: "SearchField" },
    { id: "select", label: "Select" },
    { id: "checkbox", label: "Checkbox" },
    { id: "radio-group", label: "RadioGroup" },
    { id: "switch", label: "Switch" },
    { id: "language-selector", label: "LanguageSelector" },
    { id: "form", label: "Form" },
  ]},
  { category: "Navigation", items: [
    { id: "navbar", label: "NavBar" },
    { id: "sidenav", label: "SideNav" },
    { id: "bottomnav", label: "BottomNav" },
    { id: "breadcrumb", label: "Breadcrumb" },
    { id: "tabs", label: "Tabs" },
    { id: "pagination", label: "Pagination" },
    { id: "skip-to-content", label: "SkipToContent" },
  ]},
  { category: "Feedback & Status", items: [
    { id: "alert", label: "Alert" },
    { id: "toast", label: "Toast" },
    { id: "dialog", label: "Dialog" },
    { id: "drawer", label: "Drawer" },
    { id: "kayamba-loader", label: "KayambaLoader" },
    { id: "progress-bar", label: "ProgressBar" },
    { id: "skeleton", label: "Skeleton" },
    { id: "empty-state", label: "EmptyState" },
  ]},
  { category: "Data Display", items: [
    { id: "card", label: "Card" },
    { id: "badge", label: "Badge" },
    { id: "tag", label: "Tag" },
    { id: "avatar", label: "Avatar" },
    { id: "noun-class-badge", label: "NounClassBadge" },
    { id: "track-badge", label: "TrackBadge" },
    { id: "data-table", label: "DataTable" },
    { id: "description-list", label: "DescriptionList" },
    { id: "timeline", label: "Timeline" },
    { id: "accordion", label: "Accordion" },
  ]},
  { category: "Overlays", items: [
    { id: "tooltip", label: "Tooltip" },
    { id: "popover", label: "Popover" },
    { id: "dropdown-menu", label: "DropdownMenu" },
  ]},
  { category: "Dictionary", items: [
    { id: "headword", label: "Headword" },
    { id: "sense-list", label: "SenseList" },
    { id: "etymology-section", label: "EtymologySection" },
    { id: "related-words", label: "RelatedWords" },
    { id: "search-results", label: "SearchResults" },
    { id: "audio-player", label: "AudioPlayer" },
    { id: "word-of-the-day", label: "WordOfTheDay" },
  ]},
  { category: "Proverbs", items: [
    { id: "proverb-card", label: "ProverbCard" },
    { id: "proverb-of-the-day", label: "ProverbOfTheDay" },
  ]},
  { category: "Contribution", items: [
    { id: "contribution-prompt", label: "ContributionPrompt" },
  ]},
  { category: "Utilities", items: [
    { id: "visually-hidden", label: "VisuallyHidden" },
  ]},
];

function DemoSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: "5rem" }}>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.5rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "2rem", marginBottom: "0.75rem",
      }}>
        {title}
      </h3>
      <div style={{
        padding: "1.5rem", borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)", background: "var(--bg-surface)",
        marginBottom: "1.5rem",
      }}>
        {children}
      </div>
    </section>
  );
}

function CategoryHeader({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem",
        lineHeight: 1.20, color: "var(--fg-heading)", marginTop: "3.5rem", marginBottom: "0.5rem",
        paddingBottom: "0.5rem", borderBottom: "2px solid var(--border-default)",
        scrollMarginTop: "5rem",
      }}
    >
      {title}
    </h2>
  );
}

export default function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [tags, setTags] = useState(["Digo", "Swahili", "Bantu"]);
  const [radioValue, setRadioValue] = useState("dig");
  const [switchChecked, setSwitchChecked] = useState(true);
  const [langValue, setLangValue] = useState<"auto" | "dig" | "en" | "sw">("dig");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ maxWidth: "64rem" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600,
        lineHeight: 1.15, color: "var(--fg-heading)", marginBottom: "0.75rem",
      }}>
        Components
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2rem", lineHeight: 1.55 }}>
        60 components organized into 12 categories — from layout primitives and typography to
        domain-specific dictionary and bilingual content components. All use semantic tokens
        and handle light/dark mode automatically.
      </p>

      {/* Jump links grouped by category */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
        {componentGroups.map((g) => (
          <div key={g.category}>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 600,
              color: "var(--fg-heading)", textTransform: "uppercase", letterSpacing: "0.04em",
              margin: "0 0 0.25rem",
            }}>
              {g.category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {g.items.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 500,
                    padding: "0.2rem 0.5rem", borderRadius: "var(--radius-full)",
                    background: "var(--bg-surface-muted)", color: "var(--fg-muted)",
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================
          LAYOUT PRIMITIVES
          ================================================================ */}
      <CategoryHeader id="cat-layout" title="Layout Primitives" />

      <DemoSection id="box-stack-inline" title="Box / Stack / Inline">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Box</p>
            <Box padding="var(--space-4)" bg="var(--bg-surface-muted)" radius="var(--radius-md)" border="var(--border-width-thin) solid var(--border-default)">
              <Text>A box with padding, background, radius, and border</Text>
            </Box>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Stack (vertical)</p>
            <Stack gap="var(--space-3)">
              <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)"><Text variant="ui">Item 1</Text></Box>
              <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)"><Text variant="ui">Item 2</Text></Box>
              <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)"><Text variant="ui">Item 3</Text></Box>
            </Stack>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Inline (horizontal)</p>
            <Inline gap="var(--space-3)">
              <Badge>One</Badge>
              <Badge>Two</Badge>
              <Badge>Three</Badge>
              <Badge>Four</Badge>
            </Inline>
          </div>
        </div>
      </DemoSection>

      <DemoSection id="container-grid" title="Container / Grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Fixed columns (2, 3, 4)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Grid columns={2} gap="var(--space-4)">
                {[1, 2].map((n) => (
                  <Box key={n} padding="var(--space-4)" bg="var(--bg-surface-muted)" radius="var(--radius-md)"><Text variant="ui" style={{ fontWeight: 500 }}>1/2</Text></Box>
                ))}
              </Grid>
              <Grid columns={3} gap="var(--space-4)">
                {[1, 2, 3].map((n) => (
                  <Box key={n} padding="var(--space-4)" bg="var(--bg-surface-muted)" radius="var(--radius-md)"><Text variant="ui" style={{ fontWeight: 500 }}>1/3</Text></Box>
                ))}
              </Grid>
              <Grid columns={4} gap="var(--space-4)">
                {[1, 2, 3, 4].map((n) => (
                  <Box key={n} padding="var(--space-4)" bg="var(--bg-surface-muted)" radius="var(--radius-md)"><Text variant="ui" style={{ fontWeight: 500 }}>1/4</Text></Box>
                ))}
              </Grid>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Responsive auto-fill (min 150px) — resize the window to see columns reflow</p>
            <Grid minChildWidth="150px" gap="var(--space-4)">
              {["mnazi", "nyumba", "mwana", "kuni", "maji", "chakurya"].map((w) => (
                <Box key={w} padding="var(--space-4)" bg="var(--bg-surface-muted)" radius="var(--radius-md)">
                  <Text variant="ui" style={{ fontWeight: 600 }}>{w}</Text>
                  <Text variant="body-sm" color="muted">Dictionary entry</Text>
                </Box>
              ))}
            </Grid>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Custom column template (sidebar + content)</p>
            <Grid columns="240px 1fr" gap="var(--space-4)">
              <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)">
                <Text variant="ui" style={{ fontWeight: 500 }}>Sidebar</Text>
                <Text variant="body-sm" color="muted">240px fixed</Text>
              </Box>
              <Box padding="var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)">
                <Text variant="ui" style={{ fontWeight: 500 }}>Content</Text>
                <Text variant="body-sm" color="muted">1fr flexible</Text>
              </Box>
            </Grid>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Card layout — small gap (space-2 = 8px)</p>
            <Grid minChildWidth="200px" gap="var(--space-2)">
              {["mnazi", "nyumba", "mwana"].map((word) => (
                <Card key={word}>
                  <CardHeader title={word} subtitle="Noun, cl. 3" />
                  <Text variant="body-sm" color="muted">Tap to view the full dictionary entry.</Text>
                </Card>
              ))}
            </Grid>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Card layout — medium gap (space-4 = 16px)</p>
            <Grid minChildWidth="200px" gap="var(--space-4)">
              {["kuni", "maji", "chakurya"].map((word) => (
                <Card key={word}>
                  <CardHeader title={word} subtitle="Noun, cl. 9" />
                  <Text variant="body-sm" color="muted">Tap to view the full dictionary entry.</Text>
                </Card>
              ))}
            </Grid>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Card layout — large gap (space-8 = 32px)</p>
            <Grid minChildWidth="200px" gap="var(--space-8)">
              {["ngombe", "kuku", "mbuzi"].map((word) => (
                <Card key={word}>
                  <CardHeader title={word} subtitle="Noun, cl. 9" />
                  <Text variant="body-sm" color="muted">Tap to view the full dictionary entry.</Text>
                </Card>
              ))}
            </Grid>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Container width constraints</p>
            <Stack gap="var(--space-3)">
              {(["reading", "content", "wide"] as const).map((size) => (
                <Container key={size} size={size}>
                  <Box padding="var(--space-2) var(--space-3)" bg="var(--bg-surface-muted)" radius="var(--radius-sm)">
                    <Text variant="body-sm">Container: <strong>{size}</strong> ({size === "reading" ? "680px" : size === "content" ? "960px" : "1200px"})</Text>
                  </Box>
                </Container>
              ))}
            </Stack>
          </div>
        </div>
      </DemoSection>

      <DemoSection id="divider" title="Divider">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Text variant="body-sm">Content above</Text>
          <Divider />
          <Text variant="body-sm">Default divider above, strong below</Text>
          <Divider variant="strong" />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
            <Text variant="body-sm">Left</Text>
            <Divider orientation="vertical" />
            <Text variant="body-sm">Right</Text>
          </div>
        </div>
      </DemoSection>

      {/* ================================================================
          TYPOGRAPHY
          ================================================================ */}
      <CategoryHeader id="cat-typography" title="Typography" />

      <DemoSection id="heading" title="Heading">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
        </div>
      </DemoSection>

      <DemoSection id="text" title="Text">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text variant="body-lg">Body large — for lead paragraphs</Text>
          <Text variant="body">Body — default reading text</Text>
          <Text variant="body-sm">Body small — captions and footnotes</Text>
          <Text variant="ui">UI text — buttons and labels</Text>
          <Text variant="mono">Mono — IPA and code</Text>
          <Text color="muted">Muted color</Text>
          <Text color="error">Error color</Text>
          <Text color="success">Success color</Text>
        </div>
      </DemoSection>

      <DemoSection id="display-text" title="DisplayText">
        <DisplayText size="xl">Chidigo</DisplayText>
        <DisplayText size="lg" lang="dig">Lugha ya mudigo</DisplayText>
      </DemoSection>

      <DemoSection id="ipa" title="IPA">
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <IPA transcription="/mˈnazi/" />
          <IPA transcription="/ʧiˈdigo/" />
          <IPA transcription="/ˈkuni/" />
        </div>
      </DemoSection>

      <DemoSection id="bilingual-text" title="BilingualText">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "0.5rem" }}>Stacked</p>
            <BilingualText primary="Karibu ku Chidigo." secondary="Welcome to Chidigo." />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "0.5rem" }}>Inline</p>
            <BilingualText primary="Karibu ku Chidigo" secondary="Welcome to Chidigo" layout="inline" />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: "0.5rem" }}>Two-column</p>
            <BilingualText primary="Mwana wa nyoka ni nyoka." secondary="A child of a snake is a snake." layout="two-column" />
          </div>
        </div>
      </DemoSection>

      {/* ================================================================
          ACTIONS
          ================================================================ */}
      <CategoryHeader id="cat-actions" title="Actions" />

      <DemoSection id="button" title="Button">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginTop: "1rem" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSection>

      <DemoSection id="icon-button" title="IconButton">
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <IconButton label="Settings" icon={<GearIcon />} />
          <IconButton label="Settings" icon={<GearIcon />} variant="ghost" />
          <IconButton label="Delete" icon={<TrashIcon />} variant="danger" />
          <IconButton label="Settings" icon={<GearIcon />} size="sm" />
          <IconButton label="Settings" icon={<GearIcon />} size="lg" />
        </div>
      </DemoSection>

      <DemoSection id="button-group" title="ButtonGroup">
        <ButtonGroup>
          <Button variant="secondary" size="sm">Bold</Button>
          <Button variant="secondary" size="sm">Italic</Button>
          <Button variant="secondary" size="sm">Underline</Button>
        </ButtonGroup>
      </DemoSection>

      <DemoSection id="link" title="Link">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link href="#">Inline link (default)</Link>
          <Link href="#" variant="standalone">Standalone link</Link>
          <Link href="#" external>External link</Link>
          <Link href="#" underline="none">No underline</Link>
        </div>
      </DemoSection>

      {/* ================================================================
          SELECTION & INPUT
          ================================================================ */}
      <CategoryHeader id="cat-input" title="Selection & Input" />

      <DemoSection id="text-field" title="TextField">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "24rem" }}>
          <TextField label="Word" placeholder="Enter a Digo word" helperText="The dictionary headword" />
          <TextField
            label="Definition"
            placeholder="Write something…"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            maxCharacters={200}
            currentLength={textValue.length}
          />
          <TextField label="Required field" error="This field is required" />
        </div>
      </DemoSection>

      <DemoSection id="text-area" title="TextArea">
        <div style={{ maxWidth: "24rem" }}>
          <TextArea label="Example sentence" placeholder="Type a Digo sentence…" helperText="Add a usage example for this word" rows={3} />
        </div>
      </DemoSection>

      <DemoSection id="search-field" title="SearchField">
        <div style={{ maxWidth: "24rem" }}>
          <SearchField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue("")}
            placeholder="Search the dictionary…"
            label="Dictionary search"
          />
        </div>
      </DemoSection>

      <DemoSection id="select" title="Select">
        <div style={{ maxWidth: "20rem" }}>
          <Select
            label="Noun class"
            placeholder="Choose a class…"
            options={[
              { label: "Class 1 (m-/mw-)", value: "1" },
              { label: "Class 2 (wa-)", value: "2" },
              { label: "Class 3 (m-)", value: "3" },
              { label: "Class 4 (mi-)", value: "4" },
              { label: "Class 5 (ji-/Ø)", value: "5" },
              { label: "Class 6 (ma-)", value: "6" },
            ]}
            helperText="Select the noun class prefix"
          />
        </div>
      </DemoSection>

      <DemoSection id="checkbox" title="Checkbox">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Checkbox label="Include etymology" defaultChecked />
          <Checkbox label="Include audio pronunciation" />
          <Checkbox label="Mark as verified" helpText="Only editors can verify entries" />
          <Checkbox label="Disabled option" disabled />
        </div>
      </DemoSection>

      <DemoSection id="radio-group" title="RadioGroup">
        <div style={{ display: "flex", gap: "2rem" }}>
          <RadioGroup
            label="Language"
            value={radioValue}
            onChange={setRadioValue}
            options={[
              { value: "dig", label: "Chidigo" },
              { value: "en", label: "English" },
              { value: "sw", label: "Kiswahili" },
            ]}
          />
          <RadioGroup
            label="Orientation"
            orientation="horizontal"
            options={[
              { value: "ltr", label: "LTR" },
              { value: "rtl", label: "RTL" },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection id="switch" title="Switch">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Switch label="Dark mode" checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)} />
          <Switch label="Show IPA transcriptions" size="sm" />
          <Switch label="Disabled" disabled />
        </div>
      </DemoSection>

      <DemoSection id="language-selector" title="LanguageSelector">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Dropdown</p>
            <LanguageSelector value={langValue} onChange={setLangValue} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Segmented</p>
            <LanguageSelector value={langValue} onChange={setLangValue} variant="segmented" />
          </div>
        </div>
      </DemoSection>

      <DemoSection id="form" title="Form">
        <div style={{ maxWidth: "24rem" }}>
          <Form onSubmit={async () => { await new Promise((r) => setTimeout(r, 1000)); }}>
            {(status) => (
              <>
                <TextField label="Headword" placeholder="Enter a Digo word" name="headword" />
                <TextField label="Definition" placeholder="English definition" name="definition" />
                <Button type="submit" loading={status === "submitting"}>
                  {status === "success" ? "Saved!" : "Submit"}
                </Button>
              </>
            )}
          </Form>
        </div>
      </DemoSection>

      {/* ================================================================
          NAVIGATION
          ================================================================ */}
      <CategoryHeader id="cat-navigation" title="Navigation" />

      <DemoSection id="navbar" title="NavBar">
        <div style={{ position: "relative", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <NavBar
            variant="app"
            logo={<span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.125rem" }}>Gomba</span>}
            actions={<Button size="sm" variant="ghost">Sign in</Button>}
            style={{ position: "relative" }}
          >
            <a href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)", textDecoration: "none" }}>Dictionary</a>
            <a href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-muted)", textDecoration: "none" }}>Proverbs</a>
          </NavBar>
        </div>
      </DemoSection>

      <DemoSection id="sidenav" title="SideNav">
        <div style={{ maxWidth: "16rem" }}>
          <SideNav items={[
            { label: "Dictionary", href: "#", active: true },
            { label: "Proverbs", href: "#" },
            { label: "Grammar", href: "#", children: [
              { label: "Noun classes", href: "#" },
              { label: "Verb forms", href: "#" },
            ] },
            { label: "About", href: "#" },
          ]} />
        </div>
      </DemoSection>

      <DemoSection id="bottomnav" title="BottomNav">
        <div style={{ position: "relative", height: "4rem", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <BottomNav
            style={{ position: "absolute" }}
            items={[
              { label: "Home", href: "#", icon: <HomeIcon />, active: true },
              { label: "Search", href: "#", icon: <SearchIcon /> },
              { label: "Saved", href: "#", icon: <BookmarkIcon /> },
              { label: "Profile", href: "#", icon: <UserIcon /> },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection id="breadcrumb" title="Breadcrumb">
        <Breadcrumb items={[
          { label: "Home", href: "#" },
          { label: "Dictionary", href: "#" },
          { label: "M", href: "#" },
          { label: "mnazi" },
        ]} />
      </DemoSection>

      <DemoSection id="tabs" title="Tabs">
        <Tabs items={[
          { label: "Definition", content: <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, color: "var(--fg-default)", margin: 0 }}>Coconut palm (Cocos nucifera). A tall tropical palm cultivated throughout the coast.</p> },
          { label: "Examples", content: <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, color: "var(--fg-default)", margin: 0 }}><em>Mti unaomera ph&apos;wani, una makumbi marefu na nazi.</em></p> },
          { label: "Etymology", content: <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, color: "var(--fg-default)", margin: 0 }}>From Proto-Bantu *-nàzí. Cognates in Swahili (mnazi), Pokomo (mnazi).</p> },
          { label: "Disabled", content: null, disabled: true },
        ]} />
      </DemoSection>

      <DemoSection id="pagination" title="Pagination">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Pagination totalPages={10} currentPage={currentPage} onChange={setCurrentPage} />
          <Pagination totalPages={5} currentPage={1} onChange={() => {}} variant="simple" />
        </div>
      </DemoSection>

      <DemoSection id="skip-to-content" title="SkipToContent">
        <div style={{ position: "relative", padding: "1rem 0" }}>
          <Text variant="body-sm" color="muted">Tab into this area to see the skip link appear:</Text>
          <div style={{ position: "relative", marginTop: "0.5rem", padding: "2rem", border: "1px dashed var(--border-default)", borderRadius: "var(--radius-md)" }}>
            <SkipToContent style={{ position: "absolute" }} />
            <Text variant="body-sm">Press Tab to reveal the skip link</Text>
          </div>
        </div>
      </DemoSection>

      {/* ================================================================
          FEEDBACK & STATUS
          ================================================================ */}
      <CategoryHeader id="cat-feedback" title="Feedback & Status" />

      <DemoSection id="alert" title="Alert">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Alert variant="info" title="Dictionary update">New entries are reviewed within 48 hours.</Alert>
          <Alert variant="success">Your contribution has been saved.</Alert>
          <Alert variant="warning" title="Incomplete entry">This word is missing an audio pronunciation.</Alert>
          <Alert variant="error" dismissible>Failed to save changes. Please try again.</Alert>
        </div>
      </DemoSection>

      <DemoSection id="toast" title="Toast">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Toast message="Entry saved successfully." variant="success" duration={0} />
          <Toast message="Failed to load audio file." variant="error" duration={0} />
          <Toast message="New proverb submitted for review." variant="info" duration={0} action={{ label: "View", onClick: () => {} }} />
          <Toast message="Audio quality is below threshold." variant="warning" duration={0} />
        </div>
      </DemoSection>

      <DemoSection id="dialog" title="Dialog">
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Confirm deletion"
          description="This action cannot be undone."
          actions={
            <>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setDialogOpen(false)}>Delete</Button>
            </>
          }
        >
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.55, color: "var(--fg-default)", margin: 0 }}>
            Are you sure you want to delete this dictionary entry? All associated audio recordings
            and example sentences will be permanently removed.
          </p>
        </Dialog>
      </DemoSection>

      <DemoSection id="drawer" title="Drawer">
        <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Word details"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Headword word="mnazi" pronunciation="/mˈnazi/" nounClass="3" partOfSpeech="n." />
            <Text>Coconut palm (Cocos nucifera). A tall tropical palm cultivated throughout the coast.</Text>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </DemoSection>

      <DemoSection id="kayamba-loader" title="KayambaLoader">
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <KayambaLoader size="sm" />
          <KayambaLoader size="md" label="Loading dictionary…" />
          <KayambaLoader size="lg" />
        </div>
      </DemoSection>

      <DemoSection id="progress-bar" title="ProgressBar">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "24rem" }}>
          <ProgressBar value={65} label="Dictionary coverage" />
          <ProgressBar value={100} label="Upload complete" variant="success" />
          <ProgressBar value={30} label="Errors found" variant="error" />
          <ProgressBar indeterminate label="Processing…" />
          <ProgressBar value={40} size="sm" />
        </div>
      </DemoSection>

      <DemoSection id="skeleton" title="Skeleton">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Text lines</p>
            <Skeleton variant="text" lines={3} />
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Circular</p>
              <Skeleton variant="circular" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Rectangular</p>
              <Skeleton variant="rectangular" height="4rem" />
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection id="empty-state" title="EmptyState">
        <div style={{ maxWidth: "24rem" }}>
          <EmptyState
            title="No results found"
            description="Try a different search term or browse by letter."
            action={<Button variant="secondary" size="sm">Browse A-Z</Button>}
          />
        </div>
      </DemoSection>

      {/* ================================================================
          DATA DISPLAY
          ================================================================ */}
      <CategoryHeader id="cat-data" title="Data Display" />

      <DemoSection id="card" title="Card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          <Card>
            <CardHeader title="Mnazi" subtitle="Coconut palm" />
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.875rem", color: "var(--fg-muted)", margin: 0 }}>
              The coconut palm is central to Digo life — food, drink, shelter, and ritual.
            </p>
            <CardActions>
              <Button variant="ghost" size="sm">Details</Button>
              <Button size="sm">View entry</Button>
            </CardActions>
          </Card>
          <Card elevated>
            <CardHeader title="Methali" subtitle="Proverbs" action={<Badge variant="editorial">Featured</Badge>} />
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.875rem", color: "var(--fg-muted)", margin: 0 }}>
              A collection of Digo proverbs with translations and cultural context.
            </p>
          </Card>
        </div>
      </DemoSection>

      <DemoSection id="badge" title="Badge">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <Badge>Default</Badge>
          <Badge variant="noun-class">cl. 3</Badge>
          <Badge variant="editorial">Editorial</Badge>
          <Badge variant="contributor">Contributor</Badge>
          <Badge variant="success">Verified</Badge>
          <Badge variant="error">Deprecated</Badge>
          <Badge size="md">Medium size</Badge>
        </div>
      </DemoSection>

      <DemoSection id="tag" title="Tag">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {tags.map((t) => (
            <Tag key={t} label={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))} />
          ))}
          <Tag label="Coastal" variant="brand" />
          <Tag label="Read-only" />
        </div>
      </DemoSection>

      <DemoSection id="avatar" title="Avatar">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar alt="Mwanaisha Ali" size="sm" />
          <Avatar alt="Mwanaisha Ali" size="md" />
          <Avatar alt="Mwanaisha Ali" size="lg" />
          <Avatar alt="Mwanaisha Ali" size="xl" />
          <Avatar alt="Mwanaisha Ali" src="https://api.dicebear.com/9.x/initials/svg?seed=MA" size="lg" />
        </div>
      </DemoSection>

      <DemoSection id="noun-class-badge" title="NounClassBadge">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <NounClassBadge nounClass="1" />
          <NounClassBadge nounClass="2" />
          <NounClassBadge nounClass="5/6" />
          <NounClassBadge nounClass="9/10" />
          <NounClassBadge nounClass="15" variant="compact" />
        </div>
      </DemoSection>

      <DemoSection id="track-badge" title="TrackBadge">
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <TrackBadge track="editorial" />
          <TrackBadge track="community" />
        </div>
      </DemoSection>

      <DemoSection id="data-table" title="DataTable">
        <DataTable
          columns={[
            { key: "headword", header: "Headword", sortable: true },
            { key: "class", header: "Class" },
            { key: "definition", header: "Definition" },
          ]}
          data={[
            { headword: "mnazi", class: "3", definition: "Coconut palm" },
            { headword: "nyumba", class: "9/10", definition: "House" },
            { headword: "mwana", class: "1/2", definition: "Child" },
            { headword: "kuni", class: "9/10", definition: "Firewood" },
          ]}
          sortable
        />
      </DemoSection>

      <DemoSection id="description-list" title="DescriptionList">
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 14rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Vertical</p>
            <DescriptionList items={[
              { term: "Headword", description: "mnazi" },
              { term: "Noun class", description: "3 (m-)" },
              { term: "Etymology", description: "Proto-Bantu *-nàzí" },
            ]} />
          </div>
          <div style={{ flex: "1 1 14rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "0.5rem" }}>Horizontal</p>
            <DescriptionList layout="horizontal" items={[
              { term: "Headword", description: "mnazi" },
              { term: "Noun class", description: "3 (m-)" },
              { term: "Etymology", description: "Proto-Bantu *-nàzí" },
            ]} />
          </div>
        </div>
      </DemoSection>

      <DemoSection id="timeline" title="Timeline">
        <div style={{ maxWidth: "28rem" }}>
          <Timeline items={[
            { date: "2024", title: "Dictionary launch", description: "Initial Digo-English dictionary with 2,000 headwords" },
            { date: "2024", title: "Audio recordings", description: "Native speaker pronunciations added for 500 words" },
            { date: "2025", title: "Community contributions", description: "Open contribution system for verified Digo speakers" },
            { date: "2025", title: "Proverbs collection", description: "Over 200 Digo proverbs with cultural context" },
          ]} />
        </div>
      </DemoSection>

      <DemoSection id="accordion" title="Accordion">
        <div style={{ maxWidth: "28rem" }}>
          <Accordion items={[
            { title: "What is the Chidigo design system?", content: "A shared design language for every Chidigo digital product — rooted in the visual culture of the Kenyan south coast.", defaultOpen: true },
            { title: "How do I install it?", content: "Run npm install @chidigo/design-system and import the tokens CSS file. See the Getting Started page for full instructions." },
            { title: "Can I use it with Tailwind?", content: "Yes. The package ships a Tailwind preset that maps all design tokens to utility classes." },
          ]} />
        </div>
      </DemoSection>

      {/* ================================================================
          OVERLAYS
          ================================================================ */}
      <CategoryHeader id="cat-overlays" title="Overlays" />

      <DemoSection id="tooltip" title="Tooltip">
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Tooltip content="Play pronunciation audio">
            <Button variant="secondary" size="sm">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="View full entry" placement="bottom">
            <Button variant="secondary" size="sm">Bottom tooltip</Button>
          </Tooltip>
          <Tooltip content="Edit word" placement="right">
            <Button variant="secondary" size="sm">Right tooltip</Button>
          </Tooltip>
        </div>
      </DemoSection>

      <DemoSection id="popover" title="Popover">
        <div style={{ display: "flex", gap: "2rem" }}>
          <Popover
            trigger={<Button variant="secondary" size="sm">Click me</Button>}
            content={<Text variant="body-sm">This is popover content with any React node inside.</Text>}
          />
          <Popover
            trigger={<Button variant="secondary" size="sm">Top popover</Button>}
            content={<Text variant="body-sm">Positioned above the trigger.</Text>}
            position="top"
          />
        </div>
      </DemoSection>

      <DemoSection id="dropdown-menu" title="DropdownMenu">
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
          items={[
            { label: "Edit entry", onClick: () => {} },
            { label: "Add audio", onClick: () => {} },
            { label: "View history", onClick: () => {} },
            { label: "Delete", onClick: () => {}, destructive: true },
          ]}
        />
      </DemoSection>

      {/* ================================================================
          DICTIONARY
          ================================================================ */}
      <CategoryHeader id="cat-dictionary" title="Dictionary" />

      <DemoSection id="headword" title="Headword">
        <Headword
          word="mnazi"
          pronunciation="/mˈnazi/"
          nounClass="3"
          partOfSpeech="n."
          audio={<AudioPlayer src="#" label="mnazi pronunciation" variant="inline" />}
        />
      </DemoSection>

      <DemoSection id="sense-list" title="SenseList">
        <div style={{ maxWidth: "36rem" }}>
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
      </DemoSection>

      <DemoSection id="etymology-section" title="EtymologySection">
        <div style={{ maxWidth: "36rem" }}>
          <EtymologySection
            content={
              <>
                From Proto-Bantu <em>*-nàzí</em>. Cognates include Swahili <em>mnazi</em>,
                Pokomo <em>mnazi</em>, and Giriama <em>mnazi</em>. The term is widespread
                across coastal Bantu languages, reflecting the cultural importance of the coconut palm.
              </>
            }
          />
        </div>
      </DemoSection>

      <DemoSection id="related-words" title="RelatedWords">
        <div style={{ maxWidth: "24rem" }}>
          <RelatedWords words={[
            { word: "nazi", href: "#" },
            { word: "mti", href: "#" },
            { word: "tende", href: "#" },
            { word: "embe" },
          ]} />
        </div>
      </DemoSection>

      <DemoSection id="search-results" title="SearchResults">
        <div style={{ maxWidth: "28rem" }}>
          <SearchResults
            query="mna"
            results={[
              { headword: "mnazi", ipa: "/mˈnazi/", nounClass: "3", definition: "Coconut palm (Cocos nucifera). A tall tropical palm cultivated throughout the coast." },
              { headword: "mnariri", definition: "A type of tree with medicinal bark.", href: "#" },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection id="audio-player" title="AudioPlayer">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "20rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}>mnazi</span>
            <AudioPlayer src="#" label="mnazi pronunciation" variant="inline" />
          </div>
          <AudioPlayer src="#" label="Proverb: Mti unaomera ph'wani" variant="block" />
        </div>
      </DemoSection>

      <DemoSection id="word-of-the-day" title="WordOfTheDay">
        <div style={{ maxWidth: "28rem" }}>
          <WordOfTheDay
            date="May 6, 2025"
            entry={{
              headword: "mnazi",
              ipa: "/mˈnazi/",
              nounClass: "3",
              partOfSpeech: "n.",
              definition: "Coconut palm (Cocos nucifera). Central to Digo life — food, drink, shelter, and ritual.",
              example: { text: "Mti unaomera ph'wani, una makumbi marefu na nazi.", translation: "The tree that grows by the coast, with long fronds and coconuts." },
            }}
          />
        </div>
      </DemoSection>

      {/* ================================================================
          PROVERBS
          ================================================================ */}
      <CategoryHeader id="cat-proverbs" title="Proverbs" />

      <DemoSection id="proverb-card" title="ProverbCard">
        <div style={{ maxWidth: "28rem" }}>
          <ProverbCard
            proverb="Mwana wa nyoka ni nyoka."
            translation="A child of a snake is a snake."
            gloss="Like parent, like child — character is inherited."
            source="Common Digo proverb · Recorded by Mwanaisha Ali"
          />
        </div>
      </DemoSection>

      <DemoSection id="proverb-of-the-day" title="ProverbOfTheDay">
        <div style={{ maxWidth: "28rem" }}>
          <ProverbOfTheDay
            proverb="Mwana wa nyoka ni nyoka."
            translation="A child of a snake is a snake."
          />
        </div>
      </DemoSection>

      {/* ================================================================
          CONTRIBUTION
          ================================================================ */}
      <CategoryHeader id="cat-contribution" title="Contribution" />

      <DemoSection id="contribution-prompt" title="ContributionPrompt">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "28rem" }}>
          <ContributionPrompt variant="word" action={<Button size="sm">Add word</Button>} />
          <ContributionPrompt variant="audio" action={<Button size="sm" variant="secondary">Record</Button>} />
          <ContributionPrompt variant="review" compact />
        </div>
      </DemoSection>

      {/* ================================================================
          UTILITIES
          ================================================================ */}
      <CategoryHeader id="cat-utilities" title="Utilities" />

      <DemoSection id="visually-hidden" title="VisuallyHidden">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Button variant="secondary" size="sm">
            <GearIcon />
            <VisuallyHidden>Settings</VisuallyHidden>
          </Button>
          <Text variant="body-sm" color="muted">The button has a visually hidden label for screen readers. Inspect to see the hidden span.</Text>
        </div>
      </DemoSection>
    </div>
  );
}

/* ---- Inline icons for demos ---- */
function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
