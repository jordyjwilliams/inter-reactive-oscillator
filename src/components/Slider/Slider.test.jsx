import "@testing-library/jest-dom";
import React from "react";

import Slider from "./Slider";
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

describe("Slider values", () => {
  test("Slider renders without error", () => {
    render(<Slider val={0} min={0} max={1} label="test" onSlide={() => {}} />);
    expect(screen.getByTestId("test-slider-input-slider")).toBeInTheDocument();
    expect(screen.getByTestId("test-slider-input-label")).toHaveTextContent(
      "test"
    );
    expect(screen.getByTestId("test-slider-input-textbox")).toBeInTheDocument();
  });
  test("Slider min and max values set correctly", () => {
    render(<Slider val={0} min={0} max={1} label="test" onSlide={() => {}} />);
    expect(screen.getByTestId("test-slider-input-slider").max).toBe("1");
    expect(screen.getByTestId("test-slider-input-slider").min).toBe("0");
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("0");
  });
  test("Slider min and max values handles negative values", () => {
    render(
      <Slider val={-3} min={-50} max={100} label="test" onSlide={() => {}} />
    );
    expect(screen.getByTestId("test-slider-input-slider").max).toBe("100");
    expect(screen.getByTestId("test-slider-input-slider").min).toBe("-50");
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("-3");
  });
  test("Slider initial value out of minimum range should be clamped", () => {
    render(
      <Slider val={-3} min={0} max={10} label="test" onSlide={() => {}} />
    );
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("0");
  });
  test("Slider initial value out of maximum range should be clamped", () => {
    render(
      <Slider val={20} min={0} max={10} label="test" onSlide={() => {}} />
    );
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("10");
  });
  test("Slider should call onSlide function", () => {
    const slideFunction = jest.fn();
    render(
      <Slider val={2} min={0} max={10} label="test" onSlide={slideFunction} />
    );
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("2");

    fireEvent.change(screen.getByTestId("test-slider-input-slider"), {
      target: { value: 1 },
    });
    // Test change textbox value too
    fireEvent.change(screen.getByTestId("test-slider-input-textbox"), {
      target: { value: 1 },
    });
    expect(slideFunction).toHaveBeenCalledWith(
      expect.objectContaining({ type: "change" })
    );
    expect(slideFunction).toBeCalledTimes(2);
  });
  test("Slider should change value", () => {
    const slideFunction = jest.fn();
    // For this test have to render slider w/o value as will use react setState to set value
    // This just checks we can slider slider to extremes
    render(<Slider min={-10} max={10} label="test" onSlide={slideFunction} />);
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("0");
    // Set slider to min
    fireEvent.change(screen.getByTestId("test-slider-input-slider"), {
      target: { value: -10 },
    });
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("-10");
    // Set slider to max
    fireEvent.change(screen.getByTestId("test-slider-input-slider"), {
      target: { value: 10 },
    });
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("10");
    // Try to set slider below min
    fireEvent.change(screen.getByTestId("test-slider-input-slider"), {
      target: { value: -11 },
    });
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("-10");
    // Try to set slider above max
    fireEvent.change(screen.getByTestId("test-slider-input-slider"), {
      target: { value: 11 },
    });
    expect(screen.getByTestId("test-slider-input-slider").value).toBe("10");
    expect(slideFunction).toBeCalledTimes(4);
  });
});
