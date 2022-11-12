import React from "react";
import PropTypes from "prop-types";

/**
 * Sets up react states for oscillator.
 * @component
 * @example
 * const freq = 440
 * const oscType = "sine"
 *
 * const oscRef = useRef() // Typically defined with `SetupOscillator`
 * const { freqState, oscType, gainState } = SetupStates({initFreq:freq, initOscType:oscType});
 */
export default function SetupStates(props) {
  const [freq, setFreq] = React.useState(props.initFreq);
  const [oscType, setOscType] = React.useState(props.initOscType);
  const [gain, setGain] = React.useState(1);

  return {
    freqState: { get: freq, set: setFreq },
    oscType: { get: oscType, set: setOscType },
    gainState: { get: gain, set: setGain },
  };
}

SetupStates.propTypes = {
  /** Initial frequency of oscillator [Hz] */
  initFreq: PropTypes.number,
  /** Initial oscillator waveshape */
  // TODO: set this from the oscillatorTypes struct
  initOscType: PropTypes.oneOf(["sine", "square", "sawtooth", "triangle"]),
};
