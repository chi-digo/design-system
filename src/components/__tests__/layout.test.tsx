import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Inline } from "../Inline";
import { Container } from "../Container";
import { Grid } from "../Grid";
import { Divider } from "../Divider";
import { VisuallyHidden } from "../VisuallyHidden";

// ---------------------------------------------------------------------------
// Box
// ---------------------------------------------------------------------------
describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box data-testid="box">content</Box>);
    const el = screen.getByTestId("box");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("content");
  });

  it("renders a custom element via `as`", () => {
    render(<Box as="section" data-testid="box" />);
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("applies padding, margin, bg, border, radius, shadow, display, flex, gap, overflow as inline styles", () => {
    render(
      <Box
        data-testid="box"
        padding="8px"
        margin="4px"
        bg="red"
        border="1px solid black"
        radius="4px"
        shadow="0 0 4px black"
        display="flex"
        flex="1"
        gap="12px"
        overflow="hidden"
      />,
    );
    const style = screen.getByTestId("box").style;
    expect(style.padding).toBe("8px");
    expect(style.margin).toBe("4px");
    expect(style.background).toBe("red");
    expect(style.border).toBe("1px solid black");
    expect(style.borderRadius).toBe("4px");
    expect(style.boxShadow).toBe("0 0 4px black");
    expect(style.display).toBe("flex");
    expect(style.flex).toBe("1 1 0%");
    expect(style.gap).toBe("12px");
    expect(style.overflow).toBe("hidden");
  });

  it("merges caller style with component styles", () => {
    render(<Box data-testid="box" padding="8px" style={{ color: "blue" }} />);
    const style = screen.getByTestId("box").style;
    expect(style.padding).toBe("8px");
    expect(style.color).toBe("blue");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    render(<Box ref={ref}>ref test</Box>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe("ref test");
  });

  it("passes through HTML attributes", () => {
    render(<Box data-testid="box" id="my-box" aria-label="label" role="region" />);
    const el = screen.getByTestId("box");
    expect(el.id).toBe("my-box");
    expect(el).toHaveAttribute("aria-label", "label");
    expect(el).toHaveAttribute("role", "region");
  });
});

// ---------------------------------------------------------------------------
// Stack
// ---------------------------------------------------------------------------
describe("Stack", () => {
  it("renders a vertical flex column with default gap and align", () => {
    render(<Stack data-testid="stack">child</Stack>);
    const style = screen.getByTestId("stack").style;
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
    expect(style.gap).toBe("var(--space-4)");
    expect(style.alignItems).toBe("stretch");
  });

  it("applies custom gap", () => {
    render(<Stack data-testid="stack" gap="2rem" />);
    expect(screen.getByTestId("stack").style.gap).toBe("2rem");
  });

  it("maps align='start' to flex-start", () => {
    render(<Stack data-testid="s" align="start" />);
    expect(screen.getByTestId("s").style.alignItems).toBe("flex-start");
  });

  it("maps align='end' to flex-end", () => {
    render(<Stack data-testid="s" align="end" />);
    expect(screen.getByTestId("s").style.alignItems).toBe("flex-end");
  });

  it("maps align='center' to center", () => {
    render(<Stack data-testid="s" align="center" />);
    expect(screen.getByTestId("s").style.alignItems).toBe("center");
  });

  it("maps align='stretch' to stretch", () => {
    render(<Stack data-testid="s" align="stretch" />);
    expect(screen.getByTestId("s").style.alignItems).toBe("stretch");
  });

  it("merges caller style", () => {
    render(<Stack data-testid="s" style={{ color: "red" }} />);
    expect(screen.getByTestId("s").style.color).toBe("red");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stack ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    render(<Stack data-testid="s" role="list" aria-label="stack" />);
    const el = screen.getByTestId("s");
    expect(el).toHaveAttribute("role", "list");
    expect(el).toHaveAttribute("aria-label", "stack");
  });
});

// ---------------------------------------------------------------------------
// Inline
// ---------------------------------------------------------------------------
describe("Inline", () => {
  it("renders a horizontal flex row with defaults", () => {
    render(<Inline data-testid="il">child</Inline>);
    const style = screen.getByTestId("il").style;
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("row");
    expect(style.flexWrap).toBe("wrap");
    expect(style.gap).toBe("var(--space-3)");
    expect(style.alignItems).toBe("center");
  });

  it("applies custom gap", () => {
    render(<Inline data-testid="il" gap="1rem" />);
    expect(screen.getByTestId("il").style.gap).toBe("1rem");
  });

  it("maps align='start' to flex-start", () => {
    render(<Inline data-testid="il" align="start" />);
    expect(screen.getByTestId("il").style.alignItems).toBe("flex-start");
  });

  it("maps align='end' to flex-end", () => {
    render(<Inline data-testid="il" align="end" />);
    expect(screen.getByTestId("il").style.alignItems).toBe("flex-end");
  });

  it("maps align='baseline' to baseline", () => {
    render(<Inline data-testid="il" align="baseline" />);
    expect(screen.getByTestId("il").style.alignItems).toBe("baseline");
  });

  it("sets flexWrap to nowrap when wrap=false", () => {
    render(<Inline data-testid="il" wrap={false} />);
    expect(screen.getByTestId("il").style.flexWrap).toBe("nowrap");
  });

  it("merges caller style", () => {
    render(<Inline data-testid="il" style={{ color: "green" }} />);
    expect(screen.getByTestId("il").style.color).toBe("green");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Inline ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    render(<Inline data-testid="il" id="my-inline" aria-hidden="true" />);
    const el = screen.getByTestId("il");
    expect(el.id).toBe("my-inline");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });
});

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------
describe("Container", () => {
  it("renders with default 'content' size", () => {
    render(<Container data-testid="c">child</Container>);
    const style = screen.getByTestId("c").style;
    expect(style.width).toBe("100%");
    expect(style.maxWidth).toBe("75rem");
    expect(style.marginLeft).toBe("auto");
    expect(style.marginRight).toBe("auto");
    expect(style.paddingLeft).toBe("var(--space-4)");
    expect(style.paddingRight).toBe("var(--space-4)");
  });

  it("applies size='reading'", () => {
    render(<Container data-testid="c" size="reading" />);
    expect(screen.getByTestId("c").style.maxWidth).toBe("42.5rem");
  });

  it("applies size='wide'", () => {
    render(<Container data-testid="c" size="wide" />);
    expect(screen.getByTestId("c").style.maxWidth).toBe("90rem");
  });

  it("applies size='full'", () => {
    render(<Container data-testid="c" size="full" />);
    expect(screen.getByTestId("c").style.maxWidth).toBe("100%");
  });

  it("merges caller style", () => {
    render(<Container data-testid="c" style={{ background: "yellow" }} />);
    expect(screen.getByTestId("c").style.background).toBe("yellow");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    render(<Container data-testid="c" role="main" aria-label="container" />);
    const el = screen.getByTestId("c");
    expect(el).toHaveAttribute("role", "main");
    expect(el).toHaveAttribute("aria-label", "container");
  });
});

// ---------------------------------------------------------------------------
// Grid
// ---------------------------------------------------------------------------
describe("Grid", () => {
  it("renders a CSS grid with defaults", () => {
    render(<Grid data-testid="g">child</Grid>);
    const style = screen.getByTestId("g").style;
    expect(style.display).toBe("grid");
    expect(style.gridTemplateColumns).toBe("1fr");
    expect(style.gap).toBe("var(--space-4)");
  });

  it("uses repeat(n, 1fr) when columns is a number", () => {
    render(<Grid data-testid="g" columns={3} />);
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe("repeat(3, 1fr)");
  });

  it("uses the string directly when columns is a string", () => {
    render(<Grid data-testid="g" columns="200px 1fr" />);
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe("200px 1fr");
  });

  it("uses auto-fill minmax when minChildWidth is set (overrides columns)", () => {
    render(<Grid data-testid="g" columns={3} minChildWidth="200px" />);
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe(
      "repeat(auto-fill, minmax(200px, 1fr))",
    );
  });

  it("uses repeat(n, 1fr) when rows is a number", () => {
    render(<Grid data-testid="g" rows={2} />);
    expect(screen.getByTestId("g").style.gridTemplateRows).toBe("repeat(2, 1fr)");
  });

  it("uses the string directly when rows is a string", () => {
    render(<Grid data-testid="g" rows="auto 1fr" />);
    expect(screen.getByTestId("g").style.gridTemplateRows).toBe("auto 1fr");
  });

  it("does not set gridTemplateRows when rows is undefined", () => {
    render(<Grid data-testid="g" />);
    expect(screen.getByTestId("g").style.gridTemplateRows).toBe("");
  });

  it("sets rowGap and columnGap independently, clearing gap", () => {
    render(<Grid data-testid="g" rowGap="8px" columnGap="16px" />);
    const style = screen.getByTestId("g").style;
    expect(style.rowGap).toBe("8px");
    expect(style.columnGap).toBe("16px");
    expect(style.gap).toBe("");
  });

  it("clears gap when only rowGap is set", () => {
    render(<Grid data-testid="g" rowGap="10px" />);
    const style = screen.getByTestId("g").style;
    expect(style.rowGap).toBe("10px");
    expect(style.gap).toBe("");
  });

  it("clears gap when only columnGap is set", () => {
    render(<Grid data-testid="g" columnGap="10px" />);
    const style = screen.getByTestId("g").style;
    expect(style.columnGap).toBe("10px");
    expect(style.gap).toBe("");
  });

  it("applies alignItems, justifyItems, and placeItems", () => {
    render(
      <Grid data-testid="g" alignItems="center" justifyItems="end" placeItems="stretch" />,
    );
    const style = screen.getByTestId("g").style;
    expect(style.alignItems).toBe("center");
    expect(style.justifyItems).toBe("end");
    expect(style.placeItems).toBe("stretch");
  });

  it("applies custom gap", () => {
    render(<Grid data-testid="g" gap="2rem" />);
    expect(screen.getByTestId("g").style.gap).toBe("2rem");
  });

  it("merges caller style", () => {
    render(<Grid data-testid="g" style={{ color: "red" }} />);
    expect(screen.getByTestId("g").style.color).toBe("red");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    render(<Grid data-testid="g" role="grid" aria-label="grid" />);
    const el = screen.getByTestId("g");
    expect(el).toHaveAttribute("role", "grid");
    expect(el).toHaveAttribute("aria-label", "grid");
  });
});

// ---------------------------------------------------------------------------
// Divider
// ---------------------------------------------------------------------------
describe("Divider", () => {
  it("renders a horizontal hr by default", () => {
    render(<Divider data-testid="d" />);
    const el = screen.getByTestId("d");
    expect(el.tagName).toBe("HR");
    expect(el.style.height).toBe("1px");
    // jsdom expands `border: "none"` into sub-properties
    expect(el.style.borderTopStyle).toBe("none");
    expect(el.style.background).toBe("var(--border-default)");
    expect(el.style.margin).toBe("0px");
    expect(el).not.toHaveAttribute("aria-orientation");
  });

  it("renders a vertical hr with aria-orientation", () => {
    render(<Divider data-testid="d" orientation="vertical" />);
    const el = screen.getByTestId("d");
    expect(el.tagName).toBe("HR");
    expect(el.style.width).toBe("1px");
    expect(el.style.alignSelf).toBe("stretch");
    expect(el.style.background).toBe("var(--border-default)");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies strong variant (horizontal)", () => {
    render(<Divider data-testid="d" variant="strong" />);
    expect(screen.getByTestId("d").style.background).toBe("var(--border-strong)");
  });

  it("applies strong variant (vertical)", () => {
    render(<Divider data-testid="d" orientation="vertical" variant="strong" />);
    expect(screen.getByTestId("d").style.background).toBe("var(--border-strong)");
  });

  it("merges caller style (horizontal)", () => {
    render(<Divider data-testid="d" style={{ opacity: "0.5" }} />);
    expect(screen.getByTestId("d").style.opacity).toBe("0.5");
  });

  it("merges caller style (vertical)", () => {
    render(<Divider data-testid="d" orientation="vertical" style={{ opacity: "0.5" }} />);
    expect(screen.getByTestId("d").style.opacity).toBe("0.5");
  });

  it("passes through HTML attributes", () => {
    render(<Divider data-testid="d" id="sep" aria-label="separator" />);
    const el = screen.getByTestId("d");
    expect(el.id).toBe("sep");
    expect(el).toHaveAttribute("aria-label", "separator");
  });
});

// ---------------------------------------------------------------------------
// VisuallyHidden
// ---------------------------------------------------------------------------
describe("VisuallyHidden", () => {
  it("renders a span by default with sr-only styles", () => {
    render(<VisuallyHidden data-testid="vh">hidden text</VisuallyHidden>);
    const el = screen.getByTestId("vh");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveTextContent("hidden text");
    expect(el.style.position).toBe("absolute");
    expect(el.style.width).toBe("1px");
    expect(el.style.height).toBe("1px");
    expect(el.style.padding).toBe("0px");
    expect(el.style.margin).toBe("-1px");
    expect(el.style.overflow).toBe("hidden");
    // jsdom normalises bare 0 to 0px in clip rect
    expect(el.style.clip).toBe("rect(0px, 0px, 0px, 0px)");
    expect(el.style.whiteSpace).toBe("nowrap");
    expect(el.style.borderWidth).toBe("0px");
  });

  it("renders a div when as='div'", () => {
    render(<VisuallyHidden as="div" data-testid="vh">content</VisuallyHidden>);
    expect(screen.getByTestId("vh").tagName).toBe("DIV");
  });

  it("merges caller style", () => {
    render(<VisuallyHidden data-testid="vh" style={{ color: "red" }} />);
    expect(screen.getByTestId("vh").style.color).toBe("red");
  });

  it("passes through HTML attributes", () => {
    render(<VisuallyHidden data-testid="vh" id="sr" aria-live="polite" role="status" />);
    const el = screen.getByTestId("vh");
    expect(el.id).toBe("sr");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(el).toHaveAttribute("role", "status");
  });
});
