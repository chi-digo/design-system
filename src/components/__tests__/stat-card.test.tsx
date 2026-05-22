import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatCard } from "../StatCard";

describe("StatCard", () => {
  it("renders label in dt and value in dd", () => {
    render(<StatCard label="Rounds played" value={12} />);
    expect(screen.getByText("Rounds played").tagName).toBe("DT");
    expect(screen.getByText("12").tagName).toBe("DD");
  });

  it("renders subtitle as second dd when provided", () => {
    render(<StatCard label="Score" value="8/10" subtitle="last 30 days" />);
    expect(screen.getByText("last 30 days").tagName).toBe("DD");
  });

  it("does not render subtitle dd when omitted", () => {
    const { container } = render(<StatCard label="Score" value={10} />);
    const dds = container.querySelectorAll("dd");
    expect(dds).toHaveLength(1);
  });

  it("forwards ref to the dl element", () => {
    const ref = createRef<HTMLDListElement>();
    render(<StatCard ref={ref} label="Test" value={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDListElement);
  });

  it("spreads additional HTML attributes", () => {
    render(<StatCard label="Test" value={0} data-testid="stat" />);
    expect(screen.getByTestId("stat")).toBeInTheDocument();
  });

  it("applies style override via style prop", () => {
    const { container } = render(
      <StatCard label="Test" value={0} style={{ background: "red" }} />,
    );
    const dl = container.firstChild as HTMLElement;
    expect(dl.style.background).toBe("red");
  });
});
