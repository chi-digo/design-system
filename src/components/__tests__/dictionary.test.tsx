import { render, screen, fireEvent } from "@testing-library/react";
import { Headword } from "../Headword";
import { SenseList } from "../SenseList";
import { RelatedWords } from "../RelatedWords";
import { EtymologySection } from "../EtymologySection";
import { AudioPlayer } from "../AudioPlayer";
import { SearchResults } from "../SearchResults";
import { NounClassBadge } from "../NounClassBadge";
import { WordOfTheDay } from "../WordOfTheDay";

/* ------------------------------------------------------------------ */
/*  Headword                                                          */
/* ------------------------------------------------------------------ */
describe("Headword", () => {
  it("renders the word in an h2 with lang attribute", () => {
    render(<Headword word="maji" />);
    const heading = screen.getByRole("heading", { level: 2, name: "maji" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("lang", "dig");
  });

  it("accepts a custom lang prop", () => {
    render(<Headword word="water" lang="en" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("lang", "en");
  });

  it("renders pronunciation when provided", () => {
    render(<Headword word="maji" pronunciation="/ma.d͡ʒi/" />);
    expect(screen.getByText("/ma.d͡ʒi/")).toBeInTheDocument();
  });

  it("does not render pronunciation when omitted", () => {
    const { container } = render(<Headword word="maji" />);
    // Only the h2 span should be a direct child span count check
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });

  it("renders noun class badge when provided", () => {
    render(<Headword word="maji" nounClass="6" />);
    expect(screen.getByText("cl. 6")).toBeInTheDocument();
  });

  it("does not render noun class when omitted", () => {
    render(<Headword word="maji" />);
    expect(screen.queryByText(/^cl\./)).not.toBeInTheDocument();
  });

  it("renders part of speech when provided", () => {
    render(<Headword word="maji" partOfSpeech="noun" />);
    expect(screen.getByText("noun")).toBeInTheDocument();
  });

  it("does not render part of speech when omitted", () => {
    render(<Headword word="maji" />);
    expect(screen.queryByText("noun")).not.toBeInTheDocument();
  });

  it("renders the audio ReactNode when provided", () => {
    render(<Headword word="maji" audio={<button>Play</button>} />);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("renders all optional props together", () => {
    render(
      <Headword
        word="maji"
        pronunciation="/ma.d͡ʒi/"
        nounClass="6"
        partOfSpeech="noun"
        audio={<span data-testid="audio">audio</span>}
      />,
    );
    expect(screen.getByText("maji")).toBeInTheDocument();
    expect(screen.getByText("/ma.d͡ʒi/")).toBeInTheDocument();
    expect(screen.getByText("cl. 6")).toBeInTheDocument();
    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByTestId("audio")).toBeInTheDocument();
  });

  it("spreads additional HTML attributes", () => {
    render(<Headword word="maji" data-testid="hw" />);
    expect(screen.getByTestId("hw")).toBeInTheDocument();
  });

  it("merges custom style", () => {
    const { container } = render(<Headword word="maji" style={{ color: "red" }} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.color).toBe("red");
  });
});

/* ------------------------------------------------------------------ */
/*  SenseList                                                         */
/* ------------------------------------------------------------------ */
describe("SenseList", () => {
  it("renders an ordered list with definitions", () => {
    render(
      <SenseList
        senses={[
          { definition: "water" },
          { definition: "liquid" },
        ]}
      />,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("water")).toBeInTheDocument();
    expect(screen.getByText("liquid")).toBeInTheDocument();
  });

  it("renders usage notes when provided", () => {
    render(
      <SenseList senses={[{ definition: "water", usageNote: "archaic" }]} />,
    );
    expect(screen.getByText("(archaic)")).toBeInTheDocument();
  });

  it("does not render usage notes when omitted", () => {
    render(<SenseList senses={[{ definition: "water" }]} />);
    expect(screen.queryByText(/^\(/)).not.toBeInTheDocument();
  });

  it("renders examples with text and translation", () => {
    render(
      <SenseList
        senses={[
          {
            definition: "water",
            examples: [
              { text: "Mimi ninapenda maji.", translation: "I like water." },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("Mimi ninapenda maji.")).toBeInTheDocument();
    expect(screen.getByText("I like water.")).toBeInTheDocument();
  });

  it("renders example without translation", () => {
    render(
      <SenseList
        senses={[
          {
            definition: "water",
            examples: [{ text: "Maji ni baridi." }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Maji ni baridi.")).toBeInTheDocument();
  });

  it("uses default lang='dig' for examples", () => {
    render(
      <SenseList
        senses={[
          {
            definition: "water",
            examples: [{ text: "Maji" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Maji")).toHaveAttribute("lang", "dig");
  });

  it("uses custom lang for examples", () => {
    render(
      <SenseList
        senses={[
          {
            definition: "water",
            examples: [{ text: "Wasser", lang: "de" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Wasser")).toHaveAttribute("lang", "de");
  });

  it("does not render examples list when examples array is empty", () => {
    const { container } = render(
      <SenseList senses={[{ definition: "water", examples: [] }]} />,
    );
    // Only the outer OL should exist, no nested UL
    expect(container.querySelectorAll("ul")).toHaveLength(0);
  });

  it("spreads HTML attributes and merges style", () => {
    const { container } = render(
      <SenseList
        senses={[{ definition: "water" }]}
        style={{ color: "blue" }}
      />,
    );
    const list = screen.getByRole("list");
    expect(list.style.color).toBe("blue");
    // Verify the component's own styles are also present
    expect(list.style.listStyleType).toBe("decimal");
  });
});

/* ------------------------------------------------------------------ */
/*  RelatedWords                                                      */
/* ------------------------------------------------------------------ */
describe("RelatedWords", () => {
  it("renders nothing when words array is empty", () => {
    const { container } = render(<RelatedWords words={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders heading and word tags", () => {
    render(<RelatedWords words={[{ word: "mvua" }, { word: "bahari" }]} />);
    expect(screen.getByText("Related words")).toBeInTheDocument();
    expect(screen.getByText("mvua")).toBeInTheDocument();
    expect(screen.getByText("bahari")).toBeInTheDocument();
  });

  it("renders words without href as plain spans with lang='dig'", () => {
    render(<RelatedWords words={[{ word: "mvua" }]} />);
    const el = screen.getByText("mvua");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("lang", "dig");
  });

  it("renders words with href as anchor links", () => {
    render(<RelatedWords words={[{ word: "mvua", href: "/word/mvua" }]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/word/mvua");
  });

  it("uses renderLink when provided and word has href", () => {
    const renderLink = (href: string, children: React.ReactNode) => (
      <a data-testid="custom-link" href={href}>{children}</a>
    );
    render(
      <RelatedWords
        words={[{ word: "mvua", href: "/word/mvua" }]}
        renderLink={renderLink}
      />,
    );
    expect(screen.getByTestId("custom-link")).toBeInTheDocument();
  });

  it("does not use renderLink for words without href", () => {
    const renderLink = vi.fn();
    render(
      <RelatedWords
        words={[{ word: "mvua" }]}
        renderLink={renderLink}
      />,
    );
    expect(renderLink).not.toHaveBeenCalled();
  });

  it("spreads additional HTML attributes", () => {
    render(
      <RelatedWords words={[{ word: "mvua" }]} data-testid="rw" />,
    );
    expect(screen.getByTestId("rw")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  EtymologySection                                                  */
/* ------------------------------------------------------------------ */
describe("EtymologySection", () => {
  it("renders string content", () => {
    render(<EtymologySection content="From Proto-Bantu *-jiba" />);
    expect(screen.getByText("From Proto-Bantu *-jiba")).toBeInTheDocument();
  });

  it("renders ReactNode content", () => {
    render(
      <EtymologySection
        content={<em data-testid="etym">From <strong>Arabic</strong></em>}
      />,
    );
    expect(screen.getByTestId("etym")).toBeInTheDocument();
    expect(screen.getByText("Arabic")).toBeInTheDocument();
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <EtymologySection
        content="test"
        data-testid="es"
        style={{ marginTop: "8px" }}
      />,
    );
    const el = screen.getByTestId("es");
    expect(el).toHaveStyle({ marginTop: "8px" });
  });
});

/* ------------------------------------------------------------------ */
/*  AudioPlayer                                                       */
/* ------------------------------------------------------------------ */
describe("AudioPlayer", () => {
  beforeEach(() => {
    // jsdom doesn't implement HTMLMediaElement methods
    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("inline variant (default)", () => {
    it("renders with Play label by default", () => {
      render(<AudioPlayer src="/audio.mp3" label="maji" />);
      expect(screen.getByRole("button", { name: "Play maji" })).toBeInTheDocument();
    });

    it("renders as a span (inline)", () => {
      const { container } = render(<AudioPlayer src="/audio.mp3" label="maji" />);
      expect(container.firstChild!.nodeName).toBe("SPAN");
    });

    it("toggles play/pause on click", () => {
      render(<AudioPlayer src="/audio.mp3" label="maji" />);
      const btn = screen.getByRole("button", { name: "Play maji" });

      fireEvent.click(btn);
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
      expect(screen.getByRole("button", { name: "Pause maji" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Pause maji" }));
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
      expect(screen.getByRole("button", { name: "Play maji" })).toBeInTheDocument();
    });

    it("does not render the progress bar or label text", () => {
      const { container } = render(<AudioPlayer src="/audio.mp3" label="maji" />);
      // The inline variant does NOT render the label as visible text
      expect(screen.queryByText("maji")).not.toBeInTheDocument();
      // No progress bar div structure
      expect(container.querySelectorAll("[style*='height: 4px']")).toHaveLength(0);
    });
  });

  describe("block variant", () => {
    it("renders as a div", () => {
      const { container } = render(
        <AudioPlayer src="/audio.mp3" label="maji" variant="block" />,
      );
      expect(container.firstChild!.nodeName).toBe("DIV");
    });

    it("shows the label as visible text", () => {
      render(<AudioPlayer src="/audio.mp3" label="maji" variant="block" />);
      expect(screen.getByText("maji")).toBeInTheDocument();
    });

    it("shows Play button aria-label", () => {
      render(<AudioPlayer src="/audio.mp3" label="maji" variant="block" />);
      expect(screen.getByRole("button", { name: "Play maji" })).toBeInTheDocument();
    });

    it("toggles play/pause on click", () => {
      render(<AudioPlayer src="/audio.mp3" label="maji" variant="block" />);
      const btn = screen.getByRole("button", { name: "Play maji" });

      fireEvent.click(btn);
      expect(screen.getByRole("button", { name: "Pause maji" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Pause maji" }));
      expect(screen.getByRole("button", { name: "Play maji" })).toBeInTheDocument();
    });
  });

  it("resets state when audio ends", () => {
    render(<AudioPlayer src="/audio.mp3" label="maji" />);
    const btn = screen.getByRole("button", { name: "Play maji" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "Pause maji" })).toBeInTheDocument();

    // Simulate ended event
    const audio = document.querySelector("audio")!;
    fireEvent.ended(audio);
    expect(screen.getByRole("button", { name: "Play maji" })).toBeInTheDocument();
  });

  it("updates progress on timeUpdate", () => {
    render(<AudioPlayer src="/audio.mp3" label="maji" variant="block" />);
    const audio = document.querySelector("audio")!;

    // Simulate time update
    Object.defineProperty(audio, "duration", { value: 100, writable: true });
    Object.defineProperty(audio, "currentTime", { value: 50, writable: true });
    fireEvent.timeUpdate(audio);

    // The progress bar should reflect 50%
    const { container } = render(<div />); // just to get a reference
    // Re-query the rendered component's progress bar
    const progressBars = document.querySelectorAll("[style*='width: 50%']");
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it("handles timeUpdate when duration is 0", () => {
    render(<AudioPlayer src="/audio.mp3" label="maji" variant="block" />);
    const audio = document.querySelector("audio")!;

    Object.defineProperty(audio, "duration", { value: 0, writable: true });
    Object.defineProperty(audio, "currentTime", { value: 0, writable: true });
    // Should not throw
    fireEvent.timeUpdate(audio);
  });

  it("spreads additional HTML attributes", () => {
    render(<AudioPlayer src="/audio.mp3" label="maji" data-testid="ap" />);
    expect(screen.getByTestId("ap")).toBeInTheDocument();
  });

  it("merges custom style", () => {
    const { container } = render(
      <AudioPlayer src="/audio.mp3" label="maji" style={{ border: "1px solid red" }} />,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.border).toBe("1px solid red");
  });
});

/* ------------------------------------------------------------------ */
/*  SearchResults                                                     */
/* ------------------------------------------------------------------ */
describe("SearchResults", () => {
  const results = [
    { headword: "maji", definition: "water", ipa: "/ma.d͡ʒi/", nounClass: "6", href: "/word/maji" },
    { headword: "mvua", definition: "rain" },
  ];

  it("renders loading skeleton with 3 placeholder rows", () => {
    const { container } = render(
      <SearchResults results={[]} query="" loading data-testid="sr" />,
    );
    // 3 skeleton rows, each has 2 inner divs
    const skeletonContainer = screen.getByTestId("sr");
    expect(skeletonContainer.children).toHaveLength(3);
  });

  it("renders empty state when results are empty and emptyState is provided", () => {
    render(
      <SearchResults
        results={[]}
        query="xyz"
        emptyState={<p>No results found</p>}
      />,
    );
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders nothing special when results are empty and no emptyState", () => {
    const { container } = render(
      <SearchResults results={[]} query="xyz" />,
    );
    // Just the wrapper div
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders results with headword and definition", () => {
    render(<SearchResults results={results} query="" />);
    expect(screen.getByText("maji")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
    expect(screen.getByText("mvua")).toBeInTheDocument();
    expect(screen.getByText("rain")).toBeInTheDocument();
  });

  it("renders IPA when provided on a result", () => {
    render(<SearchResults results={results} query="" />);
    expect(screen.getByText("/ma.d͡ʒi/")).toBeInTheDocument();
  });

  it("renders noun class badge when provided on a result", () => {
    render(<SearchResults results={results} query="" />);
    expect(screen.getByText("cl. 6")).toBeInTheDocument();
  });

  it("does not render IPA or noun class when omitted", () => {
    render(
      <SearchResults
        results={[{ headword: "mvua", definition: "rain" }]}
        query=""
      />,
    );
    expect(screen.queryByText(/^cl\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\//)).not.toBeInTheDocument();
  });

  it("highlights matching query text with a <mark> element", () => {
    render(<SearchResults results={results} query="maj" />);
    const marks = document.querySelectorAll("mark");
    expect(marks.length).toBeGreaterThan(0);
    expect(marks[0].textContent).toBe("maj");
  });

  it("highlights are case-insensitive", () => {
    render(
      <SearchResults
        results={[{ headword: "Maji", definition: "Water" }]}
        query="maji"
      />,
    );
    const marks = document.querySelectorAll("mark");
    expect(marks.length).toBeGreaterThan(0);
    expect(marks[0].textContent).toBe("Maji");
  });

  it("does not highlight when query is empty", () => {
    render(<SearchResults results={results} query="" />);
    expect(document.querySelectorAll("mark")).toHaveLength(0);
  });

  it("does not highlight when query does not match", () => {
    render(
      <SearchResults
        results={[{ headword: "maji", definition: "water" }]}
        query="zzz"
      />,
    );
    expect(document.querySelectorAll("mark")).toHaveLength(0);
  });

  it("wraps results with href in anchor tags", () => {
    render(<SearchResults results={results} query="" />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/word/maji");
  });

  it("uses renderLink when provided for results with href", () => {
    const renderLink = (href: string, children: React.ReactNode) => (
      <a data-testid="custom" href={href}>{children}</a>
    );
    render(
      <SearchResults results={results} query="" renderLink={renderLink} />,
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("does not wrap results without href in anchor tags", () => {
    render(
      <SearchResults
        results={[{ headword: "mvua", definition: "rain" }]}
        query=""
      />,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("spreads HTML attributes", () => {
    render(<SearchResults results={[]} query="" data-testid="sr2" />);
    expect(screen.getByTestId("sr2")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  NounClassBadge                                                    */
/* ------------------------------------------------------------------ */
describe("NounClassBadge", () => {
  it("renders with default variant showing 'cl.' prefix", () => {
    render(<NounClassBadge nounClass="9/10" />);
    expect(screen.getByText("cl. 9/10")).toBeInTheDocument();
  });

  it("renders with compact variant without prefix", () => {
    render(<NounClassBadge nounClass="9/10" variant="compact" />);
    expect(screen.getByText("9/10")).toBeInTheDocument();
    expect(screen.queryByText(/^cl\./)).not.toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<NounClassBadge nounClass="1" />);
    expect(screen.getByText("cl. 1").tagName).toBe("SPAN");
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <NounClassBadge
        nounClass="1"
        data-testid="ncb"
        style={{ marginLeft: "4px" }}
      />,
    );
    const el = screen.getByTestId("ncb");
    expect(el).toHaveStyle({ marginLeft: "4px" });
  });
});

/* ------------------------------------------------------------------ */
/*  WordOfTheDay                                                      */
/* ------------------------------------------------------------------ */
describe("WordOfTheDay", () => {
  const minimalEntry = { headword: "maji", definition: "water" };
  const fullEntry = {
    headword: "maji",
    ipa: "/ma.d͡ʒi/",
    nounClass: "6",
    partOfSpeech: "noun",
    definition: "water, liquid",
    example: { text: "Nipe maji.", translation: "Give me water." },
  };

  it("renders the 'Word of the day' label", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.getByText(/Word of the day/)).toBeInTheDocument();
  });

  it("renders the date when provided", () => {
    render(<WordOfTheDay entry={minimalEntry} date="May 7" />);
    expect(screen.getByText(/May 7/)).toBeInTheDocument();
  });

  it("does not show date separator when date is omitted", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.getByText("Word of the day")).toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });

  it("renders the headword with lang='dig'", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    const hw = screen.getByText("maji");
    expect(hw).toHaveAttribute("lang", "dig");
  });

  it("renders definition", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.getByText("water")).toBeInTheDocument();
  });

  it("renders IPA when provided", () => {
    render(<WordOfTheDay entry={fullEntry} />);
    expect(screen.getByText("/ma.d͡ʒi/")).toBeInTheDocument();
  });

  it("does not render IPA when omitted", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.queryByText(/^\//)).not.toBeInTheDocument();
  });

  it("renders noun class when provided", () => {
    render(<WordOfTheDay entry={fullEntry} />);
    expect(screen.getByText("cl. 6")).toBeInTheDocument();
  });

  it("does not render noun class when omitted", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.queryByText(/^cl\./)).not.toBeInTheDocument();
  });

  it("renders part of speech when provided", () => {
    render(<WordOfTheDay entry={fullEntry} />);
    expect(screen.getByText("noun")).toBeInTheDocument();
  });

  it("does not render part of speech when omitted", () => {
    render(<WordOfTheDay entry={minimalEntry} />);
    expect(screen.queryByText("noun")).not.toBeInTheDocument();
  });

  it("renders example with text and translation", () => {
    render(<WordOfTheDay entry={fullEntry} />);
    expect(screen.getByText("Nipe maji.")).toBeInTheDocument();
    expect(screen.getByText("Give me water.")).toBeInTheDocument();
  });

  it("renders example text without translation", () => {
    const entry = {
      ...minimalEntry,
      example: { text: "Maji ni baridi." },
    };
    render(<WordOfTheDay entry={entry} />);
    expect(screen.getByText("Maji ni baridi.")).toBeInTheDocument();
  });

  it("does not render example section when omitted", () => {
    const { container } = render(<WordOfTheDay entry={minimalEntry} />);
    expect(container.querySelector("blockquote")).not.toBeInTheDocument();
  });

  it("renders audio ReactNode when provided", () => {
    render(
      <WordOfTheDay
        entry={minimalEntry}
        audio={<button>Play audio</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Play audio" })).toBeInTheDocument();
  });

  it("spreads HTML attributes and merges style", () => {
    render(
      <WordOfTheDay
        entry={minimalEntry}
        data-testid="wotd"
        style={{ maxWidth: "400px" }}
      />,
    );
    const el = screen.getByTestId("wotd");
    expect(el).toHaveStyle({ maxWidth: "400px" });
  });
});
