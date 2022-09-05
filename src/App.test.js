import { render, screen } from "@testing-library/react";
import React, { useRef, useEffect, useState } from "react";

import App from "./App";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

test("renders osc type", () => {
  render(<App />);
  const linkElement = screen.getByText(/Osc Type:/i);
  expect(linkElement).toBeInTheDocument();
});

test("Testing Mock AudioContext", () => {
  const audioContext = new AudioContext();
  // const s = new Sampler(audioContext);
});
