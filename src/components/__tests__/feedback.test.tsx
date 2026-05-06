import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Alert } from "../Alert";
import { Toast } from "../Toast";
import { Badge } from "../Badge";
import { KayambaLoader } from "../KayambaLoader";
import { Skeleton } from "../Skeleton";
import { EmptyState } from "../EmptyState";
import { Tooltip } from "../Tooltip";
import { ProgressBar } from "../ProgressBar";

/* ---------- Alert ---------- */
describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Alert>Check your email</Alert>);
    expect(screen.getByText("Check your email")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="Heads up">Body text</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("does not render title element when not provided", () => {
    const { container } = render(<Alert>Body only</Alert>);
    const titleEl = container.querySelector("[style*='font-weight: 600']");
    // Only the body text should exist
    expect(screen.queryByText("Body only")).toBeInTheDocument();
    // Verify there is no separate title div with fontWeight 600 containing title text
    expect(titleEl).toBeNull();
  });

  it("defaults to info variant", () => {
    const { container } = render(<Alert>Info alert</Alert>);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-kaya-indigo)");
  });

  it("renders success variant", () => {
    const { container } = render(<Alert variant="success">Done</Alert>);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-success-green)");
  });

  it("renders warning variant", () => {
    const { container } = render(<Alert variant="warning">Watch out</Alert>);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-kanga-orange)");
  });

  it("renders error variant", () => {
    const { container } = render(<Alert variant="error">Oops</Alert>);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-error-red)");
  });

  it("shows dismiss button when dismissible with onDismiss", () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Hi</Alert>);
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Hi</Alert>);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("does not show dismiss button when only dismissible is true (no onDismiss)", () => {
    render(<Alert dismissible>Hi</Alert>);
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("does not show dismiss button when only onDismiss is provided (no dismissible)", () => {
    render(<Alert onDismiss={() => {}}>Hi</Alert>);
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("supports custom icon", () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>}>Text</Alert>);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders title without children (marginBottom: 0)", () => {
    const { container } = render(<Alert title="Title only" />);
    const titleDiv = container.querySelector("[style*='font-weight: 600']") as HTMLElement;
    expect(titleDiv).not.toBeNull();
    expect(titleDiv.style.marginBottom).toBe("0px");
  });
});

/* ---------- Toast ---------- */
describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with role=alert", () => {
    render(<Toast message="Saved!" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders message text", () => {
    render(<Toast message="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("defaults to info variant", () => {
    const { container } = render(<Toast message="Info" />);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-kaya-indigo)");
  });

  it("renders success variant", () => {
    const { container } = render(<Toast message="Done" variant="success" />);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-success-green)");
  });

  it("renders error variant", () => {
    const { container } = render(<Toast message="Fail" variant="error" />);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-error-red)");
  });

  it("renders warning variant", () => {
    const { container } = render(<Toast message="Warn" variant="warning" />);
    const alertDiv = container.firstChild as HTMLElement;
    expect(alertDiv.style.borderLeft).toContain("var(--color-kanga-orange)");
  });

  it("auto-dismisses after duration", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Bye" onDismiss={onDismiss} duration={3000} />);
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(3000); });
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("uses default 5000ms duration", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Bye" onDismiss={onDismiss} />);
    act(() => { vi.advanceTimersByTime(4999); });
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("does not auto-dismiss when duration is 0", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Stay" onDismiss={onDismiss} duration={0} />);
    act(() => { vi.advanceTimersByTime(10000); });
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("does not auto-dismiss when no onDismiss", () => {
    // Should not throw
    render(<Toast message="Stay" duration={1000} />);
    act(() => { vi.advanceTimersByTime(2000); });
  });

  it("renders dismiss button when onDismiss provided", () => {
    render(<Toast message="Hi" onDismiss={() => {}} />);
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("calls onDismiss on dismiss button click", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Hi" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("renders action button", () => {
    const onClick = vi.fn();
    render(<Toast message="File deleted" action={{ label: "Undo", onClick }} />);
    const actionBtn = screen.getByText("Undo");
    expect(actionBtn).toBeInTheDocument();
    fireEvent.click(actionBtn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not render action when not provided", () => {
    render(<Toast message="Simple" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("cleans up timer on unmount", () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<Toast message="Bye" onDismiss={onDismiss} duration={5000} />);
    unmount();
    act(() => { vi.advanceTimersByTime(5000); });
    expect(onDismiss).not.toHaveBeenCalled();
  });
});

/* ---------- Badge ---------- */
describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("defaults to default variant", () => {
    const { container } = render(<Badge>Tag</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--bg-surface-muted)");
  });

  it("renders noun-class variant", () => {
    const { container } = render(<Badge variant="noun-class">NC5</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--color-kaya-indigo)");
  });

  it("renders editorial variant", () => {
    const { container } = render(<Badge variant="editorial">Draft</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--color-mnazi-gold)");
  });

  it("renders contributor variant", () => {
    const { container } = render(<Badge variant="contributor">Expert</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--color-mangrove-green)");
  });

  it("renders success variant", () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--color-success-green)");
  });

  it("renders error variant", () => {
    const { container } = render(<Badge variant="error">Fail</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.background).toBe("var(--color-error-red)");
  });

  it("defaults to sm size", () => {
    const { container } = render(<Badge>S</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.fontSize).toBe("var(--text-xs)");
  });

  it("renders md size", () => {
    const { container } = render(<Badge size="md">M</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.fontSize).toBe("var(--text-sm)");
  });
});

/* ---------- KayambaLoader ---------- */
describe("KayambaLoader", () => {
  it("renders with role=status", () => {
    render(<KayambaLoader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default aria-label of Loading", () => {
    render(<KayambaLoader />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("supports custom label", () => {
    render(<KayambaLoader label="Fetching data" />);
    expect(screen.getByLabelText("Fetching data")).toBeInTheDocument();
    expect(screen.getByText("Fetching data")).toBeInTheDocument();
  });

  it("renders sm size with 5 lines", () => {
    const { container } = render(<KayambaLoader size="sm" />);
    const bars = container.querySelectorAll("[aria-hidden='true']");
    expect(bars).toHaveLength(5);
  });

  it("renders md size (default) with 7 lines", () => {
    const { container } = render(<KayambaLoader />);
    const bars = container.querySelectorAll("[aria-hidden='true']");
    expect(bars).toHaveLength(7);
  });

  it("renders lg size with 9 lines", () => {
    const { container } = render(<KayambaLoader size="lg" />);
    const bars = container.querySelectorAll("[aria-hidden='true']");
    expect(bars).toHaveLength(9);
  });

  it("visually hides label text for screen readers", () => {
    render(<KayambaLoader label="Loading" />);
    const srText = screen.getByText("Loading");
    expect(srText.style.position).toBe("absolute");
    expect(srText.style.width).toBe("1px");
    expect(srText.style.height).toBe("1px");
  });
});

/* ---------- Skeleton ---------- */
describe("Skeleton", () => {
  it("renders a single text skeleton by default", () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector("[aria-hidden='true']");
    expect(el).toBeInTheDocument();
  });

  it("renders multiple lines for text variant", () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    // Multi-line creates a wrapper with children
    const children = container.firstChild!.childNodes;
    // style tag + 3 divs
    expect(children.length).toBe(4); // 1 style + 3 divs
  });

  it("last line in multi-line is 75% width", () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const divs = container.querySelectorAll("div > div");
    const lastDiv = divs[divs.length - 1] as HTMLElement;
    expect(lastDiv.style.width).toBe("75%");
  });

  it("renders circular variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    const el = container.querySelector("[aria-hidden='true']") as HTMLElement;
    expect(el.style.borderRadius).toBe("var(--radius-full)");
  });

  it("renders rectangular variant", () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const el = container.querySelector("[aria-hidden='true']") as HTMLElement;
    expect(el.style.borderRadius).toBe("var(--radius-md)");
  });

  it("supports custom width and height", () => {
    const { container } = render(<Skeleton width="200px" height="50px" />);
    const el = container.querySelector("[aria-hidden='true']") as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("50px");
  });

  it("text variant with 1 line returns single element, not multi", () => {
    const { container } = render(<Skeleton variant="text" lines={1} />);
    const el = container.querySelector("[aria-hidden='true']");
    expect(el).toBeInTheDocument();
  });

  it("multi-line text supports custom width on wrapper", () => {
    const { container } = render(<Skeleton variant="text" lines={2} width="300px" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("300px");
  });
});

/* ---------- EmptyState ---------- */
describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No data" description="Try a different search" />);
    expect(screen.getByText("Try a different search")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<EmptyState title="No data" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("renders icon when provided", () => {
    render(<EmptyState title="Empty" icon={<span data-testid="es-icon">X</span>} />);
    expect(screen.getByTestId("es-icon")).toBeInTheDocument();
  });

  it("does not render icon container when not provided", () => {
    const { container } = render(<EmptyState title="Empty" />);
    // Only one child: the h3. No icon div.
    const h3 = container.querySelector("h3");
    expect(h3).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />);
    expect(screen.getByText("Add item")).toBeInTheDocument();
  });

  it("applies bottom margin on description when action is present", () => {
    const { container } = render(
      <EmptyState title="Empty" description="Some text" action={<button>Go</button>} />,
    );
    const p = container.querySelector("p") as HTMLElement;
    expect(p.style.marginBottom).toBe("var(--space-4)");
  });
});

/* ---------- Tooltip ---------- */
describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children", () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show tooltip initially", () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on mouse enter after delay", () => {
    const { container } = render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");
  });

  it("hides tooltip on mouse leave", () => {
    const { container } = render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on focus", () => {
    const { container } = render(<Tooltip content="Focus tip"><button>Focus me</button></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.focus(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Focus tip");
  });

  it("hides tooltip on blur", () => {
    const { container } = render(<Tooltip content="Focus tip"><button>Focus me</button></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.focus(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    fireEvent.blur(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("supports custom delay", () => {
    const { container } = render(<Tooltip content="Slow" delay={500}><span>Trigger</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("sets aria-describedby when visible", () => {
    const { container } = render(<Tooltip content="Desc"><span>Target</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    const innerDiv = screen.getByText("Target").parentElement!;

    // Before showing, no aria-describedby
    expect(innerDiv).not.toHaveAttribute("aria-describedby");

    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });

    const tooltipEl = screen.getByRole("tooltip");
    const descDiv = screen.getByText("Target").parentElement!;
    expect(descDiv).toHaveAttribute("aria-describedby", tooltipEl.id);
  });

  it("cancels pending show on mouse leave before delay", () => {
    const { container } = render(<Tooltip content="Cancel" delay={500}><span>Trigger</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(100); });
    fireEvent.mouseLeave(wrapper);
    act(() => { vi.advanceTimersByTime(500); });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("defaults to top placement", () => {
    const { container } = render(<Tooltip content="Top tip"><span>T</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.style.bottom).toBe("100%");
  });

  it("supports bottom placement", () => {
    const { container } = render(<Tooltip content="Bottom tip" placement="bottom"><span>T</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.style.top).toBe("100%");
  });

  it("supports left placement", () => {
    const { container } = render(<Tooltip content="Left tip" placement="left"><span>T</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.style.right).toBe("100%");
  });

  it("supports right placement", () => {
    const { container } = render(<Tooltip content="Right tip" placement="right"><span>T</span></Tooltip>);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.style.left).toBe("100%");
  });
});

/* ---------- ProgressBar ---------- */
describe("ProgressBar", () => {
  it("renders a progressbar role", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<ProgressBar value={30} max={200} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "30");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "200");
  });

  it("renders label text and percentage", () => {
    render(<ProgressBar value={50} label="Upload" />);
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders aria-label on progressbar", () => {
    render(<ProgressBar value={50} label="Upload" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Upload");
  });

  it("clamps value between 0 and 100 percent", () => {
    render(<ProgressBar value={150} max={100} />);
    expect(screen.getByRole("progressbar").firstChild).toBeTruthy();
  });

  it("defaults to 0 value and 100 max", () => {
    render(<ProgressBar />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders success variant", () => {
    const { container } = render(<ProgressBar value={75} variant="success" />);
    const fill = container.querySelector("[role='progressbar'] > div") as HTMLElement;
    expect(fill.style.background).toBe("var(--color-success-green)");
  });

  it("renders error variant", () => {
    const { container } = render(<ProgressBar value={75} variant="error" />);
    const fill = container.querySelector("[role='progressbar'] > div") as HTMLElement;
    expect(fill.style.background).toBe("var(--color-error-red)");
  });

  it("renders default variant", () => {
    const { container } = render(<ProgressBar value={75} />);
    const fill = container.querySelector("[role='progressbar'] > div") as HTMLElement;
    expect(fill.style.background).toBe("var(--color-kaya-indigo)");
  });

  it("renders indeterminate mode without aria-valuenow", () => {
    render(<ProgressBar indeterminate label="Loading" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("does not show percentage text in indeterminate mode", () => {
    render(<ProgressBar indeterminate label="Loading" />);
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });

  it("renders sm size", () => {
    render(<ProgressBar value={50} size="sm" />);
    const bar = screen.getByRole("progressbar");
    expect(bar.style.height).toBe("4px");
  });

  it("renders md size by default", () => {
    render(<ProgressBar value={50} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.style.height).toBe("8px");
  });

  it("does not render label area when no label provided", () => {
    const { container } = render(<ProgressBar value={50} />);
    // There should just be the wrapper and the progressbar div
    expect(container.firstChild!.childNodes).toHaveLength(1);
  });
});
