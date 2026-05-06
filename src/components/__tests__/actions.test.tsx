import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { ButtonGroup } from "../ButtonGroup";
import { Link } from "../Link";

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("defaults to primary variant and md size", () => {
    render(<Button>Ok</Button>);
    const btn = screen.getByRole("button");
    expect(btn.style.background).toBe("var(--color-kaya-indigo)");
    expect(btn.style.padding).toBe("var(--space-2) var(--space-4)");
  });

  // Variants
  it.each<{ variant: "primary" | "secondary" | "ghost" | "danger"; bg: string }>([
    { variant: "primary", bg: "var(--color-kaya-indigo)" },
    { variant: "secondary", bg: "transparent" },
    { variant: "ghost", bg: "transparent" },
    { variant: "danger", bg: "var(--color-error-red)" },
  ])("applies $variant variant styles", ({ variant, bg }) => {
    render(<Button variant={variant}>V</Button>);
    const btn = screen.getByRole("button");
    expect(btn.style.background).toBe(bg);
  });

  // Sizes
  it.each<{ size: "sm" | "md" | "lg"; padding: string }>([
    { size: "sm", padding: "var(--space-1) var(--space-3)" },
    { size: "md", padding: "var(--space-2) var(--space-4)" },
    { size: "lg", padding: "var(--space-3) var(--space-6)" },
  ])("applies $size size styles", ({ size, padding }) => {
    render(<Button size={size}>S</Button>);
    expect(screen.getByRole("button").style.padding).toBe(padding);
  });

  it("sets disabled attribute and cursor/opacity", () => {
    render(<Button disabled>No</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.style.cursor).toBe("not-allowed");
    expect(btn.style.opacity).toBe("0.5");
  });

  it("shows spinner and disables when loading", () => {
    render(<Button loading>Wait</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.style.opacity).toBe("0.75");
    // Spinner SVG is present with aria-hidden
    const svg = btn.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("hides iconLeft and iconRight when loading", () => {
    render(
      <Button loading iconLeft={<span data-testid="il" />} iconRight={<span data-testid="ir" />}>
        Go
      </Button>,
    );
    expect(screen.queryByTestId("il")).not.toBeInTheDocument();
    expect(screen.queryByTestId("ir")).not.toBeInTheDocument();
  });

  it("renders iconLeft and iconRight when not loading", () => {
    render(
      <Button iconLeft={<span data-testid="il" />} iconRight={<span data-testid="ir" />}>
        Go
      </Button>,
    );
    expect(screen.getByTestId("il")).toBeInTheDocument();
    expect(screen.getByTestId("ir")).toBeInTheDocument();
  });

  it("calls onClick handler", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handler = vi.fn();
    render(
      <Button disabled onClick={handler}>
        Click
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom style prop", () => {
    render(<Button style={{ marginTop: "8px" }}>Styled</Button>);
    expect(screen.getByRole("button").style.marginTop).toBe("8px");
  });

  it("spreads additional HTML attributes", () => {
    render(<Button data-testid="custom-btn">Attr</Button>);
    expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
  });

  it("is disabled when both disabled and loading are true", () => {
    render(
      <Button disabled loading>
        Both
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    // disabled takes precedence for opacity
    expect(btn.style.opacity).toBe("0.5");
    expect(btn.style.cursor).toBe("not-allowed");
  });
});

// ---------------------------------------------------------------------------
// IconButton
// ---------------------------------------------------------------------------
describe("IconButton", () => {
  const icon = <svg data-testid="icon" />;

  it("renders with aria-label", () => {
    render(<IconButton icon={icon} label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders the icon node", () => {
    render(<IconButton icon={icon} label="Close" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("defaults to 'default' variant and md size", () => {
    render(<IconButton icon={icon} label="X" />);
    const btn = screen.getByRole("button");
    expect(btn.style.background).toBe("var(--bg-surface)");
    expect(btn.style.width).toBe("var(--space-10)");
    expect(btn.style.height).toBe("var(--space-10)");
  });

  // Variants
  it.each<{ variant: "default" | "ghost" | "danger"; bg: string }>([
    { variant: "default", bg: "var(--bg-surface)" },
    { variant: "ghost", bg: "transparent" },
    { variant: "danger", bg: "transparent" },
  ])("applies $variant variant styles", ({ variant, bg }) => {
    render(<IconButton icon={icon} label="X" variant={variant} />);
    expect(screen.getByRole("button").style.background).toBe(bg);
  });

  // Sizes
  it.each<{ size: "sm" | "md" | "lg"; dim: string }>([
    { size: "sm", dim: "var(--space-8)" },
    { size: "md", dim: "var(--space-10)" },
    { size: "lg", dim: "var(--space-12)" },
  ])("applies $size size dimension", ({ size, dim }) => {
    render(<IconButton icon={icon} label="X" size={size} />);
    const btn = screen.getByRole("button");
    expect(btn.style.width).toBe(dim);
    expect(btn.style.height).toBe(dim);
  });

  it("sets disabled state", () => {
    render(<IconButton icon={icon} label="X" disabled />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.style.cursor).toBe("not-allowed");
    expect(btn.style.opacity).toBe("0.5");
  });

  it("has pointer cursor when enabled", () => {
    render(<IconButton icon={icon} label="X" />);
    expect(screen.getByRole("button").style.cursor).toBe("pointer");
  });

  it("has opacity 1 when enabled", () => {
    render(<IconButton icon={icon} label="X" />);
    expect(screen.getByRole("button").style.opacity).toBe("1");
  });

  it("calls onClick handler", () => {
    const handler = vi.fn();
    render(<IconButton icon={icon} label="X" onClick={handler} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={icon} label="X" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom style prop", () => {
    render(<IconButton icon={icon} label="X" style={{ marginLeft: "4px" }} />);
    expect(screen.getByRole("button").style.marginLeft).toBe("4px");
  });

  it("spreads additional HTML attributes", () => {
    render(<IconButton icon={icon} label="X" data-testid="ib" />);
    expect(screen.getByTestId("ib")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ButtonGroup
// ---------------------------------------------------------------------------
describe("ButtonGroup", () => {
  it("renders children", () => {
    render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("has role=group", () => {
    render(<ButtonGroup>content</ButtonGroup>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("uses default gap", () => {
    render(<ButtonGroup>content</ButtonGroup>);
    expect(screen.getByRole("group").style.gap).toBe("var(--space-2)");
  });

  it("accepts custom gap", () => {
    render(<ButtonGroup gap="var(--space-4)">content</ButtonGroup>);
    expect(screen.getByRole("group").style.gap).toBe("var(--space-4)");
  });

  it("applies flex layout", () => {
    render(<ButtonGroup>content</ButtonGroup>);
    const el = screen.getByRole("group");
    expect(el.style.display).toBe("flex");
    expect(el.style.alignItems).toBe("center");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ButtonGroup ref={ref}>content</ButtonGroup>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges custom style prop", () => {
    render(<ButtonGroup style={{ padding: "10px" }}>content</ButtonGroup>);
    expect(screen.getByRole("group").style.padding).toBe("10px");
  });

  it("spreads additional HTML attributes", () => {
    render(<ButtonGroup data-testid="bg">content</ButtonGroup>);
    expect(screen.getByTestId("bg")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------
describe("Link", () => {
  it("renders children text", () => {
    render(<Link href="/home">Home</Link>);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("sets href attribute", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  // Variant defaults
  it("defaults to inline variant with underline always", () => {
    render(<Link href="#">Inline</Link>);
    const link = screen.getByRole("link");
    expect(link.style.textDecoration).toBe("underline");
    expect(link.style.fontFamily).toBe("inherit");
    expect(link.style.fontSize).toBe("inherit");
    expect(link.style.fontWeight).toBe("inherit");
  });

  it("applies standalone variant styles with underline hover default", () => {
    render(
      <Link href="#" variant="standalone">
        Stand
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link.style.fontFamily).toBe("var(--font-sans)");
    expect(link.style.fontSize).toBe("var(--text-sm)");
    expect(link.style.fontWeight).toBe("500");
    expect(link.style.textDecoration).toBe("none");
  });

  // Underline prop overrides
  it.each<{ underline: "always" | "hover" | "none"; expected: string }>([
    { underline: "always", expected: "underline" },
    { underline: "hover", expected: "none" },
    { underline: "none", expected: "none" },
  ])("underline=$underline sets textDecoration to $expected", ({ underline, expected }) => {
    render(
      <Link href="#" underline={underline}>
        U
      </Link>,
    );
    expect(screen.getByRole("link").style.textDecoration).toBe(expected);
  });

  // External link
  it("opens in new tab when external", () => {
    render(
      <Link href="https://example.com" external>
        Ext
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders external icon when external", () => {
    render(
      <Link href="https://example.com" external>
        Ext
      </Link>,
    );
    const svg = screen.getByRole("link").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("does not set target/rel when not external", () => {
    render(<Link href="/local">Local</Link>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("does not render external icon when not external", () => {
    render(<Link href="/local">Local</Link>);
    expect(screen.getByRole("link").querySelector("svg")).not.toBeInTheDocument();
  });

  // iconRight
  it("renders iconRight", () => {
    render(
      <Link href="#" iconRight={<span data-testid="arrow" />}>
        More
      </Link>,
    );
    expect(screen.getByTestId("arrow")).toBeInTheDocument();
  });

  it("renders both external icon and iconRight", () => {
    render(
      <Link href="#" external iconRight={<span data-testid="extra" />}>
        Both
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByTestId("extra")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="#">
        Ref
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("merges custom style prop", () => {
    render(
      <Link href="#" style={{ marginTop: "4px" }}>
        Styled
      </Link>,
    );
    expect(screen.getByRole("link").style.marginTop).toBe("4px");
  });

  it("spreads additional HTML attributes", () => {
    render(
      <Link href="#" data-testid="custom-link">
        Attr
      </Link>,
    );
    expect(screen.getByTestId("custom-link")).toBeInTheDocument();
  });
});
