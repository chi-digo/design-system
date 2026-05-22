import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sparkline } from "../Sparkline";

describe("Sparkline", () => {
  it("renders an SVG polyline when given 2+ data points", () => {
    const { container } = render(
      <Sparkline data={[5, 10, 7]} aria-label="Trend" />,
    );
    const polyline = container.querySelector("polyline");
    expect(polyline).toBeInTheDocument();
    expect(polyline?.getAttribute("points")).toBeTruthy();
  });

  it("returns null when data has fewer than 2 points", () => {
    const { container } = render(<Sparkline data={[5]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a horizontal line when all values are identical", () => {
    const { container } = render(<Sparkline data={[5, 5, 5, 5]} />);
    const polyline = container.querySelector("polyline");
    expect(polyline).toBeInTheDocument();
    const points = polyline!.getAttribute("points")!;
    const yValues = points.split(" ").map((p) => parseFloat(p.split(",")[1]));
    const allSame = yValues.every((y) => y === yValues[0]);
    expect(allSame).toBe(true);
  });

  it("applies custom width, height, color, strokeWidth", () => {
    const { container } = render(
      <Sparkline data={[1, 2]} width={200} height={50} color="red" strokeWidth={3} />,
    );
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("200");
    expect(svg.getAttribute("height")).toBe("50");
    const polyline = container.querySelector("polyline")!;
    expect(polyline.getAttribute("stroke")).toBe("red");
    expect(polyline.getAttribute("stroke-width")).toBe("3");
  });

  it("spreads additional HTML attributes to wrapper div", () => {
    render(<Sparkline data={[1, 2]} data-testid="spark" />);
    expect(screen.getByTestId("spark")).toBeInTheDocument();
  });

  it("SVG has aria-hidden true", () => {
    const { container } = render(<Sparkline data={[1, 2]} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it("wrapper div has role img by default", () => {
    render(<Sparkline data={[1, 2]} aria-label="Score trend" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
