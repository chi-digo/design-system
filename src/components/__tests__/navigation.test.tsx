import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavBar } from "../NavBar";
import { SideNav } from "../SideNav";
import { BottomNav } from "../BottomNav";
import { Breadcrumb } from "../Breadcrumb";
import { Tabs } from "../Tabs";
import { Pagination } from "../Pagination";
import { SkipToContent } from "../SkipToContent";

/* ---------- NavBar ---------- */
describe("NavBar", () => {
  it("renders a header element", () => {
    render(<NavBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders logo when provided", () => {
    render(<NavBar logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders children inside nav", () => {
    render(<NavBar><a href="/">Home</a></NavBar>);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(<NavBar actions={<button>Sign in</button>} />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("renders search only in app variant", () => {
    const { rerender } = render(
      <NavBar variant="app" search={<input data-testid="search" />} />,
    );
    expect(screen.getByTestId("search")).toBeInTheDocument();

    rerender(<NavBar variant="landing" search={<input data-testid="search" />} />);
    expect(screen.queryByTestId("search")).not.toBeInTheDocument();
  });

  it("applies transparent background when transparent is true", () => {
    render(<NavBar transparent />);
    const header = screen.getByRole("banner");
    expect(header.style.background).toBe("transparent");
  });

  it("applies non-transparent background by default", () => {
    render(<NavBar />);
    const header = screen.getByRole("banner");
    expect(header.style.background).toBe("var(--bg-surface)");
  });

  it("does not render nav when no children", () => {
    render(<NavBar />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("passes through style and extra HTML attributes", () => {
    render(<NavBar data-testid="nav" style={{ color: "red" }} />);
    const header = screen.getByTestId("nav");
    expect(header.style.color).toBe("red");
  });

  it("renders nav with flex:1 in landing variant", () => {
    render(<NavBar variant="landing"><a href="/">Home</a></NavBar>);
    const nav = screen.getByRole("navigation");
    expect(nav.style.flex).toContain("1");
  });
});

/* ---------- SideNav ---------- */
describe("SideNav", () => {
  const basicItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Settings", href: "/settings" },
  ];

  it("renders a nav with aria-label", () => {
    render(<SideNav items={basicItems} />);
    expect(screen.getByLabelText("Side navigation")).toBeInTheDocument();
  });

  it("renders link items as anchor tags", () => {
    render(<SideNav items={basicItems} />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders active item with heavier font weight", () => {
    render(<SideNav items={basicItems} />);
    const activeLink = screen.getByText("Dashboard").closest("a")!;
    expect(activeLink.style.fontWeight).toBe("500");
  });

  it("renders nested children with expand/collapse", () => {
    const nestedItems = [
      {
        label: "Products",
        children: [
          { label: "Widget A", href: "/a" },
          { label: "Widget B", href: "/b" },
        ],
      },
    ];
    render(<SideNav items={nestedItems} />);
    // By default parent is not active, so children are hidden
    expect(screen.queryByText("Widget A")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText("Products"));
    expect(screen.getByText("Widget A")).toBeInTheDocument();
    expect(screen.getByText("Widget B")).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText("Products"));
    expect(screen.queryByText("Widget A")).not.toBeInTheDocument();
  });

  it("auto-expands parent when a child is active", () => {
    const nestedItems = [
      {
        label: "Products",
        children: [
          { label: "Widget A", href: "/a", active: true },
          { label: "Widget B", href: "/b" },
        ],
      },
    ];
    render(<SideNav items={nestedItems} />);
    expect(screen.getByText("Widget A")).toBeInTheDocument();
  });

  it("auto-expands parent when parent itself is active", () => {
    const nestedItems = [
      {
        label: "Products",
        active: true,
        children: [{ label: "Widget A", href: "/a" }],
      },
    ];
    render(<SideNav items={nestedItems} />);
    expect(screen.getByText("Widget A")).toBeInTheDocument();
  });

  it("uses renderLink when provided", () => {
    const renderLink = vi.fn((href: string, children: React.ReactNode) => (
      <a data-testid="custom-link" href={href}>{children}</a>
    ));
    render(<SideNav items={basicItems} renderLink={renderLink} />);
    expect(screen.getAllByTestId("custom-link")).toHaveLength(2);
    expect(renderLink).toHaveBeenCalled();
  });

  it("renders icon alongside label", () => {
    const items = [{ label: "Home", href: "/", icon: <span data-testid="icon">I</span> }];
    render(<SideNav items={items} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders span for items without href and without children", () => {
    const items = [{ label: "Static" }];
    render(<SideNav items={items} />);
    const el = screen.getByText("Static");
    expect(el.closest("a")).toBeNull();
    expect(el.closest("button")).toBeNull();
  });
});

/* ---------- BottomNav ---------- */
describe("BottomNav", () => {
  const items = [
    { label: "Home", icon: <span>H</span>, href: "/home", active: true },
    { label: "Search", icon: <span>S</span>, href: "/search" },
    { label: "Profile", icon: <span>P</span>, href: "/profile" },
  ];

  it("renders nav with aria-label", () => {
    render(<BottomNav items={items} />);
    expect(screen.getByLabelText("Bottom navigation")).toBeInTheDocument();
  });

  it("renders all items as links", () => {
    render(<BottomNav items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("marks active item with aria-current=page", () => {
    render(<BottomNav items={items} />);
    const homeLink = screen.getByText("Home").closest("a")!;
    expect(homeLink).toHaveAttribute("aria-current", "page");
    const searchLink = screen.getByText("Search").closest("a")!;
    expect(searchLink).not.toHaveAttribute("aria-current");
  });

  it("limits items to 5 max", () => {
    const manyItems = Array.from({ length: 8 }, (_, i) => ({
      label: `Item ${i}`,
      icon: <span>{i}</span>,
      href: `/${i}`,
    }));
    render(<BottomNav items={manyItems} />);
    expect(screen.getByText("Item 0")).toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
    expect(screen.queryByText("Item 5")).not.toBeInTheDocument();
  });

  it("uses renderLink when provided", () => {
    const renderLink = vi.fn((href: string, children: React.ReactNode) => (
      <a data-testid="custom" href={href}>{children}</a>
    ));
    render(<BottomNav items={items} renderLink={renderLink} />);
    expect(screen.getAllByTestId("custom")).toHaveLength(3);
  });
});

/* ---------- Breadcrumb ---------- */
describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Widget" },
  ];

  it("renders a nav with aria-label", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });

  it("renders all items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });

  it("marks the last item with aria-current=page", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Widget")).toHaveAttribute("aria-current", "page");
  });

  it("renders non-last items with href as links", () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders last item as span even if it has href", () => {
    const items2 = [
      { label: "Home", href: "/" },
      { label: "Final", href: "/final" },
    ];
    render(<Breadcrumb items={items2} />);
    const finalEl = screen.getByText("Final");
    expect(finalEl.tagName).toBe("SPAN");
    expect(finalEl).toHaveAttribute("aria-current", "page");
  });

  it("supports custom separator", () => {
    render(<Breadcrumb items={items} separator={<span data-testid="sep">/</span>} />);
    const seps = screen.getAllByTestId("sep");
    expect(seps).toHaveLength(items.length - 1);
  });

  it("renders default SVG separator", () => {
    const { container } = render(<Breadcrumb items={items} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(items.length - 1);
  });

  it("supports renderLink", () => {
    const renderLink = vi.fn((href: string, children: React.ReactNode) => (
      <a data-testid="custom-link" href={href}>{children}</a>
    ));
    render(<Breadcrumb items={items} renderLink={renderLink} />);
    // only non-last items with href use renderLink
    expect(screen.getAllByTestId("custom-link")).toHaveLength(2);
  });

  it("renders icon for items that have one", () => {
    const withIcon = [{ label: "Home", href: "/", icon: <span data-testid="bc-icon">I</span> }];
    render(<Breadcrumb items={withIcon} />);
    expect(screen.getByTestId("bc-icon")).toBeInTheDocument();
  });

  it("renders item without href as span", () => {
    const noHref = [
      { label: "First" },
      { label: "Second" },
    ];
    render(<Breadcrumb items={noHref} />);
    expect(screen.getByText("First").tagName).toBe("SPAN");
  });
});

/* ---------- Tabs ---------- */
describe("Tabs", () => {
  const items = [
    { label: "Tab A", content: <div>Content A</div> },
    { label: "Tab B", content: <div>Content B</div> },
    { label: "Tab C", content: <div>Content C</div>, disabled: true },
  ];

  it("renders tablist with tab buttons", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("shows first tab content by default", () => {
    render(<Tabs items={items} />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("supports defaultIndex", () => {
    render(<Tabs items={items} defaultIndex={1} />);
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("switches tabs on click", () => {
    render(<Tabs items={items} />);
    fireEvent.click(screen.getByText("Tab B"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
  });

  it("does not switch to disabled tab on click", () => {
    render(<Tabs items={items} />);
    fireEvent.click(screen.getByText("Tab C"));
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content C")).not.toBeInTheDocument();
  });

  it("sets correct aria attributes on active tab", () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByText("Tab A");
    expect(tabA).toHaveAttribute("aria-selected", "true");
    expect(tabA).toHaveAttribute("tabindex", "0");
    const tabB = screen.getByText("Tab B");
    expect(tabB).toHaveAttribute("aria-selected", "false");
    expect(tabB).toHaveAttribute("tabindex", "-1");
  });

  it("sets aria-disabled on disabled tabs", () => {
    render(<Tabs items={items} />);
    expect(screen.getByText("Tab C")).toHaveAttribute("aria-disabled", "true");
  });

  it("navigates with ArrowRight key", () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByText("Tab A");
    fireEvent.keyDown(tabA, { key: "ArrowRight" });
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("navigates with ArrowLeft key and wraps around", () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByText("Tab A");
    // ArrowLeft from first tab wraps to last non-disabled or last
    fireEvent.keyDown(tabA, { key: "ArrowLeft" });
    // Wraps to index 2 (disabled), then skips to index 1
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("Home key goes to first non-disabled tab", () => {
    render(<Tabs items={items} defaultIndex={1} />);
    const tabB = screen.getByText("Tab B");
    fireEvent.keyDown(tabB, { key: "Home" });
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("End key goes to last non-disabled tab", () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByText("Tab A");
    fireEvent.keyDown(tabA, { key: "End" });
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("renders tab panels with proper role", () => {
    render(<Tabs items={items} />);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("ArrowRight skips disabled tabs", () => {
    const tabItems = [
      { label: "A", content: <div>Content A</div> },
      { label: "B", content: <div>Content B</div>, disabled: true },
      { label: "C", content: <div>Content C</div> },
    ];
    render(<Tabs items={tabItems} />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "A" }), { key: "ArrowRight" });
    expect(screen.getByText("Content C")).toBeInTheDocument();
  });

  it("ignores irrelevant key presses", () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByText("Tab A");
    fireEvent.keyDown(tabA, { key: "a" });
    // Should still show Content A
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });
});

/* ---------- Pagination ---------- */
describe("Pagination", () => {
  it("renders nothing when totalPages <= 1", () => {
    const onChange = vi.fn();
    const { container } = render(<Pagination totalPages={1} currentPage={1} onChange={onChange} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nav with aria-label", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={1} onChange={onChange} />);
    expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
  });

  it("renders page number buttons", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onChange={onChange} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("marks current page with aria-current", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onChange={onChange} />);
    expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("1")).not.toHaveAttribute("aria-current");
  });

  it("disables Previous on first page", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={1} onChange={onChange} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables Next on last page", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={5} onChange={onChange} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onChange with previous page", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("calls onChange with next page", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange when clicking a page number", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={1} onChange={onChange} />);
    fireEvent.click(screen.getByText("4"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("renders ellipsis for many pages", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={20} currentPage={10} onChange={onChange} />);
    const ellipses = screen.getAllByText("…");
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it("does not render ellipsis when totalPages <= 7", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={7} currentPage={4} onChange={onChange} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("renders simple variant with Prev/Next text", () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onChange={onChange} variant="simple" />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("3 / 5")).toBeInTheDocument();
    // No page number buttons in simple mode
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});

/* ---------- SkipToContent ---------- */
describe("SkipToContent", () => {
  it("renders with default text and target", () => {
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("supports custom targetId", () => {
    render(<SkipToContent targetId="app" />);
    expect(screen.getByText("Skip to content")).toHaveAttribute("href", "#app");
  });

  it("supports custom children", () => {
    render(<SkipToContent>Jump ahead</SkipToContent>);
    expect(screen.getByText("Jump ahead")).toBeInTheDocument();
  });

  it("moves into view on focus", () => {
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    fireEvent.focus(link);
    expect(link.style.top).toBe("var(--space-2)");
  });

  it("moves off-screen on blur", () => {
    render(<SkipToContent />);
    const link = screen.getByText("Skip to content");
    fireEvent.focus(link);
    fireEvent.blur(link);
    expect(link.style.top).toBe("-100%");
  });
});
