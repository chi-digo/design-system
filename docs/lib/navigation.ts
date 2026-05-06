export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Getting started", href: "/getting-started" },
  {
    label: "Foundations",
    href: "/foundations",
    children: [
      { label: "Color", href: "/foundations/color" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing", href: "/foundations/spacing" },
      { label: "Elevation", href: "/foundations/elevation" },
      { label: "Motion", href: "/foundations/motion" },
      { label: "Motifs", href: "/foundations/motifs" },
    ],
  },
  {
    label: "Components",
    href: "/components",
    children: [
      {
        label: "Layout Primitives",
        href: "/components#cat-layout",
        children: [
          { label: "Box / Stack / Inline", href: "/components#box-stack-inline" },
          { label: "Container / Grid", href: "/components#container-grid" },
          { label: "Divider", href: "/components#divider" },
        ],
      },
      {
        label: "Typography",
        href: "/components#cat-typography",
        children: [
          { label: "Heading", href: "/components#heading" },
          { label: "Text", href: "/components#text" },
          { label: "DisplayText", href: "/components#display-text" },
          { label: "IPA", href: "/components#ipa" },
          { label: "BilingualText", href: "/components#bilingual-text" },
        ],
      },
      {
        label: "Actions",
        href: "/components#cat-actions",
        children: [
          { label: "Button", href: "/components#button" },
          { label: "IconButton", href: "/components#icon-button" },
          { label: "ButtonGroup", href: "/components#button-group" },
          { label: "Link", href: "/components#link" },
        ],
      },
      {
        label: "Selection & Input",
        href: "/components#cat-input",
        children: [
          { label: "TextField", href: "/components#text-field" },
          { label: "TextArea", href: "/components#text-area" },
          { label: "SearchField", href: "/components#search-field" },
          { label: "Select", href: "/components#select" },
          { label: "Checkbox", href: "/components#checkbox" },
          { label: "RadioGroup", href: "/components#radio-group" },
          { label: "Switch", href: "/components#switch" },
          { label: "LanguageSelector", href: "/components#language-selector" },
          { label: "Form", href: "/components#form" },
        ],
      },
      {
        label: "Navigation",
        href: "/components#cat-navigation",
        children: [
          { label: "NavBar", href: "/components#navbar" },
          { label: "SideNav", href: "/components#sidenav" },
          { label: "BottomNav", href: "/components#bottomnav" },
          { label: "Breadcrumb", href: "/components#breadcrumb" },
          { label: "Tabs", href: "/components#tabs" },
          { label: "Pagination", href: "/components#pagination" },
          { label: "SkipToContent", href: "/components#skip-to-content" },
        ],
      },
      {
        label: "Feedback & Status",
        href: "/components#cat-feedback",
        children: [
          { label: "Alert", href: "/components#alert" },
          { label: "Toast", href: "/components#toast" },
          { label: "Dialog", href: "/components#dialog" },
          { label: "Drawer", href: "/components#drawer" },
          { label: "KayambaLoader", href: "/components#kayamba-loader" },
          { label: "ProgressBar", href: "/components#progress-bar" },
          { label: "Skeleton", href: "/components#skeleton" },
          { label: "EmptyState", href: "/components#empty-state" },
        ],
      },
      {
        label: "Data Display",
        href: "/components#cat-data",
        children: [
          { label: "Card", href: "/components#card" },
          { label: "Badge", href: "/components#badge" },
          { label: "Tag", href: "/components#tag" },
          { label: "Avatar", href: "/components#avatar" },
          { label: "NounClassBadge", href: "/components#noun-class-badge" },
          { label: "TrackBadge", href: "/components#track-badge" },
          { label: "DataTable", href: "/components#data-table" },
          { label: "DescriptionList", href: "/components#description-list" },
          { label: "Timeline", href: "/components#timeline" },
          { label: "Accordion", href: "/components#accordion" },
        ],
      },
      {
        label: "Overlays",
        href: "/components#cat-overlays",
        children: [
          { label: "Tooltip", href: "/components#tooltip" },
          { label: "Popover", href: "/components#popover" },
          { label: "DropdownMenu", href: "/components#dropdown-menu" },
        ],
      },
      {
        label: "Dictionary",
        href: "/components#cat-dictionary",
        children: [
          { label: "Headword", href: "/components#headword" },
          { label: "SenseList", href: "/components#sense-list" },
          { label: "EtymologySection", href: "/components#etymology-section" },
          { label: "RelatedWords", href: "/components#related-words" },
          { label: "SearchResults", href: "/components#search-results" },
          { label: "AudioPlayer", href: "/components#audio-player" },
          { label: "WordOfTheDay", href: "/components#word-of-the-day" },
        ],
      },
      {
        label: "Proverbs",
        href: "/components#cat-proverbs",
        children: [
          { label: "ProverbCard", href: "/components#proverb-card" },
          { label: "ProverbOfTheDay", href: "/components#proverb-of-the-day" },
        ],
      },
      {
        label: "Contribution",
        href: "/components#cat-contribution",
        children: [
          { label: "ContributionPrompt", href: "/components#contribution-prompt" },
        ],
      },
      {
        label: "Utilities",
        href: "/components#cat-utilities",
        children: [
          { label: "VisuallyHidden", href: "/components#visually-hidden" },
        ],
      },
    ],
  },
  { label: "Patterns", href: "/patterns" },
];
