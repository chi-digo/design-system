import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card, CardHeader, CardMedia, CardActions } from "../Card";
import { Tag } from "../Tag";
import { DataTable } from "../DataTable";
import { DescriptionList } from "../DescriptionList";
import { Timeline } from "../Timeline";
import { Avatar } from "../Avatar";
import { Accordion } from "../Accordion";

/* ---------- Card ---------- */
describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("defaults to md padding", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    const inner = card.firstChild as HTMLElement;
    expect(inner.style.padding).toBe("var(--space-4)");
  });

  it("renders with no padding", () => {
    const { container } = render(<Card padding="none">Content</Card>);
    const card = container.firstChild as HTMLElement;
    const inner = card.firstChild as HTMLElement;
    expect(inner.style.padding).toBe("0px");
  });

  it("renders with sm padding", () => {
    const { container } = render(<Card padding="sm">Content</Card>);
    const card = container.firstChild as HTMLElement;
    const inner = card.firstChild as HTMLElement;
    expect(inner.style.padding).toBe("var(--space-3)");
  });

  it("renders with lg padding", () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    const card = container.firstChild as HTMLElement;
    const inner = card.firstChild as HTMLElement;
    expect(inner.style.padding).toBe("var(--space-6)");
  });

  it("applies shadow when elevated", () => {
    const { container } = render(<Card elevated>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.boxShadow).toBe("var(--shadow-sm)");
  });

  it("no shadow by default", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.boxShadow).toBe("none");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
  });
});

describe("CardHeader", () => {
  it("renders title", () => {
    render(<CardHeader title="My Card" />);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<CardHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<CardHeader title="Title" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("renders action when provided", () => {
    render(<CardHeader title="Title" action={<button>Edit</button>} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});

describe("CardMedia", () => {
  it("renders an image with src and alt", () => {
    render(<CardMedia src="/photo.jpg" alt="A photo" />);
    const img = screen.getByAltText("A photo");
    expect(img).toHaveAttribute("src", "/photo.jpg");
  });

  it("defaults to 16/9 aspect ratio", () => {
    const { container } = render(<CardMedia src="/photo.jpg" alt="pic" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.aspectRatio).toBe("16/9");
  });

  it("supports custom aspect ratio", () => {
    const { container } = render(<CardMedia src="/photo.jpg" alt="pic" aspectRatio="4/3" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.aspectRatio).toBe("4/3");
  });
});

describe("CardActions", () => {
  it("renders children", () => {
    render(<CardActions><button>Save</button><button>Cancel</button></CardActions>);
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("defaults to end alignment", () => {
    const { container } = render(<CardActions><button>OK</button></CardActions>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.justifyContent).toBe("flex-end");
  });

  it("supports start alignment", () => {
    const { container } = render(<CardActions align="start"><button>OK</button></CardActions>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.justifyContent).toBe("flex-start");
  });

  it("supports between alignment", () => {
    const { container } = render(<CardActions align="between"><button>A</button><button>B</button></CardActions>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.justifyContent).toBe("space-between");
  });
});

/* ---------- Tag ---------- */
describe("Tag", () => {
  it("renders label text", () => {
    render(<Tag label="Digo" />);
    expect(screen.getByText("Digo")).toBeInTheDocument();
  });

  it("does not render remove button by default", () => {
    render(<Tag label="Digo" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders remove button when onRemove is provided", () => {
    render(<Tag label="Digo" onRemove={() => {}} />);
    expect(screen.getByLabelText("Remove Digo")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(<Tag label="Digo" onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText("Remove Digo"));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("defaults to default variant", () => {
    const { container } = render(<Tag label="Default" />);
    const tag = container.firstChild as HTMLElement;
    expect(tag.style.background).toBe("var(--bg-surface-muted)");
  });

  it("renders brand variant", () => {
    const { container } = render(<Tag label="Brand" variant="brand" />);
    const tag = container.firstChild as HTMLElement;
    expect(tag.style.background).toBe("var(--color-kaya-indigo)");
    expect(tag.style.color).toBe("rgb(255, 255, 255)");
  });
});

/* ---------- DataTable ---------- */
describe("DataTable", () => {
  const columns = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
  ];
  const data = [
    { name: "Alice", age: "30" },
    { name: "Bob", age: "25" },
  ];

  it("renders table with headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders table rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders empty state when data is empty", () => {
    render(<DataTable columns={columns} data={[]} emptyState={<div>No data</div>} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("does not render empty state when data exists", () => {
    render(<DataTable columns={columns} data={data} emptyState={<div>No data</div>} />);
    expect(screen.queryByText("No data")).not.toBeInTheDocument();
  });

  it("renders empty table when data is empty and no emptyState", () => {
    const { container } = render(<DataTable columns={columns} data={[]} />);
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("supports custom render for columns", () => {
    const cols = [
      { key: "name", header: "Name", render: (row: Record<string, unknown>) => <strong>{String(row.name)}</strong> },
    ];
    render(<DataTable columns={cols} data={data} />);
    const strong = screen.getByText("Alice");
    expect(strong.tagName).toBe("STRONG");
  });

  it("supports sorting when sortable", () => {
    render(<DataTable columns={columns} data={data} sortable />);
    // Click Name header to sort ascending
    fireEvent.click(screen.getByText("Name"));
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Alice");
    expect(cells[2]).toHaveTextContent("Bob");

    // Click again to sort descending
    fireEvent.click(screen.getByText("Name"));
    const cells2 = screen.getAllByRole("cell");
    expect(cells2[0]).toHaveTextContent("Bob");
    expect(cells2[2]).toHaveTextContent("Alice");

    // Click a third time to toggle back to ascending
    fireEvent.click(screen.getByText("Name"));
    const cells3 = screen.getAllByRole("cell");
    expect(cells3[0]).toHaveTextContent("Alice");
  });

  it("does not sort when sortable is false", () => {
    render(<DataTable columns={columns} data={data} />);
    fireEvent.click(screen.getByText("Name"));
    const cells = screen.getAllByRole("cell");
    // Order unchanged
    expect(cells[0]).toHaveTextContent("Alice");
    expect(cells[2]).toHaveTextContent("Bob");
  });

  it("sorts different column resets direction", () => {
    render(<DataTable columns={columns} data={data} sortable />);
    fireEvent.click(screen.getByText("Age"));
    const cells = screen.getAllByRole("cell");
    expect(cells[1]).toHaveTextContent("25");
    expect(cells[3]).toHaveTextContent("30");
  });

  it("shows sort indicator", () => {
    render(<DataTable columns={columns} data={data} sortable />);
    fireEvent.click(screen.getByText("Name"));
    expect(screen.getByText("↑")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Name"));
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  it("supports rowKey function", () => {
    const rowKey = vi.fn((row: Record<string, unknown>) => String(row.name));
    render(<DataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(rowKey).toHaveBeenCalledTimes(2);
  });

  it("respects sortable=false on individual columns", () => {
    const cols = [
      { key: "name", header: "Name", sortable: false },
      { key: "age", header: "Age" },
    ];
    render(<DataTable columns={cols} data={data} sortable />);
    // Click the non-sortable column - should not sort
    fireEvent.click(screen.getByText("Name"));
    expect(screen.queryByText("↑")).not.toBeInTheDocument();
  });

  it("handles null/undefined cell values", () => {
    const dataWithNull = [{ name: null, age: undefined }];
    render(<DataTable columns={columns} data={dataWithNull as unknown as Record<string, unknown>[]} />);
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("");
  });

  it("sorts data containing null values", () => {
    const dataWithNull = [
      { name: null, age: 30 },
      { name: "Alice", age: 25 },
      { name: null, age: 20 },
    ] as unknown as Record<string, unknown>[];
    render(<DataTable columns={columns} data={dataWithNull} sortable />);
    fireEvent.click(screen.getByText("Name"));
    const cells = screen.getAllByRole("cell");
    expect(cells[4]).toHaveTextContent("Alice");
  });

  it("sorts descending with null values", () => {
    const dataWithNull = [
      { name: "Bob", age: 20 },
      { name: null, age: 30 },
      { name: "Alice", age: 25 },
    ] as unknown as Record<string, unknown>[];
    render(<DataTable columns={columns} data={dataWithNull} sortable />);
    fireEvent.click(screen.getByText("Name"));
    fireEvent.click(screen.getByText("Name"));
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Bob");
  });
});

/* ---------- DescriptionList ---------- */
describe("DescriptionList", () => {
  const items = [
    { term: "Language", description: "Chidigo" },
    { term: "Family", description: "Bantu" },
  ];

  it("renders terms and descriptions in vertical layout", () => {
    render(<DescriptionList items={items} />);
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Chidigo")).toBeInTheDocument();
    expect(screen.getByText("Family")).toBeInTheDocument();
    expect(screen.getByText("Bantu")).toBeInTheDocument();
  });

  it("defaults to vertical layout", () => {
    const { container } = render(<DescriptionList items={items} />);
    const dl = container.querySelector("dl") as HTMLElement;
    expect(dl.style.display).toBe("");
  });

  it("renders horizontal layout as grid", () => {
    const { container } = render(<DescriptionList items={items} layout="horizontal" />);
    const dl = container.querySelector("dl") as HTMLElement;
    expect(dl.style.display).toBe("grid");
  });

  it("supports ReactNode descriptions", () => {
    const richItems = [
      { term: "Link", description: <a href="/">Home</a> },
    ];
    render(<DescriptionList items={richItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});

/* ---------- Timeline ---------- */
describe("Timeline", () => {
  const items = [
    { title: "Step 1", description: "First step", date: "2024-01-01" },
    { title: "Step 2", description: "Second step" },
    { title: "Step 3" },
  ];

  it("renders all timeline items", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("renders dates when provided", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });

  it("renders descriptions when provided", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("Second step")).toBeInTheDocument();
  });

  it("does not render description for items without one", () => {
    const { container } = render(<Timeline items={[{ title: "Solo" }]} />);
    // The item should have the title but no description div
    expect(screen.getByText("Solo")).toBeInTheDocument();
    const textDivs = container.querySelectorAll("[style*='line-height: 1.55']");
    expect(textDivs).toHaveLength(0);
  });

  it("renders item numbers by default", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    const iconItems = [{ title: "Custom", icon: <span data-testid="tl-icon">*</span> }];
    render(<Timeline items={iconItems} />);
    expect(screen.getByTestId("tl-icon")).toBeInTheDocument();
  });

  it("renders connector line between items but not after last", () => {
    const { container } = render(<Timeline items={items} />);
    // Connector lines have width: 2px and flex: 1
    const connectors = container.querySelectorAll("[style*='width: 2px']");
    expect(connectors).toHaveLength(items.length - 1);
  });
});

/* ---------- Avatar ---------- */
describe("Avatar", () => {
  it("renders with role=img and aria-label", () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "John Doe");
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="/avatar.jpg" alt="John Doe" />);
    const img = screen.getByAltText("John Doe");
    expect(img).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders initials when no src", () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders single initial for single-word name", () => {
    render(<Avatar alt="John" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("limits initials to 2 characters", () => {
    render(<Avatar alt="John Michael Doe" />);
    expect(screen.getByText("JM")).toBeInTheDocument();
  });

  it("uppercases initials", () => {
    render(<Avatar alt="jane doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("supports custom fallback", () => {
    render(<Avatar alt="John Doe" fallback="?" />);
    expect(screen.getByText("?")).toBeInTheDocument();
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("defaults to md size", () => {
    const { container } = render(<Avatar alt="J" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("var(--space-10)");
  });

  it("renders sm size", () => {
    const { container } = render(<Avatar alt="J" size="sm" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("var(--space-8)");
  });

  it("renders lg size", () => {
    const { container } = render(<Avatar alt="J" size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("var(--space-12)");
  });

  it("renders xl size", () => {
    const { container } = render(<Avatar alt="J" size="xl" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("var(--space-16)");
  });

  it("has transparent background when src is provided", () => {
    const { container } = render(<Avatar src="/a.jpg" alt="A" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toBe("transparent");
  });

  it("has colored background for initials fallback", () => {
    const { container } = render(<Avatar alt="A" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toBe("var(--color-kaya-indigo)");
  });
});

/* ---------- Accordion ---------- */
describe("Accordion", () => {
  const items = [
    { title: "Section 1", content: <div>Content 1</div> },
    { title: "Section 2", content: <div>Content 2</div> },
    { title: "Section 3", content: <div>Content 3</div>, defaultOpen: true },
  ];

  it("renders all section titles", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Section 3")).toBeInTheDocument();
  });

  it("renders defaultOpen items as expanded", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Content 3")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("expands item on click", () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("collapses item on click when open", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Content 3")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Section 3"));
    expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
  });

  it("in single mode, opening one closes others", () => {
    render(<Accordion items={items} />);
    // Section 3 is open by default
    expect(screen.getByText("Content 3")).toBeInTheDocument();
    // Open Section 1
    fireEvent.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    // Section 3 should be closed
    expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
  });

  it("in multiple mode, multiple items can be open", () => {
    render(<Accordion items={items} allowMultiple />);
    // Section 3 is open by default
    fireEvent.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 3")).toBeInTheDocument();
  });

  it("sets aria-expanded on trigger buttons", () => {
    render(<Accordion items={items} />);
    const btn1 = screen.getByText("Section 1").closest("button")!;
    expect(btn1).toHaveAttribute("aria-expanded", "false");
    const btn3 = screen.getByText("Section 3").closest("button")!;
    expect(btn3).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-controls linking trigger to panel", () => {
    render(<Accordion items={items} />);
    const btn1 = screen.getByText("Section 1").closest("button")!;
    const panelId = btn1.getAttribute("aria-controls")!;
    const panel = document.getElementById(panelId);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("role", "region");
  });

  it("panel has aria-labelledby pointing to trigger", () => {
    render(<Accordion items={items} />);
    const btn3 = screen.getByText("Section 3").closest("button")!;
    const triggerId = btn3.id;
    const panelId = btn3.getAttribute("aria-controls")!;
    const panel = document.getElementById(panelId);
    expect(panel).toHaveAttribute("aria-labelledby", triggerId);
  });

  it("hidden panels have hidden attribute", () => {
    render(<Accordion items={items} />);
    const btn1 = screen.getByText("Section 1").closest("button")!;
    const panelId = btn1.getAttribute("aria-controls")!;
    const panel = document.getElementById(panelId);
    expect(panel).toHaveAttribute("hidden");
  });
});
