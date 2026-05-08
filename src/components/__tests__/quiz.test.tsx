import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuizOption } from "../QuizOption";
import { ScoreCard } from "../ScoreCard";

/* ---------- QuizOption ---------- */
describe("QuizOption", () => {
  it("renders label and text", () => {
    render(<QuizOption label="A" text="Village" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("Village")).toBeInTheDocument();
  });

  it("fires onClick in default state", () => {
    const onClick = vi.fn();
    render(<QuizOption label="A" text="Village" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled in correct state", () => {
    render(<QuizOption label="A" text="Village" state="correct" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled in incorrect state", () => {
    render(<QuizOption label="A" text="Village" state="incorrect" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows checkmark in correct state", () => {
    render(<QuizOption label="A" text="Village" state="correct" />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("shows X in incorrect state", () => {
    render(<QuizOption label="A" text="Village" state="incorrect" />);
    expect(screen.getByText("✗")).toBeInTheDocument();
  });

  it("sets data-state attribute", () => {
    render(<QuizOption label="A" text="Village" state="selected" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "selected");
  });
});

/* ---------- ScoreCard ---------- */
describe("ScoreCard", () => {
  it("renders score fraction", () => {
    render(<ScoreCard score={8} total={10} message="Great job!" />);
    expect(screen.getByText("8/10")).toBeInTheDocument();
  });

  it("renders percentage", () => {
    render(<ScoreCard score={8} total={10} message="Great job!" />);
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders message", () => {
    render(<ScoreCard score={10} total={10} message="Perfect!" />);
    expect(screen.getByText("Perfect!")).toBeInTheDocument();
  });

  it("renders breakdown when provided", () => {
    render(
      <ScoreCard
        score={8}
        total={10}
        message="Good"
        breakdown={[
          { category: "Vocabulary", correct: 3, total: 4 },
          { category: "Proverbs", correct: 3, total: 3 },
          { category: "Riddles", correct: 2, total: 3 },
        ]}
      />,
    );
    expect(screen.getByText("Vocabulary")).toBeInTheDocument();
    expect(screen.getByText("3/4")).toBeInTheDocument();
    expect(screen.getByText("3/3")).toBeInTheDocument();
    expect(screen.getByText("2/3")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(
      <ScoreCard
        score={5}
        total={10}
        message="Keep going"
        actions={<button>Play Again</button>}
      />,
    );
    expect(screen.getByText("Play Again")).toBeInTheDocument();
  });
});
