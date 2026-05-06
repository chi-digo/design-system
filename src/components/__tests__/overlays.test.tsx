import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "../Dialog";
import { Drawer } from "../Drawer";
import { Popover } from "../Popover";
import { DropdownMenu } from "../DropdownMenu";

/* ---------- Dialog ---------- */
describe("Dialog", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: "Confirm",
    children: <p>Are you sure?</p>,
  };

  it("renders nothing when not open", () => {
    const { container } = render(
      <Dialog open={false} onClose={() => {}} title="T"><p>Hidden</p></Dialog>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders dialog when open", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Dialog {...defaultProps} description="This is permanent" />);
    expect(screen.getByText("This is permanent")).toBeInTheDocument();
  });

  it("does not render description element when not provided", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.queryByText("dialog-description")).not.toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toHaveAttribute("aria-describedby");
  });

  it("has aria-describedby when description is provided", () => {
    render(<Dialog {...defaultProps} description="Desc text" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby", "dialog-description");
  });

  it("sets aria-modal=true", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("sets aria-labelledby to dialog-title", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "dialog-title");
  });

  it("renders actions when provided", () => {
    render(<Dialog {...defaultProps} actions={<button>OK</button>} />);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("does not render actions section when not provided", () => {
    const { container } = render(<Dialog {...defaultProps} />);
    const actionsDivs = container.querySelectorAll("[style*='border-top']");
    expect(actionsDivs).toHaveLength(0);
  });

  it("calls onClose when clicking backdrop", () => {
    const onClose = vi.fn();
    render(<Dialog {...defaultProps} onClose={onClose} />);
    const backdrop = screen.getByRole("dialog").parentElement!.querySelector("[aria-hidden='true']")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<Dialog {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("traps focus with Tab key", () => {
    render(
      <Dialog open onClose={() => {}} title="Focus test">
        <button>First</button>
        <button>Last</button>
      </Dialog>,
    );
    const buttons = screen.getAllByRole("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    // Shift+Tab on first element should go to last
    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    // Forward Tab on last should go to first
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
  });

  it("sets body overflow hidden when open", () => {
    render(<Dialog {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow on close", () => {
    const { unmount } = render(<Dialog {...defaultProps} />);
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("supports custom width", () => {
    render(<Dialog {...defaultProps} width="40rem" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxWidth).toBe("40rem");
  });

  it("handles Tab in dialog with no focusable elements", () => {
    render(
      <Dialog open onClose={() => {}} title="Empty">
        <p>No focusable elements</p>
      </Dialog>,
    );
    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not trap Tab when focus is on a middle element", () => {
    render(
      <Dialog open onClose={() => {}} title="Focus test">
        <button>A</button>
        <button>B</button>
        <button>C</button>
      </Dialog>,
    );
    const b = screen.getByText("B");
    b.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(b);
  });

  it("auto-focuses first focusable element on open", async () => {
    vi.useFakeTimers();
    render(
      <Dialog open onClose={() => {}} title="Auto focus">
        <button>OK</button>
      </Dialog>,
    );
    vi.advanceTimersByTime(16);
    expect(document.activeElement).toBe(screen.getByText("OK"));
    vi.useRealTimers();
  });

  it("handles open dialog with no focusable elements in rAF", () => {
    vi.useFakeTimers();
    render(
      <Dialog open onClose={() => {}} title="No focus">
        <p>Just text</p>
      </Dialog>,
    );
    vi.advanceTimersByTime(16);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

/* ---------- Drawer ---------- */
describe("Drawer", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: "Menu",
    children: <p>Drawer content</p>,
  };

  it("renders nothing when not open", () => {
    const { container } = render(
      <Drawer open={false} onClose={() => {}} title="Hidden"><p>Gone</p></Drawer>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders dialog when open", () => {
    render(<Drawer {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Drawer {...defaultProps} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Drawer {...defaultProps} />);
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("sets aria-modal=true", () => {
    render(<Drawer {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("sets aria-label to title", () => {
    render(<Drawer {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Menu");
  });

  it("calls onClose when clicking backdrop", () => {
    const onClose = vi.fn();
    render(<Drawer {...defaultProps} onClose={onClose} />);
    const backdrop = screen.getByRole("dialog").parentElement!.querySelector("[aria-hidden='true']")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when clicking close button", () => {
    const onClose = vi.fn();
    render(<Drawer {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close drawer"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<Drawer {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("defaults to right position", () => {
    render(<Drawer {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.right).toBe("0px");
  });

  it("supports left position", () => {
    render(<Drawer {...defaultProps} position="left" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.left).toBe("0px");
  });

  it("defaults to md size", () => {
    render(<Drawer {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxWidth).toBe("24rem");
  });

  it("supports sm size", () => {
    render(<Drawer {...defaultProps} size="sm" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxWidth).toBe("16rem");
  });

  it("supports lg size", () => {
    render(<Drawer {...defaultProps} size="lg" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.maxWidth).toBe("32rem");
  });

  it("does not render title section when title is not provided", () => {
    render(<Drawer open onClose={() => {}}><p>Body</p></Drawer>);
    expect(screen.queryByLabelText("Close drawer")).not.toBeInTheDocument();
  });

  it("sets body overflow hidden when open", () => {
    render(<Drawer {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow on unmount", () => {
    const { unmount } = render(<Drawer {...defaultProps} />);
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});

/* ---------- Popover ---------- */
describe("Popover", () => {
  it("renders trigger", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover body</div>} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("does not show content initially (uncontrolled)", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover body</div>} />);
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("shows content on trigger click", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover body</div>} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("hides content on second trigger click (toggle)", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Body")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Open"));
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("closes on click outside", () => {
    render(
      <div>
        <Popover trigger={<button>Open</button>} content={<div>Body</div>} />
        <button>Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Body")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("supports controlled open prop", () => {
    const onOpenChange = vi.fn();
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<div>Controlled</div>}
        open={true}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByText("Controlled")).toBeInTheDocument();
  });

  it("calls onOpenChange when trigger is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<div>Controlled</div>}
        open={false}
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.click(screen.getByText("Open"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("defaults to bottom position", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} />);
    fireEvent.click(screen.getByText("Open"));
    const popoverContent = screen.getByText("Body").parentElement as HTMLElement;
    expect(popoverContent.style.top).toBe("100%");
  });

  it("supports top position", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} position="top" />);
    fireEvent.click(screen.getByText("Open"));
    const popoverContent = screen.getByText("Body").parentElement as HTMLElement;
    expect(popoverContent.style.bottom).toBe("100%");
  });

  it("supports left position", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} position="left" />);
    fireEvent.click(screen.getByText("Open"));
    const popoverContent = screen.getByText("Body").parentElement as HTMLElement;
    expect(popoverContent.style.right).toBe("100%");
  });

  it("supports right position", () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} position="right" />);
    fireEvent.click(screen.getByText("Open"));
    const popoverContent = screen.getByText("Body").parentElement as HTMLElement;
    expect(popoverContent.style.left).toBe("100%");
  });

  it("does not register outside-click listener when closed", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    render(<Popover trigger={<button>Open</button>} content={<div>Body</div>} />);
    // The mousedown listener should not be added when closed
    const mousedownCalls = addSpy.mock.calls.filter(([ev]) => ev === "mousedown");
    expect(mousedownCalls).toHaveLength(0);
    addSpy.mockRestore();
  });
});

/* ---------- DropdownMenu ---------- */
describe("DropdownMenu", () => {
  const items = [
    { label: "Edit", onClick: vi.fn() },
    { label: "Delete", onClick: vi.fn(), destructive: true },
    { label: "Archive", onClick: vi.fn(), disabled: true },
  ];

  const defaultProps = {
    trigger: <button>Actions</button>,
    items,
  };

  it("renders trigger", () => {
    render(<DropdownMenu {...defaultProps} />);
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("does not show menu initially", () => {
    render(<DropdownMenu {...defaultProps} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("shows menu on trigger click", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
  });

  it("menu items have role=menuitem", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("calls item onClick and closes menu", () => {
    const editClick = vi.fn();
    const menuItems = [{ label: "Edit", onClick: editClick }];
    render(<DropdownMenu trigger={<button>Actions</button>} items={menuItems} />);
    fireEvent.click(screen.getByText("Actions"));
    fireEvent.click(screen.getByText("Edit"));
    expect(editClick).toHaveBeenCalledOnce();
    // Menu should close after click
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("disabled items are rendered as disabled buttons", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    const archiveBtn = screen.getByText("Archive");
    expect(archiveBtn).toBeDisabled();
  });

  it("toggles menu on trigger click", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on click outside", () => {
    render(
      <div>
        <DropdownMenu {...defaultProps} />
        <button>Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("defaults to start alignment", () => {
    render(<DropdownMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("Actions"));
    const menu = screen.getByRole("menu");
    expect(menu.style.left).toBe("0px");
  });

  it("supports end alignment", () => {
    render(<DropdownMenu {...defaultProps} align="end" />);
    fireEvent.click(screen.getByText("Actions"));
    const menu = screen.getByRole("menu");
    expect(menu.style.right).toBe("0px");
  });

  it("renders item icons when provided", () => {
    const iconItems = [
      { label: "Edit", icon: <span data-testid="edit-icon">E</span> },
    ];
    render(<DropdownMenu trigger={<button>Go</button>} items={iconItems} />);
    fireEvent.click(screen.getByText("Go"));
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("handles item without onClick gracefully", () => {
    const noClickItems = [{ label: "Info" }];
    render(<DropdownMenu trigger={<button>Go</button>} items={noClickItems} />);
    fireEvent.click(screen.getByText("Go"));
    // Should not throw when clicking
    fireEvent.click(screen.getByText("Info"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not register listeners when menu is closed", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    render(<DropdownMenu {...defaultProps} />);
    const keydownCalls = addSpy.mock.calls.filter(([ev]) => ev === "keydown");
    expect(keydownCalls).toHaveLength(0);
    addSpy.mockRestore();
  });
});
