import { render, screen } from "@testing-library/react";
import { ProverbCard } from "../ProverbCard";
import { ProverbOfTheDay } from "../ProverbOfTheDay";
import { ContributionPrompt } from "../ContributionPrompt";
import { TrackBadge } from "../TrackBadge";

/* ------------------------------------------------------------------ */
/*  ProverbCard                                                       */
/* ------------------------------------------------------------------ */
describe("ProverbCard", () => {
  const requiredProps = {
    proverb: "Mvula ya kunyesha, inajulikana kwa mawingu.",
    translation: "Rain that will fall is known by its clouds.",
  };

  it("renders a figure element", () => {
    render(<ProverbCard {...requiredProps} />);
    const figure = document.querySelector("figure");
    expect(figure).toBeInTheDocument();
  });

  it("renders the proverb text with default lang='dig'", () => {
    render(<ProverbCard {...requiredProps} />);
    const proverbEl = screen.getByText(requiredProps.proverb);
    expect(proverbEl).toBeInTheDocument();
    expect(proverbEl).toHaveAttribute("lang", "dig");
  });

  it("accepts a custom lang prop", () => {
    render(<ProverbCard {...requiredProps} lang="sw" />);
    expect(screen.getByText(requiredProps.proverb)).toHaveAttribute("lang", "sw");
  });

  it("renders the translation", () => {
    render(<ProverbCard {...requiredProps} />);
    expect(screen.getByText(requiredProps.translation)).toBeInTheDocument();
  });

  it("renders the blockquote", () => {
    render(<ProverbCard {...requiredProps} />);
    expect(document.querySelector("blockquote")).toBeInTheDocument();
  });

  it("renders gloss when provided", () => {
    render(<ProverbCard {...requiredProps} gloss="Literal: Rain of raining, is known by clouds." />);
    expect(screen.getByText(/Literal: Rain of raining/)).toBeInTheDocument();
  });

  it("does not render gloss when omitted", () => {
    render(<ProverbCard {...requiredProps} />);
    expect(screen.queryByText(/Literal/)).not.toBeInTheDocument();
  });

  it("renders source in a figcaption when provided", () => {
    render(<ProverbCard {...requiredProps} source="Mgombato Dictionary, p. 42" />);
    const caption = screen.getByText("Mgombato Dictionary, p. 42");
    expect(caption).toBeInTheDocument();
    expect(caption.tagName).toBe("FIGCAPTION");
  });

  it("does not render figcaption when source is omitted", () => {
    render(<ProverbCard {...requiredProps} />);
    expect(document.querySelector("figcaption")).not.toBeInTheDocument();
  });

  it("renders all optional props together", () => {
    render(
      <ProverbCard
        {...requiredProps}
        gloss="Lit: ..."
        source="Source"
        lang="sw"
      />,
    );
    expect(screen.getByText(requiredProps.proverb)).toHaveAttribute("lang", "sw");
    expect(screen.getByText("Lit: ...")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <ProverbCard
        {...requiredProps}
        data-testid="pc"
        style={{ maxWidth: "500px" }}
      />,
    );
    const el = screen.getByTestId("pc");
    expect(el).toHaveStyle({ maxWidth: "500px" });
  });
});

/* ------------------------------------------------------------------ */
/*  ProverbOfTheDay                                                   */
/* ------------------------------------------------------------------ */
describe("ProverbOfTheDay", () => {
  const requiredProps = {
    proverb: "Mwenye nguvuo ndiye avumaye.",
    translation: "The one with strength is the one who endures.",
  };

  it("renders the 'Proverb of the day' label", () => {
    render(<ProverbOfTheDay {...requiredProps} />);
    expect(screen.getByText("Proverb of the day")).toBeInTheDocument();
  });

  it("renders the proverb text with lang='dig'", () => {
    render(<ProverbOfTheDay {...requiredProps} />);
    const proverbEl = screen.getByText(requiredProps.proverb);
    expect(proverbEl).toBeInTheDocument();
    expect(proverbEl).toHaveAttribute("lang", "dig");
  });

  it("renders the translation", () => {
    render(<ProverbOfTheDay {...requiredProps} />);
    expect(screen.getByText(requiredProps.translation)).toBeInTheDocument();
  });

  it("renders a blockquote", () => {
    render(<ProverbOfTheDay {...requiredProps} />);
    expect(document.querySelector("blockquote")).toBeInTheDocument();
  });

  it("renders a decorative vigango column with aria-hidden", () => {
    const { container } = render(<ProverbOfTheDay {...requiredProps} />);
    const decorative = container.querySelector("[aria-hidden='true']");
    expect(decorative).toBeInTheDocument();
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <ProverbOfTheDay
        {...requiredProps}
        data-testid="potd"
        style={{ marginBottom: "16px" }}
      />,
    );
    const el = screen.getByTestId("potd");
    expect(el).toHaveStyle({ marginBottom: "16px" });
  });
});

/* ------------------------------------------------------------------ */
/*  ContributionPrompt                                                */
/* ------------------------------------------------------------------ */
describe("ContributionPrompt", () => {
  describe("default (word) variant, non-compact", () => {
    it("renders title and body for word variant", () => {
      render(<ContributionPrompt />);
      expect(screen.getByText("The dictionary needs you.")).toBeInTheDocument();
      expect(
        screen.getByText("Add a word, record a pronunciation, or flag a missing definition."),
      ).toBeInTheDocument();
    });

    it("renders title in an h3 heading", () => {
      render(<ContributionPrompt />);
      expect(
        screen.getByRole("heading", { level: 3, name: "The dictionary needs you." }),
      ).toBeInTheDocument();
    });

    it("renders action ReactNode when provided", () => {
      render(
        <ContributionPrompt action={<button>Contribute</button>} />,
      );
      expect(screen.getByRole("button", { name: "Contribute" })).toBeInTheDocument();
    });

    it("does not render action when omitted", () => {
      render(<ContributionPrompt />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("audio variant", () => {
    it("renders audio-specific copy", () => {
      render(<ContributionPrompt variant="audio" />);
      expect(screen.getByText("Lend your voice.")).toBeInTheDocument();
      expect(
        screen.getByText("Record a pronunciation for this word so others can hear how it sounds."),
      ).toBeInTheDocument();
    });
  });

  describe("review variant", () => {
    it("renders review-specific copy", () => {
      render(<ContributionPrompt variant="review" />);
      expect(screen.getByText("Help us get it right.")).toBeInTheDocument();
      expect(
        screen.getByText("Review this entry and suggest corrections or additions."),
      ).toBeInTheDocument();
    });
  });

  describe("compact mode", () => {
    it("renders only the title (no body paragraph)", () => {
      render(<ContributionPrompt compact />);
      expect(screen.getByText("The dictionary needs you.")).toBeInTheDocument();
      // The body text should NOT be present in compact mode
      expect(
        screen.queryByText("Add a word, record a pronunciation, or flag a missing definition."),
      ).not.toBeInTheDocument();
    });

    it("does not render an h3 heading", () => {
      render(<ContributionPrompt compact />);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("renders action in compact mode", () => {
      render(
        <ContributionPrompt compact action={<button>Go</button>} />,
      );
      expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    });

    it("works with each variant in compact mode", () => {
      const { rerender } = render(<ContributionPrompt compact variant="audio" />);
      expect(screen.getByText("Lend your voice.")).toBeInTheDocument();

      rerender(<ContributionPrompt compact variant="review" />);
      expect(screen.getByText("Help us get it right.")).toBeInTheDocument();
    });
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <ContributionPrompt data-testid="cp" style={{ padding: "8px" }} />,
    );
    const el = screen.getByTestId("cp");
    expect(el).toHaveStyle({ padding: "8px" });
  });

  it("spreads HTML attributes in compact mode", () => {
    render(
      <ContributionPrompt compact data-testid="cp-compact" style={{ margin: "4px" }} />,
    );
    const el = screen.getByTestId("cp-compact");
    expect(el).toHaveStyle({ margin: "4px" });
  });
});

/* ------------------------------------------------------------------ */
/*  TrackBadge                                                        */
/* ------------------------------------------------------------------ */
describe("TrackBadge", () => {
  it("renders 'Editorial' label for editorial track", () => {
    render(<TrackBadge track="editorial" />);
    expect(screen.getByText("Editorial")).toBeInTheDocument();
  });

  it("renders 'Community' label for community track", () => {
    render(<TrackBadge track="community" />);
    expect(screen.getByText("Community")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<TrackBadge track="editorial" />);
    // The outer element containing "Editorial" text
    expect(screen.getByText("Editorial").closest("span")).toBeInTheDocument();
  });

  it("renders a decorative dot indicator", () => {
    const { container } = render(<TrackBadge track="editorial" />);
    // The inner dot span
    const dots = container.querySelectorAll("span > span");
    expect(dots.length).toBeGreaterThan(0);
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <TrackBadge
        track="community"
        data-testid="tb"
        style={{ marginRight: "8px" }}
      />,
    );
    const el = screen.getByTestId("tb");
    expect(el).toHaveStyle({ marginRight: "8px" });
  });

  it("uses different background colors for each track", () => {
    const { rerender } = render(<TrackBadge track="editorial" data-testid="tb" />);
    const editorial = screen.getByTestId("tb");
    const editorialBg = editorial.style.background;

    rerender(<TrackBadge track="community" data-testid="tb" />);
    const community = screen.getByTestId("tb");
    const communityBg = community.style.background;

    expect(editorialBg).not.toBe(communityBg);
  });
});
