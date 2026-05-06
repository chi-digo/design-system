import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { DisplayText } from "../DisplayText";
import { IPA } from "../IPA";
import { BilingualText } from "../BilingualText";

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------
describe("Heading", () => {
  it("renders an h1 for level 1", () => {
    render(<Heading level={1}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.tagName).toBe("H1");
  });

  it("renders an h2 for level 2", () => {
    render(<Heading level={2}>Subtitle</Heading>);
    expect(screen.getByText("Subtitle").tagName).toBe("H2");
  });

  it("renders an h3 for level 3", () => {
    render(<Heading level={3}>Section</Heading>);
    expect(screen.getByText("Section").tagName).toBe("H3");
  });

  it("renders an h4 for level 4", () => {
    render(<Heading level={4}>Subsection</Heading>);
    expect(screen.getByText("Subsection").tagName).toBe("H4");
  });

  it("applies level-specific styles", () => {
    render(<Heading level={1}>Styled</Heading>);
    const el = screen.getByText("Styled");
    expect(el.style.fontFamily).toBe("var(--font-display)");
    expect(el.style.fontSize).toBe("var(--text-3xl)");
  });

  it("applies level 2 styles", () => {
    render(<Heading level={2}>L2</Heading>);
    const el = screen.getByText("L2");
    expect(el.style.fontSize).toBe("var(--text-2xl)");
  });

  it("applies level 3 styles", () => {
    render(<Heading level={3}>L3</Heading>);
    const el = screen.getByText("L3");
    expect(el.style.fontFamily).toBe("var(--font-serif)");
    expect(el.style.fontSize).toBe("var(--text-xl)");
  });

  it("applies level 4 styles", () => {
    render(<Heading level={4}>L4</Heading>);
    const el = screen.getByText("L4");
    expect(el.style.fontSize).toBe("var(--text-lg)");
    expect(el.style.letterSpacing).toBe("0.005em");
  });

  it("overrides the tag with `as`", () => {
    render(<Heading level={1} as="span">Span heading</Heading>);
    expect(screen.getByText("Span heading").tagName).toBe("SPAN");
  });

  it("sets the lang attribute", () => {
    render(<Heading level={1} lang="dig">Digo</Heading>);
    expect(screen.getByText("Digo")).toHaveAttribute("lang", "dig");
  });

  it("forwards a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading level={2} ref={ref}>Ref</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe("Ref");
  });

  it("passes through HTML attributes", () => {
    render(<Heading level={1} data-testid="heading" id="main-title">Attrs</Heading>);
    const el = screen.getByTestId("heading");
    expect(el).toHaveAttribute("id", "main-title");
  });

  it("merges custom style with level styles", () => {
    render(<Heading level={1} style={{ color: "red" }}>Custom</Heading>);
    const el = screen.getByText("Custom");
    expect(el.style.color).toBe("red");
    // level styles still applied
    expect(el.style.fontWeight).toBe("600");
  });

  it("applies base color and margin", () => {
    render(<Heading level={1}>Base</Heading>);
    const el = screen.getByText("Base");
    expect(el.style.margin).toBe("0px");
  });
});

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------
describe("Text", () => {
  it("renders a <p> by default", () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText("Hello").tagName).toBe("P");
  });

  it("applies default variant (body) styles", () => {
    render(<Text>Body</Text>);
    const el = screen.getByText("Body");
    expect(el.style.fontFamily).toBe("var(--font-serif)");
    expect(el.style.fontSize).toBe("var(--text-base)");
  });

  it("applies body-lg variant", () => {
    render(<Text variant="body-lg">Large</Text>);
    const el = screen.getByText("Large");
    expect(el.style.fontSize).toBe("var(--text-lg)");
  });

  it("applies body-sm variant", () => {
    render(<Text variant="body-sm">Small</Text>);
    const el = screen.getByText("Small");
    expect(el.style.fontFamily).toBe("var(--font-sans)");
    expect(el.style.fontSize).toBe("var(--text-sm)");
  });

  it("applies ui variant", () => {
    render(<Text variant="ui">UI</Text>);
    const el = screen.getByText("UI");
    expect(el.style.fontFamily).toBe("var(--font-sans)");
    expect(el.style.lineHeight).toBe("1.4");
  });

  it("applies ui-sm variant", () => {
    render(<Text variant="ui-sm">UI small</Text>);
    const el = screen.getByText("UI small");
    expect(el.style.fontSize).toBe("var(--text-xs)");
    expect(el.style.letterSpacing).toBe("0.01em");
  });

  it("applies mono variant", () => {
    render(<Text variant="mono">Code</Text>);
    const el = screen.getByText("Code");
    expect(el.style.fontFamily).toBe("var(--font-mono)");
  });

  it("applies default color", () => {
    render(<Text>Default</Text>);
    expect(screen.getByText("Default").style.color).toBe("var(--fg-default)");
  });

  it.each([
    ["heading", "var(--fg-heading)"],
    ["muted", "var(--fg-muted)"],
    ["subtle", "var(--fg-subtle)"],
    ["link", "var(--fg-link)"],
    ["error", "var(--color-error)"],
    ["success", "var(--color-success)"],
  ] as const)("applies color=%s", (color, expected) => {
    render(<Text color={color}>{color}</Text>);
    expect(screen.getByText(color).style.color).toBe(expected);
  });

  it("applies weight=regular", () => {
    render(<Text weight="regular">R</Text>);
    expect(screen.getByText("R").style.fontWeight).toBe("400");
  });

  it("applies weight=medium", () => {
    render(<Text weight="medium">M</Text>);
    expect(screen.getByText("M").style.fontWeight).toBe("500");
  });

  it("applies weight=semibold", () => {
    render(<Text weight="semibold">S</Text>);
    expect(screen.getByText("S").style.fontWeight).toBe("600");
  });

  it("does not set fontWeight when weight is omitted", () => {
    render(<Text>NoWeight</Text>);
    expect(screen.getByText("NoWeight").style.fontWeight).toBe("");
  });

  it("overrides tag with `as`", () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("sets the lang attribute", () => {
    render(<Text lang="sw">Swahili</Text>);
    expect(screen.getByText("Swahili")).toHaveAttribute("lang", "sw");
  });

  it("forwards a ref", () => {
    const ref = createRef<HTMLElement>();
    render(<Text ref={ref}>Ref text</Text>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("passes through HTML attributes", () => {
    render(<Text data-testid="txt" className="custom">Attrs</Text>);
    expect(screen.getByTestId("txt")).toHaveClass("custom");
  });

  it("merges custom style", () => {
    render(<Text style={{ textDecoration: "underline" }}>Styled</Text>);
    expect(screen.getByText("Styled").style.textDecoration).toBe("underline");
  });
});

// ---------------------------------------------------------------------------
// DisplayText
// ---------------------------------------------------------------------------
describe("DisplayText", () => {
  it("renders an h1 by default", () => {
    render(<DisplayText>Big</DisplayText>);
    expect(screen.getByText("Big").tagName).toBe("H1");
  });

  it("applies default size (lg) styles", () => {
    render(<DisplayText>Default</DisplayText>);
    const el = screen.getByText("Default");
    expect(el.style.fontSize).toBe("var(--text-4xl)");
    expect(el.style.lineHeight).toBe("1.1");
    expect(el.style.letterSpacing).toBe("-0.005em");
  });

  it("applies xl size styles", () => {
    render(<DisplayText size="xl">Extra</DisplayText>);
    const el = screen.getByText("Extra");
    expect(el.style.fontSize).toBe("var(--text-5xl)");
    expect(el.style.lineHeight).toBe("1.05");
    expect(el.style.letterSpacing).toBe("-0.01em");
  });

  it("applies base styles (display font, weight, color, margin)", () => {
    render(<DisplayText>Base</DisplayText>);
    const el = screen.getByText("Base");
    expect(el.style.fontFamily).toBe("var(--font-display)");
    expect(el.style.fontWeight).toBe("400");
    expect(el.style.margin).toBe("0px");
  });

  it("overrides tag with `as`", () => {
    render(<DisplayText as="div">Div</DisplayText>);
    expect(screen.getByText("Div").tagName).toBe("DIV");
  });

  it("sets the lang attribute", () => {
    render(<DisplayText lang="en">English</DisplayText>);
    expect(screen.getByText("English")).toHaveAttribute("lang", "en");
  });

  it("forwards a ref", () => {
    const ref = createRef<HTMLElement>();
    render(<DisplayText ref={ref}>Ref</DisplayText>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("passes through HTML attributes", () => {
    render(<DisplayText data-testid="display" role="heading" aria-level={1}>Aria</DisplayText>);
    const el = screen.getByTestId("display");
    expect(el).toHaveAttribute("role", "heading");
  });

  it("merges custom style", () => {
    render(<DisplayText style={{ color: "blue" }}>Custom</DisplayText>);
    expect(screen.getByText("Custom").style.color).toBe("blue");
  });
});

// ---------------------------------------------------------------------------
// IPA
// ---------------------------------------------------------------------------
describe("IPA", () => {
  it("renders a span with the transcription text", () => {
    render(<IPA transcription="d͡ʒiɡo" />);
    const el = screen.getByText("d͡ʒiɡo");
    expect(el.tagName).toBe("SPAN");
  });

  it("applies mono font, sm size, default color, and opacity", () => {
    render(<IPA transcription="test" />);
    const el = screen.getByText("test");
    expect(el.style.fontFamily).toBe("var(--font-mono)");
    expect(el.style.fontSize).toBe("var(--text-sm)");
    expect(el.style.color).toBe("var(--fg-default)");
    expect(el.style.opacity).toBe("0.7");
  });

  it("passes through HTML attributes", () => {
    render(<IPA transcription="a" data-testid="ipa" className="phon" />);
    const el = screen.getByTestId("ipa");
    expect(el).toHaveClass("phon");
    expect(el.textContent).toBe("a");
  });

  it("merges custom style", () => {
    render(<IPA transcription="b" style={{ opacity: 1 }} />);
    expect(screen.getByText("b").style.opacity).toBe("1");
  });
});

// ---------------------------------------------------------------------------
// BilingualText
// ---------------------------------------------------------------------------
describe("BilingualText", () => {
  // --- stacked layout (default) ---
  describe("stacked layout (default)", () => {
    it("renders primary and secondary text", () => {
      render(<BilingualText primary="Habari" secondary="News" />);
      expect(screen.getByText("Habari")).toBeInTheDocument();
      expect(screen.getByText("News")).toBeInTheDocument();
    });

    it("sets default lang attributes (dig / en)", () => {
      render(<BilingualText primary="Habari" secondary="News" />);
      expect(screen.getByText("Habari")).toHaveAttribute("lang", "dig");
      expect(screen.getByText("News")).toHaveAttribute("lang", "en");
    });

    it("uses custom primaryLang and secondaryLang", () => {
      render(<BilingualText primary="Habari" secondary="Habari" primaryLang="sw" secondaryLang="dig" />);
      expect(screen.getByText("Habari", { selector: "[lang='sw']" })).toBeInTheDocument();
      expect(screen.getByText("Habari", { selector: "[lang='dig']" })).toBeInTheDocument();
    });

    it("applies display font to primary and serif to secondary", () => {
      render(<BilingualText primary="P" secondary="S" />);
      expect(screen.getByText("P").style.fontFamily).toBe("var(--font-display)");
      expect(screen.getByText("S").style.fontFamily).toBe("var(--font-serif)");
    });

    it("applies heading color to primary and default to secondary", () => {
      render(<BilingualText primary="P" secondary="S" />);
      expect(screen.getByText("P").style.color).toBe("var(--fg-heading)");
      expect(screen.getByText("S").style.color).toBe("var(--fg-default)");
    });

    it("applies opacity and margin to secondary", () => {
      render(<BilingualText primary="P" secondary="S" />);
      const sec = screen.getByText("S");
      expect(sec.style.opacity).toBe("0.6");
      expect(sec.style.marginTop).toBe("var(--space-1)");
    });

    it("merges primaryStyle and secondaryStyle", () => {
      render(
        <BilingualText
          primary="P"
          secondary="S"
          primaryStyle={{ color: "red" }}
          secondaryStyle={{ color: "blue" }}
        />,
      );
      expect(screen.getByText("P").style.color).toBe("red");
      expect(screen.getByText("S").style.color).toBe("blue");
    });

    it("passes through HTML attributes to wrapper", () => {
      render(<BilingualText primary="P" secondary="S" data-testid="bi" id="stack" />);
      const wrapper = screen.getByTestId("bi");
      expect(wrapper).toHaveAttribute("id", "stack");
    });

    it("merges style on wrapper", () => {
      render(<BilingualText primary="P" secondary="S" style={{ padding: "8px" }} />);
      const wrapper = screen.getByText("P").parentElement!;
      expect(wrapper.style.padding).toBe("8px");
    });
  });

  // --- inline layout ---
  describe("inline layout", () => {
    it("renders primary in <em> and secondary in <span>", () => {
      render(<BilingualText primary="Mwana" secondary="Child" layout="inline" />);
      const primary = screen.getByText("Mwana");
      const secondary = screen.getByText("Child");
      expect(primary.tagName).toBe("EM");
      expect(secondary.tagName).toBe("SPAN");
    });

    it("includes an em dash separator", () => {
      const { container } = render(
        <BilingualText primary="A" secondary="B" layout="inline" />,
      );
      expect(container.textContent).toContain(" — ");
    });

    it("sets lang attributes on primary and secondary", () => {
      render(<BilingualText primary="A" secondary="B" layout="inline" />);
      expect(screen.getByText("A")).toHaveAttribute("lang", "dig");
      expect(screen.getByText("B")).toHaveAttribute("lang", "en");
    });

    it("applies serif font styles on wrapper", () => {
      render(<BilingualText primary="A" secondary="B" layout="inline" data-testid="inl" />);
      const wrapper = screen.getByTestId("inl");
      expect(wrapper.style.fontFamily).toBe("var(--font-serif)");
      expect(wrapper.style.fontSize).toBe("var(--text-lg)");
    });

    it("merges primaryStyle and secondaryStyle", () => {
      render(
        <BilingualText
          primary="A"
          secondary="B"
          layout="inline"
          primaryStyle={{ fontWeight: "bold" }}
          secondaryStyle={{ fontStyle: "italic" }}
        />,
      );
      expect(screen.getByText("A").style.fontWeight).toBe("bold");
      expect(screen.getByText("B").style.fontStyle).toBe("italic");
    });

    it("passes through HTML attributes and merges style", () => {
      render(
        <BilingualText
          primary="A"
          secondary="B"
          layout="inline"
          data-testid="inl2"
          style={{ marginBottom: "4px" }}
        />,
      );
      const wrapper = screen.getByTestId("inl2");
      expect(wrapper.style.marginBottom).toBe("4px");
    });
  });

  // --- two-column layout ---
  describe("two-column layout", () => {
    it("renders a grid container with two child divs", () => {
      render(<BilingualText primary="Left" secondary="Right" layout="two-column" data-testid="grid" />);
      const wrapper = screen.getByTestId("grid");
      expect(wrapper.style.display).toBe("grid");
      expect(wrapper.style.gridTemplateColumns).toBe("1fr 1fr");
      expect(wrapper.children).toHaveLength(2);
    });

    it("sets lang attributes on columns", () => {
      render(<BilingualText primary="L" secondary="R" layout="two-column" />);
      expect(screen.getByText("L")).toHaveAttribute("lang", "dig");
      expect(screen.getByText("R")).toHaveAttribute("lang", "en");
    });

    it("applies serif font styles to both columns", () => {
      render(<BilingualText primary="L" secondary="R" layout="two-column" />);
      const left = screen.getByText("L");
      const right = screen.getByText("R");
      expect(left.style.fontFamily).toBe("var(--font-serif)");
      expect(right.style.fontFamily).toBe("var(--font-serif)");
      expect(left.style.fontSize).toBe("var(--text-lg)");
      expect(right.style.fontSize).toBe("var(--text-lg)");
    });

    it("merges primaryStyle and secondaryStyle on columns", () => {
      render(
        <BilingualText
          primary="L"
          secondary="R"
          layout="two-column"
          primaryStyle={{ background: "red" }}
          secondaryStyle={{ background: "blue" }}
        />,
      );
      expect(screen.getByText("L").style.background).toBe("red");
      expect(screen.getByText("R").style.background).toBe("blue");
    });

    it("passes through HTML attributes and merges style on wrapper", () => {
      render(
        <BilingualText
          primary="L"
          secondary="R"
          layout="two-column"
          data-testid="tc"
          style={{ gap: "16px" }}
        />,
      );
      const wrapper = screen.getByTestId("tc");
      expect(wrapper.style.gap).toBe("16px");
    });
  });
});
