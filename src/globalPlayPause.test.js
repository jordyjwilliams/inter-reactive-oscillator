import "@testing-library/jest-dom";
import React from "react";

import GlobalPlayPause from "./globalPlayPause";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
});

console.log = jest.fn();
const setOsc1 = jest.fn();
const setOsc2 = jest.fn();

describe("GlobalPlayPause button", () => {
  test("renders correctly w/o error on empty playStates array", () => {
    // Pass empty playStates array
    render(<GlobalPlayPause playStates={[]} />);
    expect(screen.getByTestId("test-global-play-pause")).toBeInTheDocument();
    const testGlobalPP = screen.getByTestId("test-global-play-pause");
    // Check can press button rendered with empty play states array
    expect(testGlobalPP.classList).toContainEqual("play-pause-button");
    fireEvent.click(testGlobalPP);
    expect(console.log).toHaveBeenCalledWith("All oscillators started");
  });

  test("switches play states correctly: all osc playing on init", () => {
    render(
      <GlobalPlayPause
        playStates={[
          { isPlaying: true, setPlaying: setOsc1 },
          { isPlaying: true, setPlaying: setOsc2 },
        ]}
      />
    );
    expect(screen.getByTestId("test-global-play-pause")).toBeInTheDocument();
    const testGlobalPP = screen.getByTestId("test-global-play-pause");
    // Check can press button rendered with empty play states array
    expect(testGlobalPP.classList).toContainEqual("play-pause-button");
    // As oscillators are playing on init, button should have "paused" class
    expect(testGlobalPP.classList.contains("paused")).toBe(true);
    fireEvent.click(testGlobalPP);
    expect(console.log).toHaveBeenCalledWith("All oscillators stopped");
    // Check the calls to mocked setState functions
    expect(setOsc1).toHaveBeenCalledWith(false);
    expect(setOsc2).toHaveBeenCalledWith(false);
  });
  test("switches play states correctly: all osc paused on init", () => {
    render(
      <GlobalPlayPause
        playStates={[
          { isPlaying: false, setPlaying: setOsc1 },
          { isPlaying: false, setPlaying: setOsc2 },
        ]}
      />
    );
    expect(screen.getByTestId("test-global-play-pause")).toBeInTheDocument();
    const testGlobalPP = screen.getByTestId("test-global-play-pause");
    // Check can press button rendered with empty play states array
    expect(testGlobalPP.classList).toContainEqual("play-pause-button");
    // Should not be paused
    expect(testGlobalPP.classList.contains("paused")).toBe(false);
    fireEvent.click(testGlobalPP);
    expect(console.log).toHaveBeenCalledWith("All oscillators started");
    // Check the calls to mocked setState functions
    expect(setOsc1).toHaveBeenCalledWith(true);
    expect(setOsc2).toHaveBeenCalledWith(true);
  });
  test("switches play states correctly: osc mismatched on init", () => {
    // Pass empty playStates array
    render(
      <GlobalPlayPause
        playStates={[
          { isPlaying: true, setPlaying: setOsc1 },
          { isPlaying: false, setPlaying: setOsc2 },
        ]}
      />
    );
    expect(screen.getByTestId("test-global-play-pause")).toBeInTheDocument();
    const testGlobalPP = screen.getByTestId("test-global-play-pause");
    // Check can press button rendered with empty play states array
    expect(testGlobalPP.classList).toContainEqual("play-pause-button");
    // Should not be paused
    expect(testGlobalPP.classList.contains("paused")).toBe(true);
    fireEvent.click(testGlobalPP);
    expect(console.log).toHaveBeenCalledWith("All oscillators stopped");
    // Check the calls to mocked setState functions
    expect(setOsc1).toHaveBeenCalledWith(false);
    expect(setOsc2).toHaveBeenCalledWith(false);
  });
});
