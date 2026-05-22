import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FavouriteButton } from "../FavouriteButton";

describe("FavouriteButton", () => {
  it("renders unfilled heart by default", () => {
    render(<FavouriteButton filled={false} onToggle={() => {}} label="Favourite" />);
    const btn = screen.getByRole("button", { name: "Favourite" });
    expect(btn.style.color).toBe("var(--fg-muted)");
  });

  it("renders filled heart when filled is true", () => {
    render(<FavouriteButton filled={true} onToggle={() => {}} label="Favourite" />);
    const btn = screen.getByRole("button", { name: "Favourite" });
    expect(btn.style.color).toBe("var(--accent-favourite)");
  });

  it("calls onToggle on click", () => {
    const onToggle = vi.fn();
    render(<FavouriteButton filled={false} onToggle={onToggle} label="Favourite" />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("does not call onToggle when disabled", () => {
    const onToggle = vi.fn();
    render(<FavouriteButton filled={false} onToggle={onToggle} label="Favourite" disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("applies aria-pressed correctly", () => {
    const { rerender } = render(
      <FavouriteButton filled={false} onToggle={() => {}} label="Favourite" />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");

    rerender(<FavouriteButton filled={true} onToggle={() => {}} label="Favourite" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies correct size dimensions for each size variant", () => {
    const sizes = { sm: "var(--space-8)", md: "var(--space-10)", lg: "var(--space-12)" } as const;

    for (const [size, dim] of Object.entries(sizes)) {
      const { unmount } = render(
        <FavouriteButton
          filled={false}
          onToggle={() => {}}
          label="Favourite"
          size={size as "sm" | "md" | "lg"}
        />,
      );
      const btn = screen.getByRole("button");
      expect(btn.style.width).toBe(dim);
      expect(btn.style.height).toBe(dim);
      unmount();
    }
  });

  it("applies disabled opacity", () => {
    render(<FavouriteButton filled={false} onToggle={() => {}} label="Favourite" disabled />);
    const btn = screen.getByRole("button");
    expect(btn.style.opacity).toBe("0.5");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<FavouriteButton ref={ref} filled={false} onToggle={() => {}} label="Favourite" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
