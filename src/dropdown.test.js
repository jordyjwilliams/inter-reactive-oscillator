import { render, screen } from "@testing-library/react";
import React, { useRef, useEffect, useState } from "react";

import Dropdown from "./dropdown";
import oscillatorTypes from "./oscillator";

test("renders dropdown label", () => {
  const [oscType, setOscType] = useState("sine");
  const handleChange = (event) => {
    setOscType(event.target.value);
  };
  render(
    <Dropdown label="Osc Type:" initValue="sine" optionList={oscillatorTypes} />
  );
  const linkElement = screen.getByText(/Osc Type:/i);
  expect(linkElement).toBeInTheDocument();
});
