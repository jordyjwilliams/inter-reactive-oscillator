import React, { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Slider from "../Slider/Slider";
import SetupOscillator from "../SetupOscillator/SetupOscillator";
import SetupStates from "../SetupOscillatorStates/SetupOscillatorStates";
import "../../audioStyles.scss";
import "../../synthStyles.css";
import PropTypes from "prop-types";

const oscillatorTypes = [
  { label: "\u223F", value: "sine" },
  { label: "\u2293", value: "square" },
  { label: "\u3030", value: "sawtooth" },
  { label: "^⌄", value: "triangle" },
];

/**
 * Interactive Oscillator.
 * Renders oscillators with gain, frequency sliders/input boxes
 * Separate play pause buttons.
 * @component
 * @example
 * const [oscPlaying, setOscPlaying] = useState(false);
 * const osc = new InteractiveOscillator({
 *   initOscType: "sine",
 *   initFreq: "73",
 *   minFreq: "20",
 *   maxFreq: "1000",
 *   id: "osc",
 *   isPlaying: osc1Playing,
 *   setPlaying: setOsc1Playing,
 * });
 * return (
 *   <div id="osc-div" htmlFor="osc">
 *     {osc}
 *   </div>
 * )
 */

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function InteractiveOscillator(props) {
  // Call setup SetupOscillator and SetupStates
  const { gainNodeRef, oscRef } = SetupOscillator(props);
  const { freqState, oscType, gainState } = SetupStates(props);
  //! State change handler //
  // Callback should be useState setter fn
  // Value will be clamped to min/max if provided
  const handleStateChange = (event, cb, min, max) => {
    const clampedValue = clamp(event.target.value, min, max);
    console.log(`${event.target.id} set to ${clampedValue}`);
    cb(clampedValue);
  };
  //! Instantiating Components //
  const oscSelector = new Dropdown({
    label: "Shape: ",
    initValue: oscType.get,
    handleChange: (e) => handleStateChange(e, oscType.set),
    optionList: oscillatorTypes,
    id: `${props.id}-osc-type-dropdown`,
  });
  const freqSlider = new Slider({
    val: freqState.get,
    onSlide: (e) =>
      handleStateChange(e, freqState.set, props.minFreq, props.maxFreq),
    min: props.minFreq,
    max: props.maxFreq,
    label: `Frequency [Hz]`,
    id: `${props.id}-freq-slider`,
  });
  const gainSlider = new Slider({
    val: gainState.get,
    onSlide: (e) => handleStateChange(e, gainState.set, 0, 1),
    min: 0,
    max: 1,
    step: 0.01,
    label: `Gain`,
    id: `${props.id}-gain-slider`,
  });
  //! useEffects //
  // update oscType
  useEffect(() => {
    if (oscRef.current) oscRef.current.type = oscType.get;
  }, [oscType.get, oscRef]);
  // update freq values
  useEffect(() => {
    if (oscRef.current) oscRef.current.frequency.value = freqState.get;
  }, [freqState.get, oscRef]);
  // update gain values
  useEffect(() => {
    if (gainNodeRef.current) gainNodeRef.current.gain.value = gainState.get;
  }, [gainState.get, gainNodeRef]);

  return (
    <div className="control-box">
      {oscSelector}
      {freqSlider}
      {gainSlider}
      <button
        onClick={() => props.setPlaying((play) => !play)}
        id={`${props.id}-play-pause`}
        className={
          props.isPlaying ? "play-pause-button paused" : "play-pause-button"
        }
      ></button>
    </div>
  );
}

InteractiveOscillator.propTypes = {
  /** Initial frequency of oscillator [Hz] */
  initFreq: PropTypes.number.isRequired,
  /** Max frequency of oscillator [Hz] */
  maxFreq: PropTypes.number.isRequired,
  /** Min frequency of oscillator [Hz] */
  minFreq: PropTypes.number.isRequired,
  /** Initial oscillator waveshape */
  initOscType: PropTypes.oneOf(oscillatorTypes.map((item) => item.value))
    .isRequired,
  /** playing useState */
  isPlaying: PropTypes.bool.isRequired,
  /** sets playing useState */
  setPlaying: PropTypes.func.isRequired,
  /** id */
  id: PropTypes.string,
};
