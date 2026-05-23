import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BottomSheet } from "../BottomSheet";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeEach(() => {
  document.body.style.position = "";
  document.body.style.overflow = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
});

describe("BottomSheet", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: "Sheet Title",
    children: <p>Sheet content</p>,
  };

  it("always renders in the DOM regardless of open state", () => {
    const { container } = render(
      <BottomSheet open={false} onClose={() => {}} title="Hidden">
        <p>Content</p>
      </BottomSheet>,
    );
    expect(container.firstChild).not.toBeNull();
  });

  it("hides with aria-hidden when closed", () => {
    const { container } = render(
      <BottomSheet open={false} onClose={() => {}} title="Hidden">
        <p>Content</p>
      </BottomSheet>,
    );
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("sets aria-hidden=false when open", () => {
    const { container } = render(<BottomSheet {...defaultProps} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "false");
  });

  it("renders dialog role when open", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("sets aria-modal=true", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("sets aria-label from title", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Sheet Title");
  });

  it("renders title", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
  });

  it("does not render title heading when not provided", () => {
    render(
      <BottomSheet open onClose={() => {}}>
        <p>Body</p>
      </BottomSheet>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByText("Sheet content")).toBeInTheDocument();
  });

  it("calls onClose when clicking backdrop", () => {
    const onClose = vi.fn();
    render(<BottomSheet {...defaultProps} onClose={onClose} />);
    const backdrop = screen
      .getByRole("dialog")
      .parentElement!.querySelector("[aria-hidden='true']")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<BottomSheet {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("traps focus with Tab key", () => {
    render(
      <BottomSheet open onClose={() => {}} title="Focus test">
        <button>First</button>
        <button>Last</button>
      </BottomSheet>,
    );
    const buttons = screen.getAllByRole("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
  });

  it("locks body scroll when open", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll on close", () => {
    const { rerender } = render(<BottomSheet {...defaultProps} />);
    expect(document.body.style.position).toBe("fixed");
    rerender(<BottomSheet {...defaultProps} open={false} />);
    expect(document.body.style.position).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("restores body scroll on unmount", () => {
    const { unmount } = render(<BottomSheet {...defaultProps} />);
    unmount();
    expect(document.body.style.position).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("defaults to content size", () => {
    render(<BottomSheet {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxHeight).toBe("85vh");
  });

  it("supports half size", () => {
    render(<BottomSheet {...defaultProps} size="half" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxHeight).toBe("50vh");
  });

  it("supports full size", () => {
    render(<BottomSheet {...defaultProps} size="full" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxHeight).toBe("90vh");
  });

  it("caps width at 480px", () => {
    render(<BottomSheet {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxWidth).toBe("480px");
  });

  it("renders drag handle", () => {
    const { container } = render(<BottomSheet {...defaultProps} />);
    const handle = container.querySelector(
      "[style*='width: 32px'][style*='height: 4px']",
    );
    expect(handle).toBeInTheDocument();
  });

  it("auto-focuses first focusable element on open", () => {
    vi.useFakeTimers();
    render(
      <BottomSheet open onClose={() => {}} title="Auto focus">
        <button>OK</button>
      </BottomSheet>,
    );
    vi.advanceTimersByTime(16);
    expect(document.activeElement).toBe(screen.getByText("OK"));
    vi.useRealTimers();
  });

  it("sets visibility hidden on sheet when closed", () => {
    render(
      <BottomSheet open={false} onClose={() => {}} title="Hidden">
        <p>Content</p>
      </BottomSheet>,
    );
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog.style.visibility).toBe("hidden");
  });

  it("sets visibility visible on sheet when open", () => {
    render(<BottomSheet {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.visibility).toBe("visible");
  });

  it("handles Tab with no focusable elements", () => {
    render(
      <BottomSheet open onClose={() => {}} title="Empty">
        <p>No focusable elements</p>
      </BottomSheet>,
    );
    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
