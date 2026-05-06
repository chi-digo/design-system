import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll } from "vitest";

import { TextField } from "../TextField";
import { TextArea } from "../TextArea";
import { SearchField } from "../SearchField";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { RadioGroup } from "../RadioGroup";
import { Switch } from "../Switch";
import { LanguageSelector } from "../LanguageSelector";
import { Form } from "../Form";

// jsdom does not implement scrollIntoView
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// ---------------------------------------------------------------------------
// TextField
// ---------------------------------------------------------------------------
describe("TextField", () => {
  it("renders with label", () => {
    render(<TextField label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name").tagName).toBe("INPUT");
  });

  it("associates label via htmlFor/id when id is provided", () => {
    render(<TextField label="Email" id="email-input" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email-input");
  });

  it("generates an id when none is provided", () => {
    render(<TextField label="Auto" />);
    const input = screen.getByLabelText("Auto");
    expect(input.id).toBeTruthy();
  });

  it("shows helper text and links via aria-describedby", () => {
    render(<TextField label="Password" helperText="Must be 8+ chars" />);
    expect(screen.getByText("Must be 8+ chars")).toBeInTheDocument();
    const input = screen.getByLabelText("Password");
    const helperId = input.getAttribute("aria-describedby");
    expect(helperId).toBeTruthy();
    expect(document.getElementById(helperId!)).toHaveTextContent("Must be 8+ chars");
  });

  it("shows error, sets aria-invalid, and role=alert", () => {
    render(<TextField label="Username" error="Required" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Required");
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toBe(alert.id);
  });

  it("error takes precedence over helperText", () => {
    render(<TextField label="Field" helperText="Hint" error="Bad" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Bad");
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("has aria-invalid=false when no error", () => {
    render(<TextField label="Clean" />);
    expect(screen.getByLabelText("Clean")).toHaveAttribute("aria-invalid", "false");
  });

  it("renders without helperText or error (empty span placeholder)", () => {
    render(<TextField label="Plain" />);
    expect(screen.getByLabelText("Plain")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<TextField label="Locked" disabled />);
    expect(screen.getByLabelText("Locked")).toBeDisabled();
  });

  it("fires onChange on typing", async () => {
    const onChange = vi.fn();
    render(<TextField label="Type" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Type"), "hi");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("shows character counter when maxCharacters is set", () => {
    render(<TextField label="Bio" maxCharacters={100} currentLength={42} />);
    expect(screen.getByText("42/100")).toBeInTheDocument();
  });

  it("defaults currentLength to 0 when omitted", () => {
    render(<TextField label="Bio" maxCharacters={50} />);
    expect(screen.getByText("0/50")).toBeInTheDocument();
  });

  it("does not render counter when maxCharacters is undefined", () => {
    render(<TextField label="No counter" />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  it("shows error color when currentLength exceeds maxCharacters", () => {
    render(<TextField label="Bio" maxCharacters={10} currentLength={15} />);
    const counter = screen.getByText("15/10");
    expect(counter.style.color).toBe("var(--color-error-red)");
  });

  it("passes through style prop", () => {
    const { container } = render(<TextField label="Styled" style={{ marginTop: "8px" }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: "8px" });
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<TextField label="Ref" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});

// ---------------------------------------------------------------------------
// TextArea
// ---------------------------------------------------------------------------
describe("TextArea", () => {
  it("renders a textarea with label", () => {
    render(<TextArea label="Description" />);
    const ta = screen.getByLabelText("Description");
    expect(ta.tagName).toBe("TEXTAREA");
  });

  it("defaults to 4 rows", () => {
    render(<TextArea label="Notes" />);
    expect(screen.getByLabelText("Notes")).toHaveAttribute("rows", "4");
  });

  it("accepts custom rows", () => {
    render(<TextArea label="Notes" rows={8} />);
    expect(screen.getByLabelText("Notes")).toHaveAttribute("rows", "8");
  });

  it("shows helper text linked via aria-describedby", () => {
    render(<TextArea label="Comment" helperText="Be kind" />);
    const ta = screen.getByLabelText("Comment");
    const id = ta.getAttribute("aria-describedby")!;
    expect(document.getElementById(id)).toHaveTextContent("Be kind");
  });

  it("shows error with role=alert and aria-invalid", () => {
    render(<TextArea label="Body" error="Too short" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Too short");
    expect(screen.getByLabelText("Body")).toHaveAttribute("aria-invalid", "true");
  });

  it("error takes precedence over helperText", () => {
    render(<TextArea label="F" helperText="H" error="E" />);
    expect(screen.getByRole("alert")).toHaveTextContent("E");
    expect(screen.queryByText("H")).not.toBeInTheDocument();
  });

  it("renders without helper or error", () => {
    render(<TextArea label="Plain" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has aria-invalid=false when no error", () => {
    render(<TextArea label="Ok" />);
    expect(screen.getByLabelText("Ok")).toHaveAttribute("aria-invalid", "false");
  });

  it("supports disabled", () => {
    render(<TextArea label="Locked" disabled />);
    expect(screen.getByLabelText("Locked")).toBeDisabled();
  });

  it("fires onChange", async () => {
    const onChange = vi.fn();
    render(<TextArea label="Type" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Type"), "ab");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("shows character counter", () => {
    render(<TextArea label="Bio" maxCharacters={200} currentLength={150} />);
    expect(screen.getByText("150/200")).toBeInTheDocument();
  });

  it("defaults currentLength to 0", () => {
    render(<TextArea label="Bio" maxCharacters={200} />);
    expect(screen.getByText("0/200")).toBeInTheDocument();
  });

  it("does not render counter when maxCharacters is undefined", () => {
    render(<TextArea label="No counter" />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  it("shows error color when currentLength exceeds maxCharacters", () => {
    render(<TextArea label="Bio" maxCharacters={10} currentLength={15} />);
    const counter = screen.getByText("15/10");
    expect(counter.style.color).toBe("var(--color-error-red)");
  });

  it("uses custom id", () => {
    render(<TextArea label="Id" id="my-ta" />);
    expect(screen.getByLabelText("Id")).toHaveAttribute("id", "my-ta");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<TextArea label="Ref" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  it("passes style prop", () => {
    const { container } = render(<TextArea label="S" style={{ width: "300px" }} />);
    expect(container.firstChild).toHaveStyle({ width: "300px" });
  });
});

// ---------------------------------------------------------------------------
// SearchField
// ---------------------------------------------------------------------------
describe("SearchField", () => {
  it("renders a search input", () => {
    render(<SearchField />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("uses placeholder as aria-label when no label", () => {
    render(<SearchField placeholder="Find items" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-label", "Find items");
  });

  it("defaults placeholder to 'Search...'", () => {
    render(<SearchField />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("placeholder", "Search…");
  });

  it("renders label when provided", () => {
    render(<SearchField label="Search users" />);
    expect(screen.getByText("Search users")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-label", "Search users");
  });

  it("associates label with input via htmlFor", () => {
    render(<SearchField label="Find" id="my-search" />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("id", "my-search");
    expect(screen.getByText("Find").tagName).toBe("LABEL");
  });

  it("shows clear button when value and onClear are provided", () => {
    const onClear = vi.fn();
    render(<SearchField value="test" onClear={onClear} />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("does not show clear button when value is empty", () => {
    render(<SearchField value="" onClear={vi.fn()} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("does not show clear button when onClear is missing", () => {
    render(<SearchField value="abc" />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("renders custom iconLeft", () => {
    render(<SearchField iconLeft={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("fires onChange on typing", async () => {
    const onChange = vi.fn();
    render(<SearchField onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "q");
    expect(onChange).toHaveBeenCalled();
  });

  it("supports disabled state", () => {
    render(<SearchField disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<SearchField ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("generates auto id when none is provided", () => {
    render(<SearchField label="Auto" />);
    expect(screen.getByRole("searchbox").id).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------
describe("Select", () => {
  const options = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
    { value: "c", label: "Gamma", disabled: true },
  ];

  it("renders with label and placeholder", () => {
    render(<Select label="Pick" options={options} />);
    expect(screen.getByText("Pick")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent("Select…");
  });

  it("shows custom placeholder", () => {
    render(<Select label="Pick" options={options} placeholder="Choose one" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Choose one");
  });

  it("shows selected value label", () => {
    render(<Select label="Pick" options={options} value="b" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Beta");
  });

  it("opens dropdown on click and shows options", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("closes dropdown on second click", () => {
    render(<Select label="Pick" options={options} />);
    const btn = screen.getByRole("combobox");
    fireEvent.click(btn);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option on click and calls onChange", () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByText("Beta"));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("works as uncontrolled when onChange is not provided", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByText("Alpha"));
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
  });

  it("does not select a disabled option on click", () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByText("Gamma"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("marks disabled options with aria-disabled", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts[2]).toHaveAttribute("aria-disabled", "true");
  });

  it("shows helperText", () => {
    render(<Select label="Pick" options={options} helperText="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
    const btn = screen.getByRole("combobox");
    const describedBy = btn.getAttribute("aria-describedby")!;
    expect(document.getElementById(describedBy)).toHaveTextContent("Pick one");
  });

  it("shows error with role=alert and aria-invalid", () => {
    render(<Select label="Pick" options={options} error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("error takes precedence over helperText", () => {
    render(<Select label="Pick" options={options} helperText="Hint" error="Oops" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Oops");
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("has aria-invalid=false when no error", () => {
    render(<Select label="Pick" options={options} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "false");
  });

  it("renders no helperText or error", () => {
    render(<Select label="Pick" options={options} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Select label="Pick" options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders hidden input with name", () => {
    const { container } = render(<Select label="Pick" options={options} name="fruit" value="a" />);
    const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hidden).toHaveAttribute("name", "fruit");
    expect(hidden).toHaveValue("a");
  });

  it("does not render hidden input without name", () => {
    const { container } = render(<Select label="Pick" options={options} />);
    expect(container.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
  });

  // Keyboard navigation
  it("opens on ArrowDown key when closed", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens on ArrowUp key when closed", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowUp" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens on Enter key when closed", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens on Space key when closed", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: " " });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("does nothing for other keys when closed", () => {
    render(<Select label="Pick" options={options} />);
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Tab" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("navigates down with ArrowDown, skipping disabled", async () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    // Open and wait for effects (useEffect sets focusIdx)
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowDown" }); }); // 0 -> 1 (Beta)
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowDown" }); }); // skips Gamma (disabled), stays at 1
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("navigates up with ArrowUp, skipping disabled", async () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} value="b" onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowUp" }); }); // 1 -> 0 (Alpha)
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("selects with Space key", async () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: " " }); });
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("closes on Escape", async () => {
    render(<Select label="Pick" options={options} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await act(async () => { fireEvent.keyDown(btn, { key: "Escape" }); });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("Home key moves focus to first option", async () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} value="b" onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Home" }); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("End key moves focus to last option", async () => {
    const onChange = vi.fn();
    // Last is Gamma (disabled), so Enter should not fire onChange
    render(<Select label="Pick" options={options} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "End" }); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); }); // Gamma is disabled, no select
    expect(onChange).not.toHaveBeenCalled();
  });

  it("closes on outside click", () => {
    render(
      <div>
        <Select label="Pick" options={options} />
        <button>Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders option groups", () => {
    const groupedOptions = [
      {
        label: "Fruits",
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ],
      },
      { value: "carrot", label: "Carrot" },
    ];
    render(<Select label="Food" options={groupedOptions} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("selects option within a group", () => {
    const onChange = vi.fn();
    const groupedOptions = [
      {
        label: "Group",
        options: [{ value: "x", label: "ItemX" }],
      },
    ];
    render(<Select label="G" options={groupedOptions} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.mouseDown(screen.getByText("ItemX"));
    expect(onChange).toHaveBeenCalledWith("x");
  });

  it("hover on grouped option updates focus", async () => {
    const groupedOptions = [
      {
        label: "Group",
        options: [
          { value: "x", label: "ItemX" },
          { value: "y", label: "ItemY" },
        ],
      },
    ];
    const onChange = vi.fn();
    render(<Select label="G" options={groupedOptions} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.mouseEnter(screen.getByText("ItemY")); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("y");
  });

  it("hover updates focus index", async () => {
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.mouseEnter(screen.getByText("Beta")); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("sets aria-expanded correctly", () => {
    render(<Select label="Pick" options={options} />);
    const btn = screen.getByRole("combobox");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("has combobox aria attributes", () => {
    render(<Select label="Pick" options={options} />);
    const btn = screen.getByRole("combobox");
    expect(btn).toHaveAttribute("aria-haspopup", "listbox");
    expect(btn).toHaveAttribute("aria-controls");
    expect(btn).toHaveAttribute("aria-labelledby");
  });

  it("ArrowDown does not go past the last item", async () => {
    const simpleOptions = [
      { value: "a", label: "A" },
      { value: "b", label: "B" },
    ];
    const onChange = vi.fn();
    render(<Select label="S" options={simpleOptions} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowDown" }); }); // -> 1
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowDown" }); }); // stays at 1
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("ArrowUp does not go past the first item", async () => {
    const onChange = vi.fn();
    render(<Select label="S" options={options} onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowUp" }); }); // stays at 0
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("ArrowUp skips disabled options above", async () => {
    const opts = [
      { value: "x", label: "X" },
      { value: "y", label: "Y", disabled: true },
      { value: "z", label: "Z" },
    ];
    const onChange = vi.fn();
    render(<Select label="S" options={opts} value="z" onChange={onChange} />);
    const btn = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(btn); });
    await act(async () => { fireEvent.keyDown(btn, { key: "ArrowUp" }); });
    await act(async () => { fireEvent.keyDown(btn, { key: "Enter" }); });
    expect(onChange).toHaveBeenCalledWith("x");
  });
});

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------
describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Agree" />);
    expect(screen.getByLabelText("Agree")).toBeInTheDocument();
    expect(screen.getByLabelText("Agree")).toHaveAttribute("type", "checkbox");
  });

  it("uses provided id", () => {
    render(<Checkbox label="Terms" id="terms-cb" />);
    expect(screen.getByLabelText("Terms")).toHaveAttribute("id", "terms-cb");
  });

  it("generates auto id", () => {
    render(<Checkbox label="Auto" />);
    expect(screen.getByLabelText("Auto").id).toBeTruthy();
  });

  it("fires onChange when clicked", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Check" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Check"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("supports checked state", () => {
    render(<Checkbox label="On" checked onChange={vi.fn()} />);
    expect(screen.getByLabelText("On")).toBeChecked();
  });

  it("supports disabled", () => {
    render(<Checkbox label="No" disabled />);
    expect(screen.getByLabelText("No")).toBeDisabled();
  });

  it("shows helpText with aria-describedby", () => {
    render(<Checkbox label="Sub" helpText="You will get emails" />);
    const cb = screen.getByLabelText("Sub");
    expect(screen.getByText("You will get emails")).toBeInTheDocument();
    const descId = cb.getAttribute("aria-describedby")!;
    expect(document.getElementById(descId)).toHaveTextContent("You will get emails");
  });

  it("no aria-describedby when no helpText", () => {
    render(<Checkbox label="Plain" />);
    expect(screen.getByLabelText("Plain")).not.toHaveAttribute("aria-describedby");
  });

  it("sets indeterminate property on the DOM element", () => {
    render(<Checkbox label="Partial" indeterminate />);
    const cb = screen.getByLabelText("Partial") as HTMLInputElement;
    expect(cb.indeterminate).toBe(true);
  });

  it("forwards ref via function", () => {
    const ref = vi.fn();
    render(<Checkbox label="Ref" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref via object", () => {
    const ref = { current: null };
    render(<Checkbox label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------
describe("RadioGroup", () => {
  const opts = [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large", disabled: true },
  ];

  it("renders fieldset with legend", () => {
    render(<RadioGroup label="Size" options={opts} />);
    expect(screen.getByText("Size").tagName).toBe("LEGEND");
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders all radio options", () => {
    render(<RadioGroup label="Size" options={opts} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("checks the radio matching value", () => {
    render(<RadioGroup label="Size" options={opts} value="m" />);
    expect(screen.getByLabelText("Medium")).toBeChecked();
    expect(screen.getByLabelText("Small")).not.toBeChecked();
  });

  it("fires onChange when a radio is selected", async () => {
    const onChange = vi.fn();
    render(<RadioGroup label="Size" options={opts} value="s" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Medium"));
    expect(onChange).toHaveBeenCalledWith("m");
  });

  it("disables individual options", () => {
    render(<RadioGroup label="Size" options={opts} />);
    expect(screen.getByLabelText("Large")).toBeDisabled();
  });

  it("uses provided name", () => {
    render(<RadioGroup label="Size" options={opts} name="sz" />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toHaveAttribute("name", "sz");
    });
  });

  it("generates name when not provided", () => {
    render(<RadioGroup label="Size" options={opts} />);
    const radios = screen.getAllByRole("radio");
    const name = radios[0].getAttribute("name");
    expect(name).toBeTruthy();
    radios.forEach((r) => expect(r).toHaveAttribute("name", name));
  });

  it("defaults to vertical orientation", () => {
    const { container } = render(<RadioGroup label="Size" options={opts} />);
    const group = container.querySelector('[role="radiogroup"]') as HTMLElement;
    expect(group.style.flexDirection).toBe("column");
  });

  it("supports horizontal orientation", () => {
    const { container } = render(<RadioGroup label="Size" options={opts} orientation="horizontal" />);
    const group = container.querySelector('[role="radiogroup"]') as HTMLElement;
    expect(group.style.flexDirection).toBe("row");
  });

  it("passes style prop to fieldset", () => {
    const { container } = render(<RadioGroup label="Size" options={opts} style={{ margin: "10px" }} />);
    expect(container.firstChild).toHaveStyle({ margin: "10px" });
  });
});

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------
describe("Switch", () => {
  it("renders with label", () => {
    render(<Switch label="Notify" />);
    expect(screen.getByText("Notify")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("uses provided id", () => {
    render(<Switch label="DM" id="dm-switch" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "dm-switch");
  });

  it("generates auto id", () => {
    render(<Switch label="Auto" />);
    expect(screen.getByRole("switch").id).toBeTruthy();
  });

  it("reflects checked state via aria-checked", () => {
    render(<Switch label="On" checked onChange={vi.fn()} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("reflects unchecked state", () => {
    render(<Switch label="Off" checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("fires onChange on click", async () => {
    const onChange = vi.fn();
    render(<Switch label="Toggle" onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled", () => {
    render(<Switch label="Locked" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders sm size", () => {
    const { container } = render(<Switch label="Small" size="sm" />);
    // sm: width 32, height 18
    const track = container.querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(track.style.width).toBe("32px");
    expect(track.style.height).toBe("18px");
  });

  it("renders md size by default", () => {
    const { container } = render(<Switch label="Med" />);
    const track = container.querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(track.style.width).toBe("44px");
    expect(track.style.height).toBe("24px");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Switch label="Ref" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("label wraps the switch (htmlFor)", () => {
    render(<Switch label="Wrap" id="wrap-sw" />);
    const label = screen.getByText("Wrap").closest("label");
    expect(label).toHaveAttribute("for", "wrap-sw");
  });
});

// ---------------------------------------------------------------------------
// LanguageSelector
// ---------------------------------------------------------------------------
describe("LanguageSelector", () => {
  describe("dropdown variant (default)", () => {
    it("renders a native select with all languages", () => {
      render(<LanguageSelector value="auto" onChange={vi.fn()} />);
      const sel = screen.getByLabelText("Language") as HTMLSelectElement;
      expect(sel.tagName).toBe("SELECT");
      expect(sel.options).toHaveLength(4);
    });

    it("shows selected value", () => {
      render(<LanguageSelector value="dig" onChange={vi.fn()} />);
      expect((screen.getByLabelText("Language") as HTMLSelectElement).value).toBe("dig");
    });

    it("calls onChange on selection", async () => {
      const onChange = vi.fn();
      render(<LanguageSelector value="en" onChange={onChange} />);
      await userEvent.selectOptions(screen.getByLabelText("Language"), "sw");
      expect(onChange).toHaveBeenCalledWith("sw");
    });

    it("has aria-label Language", () => {
      render(<LanguageSelector value="auto" onChange={vi.fn()} />);
      expect(screen.getByLabelText("Language")).toBeInTheDocument();
    });
  });

  describe("segmented variant", () => {
    it("renders radio buttons for dig, en, sw (no auto)", () => {
      render(<LanguageSelector value="dig" onChange={vi.fn()} variant="segmented" />);
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("marks selected language as checked", () => {
      render(<LanguageSelector value="en" onChange={vi.fn()} variant="segmented" />);
      expect(screen.getByRole("radio", { name: "English" })).toHaveAttribute("aria-checked", "true");
      expect(screen.getByRole("radio", { name: "Chidigo" })).toHaveAttribute("aria-checked", "false");
    });

    it("calls onChange when a segment is clicked", () => {
      const onChange = vi.fn();
      render(<LanguageSelector value="dig" onChange={onChange} variant="segmented" />);
      fireEvent.click(screen.getByRole("radio", { name: "Kiswahili" }));
      expect(onChange).toHaveBeenCalledWith("sw");
    });

    it("has radiogroup with aria-label", () => {
      render(<LanguageSelector value="dig" onChange={vi.fn()} variant="segmented" />);
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-label", "Language");
    });
  });
});

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------
describe("Form", () => {
  const getForm = (container: HTMLElement) => container.querySelector("form")!;

  it("renders children", () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <input name="x" defaultValue="1" />
      </Form>,
    );
    expect(getForm(container)).toBeInTheDocument();
  });

  it("renders children as function receiving idle status", () => {
    render(
      <Form onSubmit={vi.fn()}>
        {(status) => <span>Status: {status}</span>}
      </Form>,
    );
    expect(screen.getByText("Status: idle")).toBeInTheDocument();
  });

  it("prevents default form submission", async () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Go</button>
      </Form>,
    );
    fireEvent.submit(getForm(container));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith(expect.any(FormData));
  });

  it("transitions to submitting then success", async () => {
    let resolve!: () => void;
    const promise = new Promise<void>((r) => { resolve = r; });
    const onSubmit = vi.fn(() => promise);
    const statusLog: string[] = [];

    const { container } = render(
      <Form onSubmit={onSubmit}>
        {(status) => {
          statusLog.push(status);
          return <button type="submit">Go</button>;
        }}
      </Form>,
    );

    fireEvent.submit(getForm(container));
    await waitFor(() => expect(statusLog).toContain("submitting"));

    resolve();
    await waitFor(() => expect(statusLog).toContain("success"));
  });

  it("transitions to error on rejection and shows error message", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("Server down")));

    const { container } = render(
      <Form onSubmit={onSubmit}>
        {(status) => (
          <>
            <span>Status: {status}</span>
            <button type="submit">Go</button>
          </>
        )}
      </Form>,
    );

    fireEvent.submit(getForm(container));
    await waitFor(() => expect(screen.getByText("Status: error")).toBeInTheDocument());
    expect(screen.getByRole("alert")).toHaveTextContent("Server down");
  });

  it("shows generic error for non-Error throws", async () => {
    const onSubmit = vi.fn(() => Promise.reject("oops"));

    const { container } = render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Go</button>
      </Form>,
    );

    fireEvent.submit(getForm(container));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("An error occurred"));
  });

  it("uses errorSummary prop over error message", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("internal")));

    const { container } = render(
      <Form onSubmit={onSubmit} errorSummary="Custom error summary">
        <button type="submit">Go</button>
      </Form>,
    );

    fireEvent.submit(getForm(container));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Custom error summary"));
  });

  it("does not show error alert when status is not error", () => {
    render(
      <Form onSubmit={vi.fn()} errorSummary="Should not show">
        <span>hi</span>
      </Form>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sets noValidate when validationMode is onSubmit", () => {
    const { container } = render(
      <Form onSubmit={vi.fn()} validationMode="onSubmit">
        <span>hi</span>
      </Form>,
    );
    expect(getForm(container)).toHaveAttribute("novalidate");
  });

  it("does not set noValidate when validationMode is onBlur (default)", () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <span>hi</span>
      </Form>,
    );
    expect(getForm(container)).not.toHaveAttribute("novalidate");
  });

  it("passes style prop", () => {
    const { container } = render(
      <Form onSubmit={vi.fn()} style={{ padding: "20px" }}>
        <span>ok</span>
      </Form>,
    );
    expect(getForm(container)).toHaveStyle({ padding: "20px" });
  });

  it("handles synchronous onSubmit", async () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        {(status) => (
          <>
            <span>Status: {status}</span>
            <button type="submit">Go</button>
          </>
        )}
      </Form>,
    );
    fireEvent.submit(getForm(container));
    await waitFor(() => expect(screen.getByText("Status: success")).toBeInTheDocument());
  });
});
