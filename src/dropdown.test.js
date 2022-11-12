import "@testing-library/jest-dom";
import React from "react";

import Dropdown from "./dropdown";
import userEvent from "@testing-library/user-event";

import {
  render,
  screen,
  fireEvent,
  cleanup,
  getAllByRole,
} from "@testing-library/react";

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
});

const testOptionValues = [
  { label: "test", value: "foo" },
  { label: "labels", value: "bar" },
  { label: "and", value: "baz" },
  { label: "values", value: "" },
];

let testDefaultDropdown = (
  <Dropdown
    initValue="foo"
    optionList={testOptionValues}
    handleChange={(e) => console.log(e)}
  />
);

describe("Dropdown default state test", () => {
  test("Dropdown Rendering", () => {
    render(testDefaultDropdown);
    const testDropdown = screen.getByTestId("test-dropdown");
    expect(testDropdown).toBeInTheDocument();
  });

  test("Testing options list parsed as expected", () => {
    render(testDefaultDropdown);
    const testDropdown = screen.getByTestId("test-dropdown");
    expect(testDropdown).toHaveTextContent("testlabelsandvalues");
    expect(testDropdown).toHaveDisplayValue("test");
    expect(testDropdown).toHaveValue("foo");
  });

  test("calls myEventHandler()", async () => {
    const mockEventHandler = jest.fn();
    render(
      <Dropdown
        initValue="foo"
        optionList={testOptionValues}
        handleChange={mockEventHandler}
      />
    );
    await userEvent.selectOptions(screen.getByTestId("test-dropdown"), "bar");

    expect(mockEventHandler).toHaveBeenCalledTimes(1);
    expect(mockEventHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: "change" })
    );
  });

  describe("Dropdown non-default state tests", () => {
    test("Testing options list initValue works as expected", () => {
      render(
        <Dropdown
          initValue="baz"
          optionList={testOptionValues}
          handleChange={(e) => handleStateChange(e, setOptionType)}
        />
      );
      const testDropdown = screen.getByTestId("test-dropdown");
      expect(testDropdown).toHaveTextContent("testlabelsandvalues");
      expect(testDropdown).toHaveDisplayValue("and");
      expect(testDropdown).toHaveValue("baz");
    });
    test("Testing options list empty initValue works as expected", () => {
      render(
        <Dropdown
          initValue=""
          optionList={testOptionValues}
          handleChange={(e) => handleStateChange(e, setOptionType)}
        />
      );
      const testDropdown = screen.getByTestId("test-dropdown");
      expect(testDropdown).toHaveTextContent("testlabelsandvalues");
      expect(testDropdown).toHaveDisplayValue("values");
      expect(testDropdown).toHaveValue("");
    });
  });

  describe("Clicking dropdown changes value", () => {
    test("Clicking the dropdown works", () => {
      // Render w/o initial value as this will alter the setting
      // Due to the way the useState hooks are used... Want to pass with no inital value
      // To correctly update the value as expected
      render(<Dropdown optionList={testOptionValues} />);
      const testDropdown = screen.getByTestId("test-dropdown");
      const dropdownOptions = getAllByRole(testDropdown, "option");

      expect(dropdownOptions.length).toEqual(testOptionValues.length);
      expect(
        screen.getByTestId("test-dropdown-option-0").selected
      ).toBeTruthy();
      expect(screen.getByTestId("test-dropdown-option-1").selected).toBeFalsy();
      expect(screen.getByTestId("test-dropdown-option-2").selected).toBeFalsy();
      expect(screen.getByTestId("test-dropdown-option-3").selected).toBeFalsy();
      expect(testDropdown.value).toBe("foo");

      // Change dropdown
      fireEvent.change(testDropdown, {
        target: { value: "bar" },
      });

      expect(dropdownOptions[1].selected).toBeTruthy();
      expect(dropdownOptions[0].selected).toBeFalsy();
      expect(testDropdown.value).toBe("bar");
    });
  });
  test("Clicking the dropdown doesn't change value when initValue set", () => {
    // Render w/ initial value will not change when a change is called
    // Need to set the state w/in the handleChange function
    render(
      <Dropdown
        optionList={testOptionValues}
        initValue="bar"
        handleChange={(e) => console.log(e.target.value)}
      />
    );
    const testDropdown = screen.getByTestId("test-dropdown");
    const dropdownOptions = getAllByRole(testDropdown, "option");
    // same initial tests as above
    expect(dropdownOptions.length).toEqual(testOptionValues.length);
    expect(screen.getByTestId("test-dropdown-option-0").selected).toBeFalsy();
    expect(screen.getByTestId("test-dropdown-option-1").selected).toBeTruthy();
    expect(screen.getByTestId("test-dropdown-option-2").selected).toBeFalsy();
    expect(screen.getByTestId("test-dropdown-option-3").selected).toBeFalsy();
    expect(testDropdown.value).toBe("bar");

    // Change dropdown --> when initValue present, this will not update
    // Needs state handler/cb function passed
    fireEvent.change(testDropdown, {
      target: { value: "baz" },
    });

    expect(dropdownOptions[0].selected).toBeFalsy();
    expect(dropdownOptions[1].selected).toBeTruthy();
    expect(dropdownOptions[2].selected).toBeFalsy();
    expect(testDropdown.value).toBe("bar");
  });
});
